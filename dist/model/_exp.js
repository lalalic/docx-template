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

var Expression = function (_Variant) {
	_inherits(Expression, _Variant);

	function Expression() {
		_classCallCheck(this, Expression);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Expression).apply(this, arguments));
	}

	_createClass(Expression, [{
		key: "assemble",
		value: function assemble() {
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
			return "variant.exp";
		}
	}]);

	return Expression;
}(_variant2.default);

exports.default = Expression;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbC9fZXhwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7NkJBR1Y7QUFDVCxPQUFJLFFBQU0sRUFBTjtPQUFVLE9BQUssS0FBSyxZQUFMLENBQWtCLEtBQWxCLENBQUwsQ0FETDtBQUVULE9BQUksUUFBTSxJQUFJLFFBQUosQ0FBYSxNQUFiLEVBQW9CLElBQXBCLEVBQTBCLEtBQTFCLEtBQWtDLEVBQWxDLENBRkQ7QUFHVCxRQUFLLElBQUwsQ0FBVSxDQUFWLENBQVksR0FBWixFQUFpQixPQUFqQixDQUF5QixVQUFDLENBQUQsRUFBRyxDQUFILEVBQU87QUFDL0IsUUFBRyxLQUFHLENBQUgsRUFDRixFQUFFLFdBQUYsR0FBYyxLQUFkLENBREQsS0FHQyxFQUFFLE1BQUYsR0FIRDtJQUR3QixDQUF6QixDQUhTOzs7OytCQVdHLE9BQU07QUFDbEIsVUFBVSxLQUFLLGFBQUwsQ0FBbUIsWUFBbkIsQ0FBZ0MsS0FBaEMsZ0JBQWdELEtBQUssSUFBTCxDQUR4Qzs7OztzQkFiRjtBQUFDLFVBQU0sYUFBTixDQUFEOzs7O1FBREciLCJmaWxlIjoiX2V4cC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWYXJpYW50IGZyb20gXCIuL3ZhcmlhbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhwcmVzc2lvbiBleHRlbmRzIFZhcmlhbnR7XHJcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuXCJ2YXJpYW50LmV4cFwifVxyXG5cclxuXHRhc3NlbWJsZSgpe1xyXG5cdFx0dmFyIGlQYXJhPXt9LCBjb2RlPXRoaXMudG9KYXZhc2NyaXB0KGlQYXJhKVxyXG5cdFx0dmFyIHZhbHVlPW5ldyBGdW5jdGlvbihcImRhdGFcIixjb2RlKShpUGFyYSl8fCcnXHJcblx0XHR0aGlzLndYbWwuJCgndCcpLmZvckVhY2goKHQsaSk9PntcclxuXHRcdFx0aWYoaT09MClcclxuXHRcdFx0XHR0LnRleHRDb250ZW50PXZhbHVlXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR0LnJlbW92ZSgpXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0dG9KYXZhc2NyaXB0KGlQYXJhKXtcclxuXHRcdHJldHVybiBgJHt0aGlzLnZhcmlhbnRQYXJlbnQudG9KYXZhc2NyaXB0KGlQYXJhKX1yZXR1cm4gJHt0aGlzLmNvZGV9YFxyXG5cdH1cclxufVxyXG4iXX0=