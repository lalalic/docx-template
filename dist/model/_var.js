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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbC9fdmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7NkJBR1Y7QUFDVCxPQUFJLFFBQU0sRUFBTjtPQUFVLE9BQUssS0FBSyxZQUFMLENBQWtCLEtBQWxCLENBQUwsQ0FETDtBQUVULE9BQUksUUFBTSxJQUFJLFFBQUosQ0FBYSxNQUFiLEVBQW9CLElBQXBCLEVBQTBCLEtBQTFCLEtBQWtDLEVBQWxDLENBRkQ7QUFHVCxRQUFLLElBQUwsQ0FBVSxDQUFWLENBQVksR0FBWixFQUFpQixPQUFqQixDQUF5QixVQUFDLENBQUQsRUFBRyxDQUFILEVBQU87QUFDL0IsUUFBRyxLQUFHLENBQUgsRUFDRixFQUFFLFdBQUYsR0FBYyxLQUFkLENBREQsS0FHQyxFQUFFLE1BQUYsR0FIRDtJQUR3QixDQUF6QixDQUhTOzs7OytCQVdHLE9BQU07QUFDbEIsVUFBVSxLQUFLLGFBQUwsQ0FBbUIsWUFBbkIsQ0FBZ0MsS0FBaEMsZ0JBQWdELEtBQUssSUFBTCxDQUR4Qzs7OztzQkFiRjtBQUFDLFVBQU0sYUFBTixDQUFEOzs7O1FBREciLCJmaWxlIjoiX3Zhci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWYXJpYW50IGZyb20gXCIuL3ZhcmlhbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFyaWFibGUgZXh0ZW5kcyBWYXJpYW50e1xyXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVyblwidmFyaWFudC52YXJcIn1cclxuXHJcblx0YXNzZW1ibGUoKXtcclxuXHRcdHZhciBpUGFyYT17fSwgY29kZT10aGlzLnRvSmF2YXNjcmlwdChpUGFyYSlcclxuXHRcdHZhciB2YWx1ZT1uZXcgRnVuY3Rpb24oXCJkYXRhXCIsY29kZSkoaVBhcmEpfHwnJ1xyXG5cdFx0dGhpcy53WG1sLiQoJ3QnKS5mb3JFYWNoKCh0LGkpPT57XHJcblx0XHRcdGlmKGk9PTApXHJcblx0XHRcdFx0dC50ZXh0Q29udGVudD12YWx1ZVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0dC5yZW1vdmUoKVxyXG5cdFx0fSlcclxuXHR9XHJcblx0XHJcblx0dG9KYXZhc2NyaXB0KGlQYXJhKXtcclxuXHRcdHJldHVybiBgJHt0aGlzLnZhcmlhbnRQYXJlbnQudG9KYXZhc2NyaXB0KGlQYXJhKX1yZXR1cm4gJHt0aGlzLmNvZGV9YFxyXG5cdH1cclxufSJdfQ==