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
		_this.code = _esprima2.default.parse(_this.id + ".assemble(this,$('" + _this.selector + "'))").body[0];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fZXhwLmpzIl0sIm5hbWVzIjpbIkV4cHJlc3Npb24iLCJhcmd1bWVudHMiLCJleHAiLCJjb2RlIiwiYm9keSIsImV4cHJlc3Npb24iLCJwYXJzZSIsImlkIiwic2VsZWN0b3IiLCJwdXNoIiwiZG9jeCIsIm5vZGUiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsInJlbW92ZSIsImZpbmQiLCJpIiwiZmlyc3QiLCJ0ZXh0IiwidHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFU7OztBQUdwQix1QkFBYTtBQUFBOztBQUFBLHVIQUNIQyxTQURHOztBQUVaLE1BQUlDLE1BQUksTUFBS0MsSUFBTCxDQUFVQyxJQUFWLENBQWUsQ0FBZixFQUFrQkMsVUFBMUI7QUFDQSxRQUFLRixJQUFMLEdBQVUsa0JBQVFHLEtBQVIsQ0FBaUIsTUFBS0MsRUFBdEIsMEJBQTZDLE1BQUtDLFFBQWxELFVBQWlFSixJQUFqRSxDQUFzRSxDQUF0RSxDQUFWO0FBQ0EsUUFBS0QsSUFBTCxDQUFVRSxVQUFWLENBQXFCSixTQUFyQixDQUErQlEsSUFBL0IsQ0FBb0NQLEdBQXBDO0FBSlk7QUFLWjs7OzsyQkFFUVEsSSxFQUFNQyxJLEVBQU1DLEssRUFBTTtBQUMxQixPQUFHQSxVQUFRLElBQVIsSUFBZ0JBLFVBQVFDLFNBQXhCLElBQXFDRCxVQUFRLEVBQWhELEVBQW1EO0FBQ2xERCxTQUFLRyxNQUFMO0FBQ0EsSUFGRCxNQUVLO0FBQ0pILFNBQUtJLElBQUwsQ0FBVSxPQUFWLEVBQW1CRCxNQUFuQixDQUEwQjtBQUFBLFlBQUdFLEtBQUcsQ0FBTjtBQUFBLEtBQTFCLEVBQW1DQyxLQUFuQyxHQUEyQ0MsSUFBM0MsQ0FBZ0ROLEtBQWhEO0FBQ0E7QUFFRDs7Ozs7O0FBakJtQlosVSxDQUNibUIsSSxHQUFLLGE7a0JBRFFuQixVIiwiZmlsZSI6Il9leHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXNwcmltYSBmcm9tIFwiZXNwcmltYVwiXHJcbmltcG9ydCBWYXJpYW50IGZyb20gXCIuL3ZhcmlhbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhwcmVzc2lvbiBleHRlbmRzIFZhcmlhbnR7XHJcblx0c3RhdGljIHR5cGU9XCJ2YXJpYW50LmV4cFwiXHJcblxyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHRsZXQgZXhwPXRoaXMuY29kZS5ib2R5WzBdLmV4cHJlc3Npb25cclxuXHRcdHRoaXMuY29kZT1lc3ByaW1hLnBhcnNlKGAke3RoaXMuaWR9LmFzc2VtYmxlKHRoaXMsJCgnJHt0aGlzLnNlbGVjdG9yfScpKWApLmJvZHlbMF1cclxuXHRcdHRoaXMuY29kZS5leHByZXNzaW9uLmFyZ3VtZW50cy5wdXNoKGV4cClcclxuXHR9XHJcblxyXG5cdGFzc2VtYmxlKGRvY3gsIG5vZGUsIHZhbHVlKXtcclxuXHRcdGlmKHZhbHVlPT09bnVsbCB8fCB2YWx1ZT09PXVuZGVmaW5lZCB8fCB2YWx1ZT09PScnKXtcclxuXHRcdFx0bm9kZS5yZW1vdmUoKVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdG5vZGUuZmluZCgnd1xcXFw6dCcpLnJlbW92ZShpPT5pIT0wKS5maXJzdCgpLnRleHQodmFsdWUpXHJcblx0XHR9XHJcblx0XHRcclxuXHR9XHJcbn1cclxuIl19