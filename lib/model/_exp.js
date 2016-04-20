"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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
			_get(Object.getPrototypeOf(Expression.prototype), "assemble", this).apply(this, arguments);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fZXhwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs2QkFJVjtBQUNULE9BQUksUUFBTSxFQUFOO09BQVUsT0FBSyxLQUFLLGFBQUwsQ0FBbUIsS0FBbkIsQ0FBTCxDQURMO0FBRVQsT0FBSSxRQUFNLElBQUksUUFBSixDQUFhLE1BQWIsRUFBb0IsSUFBcEIsRUFBMEIsS0FBMUIsS0FBa0MsRUFBbEMsQ0FGRDtBQUdULFFBQUssSUFBTCxDQUFVLENBQVYsQ0FBWSxHQUFaLEVBQWlCLE9BQWpCLENBQXlCLFVBQUMsQ0FBRCxFQUFHLENBQUgsRUFBTztBQUMvQixRQUFHLEtBQUcsQ0FBSCxFQUNGLEVBQUUsV0FBRixHQUFjLEtBQWQsQ0FERCxLQUdDLEVBQUUsTUFBRixHQUhEO0lBRHdCLENBQXpCLENBSFM7QUFTVCw4QkFibUIscURBYUQsVUFBbEIsQ0FUUzs7OztnQ0FZSSxPQUFNO0FBQ25CLFVBQVUsS0FBSyxhQUFMLENBQW1CLGFBQW5CLENBQWlDLEtBQWpDLGdCQUFpRCxLQUFLLElBQUwsQ0FEeEM7Ozs7a0RBSVc7OztzQkFuQmQ7QUFBQyxVQUFNLGFBQU4sQ0FBRDs7OztRQURHIiwiZmlsZSI6Il9leHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmFyaWFudCBmcm9tIFwiLi92YXJpYW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4cHJlc3Npb24gZXh0ZW5kcyBWYXJpYW50e1xyXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVyblwidmFyaWFudC5leHBcIn1cclxuXHRcclxuXHJcblx0YXNzZW1ibGUoKXtcclxuXHRcdHZhciBpUGFyYT17fSwgY29kZT10aGlzLl90b0phdmFzY3JpcHQoaVBhcmEpXHJcblx0XHR2YXIgdmFsdWU9bmV3IEZ1bmN0aW9uKFwiZGF0YVwiLGNvZGUpKGlQYXJhKXx8JydcclxuXHRcdHRoaXMud1htbC4kKCd0JykuZm9yRWFjaCgodCxpKT0+e1xyXG5cdFx0XHRpZihpPT0wKVxyXG5cdFx0XHRcdHQudGV4dENvbnRlbnQ9dmFsdWVcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHQucmVtb3ZlKClcclxuXHRcdH0pXHJcblx0XHRzdXBlci5hc3NlbWJsZSguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cclxuXHRfdG9KYXZhc2NyaXB0KGlQYXJhKXtcclxuXHRcdHJldHVybiBgJHt0aGlzLnZhcmlhbnRQYXJlbnQuX3RvSmF2YXNjcmlwdChpUGFyYSl9cmV0dXJuICR7dGhpcy5jb2RlfWBcclxuXHR9XHJcblx0XHJcblx0X3RvSmF2YXNjcmlwdE9mQXNzZW1ibGVBc0RhdGEoKXtcclxuXHRcdFxyXG5cdH1cclxufVxyXG4iXX0=