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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
			    variantChildren = this.variantChildren,
			    doSave = this.wDoc._doSave.bind(this.wDoc);

			if (transactional) {
				return {
					save: function save(file) {
						doSave(this.data, file);
					},
					parse: function parse() {
						var _arguments = arguments;

						return _docx4js2.default.load(this.data).then(function (docx) {
							return docx.parse.apply(docx, _arguments);
						});
					},

					get data() {
						wDoc._serialize();
						return getNewDocxData(wDoc);
					},
					get variantChildren() {
						return variantChildren;
					}
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
								var _arguments2 = arguments;

								return _docx4js2.default.load(newDocxData).then(function (docx) {
									return docx.parse.apply(docx, _arguments2);
								});
							},

							get data() {
								return newDocxData;
							},
							get variantChildren() {
								return variantChildren;
							}
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


function getNewDocxData(wDoc) {
	if ($.isNode) return wDoc.raw.generate({ type: "nodebuffer" });
	var data = wDoc.raw.generate({ type: "blob", mimeType: "application/docx" });
	data.name = "a.docx";

	return data;
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7QUFDcEIsVUFEb0IsUUFDcEIsR0FBYTt3QkFETyxVQUNQOztxRUFETyxzQkFFVixZQURHOztBQUVaLFNBQU8sTUFBUCxDQUFjLE1BQUssSUFBTCxFQUFVLFVBQVMsZUFBVCxFQUF5QjtBQUNoRCxPQUFJLDBCQUFKO09BQ0MscUJBQW1CLEVBQW5CO09BQ0EsV0FBUyxFQUFULENBSCtDO0FBSWhELFVBQU87QUFDTCx3Q0FBYSxTQUFRO0FBQ3BCLFNBQUcscUJBQ0YscUJBQW1CLGVBQW5CLEVBQ0EsUUFBUSxJQUFSLENBQWEsWUFBYixDQUEwQixJQUExQixFQUErQixRQUFRLEdBQVIsQ0FBL0IsQ0FGRDs7QUFJQSxTQUFHLHFCQUFtQixlQUFuQixFQUNGLFFBQVEsV0FBUixHQUFvQixJQUFwQixDQUREOztBQUdBLGFBQU8sUUFBUSxJQUFSO0FBQ1AsV0FBSyxhQUFMLENBREE7QUFFQSxXQUFLLGlCQUFMO0FBQ0MsZUFBUSxhQUFSLEdBQXNCLGlCQUF0QixDQUREO0FBRUMseUJBQWtCLGVBQWxCLENBQWtDLElBQWxDLENBQXVDLE9BQXZDLEVBRkQ7QUFHQyxnQkFBUyxRQUFRLEdBQVIsQ0FBVCxHQUFzQixPQUF0QixDQUhEO0FBSUEsYUFKQTtBQUZBLFdBT0ssWUFBTCxDQVBBO0FBUUEsV0FBSyxhQUFMO0FBQ0MsZUFBUSxhQUFSLEdBQXNCLGlCQUF0QixDQUREO0FBRUMseUJBQWtCLGVBQWxCLENBQWtDLElBQWxDLENBQXVDLE9BQXZDLEVBRkQ7QUFHQywwQkFBbUIsSUFBbkIsQ0FBd0IsaUJBQXhCLEVBSEQ7QUFJQyxnQkFBUyxRQUFRLEdBQVIsQ0FBVCxHQUFzQixPQUF0QixDQUpEO0FBUkEsV0FhSyxVQUFMO0FBQ0MsMkJBQWtCLE9BQWxCLENBREQ7QUFi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MkJBQUssTUFBSztBQUNULGVBQU8sV0FBUCxFQUFtQixJQUFuQixFQURTO1FBREo7QUFJTiwrQkFBTzs7O0FBQ04sZUFBTyxrQkFBUSxJQUFSLENBQWEsV0FBYixFQUEwQixJQUExQixDQUErQjtnQkFBTSxLQUFLLEtBQUw7U0FBTixDQUF0QyxDQURNO1FBSkQ7O0FBT04sV0FBSSxJQUFKLEdBQVU7QUFDVCxlQUFPLFdBQVAsQ0FEUztRQUFWO0FBR0EsV0FBSSxlQUFKLEdBQXFCO0FBQ3BCLGVBQU8sZUFBUCxDQURvQjtRQUFyQjs7TUFWRDtRQVRJOzs7SUFoQkw7O0FBeUNBLE9BQUcsYUFBSCxFQUFpQjtBQUNoQixTQUFLLFFBQUwsR0FBYyxZQUFVO0FBQ3ZCLFdBQU0sSUFBSSxLQUFKLENBQVUsZ0VBQVYsQ0FBTixDQUR1QjtLQUFWLENBREU7SUFBakI7Ozs7UUFoSW1COzs7Ozs7QUF3SXJCLFNBQVMsY0FBVCxDQUF3QixJQUF4QixFQUE2QjtBQUM1QixLQUFHLEVBQUUsTUFBRixFQUNGLE9BQU8sS0FBSyxHQUFMLENBQVMsUUFBVCxDQUFrQixFQUFDLE1BQUssWUFBTCxFQUFuQixDQUFQLENBREQ7QUFFQSxLQUFJLE9BQUssS0FBSyxHQUFMLENBQVMsUUFBVCxDQUFrQixFQUFDLE1BQU0sTUFBTixFQUFhLFVBQVUsa0JBQVYsRUFBaEMsQ0FBTCxDQUh3QjtBQUk1QixNQUFLLElBQUwsR0FBVSxRQUFWLENBSjRCOztBQU01QixRQUFPLElBQVAsQ0FONEI7Q0FBN0IiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXNwcmltYSBmcm9tIFwiZXNwcmltYVwiXHJcbmltcG9ydCBlc2NvZGVnZW4gZnJvbSBcImVzY29kZWdlblwiXHJcblxyXG5pbXBvcnQgZG9jeDRqcyBmcm9tIFwiZG9jeDRqc1wiXHJcbmltcG9ydCBCYXNlRG9jdW1lbnQgZnJvbSBcImRvY3g0anMvbGliL29wZW54bWwvZG9jeC9tb2RlbC9kb2N1bWVudFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudCBleHRlbmRzIEJhc2VEb2N1bWVudHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLndEb2MsZnVuY3Rpb24odmFyaWFudERvY3VtZW50KXtcclxuXHRcdFx0bGV0IF9jdXJyZW50Q29udGFpbmVyLFxyXG5cdFx0XHRcdF92YXJpYW50Q29udGFpbmVycz1bXSxcclxuXHRcdFx0XHR2YXJpYW50cz17fVxyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0YmVnaW5WYXJpYW50KHZhcmlhbnQpe1xyXG5cdFx0XHRcdFx0XHRpZihfY3VycmVudENvbnRhaW5lciAmJlxyXG5cdFx0XHRcdFx0XHRcdF9jdXJyZW50Q29udGFpbmVyIT12YXJpYW50RG9jdW1lbnQpXHJcblx0XHRcdFx0XHRcdFx0dmFyaWFudC53WG1sLnNldEF0dHJpYnV0ZSgnaWQnLHZhcmlhbnQudklkKVxyXG5cclxuXHRcdFx0XHRcdFx0aWYoX2N1cnJlbnRDb250YWluZXI9PXZhcmlhbnREb2N1bWVudClcclxuXHRcdFx0XHRcdFx0XHR2YXJpYW50LmlzUm9vdENoaWxkPXRydWVcclxuXHJcblx0XHRcdFx0XHRcdHN3aXRjaCh2YXJpYW50LnR5cGUpe1xyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmV4cCc6XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQucGljdHVyZSc6XHJcblx0XHRcdFx0XHRcdFx0dmFyaWFudC52YXJpYW50UGFyZW50PV9jdXJyZW50Q29udGFpbmVyXHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXIudmFyaWFudENoaWxkcmVuLnB1c2godmFyaWFudClcclxuXHRcdFx0XHRcdFx0XHR2YXJpYW50c1t2YXJpYW50LnZJZF09dmFyaWFudFxyXG5cdFx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmlmJzpcclxuXHRcdFx0XHRcdFx0Y2FzZSAndmFyaWFudC5mb3InOlxyXG5cdFx0XHRcdFx0XHRcdHZhcmlhbnQudmFyaWFudFBhcmVudD1fY3VycmVudENvbnRhaW5lclxyXG5cdFx0XHRcdFx0XHRcdF9jdXJyZW50Q29udGFpbmVyLnZhcmlhbnRDaGlsZHJlbi5wdXNoKHZhcmlhbnQpXHJcblx0XHRcdFx0XHRcdFx0X3ZhcmlhbnRDb250YWluZXJzLnB1c2goX2N1cnJlbnRDb250YWluZXIpXHJcblx0XHRcdFx0XHRcdFx0dmFyaWFudHNbdmFyaWFudC52SWRdPXZhcmlhbnRcclxuXHRcdFx0XHRcdFx0Y2FzZSAnZG9jdW1lbnQnOlxyXG5cdFx0XHRcdFx0XHRcdF9jdXJyZW50Q29udGFpbmVyPXZhcmlhbnRcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdmFyaWFudFxyXG5cdFx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0XHRlbmRWYXJpYW50KHZhcmlhbnQpe1xyXG5cdFx0XHRcdFx0XHRzd2l0Y2godmFyaWFudC50eXBlKXtcclxuXHRcdFx0XHRcdFx0Y2FzZSAndmFyaWFudC5pZic6XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuZm9yJzpcclxuXHRcdFx0XHRcdFx0XHRfY3VycmVudENvbnRhaW5lcj1fdmFyaWFudENvbnRhaW5lcnMucG9wKClcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0XHR2YXJpYW50c1xyXG5cdFx0XHR9XHJcblx0XHR9KHRoaXMpKVxyXG5cclxuXHRcdHRoaXMudmFyaWFudFBhcmVudD1udWxsXHJcblx0XHR0aGlzLnZhcmlhbnRDaGlsZHJlbj1bXVxyXG5cdFx0dGhpcy5wYXJzZWRDb2RlPWVzcHJpbWEucGFyc2UoXCJ3aXRoKGRhdGEpe3dpdGgodmFyaWFudHMpe319XCIpXHJcblx0XHR0aGlzLmNvZGVCbG9jaz10aGlzLnBhcnNlZENvZGUuYm9keVswXS5ib2R5LmJvZHlbMF0uYm9keS5ib2R5XHJcblx0XHR0aGlzLndEb2MuYmVnaW5WYXJpYW50KHRoaXMpXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQqIHdoaWNoIG1ha2VzIGl0IGFzIGEgdmFyaWFudFxyXG5cdCovXHJcblx0cGFyc2UoKXtcclxuXHRcdHZhciByPXN1cGVyLnBhcnNlKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMud0RvYy5lbmRWYXJpYW50KHRoaXMpXHJcblxyXG5cdFx0aWYodHlwZW9mKHRoaXMucGFyc2VkQ29kZSkhPSdmdW5jdGlvbicpe1xyXG5cdFx0XHR2YXIgY29kZT1lc2NvZGVnZW4uZ2VuZXJhdGUodGhpcy5wYXJzZWRDb2RlKVxyXG5cdFx0XHQvL2NvbnNvbGUubG9nKGNvZGUpXHJcblx0XHRcdHRoaXMucGFyc2VkQ29kZT1uZXcgRnVuY3Rpb24oXCJkYXRhLHZhcmlhbnRzXCIsZXNjb2RlZ2VuLmdlbmVyYXRlKHRoaXMucGFyc2VkQ29kZSkpXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJcclxuXHR9XHJcblxyXG5cdHZpc2l0KCl7XHJcblx0XHQvL3doaWNoIG1ha2VzIHRoZSBjbGFzcyBhcyBhIHZpc2l0b3JcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCogcHVibGljIEFQSSBmb3IgdmFyaWFudCBkb2N4XHJcblx0Ki9cclxuXHRhc3NlbWJsZShkYXRhLCB0cmFuc2FjdGlvbmFsKXtcclxuXHRcdGlmKCF0cmFuc2FjdGlvbmFsKVxyXG5cdFx0XHR0aGlzLnZhcmlhbnRDaGlsZHJlbi5mb3JFYWNoKGE9PmEuYXNzZW1ibGVkWG1sPWEud1htbC5jbG9uZU5vZGUodHJ1ZSkgKVxyXG5cclxuXHRcdHRoaXMucGFyc2VkQ29kZS5jYWxsKHt9LCBkYXRhLCB0aGlzLndEb2MudmFyaWFudHMpXHJcblxyXG5cdFx0bGV0IHdEb2M9dGhpcy53RG9jLFxyXG5cdFx0XHR2YXJpYW50Q2hpbGRyZW49dGhpcy52YXJpYW50Q2hpbGRyZW4sXHJcblx0XHRcdGRvU2F2ZT10aGlzLndEb2MuX2RvU2F2ZS5iaW5kKHRoaXMud0RvYylcclxuXHJcblx0XHRpZih0cmFuc2FjdGlvbmFsKXtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRzYXZlKGZpbGUpe1xyXG5cdFx0XHRcdFx0ZG9TYXZlKHRoaXMuZGF0YSwgZmlsZSlcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHBhcnNlKCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gZG9jeDRqcy5sb2FkKHRoaXMuZGF0YSkudGhlbihkb2N4PT5kb2N4LnBhcnNlKC4uLmFyZ3VtZW50cykpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRnZXQgZGF0YSgpe1xyXG5cdFx0XHRcdFx0d0RvYy5fc2VyaWFsaXplKClcclxuXHRcdFx0XHRcdHJldHVybiBnZXROZXdEb2N4RGF0YSh3RG9jKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Z2V0IHZhcmlhbnRDaGlsZHJlbigpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIHZhcmlhbnRDaGlsZHJlblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHRoaXMudmFyaWFudENoaWxkcmVuLm1hcCh2YXJpYW50PT57XHJcblx0XHRcdFx0bGV0IHBhcmVudD12YXJpYW50LndYbWwucGFyZW50Tm9kZVxyXG5cdFx0XHRcdHZhcmlhbnQuYXNzZW1ibGVkWG1sICYmIHBhcmVudC5hcHBlbmRDaGlsZCh2YXJpYW50LmFzc2VtYmxlZFhtbClcclxuXHRcdFx0XHRwYXJlbnQucmVtb3ZlQ2hpbGQodmlhcmlhbnQud1htbClcclxuXHRcdFx0fSlcclxuXHRcdFx0d0RvYy5fc2VyaWFsaXplKClcclxuXHRcdFx0bGV0IG5ld0RvY3hEYXRhPWdldE5ld0RvY3hEYXRhKHdEb2MpXHJcblx0XHRcdHdEb2MuX3Jlc3RvcmUoKVxyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHNhdmUoZmlsZSl7XHJcblx0XHRcdFx0XHRkb1NhdmUobmV3RG9jeERhdGEsZmlsZSlcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHBhcnNlKCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gZG9jeDRqcy5sb2FkKG5ld0RvY3hEYXRhKS50aGVuKGRvY3g9PmRvY3gucGFyc2UoLi4uYXJndW1lbnRzKSlcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGdldCBkYXRhKCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gbmV3RG9jeERhdGFcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGdldCB2YXJpYW50Q2hpbGRyZW4oKXtcclxuXHRcdFx0XHRcdHJldHVybiB2YXJpYW50Q2hpbGRyZW5cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZih0cmFuc2FjdGlvbmFsKXtcclxuXHRcdFx0dGhpcy5hc3NlbWJsZT1mdW5jdGlvbigpe1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcInRyYW5zYWN0aW9uYWwgYXNzZW1ibHkgY2FuJ3Qgc3VwcG9ydCBtdWx0aXBsZSB0aW1lcyBhc3NlbWJsaW5nXCIpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE5ld0RvY3hEYXRhKHdEb2Mpe1xyXG5cdGlmKCQuaXNOb2RlKVxyXG5cdFx0cmV0dXJuIHdEb2MucmF3LmdlbmVyYXRlKHt0eXBlOlwibm9kZWJ1ZmZlclwifSlcclxuXHR2YXIgZGF0YT13RG9jLnJhdy5nZW5lcmF0ZSh7dHlwZTogXCJibG9iXCIsbWltZVR5cGU6IFwiYXBwbGljYXRpb24vZG9jeFwifSlcclxuXHRkYXRhLm5hbWU9XCJhLmRvY3hcIlxyXG5cclxuXHRyZXR1cm4gZGF0YVxyXG59XHJcbiJdfQ==