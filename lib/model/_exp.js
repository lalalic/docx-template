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

var Expression = function (_Variant) {
	_inherits(Expression, _Variant);

	function Expression() {
		_classCallCheck(this, Expression);

		var _this = _possibleConstructorReturn(this, (Expression.__proto__ || Object.getPrototypeOf(Expression)).apply(this, arguments));

		var exp = _this.code.body[0].expression;
		_this.code = _esprima2.default.parse(_this.id + ".assemble(this,$('#" + _this.id + "'))").body[0];
		_this.code.expression.arguments.push(exp);
		return _this;
	}

	_createClass(Expression, [{
		key: "assemble",
		value: function assemble(docx, node, value) {
			if (value === null || value === undefined || value === '') {
				node.remove();
			} else {
				node.find('w\\:t').remove(function (i) {
					return i != 0;
				}).first().text(value);
			}
		}
	}]);

	return Expression;
}(_variant2.default);

Expression.type = "variant.exp";
exports.default = Expression;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fZXhwLmpzIl0sIm5hbWVzIjpbIkV4cHJlc3Npb24iLCJhcmd1bWVudHMiLCJleHAiLCJjb2RlIiwiYm9keSIsImV4cHJlc3Npb24iLCJwYXJzZSIsImlkIiwicHVzaCIsImRvY3giLCJub2RlIiwidmFsdWUiLCJ1bmRlZmluZWQiLCJyZW1vdmUiLCJmaW5kIiwiaSIsImZpcnN0IiwidGV4dCIsInR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxVOzs7QUFHcEIsdUJBQWE7QUFBQTs7QUFBQSx1SEFDSEMsU0FERzs7QUFFWixNQUFJQyxNQUFJLE1BQUtDLElBQUwsQ0FBVUMsSUFBVixDQUFlLENBQWYsRUFBa0JDLFVBQTFCO0FBQ0EsUUFBS0YsSUFBTCxHQUFVLGtCQUFRRyxLQUFSLENBQWlCLE1BQUtDLEVBQXRCLDJCQUE4QyxNQUFLQSxFQUFuRCxVQUE0REgsSUFBNUQsQ0FBaUUsQ0FBakUsQ0FBVjtBQUNBLFFBQUtELElBQUwsQ0FBVUUsVUFBVixDQUFxQkosU0FBckIsQ0FBK0JPLElBQS9CLENBQW9DTixHQUFwQztBQUpZO0FBS1o7Ozs7MkJBRVFPLEksRUFBTUMsSSxFQUFNQyxLLEVBQU07QUFDMUIsT0FBR0EsVUFBUSxJQUFSLElBQWdCQSxVQUFRQyxTQUF4QixJQUFxQ0QsVUFBUSxFQUFoRCxFQUFtRDtBQUNsREQsU0FBS0csTUFBTDtBQUNBLElBRkQsTUFFSztBQUNKSCxTQUFLSSxJQUFMLENBQVUsT0FBVixFQUFtQkQsTUFBbkIsQ0FBMEI7QUFBQSxZQUFHRSxLQUFHLENBQU47QUFBQSxLQUExQixFQUFtQ0MsS0FBbkMsR0FBMkNDLElBQTNDLENBQWdETixLQUFoRDtBQUNBO0FBRUQ7Ozs7OztBQWpCbUJYLFUsQ0FDYmtCLEksR0FBSyxhO2tCQURRbEIsVSIsImZpbGUiOiJfZXhwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGVzcHJpbWEgZnJvbSBcImVzcHJpbWFcIlxyXG5pbXBvcnQgVmFyaWFudCBmcm9tIFwiLi92YXJpYW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4cHJlc3Npb24gZXh0ZW5kcyBWYXJpYW50e1xyXG5cdHN0YXRpYyB0eXBlPVwidmFyaWFudC5leHBcIlxyXG5cclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0bGV0IGV4cD10aGlzLmNvZGUuYm9keVswXS5leHByZXNzaW9uXHJcblx0XHR0aGlzLmNvZGU9ZXNwcmltYS5wYXJzZShgJHt0aGlzLmlkfS5hc3NlbWJsZSh0aGlzLCQoJyMke3RoaXMuaWR9JykpYCkuYm9keVswXVxyXG5cdFx0dGhpcy5jb2RlLmV4cHJlc3Npb24uYXJndW1lbnRzLnB1c2goZXhwKVxyXG5cdH1cclxuXHJcblx0YXNzZW1ibGUoZG9jeCwgbm9kZSwgdmFsdWUpe1xyXG5cdFx0aWYodmFsdWU9PT1udWxsIHx8IHZhbHVlPT09dW5kZWZpbmVkIHx8IHZhbHVlPT09Jycpe1xyXG5cdFx0XHRub2RlLnJlbW92ZSgpXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0bm9kZS5maW5kKCd3XFxcXDp0JykucmVtb3ZlKGk9PmkhPTApLmZpcnN0KCkudGV4dCh2YWx1ZSlcclxuXHRcdH1cclxuXHRcdFxyXG5cdH1cclxufVxyXG4iXX0=