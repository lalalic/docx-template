"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _esprima = require("esprima");

var esprima = _interopRequireWildcard(_esprima);

var _escodegen = require("escodegen");

var _escodegen2 = _interopRequireDefault(_escodegen);

var _variant = require("./variant");

var _variant2 = _interopRequireDefault(_variant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Expression = function (_Variant) {
	_inherits(Expression, _Variant);

	function Expression() {
		_classCallCheck(this, Expression);

		var _this = _possibleConstructorReturn(this, (Expression.__proto__ || Object.getPrototypeOf(Expression)).apply(this, arguments));

		var exp = _this.code.body[0].expression;
		_this.code = esprima.parse(_this.object + ".assemble(docx,$('" + _this.selector + "'), __opt)").body[0];
		_this.code.expression.arguments.push(exp);
		return _this;
	}

	_createClass(Expression, [{
		key: "assemble",
		value: function assemble(docx, node, _ref, value) {
			var clearWrap = _ref.clearWrap;

			if (value === null || value === undefined || value === '') {
				node.remove();
			} else {
				node.find('w\\:t').remove(function (i) {
					return i != 0;
				}).first().text(this.xmlescape(value));
				if (clearWrap) {
					node.replaceWith(node.find(">w\\:sdtContent").children());
				}
			}
		}
	}]);

	return Expression;
}(_variant2.default);

Expression.type = "variant.exp";
exports.default = Expression;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fZXhwLmpzIl0sIm5hbWVzIjpbImVzcHJpbWEiLCJFeHByZXNzaW9uIiwiYXJndW1lbnRzIiwiZXhwIiwiY29kZSIsImJvZHkiLCJleHByZXNzaW9uIiwicGFyc2UiLCJvYmplY3QiLCJzZWxlY3RvciIsInB1c2giLCJkb2N4Iiwibm9kZSIsInZhbHVlIiwiY2xlYXJXcmFwIiwidW5kZWZpbmVkIiwicmVtb3ZlIiwiZmluZCIsImkiLCJmaXJzdCIsInRleHQiLCJ4bWxlc2NhcGUiLCJyZXBsYWNlV2l0aCIsImNoaWxkcmVuIiwidHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7SUFBWUEsTzs7QUFDWjs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkMsVTs7O0FBR3BCLHVCQUFhO0FBQUE7O0FBQUEsdUhBQ0hDLFNBREc7O0FBRVosTUFBSUMsTUFBSSxNQUFLQyxJQUFMLENBQVVDLElBQVYsQ0FBZSxDQUFmLEVBQWtCQyxVQUExQjtBQUNBLFFBQUtGLElBQUwsR0FBVUosUUFBUU8sS0FBUixDQUFpQixNQUFLQyxNQUF0QiwwQkFBaUQsTUFBS0MsUUFBdEQsaUJBQTRFSixJQUE1RSxDQUFpRixDQUFqRixDQUFWO0FBQ0EsUUFBS0QsSUFBTCxDQUFVRSxVQUFWLENBQXFCSixTQUFyQixDQUErQlEsSUFBL0IsQ0FBb0NQLEdBQXBDO0FBSlk7QUFLWjs7OzsyQkFFUVEsSSxFQUFNQyxJLFFBQW1CQyxLLEVBQU07QUFBQSxPQUFsQkMsU0FBa0IsUUFBbEJBLFNBQWtCOztBQUN2QyxPQUFHRCxVQUFRLElBQVIsSUFBZ0JBLFVBQVFFLFNBQXhCLElBQXFDRixVQUFRLEVBQWhELEVBQW1EO0FBQ2xERCxTQUFLSSxNQUFMO0FBQ0EsSUFGRCxNQUVLO0FBQ0pKLFNBQUtLLElBQUwsQ0FBVSxPQUFWLEVBQW1CRCxNQUFuQixDQUEwQjtBQUFBLFlBQUdFLEtBQUcsQ0FBTjtBQUFBLEtBQTFCLEVBQW1DQyxLQUFuQyxHQUEyQ0MsSUFBM0MsQ0FBZ0QsS0FBS0MsU0FBTCxDQUFlUixLQUFmLENBQWhEO0FBQ0EsUUFBR0MsU0FBSCxFQUFhO0FBQ1pGLFVBQUtVLFdBQUwsQ0FBaUJWLEtBQUtLLElBQUwsQ0FBVSxpQkFBVixFQUE2Qk0sUUFBN0IsRUFBakI7QUFDQTtBQUNEO0FBQ0Q7Ozs7OztBQW5CbUJ0QixVLENBQ2J1QixJLEdBQUssYTtrQkFEUXZCLFUiLCJmaWxlIjoiX2V4cC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGVzcHJpbWEgZnJvbSBcImVzcHJpbWFcIlxyXG5pbXBvcnQgZXNjb2RlZ2VuIGZyb20gXCJlc2NvZGVnZW5cIlxyXG5pbXBvcnQgVmFyaWFudCBmcm9tIFwiLi92YXJpYW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4cHJlc3Npb24gZXh0ZW5kcyBWYXJpYW50e1xyXG5cdHN0YXRpYyB0eXBlPVwidmFyaWFudC5leHBcIlxyXG5cclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0bGV0IGV4cD10aGlzLmNvZGUuYm9keVswXS5leHByZXNzaW9uXHJcblx0XHR0aGlzLmNvZGU9ZXNwcmltYS5wYXJzZShgJHt0aGlzLm9iamVjdH0uYXNzZW1ibGUoZG9jeCwkKCcke3RoaXMuc2VsZWN0b3J9JyksIF9fb3B0KWApLmJvZHlbMF1cclxuXHRcdHRoaXMuY29kZS5leHByZXNzaW9uLmFyZ3VtZW50cy5wdXNoKGV4cClcclxuXHR9XHJcblxyXG5cdGFzc2VtYmxlKGRvY3gsIG5vZGUsIHtjbGVhcldyYXB9LCB2YWx1ZSl7XHJcblx0XHRpZih2YWx1ZT09PW51bGwgfHwgdmFsdWU9PT11bmRlZmluZWQgfHwgdmFsdWU9PT0nJyl7XHJcblx0XHRcdG5vZGUucmVtb3ZlKClcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRub2RlLmZpbmQoJ3dcXFxcOnQnKS5yZW1vdmUoaT0+aSE9MCkuZmlyc3QoKS50ZXh0KHRoaXMueG1sZXNjYXBlKHZhbHVlKSlcclxuXHRcdFx0aWYoY2xlYXJXcmFwKXtcclxuXHRcdFx0XHRub2RlLnJlcGxhY2VXaXRoKG5vZGUuZmluZChcIj53XFxcXDpzZHRDb250ZW50XCIpLmNoaWxkcmVuKCkpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIl19