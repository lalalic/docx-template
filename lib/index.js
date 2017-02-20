"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DocxTemplate = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _esprima = require("esprima");

var _esprima2 = _interopRequireDefault(_esprima);

var _docx4js2 = require("docx4js");

var _docx4js3 = _interopRequireDefault(_docx4js2);

var _variantHandler = require("./variant-handler");

var _variantHandler2 = _interopRequireDefault(_variantHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
			if (file instanceof _docx4js3.default) return Promise.resolve(_parse(file));

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

			var tagName = node.name.split(":").pop();
			if (tagName == "styles" || tagName == "numbering") return null;

			var model = (_docx4js$OfficeDocume = _docx4js3.default.OfficeDocument).identify.apply(_docx4js$OfficeDocume, arguments);

			if (typeof model == "string" || VARIANTS.indexOf(model.type) == -1) return model;

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

			tag = tag.trim();

			model.rawCode = tag;

			switch (model.type) {
				case "control.picture":
				case "control.text":
					try {
						var exp = DocxTemplate.isExp(tag);
						if (!exp) return model;

						model.type = model.type + ".exp";
						model.code = _esprima2.default.parse(exp);
						return model;
					} catch (e) {
						console.error("[" + model.type + "] " + tag + " \r\n " + error.message);
					}
				case "block":
				case "inline":
					try {
						var parsedCode = _esprima2.default.parse(tag + '{}');
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
						console.error("[" + model.type + "] " + tag + " \r\n " + error.message);
					}
			}
			delete model.rawCode;
			return model;
		}
	}]);

	return DocxTemplate;
}(_docx4js3.default);

exports.default = DocxTemplate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJWQVJJQU5UUyIsInNwbGl0IiwiRG9jeFRlbXBsYXRlIiwiZmlsZSIsIl9wYXJzZSIsImhhbmRsZXIiLCJkb2N4IiwicGFyc2UiLCJpZGVudGlmeSIsInZhckRvYyIsIlByb21pc2UiLCJyZXNvbHZlIiwibG9hZCIsInRoZW4iLCJkYXRhIiwiYXNzZW1ibGUiLCJ0ZXh0IiwidHJpbSIsImxlbiIsImxlbmd0aCIsInN1YnN0cmluZyIsIm5vZGUiLCJvZmZpY2VEb2N1bWVudCIsInRhZ05hbWUiLCJuYW1lIiwicG9wIiwibW9kZWwiLCJPZmZpY2VEb2N1bWVudCIsImFyZ3VtZW50cyIsImluZGV4T2YiLCJ0eXBlIiwic2R0UHIiLCJjaGlsZHJlbiIsImZpbmQiLCJhIiwidGFnIiwiYXR0cmlicyIsInJhd0NvZGUiLCJleHAiLCJpc0V4cCIsImNvZGUiLCJlIiwiY29uc29sZSIsImVycm9yIiwibWVzc2FnZSIsInBhcnNlZENvZGUiLCJib2R5Iiwid2FybiIsImNvbnRlbnQiLCJmaXJzdFN0YXRlbWVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFdBQVMsNENBQTRDQyxLQUE1QyxDQUFrRCxHQUFsRCxDQUFmOztJQUVhQyxZLFdBQUFBLFk7Ozs7Ozs7Ozs7OztBQUNaOzs7d0JBR2FDLEksRUFBSztBQUNqQixPQUFNQyxTQUFPLFNBQVBBLE1BQU8sT0FBTTtBQUNsQixRQUFJQyxVQUFRLDZCQUFtQkMsSUFBbkIsQ0FBWjtBQUNBQSxTQUFLQyxLQUFMLENBQVdGLE9BQVgsRUFBb0JILGFBQWFNLFFBQWpDO0FBQ0EsV0FBT0gsUUFBUUksTUFBZjtBQUNNLElBSlA7QUFLQSxPQUFHTixpQ0FBSCxFQUNDLE9BQU9PLFFBQVFDLE9BQVIsQ0FBZ0JQLE9BQU9ELElBQVAsQ0FBaEIsQ0FBUDs7QUFFSyxVQUFPLEtBQUtTLElBQUwsQ0FBVVQs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M0IsTUFBaEIsR0FBdUIsQ0FBMUIsRUFBNEI7QUFDaEN1QixlQUFRSyxJQUFSLG1EQUE2RHpCLGVBQWUwQixPQUFmLENBQXVCM0IsSUFBdkIsRUFBNkJMLElBQTdCLEVBQTdEO0FBQ0EsY0FBT1UsS0FBUDtBQUNBOztBQVBFLDRDQVFrQm1CLFdBQVdDLElBUjdCO0FBQUEsVUFRRUcsY0FSRjs7QUFTSCxjQUFPQSxlQUFlbkIsSUFBdEI7QUFDQyxZQUFLLGNBQUw7QUFDQ0osY0FBTUksSUFBTixHQUFjSixNQUFNSSxJQUFwQjtBQUNBSixjQUFNYyxJQUFOLEdBQVdLLFVBQVg7QUFDQSxlQUFPbkIsS0FBUDtBQUNEO0FBQ0EsWUFBSyxhQUFMO0FBQ0NBLGNBQU1JLElBQU4sR0FBY0osTUFBTUksSUFBcEI7QUFDQUosY0FBTWMsSUFBTixHQUFXSyxVQUFYO0FBQ0EsZUFBT25CLEtBQVA7QUFDRDtBQUNBO0FBQ0NnQixnQkFBUUssSUFBUiwrQkFBeUNyQixNQUFNSSxJQUEvQyx5Q0FBdUZSLGVBQWUwQixPQUFmLENBQXVCM0IsSUFBdkIsRUFBNkJMLElBQTdCLEVBQXZGO0FBQ0EsZUFBT1UsS0FBUDtBQWJGO0FBZUEsTUF4QkQsQ0F3QkMsT0FBTWlCLEtBQU4sRUFBWTtBQUNaRCxjQUFRQyxLQUFSLE9BQWtCakIsTUFBTUksSUFBeEIsVUFBaUNLLEdBQWpDLGNBQTZDUSxNQUFNQyxPQUFuRDtBQUNBO0FBMUNIO0FBNENBLFVBQU9sQixNQUFNVyxPQUFiO0FBQ0EsVUFBT1gsS0FBUDtBQUNBOzs7Ozs7a0JBR2F4QixZIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGVzcHJpbWEgZnJvbSBcImVzcHJpbWFcIlxyXG5pbXBvcnQgZG9jeDRqcyBmcm9tIFwiZG9jeDRqc1wiXHJcblxyXG5pbXBvcnQgVmFyaWFudEhhbmRsZXIgZnJvbSBcIi4vdmFyaWFudC1oYW5kbGVyXCJcclxuXHJcbmNvbnN0IFZBUklBTlRTPVwiY29udHJvbC5waWN0dXJlLGNvbnRyb2wudGV4dCxibG9jayxpbmxpbmVcIi5zcGxpdChcIixcIilcclxuXHJcbmV4cG9ydCBjbGFzcyBEb2N4VGVtcGxhdGUgZXh0ZW5kcyBkb2N4NGpze1xyXG5cdC8qKlxyXG5cdCogZW50cnk6IHBhcnNlIHRlbXBsYXRlIGFzIGEgdmFyaWFudCBkb2N1bWVudCwgdGhlbiB5b3UgY2FuIGFzc2VtYmxlIHdpdGggZGF0YVxyXG5cdCoqL1xyXG5cdHN0YXRpYyBwYXJzZShmaWxlKXtcclxuXHRcdGNvbnN0IF9wYXJzZT1kb2N4PT57XHJcblx0XHRcdGxldCBoYW5kbGVyPW5ldyBWYXJpYW50SGFuZGxlcihkb2N4KVxyXG5cdFx0XHRkb2N4LnBhcnNlKGhhbmRsZXIsIERvY3hUZW1wbGF0ZS5pZGVudGlmeSlcclxuXHRcdFx0cmV0dXJuIGhhbmRsZXIudmFyRG9jXHJcbiAgICAgICAgfVxyXG5cdFx0aWYoZmlsZSBpbnN0YW5jZW9mIGRvY3g0anMpXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoX3BhcnNlKGZpbGUpKVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkKGZpbGUpLnRoZW4oX3BhcnNlKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBhc3NlbWJsZShmaWxlLGRhdGEpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlKGZpbGUpXHJcblx0XHRcdC50aGVuKHZhckRvYz0+dmFyRG9jLmFzc2VtYmxlKGRhdGEpKVxyXG4gICAgfVxyXG5cclxuXHRzdGF0aWMgaXNFeHAodGV4dCl7XHJcblx0XHR0ZXh0PXRleHQudHJpbSgpXHJcblx0XHRsZXQgbGVuPXRleHQubGVuZ3RoXHJcblx0XHRpZihsZW4+MyAmJiB0ZXh0WzBdID09ICckJyAmJiB0ZXh0WzFdID09ICd7JyAmJiB0ZXh0W2xlbiAtIDFdID09ICd9Jyl7XHJcblx0XHRcdHRleHQ9dGV4dC5zdWJzdHJpbmcoMix0ZXh0Lmxlbmd0aC0xKS50cmltKClcclxuXHRcdFx0aWYodGV4dC5sZW5ndGgpXHJcblx0XHRcdFx0cmV0dXJuIHRleHRcclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGlkZW50aWZ5KG5vZGUsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCB0YWdOYW1lPW5vZGUubmFtZS5zcGxpdChcIjpcIikucG9wKClcclxuXHRcdGlmKHRhZ05hbWU9PVwic3R5bGVzXCIgfHwgdGFnTmFtZT09XCJudW1iZXJpbmdcIilcclxuXHRcdFx0cmV0dXJuIG51bGxcclxuXHJcblx0XHRsZXQgbW9kZWw9ZG9jeDRqcy5PZmZpY2VEb2N1bWVudC5pZGVudGlmeSguLi5hcmd1bWVudHMpXHJcblxyXG5cclxuXHRcdGlmKHR5cGVvZihtb2RlbCk9PVwic3RyaW5nXCIgfHwgVkFSSUFOVFMuaW5kZXhPZihtb2RlbC50eXBlKT09LTEpXHJcblx0XHRcdHJldHVybiBtb2RlbFxyXG5cclxuXHRcdGxldCBzZHRQcj1ub2RlLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6c2R0UHJcIilcclxuXHRcdGlmKCFzZHRQcilcclxuXHRcdFx0cmV0dXJuIG1vZGVsXHJcblxyXG5cdFx0bGV0IHRhZz1zZHRQci5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnRhZ1wiKVxyXG5cclxuXHRcdGlmKCF0YWcpXHJcblx0XHRcdHJldHVybiBtb2RlbFxyXG5cclxuXHRcdHRhZz10YWcuYXR0cmlic1tcInc6dmFsXCJdXHJcblx0XHRpZighdGFnKVxyXG5cdFx0XHRyZXR1cm4gbW9kZWxcclxuXHJcblx0XHR0YWc9dGFnLnRyaW0oKVxyXG5cclxuXHRcdG1vZGVsLnJhd0NvZGU9dGFnXHJcblx0XHRcclxuXHRcdHN3aXRjaChtb2RlbC50eXBlKXtcclxuXHRcdFx0Y2FzZSBcImNvbnRyb2wucGljdHVyZVwiOlxyXG5cdFx0XHRjYXNlIFwiY29udHJvbC50ZXh0XCI6IFxyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRsZXQgZXhwPURvY3hUZW1wbGF0ZS5pc0V4cCh0YWcpXHJcblx0XHRcdFx0XHRpZighZXhwKVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0bW9kZWwudHlwZT1gJHttb2RlbC50eXBlfS5leHBgXHJcblx0XHRcdFx0XHRtb2RlbC5jb2RlPWVzcHJpbWEucGFyc2UoZXhwKVxyXG5cdFx0XHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHRcdFx0fSBjYXRjaChlKXtcclxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoYFske21vZGVsLnR5cGV9XSAke3RhZ30gXFxyXFxuICR7ZXJyb3IubWVzc2FnZX1gKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0Y2FzZSBcImJsb2NrXCI6XHJcblx0XHRcdGNhc2UgXCJpbmxpbmVcIjpcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0bGV0IHBhcnNlZENvZGU9ZXNwcmltYS5wYXJzZSh0YWcrJ3t9JylcclxuXHRcdFx0XHRcdGlmKHBhcnNlZENvZGUuYm9keS5sZW5ndGg9PTIpLy9mb3IvaWYoKXt9e31cclxuXHRcdFx0XHRcdFx0cGFyc2VkQ29kZS5ib2R5LnBvcCgpXHJcblx0XHRcdFx0XHRlbHNlIGlmKHBhcnNlZENvZGUuYm9keS5sZW5ndGg+MSl7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUud2Fybihgc3ludGF4IGVycm9yLCBpZ25vcmUgYXMgc3RhdGljIGNvbnRlbnQ6IFxcblxcciAke29mZmljZURvY3VtZW50LmNvbnRlbnQobm9kZSkudGV4dCgpfWApXHJcblx0XHRcdFx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0bGV0IFtmaXJzdFN0YXRlbWVudF09cGFyc2VkQ29kZS5ib2R5XHJcblx0XHRcdFx0XHRzd2l0Y2goZmlyc3RTdGF0ZW1lbnQudHlwZSl7XHJcblx0XHRcdFx0XHRcdGNhc2UgJ0ZvclN0YXRlbWVudCc6XHJcblx0XHRcdFx0XHRcdFx0bW9kZWwudHlwZT1gJHttb2RlbC50eXBlfS5mb3JgXHJcblx0XHRcdFx0XHRcdFx0bW9kZWwuY29kZT1wYXJzZWRDb2RlXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRcdGNhc2UgJ0lmU3RhdGVtZW50JzpcclxuXHRcdFx0XHRcdFx0XHRtb2RlbC50eXBlPWAke21vZGVsLnR5cGV9LmlmYFxyXG5cdFx0XHRcdFx0XHRcdG1vZGVsLmNvZGU9cGFyc2VkQ29kZVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUud2FybihgdW5zdXBwb3J0ZWQgc3RhdGVtZW50IGluICR7bW9kZWwudHlwZX0sIGlnbm9yZSBhcyBzdGF0aWMgY29udGVudDogXFxuXFxyICR7b2ZmaWNlRG9jdW1lbnQuY29udGVudChub2RlKS50ZXh0KCl9YClcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9Y2F0Y2goZXJyb3Ipe1xyXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihgWyR7bW9kZWwudHlwZX1dICR7dGFnfSBcXHJcXG4gJHtlcnJvci5tZXNzYWdlfWApXHJcblx0XHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZGVsZXRlIG1vZGVsLnJhd0NvZGVcclxuXHRcdHJldHVybiBtb2RlbFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRG9jeFRlbXBsYXRlXHJcbiJdfQ==