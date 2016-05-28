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
				wDoc._serialize();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7QUFDcEIsVUFEb0IsUUFDcEIsR0FBYTt3QkFETyxVQUNQOztxRUFETyxzQkFFVixZQURHOztBQUVaLFNBQU8sTUFBUCxDQUFjLE1BQUssSUFBTCxFQUFVLFVBQVMsZUFBVCxFQUF5QjtBQUNoRCxPQUFJLDBCQUFKO09BQ0MscUJBQW1CLEVBQW5CO09BQ0EsV0FBUyxFQUFULENBSCtDO0FBSWhELFVBQU87QUFDTCx3Q0FBYSxTQUFRO0FBQ3BCLFNBQUcscUJBQ0YscUJBQW1CLGVBQW5CLEVBQ0EsUUFBUSxJQUFSLENBQWEsWUFBYixDQUEwQixJQUExQixFQUErQixRQUFRLEdBQVIsQ0FBL0IsQ0FGRDs7QUFJQSxTQUFHLHFCQUFtQixlQUFuQixFQUNGLFFBQVEsV0FBUixHQUFvQixJQUFwQixDQUREOztBQUdBLGFBQU8sUUFBUSxJQUFSO0FBQ1AsV0FBSyxhQUFMLENBREE7QUFFQSxXQUFLLGlCQUFMO0FBQ0MsZUFBUSxhQUFSLEdBQXNCLGlCQUF0QixDQUREO0FBRUMseUJBQWtCLGVBQWxCLENBQWtDLElBQWxDLENBQXVDLE9BQXZDLEVBRkQ7QUFHQyxnQkFBUyxRQUFRLEdBQVIsQ0FBVCxHQUFzQixPQUF0QixDQUhEO0FBSUEsYUFKQTtBQUZBLFdBT0ssWUFBTCxDQVBBO0FBUUEsV0FBSyxhQUFMO0FBQ0MsZUFBUSxhQUFSLEdBQXNCLGlCQUF0QixDQUREO0FBRUMseUJBQWtCLGVBQWxCLENBQWtDLElBQWxDLENBQXVDLE9BQXZDLEVBRkQ7QUFHQywwQkFBbUIsSUFBbkIsQ0FBd0IsaUJBQXhCLEVBSEQ7QUFJQyxnQkFBUyxRQUFRLEdBQVIsQ0FBVCxHQUFzQixPQUF0QixDQUpEO0FBUkEsV0FhSyxVQUFMO0FBQ0MsMkJBQWtCLE9BQWxCLENBREQ7QUFi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TiwyQkFBSyxNQUFLO0FBQ1QsZUFBTyxXQUFQLEVBQW1CLElBQW5CLEVBRFM7UUFESjtBQUlOLCtCQUFPOzs7QUFDTixlQUFPLGtCQUFRLElBQVIsQ0FBYSxXQUFiLEVBQTBCLElBQTFCLENBQStCO2dCQUFNLEtBQUssS0FBTDtTQUFOLENBQXRDLENBRE07UUFKRDs7QUFPTixXQUFJLElBQUosR0FBVTtBQUNULGVBQU8sV0FBUCxDQURTO1FBQVY7QUFHQSxXQUFJLGVBQUosR0FBcUI7QUFDcEIsZUFBTyxlQUFQLENBRG9CO1FBQXJCOztNQVZEO1FBVEk7OztJQWhCTDs7QUF5Q0EsT0FBRyxhQUFILEVBQWlCO0FBQ2hCLFNBQUssUUFBTCxHQUFjLFlBQVU7QUFDdkIsV0FBTSxJQUFJLEtBQUosQ0FBVSxnRUFBVixDQUFOLENBRHVCO0tBQVYsQ0FERTtJQUFqQjs7OztRQWhJbUI7Ozs7OztBQXdJckIsU0FBUyxjQUFULENBQXdCLElBQXhCLEVBQTZCO0FBQzVCLEtBQUcsRUFBRSxNQUFGLEVBQ0YsT0FBTyxLQUFLLEdBQUwsQ0FBUyxRQUFULENBQWtCLEVBQUMsTUFBSyxZQUFMLEVBQW5CLENBQVAsQ0FERDtBQUVBLEtBQUksT0FBSyxLQUFLLEdBQUwsQ0FBUyxRQUFULENBQWtCLEVBQUMsTUFBTSxNQUFOLEVBQWEsVUFBVSxrQkFBVixFQUFoQyxDQUFMLENBSHdCO0FBSTVCLE1BQUssSUFBTCxHQUFVLFFBQVYsQ0FKNEI7O0FBTTVCLFFBQU8sSUFBUCxDQU40QjtDQUE3QiIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBlc3ByaW1hIGZyb20gXCJlc3ByaW1hXCJcclxuaW1wb3J0IGVzY29kZWdlbiBmcm9tIFwiZXNjb2RlZ2VuXCJcclxuXHJcbmltcG9ydCBkb2N4NGpzIGZyb20gXCJkb2N4NGpzXCJcclxuaW1wb3J0IEJhc2VEb2N1bWVudCBmcm9tIFwiZG9jeDRqcy9saWIvb3BlbnhtbC9kb2N4L21vZGVsL2RvY3VtZW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgQmFzZURvY3VtZW50e1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHRPYmplY3QuYXNzaWduKHRoaXMud0RvYyxmdW5jdGlvbih2YXJpYW50RG9jdW1lbnQpe1xyXG5cdFx0XHRsZXQgX2N1cnJlbnRDb250YWluZXIsXHJcblx0XHRcdFx0X3ZhcmlhbnRDb250YWluZXJzPVtdLFxyXG5cdFx0XHRcdHZhcmlhbnRzPXt9XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRiZWdpblZhcmlhbnQodmFyaWFudCl7XHJcblx0XHRcdFx0XHRcdGlmKF9jdXJyZW50Q29udGFpbmVyICYmXHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXIhPXZhcmlhbnREb2N1bWVudClcclxuXHRcdFx0XHRcdFx0XHR2YXJpYW50LndYbWwuc2V0QXR0cmlidXRlKCdpZCcsdmFyaWFudC52SWQpXHJcblxyXG5cdFx0XHRcdFx0XHRpZihfY3VycmVudENvbnRhaW5lcj09dmFyaWFudERvY3VtZW50KVxyXG5cdFx0XHRcdFx0XHRcdHZhcmlhbnQuaXNSb290Q2hpbGQ9dHJ1ZVxyXG5cclxuXHRcdFx0XHRcdFx0c3dpdGNoKHZhcmlhbnQudHlwZSl7XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuZXhwJzpcclxuXHRcdFx0XHRcdFx0Y2FzZSAndmFyaWFudC5waWN0dXJlJzpcclxuXHRcdFx0XHRcdFx0XHR2YXJpYW50LnZhcmlhbnRQYXJlbnQ9X2N1cnJlbnRDb250YWluZXJcclxuXHRcdFx0XHRcdFx0XHRfY3VycmVudENvbnRhaW5lci52YXJpYW50Q2hpbGRyZW4ucHVzaCh2YXJpYW50KVxyXG5cdFx0XHRcdFx0XHRcdHZhcmlhbnRzW3ZhcmlhbnQudklkXT12YXJpYW50XHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuaWYnOlxyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmZvcic6XHJcblx0XHRcdFx0XHRcdFx0dmFyaWFudC52YXJpYW50UGFyZW50PV9jdXJyZW50Q29udGFpbmVyXHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXIudmFyaWFudENoaWxkcmVuLnB1c2godmFyaWFudClcclxuXHRcdFx0XHRcdFx0XHRfdmFyaWFudENvbnRhaW5lcnMucHVzaChfY3VycmVudENvbnRhaW5lcilcclxuXHRcdFx0XHRcdFx0XHR2YXJpYW50c1t2YXJpYW50LnZJZF09dmFyaWFudFxyXG5cdFx0XHRcdFx0XHRjYXNlICdkb2N1bWVudCc6XHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXI9dmFyaWFudFxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHJldHVybiB2YXJpYW50XHJcblx0XHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRcdGVuZFZhcmlhbnQodmFyaWFudCl7XHJcblx0XHRcdFx0XHRcdHN3aXRjaCh2YXJpYW50LnR5cGUpe1xyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmlmJzpcclxuXHRcdFx0XHRcdFx0Y2FzZSAndmFyaWFudC5mb3InOlxyXG5cdFx0XHRcdFx0XHRcdF9jdXJyZW50Q29udGFpbmVyPV92YXJpYW50Q29udGFpbmVycy5wb3AoKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRcdHZhcmlhbnRzXHJcblx0XHRcdH1cclxuXHRcdH0odGhpcykpXHJcblxyXG5cdFx0dGhpcy52YXJpYW50UGFyZW50PW51bGxcclxuXHRcdHRoaXMudmFyaWFudENoaWxkcmVuPVtdXHJcblx0XHR0aGlzLnBhcnNlZENvZGU9ZXNwcmltYS5wYXJzZShcIndpdGgoZGF0YSl7d2l0aCh2YXJpYW50cyl7fX1cIilcclxuXHRcdHRoaXMuY29kZUJsb2NrPXRoaXMucGFyc2VkQ29kZS5ib2R5WzBdLmJvZHkuYm9keVswXS5ib2R5LmJvZHlcclxuXHRcdHRoaXMud0RvYy5iZWdpblZhcmlhbnQodGhpcylcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCogd2hpY2ggbWFrZXMgaXQgYXMgYSB2YXJpYW50XHJcblx0Ki9cclxuXHRwYXJzZSgpe1xyXG5cdFx0dmFyIHI9c3VwZXIucGFyc2UoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy53RG9jLmVuZFZhcmlhbnQodGhpcylcclxuXHJcblx0XHRpZih0eXBlb2YodGhpcy5wYXJzZWRDb2RlKSE9J2Z1bmN0aW9uJyl7XHJcblx0XHRcdHZhciBjb2RlPWVzY29kZWdlbi5nZW5lcmF0ZSh0aGlzLnBhcnNlZENvZGUpXHJcblx0XHRcdC8vY29uc29sZS5sb2coY29kZSlcclxuXHRcdFx0dGhpcy5wYXJzZWRDb2RlPW5ldyBGdW5jdGlvbihcImRhdGEsdmFyaWFudHNcIixlc2NvZGVnZW4uZ2VuZXJhdGUodGhpcy5wYXJzZWRDb2RlKSlcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gclxyXG5cdH1cclxuXHJcblx0dmlzaXQoKXtcclxuXHRcdC8vd2hpY2ggbWFrZXMgdGhlIGNsYXNzIGFzIGEgdmlzaXRvclxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0KiBwdWJsaWMgQVBJIGZvciB2YXJpYW50IGRvY3hcclxuXHQqL1xyXG5cdGFzc2VtYmxlKGRhdGEsIHRyYW5zYWN0aW9uYWwpe1xyXG5cdFx0aWYoIXRyYW5zYWN0aW9uYWwpXHJcblx0XHRcdHRoaXMudmFyaWFudENoaWxkcmVuLmZvckVhY2goYT0+YS5hc3NlbWJsZWRYbWw9YS53WG1sLmNsb25lTm9kZSh0cnVlKSApXHJcblxyXG5cdFx0dGhpcy5wYXJzZWRDb2RlLmNhbGwoe30sIGRhdGEsIHRoaXMud0RvYy52YXJpYW50cylcclxuXHJcblx0XHRsZXQgd0RvYz10aGlzLndEb2MsXHJcblx0XHRcdHZhcmlhbnRDaGlsZHJlbj10aGlzLnZhcmlhbnRDaGlsZHJlbixcclxuXHRcdFx0ZG9TYXZlPXRoaXMud0RvYy5fZG9TYXZlLmJpbmQodGhpcy53RG9jKVxyXG5cclxuXHRcdGlmKHRyYW5zYWN0aW9uYWwpe1xyXG5cdFx0XHR3RG9jLl9zZXJpYWxpemUoKVxyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHNhdmUoZmlsZSl7XHJcblx0XHRcdFx0XHRkb1NhdmUodGhpcy5kYXRhLCBmaWxlKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0cGFyc2UoKXtcclxuXHRcdFx0XHRcdHJldHVybiBkb2N4NGpzLmxvYWQodGhpcy5kYXRhKS50aGVuKGRvY3g9PmRvY3gucGFyc2UoLi4uYXJndW1lbnRzKSlcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGdldCBkYXRhKCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gZ2V0TmV3RG9jeERhdGEod0RvYylcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGdldCB2YXJpYW50Q2hpbGRyZW4oKXtcclxuXHRcdFx0XHRcdHJldHVybiB2YXJpYW50Q2hpbGRyZW5cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1lbHNle1xyXG5cdFx0XHR0aGlzLnZhcmlhbnRDaGlsZHJlbi5tYXAodmFyaWFudD0+e1xyXG5cdFx0XHRcdGxldCBwYXJlbnQ9dmFyaWFudC53WG1sLnBhcmVudE5vZGVcclxuXHRcdFx0XHR2YXJpYW50LmFzc2VtYmxlZFhtbCAmJiBwYXJlbnQuYXBwZW5kQ2hpbGQodmFyaWFudC5hc3NlbWJsZWRYbWwpXHJcblx0XHRcdFx0cGFyZW50LnJlbW92ZUNoaWxkKHZpYXJpYW50LndYbWwpXHJcblx0XHRcdH0pXHJcblx0XHRcdHdEb2MuX3NlcmlhbGl6ZSgpXHJcblx0XHRcdGxldCBuZXdEb2N4RGF0YT1nZXROZXdEb2N4RGF0YSh3RG9jKVxyXG5cdFx0XHR3RG9jLl9yZXN0b3JlKClcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRzYXZlKGZpbGUpe1xyXG5cdFx0XHRcdFx0ZG9TYXZlKG5ld0RvY3hEYXRhLGZpbGUpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRwYXJzZSgpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIGRvY3g0anMubG9hZChuZXdEb2N4RGF0YSkudGhlbihkb2N4PT5kb2N4LnBhcnNlKC4uLmFyZ3VtZW50cykpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRnZXQgZGF0YSgpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIG5ld0RvY3hEYXRhXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRnZXQgdmFyaWFudENoaWxkcmVuKCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gdmFyaWFudENoaWxkcmVuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYodHJhbnNhY3Rpb25hbCl7XHJcblx0XHRcdHRoaXMuYXNzZW1ibGU9ZnVuY3Rpb24oKXtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ0cmFuc2FjdGlvbmFsIGFzc2VtYmx5IGNhbid0IHN1cHBvcnQgbXVsdGlwbGUgdGltZXMgYXNzZW1ibGluZ1wiKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXROZXdEb2N4RGF0YSh3RG9jKXtcclxuXHRpZigkLmlzTm9kZSlcclxuXHRcdHJldHVybiB3RG9jLnJhdy5nZW5lcmF0ZSh7dHlwZTpcIm5vZGVidWZmZXJcIn0pXHJcblx0dmFyIGRhdGE9d0RvYy5yYXcuZ2VuZXJhdGUoe3R5cGU6IFwiYmxvYlwiLG1pbWVUeXBlOiBcImFwcGxpY2F0aW9uL2RvY3hcIn0pXHJcblx0ZGF0YS5uYW1lPVwiYS5kb2N4XCJcclxuXHJcblx0cmV0dXJuIGRhdGFcclxufVxyXG4iXX0=