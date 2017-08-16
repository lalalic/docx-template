"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _escodegen = require("escodegen");

var _escodegen2 = _interopRequireDefault(_escodegen);

var _variant = require("./variant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var esprima = require("esprima");
var babel = require("babel-core");

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

			code = babel.transform(code, { presets: ["es2015", "es2017"] }).code;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJlc3ByaW1hIiwicmVxdWlyZSIsImJhYmVsIiwiRG9jdW1lbnQiLCJkb2N4IiwiY2hpbGRyZW4iLCJkYXRhIiwidGFyZ2V0RG9jIiwiY2xvbmUiLCJlbmdpbmUiLCJ2YXJpYW50cyIsIm9mZmljZURvY3VtZW50IiwiY29udGVudCIsInRoZW4iLCJzdGF0aWNEb2MiLCJyZW1vdmVBdHRyIiwiZXJyb3IiLCJjb25zb2xlIiwib3B0aW9ucyIsImNvZGUiLCJwYXJzZSIsImNvZGVCbG9jayIsImJvZHkiLCJleHByZXNzaW9uIiwiY2FsbGVlIiwiZm9yRWFjaCIsInB1c2giLCJhIiwiZ2VuZXJhdGUiLCJ0cmFuc2Zvcm0iLCJwcmVzZXRzIiwicmVzdWx0IiwidHlwZSIsImFyZ3VtZW50IiwicmVkdWNlIiwic3RhdGUiLCJuZXh0IiwiaWQiLCJGdW5jdGlvbiIsImpzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUdBOzs7O0FBQ0E7Ozs7OztBQUpBLElBQU1BLFVBQVVDLFFBQVEsU0FBUixDQUFoQjtBQUNBLElBQU1DLFFBQVFELFFBQVEsWUFBUixDQUFkOztJQUtxQkUsUTtBQUNwQixtQkFBWUMsSUFBWixFQUFpQkMsUUFBakIsRUFBMEI7QUFBQTs7QUFDekIsT0FBS0QsSUFBTCxHQUFVQSxJQUFWO0FBQ0EsT0FBS0MsUUFBTCxHQUFjQSxZQUFVLEVBQXhCO0FBQ0E7Ozs7MkJBRVFDLEksRUFBSztBQUNiLE9BQUc7QUFDRixRQUFJQyxZQUFVLEtBQUtILElBQUwsQ0FBVUksS0FBVixFQUFkO0FBQ0EsV0FBTyxLQUFLQyxNQUFMLENBQVlGLFNBQVosRUFBdUJELElBQXZCLEVBQTZCLEtBQUtJLFFBQWxDLEVBQTRDSCxVQUFVSSxjQUFWLENBQXlCQyxPQUFyRSxFQUNMQyxJQURLLENBQ0EscUJBQVc7QUFDaEJDLGVBQVVILGNBQVYsQ0FBeUJDLE9BQXpCLDBCQUE0Q0csVUFBNUM7QUFDQSxZQUFPRCxTQUFQO0FBQ0EsS0FKSyxDQUFQO0FBS0EsSUFQRCxDQU9DLE9BQU1FLEtBQU4sRUFBWTtBQUNaQyxZQUFRRCxLQUFSLENBQWNBLEtBQWQ7QUFDQTtBQUNEOzs7dUJBbUJhO0FBQUEsT0FBWEUsT0FBVyx1RUFBSCxFQUFHOztBQUNiLE9BQUlDLE9BQUtuQixRQUFRb0IsS0FBUixDQUFjLHdCQUFkLENBQVQ7QUFDQSxPQUFJQyxZQUFVRixLQUFLRyxJQUFMLENBQVUsQ0FBVixFQUFhQyxVQUFiLENBQXdCQyxNQUF4QixDQUErQkYsSUFBL0IsQ0FBb0NBLElBQWxEO0FBQ0EsUUFBS2pCLFFBQUwsQ0FBY29CLE9BQWQsQ0FBc0I7QUFBQSxXQUFHSixVQUFVSyxJQUFWLENBQWVDLEVBQUVSLElBQWpCLENBQUg7QUFBQSxJQUF0QjtBQUNBRSxhQUFVSyxJQUFWLENBQWU7QUFDZCxZQUFRLGlCQURNO0FBRWQsZ0JBQVk7QUFDWCxhQUFRLFlBREc7QUFFWCxhQUFRO0FBRkc7QUFGRSxJQUFmOztBQVFBUCxVQUFLLG9CQUFVUyxRQUFWLENBQW1CVCxJQUFuQixFQUF3QkQsT0FBeEIsQ0FBTDs7QUFFQUMsVUFBS2pCLE1BQU0yQixTQUFOLENBQWdCVixJQUFoQixFQUFxQixFQUFDVyxTQUFTLENBQUMsUUFBRCxFQUFXLFFBQVgsQ0FBVixFQUFyQixFQUFzRFgsSUFBM0Q7QUFDQUEsVUFBS25CLFFBQVFvQixLQUFSLENBQWNELElBQWQsQ0FBTDtBQUNBLE9BQUlZLFNBQU9aLEtBQUtHLElBQUwsQ0FBVSxDQUFWLEVBQWFDLFVBQXhCO0FBQ0FKLFFBQUtHLElBQUwsQ0FBVSxDQUFWLElBQWE7QUFDWlUsVUFBTSxpQkFETTtBQUVaQyxjQUFVRjtBQUZFLElBQWI7QUFJQVosVUFBSyxvQkFBVVMsUUFBVixDQUFtQlQsSUFBbkIsRUFBd0IsRUFBeEIsQ0FBTDs7QUFFQSxVQUFPQSxJQUFQO0FBQ0E7OztzQkF6Q2E7QUFDYixZQUFTZSxNQUFULENBQWdCQyxLQUFoQixFQUFzQkMsSUFBdEIsRUFBMkI7QUFDMUJELFVBQU1DLEtBQUtDLEVBQVgsSUFBZUQsSUFBZjtBQUNBLFFBQUdBLEtBQUsvQixRQUFSLEVBQ0MrQixLQUFLL0IsUUFBTCxDQUFjNkIsTUFBZCxDQUFxQkEsTUFBckIsRUFBNEJDLEtBQTVCOztBQUVELFdBQU9BLEtBQVA7QUFDQTs7QUFFRCxPQUFJekIsV0FBUyxLQUFLTCxRQUFMLENBQWM2QixNQUFkLENBQXFCQSxNQUFyQixFQUE0QixFQUE1QixDQUFiO0FBQ0EsVUFBT3hCLFFBQVA7QUFDQTs7O3NCQUVXO0FBQ1gsVUFBTyxJQUFJNEIsUUFBSixDQUFhLHlCQUFiLEVBQXVDLEtBQUtDLEVBQUwsRUFBdkMsQ0FBUDtBQUNBOzs7Ozs7a0JBbENtQnBDLFEiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBlc3ByaW1hID0gcmVxdWlyZShcImVzcHJpbWFcIilcclxuY29uc3QgYmFiZWwgPSByZXF1aXJlKFwiYmFiZWwtY29yZVwiKVxyXG5cclxuaW1wb3J0IGVzY29kZWdlbiBmcm9tIFwiZXNjb2RlZ2VuXCJcclxuaW1wb3J0IHtJRH0gZnJvbSBcIi4vdmFyaWFudFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudHtcclxuXHRjb25zdHJ1Y3Rvcihkb2N4LGNoaWxkcmVuKXtcclxuXHRcdHRoaXMuZG9jeD1kb2N4XHJcblx0XHR0aGlzLmNoaWxkcmVuPWNoaWxkcmVufHxbXVxyXG5cdH1cclxuXHJcblx0YXNzZW1ibGUoZGF0YSl7XHJcblx0XHR0cnl7XHJcblx0XHRcdGxldCB0YXJnZXREb2M9dGhpcy5kb2N4LmNsb25lKClcclxuXHRcdFx0cmV0dXJuIHRoaXMuZW5naW5lKHRhcmdldERvYywgZGF0YSwgdGhpcy52YXJpYW50cywgdGFyZ2V0RG9jLm9mZmljZURvY3VtZW50LmNvbnRlbnQpXHJcblx0XHRcdFx0LnRoZW4oc3RhdGljRG9jPT57XHJcblx0XHRcdFx0XHRzdGF0aWNEb2Mub2ZmaWNlRG9jdW1lbnQuY29udGVudChgWyR7SUR9XWApLnJlbW92ZUF0dHIoSUQpXHJcblx0XHRcdFx0XHRyZXR1cm4gc3RhdGljRG9jXHJcblx0XHRcdFx0fSlcclxuXHRcdH1jYXRjaChlcnJvcil7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgdmFyaWFudHMoKXtcclxuXHRcdGZ1bmN0aW9uIHJlZHVjZShzdGF0ZSxuZXh0KXtcclxuXHRcdFx0c3RhdGVbbmV4dC5pZF09bmV4dFxyXG5cdFx0XHRpZihuZXh0LmNoaWxkcmVuKVxyXG5cdFx0XHRcdG5leHQuY2hpbGRyZW4ucmVkdWNlKHJlZHVjZSxzdGF0ZSlcclxuXHJcblx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB2YXJpYW50cz10aGlzLmNoaWxkcmVuLnJlZHVjZShyZWR1Y2Use30pXHJcblx0XHRyZXR1cm4gdmFyaWFudHNcclxuXHR9XHJcblxyXG5cdGdldCBlbmdpbmUoKXtcclxuXHRcdHJldHVybiBuZXcgRnVuY3Rpb24oXCJkb2N4LCBfXywgX192YXJpYW50cywgJFwiLHRoaXMuanMoKSlcclxuXHR9XHJcblxyXG5cdGpzKG9wdGlvbnM9e30pe1xyXG5cdFx0bGV0IGNvZGU9ZXNwcmltYS5wYXJzZShcIihhc3luYyBmdW5jdGlvbigpe30pKClcIilcclxuXHRcdGxldCBjb2RlQmxvY2s9Y29kZS5ib2R5WzBdLmV4cHJlc3Npb24uY2FsbGVlLmJvZHkuYm9keVxyXG5cdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKGE9PmNvZGVCbG9jay5wdXNoKGEuY29kZSkpXHJcblx0XHRjb2RlQmxvY2sucHVzaCh7XHJcblx0XHRcdFwidHlwZVwiOiBcIlJldHVyblN0YXRlbWVudFwiLFxyXG5cdFx0XHRcImFyZ3VtZW50XCI6IHtcclxuXHRcdFx0XHRcInR5cGVcIjogXCJJZGVudGlmaWVyXCIsXHJcblx0XHRcdFx0XCJuYW1lXCI6IFwiZG9jeFwiXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHRcclxuXHRcdGNvZGU9ZXNjb2RlZ2VuLmdlbmVyYXRlKGNvZGUsb3B0aW9ucylcclxuXHRcdFxyXG5cdFx0Y29kZT1iYWJlbC50cmFuc2Zvcm0oY29kZSx7cHJlc2V0czogW1wiZXMyMDE1XCIsIFwiZXMyMDE3XCJdfSkuY29kZVxyXG5cdFx0Y29kZT1lc3ByaW1hLnBhcnNlKGNvZGUpXHJcblx0XHRsZXQgcmVzdWx0PWNvZGUuYm9keVsyXS5leHByZXNzaW9uXHJcblx0XHRjb2RlLmJvZHlbMl09e1xyXG5cdFx0XHR0eXBlOiBcIlJldHVyblN0YXRlbWVudFwiLFxyXG5cdFx0XHRhcmd1bWVudDogcmVzdWx0XHJcblx0XHR9XHJcblx0XHRjb2RlPWVzY29kZWdlbi5nZW5lcmF0ZShjb2RlLHt9KVxyXG5cclxuXHRcdHJldHVybiBjb2RlXHJcblx0fVxyXG59XHJcbiJdfQ==