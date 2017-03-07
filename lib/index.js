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
			if (tagName == "document") return { type: "document", children: node.children[0].children };

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJWQVJJQU5UUyIsInNwbGl0IiwiRG9jeFRlbXBsYXRlIiwiZmlsZSIsIl9wYXJzZSIsImhhbmRsZXIiLCJkb2N4IiwicGFyc2UiLCJpZGVudGlmeSIsInZhckRvYyIsIlByb21pc2UiLCJyZXNvbHZlIiwibG9hZCIsInRoZW4iLCJkYXRhIiwiYXNzZW1ibGUiLCJ0ZXh0IiwidHJpbSIsImxlbiIsImxlbmd0aCIsInN1YnN0cmluZyIsIm5vZGUiLCJvZmZpY2VEb2N1bWVudCIsInRhZ05hbWUiLCJuYW1lIiwicG9wIiwidHlwZSIsImNoaWxkcmVuIiwibW9kZWwiLCJPZmZpY2VEb2N1bWVudCIsImFyZ3VtZW50cyIsImluZGV4T2YiLCJzZHRQciIsImZpbmQiLCJhIiwidGFnIiwiYXR0cmlicyIsInJhd0NvZGUiLCJleHAiLCJpc0V4cCIsImNvZGUiLCJlIiwiY29uc29sZSIsImVycm9yIiwibWVzc2FnZSIsInBhcnNlZENvZGUiLCJib2R5Iiwid2FybiIsImNvbnRlbnQiLCJmaXJzdFN0YXRlbWVudCIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsV0FBUyw0Q0FBNENDLEtBQTVDLENBQWtELEdBQWxELENBQWY7O0lBRWFDLFksV0FBQUEsWTs7Ozs7Ozs7Ozs7O0FBQ1o7Ozt3QkFHYUMsSSxFQUFLO0FBQ2pCLE9BQU1DLFNBQU8sU0FBUEEsTUFBTyxPQUFNO0FBQ2xCLFFBQUlDLFVBQVEsNkJBQW1CQyxJQUFuQixDQUFaO0FBQ0FBLFNBQUtDLEtBQUwsQ0FBV0YsT0FBWCxFQUFvQkgsYUFBYU0sUUFBakM7QUFDQSxXQUFPSCxRQUFRSSxNQUFmO0FBQ00sSUFKUDtBQUtBLE9BQUdOLGlDQUFILEVBQ0MsT0FBT08sUUFBUUMsT0FBUixDQUFnQlAsT0FBT0QsSUFBUCxDQUFoQixDQUFQOztBQUVLLFVBQU8sS0FB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QWY7QUFDQSxVQUFHVSxXQUFXQyxJQUFYLENBQWdCM0IsTUFBaEIsSUFBd0IsQ0FBM0IsRUFBNkI7QUFDNUIwQixrQkFBV0MsSUFBWCxDQUFnQnJCLEdBQWhCLEdBREQsS0FFSyxJQUFHb0IsV0FBV0MsSUFBWCxDQUFnQjNCLE1BQWhCLEdBQXVCLENBQTFCLEVBQTRCO0FBQ2hDdUIsZUFBUUssSUFBUixtREFBNkR6QixlQUFlMEIsT0FBZixDQUF1QjNCLElBQXZCLEVBQTZCTCxJQUE3QixFQUE3RDtBQUNBLGNBQU9ZLEtBQVA7QUFDQTs7QUFQRSw0Q0FRa0JpQixXQUFXQyxJQVI3QjtBQUFBLFVBUUVHLGNBUkY7O0FBU0gsY0FBT0EsZUFBZXZCLElBQXRCO0FBQ0MsWUFBSyxjQUFMO0FBQ0NFLGNBQU1GLElBQU4sR0FBY0UsTUFBTUYsSUFBcEI7QUFDQUUsY0FBTVksSUFBTixHQUFXSyxVQUFYO0FBQ0EsZUFBT2pCLEtBQVA7QUFDRDtBQUNBLFlBQUssYUFBTDtBQUNDQSxjQUFNRixJQUFOLEdBQWNFLE1BQU1GLElBQXBCO0FBQ0FFLGNBQU1ZLElBQU4sR0FBV0ssVUFBWDtBQUNBLGVBQU9qQixLQUFQO0FBQ0Q7QUFDQTtBQUNDYyxnQkFBUUssSUFBUiwrQkFBeUNuQixNQUFNRixJQUEvQyx5Q0FBdUZKLGVBQWUwQixPQUFmLENBQXVCM0IsSUFBdkIsRUFBNkJMLElBQTdCLEVBQXZGO0FBQ0EsZUFBT1ksS0FBUDtBQWJGO0FBZUEsTUF4QkQsQ0F3QkMsT0FBTWUsS0FBTixFQUFZO0FBQ1pELGNBQVFRLEdBQVIsT0FBZ0J0QixNQUFNRixJQUF0QixlQUFvQ1MsR0FBcEM7QUFDQTtBQTFDSDtBQTRDQSxVQUFPUCxNQUFNUyxPQUFiO0FBQ0EsVUFBT1QsS0FBUDtBQUNBOzs7Ozs7a0JBR2ExQixZIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGVzcHJpbWEgZnJvbSBcImVzcHJpbWFcIlxyXG5pbXBvcnQgZG9jeDRqcyBmcm9tIFwiZG9jeDRqc1wiXHJcbmltcG9ydCB1bmVzY2FwZSBmcm9tIFwibG9kYXNoLnVuZXNjYXBlXCJcclxuIFxyXG5pbXBvcnQgVmFyaWFudEhhbmRsZXIgZnJvbSBcIi4vdmFyaWFudC1oYW5kbGVyXCJcclxuXHJcbmNvbnN0IFZBUklBTlRTPVwiY29udHJvbC5waWN0dXJlLGNvbnRyb2wudGV4dCxibG9jayxpbmxpbmVcIi5zcGxpdChcIixcIilcclxuXHJcbmV4cG9ydCBjbGFzcyBEb2N4VGVtcGxhdGUgZXh0ZW5kcyBkb2N4NGpze1xyXG5cdC8qKlxyXG5cdCogZW50cnk6IHBhcnNlIHRlbXBsYXRlIGFzIGEgdmFyaWFudCBkb2N1bWVudCwgdGhlbiB5b3UgY2FuIGFzc2VtYmxlIHdpdGggZGF0YVxyXG5cdCoqL1xyXG5cdHN0YXRpYyBwYXJzZShmaWxlKXtcclxuXHRcdGNvbnN0IF9wYXJzZT1kb2N4PT57XHJcblx0XHRcdGxldCBoYW5kbGVyPW5ldyBWYXJpYW50SGFuZGxlcihkb2N4KVxyXG5cdFx0XHRkb2N4LnBhcnNlKGhhbmRsZXIsIERvY3hUZW1wbGF0ZS5pZGVudGlmeSlcclxuXHRcdFx0cmV0dXJuIGhhbmRsZXIudmFyRG9jXHJcbiAgICAgICAgfVxyXG5cdFx0aWYoZmlsZSBpbnN0YW5jZW9mIGRvY3g0anMpXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoX3BhcnNlKGZpbGUpKVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkKGZpbGUpLnRoZW4oX3BhcnNlKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBhc3NlbWJsZShmaWxlLGRhdGEpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlKGZpbGUpXHJcblx0XHRcdC50aGVuKHZhckRvYz0+dmFyRG9jLmFzc2VtYmxlKGRhdGEpKVxyXG4gICAgfVxyXG5cclxuXHRzdGF0aWMgaXNFeHAodGV4dCl7XHJcblx0XHR0ZXh0PXRleHQudHJpbSgpXHJcblx0XHRsZXQgbGVuPXRleHQubGVuZ3RoXHJcblx0XHRpZihsZW4+MyAmJiB0ZXh0WzBdID09ICckJyAmJiB0ZXh0WzFdID09ICd7JyAmJiB0ZXh0W2xlbiAtIDFdID09ICd9Jyl7XHJcblx0XHRcdHRleHQ9dGV4dC5zdWJzdHJpbmcoMix0ZXh0Lmxlbmd0aC0xKS50cmltKClcclxuXHRcdFx0aWYodGV4dC5sZW5ndGgpXHJcblx0XHRcdFx0cmV0dXJuIHRleHRcclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGlkZW50aWZ5KG5vZGUsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCB0YWdOYW1lPW5vZGUubmFtZS5zcGxpdChcIjpcIikucG9wKClcclxuXHRcdGlmKHRhZ05hbWU9PVwiZG9jdW1lbnRcIilcclxuXHRcdFx0cmV0dXJuIHt0eXBlOlwiZG9jdW1lbnRcIiwgY2hpbGRyZW46IG5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW59XHJcblxyXG5cdFx0aWYodGFnTmFtZT09XCJzdHlsZXNcIiB8fCB0YWdOYW1lPT1cIm51bWJlcmluZ1wiKVxyXG5cdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0XHJcblx0XHRsZXQgbW9kZWw9ZG9jeDRqcy5PZmZpY2VEb2N1bWVudC5pZGVudGlmeSguLi5hcmd1bWVudHMpXHJcblxyXG5cclxuXHRcdGlmKHR5cGVvZihtb2RlbCk9PVwic3RyaW5nXCIgfHwgVkFSSUFOVFMuaW5kZXhPZihtb2RlbC50eXBlKT09LTEpXHJcblx0XHRcdHJldHVybiBtb2RlbFxyXG5cclxuXHRcdGxldCBzZHRQcj1ub2RlLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6c2R0UHJcIilcclxuXHRcdGlmKCFzZHRQcilcclxuXHRcdFx0cmV0dXJuIG1vZGVsXHJcblxyXG5cdFx0bGV0IHRhZz1zZHRQci5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnRhZ1wiKVxyXG5cclxuXHRcdGlmKCF0YWcpXHJcblx0XHRcdHJldHVybiBtb2RlbFxyXG5cclxuXHRcdHRhZz10YWcuYXR0cmlic1tcInc6dmFsXCJdXHJcblx0XHRpZighdGFnKVxyXG5cdFx0XHRyZXR1cm4gbW9kZWxcclxuXHJcblx0XHR0YWc9dW5lc2NhcGUodGFnLnRyaW0oKSlcclxuXHJcblx0XHRtb2RlbC5yYXdDb2RlPXRhZ1xyXG5cdFx0XHJcblx0XHRzd2l0Y2gobW9kZWwudHlwZSl7XHJcblx0XHRcdGNhc2UgXCJjb250cm9sLnBpY3R1cmVcIjpcclxuXHRcdFx0Y2FzZSBcImNvbnRyb2wudGV4dFwiOiBcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0bGV0IGV4cD1Eb2N4VGVtcGxhdGUuaXNFeHAodGFnKVxyXG5cdFx0XHRcdFx0aWYoIWV4cClcclxuXHRcdFx0XHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdG1vZGVsLnR5cGU9YCR7bW9kZWwudHlwZX0uZXhwYFxyXG5cdFx0XHRcdFx0bW9kZWwuY29kZT1lc3ByaW1hLnBhcnNlKGV4cClcclxuXHRcdFx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0XHRcdH0gY2F0Y2goZSl7XHJcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGBbJHttb2RlbC50eXBlfV0gJHt0YWd9IFxcclxcbiAke2Vycm9yLm1lc3NhZ2V9YClcclxuXHRcdFx0XHR9XHJcblx0XHRcdGNhc2UgXCJibG9ja1wiOlxyXG5cdFx0XHRjYXNlIFwiaW5saW5lXCI6XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdGxldCBwYXJzZWRDb2RlPWVzcHJpbWEucGFyc2UodGFnKyd7fScpXHJcblx0XHRcdFx0XHRpZihwYXJzZWRDb2RlLmJvZHkubGVuZ3RoPT0yKS8vZm9yL2lmKCl7fXt9XHJcblx0XHRcdFx0XHRcdHBhcnNlZENvZGUuYm9keS5wb3AoKVxyXG5cdFx0XHRcdFx0ZWxzZSBpZihwYXJzZWRDb2RlLmJvZHkubGVuZ3RoPjEpe1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oYHN5bnRheCBlcnJvciwgaWdub3JlIGFzIHN0YXRpYyBjb250ZW50OiBcXG5cXHIgJHtvZmZpY2VEb2N1bWVudC5jb250ZW50KG5vZGUpLnRleHQoKX1gKVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGxldCBbZmlyc3RTdGF0ZW1lbnRdPXBhcnNlZENvZGUuYm9keVxyXG5cdFx0XHRcdFx0c3dpdGNoKGZpcnN0U3RhdGVtZW50LnR5cGUpe1xyXG5cdFx0XHRcdFx0XHRjYXNlICdGb3JTdGF0ZW1lbnQnOlxyXG5cdFx0XHRcdFx0XHRcdG1vZGVsLnR5cGU9YCR7bW9kZWwudHlwZX0uZm9yYFxyXG5cdFx0XHRcdFx0XHRcdG1vZGVsLmNvZGU9cGFyc2VkQ29kZVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0XHRjYXNlICdJZlN0YXRlbWVudCc6XHJcblx0XHRcdFx0XHRcdFx0bW9kZWwudHlwZT1gJHttb2RlbC50eXBlfS5pZmBcclxuXHRcdFx0XHRcdFx0XHRtb2RlbC5jb2RlPXBhcnNlZENvZGVcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oYHVuc3VwcG9ydGVkIHN0YXRlbWVudCBpbiAke21vZGVsLnR5cGV9LCBpZ25vcmUgYXMgc3RhdGljIGNvbnRlbnQ6IFxcblxcciAke29mZmljZURvY3VtZW50LmNvbnRlbnQobm9kZSkudGV4dCgpfWApXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fWNhdGNoKGVycm9yKXtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGBbJHttb2RlbC50eXBlfV0gd2l0aCAke3RhZ30sIGJ1dCBub3QgdmFyaWFudGApXHJcblx0XHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZGVsZXRlIG1vZGVsLnJhd0NvZGVcclxuXHRcdHJldHVybiBtb2RlbFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRG9jeFRlbXBsYXRlXHJcbiJdfQ==