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

			if (!tag) return model;

			tag = tag.attribs["w:val"];
			if (!tag) return model;

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
						console.log("[" + model.type + "] with " + tag + ", but not variant");
					}
			}
			delete model.rawCode;
			return model;
		}
	}]);

	return DocxTemplate;
}(_docx4js3.default);

exports.default = DocxTemplate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJlc3ByaW1hIiwicmVxdWlyZSIsIlZBUklBTlRTIiwic3BsaXQiLCJEb2N4VGVtcGxhdGUiLCJmaWxlIiwiX3BhcnNlIiwiaGFuZGxlciIsImRvY3giLCJwYXJzZSIsImlkZW50aWZ5IiwidmFyRG9jIiwibG9hZCIsInRoZW4iLCJkYXRhIiwiYXNzZW1ibGUiLCJ0ZXh0IiwidHJpbSIsImxlbiIsImxlbmd0aCIsInN1YnN0cmluZyIsIm5vZGUiLCJvZmZpY2VEb2N1bWVudCIsImZpbHRlciIsInRhZ05hbWUiLCJuYW1lIiwicG9wIiwidHlwZSIsImNoaWxkcmVuIiwibW9kZWwiLCJPZmZpY2VEb2N1bWVudCIsImFyZ3VtZW50cyIsImluZGV4T2YiLCJzZHRQciIsImZpbmQiLCJhIiwidGFnIiwiYXR0cmlicyIsInJhd0NvZGUiLCJleHAiLCJpc0V4cCIsImNvZGUiLCJlIiwiY29uc29sZSIsImVycm9yIiwibWVzc2FnZSIsInN0YXJ0c1dpdGgiLCJib2R5IiwiZXhwcmVzc2lvbiIsInBhcnNlZENvZGUiLCJ3YXJuIiwiY29udGVudCIsImZpcnN0U3RhdGVtZW50IiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0FBSkEsSUFBTUEsVUFBUUMsUUFBUSxTQUFSLENBQWQ7OztBQU1BLElBQU1DLFdBQVMsNENBQTRDQyxLQUE1QyxDQUFrRCxHQUFsRCxDQUFmOztJQUVhQyxZLFdBQUFBLFk7Ozs7Ozs7Ozs7OztBQUNaOzs7d0JBR2FDLEksRUFBSztBQUNqQixPQUFNQyxTQUFPLFNBQVBBLE1BQU8sT0FBTTtBQUNsQixRQUFJQyxVQUFRLDZCQUFtQkMsSUFBbkIsQ0FBWjtBQUNBQSxTQUFLQyxLQUFMLENBQVdGLE9BQVgsRUFBb0JILGFBQWFNLFFBQWpDO0FBQ0EsV0FBT0gsUUFBUUksTUFBZjtBQUNNLElBSlA7O0FBTU0sVUFBTyxLQUFLQyxJQUFM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QU9hLEtBQVA7QUFiRjtBQWVBLE1BN0JELENBNkJDLE9BQU1lLEtBQU4sRUFBWTtBQUNaRCxjQUFRVSxHQUFSLE9BQWdCeEIsTUFBTUYsSUFBdEIsZUFBb0NTLEdBQXBDO0FBQ0E7QUEvQ0g7QUFpREEsVUFBT1AsTUFBTVMsT0FBYjtBQUNBLFVBQU9ULEtBQVA7QUFDQTs7Ozs7O2tCQUdhekIsWSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGVzcHJpbWE9cmVxdWlyZShcImVzcHJpbWFcIilcclxuaW1wb3J0IGRvY3g0anMgZnJvbSBcImRvY3g0anNcIlxyXG5pbXBvcnQgdW5lc2NhcGUgZnJvbSBcImxvZGFzaC51bmVzY2FwZVwiXHJcblxyXG5pbXBvcnQgVmFyaWFudEhhbmRsZXIgZnJvbSBcIi4vdmFyaWFudC1oYW5kbGVyXCJcclxuXHJcbmNvbnN0IFZBUklBTlRTPVwiY29udHJvbC5waWN0dXJlLGNvbnRyb2wudGV4dCxibG9jayxpbmxpbmVcIi5zcGxpdChcIixcIilcclxuXHJcbmV4cG9ydCBjbGFzcyBEb2N4VGVtcGxhdGUgZXh0ZW5kcyBkb2N4NGpze1xyXG5cdC8qKlxyXG5cdCogZW50cnk6IHBhcnNlIHRlbXBsYXRlIGFzIGEgdmFyaWFudCBkb2N1bWVudCwgdGhlbiB5b3UgY2FuIGFzc2VtYmxlIHdpdGggZGF0YVxyXG5cdCoqL1xyXG5cdHN0YXRpYyBwYXJzZShmaWxlKXtcclxuXHRcdGNvbnN0IF9wYXJzZT1kb2N4PT57XHJcblx0XHRcdGxldCBoYW5kbGVyPW5ldyBWYXJpYW50SGFuZGxlcihkb2N4KVxyXG5cdFx0XHRkb2N4LnBhcnNlKGhhbmRsZXIsIERvY3hUZW1wbGF0ZS5pZGVudGlmeSlcclxuXHRcdFx0cmV0dXJuIGhhbmRsZXIudmFyRG9jXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkKGZpbGUpLnRoZW4oX3BhcnNlKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBhc3NlbWJsZShmaWxlLGRhdGEpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlKGZpbGUpXHJcblx0XHRcdC50aGVuKHZhckRvYz0+dmFyRG9jLmFzc2VtYmxlKGRhdGEpKVxyXG4gICAgfVxyXG5cclxuXHRzdGF0aWMgaXNFeHAodGV4dCl7XHJcblx0XHR0ZXh0PXRleHQudHJpbSgpXHJcblx0XHRsZXQgbGVuPXRleHQubGVuZ3RoXHJcblx0XHRpZihsZW4+MyAmJiB0ZXh0WzBdID09ICckJyAmJiB0ZXh0WzFdID09ICd7JyAmJiB0ZXh0W2xlbiAtIDFdID09ICd9Jyl7XHJcblx0XHRcdHRleHQ9dGV4dC5zdWJzdHJpbmcoMix0ZXh0Lmxlbmd0aC0xKS50cmltKClcclxuXHRcdFx0aWYodGV4dC5sZW5ndGgpXHJcblx0XHRcdFx0cmV0dXJuIHRleHRcclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGlkZW50aWZ5KG5vZGUsIG9mZmljZURvY3VtZW50LCBmaWx0ZXI9dHJ1ZSl7XHJcblx0XHRpZihmaWx0ZXIpe1xyXG5cdFx0XHRsZXQgdGFnTmFtZT1ub2RlLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXHJcblx0XHRcdGlmKHRhZ05hbWU9PVwiZG9jdW1lbnRcIilcclxuXHRcdFx0XHRyZXR1cm4ge3R5cGU6XCJkb2N1bWVudFwiLCBjaGlsZHJlbjogbm9kZS5jaGlsZHJlblswXS5jaGlsZHJlbn1cclxuXHJcblx0XHRcdGlmKHRhZ05hbWU9PVwic3R5bGVzXCIgfHwgdGFnTmFtZT09XCJudW1iZXJpbmdcIilcclxuXHRcdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBtb2RlbD1kb2N4NGpzLk9mZmljZURvY3VtZW50LmlkZW50aWZ5KC4uLmFyZ3VtZW50cylcclxuXHJcblx0XHRpZighbW9kZWwgfHwgdHlwZW9mKG1vZGVsKT09XCJzdHJpbmdcIiB8fCBWQVJJQU5UUy5pbmRleE9mKG1vZGVsLnR5cGUpPT0tMSlcclxuXHRcdFx0cmV0dXJuIG1vZGVsXHJcblxyXG5cdFx0bGV0IHNkdFByPW5vZGUuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzpzZHRQclwiKVxyXG5cdFx0aWYoIXNkdFByKVxyXG5cdFx0XHRyZXR1cm4gbW9kZWxcclxuXHJcblx0XHRsZXQgdGFnPXNkdFByLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6dGFnXCIpXHJcblxyXG5cdFx0aWYoIXRhZylcclxuXHRcdFx0cmV0dXJuIG1vZGVsXHJcblxyXG5cdFx0dGFnPXRhZy5hdHRyaWJzW1widzp2YWxcIl1cclxuXHRcdGlmKCF0YWcpXHJcblx0XHRcdHJldHVybiBtb2RlbFxyXG5cclxuXHRcdHRhZz11bmVzY2FwZSh0YWcudHJpbSgpKVxyXG5cclxuXHRcdG1vZGVsLnJhd0NvZGU9dGFnXHJcblxyXG5cdFx0c3dpdGNoKG1vZGVsLnR5cGUpe1xyXG5cdFx0XHRjYXNlIFwiY29udHJvbC5waWN0dXJlXCI6XHJcblx0XHRcdGNhc2UgXCJjb250cm9sLnRleHRcIjpcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0bGV0IGV4cD1Eb2N4VGVtcGxhdGUuaXNFeHAodGFnKVxyXG5cdFx0XHRcdFx0aWYoIWV4cClcclxuXHRcdFx0XHRcdFx0cmV0dXJuIG1vZGVsXHJcblxyXG5cdFx0XHRcdFx0bW9kZWwudHlwZT1gJHttb2RlbC50eXBlfS5leHBgXHJcblx0XHRcdFx0XHRtb2RlbC5jb2RlPWVzcHJpbWEucGFyc2UoZXhwKVxyXG5cdFx0XHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHRcdFx0fSBjYXRjaChlKXtcclxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoYFske21vZGVsLnR5cGV9XSAke3RhZ30gXFxyXFxuICR7ZXJyb3IubWVzc2FnZX1gKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0Y2FzZSBcImJsb2NrXCI6XHJcblx0XHRcdGNhc2UgXCJpbmxpbmVcIjpcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0aWYodGFnLnN0YXJ0c1dpdGgoXCJzdWJkb2MoXCIpKXtcclxuXHRcdFx0XHRcdFx0bW9kZWwudHlwZT1gJHttb2RlbC50eXBlfS5zdWJkb2NgXHJcblx0XHRcdFx0XHRcdG1vZGVsLmNvZGU9ZXNwcmltYS5wYXJzZSh0YWcpLmJvZHlbMF0uZXhwcmVzc2lvbi5hcmd1bWVudHNbMF1cclxuXHRcdFx0XHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRsZXQgcGFyc2VkQ29kZT1lc3ByaW1hLnBhcnNlKHRhZysne30nKVxyXG5cdFx0XHRcdFx0aWYocGFyc2VkQ29kZS5ib2R5Lmxlbmd0aD09MikvL2Zvci9pZigpe317fVxyXG5cdFx0XHRcdFx0XHRwYXJzZWRDb2RlLmJvZHkucG9wKClcclxuXHRcdFx0XHRcdGVsc2UgaWYocGFyc2VkQ29kZS5ib2R5Lmxlbmd0aD4xKXtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKGBzeW50YXggZXJyb3IsIGlnbm9yZSBhcyBzdGF0aWMgY29udGVudDogXFxuXFxyICR7b2ZmaWNlRG9jdW1lbnQuY29udGVudChub2RlKS50ZXh0KCl9YClcclxuXHRcdFx0XHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRsZXQgW2ZpcnN0U3RhdGVtZW50XT1wYXJzZWRDb2RlLmJvZHlcclxuXHRcdFx0XHRcdHN3aXRjaChmaXJzdFN0YXRlbWVudC50eXBlKXtcclxuXHRcdFx0XHRcdFx0Y2FzZSAnRm9yU3RhdGVtZW50JzpcclxuXHRcdFx0XHRcdFx0XHRtb2RlbC50eXBlPWAke21vZGVsLnR5cGV9LmZvcmBcclxuXHRcdFx0XHRcdFx0XHRtb2RlbC5jb2RlPXBhcnNlZENvZGVcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdFx0Y2FzZSAnSWZTdGF0ZW1lbnQnOlxyXG5cdFx0XHRcdFx0XHRcdG1vZGVsLnR5cGU9YCR7bW9kZWwudHlwZX0uaWZgXHJcblx0XHRcdFx0XHRcdFx0bW9kZWwuY29kZT1wYXJzZWRDb2RlXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKGB1bnN1cHBvcnRlZCBzdGF0ZW1lbnQgaW4gJHttb2RlbC50eXBlfSwgaWdub3JlIGFzIHN0YXRpYyBjb250ZW50OiBcXG5cXHIgJHtvZmZpY2VEb2N1bWVudC5jb250ZW50KG5vZGUpLnRleHQoKX1gKVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1jYXRjaChlcnJvcil7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhgWyR7bW9kZWwudHlwZX1dIHdpdGggJHt0YWd9LCBidXQgbm90IHZhcmlhbnRgKVxyXG5cdFx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGRlbGV0ZSBtb2RlbC5yYXdDb2RlXHJcblx0XHRyZXR1cm4gbW9kZWxcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERvY3hUZW1wbGF0ZVxyXG4iXX0=