"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _variant = require("./variant");

var _variant2 = _interopRequireDefault(_variant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Variable = function (_Variant) {
	_inherits(Variable, _Variant);

	function Variable() {
		_classCallCheck(this, Variable);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Variable).apply(this, arguments));
	}

	_createClass(Variable, [{
		key: "assemble",
		value: function assemble() {
			debugger;
			var iPara = {},
			    code = this.toJavascript(iPara);
			var value = new Function("data", code)(iPara) || '';
			this.wXml.$('t').forEach(function (t, i) {
				if (i == 0) t.textContent = value;else t.remove();
			});
		}
	}, {
		key: "toJavascript",
		value: function toJavascript(iPara) {
			return this.variantParent.toJavascript(iPara) + "return " + this.code;
		}
	}], [{
		key: "type",
		get: function get() {
			return "variant.var";
		}
	}]);

	return Variable;
}(_variant2.default);

exports.default = Variable;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbC9fdmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7NkJBR1Y7QUFDVCxZQURTO0FBRVQsT0FBSSxRQUFNLEVBQU47T0FBVSxPQUFLLEtBQUssWUFBTCxDQUFrQixLQUFsQixDQUFMLENBRkw7QUFHVCxPQUFJLFFBQU0sSUFBSSxRQUFKLENBQWEsTUFBYixFQUFvQixJQUFwQixFQUEwQixLQUExQixLQUFrQyxFQUFsQyxDQUhEO0FBSVQsUUFBSyxJQUFMLENBQVUsQ0FBVixDQUFZLEdBQVosRUFBaUIsT0FBakIsQ0FBeUIsVUFBQyxDQUFELEVBQUcsQ0FBSCxFQUFPO0FBQy9CLFFBQUcsS0FBRyxDQUFILEVBQ0YsRUFBRSxXQUFGLEdBQWMsS0FBZCxDQURELEtBR0MsRUFBRSxNQUFGLEdBSEQ7SUFEd0IsQ0FBekIsQ0FKUzs7OzsrQkFZRyxPQUFNO0FBQ2xCLFVBQVUsS0FBSyxhQUFMLENBQW1CLFlBQW5CLENBQWdDLEtBQWhDLGdCQUFnRCxLQUFLLElBQUwsQ0FEeEM7Ozs7c0JBZEY7QUFBQyxVQUFNLGFBQU4sQ0FBRDs7OztRQURHIiwiZmlsZSI6Il92YXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmFyaWFudCBmcm9tIFwiLi92YXJpYW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhcmlhYmxlIGV4dGVuZHMgVmFyaWFudHtcclxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm5cInZhcmlhbnQudmFyXCJ9XHJcblxyXG5cdGFzc2VtYmxlKCl7XHJcblx0XHRkZWJ1Z2dlclxyXG5cdFx0dmFyIGlQYXJhPXt9LCBjb2RlPXRoaXMudG9KYXZhc2NyaXB0KGlQYXJhKVxyXG5cdFx0dmFyIHZhbHVlPW5ldyBGdW5jdGlvbihcImRhdGFcIixjb2RlKShpUGFyYSl8fCcnXHJcblx0XHR0aGlzLndYbWwuJCgndCcpLmZvckVhY2goKHQsaSk9PntcclxuXHRcdFx0aWYoaT09MClcclxuXHRcdFx0XHR0LnRleHRDb250ZW50PXZhbHVlXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR0LnJlbW92ZSgpXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0dG9KYXZhc2NyaXB0KGlQYXJhKXtcclxuXHRcdHJldHVybiBgJHt0aGlzLnZhcmlhbnRQYXJlbnQudG9KYXZhc2NyaXB0KGlQYXJhKX1yZXR1cm4gJHt0aGlzLmNvZGV9YFxyXG5cdH1cclxufVxyXG4iXX0=