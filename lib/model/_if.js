"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _esprima = require("esprima");

var _esprima2 = _interopRequireDefault(_esprima);

var _variant = require("./variant");

var _variant2 = _interopRequireDefault(_variant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var If = function (_Variant) {
	_inherits(If, _Variant);

	function If() {
		_classCallCheck(this, If);

		var _this = _possibleConstructorReturn(this, (If.__proto__ || Object.getPrototypeOf(If)).apply(this, arguments));

		var codeBlock = _this.code.body[0].consequent.body;
		while (!Array.isArray(codeBlock)) {
			//if()with(){}
			codeBlock = codeBlock.body;
		}
		var _esprima$parse$body$ = _esprima2.default.parse("\n\t\t\tif(a){\n\t\t\t\t" + _this.id + ".assemble(this, $('#" + _this.id + "'),true)\n\t\t\t}else{\n\t\t\t\t" + _this.id + ".assemble(this, $('#" + _this.id + "'),false)\n\t\t\t}\n\t\t").body[0],
		    consequent = _esprima$parse$body$.consequent,
		    alternate = _esprima$parse$body$.alternate;

		codeBlock.push(consequent.body[0]);
		_this.children.forEach(function (a) {
			return codeBlock.push(a.code);
		});

		_this.code.body[0].alternate = alternate;
		return _this;
	}

	_createClass(If, [{
		key: "assemble",
		value: function assemble(docx, node, satified) {
			if (!satified) node.remove();
		}
	}]);

	return If;
}(_variant2.default);

If.type = "variant.if";
exports.default = If;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9faWYuanMiXSwibmFtZXMiOlsiSWYiLCJhcmd1bWVudHMiLCJjb2RlQmxvY2siLCJjb2RlIiwiYm9keSIsImNvbnNlcXVlbnQiLCJBcnJheSIsImlzQXJyYXkiLCJwYXJzZSIsImlkIiwiYWx0ZXJuYXRlIiwicHVzaCIsImNoaWxkcmVuIiwiZm9yRWFjaCIsImEiLCJkb2N4Iiwibm9kZSIsInNhdGlmaWVkIiwicmVtb3ZlIiwidHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEU7OztBQUdwQixlQUFhO0FBQUE7O0FBQUEsdUdBQ0hDLFNBREc7O0FBR1osTUFBSUMsWUFBVSxNQUFLQyxJQUFMLENBQVVDLElBQVYsQ0FBZSxDQUFmLEVBQWtCQyxVQUFsQixDQUE2QkQsSUFBM0M7QUFDQSxTQUFNLENBQUNFLE1BQU1DLE9BQU4sQ0FBY0wsU0FBZCxDQUFQO0FBQWdDO0FBQy9CQSxlQUFVQSxVQUFVRSxJQUFwQjtBQUREO0FBSlksNkJBT2lCLGtCQUFRSSxLQUFSLDhCQUV6QixNQUFLQyxFQUZvQiw0QkFFSyxNQUFLQSxFQUZWLHdDQUl6QixNQUFLQSxFQUpvQiw0QkFJSyxNQUFLQSxFQUpWLCtCQU0xQkwsSUFOMEIsQ0FNckIsQ0FOcUIsQ0FQakI7QUFBQSxNQU9MQyxVQVBLLHdCQU9MQSxVQVBLO0FBQUEsTUFPTUssU0FQTix3QkFPTUEsU0FQTjs7QUFlWlIsWUFBVVMsSUFBVixDQUFlTixXQUFXRCxJQUFYLENBQWdCLENBQWhCLENBQWY7QUFDQSxRQUFLUSxRQUFMLENBQWNDLE9BQWQsQ0FBc0I7QUFBQSxVQUFHWCxVQUFVUyxJQUFWLENBQWVHLEVBQUVYLElBQWpCLENBQUg7QUFBQSxHQUF0Qjs7QUFFQSxRQUFLQSxJQUFMLENBQVVDLElBQVYsQ0FBZSxDQUFmLEVBQWtCTSxTQUFsQixHQUE0QkEsU0FBNUI7QUFsQlk7QUFtQlo7Ozs7MkJBRVFLLEksRUFBTUMsSSxFQUFNQyxRLEVBQVM7QUFDN0IsT0FBRyxDQUFDQSxRQUFKLEVBQ0NELEtBQUtFLE1BQUw7QUFDRDs7Ozs7O0FBM0JtQmxCLEUsQ0FDYm1CLEksR0FBSyxZO2tCQURRbkIsRSIsImZpbGUiOiJfaWYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXNwcmltYSBmcm9tIFwiZXNwcmltYVwiXHJcbmltcG9ydCBWYXJpYW50IGZyb20gXCIuL3ZhcmlhbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWYgZXh0ZW5kcyBWYXJpYW50e1xyXG5cdHN0YXRpYyB0eXBlPVwidmFyaWFudC5pZlwiXHJcblxyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblxyXG5cdFx0bGV0IGNvZGVCbG9jaz10aGlzLmNvZGUuYm9keVswXS5jb25zZXF1ZW50LmJvZHlcclxuXHRcdHdoaWxlKCFBcnJheS5pc0FycmF5KGNvZGVCbG9jaykpLy9pZigpd2l0aCgpe31cclxuXHRcdFx0Y29kZUJsb2NrPWNvZGVCbG9jay5ib2R5XHJcblxyXG5cdFx0Y29uc3Qge2NvbnNlcXVlbnQsYWx0ZXJuYXRlfT1lc3ByaW1hLnBhcnNlKGBcclxuXHRcdFx0aWYoYSl7XHJcblx0XHRcdFx0JHt0aGlzLmlkfS5hc3NlbWJsZSh0aGlzLCAkKCcjJHt0aGlzLmlkfScpLHRydWUpXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdCR7dGhpcy5pZH0uYXNzZW1ibGUodGhpcywgJCgnIyR7dGhpcy5pZH0nKSxmYWxzZSlcclxuXHRcdFx0fVxyXG5cdFx0YCkuYm9keVswXVxyXG5cclxuXHRcdGNvZGVCbG9jay5wdXNoKGNvbnNlcXVlbnQuYm9keVswXSlcclxuXHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaChhPT5jb2RlQmxvY2sucHVzaChhLmNvZGUpKVxyXG5cclxuXHRcdHRoaXMuY29kZS5ib2R5WzBdLmFsdGVybmF0ZT1hbHRlcm5hdGVcclxuXHR9XHJcblxyXG5cdGFzc2VtYmxlKGRvY3gsIG5vZGUsIHNhdGlmaWVkKXtcclxuXHRcdGlmKCFzYXRpZmllZClcclxuXHRcdFx0bm9kZS5yZW1vdmUoKVxyXG5cdH1cclxufVxyXG4iXX0=