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
		value: function assemble(data, opt) {
			try {
				opt = Object.assign({
					clearWrap: true
				}, opt);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJlc3ByaW1hIiwiYmFiZWwiLCJEb2N1bWVudCIsImRvY3giLCJjaGlsZHJlbiIsImRhdGEiLCJvcHQiLCJPYmplY3QiLCJhc3NpZ24iLCJjbGVhcldyYXAiLCJ0YXJnZXREb2MiLCJjbG9uZSIsImVuZ2luZSIsInZhcmlhbnRzIiwib2ZmaWNlRG9jdW1lbnQiLCJjb250ZW50IiwidGhlbiIsInN0YXRpY0RvYyIsInJlbW92ZUF0dHIiLCJlcnJvciIsImNvbnNvbGUiLCJvcHRpb25zIiwiY29kZSIsInRvU3RyaW5nIiwiY29uc3RydWN0b3IiLCJFUzciLCJ0cmFuc2Zvcm0iLCJwcmVzZXRzIiwicGx1Z2lucyIsInBhcnNlIiwicmVzdWx0IiwiYm9keSIsImV4cHJlc3Npb24iLCJ0eXBlIiwiYXJndW1lbnQiLCJnZW5lcmF0ZSIsImNvZGVCbG9jayIsImNhbGxlZSIsImZvckVhY2giLCJhIiwiY29tbWVudCIsImxlYWRpbmdDb21tZW50cyIsInZhbHVlIiwicHVzaCIsInJlZHVjZSIsInN0YXRlIiwibmV4dCIsImlkIiwiRnVuY3Rpb24iLCJqcyIsImV2YWwiLCJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztJQUFZQSxPOztBQUNaOztJQUFZQyxLOztBQUNaOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7OztJQUVxQkMsUTtBQUNwQixtQkFBWUMsSUFBWixFQUFpQkMsUUFBakIsRUFBMEI7QUFBQTs7QUFDekIsT0FBS0QsSUFBTCxHQUFVQSxJQUFWO0FBQ0EsT0FBS0MsUUFBTCxHQUFjQSxZQUFVLEVBQXhCO0FBQ0E7Ozs7MkJBRVFDLEksRUFBTUMsRyxFQUFJO0FBQ2xCLE9BQUc7QUFDRkEsVUFBSUMsT0FBT0MsTUFBUCxDQUFjO0FBQ2pCQyxnQkFBVTtBQURPLEtBQWQsRUFFRkgsR0FGRSxDQUFKO0FBR0EsUUFBSUksWUFBVSxLQUFLUCxJQUFMLENBQVVRLEtBQVYsRUFB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UixTQUFPLEtBQVA7QUFDQTtBQUNELENBUFUsRTs7a0JBekNTakQsUSIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGVzcHJpbWEgIGZyb20gXCJlc3ByaW1hXCJcclxuaW1wb3J0ICogYXMgYmFiZWwgZnJvbSBcImJhYmVsLWNvcmVcIlxyXG5pbXBvcnQgZXMyMDE1IGZyb20gXCJiYWJlbC1wcmVzZXQtZXMyMDE1XCJcclxuaW1wb3J0IGVzMjAxNyBmcm9tIFwiYmFiZWwtcHJlc2V0LWVzMjAxN1wiXHJcblxyXG5pbXBvcnQgZXNjb2RlZ2VuIGZyb20gXCJlc2NvZGVnZW5cIlxyXG5pbXBvcnQge0lEfSBmcm9tIFwiLi92YXJpYW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50e1xyXG5cdGNvbnN0cnVjdG9yKGRvY3gsY2hpbGRyZW4pe1xyXG5cdFx0dGhpcy5kb2N4PWRvY3hcclxuXHRcdHRoaXMuY2hpbGRyZW49Y2hpbGRyZW58fFtdXHJcblx0fVxyXG5cclxuXHRhc3NlbWJsZShkYXRhLCBvcHQpe1xyXG5cdFx0dHJ5e1xyXG5cdFx0XHRvcHQ9T2JqZWN0LmFzc2lnbih7XHJcblx0XHRcdFx0Y2xlYXJXcmFwOnRydWVcclxuXHRcdFx0fSxvcHQpXHJcblx0XHRcdGxldCB0YXJnZXREb2M9dGhpcy5kb2N4LmNsb25lKClcclxuXHRcdFx0cmV0dXJuIHRoaXMuZW5naW5lKHRhcmdldERvYywgZGF0YSx0aGlzLnZhcmlhbnRzLCB0YXJnZXREb2Mub2ZmaWNlRG9jdW1lbnQuY29udGVudCwgb3B0KVxyXG5cdFx0XHRcdC50aGVuKHN0YXRpY0RvYz0+e1xyXG5cdFx0XHRcdFx0aWYoIW9wdC5jbGVhcldyYXApe1xyXG5cdFx0XHRcdFx0XHRzdGF0aWNEb2Mub2ZmaWNlRG9jdW1lbnQuY29udGVudChgWyR7SUR9XWApLnJlbW92ZUF0dHIoSUQpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gc3RhdGljRG9jXHJcblx0XHRcdFx0fSlcclxuXHRcdH1jYXRjaChlcnJvcil7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgdmFyaWFudHMoKXtcclxuXHRcdGZ1bmN0aW9uIHJlZHVjZShzdGF0ZSxuZXh0KXtcclxuXHRcdFx0c3RhdGVbbmV4dC5pZF09bmV4dFxyXG5cdFx0XHRpZihuZXh0LmNoaWxkcmVuKVxyXG5cdFx0XHRcdG5leHQuY2hpbGRyZW4ucmVkdWNlKHJlZHVjZSxzdGF0ZSlcclxuXHJcblx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB2YXJpYW50cz10aGlzLmNoaWxkcmVuLnJlZHVjZShyZWR1Y2Use30pXHJcblx0XHRyZXR1cm4gdmFyaWFudHNcclxuXHR9XHJcblxyXG5cdGdldCBlbmdpbmUoKXtcclxuXHRcdHJldHVybiBuZXcgRnVuY3Rpb24oXCJkb2N4LCBfXywgX192YXJpYW50cywgJCwgX19vcHRcIix0aGlzLmpzKCkpXHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBFUzc9KGZ1bmN0aW9uKCl7XHJcblx0XHR0cnl7XHJcblx0XHRcdGV2YWwoYChhc3luYyBmdW5jdGlvbigpe30pYClcclxuXHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHR9Y2F0Y2goZSl7XHJcblx0XHRcdHJldHVybiBmYWxzZVxyXG5cdFx0fVxyXG5cdH0pKClcclxuXHJcblx0anMob3B0aW9ucz17fSl7XHJcblx0XHRsZXQgY29kZT10aGlzLnRvU3RyaW5nKG9wdGlvbnMpXHJcblx0XHRcclxuXHRcdGlmKCF0aGlzLmNvbnN0cnVjdG9yLkVTNyl7XHJcblx0XHRcdGNvZGU9YmFiZWwudHJhbnNmb3JtKGNvZGUse3ByZXNldHM6IFtlczIwMTUsIGVzMjAxN10scGx1Z2luczpbXX0pLmNvZGVcclxuXHRcdFx0Y29kZT1lc3ByaW1hLnBhcnNlKGNvZGUpXHJcblx0XHRcdGxldCByZXN1bHQ9Y29kZS5ib2R5WzJdLmV4cHJlc3Npb25cclxuXHRcdFx0Y29kZS5ib2R5WzJdPXtcclxuXHRcdFx0XHR0eXBlOiBcIlJldHVyblN0YXRlbWVudFwiLFxyXG5cdFx0XHRcdGFyZ3VtZW50OiByZXN1bHRcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0Y29kZT1lc2NvZGVnZW4uZ2VuZXJhdGUoY29kZSx7fSlcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY29kZVxyXG5cdH1cclxuXHRcclxuXHR0b1N0cmluZyhvcHRpb25zPXt9KXtcclxuXHRcdGxldCBjb2RlPWVzcHJpbWEucGFyc2UoXCIoYXN5bmMgZnVuY3Rpb24oKXt9KSgpXCIpXHJcblx0XHRsZXQgY29kZUJsb2NrPWNvZGUuYm9keVswXS5leHByZXNzaW9uLmNhbGxlZS5ib2R5LmJvZHlcclxuXHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaChhPT57XHJcblx0XHRcdGlmKGEuY29tbWVudCl7XHJcblx0XHRcdFx0YS5jb2RlLmxlYWRpbmdDb21tZW50cz1be1xyXG5cdFx0XHRcdFx0dHlwZTpcIkJsb2NrXCIsXHJcblx0XHRcdFx0XHR2YWx1ZTogYS5jb21tZW50XHJcblx0XHRcdFx0fV1cclxuXHRcdFx0fVxyXG5cdFx0XHRjb2RlQmxvY2sucHVzaChhLmNvZGUpXHJcblx0XHR9KVxyXG5cdFx0Y29kZUJsb2NrLnB1c2goe1xyXG5cdFx0XHRcInR5cGVcIjogXCJSZXR1cm5TdGF0ZW1lbnRcIixcclxuXHRcdFx0XCJhcmd1bWVudFwiOiB7XHJcblx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFwibmFtZVwiOiBcImRvY3hcIlxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0XHJcblx0XHRjb2RlPWVzY29kZWdlbi5nZW5lcmF0ZShjb2RlLG9wdGlvbnMpXHJcblx0XHRyZXR1cm4gY29kZVxyXG5cdH1cclxufVxyXG4iXX0=