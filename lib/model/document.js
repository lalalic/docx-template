"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _esprima = require("esprima");

var _esprima2 = _interopRequireDefault(_esprima);

var _escodegen = require("escodegen");

var _escodegen2 = _interopRequireDefault(_escodegen);

var _variant = require("./variant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
				var done = [];
				var targetDoc = this.docx.clone();
				this.engine.call(targetDoc, data, this.variants, targetDoc.officeDocument.content, done);

				var clear = function clear() {
					targetDoc.officeDocument.content("[" + _variant.ID + "]").removeAttr(_variant.ID);
					return targetDoc;
				};

				return Promise.all(done).then(clear);
			} catch (error) {
				console.error(error);
			}
		}
	}, {
		key: "js",
		value: function js(options) {
			var code = _esprima2.default.parse("with(data){with(__variants){}}");
			var codeBlock = code.body[0].body.body[0].body.body;
			this.children.forEach(function (a) {
				return codeBlock.push(a.code);
			});

			return options == undefined ? code : _escodegen2.default.generate(code, options);
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
			var code = this.js({});
			return new Function("data={},__variants, $, __promises", code);
		}
	}]);

	return Document;
}();

exports.default = Document;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJEb2N1bWVudCIsImRvY3giLCJjaGlsZHJlbiIsImRhdGEiLCJkb25lIiwidGFyZ2V0RG9jIiwiY2xvbmUiLCJlbmdpbmUiLCJjYWxsIiwidmFyaWFudHMiLCJvZmZpY2VEb2N1bWVudCIsImNvbnRlbnQiLCJjbGVhciIsInJlbW92ZUF0dHIiLCJQcm9taXNlIiwiYWxsIiwidGhlbiIsImVycm9yIiwiY29uc29sZSIsIm9wdGlvbnMiLCJjb2RlIiwicGFyc2UiLCJjb2RlQmxvY2siLCJib2R5IiwiZm9yRWFjaCIsInB1c2giLCJhIiwidW5kZWZpbmVkIiwiZ2VuZXJhdGUiLCJyZWR1Y2UiLCJzdGF0ZSIsIm5leHQiLCJpZCIsImpzIiwiRnVuY3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUJBLFE7QUFDcEIsbUJBQVlDLElBQVosRUFBaUJDLFFBQWpCLEVBQTBCO0FBQUE7O0FBQ3pCLE9BQUtELElBQUwsR0FBVUEsSUFBVjtBQUNBLE9BQUtDLFFBQUwsR0FBY0EsWUFBVSxFQUF4QjtBQUNBOzs7OzJCQUVRQyxJLEVBQUs7QUFDYixPQUFHO0FBQ0YsUUFBSUMsT0FBSyxFQUFUO0FBQ0EsUUFBSUMsWUFBVSxLQUFLSixJQUFMLENBQVVLLEtBQVYsRUFBZDtBQUNBLFNBQUtDLE1BQUwsQ0FBWUMsSUFBWixDQUFpQkgsU0FBakIsRUFBNEJGLElBQTVCLEVBQWtDLEtBQUtNLFFBQXZDLEVBQWlESixVQUFVSyxjQUFWLENBQXlCQyxPQUExRSxFQUFtRlAsSUFBbkY7O0FBRUEsUUFBTVEsUUFBTSxTQUFOQSxLQUFNLEdBQUk7QUFDZlAsZUFBVUssY0FBVixDQUF5QkMsT0FBekIsMEJBQTRDRSxVQUE1QztBQUNBLFlBQU9SLFNBQVA7QUFDQSxLQUhEOztBQUtBLFdBQU9TLFFBQVFDLEdBQVIsQ0FBWVgsSUFBWixFQUFrQlksSUFBbEIsQ0FBdUJKLEtBQXZCLENBQVA7QUFDQSxJQVhELENBV0MsT0FBTUssS0FBTixFQUFZO0FBQ1pDLFlBQVFELEtBQVIsQ0FBY0EsS0FBZDtBQUNBO0FBQ0Q7OztxQkFvQkVFLE8sRUFBUTtBQUNWLE9BQUlDLE9BQUssa0JBQVFDLEtBQVIsQ0FBYyxnQ0FBZCxDQUFUO0FBQ0EsT0FBSUMsWUFBVUYsS0FBS0csSUFBTCxDQUFVLENBQVYsRUFBYUEsSUFBYixDQUFrQkEsSUFBbEIsQ0FBdUIsQ0FBdkIsRUFBMEJBLElBQTFCLENBQStCQSxJQUE3QztBQUNBLFFBQUtyQixRQUFMLENBQWNzQixPQUFkLENBQXNCO0FBQUEsV0FBR0YsVUFBVUcsSUFBVixDQUFlQyxFQUFFTixJQUFqQixDQUFIO0FBQUEsSUFBdEI7O0FBRUEsVUFBT0QsV0FBU1EsU0FBVCxHQUFxQlAsSUFBckIsR0FBNEIsb0JBQVVRLFFBQVYsQ0FBbUJSLElBQW5CLEVBQXdCRCxPQUF4QixDQUFuQztBQUNBOzs7c0JBeEJhO0FBQ2IsWUFBU1UsTUFBVCxDQUFnQkMsS0FBaEIsRUFBc0JDLElBQXRCLEVBQTJCO0FBQzFCRCxVQUFNQyxLQUFLQyxFQUFYLElBQWVELElBQWY7QUFDQSxRQUFHQSxLQUFLN0IsUUFBUixFQUNDNkIsS0FBSzdCLFFBQUwsQ0FBYzJCLE1BQWQsQ0FBcUJBLE1BQXJCLEVBQTRCQyxLQUE1Qjs7QUFFRCxXQUFPQSxLQUFQO0FBQ0E7O0FBRUQsT0FBSXJCLFdBQVMsS0FBS1AsUUFBTCxDQUFjMkIsTUFBZCxDQUFxQkEsTUFBckIsRUFBNEIsRUFBNUIsQ0FBYjtBQUNBLFVBQU9wQixRQUFQO0FBQ0E7OztzQkFFVztBQUNYLE9BQUlXLE9BQUssS0FBS2EsRUFBTCxDQUFRLEVBQVIsQ0FBVDtBQUNBLFVBQU8sSUFBSUMsUUFBSixDQUFhLG1DQUFiLEVBQWlEZCxJQUFqRCxDQUFQO0FBQ0E7Ozs7OztrQkF2Q21CcEIsUSIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBlc3ByaW1hIGZyb20gXCJlc3ByaW1hXCJcclxuaW1wb3J0IGVzY29kZWdlbiBmcm9tIFwiZXNjb2RlZ2VuXCJcclxuaW1wb3J0IHtJRH0gZnJvbSBcIi4vdmFyaWFudFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudHtcclxuXHRjb25zdHJ1Y3Rvcihkb2N4LGNoaWxkcmVuKXtcclxuXHRcdHRoaXMuZG9jeD1kb2N4XHJcblx0XHR0aGlzLmNoaWxkcmVuPWNoaWxkcmVufHxbXVxyXG5cdH1cclxuXHJcblx0YXNzZW1ibGUoZGF0YSl7XHJcblx0XHR0cnl7XHJcblx0XHRcdGxldCBkb25lPVtdXHJcblx0XHRcdGxldCB0YXJnZXREb2M9dGhpcy5kb2N4LmNsb25lKClcclxuXHRcdFx0dGhpcy5lbmdpbmUuY2FsbCh0YXJnZXREb2MsIGRhdGEsIHRoaXMudmFyaWFudHMsIHRhcmdldERvYy5vZmZpY2VEb2N1bWVudC5jb250ZW50LCBkb25lKVxyXG5cclxuXHRcdFx0Y29uc3QgY2xlYXI9KCk9PntcclxuXHRcdFx0XHR0YXJnZXREb2Mub2ZmaWNlRG9jdW1lbnQuY29udGVudChgWyR7SUR9XWApLnJlbW92ZUF0dHIoSUQpXHJcblx0XHRcdFx0cmV0dXJuIHRhcmdldERvY1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoZG9uZSkudGhlbihjbGVhcilcclxuXHRcdH1jYXRjaChlcnJvcil7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgdmFyaWFudHMoKXtcclxuXHRcdGZ1bmN0aW9uIHJlZHVjZShzdGF0ZSxuZXh0KXtcclxuXHRcdFx0c3RhdGVbbmV4dC5pZF09bmV4dFxyXG5cdFx0XHRpZihuZXh0LmNoaWxkcmVuKVxyXG5cdFx0XHRcdG5leHQuY2hpbGRyZW4ucmVkdWNlKHJlZHVjZSxzdGF0ZSlcclxuXHJcblx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB2YXJpYW50cz10aGlzLmNoaWxkcmVuLnJlZHVjZShyZWR1Y2Use30pXHJcblx0XHRyZXR1cm4gdmFyaWFudHNcclxuXHR9XHJcblxyXG5cdGdldCBlbmdpbmUoKXtcclxuXHRcdGxldCBjb2RlPXRoaXMuanMoe30pXHJcblx0XHRyZXR1cm4gbmV3IEZ1bmN0aW9uKFwiZGF0YT17fSxfX3ZhcmlhbnRzLCAkLCBfX3Byb21pc2VzXCIsY29kZSlcclxuXHR9XHJcblxyXG5cdGpzKG9wdGlvbnMpe1xyXG5cdFx0bGV0IGNvZGU9ZXNwcmltYS5wYXJzZShcIndpdGgoZGF0YSl7d2l0aChfX3ZhcmlhbnRzKXt9fVwiKVxyXG5cdFx0bGV0IGNvZGVCbG9jaz1jb2RlLmJvZHlbMF0uYm9keS5ib2R5WzBdLmJvZHkuYm9keVxyXG5cdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKGE9PmNvZGVCbG9jay5wdXNoKGEuY29kZSkpXHJcblxyXG5cdFx0cmV0dXJuIG9wdGlvbnM9PXVuZGVmaW5lZCA/IGNvZGUgOiBlc2NvZGVnZW4uZ2VuZXJhdGUoY29kZSxvcHRpb25zKVxyXG5cdH1cclxufVxyXG4iXX0=