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

var _lodash = require("lodash.unescape");

var _lodash2 = _interopRequireDefault(_lodash);

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
						model.code = _esprima2.default.parse(exp);
						return model;
					} catch (e) {
						console.error("[" + model.type + "] " + tag + " \r\n " + error.message);
					}
				case "block":
				case "inline":
					try {
						if (tag.startsWith("subdoc(")) {
							model.type = mode.type + ".subdoc";
							model.code = _esprima2.default.parse(tag).body[0].expression.arguments[0];
							return model;
						}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJWQVJJQU5UUyIsInNwbGl0IiwiRG9jeFRlbXBsYXRlIiwiZmlsZSIsIl9wYXJzZSIsImhhbmRsZXIiLCJkb2N4IiwicGFyc2UiLCJpZGVudGlmeSIsInZhckRvYyIsImxvYWQiLCJ0aGVuIiwiZGF0YSIsImFzc2VtYmxlIiwidGV4dCIsInRyaW0iLCJsZW4iLCJsZW5ndGgiLCJzdWJzdHJpbmciLCJub2RlIiwib2ZmaWNlRG9jdW1lbnQiLCJmaWx0ZXIiLCJ0YWdOYW1lIiwibmFtZSIsInBvcCIsInR5cGUiLCJjaGlsZHJlbiIsIm1vZGVsIiwiT2ZmaWNlRG9jdW1lbnQiLCJhcmd1bWVudHMiLCJpbmRleE9mIiwic2R0UHIiLCJmaW5kIiwiYSIsInRhZyIsImF0dHJpYnMiLCJyYXdDb2RlIiwiZXhwIiwiaXNFeHAiLCJjb2RlIiwiZSIsImNvbnNvbGUiLCJlcnJvciIsIm1lc3NhZ2UiLCJzdGFydHNXaXRoIiwibW9kZSIsImJvZHkiLCJleHByZXNzaW9uIiwicGFyc2VkQ29kZSIsIndhcm4iLCJjb250ZW50IiwiZmlyc3RTdGF0ZW1lbnQiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFdBQVMsNENBQTRDQyxLQUE1QyxDQUFrRCxHQUFsRCxDQUFmOztJQUVhQyxZLFdBQUFBLFk7Ozs7Ozs7Ozs7OztBQUNaOzs7d0JBR2FDLEksRUFBSztBQUNqQixPQUFNQyxTQUFPLFNBQVBBLE1BQU8sT0FBTTtBQUNsQixRQUFJQyxVQUFRLDZCQUFtQkMsSUFBbkIsQ0FBWjtBQUNBQSxTQUFLQyxLQUFMLENBQVdGLE9BQVgsRUFBb0JILGFBQWFNLFFBQWpDO0FBQ0EsV0FBT0gsUUFBUUksTUFBZjtBQUNNLElBSlA7O0FBTU0sVUFBTyxLQUFLQyxJQUFMLENBQVVQLElBQVYsRUFBZ0JRLElBQWhCLENBQXFCUCxNQUFyQixD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S0FBTixFQUFZO0FBQ1pELGNBQVFXLEdBQVIsT0FBZ0J6QixNQUFNRixJQUF0QixlQUFvQ1MsR0FBcEM7QUFDQTtBQS9DSDtBQWlEQSxVQUFPUCxNQUFNUyxPQUFiO0FBQ0EsVUFBT1QsS0FBUDtBQUNBOzs7Ozs7a0JBR2F6QixZIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGVzcHJpbWEgZnJvbSBcImVzcHJpbWFcIlxyXG5pbXBvcnQgZG9jeDRqcyBmcm9tIFwiZG9jeDRqc1wiXHJcbmltcG9ydCB1bmVzY2FwZSBmcm9tIFwibG9kYXNoLnVuZXNjYXBlXCJcclxuXHJcbmltcG9ydCBWYXJpYW50SGFuZGxlciBmcm9tIFwiLi92YXJpYW50LWhhbmRsZXJcIlxyXG5cclxuY29uc3QgVkFSSUFOVFM9XCJjb250cm9sLnBpY3R1cmUsY29udHJvbC50ZXh0LGJsb2NrLGlubGluZVwiLnNwbGl0KFwiLFwiKVxyXG5cclxuZXhwb3J0IGNsYXNzIERvY3hUZW1wbGF0ZSBleHRlbmRzIGRvY3g0anN7XHJcblx0LyoqXHJcblx0KiBlbnRyeTogcGFyc2UgdGVtcGxhdGUgYXMgYSB2YXJpYW50IGRvY3VtZW50LCB0aGVuIHlvdSBjYW4gYXNzZW1ibGUgd2l0aCBkYXRhXHJcblx0KiovXHJcblx0c3RhdGljIHBhcnNlKGZpbGUpe1xyXG5cdFx0Y29uc3QgX3BhcnNlPWRvY3g9PntcclxuXHRcdFx0bGV0IGhhbmRsZXI9bmV3IFZhcmlhbnRIYW5kbGVyKGRvY3gpXHJcblx0XHRcdGRvY3gucGFyc2UoaGFuZGxlciwgRG9jeFRlbXBsYXRlLmlkZW50aWZ5KVxyXG5cdFx0XHRyZXR1cm4gaGFuZGxlci52YXJEb2NcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmxvYWQoZmlsZSkudGhlbihfcGFyc2UpXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGFzc2VtYmxlKGZpbGUsZGF0YSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2UoZmlsZSlcclxuXHRcdFx0LnRoZW4odmFyRG9jPT52YXJEb2MuYXNzZW1ibGUoZGF0YSkpXHJcbiAgICB9XHJcblxyXG5cdHN0YXRpYyBpc0V4cCh0ZXh0KXtcclxuXHRcdHRleHQ9dGV4dC50cmltKClcclxuXHRcdGxldCBsZW49dGV4dC5sZW5ndGhcclxuXHRcdGlmKGxlbj4zICYmIHRleHRbMF0gPT0gJyQnICYmIHRleHRbMV0gPT0gJ3snICYmIHRleHRbbGVuIC0gMV0gPT0gJ30nKXtcclxuXHRcdFx0dGV4dD10ZXh0LnN1YnN0cmluZygyLHRleHQubGVuZ3RoLTEpLnRyaW0oKVxyXG5cdFx0XHRpZih0ZXh0Lmxlbmd0aClcclxuXHRcdFx0XHRyZXR1cm4gdGV4dFxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgaWRlbnRpZnkobm9kZSwgb2ZmaWNlRG9jdW1lbnQsIGZpbHRlcj10cnVlKXtcclxuXHRcdGlmKGZpbHRlcil7XHJcblx0XHRcdGxldCB0YWdOYW1lPW5vZGUubmFtZS5zcGxpdChcIjpcIikucG9wKClcclxuXHRcdFx0aWYodGFnTmFtZT09XCJkb2N1bWVudFwiKVxyXG5cdFx0XHRcdHJldHVybiB7dHlwZTpcImRvY3VtZW50XCIsIGNoaWxkcmVuOiBub2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVufVxyXG5cclxuXHRcdFx0aWYodGFnTmFtZT09XCJzdHlsZXNcIiB8fCB0YWdOYW1lPT1cIm51bWJlcmluZ1wiKVxyXG5cdFx0XHRcdHJldHVybiBudWxsXHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IG1vZGVsPWRvY3g0anMuT2ZmaWNlRG9jdW1lbnQuaWRlbnRpZnkoLi4uYXJndW1lbnRzKVxyXG5cclxuXHRcdGlmKCFtb2RlbCB8fCB0eXBlb2YobW9kZWwpPT1cInN0cmluZ1wiIHx8IFZBUklBTlRTLmluZGV4T2YobW9kZWwudHlwZSk9PS0xKVxyXG5cdFx0XHRyZXR1cm4gbW9kZWxcclxuXHJcblx0XHRsZXQgc2R0UHI9bm9kZS5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnNkdFByXCIpXHJcblx0XHRpZighc2R0UHIpXHJcblx0XHRcdHJldHVybiBtb2RlbFxyXG5cclxuXHRcdGxldCB0YWc9c2R0UHIuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzp0YWdcIilcclxuXHJcblx0XHRpZighdGFnKVxyXG5cdFx0XHRyZXR1cm4gbW9kZWxcclxuXHJcblx0XHR0YWc9dGFnLmF0dHJpYnNbXCJ3OnZhbFwiXVxyXG5cdFx0aWYoIXRhZylcclxuXHRcdFx0cmV0dXJuIG1vZGVsXHJcblxyXG5cdFx0dGFnPXVuZXNjYXBlKHRhZy50cmltKCkpXHJcblxyXG5cdFx0bW9kZWwucmF3Q29kZT10YWdcclxuXHJcblx0XHRzd2l0Y2gobW9kZWwudHlwZSl7XHJcblx0XHRcdGNhc2UgXCJjb250cm9sLnBpY3R1cmVcIjpcclxuXHRcdFx0Y2FzZSBcImNvbnRyb2wudGV4dFwiOlxyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRsZXQgZXhwPURvY3hUZW1wbGF0ZS5pc0V4cCh0YWcpXHJcblx0XHRcdFx0XHRpZighZXhwKVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxcclxuXHJcblx0XHRcdFx0XHRtb2RlbC50eXBlPWAke21vZGVsLnR5cGV9LmV4cGBcclxuXHRcdFx0XHRcdG1vZGVsLmNvZGU9ZXNwcmltYS5wYXJzZShleHApXHJcblx0XHRcdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdFx0XHR9IGNhdGNoKGUpe1xyXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihgWyR7bW9kZWwudHlwZX1dICR7dGFnfSBcXHJcXG4gJHtlcnJvci5tZXNzYWdlfWApXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRjYXNlIFwiYmxvY2tcIjpcclxuXHRcdFx0Y2FzZSBcImlubGluZVwiOlxyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRpZih0YWcuc3RhcnRzV2l0aChcInN1YmRvYyhcIikpe1xyXG5cdFx0XHRcdFx0XHRtb2RlbC50eXBlPWAke21vZGUudHlwZX0uc3ViZG9jYFxyXG5cdFx0XHRcdFx0XHRtb2RlbC5jb2RlPWVzcHJpbWEucGFyc2UodGFnKS5ib2R5WzBdLmV4cHJlc3Npb24uYXJndW1lbnRzWzBdXHJcblx0XHRcdFx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0bGV0IHBhcnNlZENvZGU9ZXNwcmltYS5wYXJzZSh0YWcrJ3t9JylcclxuXHRcdFx0XHRcdGlmKHBhcnNlZENvZGUuYm9keS5sZW5ndGg9PTIpLy9mb3IvaWYoKXt9e31cclxuXHRcdFx0XHRcdFx0cGFyc2VkQ29kZS5ib2R5LnBvcCgpXHJcblx0XHRcdFx0XHRlbHNlIGlmKHBhcnNlZENvZGUuYm9keS5sZW5ndGg+MSl7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUud2Fybihgc3ludGF4IGVycm9yLCBpZ25vcmUgYXMgc3RhdGljIGNvbnRlbnQ6IFxcblxcciAke29mZmljZURvY3VtZW50LmNvbnRlbnQobm9kZSkudGV4dCgpfWApXHJcblx0XHRcdFx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0bGV0IFtmaXJzdFN0YXRlbWVudF09cGFyc2VkQ29kZS5ib2R5XHJcblx0XHRcdFx0XHRzd2l0Y2goZmlyc3RTdGF0ZW1lbnQudHlwZSl7XHJcblx0XHRcdFx0XHRcdGNhc2UgJ0ZvclN0YXRlbWVudCc6XHJcblx0XHRcdFx0XHRcdFx0bW9kZWwudHlwZT1gJHttb2RlbC50eXBlfS5mb3JgXHJcblx0XHRcdFx0XHRcdFx0bW9kZWwuY29kZT1wYXJzZWRDb2RlXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRcdGNhc2UgJ0lmU3RhdGVtZW50JzpcclxuXHRcdFx0XHRcdFx0XHRtb2RlbC50eXBlPWAke21vZGVsLnR5cGV9LmlmYFxyXG5cdFx0XHRcdFx0XHRcdG1vZGVsLmNvZGU9cGFyc2VkQ29kZVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUud2FybihgdW5zdXBwb3J0ZWQgc3RhdGVtZW50IGluICR7bW9kZWwudHlwZX0sIGlnbm9yZSBhcyBzdGF0aWMgY29udGVudDogXFxuXFxyICR7b2ZmaWNlRG9jdW1lbnQuY29udGVudChub2RlKS50ZXh0KCl9YClcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9Y2F0Y2goZXJyb3Ipe1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coYFske21vZGVsLnR5cGV9XSB3aXRoICR7dGFnfSwgYnV0IG5vdCB2YXJpYW50YClcclxuXHRcdFx0XHR9XHJcblx0XHR9XHJcblx0XHRkZWxldGUgbW9kZWwucmF3Q29kZVxyXG5cdFx0cmV0dXJuIG1vZGVsXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEb2N4VGVtcGxhdGVcclxuIl19