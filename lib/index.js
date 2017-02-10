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

var _modelHandler = require("docx4js/lib/openxml/docx/model-handler");

var _modelHandler2 = _interopRequireDefault(_modelHandler);

var _document = require("./model/document");

var _document2 = _interopRequireDefault(_document);

var _exp = require("./model/_exp");

var _exp2 = _interopRequireDefault(_exp);

var _if = require("./model/_if");

var _if2 = _interopRequireDefault(_if);

var _for = require("./model/_for");

var _for2 = _interopRequireDefault(_for);

var _picture = require("./model/_picture");

var _picture2 = _interopRequireDefault(_picture);

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
			return this.load(file).then(function (docx) {
				var handler = new VariantHandler(docx);
				debugger;
				docx.parse(handler, DocxTemplate.identify);
				return handler;
			});
		}
	}, {
		key: "assemble",
		value: function assemble(file, data) {
			return this.parse(file).then(function (varDoc) {
				return varDoc.assemble(data, true);
			});
		}
	}, {
		key: "isExp",
		value: function isExp(text) {
			text = text.trim();
			if (text.charAt(0) == '$' && text.charAt(1) == '{' && text.charAt(text.length - 1) == '}') {
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

			var tag = [node.children.find(function (a) {
				return a.name == "w:sdtPr";
			})].find(function (a) {
				return a.name == "w:tag";
			});

			if (!tag) return model;

			tag = tag.attribs["w:val"];
			if (!tag) return model;

			tag = tag.trim();
			switch (model.type) {
				case "control.picture":
				case "control.text":
					{
						var exp = DocxTemplate.isExp(tag);
						if (!exp) return model;

						model.type = model.type + ".var";
						model.code = exp;
						return model;
					}
				case "block":
				case "inline":
					{
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
					}
			}

			return model;
		}
	}]);

	return DocxTemplate;
}(_docx4js3.default);

exports.default = DocxTemplate;

var VariantHandler = function (_ModelHandler) {
	_inherits(VariantHandler, _ModelHandler);

	function VariantHandler(docx) {
		_classCallCheck(this, VariantHandler);

		var _this2 = _possibleConstructorReturn(this, (VariantHandler.__proto__ || Object.getPrototypeOf(VariantHandler)).call(this));

		_this2.docx = docx;
		return _this2;
	}

	_createClass(VariantHandler, [{
		key: "createElement",
		value: function createElement(type, _ref, children) {
			var code = _ref.code,
			    node = _ref.node;

			console.log(type);
			switch (type) {
				case "control.picture.var":
					return new _picture2.default(node, code);
				case "control.text.var":
					return new _exp2.default(node, code);
				case "block.for":
				case "inline.for":
					return new ForStatement(node, code, children);
				case "block.if":
				case "inline.if":
					return new IfStatement(node, code, children);
				case "document":
					this.varDoc = new _document2.default(node, children, docx);
					return this;
				default:
					return children;
			}
		}
	}, {
		key: "assemble",
		value: function assemble(data, transactional) {
			var _varDoc;

			return (_varDoc = this.varDoc).assemble.apply(_varDoc, arguments);
		}
	}]);

	return VariantHandler;
}(_modelHandler2.default);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJWQVJJQU5UUyIsInNwbGl0IiwiRG9jeFRlbXBsYXRlIiwiZmlsZSIsImxvYWQiLCJ0aGVuIiwiaGFuZGxlciIsIlZhcmlhbnRIYW5kbGVyIiwiZG9jeCIsInBhcnNlIiwiaWRlbnRpZnkiLCJkYXRhIiwidmFyRG9jIiwiYXNzZW1ibGUiLCJ0ZXh0IiwidHJpbSIsImNoYXJBdCIsImxlbmd0aCIsInN1YnN0cmluZyIsIm5vZGUiLCJvZmZpY2VEb2N1bWVudCIsInRhZ05hbWUiLCJuYW1lIiwicG9wIiwibW9kZWwiLCJPZmZpY2VEb2N1bWVudCIsImFyZ3VtZW50cyIsImluZGV4T2YiLCJ0eXBlIiwidGFnIiwiY2hpbGRyZW4iLCJmaW5kIiwiYSIsImF0dHJpYnMiLCJleHAiLCJpc0V4cCIsImNvZGUiLCJwYXJzZWRDb2RlIiwiYm9keSIsImNvbnNvbGUiLCJ3YXJuIiwiY29udGVudCIsImZpcnN0U3RhdGVtZW50IiwibG9nIiwiRm9yU3RhdGVtZW50IiwiSWZTdGF0ZW1lbnQiLCJ0cmFuc2FjdGlvbmFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFnR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFuR0EsSUFBTUEsV0FBUyw0Q0FBNENDLEtBQTVDLENBQWtELEdBQWxELENBQWY7O0lBQ2FDLFksV0FBQUEsWTs7Ozs7Ozs7Ozs7O0FBQ1o7Ozt3QkFHYUMsSSxFQUFLO0FBQ1gsVUFBTyxLQUFLQyxJQUFMLENBQVVELElBQVYsRUFBZ0JFLElBQWhCLENBQXFCLGdCQUFNO0FBQ3ZDLFFBQUlDLFVBQVEsSUFBSUMsY0FBSixDQUFtQkMsSUFBbkIsQ0FBWjtBQUNBO0FBQ0FBLFNBQUtDLEtBQUwsQ0FBV0gsT0FBWCxFQUFvQkosYUFBYVEsUUFBakM7QUFDQSxXQUFPSixPQUFQO0FBQ00sSUFMTSxDQUFQO0FBTUg7OzsyQkFFZUgs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WUFBTyxJQUFQO0FBQ0Q7QUFDQyxZQUFPc0IsUUFBUDtBQWZGO0FBa0JBOzs7MkJBRVFuQixJLEVBQUttQyxhLEVBQWM7QUFBQTs7QUFDM0IsVUFBTyxnQkFBS2xDLE1BQUwsRUFBWUMsUUFBWixnQkFBd0JhLFNBQXhCLENBQVA7QUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBlc3ByaW1hIGZyb20gXCJlc3ByaW1hXCJcclxuaW1wb3J0IGRvY3g0anMgZnJvbSBcImRvY3g0anNcIlxyXG5cclxuY29uc3QgVkFSSUFOVFM9XCJjb250cm9sLnBpY3R1cmUsY29udHJvbC50ZXh0LGJsb2NrLGlubGluZVwiLnNwbGl0KFwiLFwiKSBcclxuZXhwb3J0IGNsYXNzIERvY3hUZW1wbGF0ZSBleHRlbmRzIGRvY3g0anN7XHJcblx0LyoqXHJcblx0KiBlbnRyeTogcGFyc2UgdGVtcGxhdGUgYXMgYSB2YXJpYW50IGRvY3VtZW50LCB0aGVuIHlvdSBjYW4gYXNzZW1ibGUgd2l0aCBkYXRhXHJcblx0KiovXHJcblx0c3RhdGljIHBhcnNlKGZpbGUpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvYWQoZmlsZSkudGhlbihkb2N4PT57XHJcblx0XHRcdGxldCBoYW5kbGVyPW5ldyBWYXJpYW50SGFuZGxlcihkb2N4KVxyXG5cdFx0XHRkZWJ1Z2dlclxyXG5cdFx0XHRkb2N4LnBhcnNlKGhhbmRsZXIsIERvY3hUZW1wbGF0ZS5pZGVudGlmeSlcclxuXHRcdFx0cmV0dXJuIGhhbmRsZXJcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBhc3NlbWJsZShmaWxlLGRhdGEpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlKGZpbGUpXHJcblx0XHRcdC50aGVuKHZhckRvYz0+dmFyRG9jLmFzc2VtYmxlKGRhdGEsdHJ1ZSkpXHJcbiAgICB9XHJcblx0XHJcblx0c3RhdGljIGlzRXhwKHRleHQpe1xyXG5cdFx0dGV4dD10ZXh0LnRyaW0oKVxyXG5cdFx0aWYodGV4dC5jaGFyQXQoMCkgPT0gJyQnICYmIHRleHQuY2hhckF0KDEpID09ICd7JyAmJiB0ZXh0LmNoYXJBdCh0ZXh0Lmxlbmd0aCAtIDEpID09ICd9Jyl7XHJcblx0XHRcdHRleHQ9dGV4dC5zdWJzdHJpbmcoMix0ZXh0Lmxlbmd0aC0xKS50cmltKClcclxuXHRcdFx0aWYodGV4dC5sZW5ndGgpXHJcblx0XHRcdFx0cmV0dXJuIHRleHRcclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZVxyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgaWRlbnRpZnkobm9kZSwgb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0IHRhZ05hbWU9bm9kZS5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKVxyXG5cdFx0aWYodGFnTmFtZT09XCJzdHlsZXNcIiB8fCB0YWdOYW1lPT1cIm51bWJlcmluZ1wiKVxyXG5cdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0XHJcblx0XHRsZXQgbW9kZWw9ZG9jeDRqcy5PZmZpY2VEb2N1bWVudC5pZGVudGlmeSguLi5hcmd1bWVudHMpXHJcblx0XHRpZih0eXBlb2YobW9kZWwpPT1cInN0cmluZ1wiIHx8IFZBUklBTlRTLmluZGV4T2YobW9kZWwudHlwZSk9PS0xKVxyXG5cdFx0XHRyZXR1cm4gbW9kZWxcclxuXHJcblx0XHRsZXQgdGFnPVtub2RlLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6c2R0UHJcIildXHJcblx0XHRcdC5maW5kKGE9PmEubmFtZT09XCJ3OnRhZ1wiKVxyXG5cdFx0XHRcclxuXHRcdGlmKCF0YWcpXHJcblx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0XHJcblx0XHR0YWc9dGFnLmF0dHJpYnNbXCJ3OnZhbFwiXVxyXG5cdFx0aWYoIXRhZylcclxuXHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHRcclxuXHRcdHRhZz10YWcudHJpbSgpXHJcblx0XHRzd2l0Y2gobW9kZWwudHlwZSl7XHJcblx0XHRcdGNhc2UgXCJjb250cm9sLnBpY3R1cmVcIjpcclxuXHRcdFx0Y2FzZSBcImNvbnRyb2wudGV4dFwiOiB7XHJcblx0XHRcdFx0bGV0IGV4cD1Eb2N4VGVtcGxhdGUuaXNFeHAodGFnKVxyXG5cdFx0XHRcdGlmKCFleHApXHJcblx0XHRcdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRtb2RlbC50eXBlPWAke21vZGVsLnR5cGV9LnZhcmBcclxuXHRcdFx0XHRtb2RlbC5jb2RlPWV4cFxyXG5cdFx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0XHR9XHJcblx0XHRcdGNhc2UgXCJibG9ja1wiOlxyXG5cdFx0XHRjYXNlIFwiaW5saW5lXCI6e1xyXG5cdFx0XHRcdGxldCBwYXJzZWRDb2RlPWVzcHJpbWEucGFyc2UodGFnKyd7fScpXHJcblx0XHRcdFx0aWYocGFyc2VkQ29kZS5ib2R5Lmxlbmd0aD09MikvL2Zvci9pZigpe317fVxyXG5cdFx0XHRcdFx0cGFyc2VkQ29kZS5ib2R5LnBvcCgpXHJcblx0XHRcdFx0ZWxzZSBpZihwYXJzZWRDb2RlLmJvZHkubGVuZ3RoPjEpe1xyXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKGBzeW50YXggZXJyb3IsIGlnbm9yZSBhcyBzdGF0aWMgY29udGVudDogXFxuXFxyICR7b2ZmaWNlRG9jdW1lbnQuY29udGVudChub2RlKS50ZXh0KCl9YClcclxuXHRcdFx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsZXQgW2ZpcnN0U3RhdGVtZW50XT1wYXJzZWRDb2RlLmJvZHlcclxuXHRcdFx0XHRzd2l0Y2goZmlyc3RTdGF0ZW1lbnQudHlwZSl7XHJcblx0XHRcdFx0XHRjYXNlICdGb3JTdGF0ZW1lbnQnOlxyXG5cdFx0XHRcdFx0XHRtb2RlbC50eXBlPWAke21vZGVsLnR5cGV9LmZvcmBcclxuXHRcdFx0XHRcdFx0bW9kZWwuY29kZT1wYXJzZWRDb2RlXHJcblx0XHRcdFx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdGNhc2UgJ0lmU3RhdGVtZW50JzpcclxuXHRcdFx0XHRcdFx0bW9kZWwudHlwZT1gJHttb2RlbC50eXBlfS5pZmBcclxuXHRcdFx0XHRcdFx0bW9kZWwuY29kZT1wYXJzZWRDb2RlXHJcblx0XHRcdFx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUud2FybihgdW5zdXBwb3J0ZWQgc3RhdGVtZW50IGluICR7bW9kZWwudHlwZX0sIGlnbm9yZSBhcyBzdGF0aWMgY29udGVudDogXFxuXFxyICR7b2ZmaWNlRG9jdW1lbnQuY29udGVudChub2RlKS50ZXh0KCl9YClcclxuXHRcdFx0XHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBtb2RlbFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRG9jeFRlbXBsYXRlXHJcblxyXG5pbXBvcnQgTW9kZWxIYW5kbGVyIGZyb20gXCJkb2N4NGpzL2xpYi9vcGVueG1sL2RvY3gvbW9kZWwtaGFuZGxlclwiXHJcbmltcG9ydCBEb2N1bWVudCBmcm9tIFwiLi9tb2RlbC9kb2N1bWVudFwiXHJcbmltcG9ydCBFeHByZXNzaW9uIGZyb20gXCIuL21vZGVsL19leHBcIlxyXG5pbXBvcnQgSWYgZnJvbSBcIi4vbW9kZWwvX2lmXCJcclxuaW1wb3J0IEZvciBmcm9tIFwiLi9tb2RlbC9fZm9yXCJcclxuaW1wb3J0IFBpY3R1cmUgZnJvbSBcIi4vbW9kZWwvX3BpY3R1cmVcIlxyXG5cclxuY2xhc3MgVmFyaWFudEhhbmRsZXIgZXh0ZW5kcyBNb2RlbEhhbmRsZXJ7XHJcblx0Y29uc3RydWN0b3IoZG9jeCl7XHJcblx0XHRzdXBlcigpXHJcblx0XHR0aGlzLmRvY3g9ZG9jeFxyXG5cdH1cclxuXHRcclxuXHRjcmVhdGVFbGVtZW50KHR5cGUse2NvZGUsbm9kZX0sY2hpbGRyZW4pe1xyXG5cdFx0Y29uc29sZS5sb2codHlwZSlcclxuXHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdFx0Y2FzZSBcImNvbnRyb2wucGljdHVyZS52YXJcIjpcclxuXHRcdFx0XHRyZXR1cm4gbmV3IFBpY3R1cmUobm9kZSxjb2RlKVxyXG5cdFx0XHRjYXNlIFwiY29udHJvbC50ZXh0LnZhclwiOlxyXG5cdFx0XHRcdHJldHVybiBuZXcgRXhwcmVzc2lvbihub2RlLGNvZGUpXHJcblx0XHRcdGNhc2UgXCJibG9jay5mb3JcIjpcclxuXHRcdFx0Y2FzZSBcImlubGluZS5mb3JcIjpcclxuXHRcdFx0XHRyZXR1cm4gbmV3IEZvclN0YXRlbWVudChub2RlLGNvZGUsY2hpbGRyZW4pXHJcblx0XHRcdGNhc2UgXCJibG9jay5pZlwiOlxyXG5cdFx0XHRjYXNlIFwiaW5saW5lLmlmXCI6XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBJZlN0YXRlbWVudChub2RlLGNvZGUsY2hpbGRyZW4pXHJcblx0XHRcdGNhc2UgXCJkb2N1bWVudFwiOlxyXG5cdFx0XHRcdHRoaXMudmFyRG9jPW5ldyBEb2N1bWVudChub2RlLGNoaWxkcmVuLGRvY3gpXHJcblx0XHRcdFx0cmV0dXJuIHRoaXNcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRyZXR1cm4gY2hpbGRyZW5cclxuXHRcdH1cclxuXHRcdFxyXG5cdH1cclxuXHJcblx0YXNzZW1ibGUoZGF0YSx0cmFuc2FjdGlvbmFsKXtcclxuXHRcdHJldHVybiB0aGlzLnZhckRvYy5hc3NlbWJsZSguLi5hcmd1bWVudHMpXHJcblx0fVxyXG59Il19