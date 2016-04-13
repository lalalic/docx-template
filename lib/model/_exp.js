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
			    code = this._toJavascript(iPara);
			var value = new Function("data", code)(iPara) || '';
			this.wXml.$('t').forEach(function (t, i) {
				if (i == 0) t.textContent = value;else t.remove();
			});
		}
	}, {
		key: "_toJavascript",
		value: function _toJavascript(iPara) {
			return this.variantParent._toJavascript(iPara) + "return " + this.code;
		}
	}, {
		key: "_toJavascriptOfAssembleAsData",
		value: function _toJavascriptOfAssembleAsData() {}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fZXhwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7NkJBR1Y7QUFDVCxPQUFJLFFBQU0sRUFBTjtPQUFVLE9BQUssS0FBSyxhQUFMLENBQW1CLEtBQW5CLENBQUwsQ0FETDtBQUVULE9BQUksUUFBTSxJQUFJLFFBQUosQ0FBYSxNQUFiLEVBQW9CLElBQXBCLEVBQTBCLEtBQTFCLEtBQWtDLEVBQWxDLENBRkQ7QUFHVCxRQUFLLElBQUwsQ0FBVSxDQUFWLENBQVksR0FBWixFQUFpQixPQUFqQixDQUF5QixVQUFDLENBQUQsRUFBRyxDQUFILEVBQU87QUFDL0IsUUFBRyxLQUFHLENBQUgsRUFDRixFQUFFLFdBQUYsR0FBYyxLQUFkLENBREQsS0FHQyxFQUFFLE1BQUYsR0FIRDtJQUR3QixDQUF6QixDQUhTOzs7O2dDQVdJLE9BQU07QUFDbkIsVUFBVSxLQUFLLGFBQUwsQ0FBbUIsYUFBbkIsQ0FBaUMsS0FBakMsZ0JBQWlELEtBQUssSUFBTCxDQUR4Qzs7OztrREFJVzs7O3NCQWpCZDtBQUFDLFVBQU0sYUFBTixDQUFEOzs7O1FBREciLCJmaWxlIjoiX2V4cC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWYXJpYW50IGZyb20gXCIuL3ZhcmlhbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhwcmVzc2lvbiBleHRlbmRzIFZhcmlhbnR7XHJcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuXCJ2YXJpYW50LmV4cFwifVxyXG5cclxuXHRhc3NlbWJsZSgpe1xyXG5cdFx0dmFyIGlQYXJhPXt9LCBjb2RlPXRoaXMuX3RvSmF2YXNjcmlwdChpUGFyYSlcclxuXHRcdHZhciB2YWx1ZT1uZXcgRnVuY3Rpb24oXCJkYXRhXCIsY29kZSkoaVBhcmEpfHwnJ1xyXG5cdFx0dGhpcy53WG1sLiQoJ3QnKS5mb3JFYWNoKCh0LGkpPT57XHJcblx0XHRcdGlmKGk9PTApXHJcblx0XHRcdFx0dC50ZXh0Q29udGVudD12YWx1ZVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0dC5yZW1vdmUoKVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdF90b0phdmFzY3JpcHQoaVBhcmEpe1xyXG5cdFx0cmV0dXJuIGAke3RoaXMudmFyaWFudFBhcmVudC5fdG9KYXZhc2NyaXB0KGlQYXJhKX1yZXR1cm4gJHt0aGlzLmNvZGV9YFxyXG5cdH1cclxuXHRcclxuXHRfdG9KYXZhc2NyaXB0T2ZBc3NlbWJsZUFzRGF0YSgpe1xyXG5cdFx0XHJcblx0fVxyXG59XHJcbiJdfQ==