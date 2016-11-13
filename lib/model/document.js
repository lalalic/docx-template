"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _esprima = require("esprima");

var _esprima2 = _interopRequireDefault(_esprima);

var _escodegen = require("escodegen");

var _escodegen2 = _interopRequireDefault(_escodegen);

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

var _document = require("docx4js/lib/openxml/docx/model/document");

var _document2 = _interopRequireDefault(_document);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Document = function (_BaseDocument) {
	(0, _inherits3.default)(Document, _BaseDocument);

	function Document() {
		(0, _classCallCheck3.default)(this, Document);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Document.__proto__ || (0, _getPrototypeOf2.default)(Document)).apply(this, arguments));

		(0, _assign2.default)(_this.wDoc, function (variantDocument) {
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


	(0, _createClass3.default)(Document, [{
		key: "parse",
		value: function parse() {
			var r = (0, _get3.default)(Document.prototype.__proto__ || (0, _getPrototypeOf2.default)(Document.prototype), "parse", this).apply(this, arguments);
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

				if ((typeof _ret === "undefined" ? "undefined" : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
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
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJEb2N1bWVudCIsImFyZ3VtZW50cyIsIndEb2MiLCJ2YXJpYW50RG9jdW1lbnQiLCJfY3VycmVudENvbnRhaW5lciIsIl92YXJpYW50Q29udGFpbmVycyIsInZhcmlhbnRzIiwiYmVnaW5WYXJpYW50IiwidmFyaWFudCIsIndYbWwiLCJzZXRBdHRyaWJ1dGUiLCJ2SWQiLCJpc1Jvb3RDaGlsZCIsInR5cGUiLCJ2YXJpYW50UGFyZW50IiwidmFyaWFudENoaWxkcmVuIiwicHVzaCIsImVuZFZhcmlhbnQiLCJwb3AiLCJwYXJzZWRDb2RlIiwicGFyc2UiLCJjb2RlQmxvY2siLCJib2R5IiwiciIsImNvZGUiLCJnZW5lcmF0ZSIsIkZ1bmN0aW9uIiwiZGF0YSIsInRyYW5zYWN0aW9uYWwiLCJmb3JFYWNoIiwiYSIsImFzc2VtYmxlZFhtbCIsImNsb25lTm9kZSIsImNhbGwiLCJkb1NhdmUiLCJfZG9TYXZlIiwiYmluZCIsInNhdmUiLCJmaWxlIiwibG9hZCIsInRoZW4iLCJkb2N4IiwiX3NlcmlhbGl6ZSIsImdldE5ld0RvY3hEYXRhIiwibWFwIiwicGFyZW50IiwicGFyZW50Tm9kZSIsImFwcGVuZENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJ2aWFyaWFudCIsIm5ld0RvY3hEYXRhIiwiX3Jlc3RvcmUiLCJhc3NlbWJsZSIsIkVycm9yIiwiJCIsImlzTm9kZSIsInJhdyIsIm1pbWVUeXBlIiwibmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxROzs7QUFDcEIscUJBQWE7QUFBQTs7QUFBQSx5SUFDSEMsU0FERzs7QUFFWix3QkFBYyxNQUFLQyxJQUFuQixFQUF3QixVQUFTQyxlQUFULEVBQXlCO0FBQ2hELE9BQUlDLDBCQUFKO0FBQUEsT0FDQ0MscUJBQW1CLEVBRHBC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QUosR0FBVTtBQUNULGVBQU91QixXQUFQO0FBQ0EsUUFUSztBQVVOLFdBQUluQyxlQUFKLEdBQXFCO0FBQ3BCLGVBQU9BLGVBQVA7QUFDQTtBQVpLO0FBQVA7QUFUSTs7QUFBQTtBQXVCSjs7QUFFRCxPQUFHYSxhQUFILEVBQWlCO0FBQ2hCLFNBQUt3QixRQUFMLEdBQWMsWUFBVTtBQUN2QixXQUFNLElBQUlDLEtBQUosQ0FBVSxnRUFBVixDQUFOO0FBQ0EsS0FGRDtBQUdBO0FBQ0Q7Ozs7O2tCQXJJbUJyRCxROzs7QUF3SXJCLFNBQVMyQyxjQUFULENBQXdCekMsSUFBeEIsRUFBNkI7QUFDNUIsS0FBR29ELEVBQUVDLE1BQUwsRUFDQyxPQUFPckQsS0FBS3NELEdBQUwsQ0FBUy9CLFFBQVQsQ0FBa0IsRUFBQ1osTUFBSyxZQUFOLEVBQWxCLENBQVA7QUFDRCxLQUFJYyxPQUFLekIsS0FBS3NELEdBQUwsQ0FBUy9CLFFBQVQsQ0FBa0IsRUFBQ1osTUFBTSxNQUFQLEVBQWM0QyxVQUFVLGtCQUF4QixFQUFsQixDQUFUO0FBQ0E5QixNQUFLK0IsSUFBTCxHQUFVLFFBQVY7O0FBRUEsUUFBTy9CLElBQVA7QUFDQSIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBlc3ByaW1hIGZyb20gXCJlc3ByaW1hXCJcclxuaW1wb3J0IGVzY29kZWdlbiBmcm9tIFwiZXNjb2RlZ2VuXCJcclxuXHJcbmltcG9ydCBkb2N4NGpzIGZyb20gXCJkb2N4NGpzXCJcclxuaW1wb3J0IEJhc2VEb2N1bWVudCBmcm9tIFwiZG9jeDRqcy9saWIvb3BlbnhtbC9kb2N4L21vZGVsL2RvY3VtZW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgQmFzZURvY3VtZW50e1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHRPYmplY3QuYXNzaWduKHRoaXMud0RvYyxmdW5jdGlvbih2YXJpYW50RG9jdW1lbnQpe1xyXG5cdFx0XHRsZXQgX2N1cnJlbnRDb250YWluZXIsXHJcblx0XHRcdFx0X3ZhcmlhbnRDb250YWluZXJzPVtdLFxyXG5cdFx0XHRcdHZhcmlhbnRzPXt9XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRiZWdpblZhcmlhbnQodmFyaWFudCl7XHJcblx0XHRcdFx0XHRcdGlmKF9jdXJyZW50Q29udGFpbmVyICYmXHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXIhPXZhcmlhbnREb2N1bWVudClcclxuXHRcdFx0XHRcdFx0XHR2YXJpYW50LndYbWwuc2V0QXR0cmlidXRlKCdpZCcsdmFyaWFudC52SWQpXHJcblxyXG5cdFx0XHRcdFx0XHRpZihfY3VycmVudENvbnRhaW5lcj09dmFyaWFudERvY3VtZW50KVxyXG5cdFx0XHRcdFx0XHRcdHZhcmlhbnQuaXNSb290Q2hpbGQ9dHJ1ZVxyXG5cclxuXHRcdFx0XHRcdFx0c3dpdGNoKHZhcmlhbnQudHlwZSl7XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuZXhwJzpcclxuXHRcdFx0XHRcdFx0Y2FzZSAndmFyaWFudC5waWN0dXJlJzpcclxuXHRcdFx0XHRcdFx0XHR2YXJpYW50LnZhcmlhbnRQYXJlbnQ9X2N1cnJlbnRDb250YWluZXJcclxuXHRcdFx0XHRcdFx0XHRfY3VycmVudENvbnRhaW5lci52YXJpYW50Q2hpbGRyZW4ucHVzaCh2YXJpYW50KVxyXG5cdFx0XHRcdFx0XHRcdHZhcmlhbnRzW3ZhcmlhbnQudklkXT12YXJpYW50XHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuaWYnOlxyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmZvcic6XHJcblx0XHRcdFx0XHRcdFx0dmFyaWFudC52YXJpYW50UGFyZW50PV9jdXJyZW50Q29udGFpbmVyXHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXIudmFyaWFudENoaWxkcmVuLnB1c2godmFyaWFudClcclxuXHRcdFx0XHRcdFx0XHRfdmFyaWFudENvbnRhaW5lcnMucHVzaChfY3VycmVudENvbnRhaW5lcilcclxuXHRcdFx0XHRcdFx0XHR2YXJpYW50c1t2YXJpYW50LnZJZF09dmFyaWFudFxyXG5cdFx0XHRcdFx0XHRjYXNlICdkb2N1bWVudCc6XHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXI9dmFyaWFudFxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHJldHVybiB2YXJpYW50XHJcblx0XHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRcdGVuZFZhcmlhbnQodmFyaWFudCl7XHJcblx0XHRcdFx0XHRcdHN3aXRjaCh2YXJpYW50LnR5cGUpe1xyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmlmJzpcclxuXHRcdFx0XHRcdFx0Y2FzZSAndmFyaWFudC5mb3InOlxyXG5cdFx0XHRcdFx0XHRcdF9jdXJyZW50Q29udGFpbmVyPV92YXJpYW50Q29udGFpbmVycy5wb3AoKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRcdHZhcmlhbnRzXHJcblx0XHRcdH1cclxuXHRcdH0odGhpcykpXHJcblxyXG5cdFx0dGhpcy52YXJpYW50UGFyZW50PW51bGxcclxuXHRcdHRoaXMudmFyaWFudENoaWxkcmVuPVtdXHJcblx0XHR0aGlzLnBhcnNlZENvZGU9ZXNwcmltYS5wYXJzZShcIndpdGgoZGF0YSl7d2l0aCh2YXJpYW50cyl7fX1cIilcclxuXHRcdHRoaXMuY29kZUJsb2NrPXRoaXMucGFyc2VkQ29kZS5ib2R5WzBdLmJvZHkuYm9keVswXS5ib2R5LmJvZHlcclxuXHRcdHRoaXMud0RvYy5iZWdpblZhcmlhbnQodGhpcylcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCogd2hpY2ggbWFrZXMgaXQgYXMgYSB2YXJpYW50XHJcblx0Ki9cclxuXHRwYXJzZSgpe1xyXG5cdFx0dmFyIHI9c3VwZXIucGFyc2UoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy53RG9jLmVuZFZhcmlhbnQodGhpcylcclxuXHJcblx0XHRpZih0eXBlb2YodGhpcy5wYXJzZWRDb2RlKSE9J2Z1bmN0aW9uJyl7XHJcblx0XHRcdHZhciBjb2RlPWVzY29kZWdlbi5nZW5lcmF0ZSh0aGlzLnBhcnNlZENvZGUpXHJcblx0XHRcdC8vY29uc29sZS5sb2coY29kZSlcclxuXHRcdFx0dGhpcy5wYXJzZWRDb2RlPW5ldyBGdW5jdGlvbihcImRhdGEsdmFyaWFudHNcIixlc2NvZGVnZW4uZ2VuZXJhdGUodGhpcy5wYXJzZWRDb2RlKSlcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gclxyXG5cdH1cclxuXHJcblx0dmlzaXQoKXtcclxuXHRcdC8vd2hpY2ggbWFrZXMgdGhlIGNsYXNzIGFzIGEgdmlzaXRvclxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0KiBwdWJsaWMgQVBJIGZvciB2YXJpYW50IGRvY3hcclxuXHQqL1xyXG5cdGFzc2VtYmxlKGRhdGEsIHRyYW5zYWN0aW9uYWwpe1xyXG5cdFx0aWYoIXRyYW5zYWN0aW9uYWwpXHJcblx0XHRcdHRoaXMudmFyaWFudENoaWxkcmVuLmZvckVhY2goYT0+YS5hc3NlbWJsZWRYbWw9YS53WG1sLmNsb25lTm9kZSh0cnVlKSApXHJcblxyXG5cdFx0dGhpcy5wYXJzZWRDb2RlLmNhbGwoe30sIGRhdGEsIHRoaXMud0RvYy52YXJpYW50cylcclxuXHJcblx0XHRsZXQgd0RvYz10aGlzLndEb2MsXHJcblx0XHRcdHZhcmlhbnRDaGlsZHJlbj10aGlzLnZhcmlhbnRDaGlsZHJlbixcclxuXHRcdFx0ZG9TYXZlPXRoaXMud0RvYy5fZG9TYXZlLmJpbmQodGhpcy53RG9jKVxyXG5cclxuXHRcdGlmKHRyYW5zYWN0aW9uYWwpe1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHNhdmUoZmlsZSl7XHJcblx0XHRcdFx0XHRkb1NhdmUodGhpcy5kYXRhLCBmaWxlKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0cGFyc2UoKXtcclxuXHRcdFx0XHRcdHJldHVybiBkb2N4NGpzLmxvYWQodGhpcy5kYXRhKS50aGVuKGRvY3g9PmRvY3gucGFyc2UoLi4uYXJndW1lbnRzKSlcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGdldCBkYXRhKCl7XHJcblx0XHRcdFx0XHR3RG9jLl9zZXJpYWxpemUoKVxyXG5cdFx0XHRcdFx0cmV0dXJuIGdldE5ld0RvY3hEYXRhKHdEb2MpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRnZXQgdmFyaWFudENoaWxkcmVuKCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gdmFyaWFudENoaWxkcmVuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0dGhpcy52YXJpYW50Q2hpbGRyZW4ubWFwKHZhcmlhbnQ9PntcclxuXHRcdFx0XHRsZXQgcGFyZW50PXZhcmlhbnQud1htbC5wYXJlbnROb2RlXHJcblx0XHRcdFx0dmFyaWFudC5hc3NlbWJsZWRYbWwgJiYgcGFyZW50LmFwcGVuZENoaWxkKHZhcmlhbnQuYXNzZW1ibGVkWG1sKVxyXG5cdFx0XHRcdHBhcmVudC5yZW1vdmVDaGlsZCh2aWFyaWFudC53WG1sKVxyXG5cdFx0XHR9KVxyXG5cdFx0XHR3RG9jLl9zZXJpYWxpemUoKVxyXG5cdFx0XHRsZXQgbmV3RG9jeERhdGE9Z2V0TmV3RG9jeERhdGEod0RvYylcclxuXHRcdFx0d0RvYy5fcmVzdG9yZSgpXHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0c2F2ZShmaWxlKXtcclxuXHRcdFx0XHRcdGRvU2F2ZShuZXdEb2N4RGF0YSxmaWxlKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0cGFyc2UoKXtcclxuXHRcdFx0XHRcdHJldHVybiBkb2N4NGpzLmxvYWQobmV3RG9jeERhdGEpLnRoZW4oZG9jeD0+ZG9jeC5wYXJzZSguLi5hcmd1bWVudHMpKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Z2V0IGRhdGEoKXtcclxuXHRcdFx0XHRcdHJldHVybiBuZXdEb2N4RGF0YVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Z2V0IHZhcmlhbnRDaGlsZHJlbigpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIHZhcmlhbnRDaGlsZHJlblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHRyYW5zYWN0aW9uYWwpe1xyXG5cdFx0XHR0aGlzLmFzc2VtYmxlPWZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwidHJhbnNhY3Rpb25hbCBhc3NlbWJseSBjYW4ndCBzdXBwb3J0IG11bHRpcGxlIHRpbWVzIGFzc2VtYmxpbmdcIilcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TmV3RG9jeERhdGEod0RvYyl7XHJcblx0aWYoJC5pc05vZGUpXHJcblx0XHRyZXR1cm4gd0RvYy5yYXcuZ2VuZXJhdGUoe3R5cGU6XCJub2RlYnVmZmVyXCJ9KVxyXG5cdHZhciBkYXRhPXdEb2MucmF3LmdlbmVyYXRlKHt0eXBlOiBcImJsb2JcIixtaW1lVHlwZTogXCJhcHBsaWNhdGlvbi9kb2N4XCJ9KVxyXG5cdGRhdGEubmFtZT1cImEuZG9jeFwiXHJcblxyXG5cdHJldHVybiBkYXRhXHJcbn1cclxuIl19