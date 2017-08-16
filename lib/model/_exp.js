"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _escodegen = require("escodegen");

var _escodegen2 = _interopRequireDefault(_escodegen);

var _variant = require("./variant");

var _variant2 = _interopRequireDefault(_variant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var esprima = require("esprima");

var Expression = function (_Variant) {
	_inherits(Expression, _Variant);

	function Expression() {
		_classCallCheck(this, Expression);

		var _this = _possibleConstructorReturn(this, (Expression.__proto__ || Object.getPrototypeOf(Expression)).apply(this, arguments));

		var exp = _this.code.body[0].expression;
		_this.code = esprima.parse(_this.object + ".assemble(docx,$('" + _this.selector + "'))").body[0];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fZXhwLmpzIl0sIm5hbWVzIjpbImVzcHJpbWEiLCJyZXF1aXJlIiwiRXhwcmVzc2lvbiIsImFyZ3VtZW50cyIsImV4cCIsImNvZGUiLCJib2R5IiwiZXhwcmVzc2lvbiIsInBhcnNlIiwib2JqZWN0Iiwic2VsZWN0b3IiLCJwdXNoIiwiZG9jeCIsIm5vZGUiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsInJlbW92ZSIsImZpbmQiLCJpIiwiZmlyc3QiLCJ0ZXh0IiwidHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFGQSxJQUFNQSxVQUFRQyxRQUFRLFNBQVIsQ0FBZDs7SUFJcUJDLFU7OztBQUdwQix1QkFBYTtBQUFBOztBQUFBLHVIQUNIQyxTQURHOztBQUVaLE1BQUlDLE1BQUksTUFBS0MsSUFBTCxDQUFVQyxJQUFWLENBQWUsQ0FBZixFQUFrQkMsVUFBMUI7QUFDQSxRQUFLRixJQUFMLEdBQVVMLFFBQVFRLEtBQVIsQ0FBaUIsTUFBS0MsTUFBdEIsMEJBQWlELE1BQUtDLFFBQXRELFVBQXFFSixJQUFyRSxDQUEwRSxDQUExRSxDQUFWO0FBQ0EsUUFBS0QsSUFBTCxDQUFVRSxVQUFWLENBQXFCSixTQUFyQixDQUErQlEsSUFBL0IsQ0FBb0NQLEdBQXBDO0FBSlk7QUFLWjs7OzsyQkFFUVEsSSxFQUFNQyxJLEVBQU1DLEssRUFBTTtBQUMxQixPQUFHQSxVQUFRLElBQVIsSUFBZ0JBLFVBQVFDLFNBQXhCLElBQXFDRCxVQUFRLEVBQWhELEVBQW1EO0FBQ2xERCxTQUFLRyxNQUFMO0FBQ0EsSUFGRCxNQUVLO0FBQ0pILFNBQUtJLElBQUwsQ0FBVSxPQUFWLEVBQW1CRCxNQUFuQixDQUEwQjtBQUFBLFlBQUdFLEtBQUcsQ0FBTjtBQUFBLEtBQTFCLEVBQW1DQyxLQUFuQyxHQUEyQ0MsSUFBM0MsQ0FBZ0ROLEtBQWhEO0FBQ0E7QUFDRDs7Ozs7O0FBaEJtQlosVSxDQUNibUIsSSxHQUFLLGE7a0JBRFFuQixVIiwiZmlsZSI6Il9leHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBlc3ByaW1hPXJlcXVpcmUoXCJlc3ByaW1hXCIpXHJcbmltcG9ydCBlc2NvZGVnZW4gZnJvbSBcImVzY29kZWdlblwiXHJcbmltcG9ydCBWYXJpYW50IGZyb20gXCIuL3ZhcmlhbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhwcmVzc2lvbiBleHRlbmRzIFZhcmlhbnR7XHJcblx0c3RhdGljIHR5cGU9XCJ2YXJpYW50LmV4cFwiXHJcblxyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHRsZXQgZXhwPXRoaXMuY29kZS5ib2R5WzBdLmV4cHJlc3Npb25cclxuXHRcdHRoaXMuY29kZT1lc3ByaW1hLnBhcnNlKGAke3RoaXMub2JqZWN0fS5hc3NlbWJsZShkb2N4LCQoJyR7dGhpcy5zZWxlY3Rvcn0nKSlgKS5ib2R5WzBdXHJcblx0XHR0aGlzLmNvZGUuZXhwcmVzc2lvbi5hcmd1bWVudHMucHVzaChleHApXHJcblx0fVxyXG5cclxuXHRhc3NlbWJsZShkb2N4LCBub2RlLCB2YWx1ZSl7XHJcblx0XHRpZih2YWx1ZT09PW51bGwgfHwgdmFsdWU9PT11bmRlZmluZWQgfHwgdmFsdWU9PT0nJyl7XHJcblx0XHRcdG5vZGUucmVtb3ZlKClcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRub2RlLmZpbmQoJ3dcXFxcOnQnKS5yZW1vdmUoaT0+aSE9MCkuZmlyc3QoKS50ZXh0KHZhbHVlKVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=