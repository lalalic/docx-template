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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJWQVJJQU5UUyIsInNwbGl0IiwiRG9jeFRlbXBsYXRlIiwiZmlsZSIsIl9wYXJzZSIsImhhbmRsZXIiLCJkb2N4IiwicGFyc2UiLCJpZGVudGlmeSIsInZhckRvYyIsIlByb21pc2UiLCJyZXNvbHZlIiwibG9hZCIsInRoZW4iLCJkYXRhIiwiYXNzZW1ibGUiLCJ0ZXh0IiwidHJpbSIsImxlbiIsImxlbmd0aCIsInN1YnN0cmluZyIsIm5vZGUiLCJvZmZpY2VEb2N1bWVudCIsInRhZ05hbWUiLCJuYW1lIiwicG9wIiwibW9kZWwiLCJPZmZpY2VEb2N1bWVudCIsImFyZ3VtZW50cyIsImluZGV4T2YiLCJ0eXBlIiwic2R0UHIiLCJjaGlsZHJlbiIsImZpbmQiLCJhIiwidGFnIiwiYXR0cmlicyIsInJhd0NvZGUiLCJleHAiLCJpc0V4cCIsImNvZGUiLCJlIiwiY29uc29sZSIsImVycm9yIiwibWVzc2FnZSIsInBhcnNlZENvZGUiLCJib2R5Iiwid2FybiIsImNvbnRlbnQiLCJmaXJzdFN0YXRlbWVudCIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsV0FBUyw0Q0FBNENDLEtBQTVDLENBQWtELEdBQWxELENBQWY7O0lBRWFDLFksV0FBQUEsWTs7Ozs7Ozs7Ozs7O0FBQ1o7Ozt3QkFHYUMsSSxFQUFLO0FBQ2pCLE9BQU1DLFNBQU8sU0FBUEEsTUFBTyxPQUFNO0FBQ2xCLFFBQUlDLFVBQVEsNkJBQW1CQyxJQUFuQixDQUFaO0FBQ0FBLFNBQUtDLEtBQUwsQ0FBV0YsT0FBWCxFQUFvQkgsYUFBYU0sUUFBakM7QUFDQSxXQUFPSCxRQUFRSSxNQUFmO0FBQ00sSUFKUDtBQUtBLE9BQUdOLGlDQUFILEVBQ0MsT0FBT08sUUFBUUMsT0FBUixDQUFnQlAsT0FBT0QsSUFBUCxDQUFoQixDQUFQOztBQUVLLFVBQU8sS0FB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SyxJQUFHb0IsV0FBV0MsSUFBWCxDQUFnQjNCLE1BQWhCLEdBQXVCLENBQTFCLEVBQTRCO0FBQ2hDdUIsZUFBUUssSUFBUixtREFBNkR6QixlQUFlMEIsT0FBZixDQUF1QjNCLElBQXZCLEVBQTZCTCxJQUE3QixFQUE3RDtBQUNBLGNBQU9VLEtBQVA7QUFDQTs7QUFQRSw0Q0FRa0JtQixXQUFXQyxJQVI3QjtBQUFBLFVBUUVHLGNBUkY7O0FBU0gsY0FBT0EsZUFBZW5CLElBQXRCO0FBQ0MsWUFBSyxjQUFMO0FBQ0NKLGNBQU1JLElBQU4sR0FBY0osTUFBTUksSUFBcEI7QUFDQUosY0FBTWMsSUFBTixHQUFXSyxVQUFYO0FBQ0EsZUFBT25CLEtBQVA7QUFDRDtBQUNBLFlBQUssYUFBTDtBQUNDQSxjQUFNSSxJQUFOLEdBQWNKLE1BQU1JLElBQXBCO0FBQ0FKLGNBQU1jLElBQU4sR0FBV0ssVUFBWDtBQUNBLGVBQU9uQixLQUFQO0FBQ0Q7QUFDQTtBQUNDZ0IsZ0JBQVFLLElBQVIsK0JBQXlDckIsTUFBTUksSUFBL0MseUNBQXVGUixlQUFlMEIsT0FBZixDQUF1QjNCLElBQXZCLEVBQTZCTCxJQUE3QixFQUF2RjtBQUNBLGVBQU9VLEtBQVA7QUFiRjtBQWVBLE1BeEJELENBd0JDLE9BQU1pQixLQUFOLEVBQVk7QUFDWkQsY0FBUVEsR0FBUixPQUFnQnhCLE1BQU1JLElBQXRCLGVBQW9DSyxHQUFwQztBQUNBO0FBMUNIO0FBNENBLFVBQU9ULE1BQU1XLE9BQWI7QUFDQSxVQUFPWCxLQUFQO0FBQ0E7Ozs7OztrQkFHYXhCLFkiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXNwcmltYSBmcm9tIFwiZXNwcmltYVwiXHJcbmltcG9ydCBkb2N4NGpzIGZyb20gXCJkb2N4NGpzXCJcclxuaW1wb3J0IHVuZXNjYXBlIGZyb20gXCJsb2Rhc2gudW5lc2NhcGVcIlxyXG4gXHJcbmltcG9ydCBWYXJpYW50SGFuZGxlciBmcm9tIFwiLi92YXJpYW50LWhhbmRsZXJcIlxyXG5cclxuY29uc3QgVkFSSUFOVFM9XCJjb250cm9sLnBpY3R1cmUsY29udHJvbC50ZXh0LGJsb2NrLGlubGluZVwiLnNwbGl0KFwiLFwiKVxyXG5cclxuZXhwb3J0IGNsYXNzIERvY3hUZW1wbGF0ZSBleHRlbmRzIGRvY3g0anN7XHJcblx0LyoqXHJcblx0KiBlbnRyeTogcGFyc2UgdGVtcGxhdGUgYXMgYSB2YXJpYW50IGRvY3VtZW50LCB0aGVuIHlvdSBjYW4gYXNzZW1ibGUgd2l0aCBkYXRhXHJcblx0KiovXHJcblx0c3RhdGljIHBhcnNlKGZpbGUpe1xyXG5cdFx0Y29uc3QgX3BhcnNlPWRvY3g9PntcclxuXHRcdFx0bGV0IGhhbmRsZXI9bmV3IFZhcmlhbnRIYW5kbGVyKGRvY3gpXHJcblx0XHRcdGRvY3gucGFyc2UoaGFuZGxlciwgRG9jeFRlbXBsYXRlLmlkZW50aWZ5KVxyXG5cdFx0XHRyZXR1cm4gaGFuZGxlci52YXJEb2NcclxuICAgICAgICB9XHJcblx0XHRpZihmaWxlIGluc3RhbmNlb2YgZG9jeDRqcylcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShfcGFyc2UoZmlsZSkpXHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmxvYWQoZmlsZSkudGhlbihfcGFyc2UpXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGFzc2VtYmxlKGZpbGUsZGF0YSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2UoZmlsZSlcclxuXHRcdFx0LnRoZW4odmFyRG9jPT52YXJEb2MuYXNzZW1ibGUoZGF0YSkpXHJcbiAgICB9XHJcblxyXG5cdHN0YXRpYyBpc0V4cCh0ZXh0KXtcclxuXHRcdHRleHQ9dGV4dC50cmltKClcclxuXHRcdGxldCBsZW49dGV4dC5sZW5ndGhcclxuXHRcdGlmKGxlbj4zICYmIHRleHRbMF0gPT0gJyQnICYmIHRleHRbMV0gPT0gJ3snICYmIHRleHRbbGVuIC0gMV0gPT0gJ30nKXtcclxuXHRcdFx0dGV4dD10ZXh0LnN1YnN0cmluZygyLHRleHQubGVuZ3RoLTEpLnRyaW0oKVxyXG5cdFx0XHRpZih0ZXh0Lmxlbmd0aClcclxuXHRcdFx0XHRyZXR1cm4gdGV4dFxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgaWRlbnRpZnkobm9kZSwgb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0IHRhZ05hbWU9bm9kZS5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKVxyXG5cdFx0aWYodGFnTmFtZT09XCJzdHlsZXNcIiB8fCB0YWdOYW1lPT1cIm51bWJlcmluZ1wiKVxyXG5cdFx0XHRyZXR1cm4gbnVsbFxyXG5cclxuXHRcdGxldCBtb2RlbD1kb2N4NGpzLk9mZmljZURvY3VtZW50LmlkZW50aWZ5KC4uLmFyZ3VtZW50cylcclxuXHJcblxyXG5cdFx0aWYodHlwZW9mKG1vZGVsKT09XCJzdHJpbmdcIiB8fCBWQVJJQU5UUy5pbmRleE9mKG1vZGVsLnR5cGUpPT0tMSlcclxuXHRcdFx0cmV0dXJuIG1vZGVsXHJcblxyXG5cdFx0bGV0IHNkdFByPW5vZGUuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzpzZHRQclwiKVxyXG5cdFx0aWYoIXNkdFByKVxyXG5cdFx0XHRyZXR1cm4gbW9kZWxcclxuXHJcblx0XHRsZXQgdGFnPXNkdFByLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6dGFnXCIpXHJcblxyXG5cdFx0aWYoIXRhZylcclxuXHRcdFx0cmV0dXJuIG1vZGVsXHJcblxyXG5cdFx0dGFnPXRhZy5hdHRyaWJzW1widzp2YWxcIl1cclxuXHRcdGlmKCF0YWcpXHJcblx0XHRcdHJldHVybiBtb2RlbFxyXG5cclxuXHRcdHRhZz11bmVzY2FwZSh0YWcudHJpbSgpKVxyXG5cclxuXHRcdG1vZGVsLnJhd0NvZGU9dGFnXHJcblx0XHRcclxuXHRcdHN3aXRjaChtb2RlbC50eXBlKXtcclxuXHRcdFx0Y2FzZSBcImNvbnRyb2wucGljdHVyZVwiOlxyXG5cdFx0XHRjYXNlIFwiY29udHJvbC50ZXh0XCI6IFxyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRsZXQgZXhwPURvY3hUZW1wbGF0ZS5pc0V4cCh0YWcpXHJcblx0XHRcdFx0XHRpZighZXhwKVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0bW9kZWwudHlwZT1gJHttb2RlbC50eXBlfS5leHBgXHJcblx0XHRcdFx0XHRtb2RlbC5jb2RlPWVzcHJpbWEucGFyc2UoZXhwKVxyXG5cdFx0XHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHRcdFx0fSBjYXRjaChlKXtcclxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoYFske21vZGVsLnR5cGV9XSAke3RhZ30gXFxyXFxuICR7ZXJyb3IubWVzc2FnZX1gKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0Y2FzZSBcImJsb2NrXCI6XHJcblx0XHRcdGNhc2UgXCJpbmxpbmVcIjpcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0bGV0IHBhcnNlZENvZGU9ZXNwcmltYS5wYXJzZSh0YWcrJ3t9JylcclxuXHRcdFx0XHRcdGlmKHBhcnNlZENvZGUuYm9keS5sZW5ndGg9PTIpLy9mb3IvaWYoKXt9e31cclxuXHRcdFx0XHRcdFx0cGFyc2VkQ29kZS5ib2R5LnBvcCgpXHJcblx0XHRcdFx0XHRlbHNlIGlmKHBhcnNlZENvZGUuYm9keS5sZW5ndGg+MSl7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUud2Fybihgc3ludGF4IGVycm9yLCBpZ25vcmUgYXMgc3RhdGljIGNvbnRlbnQ6IFxcblxcciAke29mZmljZURvY3VtZW50LmNvbnRlbnQobm9kZSkudGV4dCgpfWApXHJcblx0XHRcdFx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0bGV0IFtmaXJzdFN0YXRlbWVudF09cGFyc2VkQ29kZS5ib2R5XHJcblx0XHRcdFx0XHRzd2l0Y2goZmlyc3RTdGF0ZW1lbnQudHlwZSl7XHJcblx0XHRcdFx0XHRcdGNhc2UgJ0ZvclN0YXRlbWVudCc6XHJcblx0XHRcdFx0XHRcdFx0bW9kZWwudHlwZT1gJHttb2RlbC50eXBlfS5mb3JgXHJcblx0XHRcdFx0XHRcdFx0bW9kZWwuY29kZT1wYXJzZWRDb2RlXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRcdGNhc2UgJ0lmU3RhdGVtZW50JzpcclxuXHRcdFx0XHRcdFx0XHRtb2RlbC50eXBlPWAke21vZGVsLnR5cGV9LmlmYFxyXG5cdFx0XHRcdFx0XHRcdG1vZGVsLmNvZGU9cGFyc2VkQ29kZVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUud2FybihgdW5zdXBwb3J0ZWQgc3RhdGVtZW50IGluICR7bW9kZWwudHlwZX0sIGlnbm9yZSBhcyBzdGF0aWMgY29udGVudDogXFxuXFxyICR7b2ZmaWNlRG9jdW1lbnQuY29udGVudChub2RlKS50ZXh0KCl9YClcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9Y2F0Y2goZXJyb3Ipe1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coYFske21vZGVsLnR5cGV9XSB3aXRoICR7dGFnfSwgYnV0IG5vdCB2YXJpYW50YClcclxuXHRcdFx0XHR9XHJcblx0XHR9XHJcblx0XHRkZWxldGUgbW9kZWwucmF3Q29kZVxyXG5cdFx0cmV0dXJuIG1vZGVsXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEb2N4VGVtcGxhdGVcclxuIl19