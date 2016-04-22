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
		key: "_initVariant",
		value: function _initVariant() {
			_get(Object.getPrototypeOf(Expression.prototype), "_initVariant", this).call(this);

			/*assemble(code)*/
			this.parsedCode.body[0] = {
				"type": "ExpressionStatement",
				"expression": {
					"type": "CallExpression",
					"callee": {
						"type": "MemberExpression",
						"computed": false,
						"object": {
							"type": "Identifier",
							"name": this.vId
						},
						"property": {
							"type": "Identifier",
							"name": "assemble"
						}
					},
					"arguments": [this.parsedCode.body[0].expression]
				}
			};
		}
	}, {
		key: "assemble",
		value: function assemble(value) {
			if (value == null || value == undefined || value == '') {
				this.assembledXml.$('t').forEach(function (t) {
					return t.remove();
				});
			} else {
				this.assembledXml.$('t').forEach(function (t, i) {
					if (i == 0) t.textContent = value;else t.remove();
				});
			}
			_get(Object.getPrototypeOf(Expression.prototype), "assemble", this).apply(this, arguments);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fZXhwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7OztpQ0FHTjtBQUNiLDhCQUptQix1REFJbkI7OztBQURhLE9BSWIsQ0FBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCLENBQXJCLElBQXdCO0FBQ2QsWUFBUSxxQkFBUjtBQUNBLGtCQUFjO0FBQ1YsYUFBUSxnQkFBUjtBQUNBLGVBQVU7QUFDckIsY0FBUSxrQkFBUjtBQUNBLGtCQUFZLEtBQVo7QUFDQSxnQkFBVTtBQUNULGVBQVEsWUFBUjtBQUNBLGVBQVEsS0FBSyxHQUFMO09BRlQ7QUFJQSxrQkFBWTtBQUNYLGVBQVEsWUFBUjtBQUNBLGVBQVEsVUFBUjtPQUZEO01BUFc7QUFZQSxrQkFBYSxDQUN4QixLQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBcUIsQ0FBckIsRUFBd0IsVUFBeEIsQ0FEVztLQWRKO0lBRlYsQ0FKYTs7OzsyQkEyQkwsT0FBTTtBQUNkLE9BQUcsU0FBTyxJQUFQLElBQWUsU0FBTyxTQUFQLElBQW9CLFNBQU8sRUFBUCxFQUFVO0FBQy9DLFNBQUssWUFBTCxDQUFrQixDQUFsQixDQUFvQixHQUFwQixFQUF5QixPQUF6QixDQUFpQztZQUFHLEVBQUUsTUFBRjtLQUFILENBQWpDLENBRCtDO0lBQWhELE1BRUs7QUFDSixTQUFLLFlBQUwsQ0FBa0IsQ0FBbEIsQ0FBb0IsR0FBcEIsRUFBeUIsT0FBekIsQ0FBaUMsVUFBQyxDQUFELEVBQUcsQ0FBSCxFQUFPO0FBQ3ZDLFNBQUcsS0FBRyxDQUFILEVBQ0YsRUFBRSxXQUFGLEdBQWMsS0FBZCxDQURELEtBR0MsRUFBRSxNQUFGLEdBSEQ7S0FEZ0MsQ0FBakMsQ0FESTtJQUZMO0FBVUEsOEJBekNtQixxREF5Q0QsVUFBbEIsQ0FYYzs7OztzQkE3QkU7QUFBQyxVQUFNLGFBQU4sQ0FBRDs7OztRQURHIiwiZmlsZSI6Il9leHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmFyaWFudCBmcm9tIFwiLi92YXJpYW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4cHJlc3Npb24gZXh0ZW5kcyBWYXJpYW50e1xyXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVyblwidmFyaWFudC5leHBcIn1cclxuXHRcclxuXHRfaW5pdFZhcmlhbnQoKXtcclxuXHRcdHN1cGVyLl9pbml0VmFyaWFudCgpXHJcblx0XHRcclxuXHRcdC8qYXNzZW1ibGUoY29kZSkqL1xyXG5cdFx0dGhpcy5wYXJzZWRDb2RlLmJvZHlbMF09e1xyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJFeHByZXNzaW9uU3RhdGVtZW50XCIsXHJcbiAgICAgICAgICAgIFwiZXhwcmVzc2lvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJDYWxsRXhwcmVzc2lvblwiLFxyXG4gICAgICAgICAgICAgICAgXCJjYWxsZWVcIjoge1xyXG5cdFx0XHRcdFx0XCJ0eXBlXCI6IFwiTWVtYmVyRXhwcmVzc2lvblwiLFxyXG5cdFx0XHRcdFx0XCJjb21wdXRlZFwiOiBmYWxzZSxcclxuXHRcdFx0XHRcdFwib2JqZWN0XCI6IHtcclxuXHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogdGhpcy52SWRcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcInByb3BlcnR5XCI6IHtcclxuXHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogXCJhc3NlbWJsZVwiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuICAgICAgICAgICAgICAgIFwiYXJndW1lbnRzXCI6IFtcclxuXHRcdFx0XHRcdHRoaXMucGFyc2VkQ29kZS5ib2R5WzBdLmV4cHJlc3Npb25cclxuXHRcdFx0XHRdXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzc2VtYmxlKHZhbHVlKXtcclxuXHRcdGlmKHZhbHVlPT1udWxsIHx8IHZhbHVlPT11bmRlZmluZWQgfHwgdmFsdWU9PScnKXtcclxuXHRcdFx0dGhpcy5hc3NlbWJsZWRYbWwuJCgndCcpLmZvckVhY2godD0+dC5yZW1vdmUoKSlcclxuXHRcdH1lbHNle1xyXG5cdFx0XHR0aGlzLmFzc2VtYmxlZFhtbC4kKCd0JykuZm9yRWFjaCgodCxpKT0+e1xyXG5cdFx0XHRcdGlmKGk9PTApXHJcblx0XHRcdFx0XHR0LnRleHRDb250ZW50PXZhbHVlXHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0dC5yZW1vdmUoKVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdFx0c3VwZXIuYXNzZW1ibGUoLi4uYXJndW1lbnRzKVxyXG5cdH1cclxufVxyXG4iXX0=