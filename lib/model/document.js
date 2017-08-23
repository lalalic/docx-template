"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _esprima = require("esprima");

var esprima = _interopRequireWildcard(_esprima);

var _babelCore = require("babel-core");

var babel = _interopRequireWildcard(_babelCore);

var _babelPresetEs = require("babel-preset-es2015");

var _babelPresetEs2 = _interopRequireDefault(_babelPresetEs);

var _babelPresetEs3 = require("babel-preset-es2017");

var _babelPresetEs4 = _interopRequireDefault(_babelPresetEs3);

var _escodegen = require("escodegen");

var _escodegen2 = _interopRequireDefault(_escodegen);

var _variant = require("./variant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Document = function () {
	function Document(docx, children) {
		_classCallCheck(this, Document);

		this.docx = docx;
		this.children = children || [];
	}

	_createClass(Document, [{
		key: "assemble",
		value: function assemble(data) {
			var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { clearWrap: true };

			try {
				var targetDoc = this.docx.clone();
				return this.engine(targetDoc, data, this.variants, targetDoc.officeDocument.content, opt).then(function (staticDoc) {
					if (!opt.clearWrap) {
						staticDoc.officeDocument.content("[" + _variant.ID + "]").removeAttr(_variant.ID);
					}
					return staticDoc;
				});
			} catch (error) {
				console.error(error);
			}
		}
	}, {
		key: "js",
		value: function js() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var code = this.toString(options);

			if (!this.constructor.ES7) {
				code = babel.transform(code, { presets: [_babelPresetEs2.default, _babelPresetEs4.default], plugins: [] }).code;
				code = esprima.parse(code);
				var result = code.body[2].expression;
				code.body[2] = {
					type: "ReturnStatement",
					argument: result
				};

				code = _escodegen2.default.generate(code, {});
			}

			return code;
		}
	}, {
		key: "toString",
		value: function toString() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var code = esprima.parse("(async function(){})()");
			var codeBlock = code.body[0].expression.callee.body.body;
			this.children.forEach(function (a) {
				if (a.comment) {
					a.code.leadingComments = [{
						type: "Block",
						value: a.comment
					}];
				}
				codeBlock.push(a.code);
			});
			codeBlock.push({
				"type": "ReturnStatement",
				"argument": {
					"type": "Identifier",
					"name": "docx"
				}
			});

			code = _escodegen2.default.generate(code, options);
			return code;
		}
	}, {
		key: "variants",
		get: function get() {
			function reduce(state, next) {
				state[next.id] = next;
				if (next.children) next.children.reduce(reduce, state);

				return state;
			}

			var variants = this.children.reduce(reduce, {});
			return variants;
		}
	}, {
		key: "engine",
		get: function get() {
			return new Function("docx, __, __variants, $, __opt", this.js());
		}
	}]);

	return Document;
}();

Document.ES7 = function () {
	try {
		eval("(async function(){})");
		return false;
	} catch (e) {
		return false;
	}
}();

exports.default = Document;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJlc3ByaW1hIiwiYmFiZWwiLCJEb2N1bWVudCIsImRvY3giLCJjaGlsZHJlbiIsImRhdGEiLCJvcHQiLCJjbGVhcldyYXAiLCJ0YXJnZXREb2MiLCJjbG9uZSIsImVuZ2luZSIsInZhcmlhbnRzIiwib2ZmaWNlRG9jdW1lbnQiLCJjb250ZW50IiwidGhlbiIsInN0YXRpY0RvYyIsInJlbW92ZUF0dHIiLCJlcnJvciIsImNvbnNvbGUiLCJvcHRpb25zIiwiY29kZSIsInRvU3RyaW5nIiwiY29uc3RydWN0b3IiLCJFUzciLCJ0cmFuc2Zvcm0iLCJwcmVzZXRzIiwicGx1Z2lucyIsInBhcnNlIiwicmVzdWx0IiwiYm9keSIsImV4cHJlc3Npb24iLCJ0eXBlIiwiYXJndW1lbnQiLCJnZW5lcmF0ZSIsImNvZGVCbG9jayIsImNhbGxlZSIsImZvckVhY2giLCJhIiwiY29tbWVudCIsImxlYWRpbmdDb21tZW50cyIsInZhbHVlIiwicHVzaCIsInJlZHVjZSIsInN0YXRlIiwibmV4dCIsImlkIiwiRnVuY3Rpb24iLCJqcyIsImV2YWwiLCJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztJQUFZQSxPOztBQUNaOztJQUFZQyxLOztBQUNaOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7OztJQUVxQkMsUTtBQUNwQixtQkFBWUMsSUFBWixFQUFpQkMsUUFBakIsRUFBMEI7QUFBQTs7QUFDekIsT0FBS0QsSUFBTCxHQUFVQSxJQUFWO0FBQ0EsT0FBS0MsUUFBTCxHQUFjQSxZQUFVLEVBQXhCO0FBQ0E7Ozs7MkJBRVFDLEksRUFBMkI7QUFBQSxPQUFyQkMsR0FBcUIsdUVBQWpCLEVBQUNDLFdBQVUsSUFBWCxFQUFpQjs7QUFDbkMsT0FBRztBQUNGLFFBQUlDLFlBQVUsS0FBS0wsSUFBTCxDQUFVTSxLQUFWLEVBQWQ7QUFDQSxXQUFPLEtBQUtDLE1BQUwsQ0FBWUYsU0FBWixFQUF1QkgsSUFB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aWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBlc3ByaW1hICBmcm9tIFwiZXNwcmltYVwiXHJcbmltcG9ydCAqIGFzIGJhYmVsIGZyb20gXCJiYWJlbC1jb3JlXCJcclxuaW1wb3J0IGVzMjAxNSBmcm9tIFwiYmFiZWwtcHJlc2V0LWVzMjAxNVwiXHJcbmltcG9ydCBlczIwMTcgZnJvbSBcImJhYmVsLXByZXNldC1lczIwMTdcIlxyXG5cclxuaW1wb3J0IGVzY29kZWdlbiBmcm9tIFwiZXNjb2RlZ2VuXCJcclxuaW1wb3J0IHtJRH0gZnJvbSBcIi4vdmFyaWFudFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudHtcclxuXHRjb25zdHJ1Y3Rvcihkb2N4LGNoaWxkcmVuKXtcclxuXHRcdHRoaXMuZG9jeD1kb2N4XHJcblx0XHR0aGlzLmNoaWxkcmVuPWNoaWxkcmVufHxbXVxyXG5cdH1cclxuXHJcblx0YXNzZW1ibGUoZGF0YSwgb3B0PXtjbGVhcldyYXA6dHJ1ZX0pe1xyXG5cdFx0dHJ5e1xyXG5cdFx0XHRsZXQgdGFyZ2V0RG9jPXRoaXMuZG9jeC5jbG9uZSgpXHJcblx0XHRcdHJldHVybiB0aGlzLmVuZ2luZSh0YXJnZXREb2MsIGRhdGEsIHRoaXMudmFyaWFudHMsIHRhcmdldERvYy5vZmZpY2VEb2N1bWVudC5jb250ZW50LCBvcHQpXHJcblx0XHRcdFx0LnRoZW4oc3RhdGljRG9jPT57XHJcblx0XHRcdFx0XHRpZighb3B0LmNsZWFyV3JhcCl7XHJcblx0XHRcdFx0XHRcdHN0YXRpY0RvYy5vZmZpY2VEb2N1bWVudC5jb250ZW50KGBbJHtJRH1dYCkucmVtb3ZlQXR0cihJRClcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiBzdGF0aWNEb2NcclxuXHRcdFx0XHR9KVxyXG5cdFx0fWNhdGNoKGVycm9yKXtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcilcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldCB2YXJpYW50cygpe1xyXG5cdFx0ZnVuY3Rpb24gcmVkdWNlKHN0YXRlLG5leHQpe1xyXG5cdFx0XHRzdGF0ZVtuZXh0LmlkXT1uZXh0XHJcblx0XHRcdGlmKG5leHQuY2hpbGRyZW4pXHJcblx0XHRcdFx0bmV4dC5jaGlsZHJlbi5yZWR1Y2UocmVkdWNlLHN0YXRlKVxyXG5cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHZhcmlhbnRzPXRoaXMuY2hpbGRyZW4ucmVkdWNlKHJlZHVjZSx7fSlcclxuXHRcdHJldHVybiB2YXJpYW50c1xyXG5cdH1cclxuXHJcblx0Z2V0IGVuZ2luZSgpe1xyXG5cdFx0cmV0dXJuIG5ldyBGdW5jdGlvbihcImRvY3gsIF9fLCBfX3ZhcmlhbnRzLCAkLCBfX29wdFwiLHRoaXMuanMoKSlcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIEVTNz0oZnVuY3Rpb24oKXtcclxuXHRcdHRyeXtcclxuXHRcdFx0ZXZhbChgKGFzeW5jIGZ1bmN0aW9uKCl7fSlgKVxyXG5cdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRcdH1jYXRjaChlKXtcclxuXHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHR9XHJcblx0fSkoKVxyXG5cclxuXHRqcyhvcHRpb25zPXt9KXtcclxuXHRcdGxldCBjb2RlPXRoaXMudG9TdHJpbmcob3B0aW9ucylcclxuXHRcdFxyXG5cdFx0aWYoIXRoaXMuY29uc3RydWN0b3IuRVM3KXtcclxuXHRcdFx0Y29kZT1iYWJlbC50cmFuc2Zvcm0oY29kZSx7cHJlc2V0czogW2VzMjAxNSwgZXMyMDE3XSxwbHVnaW5zOltdfSkuY29kZVxyXG5cdFx0XHRjb2RlPWVzcHJpbWEucGFyc2UoY29kZSlcclxuXHRcdFx0bGV0IHJlc3VsdD1jb2RlLmJvZHlbMl0uZXhwcmVzc2lvblxyXG5cdFx0XHRjb2RlLmJvZHlbMl09e1xyXG5cdFx0XHRcdHR5cGU6IFwiUmV0dXJuU3RhdGVtZW50XCIsXHJcblx0XHRcdFx0YXJndW1lbnQ6IHJlc3VsdFxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRjb2RlPWVzY29kZWdlbi5nZW5lcmF0ZShjb2RlLHt9KVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBjb2RlXHJcblx0fVxyXG5cdFxyXG5cdHRvU3RyaW5nKG9wdGlvbnM9e30pe1xyXG5cdFx0bGV0IGNvZGU9ZXNwcmltYS5wYXJzZShcIihhc3luYyBmdW5jdGlvbigpe30pKClcIilcclxuXHRcdGxldCBjb2RlQmxvY2s9Y29kZS5ib2R5WzBdLmV4cHJlc3Npb24uY2FsbGVlLmJvZHkuYm9keVxyXG5cdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKGE9PntcclxuXHRcdFx0aWYoYS5jb21tZW50KXtcclxuXHRcdFx0XHRhLmNvZGUubGVhZGluZ0NvbW1lbnRzPVt7XHJcblx0XHRcdFx0XHR0eXBlOlwiQmxvY2tcIixcclxuXHRcdFx0XHRcdHZhbHVlOiBhLmNvbW1lbnRcclxuXHRcdFx0XHR9XVxyXG5cdFx0XHR9XHJcblx0XHRcdGNvZGVCbG9jay5wdXNoKGEuY29kZSlcclxuXHRcdH0pXHJcblx0XHRjb2RlQmxvY2sucHVzaCh7XHJcblx0XHRcdFwidHlwZVwiOiBcIlJldHVyblN0YXRlbWVudFwiLFxyXG5cdFx0XHRcImFyZ3VtZW50XCI6IHtcclxuXHRcdFx0XHRcInR5cGVcIjogXCJJZGVudGlmaWVyXCIsXHJcblx0XHRcdFx0XCJuYW1lXCI6IFwiZG9jeFwiXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHRcclxuXHRcdGNvZGU9ZXNjb2RlZ2VuLmdlbmVyYXRlKGNvZGUsb3B0aW9ucylcclxuXHRcdHJldHVybiBjb2RlXHJcblx0fVxyXG59XHJcbiJdfQ==