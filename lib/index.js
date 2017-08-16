"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DocxTemplate = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _docx4js2 = require("docx4js");

var _docx4js3 = _interopRequireDefault(_docx4js2);

var _lodash = require("lodash.unescape");

var _lodash2 = _interopRequireDefault(_lodash);

var _variantHandler = require("./variant-handler");

var _variantHandler2 = _interopRequireDefault(_variantHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('babel-polyfill');
var esprima = require("esprima");


var VARIANTS = "control.picture,control.text,block,inline".split(",");

var DocxTemplate = exports.DocxTemplate = function (_docx4js) {
	_inherits(DocxTemplate, _docx4js);

	function DocxTemplate() {
		_classCallCheck(this, DocxTemplate);

		return _possibleConstructorReturn(this, (DocxTemplate.__proto__ || Object.getPrototypeOf(DocxTemplate)).apply(this, arguments));
	}

	_createClass(DocxTemplate, null, [{
		key: "parse",

		/**
  * entry: parse template as a variant document, then you can assemble with data
  **/
		value: function parse(file) {
			var _parse = function _parse(docx) {
				var handler = new _variantHandler2.default(docx);
				docx.parse(handler, DocxTemplate.identify);
				return handler.varDoc;
			};

			return this.load(file).then(_parse);
		}
	}, {
		key: "assemble",
		value: function assemble(file, data) {
			return this.parse(file).then(function (varDoc) {
				return varDoc.assemble(data);
			});
		}
	}, {
		key: "isExp",
		value: function isExp(text) {
			text = text.trim();
			var len = text.length;
			if (len > 3 && text[0] == '$' && text[1] == '{' && text[len - 1] == '}') {
				text = text.substring(2, text.length - 1).trim();
				if (text.length) return text;
			}
			return false;
		}
	}, {
		key: "isInlineExp",
		value: function isInlineExp(type, text, node) {
			if (type == "control.text") {
				if (DocxTemplate.isExp(text)) {
					return text;
				}
			}
			return false;
		}
	}, {
		key: "identify",
		value: function identify(node, officeDocument) {
			var _docx4js$OfficeDocume;

			var filter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

			if (filter) {
				var tagName = node.name.split(":").pop();
				if (tagName == "document") return { type: "document", children: node.children[0].children };

				if (tagName == "styles" || tagName == "numbering") return null;
			}

			var model = (_docx4js$OfficeDocume = _docx4js3.default.OfficeDocument).identify.apply(_docx4js$OfficeDocume, arguments);

			if (!model || typeof model == "string" || VARIANTS.indexOf(model.type) == -1) return model;

			var sdtPr = node.children.find(function (a) {
				return a.name == "w:sdtPr";
			});
			if (!sdtPr) return model;

			var tag = sdtPr.children.find(function (a) {
				return a.name == "w:tag";
			});

			if (!tag) {
				if (tag = DocxTemplate.isInlineExp(model.type, officeDocument.content(node).text().trim())) {
					officeDocument.content(node).find('w\\:id').before("<w:tag w:val=\"" + tag + "\"/>");
				} else {
					return model;
				}
			} else {
				tag = tag.attribs["w:val"];
			}

			if (!tag) {
				return model;
			}

			tag = (0, _lodash2.default)(tag.trim());

			model.rawCode = tag;

			switch (model.type) {
				case "control.picture":
				case "control.text":
					try {
						var exp = DocxTemplate.isExp(tag);
						if (!exp) return model;

						model.type = model.type + ".exp";
						model.code = esprima.parse(exp);
						return model;
					} catch (e) {
						console.error("[" + model.type + "] " + tag + " \r\n " + error.message);
					}
				case "block":
				case "inline":
					try {
						if (tag.startsWith("subdoc(")) {
							model.type = model.type + ".subdoc";
							model.code = esprima.parse(tag).body[0].expression.arguments[0];
							return model;
						}
						var parsedCode = esprima.parse(tag + '{}');
						if (parsedCode.body.length == 2) //for/if(){}{}
							parsedCode.body.pop();else if (parsedCode.body.length > 1) {
							console.warn("syntax error, ignore as static content: \n\r " + officeDocument.content(node).text());
							return model;
						}

						var _parsedCode$body = _slicedToArray(parsedCode.body, 1),
						    firstStatement = _parsedCode$body[0];

						switch (firstStatement.type) {
							case 'ForStatement':
								model.type = model.type + ".for";
								model.code = parsedCode;
								return model;
								break;
							case 'IfStatement':
								model.type = model.type + ".if";
								model.code = parsedCode;
								return model;
								break;
							default:
								console.warn("unsupported statement in " + model.type + ", ignore as static content: \n\r " + officeDocument.content(node).text());
								return model;
						}
					} catch (error) {
						if (DocxTemplate.isExp(tag)) {
							console.warn(tag + ": please use plain text control for expression");
						} else {
							console.log("[" + model.type + "] with " + tag + ", but not variant because " + error);
						}
					}
			}
			delete model.rawCode;
			return model;
		}
	}]);

	return DocxTemplate;
}(_docx4js3.default);

exports.default = DocxTemplate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiZXNwcmltYSIsIlZBUklBTlRTIiwic3BsaXQiLCJEb2N4VGVtcGxhdGUiLCJmaWxlIiwiX3BhcnNlIiwiaGFuZGxlciIsImRvY3giLCJwYXJzZSIsImlkZW50aWZ5IiwidmFyRG9jIiwibG9hZCIsInRoZW4iLCJkYXRhIiwiYXNzZW1ibGUiLCJ0ZXh0IiwidHJpbSIsImxlbiIsImxlbmd0aCIsInN1YnN0cmluZyIsInR5cGUiLCJub2RlIiwiaXNFeHAiLCJvZmZpY2VEb2N1bWVudCIsImZpbHRlciIsInRhZ05hbWUiLCJuYW1lIiwicG9wIiwiY2hpbGRyZW4iLCJtb2RlbCIsIk9mZmljZURvY3VtZW50IiwiYXJndW1lbnRzIiwiaW5kZXhPZiIsInNkdFByIiwiZmluZCIsImEiLCJ0YWciLCJpc0lubGluZUV4cCIsImNvbnRlbnQiLCJiZWZvcmUiLCJhdHRyaWJzIiwicmF3Q29kZSIsImV4cCIsImNvZGUiLCJlIiwiY29uc29sZSIsImVycm9yIiwibWVzc2FnZSIsInN0YXJ0c1dpdGgiLCJib2R5IiwiZXhwcmVzc2lvbiIsInBhcnNlZENvZGUiLCJ3YXJuIiwiZmlyc3RTdGF0ZW1lbnQiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7QUFMQUEsUUFBUSxnQkFBUjtBQUNBLElBQU1DLFVBQVFELFFBQVEsU0FBUixDQUFkOzs7QUFNQSxJQUFNRSxXQUFTLDRDQUE0Q0MsS0FBNUMsQ0FBa0QsR0FBbEQsQ0FBZjs7SUFFYUMsWSxXQUFBQSxZOzs7Ozs7Ozs7Ozs7QUFDWjs7O3dCQUdhQyxJLEVBQUs7QUFDakIsT0FBTUMsU0FBTyxTQUFQQSxNQUFPLE9BQU07QUFDbEIsUUFBSUMsVUFBUSw2QkFBbUJDLElBQW5CLENBQVo7QUFDQUEsU0FBS0MsS0FBTCxDQUFXRixPQUFYLEVBQW9CSCxhQUFhTSxRQUFqQztBQUNBLFdBQU9ILFFB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ZUFBUU8sSUFBUixtREFBNkQ3QixlQUFlZSxPQUFmLENBQXVCakIsSUFBdkIsRUFBNkJOLElBQTdCLEVBQTdEO0FBQ0EsY0FBT2MsS0FBUDtBQUNBOztBQVpFLDRDQWFrQnNCLFdBQVdGLElBYjdCO0FBQUEsVUFhRUksY0FiRjs7QUFjSCxjQUFPQSxlQUFlakMsSUFBdEI7QUFDQyxZQUFLLGNBQUw7QUFDQ1MsY0FBTVQsSUFBTixHQUFjUyxNQUFNVCxJQUFwQjtBQUNBUyxjQUFNYyxJQUFOLEdBQVdRLFVBQVg7QUFDQSxlQUFPdEIsS0FBUDtBQUNEO0FBQ0EsWUFBSyxhQUFMO0FBQ0NBLGNBQU1ULElBQU4sR0FBY1MsTUFBTVQsSUFBcEI7QUFDQVMsY0FBTWMsSUFBTixHQUFXUSxVQUFYO0FBQ0EsZUFBT3RCLEtBQVA7QUFDRDtBQUNBO0FBQ0NnQixnQkFBUU8sSUFBUiwrQkFBeUN2QixNQUFNVCxJQUEvQyx5Q0FBdUZHLGVBQWVlLE9BQWYsQ0FBdUJqQixJQUF2QixFQUE2Qk4sSUFBN0IsRUFBdkY7QUFDQSxlQUFPYyxLQUFQO0FBYkY7QUFlQSxNQTdCRCxDQTZCQyxPQUFNaUIsS0FBTixFQUFZO0FBQ1osVUFBRzNDLGFBQWFtQixLQUFiLENBQW1CYyxHQUFuQixDQUFILEVBQTJCO0FBQzFCUyxlQUFRTyxJQUFSLENBQWdCaEIsR0FBaEI7QUFDQSxPQUZELE1BRUs7QUFDSlMsZUFBUVMsR0FBUixPQUFnQnpCLE1BQU1ULElBQXRCLGVBQW9DZ0IsR0FBcEMsa0NBQW9FVSxLQUFwRTtBQUNBO0FBQ0Q7QUFuREg7QUFxREEsVUFBT2pCLE1BQU1ZLE9BQWI7QUFDQSxVQUFPWixLQUFQO0FBQ0E7Ozs7OztrQkFHYTFCLFkiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCdiYWJlbC1wb2x5ZmlsbCcpXHJcbmNvbnN0IGVzcHJpbWE9cmVxdWlyZShcImVzcHJpbWFcIilcclxuaW1wb3J0IGRvY3g0anMgZnJvbSBcImRvY3g0anNcIlxyXG5pbXBvcnQgdW5lc2NhcGUgZnJvbSBcImxvZGFzaC51bmVzY2FwZVwiXHJcblxyXG5pbXBvcnQgVmFyaWFudEhhbmRsZXIgZnJvbSBcIi4vdmFyaWFudC1oYW5kbGVyXCJcclxuXHJcbmNvbnN0IFZBUklBTlRTPVwiY29udHJvbC5waWN0dXJlLGNvbnRyb2wudGV4dCxibG9jayxpbmxpbmVcIi5zcGxpdChcIixcIilcclxuXHJcbmV4cG9ydCBjbGFzcyBEb2N4VGVtcGxhdGUgZXh0ZW5kcyBkb2N4NGpze1xyXG5cdC8qKlxyXG5cdCogZW50cnk6IHBhcnNlIHRlbXBsYXRlIGFzIGEgdmFyaWFudCBkb2N1bWVudCwgdGhlbiB5b3UgY2FuIGFzc2VtYmxlIHdpdGggZGF0YVxyXG5cdCoqL1xyXG5cdHN0YXRpYyBwYXJzZShmaWxlKXtcclxuXHRcdGNvbnN0IF9wYXJzZT1kb2N4PT57XHJcblx0XHRcdGxldCBoYW5kbGVyPW5ldyBWYXJpYW50SGFuZGxlcihkb2N4KVxyXG5cdFx0XHRkb2N4LnBhcnNlKGhhbmRsZXIsIERvY3hUZW1wbGF0ZS5pZGVudGlmeSlcclxuXHRcdFx0cmV0dXJuIGhhbmRsZXIudmFyRG9jXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkKGZpbGUpLnRoZW4oX3BhcnNlKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBhc3NlbWJsZShmaWxlLGRhdGEpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlKGZpbGUpXHJcblx0XHRcdC50aGVuKHZhckRvYz0+dmFyRG9jLmFzc2VtYmxlKGRhdGEpKVxyXG4gICAgfVxyXG5cclxuXHRzdGF0aWMgaXNFeHAodGV4dCl7XHJcblx0XHR0ZXh0PXRleHQudHJpbSgpXHJcblx0XHRsZXQgbGVuPXRleHQubGVuZ3RoXHJcblx0XHRpZihsZW4+MyAmJiB0ZXh0WzBdID09ICckJyAmJiB0ZXh0WzFdID09ICd7JyAmJiB0ZXh0W2xlbiAtIDFdID09ICd9Jyl7XHJcblx0XHRcdHRleHQ9dGV4dC5zdWJzdHJpbmcoMix0ZXh0Lmxlbmd0aC0xKS50cmltKClcclxuXHRcdFx0aWYodGV4dC5sZW5ndGgpXHJcblx0XHRcdFx0cmV0dXJuIHRleHRcclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZVxyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgaXNJbmxpbmVFeHAodHlwZSx0ZXh0LG5vZGUpe1xyXG5cdFx0aWYodHlwZT09XCJjb250cm9sLnRleHRcIil7XHJcblx0XHRcdGlmKERvY3hUZW1wbGF0ZS5pc0V4cCh0ZXh0KSl7XHJcblx0XHRcdFx0cmV0dXJuIHRleHRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgaWRlbnRpZnkobm9kZSwgb2ZmaWNlRG9jdW1lbnQsIGZpbHRlcj10cnVlKXtcclxuXHRcdGlmKGZpbHRlcil7XHJcblx0XHRcdGxldCB0YWdOYW1lPW5vZGUubmFtZS5zcGxpdChcIjpcIikucG9wKClcclxuXHRcdFx0aWYodGFnTmFtZT09XCJkb2N1bWVudFwiKVxyXG5cdFx0XHRcdHJldHVybiB7dHlwZTpcImRvY3VtZW50XCIsIGNoaWxkcmVuOiBub2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVufVxyXG5cclxuXHRcdFx0aWYodGFnTmFtZT09XCJzdHlsZXNcIiB8fCB0YWdOYW1lPT1cIm51bWJlcmluZ1wiKVxyXG5cdFx0XHRcdHJldHVybiBudWxsXHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IG1vZGVsPWRvY3g0anMuT2ZmaWNlRG9jdW1lbnQuaWRlbnRpZnkoLi4uYXJndW1lbnRzKVxyXG5cclxuXHRcdGlmKCFtb2RlbCB8fCB0eXBlb2YobW9kZWwpPT1cInN0cmluZ1wiIHx8IFZBUklBTlRTLmluZGV4T2YobW9kZWwudHlwZSk9PS0xKVxyXG5cdFx0XHRyZXR1cm4gbW9kZWxcclxuXHJcblx0XHRsZXQgc2R0UHI9bm9kZS5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnNkdFByXCIpXHJcblx0XHRpZighc2R0UHIpXHJcblx0XHRcdHJldHVybiBtb2RlbFxyXG5cclxuXHRcdGxldCB0YWc9c2R0UHIuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzp0YWdcIilcclxuXHJcblx0XHRpZighdGFnKXtcclxuXHRcdFx0aWYodGFnPURvY3hUZW1wbGF0ZS5pc0lubGluZUV4cChtb2RlbC50eXBlLCBvZmZpY2VEb2N1bWVudC5jb250ZW50KG5vZGUpLnRleHQoKS50cmltKCkpKXtcclxuXHRcdFx0XHRvZmZpY2VEb2N1bWVudC5jb250ZW50KG5vZGUpXHJcblx0XHRcdFx0XHQuZmluZCgnd1xcXFw6aWQnKVxyXG5cdFx0XHRcdFx0LmJlZm9yZShgPHc6dGFnIHc6dmFsPVwiJHt0YWd9XCIvPmApXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0XHR9XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0dGFnPXRhZy5hdHRyaWJzW1widzp2YWxcIl1cclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYoIXRhZyl7XHJcblx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0fVxyXG5cclxuXHRcdHRhZz11bmVzY2FwZSh0YWcudHJpbSgpKVxyXG5cclxuXHRcdG1vZGVsLnJhd0NvZGU9dGFnXHJcblxyXG5cdFx0c3dpdGNoKG1vZGVsLnR5cGUpe1xyXG5cdFx0XHRjYXNlIFwiY29udHJvbC5waWN0dXJlXCI6XHJcblx0XHRcdGNhc2UgXCJjb250cm9sLnRleHRcIjpcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0bGV0IGV4cD1Eb2N4VGVtcGxhdGUuaXNFeHAodGFnKVxyXG5cdFx0XHRcdFx0aWYoIWV4cClcclxuXHRcdFx0XHRcdFx0cmV0dXJuIG1vZGVsXHJcblxyXG5cdFx0XHRcdFx0bW9kZWwudHlwZT1gJHttb2RlbC50eXBlfS5leHBgXHJcblx0XHRcdFx0XHRtb2RlbC5jb2RlPWVzcHJpbWEucGFyc2UoZXhwKVxyXG5cdFx0XHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHRcdFx0fSBjYXRjaChlKXtcclxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoYFske21vZGVsLnR5cGV9XSAke3RhZ30gXFxyXFxuICR7ZXJyb3IubWVzc2FnZX1gKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0Y2FzZSBcImJsb2NrXCI6XHJcblx0XHRcdGNhc2UgXCJpbmxpbmVcIjpcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0aWYodGFnLnN0YXJ0c1dpdGgoXCJzdWJkb2MoXCIpKXtcclxuXHRcdFx0XHRcdFx0bW9kZWwudHlwZT1gJHttb2RlbC50eXBlfS5zdWJkb2NgXHJcblx0XHRcdFx0XHRcdG1vZGVsLmNvZGU9ZXNwcmltYS5wYXJzZSh0YWcpLmJvZHlbMF0uZXhwcmVzc2lvbi5hcmd1bWVudHNbMF1cclxuXHRcdFx0XHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRsZXQgcGFyc2VkQ29kZT1lc3ByaW1hLnBhcnNlKHRhZysne30nKVxyXG5cdFx0XHRcdFx0aWYocGFyc2VkQ29kZS5ib2R5Lmxlbmd0aD09MikvL2Zvci9pZigpe317fVxyXG5cdFx0XHRcdFx0XHRwYXJzZWRDb2RlLmJvZHkucG9wKClcclxuXHRcdFx0XHRcdGVsc2UgaWYocGFyc2VkQ29kZS5ib2R5Lmxlbmd0aD4xKXtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKGBzeW50YXggZXJyb3IsIGlnbm9yZSBhcyBzdGF0aWMgY29udGVudDogXFxuXFxyICR7b2ZmaWNlRG9jdW1lbnQuY29udGVudChub2RlKS50ZXh0KCl9YClcclxuXHRcdFx0XHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRsZXQgW2ZpcnN0U3RhdGVtZW50XT1wYXJzZWRDb2RlLmJvZHlcclxuXHRcdFx0XHRcdHN3aXRjaChmaXJzdFN0YXRlbWVudC50eXBlKXtcclxuXHRcdFx0XHRcdFx0Y2FzZSAnRm9yU3RhdGVtZW50JzpcclxuXHRcdFx0XHRcdFx0XHRtb2RlbC50eXBlPWAke21vZGVsLnR5cGV9LmZvcmBcclxuXHRcdFx0XHRcdFx0XHRtb2RlbC5jb2RlPXBhcnNlZENvZGVcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdFx0Y2FzZSAnSWZTdGF0ZW1lbnQnOlxyXG5cdFx0XHRcdFx0XHRcdG1vZGVsLnR5cGU9YCR7bW9kZWwudHlwZX0uaWZgXHJcblx0XHRcdFx0XHRcdFx0bW9kZWwuY29kZT1wYXJzZWRDb2RlXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKGB1bnN1cHBvcnRlZCBzdGF0ZW1lbnQgaW4gJHttb2RlbC50eXBlfSwgaWdub3JlIGFzIHN0YXRpYyBjb250ZW50OiBcXG5cXHIgJHtvZmZpY2VEb2N1bWVudC5jb250ZW50KG5vZGUpLnRleHQoKX1gKVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1jYXRjaChlcnJvcil7XHJcblx0XHRcdFx0XHRpZihEb2N4VGVtcGxhdGUuaXNFeHAodGFnKSl7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUud2FybihgJHt0YWd9OiBwbGVhc2UgdXNlIHBsYWluIHRleHQgY29udHJvbCBmb3IgZXhwcmVzc2lvbmApXHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coYFske21vZGVsLnR5cGV9XSB3aXRoICR7dGFnfSwgYnV0IG5vdCB2YXJpYW50IGJlY2F1c2UgJHtlcnJvcn1gKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGRlbGV0ZSBtb2RlbC5yYXdDb2RlXHJcblx0XHRyZXR1cm4gbW9kZWxcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERvY3hUZW1wbGF0ZVxyXG4iXX0=