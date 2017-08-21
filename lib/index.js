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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJlc3ByaW1hIiwicmVxdWlyZSIsIlZBUklBTlRTIiwic3BsaXQiLCJEb2N4VGVtcGxhdGUiLCJmaWxlIiwiX3BhcnNlIiwiaGFuZGxlciIsImRvY3giLCJwYXJzZSIsImlkZW50aWZ5IiwidmFyRG9jIiwibG9hZCIsInRoZW4iLCJkYXRhIiwiYXNzZW1ibGUiLCJ0ZXh0IiwidHJpbSIsImxlbiIsImxlbmd0aCIsInN1YnN0cmluZyIsInR5cGUiLCJub2RlIiwiaXNFeHAiLCJvZmZpY2VEb2N1bWVudCIsImZpbHRlciIsInRhZ05hbWUiLCJuYW1lIiwicG9wIiwiY2hpbGRyZW4iLCJtb2RlbCIsIk9mZmljZURvY3VtZW50IiwiYXJndW1lbnRzIiwiaW5kZXhPZiIsInNkdFByIiwiZmluZCIsImEiLCJ0YWciLCJpc0lubGluZUV4cCIsImNvbnRlbnQiLCJiZWZvcmUiLCJhdHRyaWJzIiwicmF3Q29kZSIsImV4cCIsImNvZGUiLCJlIiwiY29uc29sZSIsImVycm9yIiwibWVzc2FnZSIsInN0YXJ0c1dpdGgiLCJib2R5IiwiZXhwcmVzc2lvbiIsInBhcnNlZENvZGUiLCJ3YXJuIiwiZmlyc3RTdGF0ZW1lbnQiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7QUFKQSxJQUFNQSxVQUFRQyxRQUFRLFNBQVIsQ0FBZDs7O0FBTUEsSUFBTUMsV0FBUyw0Q0FBNENDLEtBQTVDLENBQWtELEdBQWxELENBQWY7O0lBRWFDLFksV0FBQUEsWTs7Ozs7Ozs7Ozs7O0FBQ1o7Ozt3QkFHYUMsSSxFQUFLO0FBQ2pCLE9BQU1DLFNBQU8sU0FBUEEsTUFBTyxPQUFNO0FBQ2xCLFFBQUlDLFVBQVEsNkJBQW1CQyxJQUFuQixDQUFaO0FBQ0FBLFNBQUtDLEtBQUwsQ0FBV0YsT0FBWCxFQUFvQkgsYUFBYU0sUUFBakM7QUFDQSxXQUFPSCxRQUFRSSxNQUFmO0FBQ00sSUFK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N0IsZUFBZWUsT0FBZixDQUF1QmpCLElBQXZCLEVBQTZCTixJQUE3QixFQUE3RDtBQUNBLGNBQU9jLEtBQVA7QUFDQTs7QUFaRSw0Q0Fha0JzQixXQUFXRixJQWI3QjtBQUFBLFVBYUVJLGNBYkY7O0FBY0gsY0FBT0EsZUFBZWpDLElBQXRCO0FBQ0MsWUFBSyxjQUFMO0FBQ0NTLGNBQU1ULElBQU4sR0FBY1MsTUFBTVQsSUFBcEI7QUFDQVMsY0FBTWMsSUFBTixHQUFXUSxVQUFYO0FBQ0EsZUFBT3RCLEtBQVA7QUFDRDtBQUNBLFlBQUssYUFBTDtBQUNDQSxjQUFNVCxJQUFOLEdBQWNTLE1BQU1ULElBQXBCO0FBQ0FTLGNBQU1jLElBQU4sR0FBV1EsVUFBWDtBQUNBLGVBQU90QixLQUFQO0FBQ0Q7QUFDQTtBQUNDZ0IsZ0JBQVFPLElBQVIsK0JBQXlDdkIsTUFBTVQsSUFBL0MseUNBQXVGRyxlQUFlZSxPQUFmLENBQXVCakIsSUFBdkIsRUFBNkJOLElBQTdCLEVBQXZGO0FBQ0EsZUFBT2MsS0FBUDtBQWJGO0FBZUEsTUE3QkQsQ0E2QkMsT0FBTWlCLEtBQU4sRUFBWTtBQUNaLFVBQUczQyxhQUFhbUIsS0FBYixDQUFtQmMsR0FBbkIsQ0FBSCxFQUEyQjtBQUMxQlMsZUFBUU8sSUFBUixDQUFnQmhCLEdBQWhCO0FBQ0EsT0FGRCxNQUVLO0FBQ0pTLGVBQVFTLEdBQVIsT0FBZ0J6QixNQUFNVCxJQUF0QixlQUFvQ2dCLEdBQXBDLGtDQUFvRVUsS0FBcEU7QUFDQTtBQUNEO0FBbkRIO0FBcURBLFVBQU9qQixNQUFNWSxPQUFiO0FBQ0EsVUFBT1osS0FBUDtBQUNBOzs7Ozs7a0JBR2ExQixZIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZXNwcmltYT1yZXF1aXJlKFwiZXNwcmltYVwiKVxyXG5pbXBvcnQgZG9jeDRqcyBmcm9tIFwiZG9jeDRqc1wiXHJcbmltcG9ydCB1bmVzY2FwZSBmcm9tIFwibG9kYXNoLnVuZXNjYXBlXCJcclxuXHJcbmltcG9ydCBWYXJpYW50SGFuZGxlciBmcm9tIFwiLi92YXJpYW50LWhhbmRsZXJcIlxyXG5cclxuY29uc3QgVkFSSUFOVFM9XCJjb250cm9sLnBpY3R1cmUsY29udHJvbC50ZXh0LGJsb2NrLGlubGluZVwiLnNwbGl0KFwiLFwiKVxyXG5cclxuZXhwb3J0IGNsYXNzIERvY3hUZW1wbGF0ZSBleHRlbmRzIGRvY3g0anN7XHJcblx0LyoqXHJcblx0KiBlbnRyeTogcGFyc2UgdGVtcGxhdGUgYXMgYSB2YXJpYW50IGRvY3VtZW50LCB0aGVuIHlvdSBjYW4gYXNzZW1ibGUgd2l0aCBkYXRhXHJcblx0KiovXHJcblx0c3RhdGljIHBhcnNlKGZpbGUpe1xyXG5cdFx0Y29uc3QgX3BhcnNlPWRvY3g9PntcclxuXHRcdFx0bGV0IGhhbmRsZXI9bmV3IFZhcmlhbnRIYW5kbGVyKGRvY3gpXHJcblx0XHRcdGRvY3gucGFyc2UoaGFuZGxlciwgRG9jeFRlbXBsYXRlLmlkZW50aWZ5KVxyXG5cdFx0XHRyZXR1cm4gaGFuZGxlci52YXJEb2NcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmxvYWQoZmlsZSkudGhlbihfcGFyc2UpXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGFzc2VtYmxlKGZpbGUsZGF0YSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2UoZmlsZSlcclxuXHRcdFx0LnRoZW4odmFyRG9jPT52YXJEb2MuYXNzZW1ibGUoZGF0YSkpXHJcbiAgICB9XHJcblxyXG5cdHN0YXRpYyBpc0V4cCh0ZXh0KXtcclxuXHRcdHRleHQ9dGV4dC50cmltKClcclxuXHRcdGxldCBsZW49dGV4dC5sZW5ndGhcclxuXHRcdGlmKGxlbj4zICYmIHRleHRbMF0gPT0gJyQnICYmIHRleHRbMV0gPT0gJ3snICYmIHRleHRbbGVuIC0gMV0gPT0gJ30nKXtcclxuXHRcdFx0dGV4dD10ZXh0LnN1YnN0cmluZygyLHRleHQubGVuZ3RoLTEpLnRyaW0oKVxyXG5cdFx0XHRpZih0ZXh0Lmxlbmd0aClcclxuXHRcdFx0XHRyZXR1cm4gdGV4dFxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlXHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBpc0lubGluZUV4cCh0eXBlLHRleHQsbm9kZSl7XHJcblx0XHRpZih0eXBlPT1cImNvbnRyb2wudGV4dFwiKXtcclxuXHRcdFx0aWYoRG9jeFRlbXBsYXRlLmlzRXhwKHRleHQpKXtcclxuXHRcdFx0XHRyZXR1cm4gdGV4dFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2VcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBpZGVudGlmeShub2RlLCBvZmZpY2VEb2N1bWVudCwgZmlsdGVyPXRydWUpe1xyXG5cdFx0aWYoZmlsdGVyKXtcclxuXHRcdFx0bGV0IHRhZ05hbWU9bm9kZS5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKVxyXG5cdFx0XHRpZih0YWdOYW1lPT1cImRvY3VtZW50XCIpXHJcblx0XHRcdFx0cmV0dXJuIHt0eXBlOlwiZG9jdW1lbnRcIiwgY2hpbGRyZW46IG5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW59XHJcblxyXG5cdFx0XHRpZih0YWdOYW1lPT1cInN0eWxlc1wiIHx8IHRhZ05hbWU9PVwibnVtYmVyaW5nXCIpXHJcblx0XHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgbW9kZWw9ZG9jeDRqcy5PZmZpY2VEb2N1bWVudC5pZGVudGlmeSguLi5hcmd1bWVudHMpXHJcblxyXG5cdFx0aWYoIW1vZGVsIHx8IHR5cGVvZihtb2RlbCk9PVwic3RyaW5nXCIgfHwgVkFSSUFOVFMuaW5kZXhPZihtb2RlbC50eXBlKT09LTEpXHJcblx0XHRcdHJldHVybiBtb2RlbFxyXG5cclxuXHRcdGxldCBzZHRQcj1ub2RlLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6c2R0UHJcIilcclxuXHRcdGlmKCFzZHRQcilcclxuXHRcdFx0cmV0dXJuIG1vZGVsXHJcblxyXG5cdFx0bGV0IHRhZz1zZHRQci5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnRhZ1wiKVxyXG5cclxuXHRcdGlmKCF0YWcpe1xyXG5cdFx0XHRpZih0YWc9RG9jeFRlbXBsYXRlLmlzSW5saW5lRXhwKG1vZGVsLnR5cGUsIG9mZmljZURvY3VtZW50LmNvbnRlbnQobm9kZSkudGV4dCgpLnRyaW0oKSkpe1xyXG5cdFx0XHRcdG9mZmljZURvY3VtZW50LmNvbnRlbnQobm9kZSlcclxuXHRcdFx0XHRcdC5maW5kKCd3XFxcXDppZCcpXHJcblx0XHRcdFx0XHQuYmVmb3JlKGA8dzp0YWcgdzp2YWw9XCIke3RhZ31cIi8+YClcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHRcdH1cclxuXHRcdH1lbHNle1xyXG5cdFx0XHR0YWc9dGFnLmF0dHJpYnNbXCJ3OnZhbFwiXVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZighdGFnKXtcclxuXHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHR9XHJcblxyXG5cdFx0dGFnPXVuZXNjYXBlKHRhZy50cmltKCkpXHJcblxyXG5cdFx0bW9kZWwucmF3Q29kZT10YWdcclxuXHJcblx0XHRzd2l0Y2gobW9kZWwudHlwZSl7XHJcblx0XHRcdGNhc2UgXCJjb250cm9sLnBpY3R1cmVcIjpcclxuXHRcdFx0Y2FzZSBcImNvbnRyb2wudGV4dFwiOlxyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRsZXQgZXhwPURvY3hUZW1wbGF0ZS5pc0V4cCh0YWcpXHJcblx0XHRcdFx0XHRpZighZXhwKVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxcclxuXHJcblx0XHRcdFx0XHRtb2RlbC50eXBlPWAke21vZGVsLnR5cGV9LmV4cGBcclxuXHRcdFx0XHRcdG1vZGVsLmNvZGU9ZXNwcmltYS5wYXJzZShleHApXHJcblx0XHRcdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdFx0XHR9IGNhdGNoKGUpe1xyXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihgWyR7bW9kZWwudHlwZX1dICR7dGFnfSBcXHJcXG4gJHtlcnJvci5tZXNzYWdlfWApXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRjYXNlIFwiYmxvY2tcIjpcclxuXHRcdFx0Y2FzZSBcImlubGluZVwiOlxyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRpZih0YWcuc3RhcnRzV2l0aChcInN1YmRvYyhcIikpe1xyXG5cdFx0XHRcdFx0XHRtb2RlbC50eXBlPWAke21vZGVsLnR5cGV9LnN1YmRvY2BcclxuXHRcdFx0XHRcdFx0bW9kZWwuY29kZT1lc3ByaW1hLnBhcnNlKHRhZykuYm9keVswXS5leHByZXNzaW9uLmFyZ3VtZW50c1swXVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGxldCBwYXJzZWRDb2RlPWVzcHJpbWEucGFyc2UodGFnKyd7fScpXHJcblx0XHRcdFx0XHRpZihwYXJzZWRDb2RlLmJvZHkubGVuZ3RoPT0yKS8vZm9yL2lmKCl7fXt9XHJcblx0XHRcdFx0XHRcdHBhcnNlZENvZGUuYm9keS5wb3AoKVxyXG5cdFx0XHRcdFx0ZWxzZSBpZihwYXJzZWRDb2RlLmJvZHkubGVuZ3RoPjEpe1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oYHN5bnRheCBlcnJvciwgaWdub3JlIGFzIHN0YXRpYyBjb250ZW50OiBcXG5cXHIgJHtvZmZpY2VEb2N1bWVudC5jb250ZW50KG5vZGUpLnRleHQoKX1gKVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGxldCBbZmlyc3RTdGF0ZW1lbnRdPXBhcnNlZENvZGUuYm9keVxyXG5cdFx0XHRcdFx0c3dpdGNoKGZpcnN0U3RhdGVtZW50LnR5cGUpe1xyXG5cdFx0XHRcdFx0XHRjYXNlICdGb3JTdGF0ZW1lbnQnOlxyXG5cdFx0XHRcdFx0XHRcdG1vZGVsLnR5cGU9YCR7bW9kZWwudHlwZX0uZm9yYFxyXG5cdFx0XHRcdFx0XHRcdG1vZGVsLmNvZGU9cGFyc2VkQ29kZVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0XHRjYXNlICdJZlN0YXRlbWVudCc6XHJcblx0XHRcdFx0XHRcdFx0bW9kZWwudHlwZT1gJHttb2RlbC50eXBlfS5pZmBcclxuXHRcdFx0XHRcdFx0XHRtb2RlbC5jb2RlPXBhcnNlZENvZGVcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oYHVuc3VwcG9ydGVkIHN0YXRlbWVudCBpbiAke21vZGVsLnR5cGV9LCBpZ25vcmUgYXMgc3RhdGljIGNvbnRlbnQ6IFxcblxcciAke29mZmljZURvY3VtZW50LmNvbnRlbnQobm9kZSkudGV4dCgpfWApXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fWNhdGNoKGVycm9yKXtcclxuXHRcdFx0XHRcdGlmKERvY3hUZW1wbGF0ZS5pc0V4cCh0YWcpKXtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKGAke3RhZ306IHBsZWFzZSB1c2UgcGxhaW4gdGV4dCBjb250cm9sIGZvciBleHByZXNzaW9uYClcclxuXHRcdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhgWyR7bW9kZWwudHlwZX1dIHdpdGggJHt0YWd9LCBidXQgbm90IHZhcmlhbnQgYmVjYXVzZSAke2Vycm9yfWApXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZGVsZXRlIG1vZGVsLnJhd0NvZGVcclxuXHRcdHJldHVybiBtb2RlbFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRG9jeFRlbXBsYXRlXHJcbiJdfQ==