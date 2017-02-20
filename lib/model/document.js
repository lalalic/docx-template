"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _esprima = require("esprima");

var _esprima2 = _interopRequireDefault(_esprima);

var _escodegen = require("escodegen");

var _escodegen2 = _interopRequireDefault(_escodegen);

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
			var $ = this.docx.officeDocument.content;
			try {
				var targetDoc = this.docx.clone();
				this.engine.call(targetDoc, data, this.variants, targetDoc.officeDocument.content);
				return targetDoc;
			} catch (error) {
				console.error(error);
			}
		}
	}, {
		key: "js",
		value: function js(options) {
			var code = _esprima2.default.parse("with(data){with(variants){}}");
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
			return new Function("data={},variants, $, _safe", code);
		}
	}]);

	return Document;
}();

exports.default = Document;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJEb2N1bWVudCIsImRvY3giLCJjaGlsZHJlbiIsImRhdGEiLCIkIiwib2ZmaWNlRG9jdW1lbnQiLCJjb250ZW50IiwidGFyZ2V0RG9jIiwiY2xvbmUiLCJlbmdpbmUiLCJjYWxsIiwidmFyaWFudHMiLCJlcnJvciIsImNvbnNvbGUiLCJvcHRpb25zIiwiY29kZSIsInBhcnNlIiwiY29kZUJsb2NrIiwiYm9keSIsImZvckVhY2giLCJwdXNoIiwiYSIsInVuZGVmaW5lZCIsImdlbmVyYXRlIiwicmVkdWNlIiwic3RhdGUiLCJuZXh0IiwiaWQiLCJqcyIsIkZ1bmN0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCQSxRO0FBQ3BCLG1CQUFZQyxJQUFaLEVBQWlCQyxRQUFqQixFQUEwQjtBQUFBOztBQUN6QixPQUFLRCxJQUFMLEdBQVVBLElBQVY7QUFDQSxPQUFLQyxRQUFMLEdBQWNBLFlBQVUsRUFBeEI7QUFDQTs7OzsyQkFFUUMsSSxFQUFLO0FBQ2IsT0FBSUMsSUFBRSxLQUFLSCxJQUFMLENBQVVJLGNBQVYsQ0FBeUJDLE9BQS9CO0FBQ0EsT0FBRztBQUNGLFFBQUlDLFlBQVUsS0FBS04sSUFBTCxDQUFVTyxLQUFWLEVBQWQ7QUFDQSxTQUFLQyxNQUFMLENBQVlDLElBQVosQ0FBaUJILFNBQWpCLEVBQTRCSixJQUE1QixFQUFrQyxLQUFLUSxRQUF2QyxFQUFpREosVUFBVUYsY0FBVixDQUF5QkMsT0FBMUU7QUFDQSxXQUFPQyxTQUFQO0FBQ0EsSUFKRCxDQUlDLE9BQU1LLEtBQU4sRUFBWTtBQUNaQyxZQUFRRCxLQUFSLENBQWNBLEtBQWQ7QUFDQTtBQUNEOzs7cUJBb0JFRSxPLEVBQVE7QUFDVixPQUFJQyxPQUFLLGtCQUFRQyxLQUFSLENBQWMsOEJBQWQsQ0FBVDtBQUNBLE9BQUlDLFlBQVVGLEtBQUtHLElBQUwsQ0FBVSxDQUFWLEVBQWFBLElBQWIsQ0FBa0JBLElBQWxCLENBQXVCLENBQXZCLEVBQTBCQSxJQUExQixDQUErQkEsSUFBN0M7QUFDQSxRQUFLaEIsUUFBTCxDQUFjaUIsT0FBZCxDQUFzQjtBQUFBLFdBQUdGLFVBQVVHLElBQVYsQ0FBZUMsRUFBRU4sSUFBakIsQ0FBSDtBQUFBLElBQXRCOztBQUVBLFVBQU9ELFdBQVNRLFNBQVQsR0FBcUJQLElBQXJCLEdBQTRCLG9CQUFVUSxRQUFWLENBQW1CUixJQUFuQixFQUF3QkQsT0FBeEIsQ0FBbkM7QUFDQTs7O3NCQXhCYTtBQUNiLFlBQVNVLE1BQVQsQ0FBZ0JDLEtBQWhCLEVBQXNCQyxJQUF0QixFQUEyQjtBQUMxQkQsVUFBTUMsS0FBS0MsRUFBWCxJQUFlRCxJQUFmO0FBQ0EsUUFBR0EsS0FBS3hCLFFBQVIsRUFDQ3dCLEtBQUt4QixRQUFMLENBQWNzQixNQUFkLENBQXFCQSxNQUFyQixFQUE0QkMsS0FBNUI7O0FBRUQsV0FBT0EsS0FBUDtBQUNBOztBQUVELE9BQUlkLFdBQVMsS0FBS1QsUUFBTCxDQUFjc0IsTUFBZCxDQUFxQkEsTUFBckIsRUFBNEIsRUFBNUIsQ0FBYjtBQUNBLFVBQU9iLFFBQVA7QUFDQTs7O3NCQUVXO0FBQ1gsT0FBSUksT0FBSyxLQUFLYSxFQUFMLENBQVEsRUFBUixDQUFUO0FBQ0EsVUFBTyxJQUFJQyxRQUFKLENBQWEsNEJBQWIsRUFBMENkLElBQTFDLENBQVA7QUFDQTs7Ozs7O2tCQWpDbUJmLFEiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXNwcmltYSBmcm9tIFwiZXNwcmltYVwiXHJcbmltcG9ydCBlc2NvZGVnZW4gZnJvbSBcImVzY29kZWdlblwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudHtcclxuXHRjb25zdHJ1Y3Rvcihkb2N4LGNoaWxkcmVuKXtcclxuXHRcdHRoaXMuZG9jeD1kb2N4XHJcblx0XHR0aGlzLmNoaWxkcmVuPWNoaWxkcmVufHxbXVxyXG5cdH1cclxuXHJcblx0YXNzZW1ibGUoZGF0YSl7XHJcblx0XHRsZXQgJD10aGlzLmRvY3gub2ZmaWNlRG9jdW1lbnQuY29udGVudFxyXG5cdFx0dHJ5e1xyXG5cdFx0XHRsZXQgdGFyZ2V0RG9jPXRoaXMuZG9jeC5jbG9uZSgpXHJcblx0XHRcdHRoaXMuZW5naW5lLmNhbGwodGFyZ2V0RG9jLCBkYXRhLCB0aGlzLnZhcmlhbnRzLCB0YXJnZXREb2Mub2ZmaWNlRG9jdW1lbnQuY29udGVudClcclxuXHRcdFx0cmV0dXJuIHRhcmdldERvY1xyXG5cdFx0fWNhdGNoKGVycm9yKXtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcilcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldCB2YXJpYW50cygpe1xyXG5cdFx0ZnVuY3Rpb24gcmVkdWNlKHN0YXRlLG5leHQpe1xyXG5cdFx0XHRzdGF0ZVtuZXh0LmlkXT1uZXh0XHJcblx0XHRcdGlmKG5leHQuY2hpbGRyZW4pXHJcblx0XHRcdFx0bmV4dC5jaGlsZHJlbi5yZWR1Y2UocmVkdWNlLHN0YXRlKVxyXG5cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHZhcmlhbnRzPXRoaXMuY2hpbGRyZW4ucmVkdWNlKHJlZHVjZSx7fSlcclxuXHRcdHJldHVybiB2YXJpYW50c1xyXG5cdH1cclxuXHJcblx0Z2V0IGVuZ2luZSgpe1xyXG5cdFx0bGV0IGNvZGU9dGhpcy5qcyh7fSlcclxuXHRcdHJldHVybiBuZXcgRnVuY3Rpb24oXCJkYXRhPXt9LHZhcmlhbnRzLCAkLCBfc2FmZVwiLGNvZGUpXHJcblx0fVxyXG5cclxuXHRqcyhvcHRpb25zKXtcclxuXHRcdGxldCBjb2RlPWVzcHJpbWEucGFyc2UoXCJ3aXRoKGRhdGEpe3dpdGgodmFyaWFudHMpe319XCIpXHJcblx0XHRsZXQgY29kZUJsb2NrPWNvZGUuYm9keVswXS5ib2R5LmJvZHlbMF0uYm9keS5ib2R5XHJcblx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goYT0+Y29kZUJsb2NrLnB1c2goYS5jb2RlKSlcclxuXHJcblx0XHRyZXR1cm4gb3B0aW9ucz09dW5kZWZpbmVkID8gY29kZSA6IGVzY29kZWdlbi5nZW5lcmF0ZShjb2RlLG9wdGlvbnMpXHJcblx0fVxyXG59XHJcbiJdfQ==