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
					staticDoc.officeDocument.content("[" + _variant.ID + "]").removeAttr(_variant.ID);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJlc3ByaW1hIiwiYmFiZWwiLCJEb2N1bWVudCIsImRvY3giLCJjaGlsZHJlbiIsImRhdGEiLCJvcHQiLCJjbGVhcldyYXAiLCJ0YXJnZXREb2MiLCJjbG9uZSIsImVuZ2luZSIsInZhcmlhbnRzIiwib2ZmaWNlRG9jdW1lbnQiLCJjb250ZW50IiwidGhlbiIsInN0YXRpY0RvYyIsInJlbW92ZUF0dHIiLCJlcnJvciIsImNvbnNvbGUiLCJvcHRpb25zIiwiY29kZSIsInRvU3RyaW5nIiwiY29uc3RydWN0b3IiLCJFUzciLCJ0cmFuc2Zvcm0iLCJwcmVzZXRzIiwicGx1Z2lucyIsInBhcnNlIiwicmVzdWx0IiwiYm9keSIsImV4cHJlc3Npb24iLCJ0eXBlIiwiYXJndW1lbnQiLCJnZW5lcmF0ZSIsImNvZGVCbG9jayIsImNhbGxlZSIsImZvckVhY2giLCJhIiwiY29tbWVudCIsImxlYWRpbmdDb21tZW50cyIsInZhbHVlIiwicHVzaCIsInJlZHVjZSIsInN0YXRlIiwibmV4dCIsImlkIiwiRnVuY3Rpb24iLCJqcyIsImV2YWwiLCJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztJQUFZQSxPOztBQUNaOztJQUFZQyxLOztBQUNaOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7OztJQUVxQkMsUTtBQUNwQixtQkFBWUMsSUFBWixFQUFpQkMsUUFBakIsRUFBMEI7QUFBQTs7QUFDekIsT0FBS0QsSUFBTCxHQUFVQSxJQUFWO0FBQ0EsT0FBS0MsUUFBTCxHQUFjQSxZQUFVLEVBQXhCO0FBQ0E7Ozs7MkJBRVFDLEksRUFBMkI7QUFBQSxPQUFyQkMsR0FBcUIsdUVBQWpCLEVBQUNDLFdBQVUsSUFBWCxFQUFpQjs7QUFDbkMsT0FBRztBQUNGLFFBQUlDLFlBQVUsS0FBS0wsSUFBTCxDQUFVTSxLQUFWLEVBQWQ7QUFDQSxXQUFPLEtBQUtDLE1BQUwsQ0FBWUYsU0FBWixFQUF1QkgsSUFB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cG9ydCAqIGFzIGVzcHJpbWEgIGZyb20gXCJlc3ByaW1hXCJcclxuaW1wb3J0ICogYXMgYmFiZWwgZnJvbSBcImJhYmVsLWNvcmVcIlxyXG5pbXBvcnQgZXMyMDE1IGZyb20gXCJiYWJlbC1wcmVzZXQtZXMyMDE1XCJcclxuaW1wb3J0IGVzMjAxNyBmcm9tIFwiYmFiZWwtcHJlc2V0LWVzMjAxN1wiXHJcblxyXG5pbXBvcnQgZXNjb2RlZ2VuIGZyb20gXCJlc2NvZGVnZW5cIlxyXG5pbXBvcnQge0lEfSBmcm9tIFwiLi92YXJpYW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50e1xyXG5cdGNvbnN0cnVjdG9yKGRvY3gsY2hpbGRyZW4pe1xyXG5cdFx0dGhpcy5kb2N4PWRvY3hcclxuXHRcdHRoaXMuY2hpbGRyZW49Y2hpbGRyZW58fFtdXHJcblx0fVxyXG5cclxuXHRhc3NlbWJsZShkYXRhLCBvcHQ9e2NsZWFyV3JhcDp0cnVlfSl7XHJcblx0XHR0cnl7XHJcblx0XHRcdGxldCB0YXJnZXREb2M9dGhpcy5kb2N4LmNsb25lKClcclxuXHRcdFx0cmV0dXJuIHRoaXMuZW5naW5lKHRhcmdldERvYywgZGF0YSwgdGhpcy52YXJpYW50cywgdGFyZ2V0RG9jLm9mZmljZURvY3VtZW50LmNvbnRlbnQsIG9wdClcclxuXHRcdFx0XHQudGhlbihzdGF0aWNEb2M9PntcclxuXHRcdFx0XHRcdHN0YXRpY0RvYy5vZmZpY2VEb2N1bWVudC5jb250ZW50KGBbJHtJRH1dYCkucmVtb3ZlQXR0cihJRClcclxuXHRcdFx0XHRcdHJldHVybiBzdGF0aWNEb2NcclxuXHRcdFx0XHR9KVxyXG5cdFx0fWNhdGNoKGVycm9yKXtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcilcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldCB2YXJpYW50cygpe1xyXG5cdFx0ZnVuY3Rpb24gcmVkdWNlKHN0YXRlLG5leHQpe1xyXG5cdFx0XHRzdGF0ZVtuZXh0LmlkXT1uZXh0XHJcblx0XHRcdGlmKG5leHQuY2hpbGRyZW4pXHJcblx0XHRcdFx0bmV4dC5jaGlsZHJlbi5yZWR1Y2UocmVkdWNlLHN0YXRlKVxyXG5cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHZhcmlhbnRzPXRoaXMuY2hpbGRyZW4ucmVkdWNlKHJlZHVjZSx7fSlcclxuXHRcdHJldHVybiB2YXJpYW50c1xyXG5cdH1cclxuXHJcblx0Z2V0IGVuZ2luZSgpe1xyXG5cdFx0cmV0dXJuIG5ldyBGdW5jdGlvbihcImRvY3gsIF9fLCBfX3ZhcmlhbnRzLCAkLCBfX29wdFwiLHRoaXMuanMoKSlcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIEVTNz0oZnVuY3Rpb24oKXtcclxuXHRcdHRyeXtcclxuXHRcdFx0ZXZhbChgKGFzeW5jIGZ1bmN0aW9uKCl7fSlgKVxyXG5cdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRcdH1jYXRjaChlKXtcclxuXHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHR9XHJcblx0fSkoKVxyXG5cclxuXHRqcyhvcHRpb25zPXt9KXtcclxuXHRcdGxldCBjb2RlPXRoaXMudG9TdHJpbmcob3B0aW9ucylcclxuXHRcdFxyXG5cdFx0aWYoIXRoaXMuY29uc3RydWN0b3IuRVM3KXtcclxuXHRcdFx0Y29kZT1iYWJlbC50cmFuc2Zvcm0oY29kZSx7cHJlc2V0czogW2VzMjAxNSwgZXMyMDE3XSxwbHVnaW5zOltdfSkuY29kZVxyXG5cdFx0XHRjb2RlPWVzcHJpbWEucGFyc2UoY29kZSlcclxuXHRcdFx0bGV0IHJlc3VsdD1jb2RlLmJvZHlbMl0uZXhwcmVzc2lvblxyXG5cdFx0XHRjb2RlLmJvZHlbMl09e1xyXG5cdFx0XHRcdHR5cGU6IFwiUmV0dXJuU3RhdGVtZW50XCIsXHJcblx0XHRcdFx0YXJndW1lbnQ6IHJlc3VsdFxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRjb2RlPWVzY29kZWdlbi5nZW5lcmF0ZShjb2RlLHt9KVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBjb2RlXHJcblx0fVxyXG5cdFxyXG5cdHRvU3RyaW5nKG9wdGlvbnM9e30pe1xyXG5cdFx0bGV0IGNvZGU9ZXNwcmltYS5wYXJzZShcIihhc3luYyBmdW5jdGlvbigpe30pKClcIilcclxuXHRcdGxldCBjb2RlQmxvY2s9Y29kZS5ib2R5WzBdLmV4cHJlc3Npb24uY2FsbGVlLmJvZHkuYm9keVxyXG5cdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKGE9PntcclxuXHRcdFx0aWYoYS5jb21tZW50KXtcclxuXHRcdFx0XHRhLmNvZGUubGVhZGluZ0NvbW1lbnRzPVt7XHJcblx0XHRcdFx0XHR0eXBlOlwiQmxvY2tcIixcclxuXHRcdFx0XHRcdHZhbHVlOiBhLmNvbW1lbnRcclxuXHRcdFx0XHR9XVxyXG5cdFx0XHR9XHJcblx0XHRcdGNvZGVCbG9jay5wdXNoKGEuY29kZSlcclxuXHRcdH0pXHJcblx0XHRjb2RlQmxvY2sucHVzaCh7XHJcblx0XHRcdFwidHlwZVwiOiBcIlJldHVyblN0YXRlbWVudFwiLFxyXG5cdFx0XHRcImFyZ3VtZW50XCI6IHtcclxuXHRcdFx0XHRcInR5cGVcIjogXCJJZGVudGlmaWVyXCIsXHJcblx0XHRcdFx0XCJuYW1lXCI6IFwiZG9jeFwiXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHRcclxuXHRcdGNvZGU9ZXNjb2RlZ2VuLmdlbmVyYXRlKGNvZGUsb3B0aW9ucylcclxuXHRcdHJldHVybiBjb2RlXHJcblx0fVxyXG59XHJcbiJdfQ==