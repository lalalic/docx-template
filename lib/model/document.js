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
			try {
				var targetDoc = this.docx.clone();
				return this.engine(targetDoc, data, this.variants, targetDoc.officeDocument.content).then(function (staticDoc) {
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

			var code = esprima.parse("(async function(){})()");
			var codeBlock = code.body[0].expression.callee.body.body;
			this.children.forEach(function (a) {
				return codeBlock.push(a.code);
			});
			codeBlock.push({
				"type": "ReturnStatement",
				"argument": {
					"type": "Identifier",
					"name": "docx"
				}
			});

			code = _escodegen2.default.generate(code, options);

			code = babel.transform(code, { presets: [_babelPresetEs2.default, _babelPresetEs4.default], plugins: [] }).code;
			code = esprima.parse(code);
			var result = code.body[2].expression;
			code.body[2] = {
				type: "ReturnStatement",
				argument: result
			};

			code = _escodegen2.default.generate(code, {});

			return code;
		}
	}, {
		key: "toString",
		value: function toString(options) {
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
			return new Function("docx, __, __variants, $", this.js());
		}
	}]);

	return Document;
}();

exports.default = Document;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJlc3ByaW1hIiwiYmFiZWwiLCJEb2N1bWVudCIsImRvY3giLCJjaGlsZHJlbiIsImRhdGEiLCJ0YXJnZXREb2MiLCJjbG9uZSIsImVuZ2luZSIsInZhcmlhbnRzIiwib2ZmaWNlRG9jdW1lbnQiLCJjb250ZW50IiwidGhlbiIsInN0YXRpY0RvYyIsInJlbW92ZUF0dHIiLCJlcnJvciIsImNvbnNvbGUiLCJvcHRpb25zIiwiY29kZSIsInBhcnNlIiwiY29kZUJsb2NrIiwiYm9keSIsImV4cHJlc3Npb24iLCJjYWxsZWUiLCJmb3JFYWNoIiwicHVzaCIsImEiLCJnZW5lcmF0ZSIsInRyYW5zZm9ybSIsInByZXNldHMiLCJwbHVnaW5zIiwicmVzdWx0IiwidHlwZSIsImFyZ3VtZW50IiwiY29tbWVudCIsImxlYWRpbmdDb21tZW50cyIsInZhbHVlIiwicmVkdWNlIiwic3RhdGUiLCJuZXh0IiwiaWQiLCJGdW5jdGlvbiIsImpzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztJQUFZQSxPOztBQUNaOztJQUFZQyxLOztBQUNaOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7OztJQUVxQkMsUTtBQUNwQixtQkFBWUMsSUFBWixFQUFpQkMsUUFBakIsRUFBMEI7QUFBQTs7QUFDekIsT0FBS0QsSUFBTCxHQUFVQSxJQUFWO0FBQ0EsT0FBS0MsUUFBTCxHQUFjQSxZQUFVLEVBQXhCO0FBQ0E7Ozs7MkJBRVFDLEksRUFBSztBQUNiLE9BQUc7QUFDRixRQUFJQyxZQUFVLEtBQUtILElBQUwsQ0FBVUksS0FBVixFQUFkO0FBQ0EsV0FBTyxLQUFLQyxNQUFMLENBQVlGLFNBQVosRUFBdUJELElBQXZCLEVBQTZCLEtBQUtJLFFBQWxDLEVBQTRDSCxVQUFVSSxjQUFWLENBQXlCQyxPQUFyRSxFQUNMQyxJQURLLENBQ0EscUJBQVc7QUFDaEJDLGVBQVVILGNBQVYsQ0FBeUJDLE9BQXpCLDBCQUE0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bXBvcnQgKiBhcyBlc3ByaW1hICBmcm9tIFwiZXNwcmltYVwiXHJcbmltcG9ydCAqIGFzIGJhYmVsIGZyb20gXCJiYWJlbC1jb3JlXCJcclxuaW1wb3J0IGVzMjAxNSBmcm9tIFwiYmFiZWwtcHJlc2V0LWVzMjAxNVwiXHJcbmltcG9ydCBlczIwMTcgZnJvbSBcImJhYmVsLXByZXNldC1lczIwMTdcIlxyXG5cclxuaW1wb3J0IGVzY29kZWdlbiBmcm9tIFwiZXNjb2RlZ2VuXCJcclxuaW1wb3J0IHtJRH0gZnJvbSBcIi4vdmFyaWFudFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudHtcclxuXHRjb25zdHJ1Y3Rvcihkb2N4LGNoaWxkcmVuKXtcclxuXHRcdHRoaXMuZG9jeD1kb2N4XHJcblx0XHR0aGlzLmNoaWxkcmVuPWNoaWxkcmVufHxbXVxyXG5cdH1cclxuXHJcblx0YXNzZW1ibGUoZGF0YSl7XHJcblx0XHR0cnl7XHJcblx0XHRcdGxldCB0YXJnZXREb2M9dGhpcy5kb2N4LmNsb25lKClcclxuXHRcdFx0cmV0dXJuIHRoaXMuZW5naW5lKHRhcmdldERvYywgZGF0YSwgdGhpcy52YXJpYW50cywgdGFyZ2V0RG9jLm9mZmljZURvY3VtZW50LmNvbnRlbnQpXHJcblx0XHRcdFx0LnRoZW4oc3RhdGljRG9jPT57XHJcblx0XHRcdFx0XHRzdGF0aWNEb2Mub2ZmaWNlRG9jdW1lbnQuY29udGVudChgWyR7SUR9XWApLnJlbW92ZUF0dHIoSUQpXHJcblx0XHRcdFx0XHRyZXR1cm4gc3RhdGljRG9jXHJcblx0XHRcdFx0fSlcclxuXHRcdH1jYXRjaChlcnJvcil7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgdmFyaWFudHMoKXtcclxuXHRcdGZ1bmN0aW9uIHJlZHVjZShzdGF0ZSxuZXh0KXtcclxuXHRcdFx0c3RhdGVbbmV4dC5pZF09bmV4dFxyXG5cdFx0XHRpZihuZXh0LmNoaWxkcmVuKVxyXG5cdFx0XHRcdG5leHQuY2hpbGRyZW4ucmVkdWNlKHJlZHVjZSxzdGF0ZSlcclxuXHJcblx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB2YXJpYW50cz10aGlzLmNoaWxkcmVuLnJlZHVjZShyZWR1Y2Use30pXHJcblx0XHRyZXR1cm4gdmFyaWFudHNcclxuXHR9XHJcblxyXG5cdGdldCBlbmdpbmUoKXtcclxuXHRcdHJldHVybiBuZXcgRnVuY3Rpb24oXCJkb2N4LCBfXywgX192YXJpYW50cywgJFwiLHRoaXMuanMoKSlcclxuXHR9XHJcblxyXG5cdGpzKG9wdGlvbnM9e30pe1xyXG5cdFx0bGV0IGNvZGU9ZXNwcmltYS5wYXJzZShcIihhc3luYyBmdW5jdGlvbigpe30pKClcIilcclxuXHRcdGxldCBjb2RlQmxvY2s9Y29kZS5ib2R5WzBdLmV4cHJlc3Npb24uY2FsbGVlLmJvZHkuYm9keVxyXG5cdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKGE9PmNvZGVCbG9jay5wdXNoKGEuY29kZSkpXHJcblx0XHRjb2RlQmxvY2sucHVzaCh7XHJcblx0XHRcdFwidHlwZVwiOiBcIlJldHVyblN0YXRlbWVudFwiLFxyXG5cdFx0XHRcImFyZ3VtZW50XCI6IHtcclxuXHRcdFx0XHRcInR5cGVcIjogXCJJZGVudGlmaWVyXCIsXHJcblx0XHRcdFx0XCJuYW1lXCI6IFwiZG9jeFwiXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHRcclxuXHRcdGNvZGU9ZXNjb2RlZ2VuLmdlbmVyYXRlKGNvZGUsb3B0aW9ucylcclxuXHRcdFxyXG5cdFx0Y29kZT1iYWJlbC50cmFuc2Zvcm0oY29kZSx7cHJlc2V0czogW2VzMjAxNSwgZXMyMDE3XSxwbHVnaW5zOltdfSkuY29kZVxyXG5cdFx0Y29kZT1lc3ByaW1hLnBhcnNlKGNvZGUpXHJcblx0XHRsZXQgcmVzdWx0PWNvZGUuYm9keVsyXS5leHByZXNzaW9uXHJcblx0XHRjb2RlLmJvZHlbMl09e1xyXG5cdFx0XHR0eXBlOiBcIlJldHVyblN0YXRlbWVudFwiLFxyXG5cdFx0XHRhcmd1bWVudDogcmVzdWx0XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGNvZGU9ZXNjb2RlZ2VuLmdlbmVyYXRlKGNvZGUse30pXHJcblxyXG5cdFx0cmV0dXJuIGNvZGVcclxuXHR9XHJcblx0XHJcblx0dG9TdHJpbmcob3B0aW9ucyl7XHJcblx0XHRsZXQgY29kZT1lc3ByaW1hLnBhcnNlKFwiKGFzeW5jIGZ1bmN0aW9uKCl7fSkoKVwiKVxyXG5cdFx0bGV0IGNvZGVCbG9jaz1jb2RlLmJvZHlbMF0uZXhwcmVzc2lvbi5jYWxsZWUuYm9keS5ib2R5XHJcblx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goYT0+e1xyXG5cdFx0XHRpZihhLmNvbW1lbnQpe1xyXG5cdFx0XHRcdGEuY29kZS5sZWFkaW5nQ29tbWVudHM9W3tcclxuXHRcdFx0XHRcdHR5cGU6XCJCbG9ja1wiLFxyXG5cdFx0XHRcdFx0dmFsdWU6IGEuY29tbWVudFxyXG5cdFx0XHRcdH1dXHJcblx0XHRcdH1cclxuXHRcdFx0Y29kZUJsb2NrLnB1c2goYS5jb2RlKVxyXG5cdFx0fSlcclxuXHRcdGNvZGVCbG9jay5wdXNoKHtcclxuXHRcdFx0XCJ0eXBlXCI6IFwiUmV0dXJuU3RhdGVtZW50XCIsXHJcblx0XHRcdFwiYXJndW1lbnRcIjoge1xyXG5cdFx0XHRcdFwidHlwZVwiOiBcIklkZW50aWZpZXJcIixcclxuXHRcdFx0XHRcIm5hbWVcIjogXCJkb2N4XCJcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHRcdFxyXG5cdFx0Y29kZT1lc2NvZGVnZW4uZ2VuZXJhdGUoY29kZSxvcHRpb25zKVxyXG5cdFx0cmV0dXJuIGNvZGVcclxuXHR9XHJcbn1cclxuIl19