"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DocxTemplate = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _esprima = require("esprima");

var esprima = _interopRequireWildcard(_esprima);

var _docx4js2 = require("docx4js");

var _docx4js3 = _interopRequireDefault(_docx4js2);

var _lodash = require("lodash.unescape");

var _lodash2 = _interopRequireDefault(_lodash);

var _variantHandler = require("./variant-handler");

var _variantHandler2 = _interopRequireDefault(_variantHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
		value: function assemble(file, data, opt) {
			return this.parse(file).then(function (varDoc) {
				return varDoc.assemble(data, opt);
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

						model.code = esprima.parse(exp);
						model.type = model.type + ".exp";
						if (filter) {
							model.children = null;
						}
						return model;
					} catch (e) {
						console.error("[" + model.type + "] " + tag + " \r\n " + error.message);
					}
				case "block":
				case "inline":
					try {
						if (tag.startsWith("include(")) {
							var code = esprima.parse(tag).body[0].expression.arguments[0];
							if (!code) {
								var ole = officeDocument.content(node).find("w\\:object").get(0);
								if (ole) {
									var _ole = ole = _docx4js3.default.OfficeDocument.identify(ole, officeDocument),
									    data = _ole.data,
									    embed = _ole.embed,
									    prog = _ole.prog;

									if (prog.startsWith("Word.Document.") && embed) {
										model.code = data;
										model.type = model.type + ".embed.subdoc";
										if (filter) {
											model.children = null;
										}
										return model;
									}
								}
								throw new Error("tag like include(), but it's not");
							}
							model.code = code;
							model.type = model.type + ".subdoc";
							if (filter) {
								model.children = null;
							}
							return model;
						}
						if (tag.startsWith("script(")) {
							var _ole2 = officeDocument.content(node).find("w\\:object").get(0);
							if (_ole2) {
								var _docx4js$OfficeDocume2 = _docx4js3.default.OfficeDocument.identify(_ole2, officeDocument),
								    _code = _docx4js$OfficeDocume2.data;

								model.code = esprima.parse(_code || "");
								model.type = model.type + ".script";
								if (filter) {
									model.children = null;
								}
								return model;
							}
							throw new Error("tag like script(), but it's not");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJlc3ByaW1hIiwiVkFSSUFOVFMiLCJzcGxpdCIsIkRvY3hUZW1wbGF0ZSIsImZpbGUiLCJfcGFyc2UiLCJoYW5kbGVyIiwiZG9jeCIsInBhcnNlIiwiaWRlbnRpZnkiLCJ2YXJEb2MiLCJsb2FkIiwidGhlbiIsImRhdGEiLCJvcHQiLCJhc3NlbWJsZSIsInRleHQiLCJ0cmltIiwibGVuIiwibGVuZ3RoIiwic3Vic3RyaW5nIiwidHlwZSIsIm5vZGUiLCJpc0V4cCIsIm9mZmljZURvY3VtZW50IiwiZmlsdGVyIiwidGFnTmFtZSIsIm5hbWUiLCJwb3AiLCJjaGlsZHJlbiIsIm1vZGVsIiwiT2ZmaWNlRG9jdW1lbnQiLCJhcmd1bWVudHMiLCJpbmRleE9mIiwic2R0UHIiLCJmaW5kIiwiYSIsInRhZyIsImlzSW5saW5lRXhwIiwiY29udGVudCIsImJlZm9yZSIsImF0dHJpYnMiLCJyYXdDb2RlIiwiZXhwIiwiY29kZSIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJtZXNzYWdlIiwic3RhcnRzV2l0aCIsImJvZHkiLCJleHByZXNzaW9uIiwib2xlIiwiZ2V0IiwiZW1iZWQiLCJwcm9nIiwiRXJyb3IiLCJwYXJzZWRDb2RlIiwid2FybiIsImZpcnN0U3RhdGVtZW50IiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOztJQUFZQSxPOztBQUNaOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQyxXQUFTLDRDQUE0Q0MsS0FBNUMsQ0FBa0QsR0FBbEQsQ0FBZjs7SUFJYUMsWSxXQUFBQSxZOzs7Ozs7Ozs7Ozs7QUFDWjs7O3dCQUdhQyxJLEVBQUs7QUFDakIsT0FBTUMsU0FBTyxTQUFQQSxNQUFPLE9BQU07QUFDbEIsUUFBSUMsVUFBUSw2QkFBbUJDLElBQW5CLENBQVo7QUFDQUEsU0FBS0MsS0FBTCxDQUFXRixPQUFYLEVBQW9CSCxhQUFhTSxRQUFqQztBQUNBLFdBQU9ILFFBQVFJ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LE9BQWdCOUIsTUFBTVQsSUFBdEIsZUFBb0NnQixHQUFwQyxrQ0FBb0VVLEtBQXBFO0FBQ0E7QUFDRDtBQXRGSDtBQXdGQSxVQUFPakIsTUFBTVksT0FBYjtBQUNBLFVBQU9aLEtBQVA7QUFDQTs7Ozs7O2tCQUdhM0IsWSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGVzcHJpbWEgZnJvbSBcImVzcHJpbWFcIlxyXG5pbXBvcnQgZG9jeDRqcyBmcm9tIFwiZG9jeDRqc1wiXHJcbmltcG9ydCB1bmVzY2FwZSBmcm9tIFwibG9kYXNoLnVuZXNjYXBlXCJcclxuXHJcbmltcG9ydCBWYXJpYW50SGFuZGxlciBmcm9tIFwiLi92YXJpYW50LWhhbmRsZXJcIlxyXG5cclxuY29uc3QgVkFSSUFOVFM9XCJjb250cm9sLnBpY3R1cmUsY29udHJvbC50ZXh0LGJsb2NrLGlubGluZVwiLnNwbGl0KFwiLFwiKVxyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgRG9jeFRlbXBsYXRlIGV4dGVuZHMgZG9jeDRqc3tcclxuXHQvKipcclxuXHQqIGVudHJ5OiBwYXJzZSB0ZW1wbGF0ZSBhcyBhIHZhcmlhbnQgZG9jdW1lbnQsIHRoZW4geW91IGNhbiBhc3NlbWJsZSB3aXRoIGRhdGFcclxuXHQqKi9cclxuXHRzdGF0aWMgcGFyc2UoZmlsZSl7XHJcblx0XHRjb25zdCBfcGFyc2U9ZG9jeD0+e1xyXG5cdFx0XHRsZXQgaGFuZGxlcj1uZXcgVmFyaWFudEhhbmRsZXIoZG9jeClcclxuXHRcdFx0ZG9jeC5wYXJzZShoYW5kbGVyLCBEb2N4VGVtcGxhdGUuaWRlbnRpZnkpXHJcblx0XHRcdHJldHVybiBoYW5kbGVyLnZhckRvY1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZChmaWxlKS50aGVuKF9wYXJzZSlcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYXNzZW1ibGUoZmlsZSxkYXRhLCBvcHQpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlKGZpbGUpXHJcblx0XHRcdC50aGVuKHZhckRvYz0+dmFyRG9jLmFzc2VtYmxlKGRhdGEsIG9wdCkpXHJcbiAgICB9XHJcblxyXG5cdHN0YXRpYyBpc0V4cCh0ZXh0KXtcclxuXHRcdHRleHQ9dGV4dC50cmltKClcclxuXHRcdGxldCBsZW49dGV4dC5sZW5ndGhcclxuXHRcdGlmKGxlbj4zICYmIHRleHRbMF0gPT0gJyQnICYmIHRleHRbMV0gPT0gJ3snICYmIHRleHRbbGVuIC0gMV0gPT0gJ30nKXtcclxuXHRcdFx0dGV4dD10ZXh0LnN1YnN0cmluZygyLHRleHQubGVuZ3RoLTEpLnRyaW0oKVxyXG5cdFx0XHRpZih0ZXh0Lmxlbmd0aClcclxuXHRcdFx0XHRyZXR1cm4gdGV4dFxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlXHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBpc0lubGluZUV4cCh0eXBlLHRleHQsbm9kZSl7XHJcblx0XHRpZih0eXBlPT1cImNvbnRyb2wudGV4dFwiKXtcclxuXHRcdFx0aWYoRG9jeFRlbXBsYXRlLmlzRXhwKHRleHQpKXtcclxuXHRcdFx0XHRyZXR1cm4gdGV4dFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2VcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBpZGVudGlmeShub2RlLCBvZmZpY2VEb2N1bWVudCwgZmlsdGVyPXRydWUpe1xyXG5cdFx0aWYoZmlsdGVyKXtcclxuXHRcdFx0bGV0IHRhZ05hbWU9bm9kZS5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKVxyXG5cdFx0XHRpZih0YWdOYW1lPT1cImRvY3VtZW50XCIpXHJcblx0XHRcdFx0cmV0dXJuIHt0eXBlOlwiZG9jdW1lbnRcIiwgY2hpbGRyZW46IG5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW59XHJcblxyXG5cdFx0XHRpZih0YWdOYW1lPT1cInN0eWxlc1wiIHx8IHRhZ05hbWU9PVwibnVtYmVyaW5nXCIpXHJcblx0XHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgbW9kZWw9ZG9jeDRqcy5PZmZpY2VEb2N1bWVudC5pZGVudGlmeSguLi5hcmd1bWVudHMpXHJcblxyXG5cdFx0aWYoIW1vZGVsIHx8IHR5cGVvZihtb2RlbCk9PVwic3RyaW5nXCIgfHwgVkFSSUFOVFMuaW5kZXhPZihtb2RlbC50eXBlKT09LTEpXHJcblx0XHRcdHJldHVybiBtb2RlbFxyXG5cclxuXHRcdGxldCBzZHRQcj1ub2RlLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6c2R0UHJcIilcclxuXHRcdGlmKCFzZHRQcilcclxuXHRcdFx0cmV0dXJuIG1vZGVsXHJcblxyXG5cdFx0bGV0IHRhZz1zZHRQci5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnRhZ1wiKVxyXG5cclxuXHRcdGlmKCF0YWcpe1xyXG5cdFx0XHRpZih0YWc9RG9jeFRlbXBsYXRlLmlzSW5saW5lRXhwKG1vZGVsLnR5cGUsIG9mZmljZURvY3VtZW50LmNvbnRlbnQobm9kZSkudGV4dCgpLnRyaW0oKSkpe1xyXG5cdFx0XHRcdG9mZmljZURvY3VtZW50LmNvbnRlbnQobm9kZSlcclxuXHRcdFx0XHRcdC5maW5kKCd3XFxcXDppZCcpXHJcblx0XHRcdFx0XHQuYmVmb3JlKGA8dzp0YWcgdzp2YWw9XCIke3RhZ31cIi8+YClcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHRcdH1cclxuXHRcdH1lbHNle1xyXG5cdFx0XHR0YWc9dGFnLmF0dHJpYnNbXCJ3OnZhbFwiXVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZighdGFnKXtcclxuXHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHR9XHJcblxyXG5cdFx0dGFnPXVuZXNjYXBlKHRhZy50cmltKCkpXHJcblxyXG5cdFx0bW9kZWwucmF3Q29kZT10YWdcclxuXHJcblx0XHRzd2l0Y2gobW9kZWwudHlwZSl7XHJcblx0XHRcdGNhc2UgXCJjb250cm9sLnBpY3R1cmVcIjpcclxuXHRcdFx0Y2FzZSBcImNvbnRyb2wudGV4dFwiOlxyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRsZXQgZXhwPURvY3hUZW1wbGF0ZS5pc0V4cCh0YWcpXHJcblx0XHRcdFx0XHRpZighZXhwKVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxcclxuXHJcblx0XHRcdFx0XHRtb2RlbC5jb2RlPWVzcHJpbWEucGFyc2UoZXhwKVxyXG5cdFx0XHRcdFx0bW9kZWwudHlwZT1gJHttb2RlbC50eXBlfS5leHBgXHJcblx0XHRcdFx0XHRpZihmaWx0ZXIpe1xyXG5cdFx0XHRcdFx0XHRtb2RlbC5jaGlsZHJlbj1udWxsXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdFx0XHR9IGNhdGNoKGUpe1xyXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihgWyR7bW9kZWwudHlwZX1dICR7dGFnfSBcXHJcXG4gJHtlcnJvci5tZXNzYWdlfWApXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRjYXNlIFwiYmxvY2tcIjpcclxuXHRcdFx0Y2FzZSBcImlubGluZVwiOlxyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRpZih0YWcuc3RhcnRzV2l0aChcImluY2x1ZGUoXCIpKXtcclxuXHRcdFx0XHRcdFx0bGV0IGNvZGU9ZXNwcmltYS5wYXJzZSh0YWcpLmJvZHlbMF0uZXhwcmVzc2lvbi5hcmd1bWVudHNbMF1cclxuXHRcdFx0XHRcdFx0aWYoIWNvZGUpe1xyXG5cdFx0XHRcdFx0XHRcdGxldCBvbGU9b2ZmaWNlRG9jdW1lbnQuY29udGVudChub2RlKS5maW5kKFwid1xcXFw6b2JqZWN0XCIpLmdldCgwKVxyXG5cdFx0XHRcdFx0XHRcdGlmKG9sZSl7XHJcblx0XHRcdFx0XHRcdFx0XHRsZXQge2RhdGEsZW1iZWQscHJvZ309b2xlPWRvY3g0anMuT2ZmaWNlRG9jdW1lbnQuaWRlbnRpZnkob2xlLG9mZmljZURvY3VtZW50KVxyXG5cdFx0XHRcdFx0XHRcdFx0aWYocHJvZy5zdGFydHNXaXRoKFwiV29yZC5Eb2N1bWVudC5cIikgJiYgZW1iZWQpe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRtb2RlbC5jb2RlPWRhdGFcclxuXHRcdFx0XHRcdFx0XHRcdFx0bW9kZWwudHlwZT1gJHttb2RlbC50eXBlfS5lbWJlZC5zdWJkb2NgXHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmKGZpbHRlcil7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kZWwuY2hpbGRyZW49bnVsbFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ0YWcgbGlrZSBpbmNsdWRlKCksIGJ1dCBpdCdzIG5vdFwiKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdG1vZGVsLmNvZGU9Y29kZVxyXG5cdFx0XHRcdFx0XHRtb2RlbC50eXBlPWAke21vZGVsLnR5cGV9LnN1YmRvY2BcclxuXHRcdFx0XHRcdFx0aWYoZmlsdGVyKXtcclxuXHRcdFx0XHRcdFx0XHRtb2RlbC5jaGlsZHJlbj1udWxsXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZih0YWcuc3RhcnRzV2l0aChcInNjcmlwdChcIikpe1xyXG5cdFx0XHRcdFx0XHRsZXQgb2xlPW9mZmljZURvY3VtZW50LmNvbnRlbnQobm9kZSkuZmluZChcIndcXFxcOm9iamVjdFwiKS5nZXQoMClcclxuXHRcdFx0XHRcdFx0aWYob2xlKXtcclxuXHRcdFx0XHRcdFx0XHRsZXQge2RhdGE6Y29kZX09ZG9jeDRqcy5PZmZpY2VEb2N1bWVudC5pZGVudGlmeShvbGUsb2ZmaWNlRG9jdW1lbnQpXHJcblx0XHRcdFx0XHRcdFx0bW9kZWwuY29kZT1lc3ByaW1hLnBhcnNlKGNvZGV8fFwiXCIpXHJcblx0XHRcdFx0XHRcdFx0bW9kZWwudHlwZT1gJHttb2RlbC50eXBlfS5zY3JpcHRgXHJcblx0XHRcdFx0XHRcdFx0aWYoZmlsdGVyKXtcclxuXHRcdFx0XHRcdFx0XHRcdG1vZGVsLmNoaWxkcmVuPW51bGxcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwidGFnIGxpa2Ugc2NyaXB0KCksIGJ1dCBpdCdzIG5vdFwiKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0bGV0IHBhcnNlZENvZGU9ZXNwcmltYS5wYXJzZSh0YWcrJ3t9JylcclxuXHRcdFx0XHRcdGlmKHBhcnNlZENvZGUuYm9keS5sZW5ndGg9PTIpLy9mb3IvaWYoKXt9e31cclxuXHRcdFx0XHRcdFx0cGFyc2VkQ29kZS5ib2R5LnBvcCgpXHJcblx0XHRcdFx0XHRlbHNlIGlmKHBhcnNlZENvZGUuYm9keS5sZW5ndGg+MSl7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUud2Fybihgc3ludGF4IGVycm9yLCBpZ25vcmUgYXMgc3RhdGljIGNvbnRlbnQ6IFxcblxcciAke29mZmljZURvY3VtZW50LmNvbnRlbnQobm9kZSkudGV4dCgpfWApXHJcblx0XHRcdFx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0bGV0IFtmaXJzdFN0YXRlbWVudF09cGFyc2VkQ29kZS5ib2R5XHJcblx0XHRcdFx0XHRzd2l0Y2goZmlyc3RTdGF0ZW1lbnQudHlwZSl7XHJcblx0XHRcdFx0XHRcdGNhc2UgJ0ZvclN0YXRlbWVudCc6XHJcblx0XHRcdFx0XHRcdFx0bW9kZWwudHlwZT1gJHttb2RlbC50eXBlfS5mb3JgXHJcblx0XHRcdFx0XHRcdFx0bW9kZWwuY29kZT1wYXJzZWRDb2RlXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRcdGNhc2UgJ0lmU3RhdGVtZW50JzpcclxuXHRcdFx0XHRcdFx0XHRtb2RlbC50eXBlPWAke21vZGVsLnR5cGV9LmlmYFxyXG5cdFx0XHRcdFx0XHRcdG1vZGVsLmNvZGU9cGFyc2VkQ29kZVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUud2FybihgdW5zdXBwb3J0ZWQgc3RhdGVtZW50IGluICR7bW9kZWwudHlwZX0sIGlnbm9yZSBhcyBzdGF0aWMgY29udGVudDogXFxuXFxyICR7b2ZmaWNlRG9jdW1lbnQuY29udGVudChub2RlKS50ZXh0KCl9YClcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9Y2F0Y2goZXJyb3Ipe1xyXG5cdFx0XHRcdFx0aWYoRG9jeFRlbXBsYXRlLmlzRXhwKHRhZykpe1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oYCR7dGFnfTogcGxlYXNlIHVzZSBwbGFpbiB0ZXh0IGNvbnRyb2wgZm9yIGV4cHJlc3Npb25gKVxyXG5cdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGBbJHttb2RlbC50eXBlfV0gd2l0aCAke3RhZ30sIGJ1dCBub3QgdmFyaWFudCBiZWNhdXNlICR7ZXJyb3J9YClcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHR9XHJcblx0XHRkZWxldGUgbW9kZWwucmF3Q29kZVxyXG5cdFx0cmV0dXJuIG1vZGVsXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEb2N4VGVtcGxhdGVcclxuIl19