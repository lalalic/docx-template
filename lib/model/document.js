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

			if (typeof this.parsedCode != 'function') this.parsedCode = new Function("data,variants", _escodegen2.default.generate(this.parsedCode));

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
		getFolderAndRelName: function getFolderAndRelName() {
			var i = name.lastIndexOf('/'),
			    folder,
			    relName;
			if (i !== -1) {
				folder = name.substring(0, i + 1);
				relName = folder + "/_rels/" + name.substring(i + 1) + ".rels";
			}{
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
				var partName = "" + folder + targetName;
				this.doc.raw.file(partName, target);
				this.doc.parts[partName] = this.doc.raw.file(partName);
				rel.target = targetName;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUVBOzs7O0FBK0lBOzs7Ozs7Ozs7Ozs7OztBQTVJQSxTQUFTLGNBQVQsQ0FBd0IsSUFBeEIsRUFBNkI7QUFDNUIsUUFBTyxFQUFFLE1BQUYsR0FBVyxLQUFLLEdBQUwsQ0FBUyxRQUFULENBQWtCLEVBQUMsTUFBSyxZQUFMLEVBQW5CLENBQVgsR0FBb0QsS0FBSyxHQUFMLENBQVMsUUFBVCxDQUFrQixFQUFDLE1BQU0sTUFBTixFQUFhLFVBQVUsa0JBQVYsRUFBaEMsQ0FBcEQsQ0FEcUI7Q0FBN0I7O0FBSUEsU0FBUyxNQUFULENBQWdCLFdBQWhCLEVBQTRCLElBQTVCLEVBQWlDO0FBQ2hDLEtBQUcsRUFBRSxNQUFGLEVBQVM7QUFDWCxNQUFJLEtBQUcsSUFBSCxDQURPO0FBRVgsVUFBUSxFQUFSLEVBQVksU0FBWixDQUFzQixRQUFTLEtBQUssR0FBTCxZQUFULEVBQTJCLFdBQWpELEVBRlc7RUFBWixNQUdLO0FBQ0osTUFBSSxNQUFNLE9BQU8sR0FBUCxDQUFXLGVBQVgsQ0FBMkIsV0FBM0IsQ0FBTixDQURBO0FBRUosTUFBSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixHQUF2QixDQUFQLENBRkE7QUFHSixXQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLElBQTFCLEVBSEk7QUFJSixPQUFLLFFBQUwsSUFBbUIsUUFBTSxLQUFOLFdBQW5CLENBSkk7QUFLSixPQUFLLElBQUwsR0FBWSxHQUFaLENBTEk7QUFNSixPQUFLLEtBQUwsR0FOSTtBQU9KLFdBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsSUFBMUIsRUFQSTtFQUhMO0NBREQ7O0lBZXFCOzs7QUFDcEIsVUFEb0IsUUFDcEIsR0FBYTt3QkFETyxVQUNQOztxRUFETyxzQkFFVixZQURHOztBQUVaLFNBQU8sTUFBUCxDQUFjLE1BQUssSUFBTCxF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UCxDQUFZLEdBQVosRUFBaUIsT0FBakIsQ0FBeUI7V0FBRyxHQUFHLFlBQUgsQ0FBZ0IsT0FBTyxDQUFQLENBQWhCLEVBQTBCLElBQUksQ0FBSixDQUExQjtJQUFILENBQXpCLENBM0JVO0FBNEJWLFFBQUssV0FBTCxDQUFpQixFQUFqQixFQTVCVTtBQTZCVixPQUFJLElBQUosR0FBUyxJQUFULENBN0JVO0FBOEJWLFdBQVEsVUFBUixDQUFtQixJQUFuQixFQTlCVTtBQStCVixVQUFPLEVBQVAsQ0EvQlU7R0F2QmlCO0FBeUQ1QixnQ0FBVSxJQUFHO0FBQ1osVUFBTyxLQUFLLElBQUwsQ0FBVSxFQUFWLENBQVAsQ0FEWTtBQUVaLFFBQUssZUFBTCxDQUFxQixFQUFyQixzQkFBMkMsUUFBM0MsRUFBa0QsTUFBbEQsR0FGWTs7K0JBR1UsS0FBSyxtQkFBTCxHQUhWOzs7O09BR1Asa0NBSE87T0FHQyxtQ0FIRDs7QUFJWixRQUFLLEdBQUwsQ0FBUyxPQUFULENBQWlCLE9BQWpCLEVBQTBCLFVBQTFCLENBQXFDLElBQXJDLEVBSlk7R0F6RGU7RUFBN0IsRUFEdUI7O0FBa0V2QixRQUFPLE1BQVAsQ0FBYyxrQkFBYSxTQUFiLEVBQXVCO0FBQ3BDLG9DQUFZO09BQ04sZ0JBQWUsS0FBZixjQURNOztBQUVYLE9BQUcsYUFBSCxFQUFpQjtBQUNoQixrQkFBYyxPQUFkLENBQXNCO1lBQU0sS0FBSyxVQUFMO0tBQU4sQ0FBdEIsQ0FEZ0I7QUFFaEIsV0FBTyxLQUFLLGFBQUwsQ0FGUztJQUFqQjtHQUhtQztBQVNwQyxnQ0FBVSxFQVQwQjtFQUFyQyxFQWxFdUI7Q0FBdkIsQ0FBRCxDQStFRyxFQUFFLE1BQUYsR0FBVyxRQUFRLE1BQVIsRUFBZ0IsYUFBaEIsR0FBZ0MsYUFBM0MsQ0EvRUgiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXNwcmltYSBmcm9tIFwiZXNwcmltYVwiXHJcbmltcG9ydCBlc2NvZGVnZW4gZnJvbSBcImVzY29kZWdlblwiXHJcblxyXG5pbXBvcnQgZG9jeDRqcyBmcm9tIFwiZG9jeDRqc1wiXHJcblxyXG5pbXBvcnQgQmFzZURvY3VtZW50IGZyb20gXCJkb2N4NGpzL2xpYi9vcGVueG1sL2RvY3gvbW9kZWwvZG9jdW1lbnRcIlxyXG5cclxuXHJcbmZ1bmN0aW9uIGdldE5ld0RvY3hEYXRhKHdEb2Mpe1xyXG5cdHJldHVybiAkLmlzTm9kZSA/IHdEb2MucmF3LmdlbmVyYXRlKHt0eXBlOlwibm9kZWJ1ZmZlclwifSkgOiB3RG9jLnJhdy5nZW5lcmF0ZSh7dHlwZTogXCJibG9iXCIsbWltZVR5cGU6IFwiYXBwbGljYXRpb24vZG9jeFwifSlcclxufVxyXG5cclxuZnVuY3Rpb24gZG9TYXZlKG5ld0RvY3hEYXRhLGZpbGUpe1xyXG5cdGlmKCQuaXNOb2RlKXtcclxuXHRcdGxldCBmcz1cImZzXCJcclxuXHRcdHJlcXVpcmUoZnMpLndyaXRlRmlsZShmaWxlfHxgJHtEYXRlLm5vdygpfS5kb2N4YCxuZXdEb2N4RGF0YSlcclxuXHR9ZWxzZXtcclxuXHRcdGxldCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChuZXdEb2N4RGF0YSlcclxuXHRcdGxldCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XHJcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspXHJcblx0XHRsaW5rLmRvd25sb2FkID0gYCR7ZmlsZXx8J25ldyd9LmRvY3hgO1xyXG5cdFx0bGluay5ocmVmID0gdXJsO1xyXG5cdFx0bGluay5jbGljaygpXHJcblx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudCBleHRlbmRzIEJhc2VEb2N1bWVudHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLndEb2MsZnVuY3Rpb24odmFyaWFudERvY3VtZW50KXtcclxuXHRcdFx0bGV0IF9jdXJyZW50Q29udGFpbmVyLFxyXG5cdFx0XHRcdF92YXJpYW50Q29udGFpbmVycz1bXSxcclxuXHRcdFx0XHR2YXJpYW50cz17fVxyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0YmVnaW5WYXJpYW50KHZhcmlhbnQpe1xyXG5cdFx0XHRcdFx0XHRpZihfY3VycmVudENvbnRhaW5lciAmJlxyXG5cdFx0XHRcdFx0XHRcdF9jdXJyZW50Q29udGFpbmVyIT12YXJpYW50RG9jdW1lbnQpXHJcblx0XHRcdFx0XHRcdFx0dmFyaWFudC53WG1sLnNldEF0dHJpYnV0ZSgnaWQnLHZhcmlhbnQudklkKVxyXG5cclxuXHRcdFx0XHRcdFx0aWYoX2N1cnJlbnRDb250YWluZXI9PXZhcmlhbnREb2N1bWVudClcclxuXHRcdFx0XHRcdFx0XHR2YXJpYW50LmlzUm9vdENoaWxkPXRydWVcclxuXHJcblx0XHRcdFx0XHRcdHN3aXRjaCh2YXJpYW50LnR5cGUpe1xyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmV4cCc6XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQucGljdHVyZSc6XHJcblx0XHRcdFx0XHRcdFx0dmFyaWFudC52YXJpYW50UGFyZW50PV9jdXJyZW50Q29udGFpbmVyXHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXIudmFyaWFudENoaWxkcmVuLnB1c2godmFyaWFudClcclxuXHRcdFx0XHRcdFx0XHR2YXJpYW50c1t2YXJpYW50LnZJZF09dmFyaWFudFxyXG5cdFx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmlmJzpcclxuXHRcdFx0XHRcdFx0Y2FzZSAndmFyaWFudC5mb3InOlxyXG5cdFx0XHRcdFx0XHRcdHZhcmlhbnQudmFyaWFudFBhcmVudD1fY3VycmVudENvbnRhaW5lclxyXG5cdFx0XHRcdFx0XHRcdF9jdXJyZW50Q29udGFpbmVyLnZhcmlhbnRDaGlsZHJlbi5wdXNoKHZhcmlhbnQpXHJcblx0XHRcdFx0XHRcdFx0X3ZhcmlhbnRDb250YWluZXJzLnB1c2goX2N1cnJlbnRDb250YWluZXIpXHJcblx0XHRcdFx0XHRcdFx0dmFyaWFudHNbdmFyaWFudC52SWRdPXZhcmlhbnRcclxuXHRcdFx0XHRcdFx0Y2FzZSAnZG9jdW1lbnQnOlxyXG5cdFx0XHRcdFx0XHRcdF9jdXJyZW50Q29udGFpbmVyPXZhcmlhbnRcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdmFyaWFudFxyXG5cdFx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0XHRlbmRWYXJpYW50KHZhcmlhbnQpe1xyXG5cdFx0XHRcdFx0XHRzd2l0Y2godmFyaWFudC50eXBlKXtcclxuXHRcdFx0XHRcdFx0Y2FzZSAndmFyaWFudC5pZic6XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuZm9yJzpcclxuXHRcdFx0XHRcdFx0XHRfY3VycmVudENvbnRhaW5lcj1fdmFyaWFudENvbnRhaW5lcnMucG9wKClcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0XHR2YXJpYW50c1xyXG5cdFx0XHR9XHJcblx0XHR9KHRoaXMpKVxyXG5cclxuXHRcdHRoaXMudmFyaWFudFBhcmVudD1udWxsXHJcblx0XHR0aGlzLnZhcmlhbnRDaGlsZHJlbj1bXVxyXG5cdFx0dGhpcy5wYXJzZWRDb2RlPWVzcHJpbWEucGFyc2UoXCJ3aXRoKGRhdGEpe3dpdGgodmFyaWFudHMpe319XCIpXHJcblx0XHR0aGlzLmNvZGVCbG9jaz10aGlzLnBhcnNlZENvZGUuYm9keVswXS5ib2R5LmJvZHlbMF0uYm9keS5ib2R5XHJcblx0XHR0aGlzLndEb2MuYmVnaW5WYXJpYW50KHRoaXMpXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQqIHdoaWNoIG1ha2VzIGl0IGFzIGEgdmFyaWFudFxyXG5cdCovXHJcblx0cGFyc2UoKXtcclxuXHRcdHZhciByPXN1cGVyLnBhcnNlKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMud0RvYy5lbmRWYXJpYW50KHRoaXMpXHJcblxyXG5cdFx0aWYodHlwZW9mKHRoaXMucGFyc2VkQ29kZSkhPSdmdW5jdGlvbicpXHJcblx0XHRcdHRoaXMucGFyc2VkQ29kZT1uZXcgRnVuY3Rpb24oXCJkYXRhLHZhcmlhbnRzXCIsZXNjb2RlZ2VuLmdlbmVyYXRlKHRoaXMucGFyc2VkQ29kZSkpXHJcblxyXG5cdFx0cmV0dXJuIHJcclxuXHR9XHJcblxyXG5cdHZpc2l0KCl7XHJcblx0XHQvL3doaWNoIG1ha2VzIHRoZSBjbGFzcyBhcyBhIHZpc2l0b3JcclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQqIHB1YmxpYyBBUEkgZm9yIHZhcmlhbnQgZG9jeFxyXG5cdCovXHJcblx0YXNzZW1ibGUoZGF0YSwgdHJhbnNhY3Rpb25hbCl7XHJcblx0XHRpZighdHJhbnNhY3Rpb25hbClcclxuXHRcdFx0dGhpcy52YXJpYW50Q2hpbGRyZW4uZm9yRWFjaChhPT5hLmFzc2VtYmxlZFhtbD1hLndYbWwuY2xvbmVOb2RlKHRydWUpIClcclxuXHJcblx0XHR0aGlzLnBhcnNlZENvZGUuY2FsbCh7fSwgZGF0YSwgdGhpcy53RG9jLnZhcmlhbnRzKVxyXG5cclxuXHRcdGxldCB3RG9jPXRoaXMud0RvYywgdmFyaWFudENoaWxkcmVuPXRoaXMudmFyaWFudENoaWxkcmVuXHJcblxyXG5cdFx0aWYodHJhbnNhY3Rpb25hbCl7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0c2F2ZShmaWxlKXtcclxuXHRcdFx0XHRcdHdEb2MuX3NlcmlhbGl6ZSgpXHJcblx0XHRcdFx0XHRkb1NhdmUodGhpcy5kYXRhLCBmaWxlKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0cGFyc2UoKXtcclxuXHRcdFx0XHRcdHJldHVybiB3RG9jLnBhcnNlKC4uLmFyZ3VtZW50cylcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGdldCBkYXRhKCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gZ2V0TmV3RG9jeERhdGEod0RvYylcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHZhcmlhbnRDaGlsZHJlblxyXG5cdFx0XHR9XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0dGhpcy52YXJpYW50Q2hpbGRyZW4ubWFwKHZhcmlhbnQ9PntcclxuXHRcdFx0XHRsZXQgcGFyZW50PXZhcmlhbnQud1htbC5wYXJlbnROb2RlXHJcblx0XHRcdFx0dmFyaWFudC5hc3NlbWJsZWRYbWwgJiYgcGFyZW50LmFwcGVuZENoaWxkKHZhcmlhbnQuYXNzZW1ibGVkWG1sKVxyXG5cdFx0XHRcdHBhcmVudC5yZW1vdmVDaGlsZCh2aWFyaWFudC53WG1sKVxyXG5cdFx0XHR9KVxyXG5cdFx0XHR3RG9jLl9zZXJpYWxpemUoKVxyXG5cdFx0XHRsZXQgbmV3RG9jeERhdGE9Z2V0TmV3RG9jeERhdGEod0RvYylcclxuXHRcdFx0d0RvYy5fcmVzdG9yZSgpXHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0c2F2ZShmaWxlKXtcclxuXHRcdFx0XHRcdGRvU2F2ZShuZXdEb2N4RGF0YSxmaWxlKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0cGFyc2UoKXtcclxuXHRcdFx0XHRcdHJldHVybiBkb2N4NGpzLmxvYWQobmV3RG9jeERhdGEpLnBhcnNlKC4uLmFyZ3VtZW50cylcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGRhdGE6bmV3RG9jeERhdGEsXHJcblx0XHRcdFx0dmFyaWFudENoaWxkcmVuXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmltcG9ydCBEb2N4RG9jdW1lbnQgZnJvbSBcImRvY3g0anNcIlxyXG5pbXBvcnQgUGFydCBmcm9tIFwiZG9jeDRqcy9saWIvb3BlbnhtbC9wYXJ0XCJcclxuXHJcbnZhciB4bWxkb209XCJ4bWxkb21cIjtcclxuKGZ1bmN0aW9uKFhNTFNlcmlhbGl6ZXIpe1xyXG5cdE9iamVjdC5hc3NpZ24oUGFydC5wcm90b3R5cGUse1xyXG5cdFx0c2V0Q2hhbmdlZChhKXtcclxuXHRcdFx0dmFyIHtfY2hhbmdlZFBhcnRzPW5ldyBTZXQoKX09dGhpcy5kb2NcclxuXHRcdFx0dGhpcy5kb2MuX2NoYW5nZWRQYXJ0cz1fY2hhbmdlZFBhcnRzXHJcblxyXG5cdFx0XHRfY2hhbmdlZFBhcnRzW2EgPyAnYWRkJyA6ICdyZW1vdmUnXSh0aGlzKVxyXG5cdFx0fSxcclxuXHRcdF9zZXJpYWxpemUoKXtcclxuXHRcdFx0dGhpcy5kb2MucmF3LmZpbGUodGhpcy5uYW1lLCBgPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwiVVRGLThcIiBzdGFuZGFsb25lPVwieWVzXCI/PlxcclxcbiR7KG5ldyBYTUxTZXJpYWxpemVyKCkpLnNlcmlhbGl6ZVRvU3RyaW5nKHRoaXMuZG9jdW1lbnRFbGVtZW50KX1gKVxyXG5cdFx0fSxcclxuXHJcblx0XHRnZXRGb2xkZXJBbmRSZWxOYW1lKCl7XHJcblx0XHRcdHZhciBpPW5hbWUubGFzdEluZGV4T2YoJy8nKSxmb2xkZXIscmVsTmFtZVxyXG5cdFx0XHRpZihpIT09LTEpe1xyXG5cdFx0XHRcdGZvbGRlcj1uYW1lLnN1YnN0cmluZygwLGkrMSlcclxuXHRcdFx0XHRyZWxOYW1lPWZvbGRlcitcIi9fcmVscy9cIituYW1lLnN1YnN0cmluZyhpKzEpK1wiLnJlbHNcIjtcclxuXHRcdFx0fXtcclxuXHRcdFx0XHRmb2xkZXI9XCJcIlxyXG5cdFx0XHRcdHJlbE5hbWU9XCJfcmVscy9cIituYW1lK1wiLnJlbHNcIlxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBbZm9sZGVyLCByZWxOYW1lXVxyXG5cdFx0fSxcclxuXHJcblx0XHRhZGRSZWwocmVsKXtcclxuXHRcdFx0dmFyIFtmb2xkZXIsIHJlbE5hbWVdPXRoaXMuZ2V0Rm9sZGVyQW5kUmVsTmFtZSgpXHJcblx0XHRcdHZhciBpZD1gcklkJHtNYXRoLm1heCguLi5PYmplY3Qua2V5cyh0aGlzLnJlbHMpLm1hcChhPT5wYXJzZUludChhLnN1YnN0cmluZygzKSkpKSsxfWBcclxuXHRcdFx0dGhpcy5yZWxzW2lkXT1yZWxcclxuXHRcdFx0dmFyIHt0eXBlLCB0YXJnZXR9PXJlbFxyXG5cdFx0XHRpZih0eXBlb2YodGFyZ2V0KT09J3N0cmluZycpXHJcblx0XHRcdFx0cmVsLnRhcmdldE1vZGU9XCJFeHRlcm5hbFwiXHJcblx0XHRcdGVsc2UgaWYodHlwZS5lbmRzV2l0aChcIi9pbWFnZVwiKSl7XHJcblx0XHRcdFx0bGV0IHRhcmdldE5hbWU9XCJtZWRpYS9pbWFnZVwiKyhNYXRoLm1heCguLi5PYmplY3Qua2V5cyh0aGlzLnJlbHMpLm1hcChhPT57XHJcblx0XHRcdFx0XHRcdGxldCB0PXRoaXMucmVsc1thXVxyXG5cdFx0XHRcdFx0XHRpZih0LnR5cGU9PSdpbWFnZScmJiF0LnRhcmdldE1vZGUpXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHBhcnNlSW50KHQudGFyZ2V0Lm1hdGNoKC9cXGQrLylbMF18fFwiMFwiKVxyXG5cclxuXHRcdFx0XHRcdFx0cmV0dXJuIDBcclxuXHRcdFx0XHRcdH0pKSsxKStcIi5qcGdcIjtcclxuXHRcdFx0XHRsZXQgcGFydE5hbWU9YCR7Zm9sZGVyfSR7dGFyZ2V0TmFtZX1gXHJcblx0XHRcdFx0dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUsIHRhcmdldClcclxuXHRcdFx0XHR0aGlzLmRvYy5wYXJ0c1twYXJ0TmFtZV09dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUpXHJcblx0XHRcdFx0cmVsLnRhcmdldD10YXJnZXROYW1lXHJcblx0XHRcdFx0dHlwZT1cImltYWdlXCJcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHJlbFBhcnQ9dGhpcy5kb2MuZ2V0UGFydChyZWxOYW1lKVxyXG5cdFx0XHR2YXIgcm9vdD1yZWxQYXJ0LmRvY3VtZW50RWxlbWVudCxcclxuXHRcdFx0XHRlbD1yb290Lm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnUmVsYXRpb25zaGlwJylcclxuXHRcdFx0ZWwuc2V0QXR0cmlidXRlKFwiSWRcIixpZClcclxuXHRcdFx0dmFyIG5hbWluZz0oYSk9PmEuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkrYS5zdWJzdHIoMSlcclxuXHRcdFx0T2JqZWN0LmtleXMocmVsKS5mb3JFYWNoKGE9PmVsLnNldEF0dHJpYnV0ZShuYW1pbmcoYSkscmVsW2FdKSlcclxuXHRcdFx0cm9vdC5hcHBlbmRDaGlsZChlbClcclxuXHRcdFx0cmVsLnR5cGU9dHlwZVxyXG5cdFx0XHRyZWxQYXJ0LnNldENoYW5nZWQodHJ1ZSlcclxuXHRcdFx0cmV0dXJuIGlkXHJcblx0XHR9LFxyXG5cclxuXHRcdHJlbW92ZVJlbChpZCl7XHJcblx0XHRcdGRlbGV0ZSB0aGlzLnJlbHNbaWRdXHJcblx0XHRcdHRoaXMuZG9jdW1lbnRFbGVtZW50LiQxKGBSZWxhdGlvbnNoaXBbSWQ9JHtpZH1dYCkucmVtb3ZlKClcclxuXHRcdFx0dmFyIFtmb2xkZXIsIHJlbE5hbWVdPXRoaXMuZ2V0Rm9sZGVyQW5kUmVsTmFtZSgpXHJcblx0XHRcdHRoaXMuZG9jLmdldFBhcnQocmVsTmFtZSkuc2V0Q2hhbmdlZCh0cnVlKVxyXG5cdFx0fVxyXG5cdH0pXHJcblxyXG5cdE9iamVjdC5hc3NpZ24oRG9jeERvY3VtZW50LnByb3RvdHlwZSx7XHJcblx0XHRfc2VyaWFsaXplKCl7XHJcblx0XHRcdHZhciB7X2NoYW5nZWRQYXJ0c309dGhpc1xyXG5cdFx0XHRpZihfY2hhbmdlZFBhcnRzKXtcclxuXHRcdFx0XHRfY2hhbmdlZFBhcnRzLmZvckVhY2gocGFydD0+cGFydC5fc2VyaWFsaXplKCkpXHJcblx0XHRcdFx0ZGVsZXRlIHRoaXMuX2NoYW5nZWRQYXJ0c1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdF9yZXN0b3JlKCl7XHJcblxyXG5cdFx0fVxyXG5cdH0pXHJcbn0pKCQuaXNOb2RlID8gcmVxdWlyZSh4bWxkb20pLlhNTFNlcmlhbGl6ZXIgOiBYTUxTZXJpYWxpemVyKVxyXG4iXX0=