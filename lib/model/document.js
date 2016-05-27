"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
				//console.log(code)
				this.parsedCode = new Function("data,variants", _escodegen2.default.generate(this.parsedCode));
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

			if (transactional) {
				this.assemble = function () {
					throw new Error("transactional assembly can't support multiple times assembling");
				};
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
		getFolderAndRelName: function getFolderAndRelName() {
			var name = this.name;
			var i = name.lastIndexOf('/'),
			    folder,
			    relName;
			if (i !== -1) {
				folder = name.substring(0, i);
				relName = folder + "/_rels/" + name.substring(i + 1) + ".rels";
			} else {
				folder = "";
				relName = "_rels/" + name + ".rels";
			}
			return [folder, relName];
		},
		addRel: function addRel(rel) {
			var _this3 = this;

			var _getFolderAndRelName = this.getFolderAndRelName();

			var _getFolderAndRelName2 = _slicedToArray(_getFolderAndRelName, 2);

			var folder = _getFolderAndRelName2[0];
			var relName = _getFolderAndRelName2[1];

			var id = "rId" + (Math.max.apply(Math, _toConsumableArray(Object.keys(this.rels).map(function (a) {
				return parseInt(a.substring(3));
			}))) + 1);
			this.rels[id] = rel;
			var type = rel.type;
			var target = rel.target;

			if (typeof target == 'string') rel.targetMode = "External";else if (type.endsWith("/image")) {
				var targetName = "media/image" + (Math.max.apply(Math, _toConsumableArray(Object.keys(this.rels).map(function (a) {
					var t = _this3.rels[a];
					if (t.type == 'image' && !t.targetMode) return parseInt(t.target.match(/\d+/)[0] || "0");

					return 0;
				}))) + 1) + ".jpg";
				var partName = folder + "/" + targetName;
				this.doc.raw.file(partName, target);
				this.doc.parts[partName] = this.doc.raw.file(partName);
				rel.target = partName;
				type = "image";
			}

			var relPart = this.doc.getPart(relName);
			var root = relPart.documentElement,
			    el = root.ownerDocument.createElement('Relationship');
			el.setAttribute("Id", id);
			var naming = function naming(a) {
				return a.charAt(0).toUpperCase() + a.substr(1);
			};
			Object.keys(rel).forEach(function (a) {
				return el.setAttribute(naming(a), rel[a]);
			});
			root.appendChild(el);
			rel.type = type;
			relPart.setChanged(true);
			return id;
		},
		removeRel: function removeRel(id) {
			delete this.rels[id];
			this.documentElement.$1("Relationship[Id=" + id + "]").remove();

			var _getFolderAndRelName3 = this.getFolderAndRelName();

			var _getFolderAndRelName4 = _slicedToArray(_getFolderAndRelName3, 2);

			var folder = _getFolderAndRelName4[0];
			var relName = _getFolderAndRelName4[1];

			this.doc.getPart(relName).setChanged(true);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUVBOzs7O0FBd0pBOzs7Ozs7Ozs7Ozs7OztBQXJKQSxTQUFTLGNBQVQsQ0FBd0IsSUFBeEIsRUFBNkI7QUFDNUIsUUFBTyxFQUFFLE1BQUYsR0FBVyxLQUFLLEdBQUwsQ0FBUyxRQUFULENBQWtCLEVBQUMsTUFBSyxZQUFMLEVBQW5CLENBQVgsR0FBb0QsS0FBSyxHQUFMLENBQVMsUUFBVCxDQUFrQixFQUFDLE1BQU0sTUFBTixFQUFhLFVBQVUsa0JBQVYsRUFBaEMsQ0FBcEQsQ0FEcUI7Q0FBN0I7O0FBSUEsU0FBUyxNQUFULENBQWdCLFdBQWhCLEVBQTRCLElBQTVCLEVBQWlDO0FBQ2hDLEtBQUcsRUFBRSxNQUFGLEVBQVM7QUFDWCxNQUFJLEtBQUcsSUFBSCxDQURPO0FBRVgsVUFBUSxFQUFSLEVBQVksU0FBWixDQUFzQixRQUFTLEtBQUssR0FBTCxZQUFULEVBQTJCLFdBQWpELEVBRlc7RUFBWixNQUdLO0FBQ0osTUFBSSxNQUFNLE9BQU8sR0FBUCxDQUFXLGVBQVgsQ0FBMkIsV0FBM0IsQ0FBTixDQURBO0FBRUosTUFBSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixHQUF2QixDQUFQLENBRkE7QUFHSixXQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLElBQTFCLEVBSEk7QUFJSixPQUFLLFFBQUwsSUFBbUIsUUFBTSxLQUFOLFdBQW5CLENBSkk7QUFLSixPQUFLLElBQUwsR0FBWSxHQUFaLENBTEk7QUFNSixPQUFLLEtBQUwsR0FOSTtBQU9KLFdBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsSUFBMUIsRUFQSTtFQUhMO0NBREQ7O0lBZXFCOzs7QUFDcEIsVUFEb0IsUUFDcEIsR0FBYTt3QkFETyxVQUNQOztxRUFETyxzQkFFVixZQURHOztBQUVaLFNBQU8sTUFBUCxDQUFjLE1BQUssSUFBTCxF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LEVBbkV1QjtDQUF2QixDQUFELENBZ0ZHLEVBQUUsTUFBRixHQUFXLFFBQVEsTUFBUixFQUFnQixhQUFoQixHQUFnQyxhQUEzQyxDQWhGSCIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBlc3ByaW1hIGZyb20gXCJlc3ByaW1hXCJcclxuaW1wb3J0IGVzY29kZWdlbiBmcm9tIFwiZXNjb2RlZ2VuXCJcclxuXHJcbmltcG9ydCBkb2N4NGpzIGZyb20gXCJkb2N4NGpzXCJcclxuXHJcbmltcG9ydCBCYXNlRG9jdW1lbnQgZnJvbSBcImRvY3g0anMvbGliL29wZW54bWwvZG9jeC9tb2RlbC9kb2N1bWVudFwiXHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0TmV3RG9jeERhdGEod0RvYyl7XHJcblx0cmV0dXJuICQuaXNOb2RlID8gd0RvYy5yYXcuZ2VuZXJhdGUoe3R5cGU6XCJub2RlYnVmZmVyXCJ9KSA6IHdEb2MucmF3LmdlbmVyYXRlKHt0eXBlOiBcImJsb2JcIixtaW1lVHlwZTogXCJhcHBsaWNhdGlvbi9kb2N4XCJ9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBkb1NhdmUobmV3RG9jeERhdGEsZmlsZSl7XHJcblx0aWYoJC5pc05vZGUpe1xyXG5cdFx0bGV0IGZzPVwiZnNcIlxyXG5cdFx0cmVxdWlyZShmcykud3JpdGVGaWxlKGZpbGV8fGAke0RhdGUubm93KCl9LmRvY3hgLG5ld0RvY3hEYXRhKVxyXG5cdH1lbHNle1xyXG5cdFx0bGV0IHVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKG5ld0RvY3hEYXRhKVxyXG5cdFx0bGV0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluaylcclxuXHRcdGxpbmsuZG93bmxvYWQgPSBgJHtmaWxlfHwnbmV3J30uZG9jeGA7XHJcblx0XHRsaW5rLmhyZWYgPSB1cmw7XHJcblx0XHRsaW5rLmNsaWNrKClcclxuXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluaylcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgQmFzZURvY3VtZW50e1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHRPYmplY3QuYXNzaWduKHRoaXMud0RvYyxmdW5jdGlvbih2YXJpYW50RG9jdW1lbnQpe1xyXG5cdFx0XHRsZXQgX2N1cnJlbnRDb250YWluZXIsXHJcblx0XHRcdFx0X3ZhcmlhbnRDb250YWluZXJzPVtdLFxyXG5cdFx0XHRcdHZhcmlhbnRzPXt9XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRiZWdpblZhcmlhbnQodmFyaWFudCl7XHJcblx0XHRcdFx0XHRcdGlmKF9jdXJyZW50Q29udGFpbmVyICYmXHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXIhPXZhcmlhbnREb2N1bWVudClcclxuXHRcdFx0XHRcdFx0XHR2YXJpYW50LndYbWwuc2V0QXR0cmlidXRlKCdpZCcsdmFyaWFudC52SWQpXHJcblxyXG5cdFx0XHRcdFx0XHRpZihfY3VycmVudENvbnRhaW5lcj09dmFyaWFudERvY3VtZW50KVxyXG5cdFx0XHRcdFx0XHRcdHZhcmlhbnQuaXNSb290Q2hpbGQ9dHJ1ZVxyXG5cclxuXHRcdFx0XHRcdFx0c3dpdGNoKHZhcmlhbnQudHlwZSl7XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuZXhwJzpcclxuXHRcdFx0XHRcdFx0Y2FzZSAndmFyaWFudC5waWN0dXJlJzpcclxuXHRcdFx0XHRcdFx0XHR2YXJpYW50LnZhcmlhbnRQYXJlbnQ9X2N1cnJlbnRDb250YWluZXJcclxuXHRcdFx0XHRcdFx0XHRfY3VycmVudENvbnRhaW5lci52YXJpYW50Q2hpbGRyZW4ucHVzaCh2YXJpYW50KVxyXG5cdFx0XHRcdFx0XHRcdHZhcmlhbnRzW3ZhcmlhbnQudklkXT12YXJpYW50XHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuaWYnOlxyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmZvcic6XHJcblx0XHRcdFx0XHRcdFx0dmFyaWFudC52YXJpYW50UGFyZW50PV9jdXJyZW50Q29udGFpbmVyXHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXIudmFyaWFudENoaWxkcmVuLnB1c2godmFyaWFudClcclxuXHRcdFx0XHRcdFx0XHRfdmFyaWFudENvbnRhaW5lcnMucHVzaChfY3VycmVudENvbnRhaW5lcilcclxuXHRcdFx0XHRcdFx0XHR2YXJpYW50c1t2YXJpYW50LnZJZF09dmFyaWFudFxyXG5cdFx0XHRcdFx0XHRjYXNlICdkb2N1bWVudCc6XHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXI9dmFyaWFudFxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHJldHVybiB2YXJpYW50XHJcblx0XHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRcdGVuZFZhcmlhbnQodmFyaWFudCl7XHJcblx0XHRcdFx0XHRcdHN3aXRjaCh2YXJpYW50LnR5cGUpe1xyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmlmJzpcclxuXHRcdFx0XHRcdFx0Y2FzZSAndmFyaWFudC5mb3InOlxyXG5cdFx0XHRcdFx0XHRcdF9jdXJyZW50Q29udGFpbmVyPV92YXJpYW50Q29udGFpbmVycy5wb3AoKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRcdHZhcmlhbnRzXHJcblx0XHRcdH1cclxuXHRcdH0odGhpcykpXHJcblxyXG5cdFx0dGhpcy52YXJpYW50UGFyZW50PW51bGxcclxuXHRcdHRoaXMudmFyaWFudENoaWxkcmVuPVtdXHJcblx0XHR0aGlzLnBhcnNlZENvZGU9ZXNwcmltYS5wYXJzZShcIndpdGgoZGF0YSl7d2l0aCh2YXJpYW50cyl7fX1cIilcclxuXHRcdHRoaXMuY29kZUJsb2NrPXRoaXMucGFyc2VkQ29kZS5ib2R5WzBdLmJvZHkuYm9keVswXS5ib2R5LmJvZHlcclxuXHRcdHRoaXMud0RvYy5iZWdpblZhcmlhbnQodGhpcylcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCogd2hpY2ggbWFrZXMgaXQgYXMgYSB2YXJpYW50XHJcblx0Ki9cclxuXHRwYXJzZSgpe1xyXG5cdFx0dmFyIHI9c3VwZXIucGFyc2UoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy53RG9jLmVuZFZhcmlhbnQodGhpcylcclxuXHJcblx0XHRpZih0eXBlb2YodGhpcy5wYXJzZWRDb2RlKSE9J2Z1bmN0aW9uJyl7XHJcblx0XHRcdHZhciBjb2RlPWVzY29kZWdlbi5nZW5lcmF0ZSh0aGlzLnBhcnNlZENvZGUpXHJcblx0XHRcdC8vY29uc29sZS5sb2coY29kZSlcclxuXHRcdFx0dGhpcy5wYXJzZWRDb2RlPW5ldyBGdW5jdGlvbihcImRhdGEsdmFyaWFudHNcIixlc2NvZGVnZW4uZ2VuZXJhdGUodGhpcy5wYXJzZWRDb2RlKSlcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gclxyXG5cdH1cclxuXHJcblx0dmlzaXQoKXtcclxuXHRcdC8vd2hpY2ggbWFrZXMgdGhlIGNsYXNzIGFzIGEgdmlzaXRvclxyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCogcHVibGljIEFQSSBmb3IgdmFyaWFudCBkb2N4XHJcblx0Ki9cclxuXHRhc3NlbWJsZShkYXRhLCB0cmFuc2FjdGlvbmFsKXtcclxuXHRcdGlmKCF0cmFuc2FjdGlvbmFsKVxyXG5cdFx0XHR0aGlzLnZhcmlhbnRDaGlsZHJlbi5mb3JFYWNoKGE9PmEuYXNzZW1ibGVkWG1sPWEud1htbC5jbG9uZU5vZGUodHJ1ZSkgKVxyXG5cclxuXHRcdHRoaXMucGFyc2VkQ29kZS5jYWxsKHt9LCBkYXRhLCB0aGlzLndEb2MudmFyaWFudHMpXHJcblxyXG5cdFx0bGV0IHdEb2M9dGhpcy53RG9jLCB2YXJpYW50Q2hpbGRyZW49dGhpcy52YXJpYW50Q2hpbGRyZW5cclxuXHJcblx0XHRpZih0cmFuc2FjdGlvbmFsKXtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRzYXZlKGZpbGUpe1xyXG5cdFx0XHRcdFx0d0RvYy5fc2VyaWFsaXplKClcclxuXHRcdFx0XHRcdGRvU2F2ZSh0aGlzLmRhdGEsIGZpbGUpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRwYXJzZSgpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIHdEb2MucGFyc2UoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Z2V0IGRhdGEoKXtcclxuXHRcdFx0XHRcdHJldHVybiBnZXROZXdEb2N4RGF0YSh3RG9jKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0dmFyaWFudENoaWxkcmVuXHJcblx0XHRcdH1cclxuXHRcdH1lbHNle1xyXG5cdFx0XHR0aGlzLnZhcmlhbnRDaGlsZHJlbi5tYXAodmFyaWFudD0+e1xyXG5cdFx0XHRcdGxldCBwYXJlbnQ9dmFyaWFudC53WG1sLnBhcmVudE5vZGVcclxuXHRcdFx0XHR2YXJpYW50LmFzc2VtYmxlZFhtbCAmJiBwYXJlbnQuYXBwZW5kQ2hpbGQodmFyaWFudC5hc3NlbWJsZWRYbWwpXHJcblx0XHRcdFx0cGFyZW50LnJlbW92ZUNoaWxkKHZpYXJpYW50LndYbWwpXHJcblx0XHRcdH0pXHJcblx0XHRcdHdEb2MuX3NlcmlhbGl6ZSgpXHJcblx0XHRcdGxldCBuZXdEb2N4RGF0YT1nZXROZXdEb2N4RGF0YSh3RG9jKVxyXG5cdFx0XHR3RG9jLl9yZXN0b3JlKClcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRzYXZlKGZpbGUpe1xyXG5cdFx0XHRcdFx0ZG9TYXZlKG5ld0RvY3hEYXRhLGZpbGUpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRwYXJzZSgpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIGRvY3g0anMubG9hZChuZXdEb2N4RGF0YSkucGFyc2UoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZGF0YTpuZXdEb2N4RGF0YSxcclxuXHRcdFx0XHR2YXJpYW50Q2hpbGRyZW5cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHRyYW5zYWN0aW9uYWwpe1xyXG5cdFx0XHR0aGlzLmFzc2VtYmxlPWZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwidHJhbnNhY3Rpb25hbCBhc3NlbWJseSBjYW4ndCBzdXBwb3J0IG11bHRpcGxlIHRpbWVzIGFzc2VtYmxpbmdcIilcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuaW1wb3J0IERvY3hEb2N1bWVudCBmcm9tIFwiZG9jeDRqc1wiXHJcbmltcG9ydCBQYXJ0IGZyb20gXCJkb2N4NGpzL2xpYi9vcGVueG1sL3BhcnRcIlxyXG5cclxudmFyIHhtbGRvbT1cInhtbGRvbVwiO1xyXG4oZnVuY3Rpb24oWE1MU2VyaWFsaXplcil7XHJcblx0T2JqZWN0LmFzc2lnbihQYXJ0LnByb3RvdHlwZSx7XHJcblx0XHRzZXRDaGFuZ2VkKGEpe1xyXG5cdFx0XHR2YXIge19jaGFuZ2VkUGFydHM9bmV3IFNldCgpfT10aGlzLmRvY1xyXG5cdFx0XHR0aGlzLmRvYy5fY2hhbmdlZFBhcnRzPV9jaGFuZ2VkUGFydHNcclxuXHJcblx0XHRcdF9jaGFuZ2VkUGFydHNbYSA/ICdhZGQnIDogJ3JlbW92ZSddKHRoaXMpXHJcblx0XHR9LFxyXG5cdFx0X3NlcmlhbGl6ZSgpe1xyXG5cdFx0XHR0aGlzLmRvYy5yYXcuZmlsZSh0aGlzLm5hbWUsIGA8P3htbCB2ZXJzaW9uPVwiMS4wXCIgZW5jb2Rpbmc9XCJVVEYtOFwiIHN0YW5kYWxvbmU9XCJ5ZXNcIj8+XFxyXFxuJHsobmV3IFhNTFNlcmlhbGl6ZXIoKSkuc2VyaWFsaXplVG9TdHJpbmcodGhpcy5kb2N1bWVudEVsZW1lbnQpfWApXHJcblx0XHR9LFxyXG5cclxuXHRcdGdldEZvbGRlckFuZFJlbE5hbWUoKXtcclxuXHRcdFx0dmFyIG5hbWU9dGhpcy5uYW1lXHJcblx0XHRcdHZhciBpPW5hbWUubGFzdEluZGV4T2YoJy8nKSxmb2xkZXIscmVsTmFtZVxyXG5cdFx0XHRpZihpIT09LTEpe1xyXG5cdFx0XHRcdGZvbGRlcj1uYW1lLnN1YnN0cmluZygwLGkpXHJcblx0XHRcdFx0cmVsTmFtZT1mb2xkZXIrXCIvX3JlbHMvXCIrbmFtZS5zdWJzdHJpbmcoaSsxKStcIi5yZWxzXCI7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGZvbGRlcj1cIlwiXHJcblx0XHRcdFx0cmVsTmFtZT1cIl9yZWxzL1wiK25hbWUrXCIucmVsc1wiXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIFtmb2xkZXIsIHJlbE5hbWVdXHJcblx0XHR9LFxyXG5cclxuXHRcdGFkZFJlbChyZWwpe1xyXG5cdFx0XHR2YXIgW2ZvbGRlciwgcmVsTmFtZV09dGhpcy5nZXRGb2xkZXJBbmRSZWxOYW1lKClcclxuXHRcdFx0dmFyIGlkPWBySWQke01hdGgubWF4KC4uLk9iamVjdC5rZXlzKHRoaXMucmVscykubWFwKGE9PnBhcnNlSW50KGEuc3Vic3RyaW5nKDMpKSkpKzF9YFxyXG5cdFx0XHR0aGlzLnJlbHNbaWRdPXJlbFxyXG5cdFx0XHR2YXIge3R5cGUsIHRhcmdldH09cmVsXHJcblx0XHRcdGlmKHR5cGVvZih0YXJnZXQpPT0nc3RyaW5nJylcclxuXHRcdFx0XHRyZWwudGFyZ2V0TW9kZT1cIkV4dGVybmFsXCJcclxuXHRcdFx0ZWxzZSBpZih0eXBlLmVuZHNXaXRoKFwiL2ltYWdlXCIpKXtcclxuXHRcdFx0XHRsZXQgdGFyZ2V0TmFtZT1cIm1lZGlhL2ltYWdlXCIrKE1hdGgubWF4KC4uLk9iamVjdC5rZXlzKHRoaXMucmVscykubWFwKGE9PntcclxuXHRcdFx0XHRcdFx0bGV0IHQ9dGhpcy5yZWxzW2FdXHJcblx0XHRcdFx0XHRcdGlmKHQudHlwZT09J2ltYWdlJyYmIXQudGFyZ2V0TW9kZSlcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcGFyc2VJbnQodC50YXJnZXQubWF0Y2goL1xcZCsvKVswXXx8XCIwXCIpXHJcblxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gMFxyXG5cdFx0XHRcdFx0fSkpKzEpK1wiLmpwZ1wiO1xyXG5cdFx0XHRcdGxldCBwYXJ0TmFtZT1gJHtmb2xkZXJ9LyR7dGFyZ2V0TmFtZX1gXHJcblx0XHRcdFx0dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUsIHRhcmdldClcclxuXHRcdFx0XHR0aGlzLmRvYy5wYXJ0c1twYXJ0TmFtZV09dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUpXHJcblx0XHRcdFx0cmVsLnRhcmdldD1wYXJ0TmFtZVxyXG5cdFx0XHRcdHR5cGU9XCJpbWFnZVwiXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciByZWxQYXJ0PXRoaXMuZG9jLmdldFBhcnQocmVsTmFtZSlcclxuXHRcdFx0dmFyIHJvb3Q9cmVsUGFydC5kb2N1bWVudEVsZW1lbnQsXHJcblx0XHRcdFx0ZWw9cm9vdC5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1JlbGF0aW9uc2hpcCcpXHJcblx0XHRcdGVsLnNldEF0dHJpYnV0ZShcIklkXCIsaWQpXHJcblx0XHRcdHZhciBuYW1pbmc9KGEpPT5hLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK2Euc3Vic3RyKDEpXHJcblx0XHRcdE9iamVjdC5rZXlzKHJlbCkuZm9yRWFjaChhPT5lbC5zZXRBdHRyaWJ1dGUobmFtaW5nKGEpLHJlbFthXSkpXHJcblx0XHRcdHJvb3QuYXBwZW5kQ2hpbGQoZWwpXHJcblx0XHRcdHJlbC50eXBlPXR5cGVcclxuXHRcdFx0cmVsUGFydC5zZXRDaGFuZ2VkKHRydWUpXHJcblx0XHRcdHJldHVybiBpZFxyXG5cdFx0fSxcclxuXHJcblx0XHRyZW1vdmVSZWwoaWQpe1xyXG5cdFx0XHRkZWxldGUgdGhpcy5yZWxzW2lkXVxyXG5cdFx0XHR0aGlzLmRvY3VtZW50RWxlbWVudC4kMShgUmVsYXRpb25zaGlwW0lkPSR7aWR9XWApLnJlbW92ZSgpXHJcblx0XHRcdHZhciBbZm9sZGVyLCByZWxOYW1lXT10aGlzLmdldEZvbGRlckFuZFJlbE5hbWUoKVxyXG5cdFx0XHR0aGlzLmRvYy5nZXRQYXJ0KHJlbE5hbWUpLnNldENoYW5nZWQodHJ1ZSlcclxuXHRcdH1cclxuXHR9KVxyXG5cclxuXHRPYmplY3QuYXNzaWduKERvY3hEb2N1bWVudC5wcm90b3R5cGUse1xyXG5cdFx0X3NlcmlhbGl6ZSgpe1xyXG5cdFx0XHR2YXIge19jaGFuZ2VkUGFydHN9PXRoaXNcclxuXHRcdFx0aWYoX2NoYW5nZWRQYXJ0cyl7XHJcblx0XHRcdFx0X2NoYW5nZWRQYXJ0cy5mb3JFYWNoKHBhcnQ9PnBhcnQuX3NlcmlhbGl6ZSgpKVxyXG5cdFx0XHRcdGRlbGV0ZSB0aGlzLl9jaGFuZ2VkUGFydHNcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHJcblx0XHRfcmVzdG9yZSgpe1xyXG5cclxuXHRcdH1cclxuXHR9KVxyXG59KSgkLmlzTm9kZSA/IHJlcXVpcmUoeG1sZG9tKS5YTUxTZXJpYWxpemVyIDogWE1MU2VyaWFsaXplcilcclxuIl19