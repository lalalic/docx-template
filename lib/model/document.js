"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _babelPresetEs = require("babel-preset-es2015");

var _babelPresetEs2 = _interopRequireDefault(_babelPresetEs);

var _babelPresetEs3 = require("babel-preset-es2017");

var _babelPresetEs4 = _interopRequireDefault(_babelPresetEs3);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJlc3ByaW1hIiwicmVxdWlyZSIsImJhYmVsIiwiRG9jdW1lbnQiLCJkb2N4IiwiY2hpbGRyZW4iLCJkYXRhIiwidGFyZ2V0RG9jIiwiY2xvbmUiLCJlbmdpbmUiLCJ2YXJpYW50cyIsIm9mZmljZURvY3VtZW50IiwiY29udGVudCIsInRoZW4iLCJzdGF0aWNEb2MiLCJyZW1vdmVBdHRyIiwiZXJyb3IiLCJjb25zb2xlIiwib3B0aW9ucyIsImNvZGUiLCJwYXJzZSIsImNvZGVCbG9jayIsImJvZHkiLCJleHByZXNzaW9uIiwiY2FsbGVlIiwiZm9yRWFjaCIsInB1c2giLCJhIiwiZ2VuZXJhdGUiLCJ0cmFuc2Zvcm0iLCJwcmVzZXRzIiwicGx1Z2lucyIsInJlc3VsdCIsInR5cGUiLCJhcmd1bWVudCIsImNvbW1lbnQiLCJsZWFkaW5nQ29tbWVudHMiLCJ2YWx1ZSIsInJlZHVjZSIsInN0YXRlIiwibmV4dCIsImlkIiwiRnVuY3Rpb24iLCJqcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBTkEsSUFBTUEsVUFBVUMsUUFBUSxTQUFSLENBQWhCO0FBQ0EsSUFBTUMsUUFBUUQsUUFBUSxZQUFSLENBQWQ7O0lBT3FCRSxRO0FBQ3BCLG1CQUFZQyxJQUFaLEVBQWlCQyxRQUFqQixFQUEwQjtBQUFBOztBQUN6QixPQUFLRCxJQUFMLEdBQVVBLElBQVY7QUFDQSxPQUFLQyxRQUFMLEdBQWNBLFlBQVUsRUFBeEI7QUFDQTs7OzsyQkFFUUMsSSxFQUFLO0FBQ2IsT0FBRztBQUNGLFFBQUlDLFlBQVUsS0FBS0gsSUFBTCxDQUFVSSxLQUFWLEVBQWQ7QUFDQSxXQUFPLEtBQUtDLE1BQUwsQ0FBWUYsU0FBWixFQUF1QkQsSUFBdkIsRUFBNkIsS0FBS0ksUUFBbEMsRUFBNENILFVBQVVJLGNBQVYsQ0FBeUJDLE9BQXJFLEVBQ0xDLElBREssQ0FD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USIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGVzcHJpbWEgPSByZXF1aXJlKFwiZXNwcmltYVwiKVxyXG5jb25zdCBiYWJlbCA9IHJlcXVpcmUoXCJiYWJlbC1jb3JlXCIpXHJcbmltcG9ydCBlczIwMTUgZnJvbSBcImJhYmVsLXByZXNldC1lczIwMTVcIlxyXG5pbXBvcnQgZXMyMDE3IGZyb20gXCJiYWJlbC1wcmVzZXQtZXMyMDE3XCJcclxuXHJcbmltcG9ydCBlc2NvZGVnZW4gZnJvbSBcImVzY29kZWdlblwiXHJcbmltcG9ydCB7SUR9IGZyb20gXCIuL3ZhcmlhbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnR7XHJcblx0Y29uc3RydWN0b3IoZG9jeCxjaGlsZHJlbil7XHJcblx0XHR0aGlzLmRvY3g9ZG9jeFxyXG5cdFx0dGhpcy5jaGlsZHJlbj1jaGlsZHJlbnx8W11cclxuXHR9XHJcblxyXG5cdGFzc2VtYmxlKGRhdGEpe1xyXG5cdFx0dHJ5e1xyXG5cdFx0XHRsZXQgdGFyZ2V0RG9jPXRoaXMuZG9jeC5jbG9uZSgpXHJcblx0XHRcdHJldHVybiB0aGlzLmVuZ2luZSh0YXJnZXREb2MsIGRhdGEsIHRoaXMudmFyaWFudHMsIHRhcmdldERvYy5vZmZpY2VEb2N1bWVudC5jb250ZW50KVxyXG5cdFx0XHRcdC50aGVuKHN0YXRpY0RvYz0+e1xyXG5cdFx0XHRcdFx0c3RhdGljRG9jLm9mZmljZURvY3VtZW50LmNvbnRlbnQoYFske0lEfV1gKS5yZW1vdmVBdHRyKElEKVxyXG5cdFx0XHRcdFx0cmV0dXJuIHN0YXRpY0RvY1xyXG5cdFx0XHRcdH0pXHJcblx0XHR9Y2F0Y2goZXJyb3Ipe1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0IHZhcmlhbnRzKCl7XHJcblx0XHRmdW5jdGlvbiByZWR1Y2Uoc3RhdGUsbmV4dCl7XHJcblx0XHRcdHN0YXRlW25leHQuaWRdPW5leHRcclxuXHRcdFx0aWYobmV4dC5jaGlsZHJlbilcclxuXHRcdFx0XHRuZXh0LmNoaWxkcmVuLnJlZHVjZShyZWR1Y2Usc3RhdGUpXHJcblxyXG5cdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgdmFyaWFudHM9dGhpcy5jaGlsZHJlbi5yZWR1Y2UocmVkdWNlLHt9KVxyXG5cdFx0cmV0dXJuIHZhcmlhbnRzXHJcblx0fVxyXG5cclxuXHRnZXQgZW5naW5lKCl7XHJcblx0XHRyZXR1cm4gbmV3IEZ1bmN0aW9uKFwiZG9jeCwgX18sIF9fdmFyaWFudHMsICRcIix0aGlzLmpzKCkpXHJcblx0fVxyXG5cclxuXHRqcyhvcHRpb25zPXt9KXtcclxuXHRcdGxldCBjb2RlPWVzcHJpbWEucGFyc2UoXCIoYXN5bmMgZnVuY3Rpb24oKXt9KSgpXCIpXHJcblx0XHRsZXQgY29kZUJsb2NrPWNvZGUuYm9keVswXS5leHByZXNzaW9uLmNhbGxlZS5ib2R5LmJvZHlcclxuXHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaChhPT5jb2RlQmxvY2sucHVzaChhLmNvZGUpKVxyXG5cdFx0Y29kZUJsb2NrLnB1c2goe1xyXG5cdFx0XHRcInR5cGVcIjogXCJSZXR1cm5TdGF0ZW1lbnRcIixcclxuXHRcdFx0XCJhcmd1bWVudFwiOiB7XHJcblx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFwibmFtZVwiOiBcImRvY3hcIlxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0XHJcblx0XHRjb2RlPWVzY29kZWdlbi5nZW5lcmF0ZShjb2RlLG9wdGlvbnMpXHJcblx0XHRcclxuXHRcdGNvZGU9YmFiZWwudHJhbnNmb3JtKGNvZGUse3ByZXNldHM6IFtlczIwMTUsIGVzMjAxN10scGx1Z2luczpbXX0pLmNvZGVcclxuXHRcdGNvZGU9ZXNwcmltYS5wYXJzZShjb2RlKVxyXG5cdFx0bGV0IHJlc3VsdD1jb2RlLmJvZHlbMl0uZXhwcmVzc2lvblxyXG5cdFx0Y29kZS5ib2R5WzJdPXtcclxuXHRcdFx0dHlwZTogXCJSZXR1cm5TdGF0ZW1lbnRcIixcclxuXHRcdFx0YXJndW1lbnQ6IHJlc3VsdFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRjb2RlPWVzY29kZWdlbi5nZW5lcmF0ZShjb2RlLHt9KVxyXG5cclxuXHRcdHJldHVybiBjb2RlXHJcblx0fVxyXG5cdFxyXG5cdHRvU3RyaW5nKG9wdGlvbnMpe1xyXG5cdFx0bGV0IGNvZGU9ZXNwcmltYS5wYXJzZShcIihhc3luYyBmdW5jdGlvbigpe30pKClcIilcclxuXHRcdGxldCBjb2RlQmxvY2s9Y29kZS5ib2R5WzBdLmV4cHJlc3Npb24uY2FsbGVlLmJvZHkuYm9keVxyXG5cdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKGE9PntcclxuXHRcdFx0aWYoYS5jb21tZW50KXtcclxuXHRcdFx0XHRhLmNvZGUubGVhZGluZ0NvbW1lbnRzPVt7XHJcblx0XHRcdFx0XHR0eXBlOlwiQmxvY2tcIixcclxuXHRcdFx0XHRcdHZhbHVlOiBhLmNvbW1lbnRcclxuXHRcdFx0XHR9XVxyXG5cdFx0XHR9XHJcblx0XHRcdGNvZGVCbG9jay5wdXNoKGEuY29kZSlcclxuXHRcdH0pXHJcblx0XHRjb2RlQmxvY2sucHVzaCh7XHJcblx0XHRcdFwidHlwZVwiOiBcIlJldHVyblN0YXRlbWVudFwiLFxyXG5cdFx0XHRcImFyZ3VtZW50XCI6IHtcclxuXHRcdFx0XHRcInR5cGVcIjogXCJJZGVudGlmaWVyXCIsXHJcblx0XHRcdFx0XCJuYW1lXCI6IFwiZG9jeFwiXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHRcclxuXHRcdGNvZGU9ZXNjb2RlZ2VuLmdlbmVyYXRlKGNvZGUsb3B0aW9ucylcclxuXHRcdHJldHVybiBjb2RlXHJcblx0fVxyXG59XHJcbiJdfQ==