"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _esprima = require("esprima");

var _esprima2 = _interopRequireDefault(_esprima);

var _escodegen = require("escodegen");

var _escodegen2 = _interopRequireDefault(_escodegen);

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

var _document = require("docx4js/lib/openxml/docx/model/document");

var _document2 = _interopRequireDefault(_document);

var _part = require("docx4js/lib/openxml/part");

var _part2 = _interopRequireDefault(_part);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getNewDocxData(wDoc) {
	return $.isNode ? wDoc.raw.generate({ type: "nodebuffer" }) : wDoc.raw.generate({ type: "blob", mimeType: "application/docx" });
}

function doSave(newDocxData, file) {
	if ($.isNode) {
		var fs = "fs";
		require(fs).writeFile(file || Date.now() + ".docx", newDocxData);
	} else {
		var url = window.URL.createObjectURL(newDocxData);
		var link = document.createElement("a");
		document.body.appendChild(link);
		link.download = (file || 'new') + ".docx";
		link.href = url;
		link.click();
		document.body.removeChild(link);
	}
}

var Document = function (_BaseDocument) {
	_inherits(Document, _BaseDocument);

	function Document() {
		_classCallCheck(this, Document);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Document).apply(this, arguments));

		Object.assign(_this.wDoc, function (variantDocument) {
			var _currentContainer = void 0,
			    _variantContainers = [],
			    variants = {};
			return {
				beginVariant: function beginVariant(variant) {
					if (_currentContainer && _currentContainer != variantDocument) variant.wXml.setAttribute('id', variant.vId);

					if (_currentContainer == variantDocument) variant.isRootChild = true;

					switch (variant.type) {
						case 'variant.exp':
						case 'variant.picture':
							variant.variantParent = _currentContainer;
							_currentContainer.variantChildren.push(variant);
							variants[variant.vId] = variant;
							break;
						case 'variant.if':
						case 'variant.for':
							variant.variantParent = _currentContainer;
							_currentContainer.variantChildren.push(variant);
							_variantContainers.push(_currentContainer);
							variants[variant.vId] = variant;
						case 'document':
							_currentContainer = variant;
					}
					return variant;
				},
				endVariant: function endVariant(variant) {
					switch (variant.type) {
						case 'variant.if':
						case 'variant.for':
							_currentContainer = _variantContainers.pop();
					}
				},


				variants: variants
			};
		}(_this));

		_this.variantParent = null;
		_this.variantChildren = [];
		_this.parsedCode = _esprima2.default.parse("with(data){with(variants){}}");
		_this.codeBlock = _this.parsedCode.body[0].body.body[0].body.body;
		_this.wDoc.beginVariant(_this);
		return _this;
	}

	/**
 * which makes it as a variant
 */


	_createClass(Document, [{
		key: "parse",
		value: function parse() {
			var r = _get(Object.getPrototypeOf(Document.prototype), "parse", this).apply(this, arguments);
			this.wDoc.endVariant(this);

			if (typeof this.parsedCode != 'function') {
				var code = _escodegen2.default.generate(this.parsedCode);
				console.log(code);
				this.parsedCode = new Function("data,variants", code);
			}
			return r;
		}
	}, {
		key: "visit",
		value: function visit() {}
		//which makes the class as a visitor


		/**
  * public API for variant docx
  */

	}, {
		key: "assemble",
		value: function assemble(data, transactional) {
			var _this2 = this;

			if (!transactional) this.variantChildren.forEach(function (a) {
				return a.assembledXml = a.wXml.cloneNode(true);
			});

			this.parsedCode.call({}, data, this.wDoc.variants);

			var wDoc = this.wDoc,
			    variantChildren = this.variantChildren;

			if (transactional) {
				return {
					save: function save(file) {
						wDoc._serialize();
						doSave(this.data, file);
					},
					parse: function parse() {
						return wDoc.parse.apply(wDoc, arguments);
					},

					get data() {
						return getNewDocxData(wDoc);
					},
					variantChildren: variantChildren
				};
			} else {
				var _ret = function () {
					_this2.variantChildren.map(function (variant) {
						var parent = variant.wXml.parentNode;
						variant.assembledXml && parent.appendChild(variant.assembledXml);
						parent.removeChild(viariant.wXml);
					});
					wDoc._serialize();
					var newDocxData = getNewDocxData(wDoc);
					wDoc._restore();
					return {
						v: {
							save: function save(file) {
								doSave(newDocxData, file);
							},
							parse: function parse() {
								var _docx4js$load;

								return (_docx4js$load = _docx4js2.default.load(newDocxData)).parse.apply(_docx4js$load, arguments);
							},

							data: newDocxData,
							variantChildren: variantChildren
						}
					};
				}();

				if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
			}
		}
	}]);

	return Document;
}(_document2.default);

exports.default = Document;


var xmldom = "xmldom";
(function (XMLSerializer) {
	Object.assign(_part2.default.prototype, {
		setChanged: function setChanged(a) {
			var _doc$_changedParts = this.doc._changedParts;

			var _changedParts = _doc$_changedParts === undefined ? new Set() : _doc$_changedParts;

			this.doc._changedParts = _changedParts;

			_changedParts[a ? 'add' : 'remove'](this);
		},
		_serialize: function _serialize() {
			this.doc.raw.file(this.name, "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\r\n" + new XMLSerializer().serializeToString(this.documentElement));
		},
		addRel: function addRel(rel) {
			var id = "rId" + (Math.max.apply(Math, _toConsumableArray(Object.keys(this.rels).map(function (a) {
				return parseInt(a.substring(3));
			}))) + 1);
			this.rels[id] = rel;
			var relPart = this.doc.getPart(this.relName);
			var root = relPart.documentElement,
			    el = root.ownerDocument.createElement('Relationship');
			el.setAttribute("Id", id);
			Object.keys(rel).forEach(function (a) {
				return el.setAttribute(a, rel[a]);
			});
			root.appendChild(el);
			relPart.setChanged(true);
			return id;
		},
		removeRel: function removeRel(id) {
			delete this.rels[id];
			this.documentElement.$1("Relationship[Id=" + id + "]").remove();
			this.doc.getPart(this.relName).setChanged(true);
		}
	});

	Object.assign(_docx4js2.default.prototype, {
		_serialize: function _serialize() {
			var _changedParts = this._changedParts;

			if (_changedParts) {
				_changedParts.forEach(function (part) {
					return part._serialize();
				});
				delete this._changedParts;
			}
		},
		_restore: function _restore() {}
	});
})($.isNode ? require(xmldom).XMLSerializer : XMLSerializer);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFFQTs7OztBQWlKQTs7Ozs7Ozs7Ozs7Ozs7QUE5SUEsU0FBUyxjQUFULENBQXdCLElBQXhCLEVBQTZCO0FBQzVCLFFBQU8sRUFBRSxNQUFGLEdBQVcsS0FBSyxHQUFMLENBQVMsUUFBVCxDQUFrQixFQUFDLE1BQUssWUFBTCxFQUFuQixDQUFYLEdBQW9ELEtBQUssR0FBTCxDQUFTLFFBQVQsQ0FBa0IsRUFBQyxNQUFNLE1BQU4sRUFBYSxVQUFVLGtCQUFWLEVBQWhDLENBQXBELENBRHFCO0NBQTdCOztBQUlBLFNBQVMsTUFBVCxDQUFnQixXQUFoQixFQUE0QixJQUE1QixFQUFpQztBQUNoQyxLQUFHLEVBQUUsTUFBRixFQUFTO0FBQ1gsTUFBSSxLQUFHLElBQUgsQ0FETztBQUVYLFVBQVEsRUFBUixFQUFZLFNBQVosQ0FBc0IsUUFBUyxLQUFLLEdBQUwsWUFBVCxFQUEyQixXQUFqRCxFQUZXO0VBQVosTUFHSztBQUNKLE1BQUksTUFBTSxPQUFPLEdBQVAsQ0FBVyxlQUFYLENBQTJCLFdBQTNCLENBQU4sQ0FEQTtBQUVKLE1BQUksT0FBTyxTQUFTLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBUCxDQUZBO0FBR0osV0FBUyxJQUFULENBQWMsV0FBZCxDQUEwQixJQUExQixFQUhJO0FBSUosT0FBSyxRQUFMLElBQW1CLFFBQU0sS0FBTixXQUFuQixDQUpJO0FBS0osT0FBSyxJQUFMLEdBQVksR0FBWixDQUxJO0FBTUosT0FBSyxLQUFMLEdBTkk7QUFPSixXQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLElBQTFCLEVBUEk7RUFITDtDQUREOztJQWVxQjs7O0FBQ3BCLFVBRG9CLFFBQ3BCLEdBQWE7d0JBRE8sVUFDUDs7cUVBRE8sc0JBRVYsWUFERzs7QUFFWixTQUFPLE1BQVAsQ0FBYyxNQUFLLElBQUwsRUFBVSxVQUFTLGVBQVQsRUFBeUI7QUFDaEQsT0FBSSwwQkFBSjtPQUNDLHFCQUFtQixFQUFuQjtPQUNBLFdBQVMsRUFBVCxDQUgrQztBQUloRCxVQUFPO0FBQ0wsd0NBQWEsU0FBUTtBQUNwQixTQUFHLHFCQUNGLHFCQUFtQixlQUFuQixFQUNBLFFBQVEsSUFBUixDQUFhLFlBQWIsQ0FBMEIsSUFBMUIsRUFBK0IsUUFBUSxHQUFSLENBQS9CLENBRkQ7O0FBSUEsU0FBRyxxQkFBbUIsZUFBbkIsRUFDRixRQUFRLFdBQVIsR0FBb0IsSUFBcEIsQ0FERDs7QUFHQSxhQUFPLFFBQVEsSUFBUjtBQUNQLFdBQUssYUFBTCxDQURBO0FBRUEsV0FBSyxpQkFBTDtBQUNDLGVBQVEsYUFBUixHQUFzQixpQkFBdEIsQ0FERDtBQUVDLHlCQUFrQixlQUFsQixDQUFrQyxJQUFsQyxDQUF1QyxPQUF2QyxFQUZEO0FBR0MsZ0JBQVMsUUFBUSxHQUFSLENBQVQsR0FBc0IsT0FBdEIsQ0FIRDtBQUlBLGFBSkE7QUFGQSxXQU9LLFlBQUwsQ0FQQTtBQVFBLFdBQUssYUFBTDtBQUNDLGVBQVEsYUFBUixHQUFzQixpQkFBdEIsQ0FERDtBQUVDLHlCQUFrQixlQUFsQixDQUFrQyxJQUFsQyxDQUF1QyxPQUF2QyxFQUZEO0FBR0MsMEJBQW1CLElBQW5CLENBQXdCLGlCQUF4QixFQUhEO0FBSUMsZ0JBQVMsUUFBUSxHQUFSLENBQVQsR0FBc0IsT0FBdEIsQ0FKRDtBQVJBLFdBYUssVUFBTDtBQUNDLDJCQUFrQixPQUFsQixDQUREO0FBYkEsTUFSb0I7QUF3QnBCLFlBQU8sT0FBUCxDQXhCb0I7S0FEaEI7QUE0Qkwsb0NBQVcsU0FBUTtBQUNsQixhQUFPLFFBQVEsSUFBUjtBQUNQLFdBQUssWUFBTCxDQURBO0FBRUEsV0FBSyxhQUFMO0FBQ0MsMkJBQWtCLG1CQUFtQixHQUFuQixFQUFsQixDQUREO0FBRkEsTUFEa0I7S0E1QmQ7OztBQW9DTCxzQkFwQ0s7SUFBUCxDQUpnRDtHQUF6QixPQUF4QixFQUZZOztBQThDWixRQUFLLGFBQUwsR0FBbUIsSUFBbkIsQ0E5Q1k7QUErQ1osUUFBSyxlQUFMLEdBQXFCLEVBQXJCLENBL0NZO0FBZ0RaLFFBQUssVUFBTCxHQUFnQixrQkFBUSxLQUFSLENBQWMsOEJBQWQsQ0FBaEIsQ0FoRFk7QUFpRFosUUFBSyxTQUFMLEdBQWUsTUFBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCLENBQXJCLEVBQXdCLElBQXhCLENBQTZCLElBQTdCLENBQWtDLENBQWxDLEVBQXFDLElBQXJDLENBQTBDLElBQTFDLENBakRIO0FBa0RaLFFBQUssSUFBTCxDQUFVLFlBQVYsUUFsRFk7O0VBQWI7Ozs7Ozs7Y0FEb0I7OzBCQXlEYjtBQUNOLE9BQUksK0JBMURlLGdEQTBERSxVQUFqQixDQURFO0FBRU4sUUFBSyxJQUFMLENBQVUsVUFBVixDQUFxQixJQUFyQixFQUZNOztBQUlOLE9BQUcsT0FBTyxLQUFLLFVBQUwsSUFBa0IsVUFBekIsRUFBb0M7QUFDdEMsUUFBSSxPQUFLLG9CQUFVLFFBQVYsQ0FBbUIsS0FBSyxVQUFMLENBQXhCLENBRGtDO0FBRXRDLFlBQVEsR0FBUixDQUFZLElBQVosRUFGc0M7QUFHdEMsU0FBSyxVQUFMLEdBQWdCLElBQUksUUFBSixDQUFhLGVBQWIsRUFBNkIsSUFBN0IsQ0FBaEIsQ0FIc0M7SUFBdkM7QUFLQSxVQUFPLENBQVAsQ0FUTTs7OzswQkFZQTs7Ozs7Ozs7OzsyQkFRRSxNQUFNLGVBQWM7OztBQUM1QixPQUFHLENBQUMsYUFBRCxFQUNGLEtBQUssZUFBTCxDQUFxQixPQUFyQixDQUE2QjtXQUFHLEVBQUUsWUFBRixHQUFlLEVBQUUsSUFBRixDQUFPLFNBQVAsQ0FBaUIsSUFBakIsQ0FBZjtJQUFILENBQTdCLENBREQ7O0FBR0EsUUFBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCLEVBQXJCLEVBQXlCLElBQXpCLEVBQStCLEtBQUssSUFBTCxDQUFVLFFBQVYsQ0FBL0IsQ0FKNEI7O0FBTTVCLE9BQUksT0FBSyxLQUFLLElBQUw7T0FBVyxrQkFBZ0IsS0FBSyxlQUFMLENBTlI7O0FBUTVCLE9BQUcsYUFBSCxFQUFpQjtBQUNoQixXQUFPO0FBQ04seUJBQUssTUFBSztBQUNULFdBQUssVUFBTCxHQURTO0FBRVQsYUFBTyxLQUFLLElBQUwsRUFBVyxJQUFsQixFQUZTO01BREo7QUFLTiw2QkFBTztBQUNOLGFBQU8sS0FBSyxLQUFMLGFBQWMsU0FBZCxDQUFQLENBRE07TUFMRDs7QUFRTixTQUFJLElBQUosR0FBVTtBQUNULGFBQU8sZUFBZSxJQUFmLENBQVAsQ0FEUztNQUFWO0FBR0EscUNBWE07S0FBUCxDQURnQjtJQUFqQixNQWNLOztBQUNKLFlBQUssZUFBTCxDQUFxQixHQUFyQixDQUF5QixtQkFBUztBQUNqQyxVQUFJLFNBQU8sUUFBUSxJQUFSLENBQWEsVUFBYixDQURzQjtBQUVqQyxjQUFRLFlBQVIsSUFBd0IsT0FBTyxXQUFQLENBQW1CLFFBQVEsWUFBUixDQUEzQyxDQUZpQztBQUdqQyxhQUFPLFdBQVAsQ0FBbUIsU0FBUyxJQUFULENBQW5CLENBSGlDO01BQVQsQ0FBekI7QUFLQSxVQUFLLFVBQUw7QUFDQSxTQUFJLGNBQVksZUFBZSxJQUFmLENBQVo7QUFDSixVQUFLLFFBQUw7QUFDQTtTQUFPO0FBQ04sMkJBQUssTUFBSztBQUNULGVBQU8sV0FBUCxFQUFtQixJQUFuQixFQURTO1FBREo7QUFJTiwrQkFBTzs7O0FBQ04sZUFBTyxtQ0FBUSxJQUFSLENBQWEsV0FBYixHQUEwQixLQUExQixzQkFBbUMsU0FBbkMsQ0FBUCxDQURNO1FBSkQ7O0FBT04sYUFBSyxXQUFMO0FBQ0EsdUNBUk07O01BQVA7UUFUSTs7O0lBZEw7Ozs7UUFyRm1COzs7Ozs7QUE2SHJCLElBQUksU0FBTyxRQUFQO0FBQ0osQ0FBQyxVQUFTLGFBQVQsRUFBdUI7QUFDdkIsUUFBTyxNQUFQLENBQWMsZUFBSyxTQUFMLEVBQWU7QUFDNUIsa0NBQVcsR0FBRTs0QkFDa0IsS0FBSyxHQUFMLENBQXpCLGNBRE87O09BQ1AsbURBQWMsSUFBSSxHQUFKLHdCQURQOztBQUVaLFFBQUssR0FBTCxDQUFTLGFBQVQsR0FBdUIsYUFBdkIsQ0FGWTs7QUFJWixpQkFBYyxJQUFJLEtBQUosR0FBWSxRQUFaLENBQWQsQ0FBb0MsSUFBcEMsRUFKWTtHQURlO0FBTzVCLG9DQUFZO0FBQ1gsUUFBSyxHQUFMLENBQVMsR0FBVCxDQUFhLElBQWIsQ0FBa0IsS0FBSyxJQUFMLHdFQUF5RSxJQUFLLGFBQUosRUFBRCxDQUFzQixpQkFBdEIsQ0FBd0MsS0FBSyxlQUFMLENBQW5JLEVBRFc7R0FQZ0I7QUFXNUIsMEJBQU8sS0FBSTtBQUNWLE9BQUksY0FBUyxLQUFLLEdBQUwsZ0NBQVksT0FBTyxJQUFQLENBQVksS0FBSyxJQUFMLENBQVosQ0FBdUIsR0FBdkIsQ0FBMkI7V0FBRyxTQUFTLEVBQUUsU0FBRixDQUFZLENBQVosQ0FBVDtJQUFILEVBQXZDLElBQXFFLENBQXJFLENBQVQsQ0FETTtBQUVWLFFBQUssSUFBTCxDQUFVLEVBQVYsSUFBYyxHQUFkLENBRlU7QUFHVixPQUFJLFVBQVEsS0FBSyxHQUFMLENBQVMsT0FBVCxDQUFpQixLQUFLLE9BQUwsQ0FBekIsQ0FITTtBQUlWLE9BQUksT0FBSyxRQUFRLGVBQVI7T0FDUixLQUFHLEtBQUssYUFBTCxDQUFtQixhQUFuQixDQUFpQyxjQUFqQyxDQUFILENBTFM7QUFNVixNQUFHLFlBQUgsQ0FBZ0IsSUFBaEIsRUFBcUIsRUFBckIsRUFOVTtBQU9WLFVBQU8sSUFBUCxDQUFZLEdBQVosRUFBaUIsT0FBakIsQ0FBeUI7V0FBRyxHQUFHLFlBQUgsQ0FBZ0IsQ0FBaEIsRUFBa0IsSUFBSSxDQUFKLENBQWxCO0lBQUgsQ0FBekIsQ0FQVTtBQVFWLFFBQUssV0FBTCxDQUFpQixFQUFqQixFQVJVO0FBU1YsV0FBUSxVQUFSLENBQW1CLElBQW5CLEVBVFU7QUFVVixVQUFPLEVBQVAsQ0FWVTtHQVhpQjtBQXdCNUIsZ0NBQVUsSUFBRztBQUNaLFVBQU8sS0FBSyxJQUFMLENBQVUsRUFBVixDQUFQLENBRFk7QUFFWixRQUFLLGVBQUwsQ0FBcUIsRUFBckIsc0JBQTJDLFFBQTNDLEVBQWtELE1BQWxELEdBRlk7QUFHWixRQUFLLEdBQUwsQ0FBUyxPQUFULENBQWlCLEtBQUssT0FBTCxDQUFqQixDQUErQixVQUEvQixDQUEwQyxJQUExQyxFQUhZO0dBeEJlO0VBQTdCLEVBRHVCOztBQWdDdkIsUUFBTyxNQUFQLENBQWMsa0JBQWEsU0FBYixFQUF1QjtBQUNwQyxvQ0FBWTtPQUNOLGdCQUFlLEtBQWYsY0FETTs7QUFFWCxPQUFHLGFBQUgsRUFBaUI7QUFDaEIsa0JBQWMsT0FBZCxDQUFzQjtZQUFNLEtBQUssVUFBTDtLQUFOLENBQXRCLENBRGdCO0FBRWhCLFdBQU8sS0FBSyxhQUFMLENBRlM7SUFBakI7R0FIbUM7QUFTcEMsZ0NBQVUsRUFUMEI7RUFBckMsRUFoQ3VCO0NBQXZCLENBQUQsQ0E2Q0csRUFBRSxNQUFGLEdBQVcsUUFBUSxNQUFSLEVBQWdCLGFBQWhCLEdBQWdDLGFBQTNDLENBN0NIIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGVzcHJpbWEgZnJvbSBcImVzcHJpbWFcIlxyXG5pbXBvcnQgZXNjb2RlZ2VuIGZyb20gXCJlc2NvZGVnZW5cIlxyXG5cclxuaW1wb3J0IGRvY3g0anMgZnJvbSBcImRvY3g0anNcIlxyXG5cclxuaW1wb3J0IEJhc2VEb2N1bWVudCBmcm9tIFwiZG9jeDRqcy9saWIvb3BlbnhtbC9kb2N4L21vZGVsL2RvY3VtZW50XCJcclxuXHJcblxyXG5mdW5jdGlvbiBnZXROZXdEb2N4RGF0YSh3RG9jKXtcclxuXHRyZXR1cm4gJC5pc05vZGUgPyB3RG9jLnJhdy5nZW5lcmF0ZSh7dHlwZTpcIm5vZGVidWZmZXJcIn0pIDogd0RvYy5yYXcuZ2VuZXJhdGUoe3R5cGU6IFwiYmxvYlwiLG1pbWVUeXBlOiBcImFwcGxpY2F0aW9uL2RvY3hcIn0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRvU2F2ZShuZXdEb2N4RGF0YSxmaWxlKXtcclxuXHRpZigkLmlzTm9kZSl7XHJcblx0XHRsZXQgZnM9XCJmc1wiXHJcblx0XHRyZXF1aXJlKGZzKS53cml0ZUZpbGUoZmlsZXx8YCR7RGF0ZS5ub3coKX0uZG9jeGAsbmV3RG9jeERhdGEpXHJcblx0fWVsc2V7XHJcblx0XHRsZXQgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwobmV3RG9jeERhdGEpXHJcblx0XHRsZXQgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKVxyXG5cdFx0bGluay5kb3dubG9hZCA9IGAke2ZpbGV8fCduZXcnfS5kb2N4YDtcclxuXHRcdGxpbmsuaHJlZiA9IHVybDtcclxuXHRcdGxpbmsuY2xpY2soKVxyXG5cdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBCYXNlRG9jdW1lbnR7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdE9iamVjdC5hc3NpZ24odGhpcy53RG9jLGZ1bmN0aW9uKHZhcmlhbnREb2N1bWVudCl7XHJcblx0XHRcdGxldCBfY3VycmVudENvbnRhaW5lcixcclxuXHRcdFx0XHRfdmFyaWFudENvbnRhaW5lcnM9W10sXHJcblx0XHRcdFx0dmFyaWFudHM9e31cclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdGJlZ2luVmFyaWFudCh2YXJpYW50KXtcclxuXHRcdFx0XHRcdFx0aWYoX2N1cnJlbnRDb250YWluZXIgJiZcclxuXHRcdFx0XHRcdFx0XHRfY3VycmVudENvbnRhaW5lciE9dmFyaWFudERvY3VtZW50KVxyXG5cdFx0XHRcdFx0XHRcdHZhcmlhbnQud1htbC5zZXRBdHRyaWJ1dGUoJ2lkJyx2YXJpYW50LnZJZClcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdGlmKF9jdXJyZW50Q29udGFpbmVyPT12YXJpYW50RG9jdW1lbnQpXHJcblx0XHRcdFx0XHRcdFx0dmFyaWFudC5pc1Jvb3RDaGlsZD10cnVlXHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRzd2l0Y2godmFyaWFudC50eXBlKXtcclxuXHRcdFx0XHRcdFx0Y2FzZSAndmFyaWFudC5leHAnOlxyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LnBpY3R1cmUnOlxyXG5cdFx0XHRcdFx0XHRcdHZhcmlhbnQudmFyaWFudFBhcmVudD1fY3VycmVudENvbnRhaW5lclxyXG5cdFx0XHRcdFx0XHRcdF9jdXJyZW50Q29udGFpbmVyLnZhcmlhbnRDaGlsZHJlbi5wdXNoKHZhcmlhbnQpXHJcblx0XHRcdFx0XHRcdFx0dmFyaWFudHNbdmFyaWFudC52SWRdPXZhcmlhbnRcclxuXHRcdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdFx0Y2FzZSAndmFyaWFudC5pZic6XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuZm9yJzpcclxuXHRcdFx0XHRcdFx0XHR2YXJpYW50LnZhcmlhbnRQYXJlbnQ9X2N1cnJlbnRDb250YWluZXJcclxuXHRcdFx0XHRcdFx0XHRfY3VycmVudENvbnRhaW5lci52YXJpYW50Q2hpbGRyZW4ucHVzaCh2YXJpYW50KVxyXG5cdFx0XHRcdFx0XHRcdF92YXJpYW50Q29udGFpbmVycy5wdXNoKF9jdXJyZW50Q29udGFpbmVyKVxyXG5cdFx0XHRcdFx0XHRcdHZhcmlhbnRzW3ZhcmlhbnQudklkXT12YXJpYW50XHJcblx0XHRcdFx0XHRcdGNhc2UgJ2RvY3VtZW50JzpcclxuXHRcdFx0XHRcdFx0XHRfY3VycmVudENvbnRhaW5lcj12YXJpYW50XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0cmV0dXJuIHZhcmlhbnRcclxuXHRcdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdFx0ZW5kVmFyaWFudCh2YXJpYW50KXtcclxuXHRcdFx0XHRcdFx0c3dpdGNoKHZhcmlhbnQudHlwZSl7XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuaWYnOlxyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmZvcic6XHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXI9X3ZhcmlhbnRDb250YWluZXJzLnBvcCgpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdHZhcmlhbnRzXHJcblx0XHRcdH1cclxuXHRcdH0odGhpcykpXHJcblxyXG5cdFx0dGhpcy52YXJpYW50UGFyZW50PW51bGxcclxuXHRcdHRoaXMudmFyaWFudENoaWxkcmVuPVtdXHJcblx0XHR0aGlzLnBhcnNlZENvZGU9ZXNwcmltYS5wYXJzZShcIndpdGgoZGF0YSl7d2l0aCh2YXJpYW50cyl7fX1cIilcclxuXHRcdHRoaXMuY29kZUJsb2NrPXRoaXMucGFyc2VkQ29kZS5ib2R5WzBdLmJvZHkuYm9keVswXS5ib2R5LmJvZHlcclxuXHRcdHRoaXMud0RvYy5iZWdpblZhcmlhbnQodGhpcylcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCogd2hpY2ggbWFrZXMgaXQgYXMgYSB2YXJpYW50XHJcblx0Ki9cclxuXHRwYXJzZSgpe1xyXG5cdFx0dmFyIHI9c3VwZXIucGFyc2UoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy53RG9jLmVuZFZhcmlhbnQodGhpcylcclxuXHJcblx0XHRpZih0eXBlb2YodGhpcy5wYXJzZWRDb2RlKSE9J2Z1bmN0aW9uJyl7XHJcblx0XHRcdGxldCBjb2RlPWVzY29kZWdlbi5nZW5lcmF0ZSh0aGlzLnBhcnNlZENvZGUpXHJcblx0XHRcdGNvbnNvbGUubG9nKGNvZGUpXHJcblx0XHRcdHRoaXMucGFyc2VkQ29kZT1uZXcgRnVuY3Rpb24oXCJkYXRhLHZhcmlhbnRzXCIsY29kZSlcclxuXHRcdH1cclxuXHRcdHJldHVybiByXHJcblx0fVxyXG5cclxuXHR2aXNpdCgpe1xyXG5cdFx0Ly93aGljaCBtYWtlcyB0aGUgY2xhc3MgYXMgYSB2aXNpdG9yXHJcblx0fVxyXG5cdFxyXG5cdFxyXG5cdC8qKlxyXG5cdCogcHVibGljIEFQSSBmb3IgdmFyaWFudCBkb2N4XHJcblx0Ki9cclxuXHRhc3NlbWJsZShkYXRhLCB0cmFuc2FjdGlvbmFsKXtcclxuXHRcdGlmKCF0cmFuc2FjdGlvbmFsKVxyXG5cdFx0XHR0aGlzLnZhcmlhbnRDaGlsZHJlbi5mb3JFYWNoKGE9PmEuYXNzZW1ibGVkWG1sPWEud1htbC5jbG9uZU5vZGUodHJ1ZSkgKVxyXG5cclxuXHRcdHRoaXMucGFyc2VkQ29kZS5jYWxsKHt9LCBkYXRhLCB0aGlzLndEb2MudmFyaWFudHMpXHJcblx0XHRcclxuXHRcdGxldCB3RG9jPXRoaXMud0RvYywgdmFyaWFudENoaWxkcmVuPXRoaXMudmFyaWFudENoaWxkcmVuXHJcblx0XHRcdFxyXG5cdFx0aWYodHJhbnNhY3Rpb25hbCl7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0c2F2ZShmaWxlKXtcclxuXHRcdFx0XHRcdHdEb2MuX3NlcmlhbGl6ZSgpXHJcblx0XHRcdFx0XHRkb1NhdmUodGhpcy5kYXRhLCBmaWxlKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0cGFyc2UoKXtcclxuXHRcdFx0XHRcdHJldHVybiB3RG9jLnBhcnNlKC4uLmFyZ3VtZW50cylcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGdldCBkYXRhKCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gZ2V0TmV3RG9jeERhdGEod0RvYylcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHZhcmlhbnRDaGlsZHJlblxyXG5cdFx0XHR9XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0dGhpcy52YXJpYW50Q2hpbGRyZW4ubWFwKHZhcmlhbnQ9PntcclxuXHRcdFx0XHRsZXQgcGFyZW50PXZhcmlhbnQud1htbC5wYXJlbnROb2RlXHJcblx0XHRcdFx0dmFyaWFudC5hc3NlbWJsZWRYbWwgJiYgcGFyZW50LmFwcGVuZENoaWxkKHZhcmlhbnQuYXNzZW1ibGVkWG1sKVxyXG5cdFx0XHRcdHBhcmVudC5yZW1vdmVDaGlsZCh2aWFyaWFudC53WG1sKVxyXG5cdFx0XHR9KVxyXG5cdFx0XHR3RG9jLl9zZXJpYWxpemUoKVxyXG5cdFx0XHRsZXQgbmV3RG9jeERhdGE9Z2V0TmV3RG9jeERhdGEod0RvYylcclxuXHRcdFx0d0RvYy5fcmVzdG9yZSgpXHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0c2F2ZShmaWxlKXtcclxuXHRcdFx0XHRcdGRvU2F2ZShuZXdEb2N4RGF0YSxmaWxlKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0cGFyc2UoKXtcclxuXHRcdFx0XHRcdHJldHVybiBkb2N4NGpzLmxvYWQobmV3RG9jeERhdGEpLnBhcnNlKC4uLmFyZ3VtZW50cylcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGRhdGE6bmV3RG9jeERhdGEsXHJcblx0XHRcdFx0dmFyaWFudENoaWxkcmVuXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmltcG9ydCBEb2N4RG9jdW1lbnQgZnJvbSBcImRvY3g0anNcIlxyXG5pbXBvcnQgUGFydCBmcm9tIFwiZG9jeDRqcy9saWIvb3BlbnhtbC9wYXJ0XCJcclxuXHJcbnZhciB4bWxkb209XCJ4bWxkb21cIjtcclxuKGZ1bmN0aW9uKFhNTFNlcmlhbGl6ZXIpe1xyXG5cdE9iamVjdC5hc3NpZ24oUGFydC5wcm90b3R5cGUse1xyXG5cdFx0c2V0Q2hhbmdlZChhKXtcclxuXHRcdFx0dmFyIHtfY2hhbmdlZFBhcnRzPW5ldyBTZXQoKX09dGhpcy5kb2NcclxuXHRcdFx0dGhpcy5kb2MuX2NoYW5nZWRQYXJ0cz1fY2hhbmdlZFBhcnRzXHJcblx0XHRcdFxyXG5cdFx0XHRfY2hhbmdlZFBhcnRzW2EgPyAnYWRkJyA6ICdyZW1vdmUnXSh0aGlzKVxyXG5cdFx0fSxcclxuXHRcdF9zZXJpYWxpemUoKXtcclxuXHRcdFx0dGhpcy5kb2MucmF3LmZpbGUodGhpcy5uYW1lLCBgPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwiVVRGLThcIiBzdGFuZGFsb25lPVwieWVzXCI/PlxcclxcbiR7KG5ldyBYTUxTZXJpYWxpemVyKCkpLnNlcmlhbGl6ZVRvU3RyaW5nKHRoaXMuZG9jdW1lbnRFbGVtZW50KX1gKVxyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0YWRkUmVsKHJlbCl7XHJcblx0XHRcdHZhciBpZD1gcklkJHtNYXRoLm1heCguLi5PYmplY3Qua2V5cyh0aGlzLnJlbHMpLm1hcChhPT5wYXJzZUludChhLnN1YnN0cmluZygzKSkpKSsxfWBcclxuXHRcdFx0dGhpcy5yZWxzW2lkXT1yZWxcclxuXHRcdFx0dmFyIHJlbFBhcnQ9dGhpcy5kb2MuZ2V0UGFydCh0aGlzLnJlbE5hbWUpXHJcblx0XHRcdHZhciByb290PXJlbFBhcnQuZG9jdW1lbnRFbGVtZW50LFxyXG5cdFx0XHRcdGVsPXJvb3Qub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdSZWxhdGlvbnNoaXAnKVxyXG5cdFx0XHRlbC5zZXRBdHRyaWJ1dGUoXCJJZFwiLGlkKVxyXG5cdFx0XHRPYmplY3Qua2V5cyhyZWwpLmZvckVhY2goYT0+ZWwuc2V0QXR0cmlidXRlKGEscmVsW2FdKSlcclxuXHRcdFx0cm9vdC5hcHBlbmRDaGlsZChlbClcclxuXHRcdFx0cmVsUGFydC5zZXRDaGFuZ2VkKHRydWUpXHJcblx0XHRcdHJldHVybiBpZFxyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0cmVtb3ZlUmVsKGlkKXtcclxuXHRcdFx0ZGVsZXRlIHRoaXMucmVsc1tpZF1cclxuXHRcdFx0dGhpcy5kb2N1bWVudEVsZW1lbnQuJDEoYFJlbGF0aW9uc2hpcFtJZD0ke2lkfV1gKS5yZW1vdmUoKVxyXG5cdFx0XHR0aGlzLmRvYy5nZXRQYXJ0KHRoaXMucmVsTmFtZSkuc2V0Q2hhbmdlZCh0cnVlKVxyXG5cdFx0fVxyXG5cdH0pXHJcblx0XHJcblx0T2JqZWN0LmFzc2lnbihEb2N4RG9jdW1lbnQucHJvdG90eXBlLHtcclxuXHRcdF9zZXJpYWxpemUoKXtcclxuXHRcdFx0dmFyIHtfY2hhbmdlZFBhcnRzfT10aGlzXHJcblx0XHRcdGlmKF9jaGFuZ2VkUGFydHMpe1xyXG5cdFx0XHRcdF9jaGFuZ2VkUGFydHMuZm9yRWFjaChwYXJ0PT5wYXJ0Ll9zZXJpYWxpemUoKSlcclxuXHRcdFx0XHRkZWxldGUgdGhpcy5fY2hhbmdlZFBhcnRzXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRcclxuXHRcdF9yZXN0b3JlKCl7XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdH0pXHJcbn0pKCQuaXNOb2RlID8gcmVxdWlyZSh4bWxkb20pLlhNTFNlcmlhbGl6ZXIgOiBYTUxTZXJpYWxpemVyKVxyXG4iXX0=