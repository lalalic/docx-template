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
						"type": "Identifier",
						"name": "assemble_" + this.vId
					},
					"arguments": [this.parsedCode.body[0].expression]
				}
			};
		}
	}, {
		key: "assemble",
		value: function assemble(value) {
			if (value == null || value == undefined || value == '') this.clear();else {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fZXhwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7OztpQ0FHTjtBQUNiLDhCQUptQix1REFJbkI7OztBQURhLE9BSWIsQ0FBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCLENBQXJCLElBQXdCO0FBQ2QsWUFBUSxxQkFBUjtBQUNBLGtCQUFjO0FBQ1YsYUFBUSxnQkFBUjtBQUNBLGVBQVU7QUFDTixjQUFRLFlBQVI7QUFDQSw0QkFBb0IsS0FBSyxHQUFMO01BRnhCO0FBSUEsa0JBQWEsQ0FDeEIsS0FBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCLENBQXJCLEVBQXdCLFVBQXhCLENBRFc7S0FOSjtJQUZWLENBSmE7Ozs7MkJBbUJMLE9BQU07QUFDZCxPQUFHLFNBQU8sSUFBUCxJQUFlLFNBQU8sU0FBUCxJQUFvQixTQUFPLEVBQVAsRUFDckMsS0FBSyxLQUFMLEdBREQsS0FFSTtBQUNILFNBQUssWUFBTCxDQUFrQixDQUFsQixDQUFvQixHQUFwQixFQUF5QixPQUF6QixDQUFpQyxVQUFDLENBQUQsRUFBRyxDQUFILEVBQU87QUFDdkMsU0FBRyxLQUFHLENBQUgsRUFDRixFQUFFLFdBQUYsR0FBYyxLQUFkLENBREQsS0FHQyxFQUFFLE1BQUYsR0FIRDtLQURnQyxDQUFqQyxDQURHO0lBRko7QUFVQSw4QkFqQ21CLHFEQWlDRCxVQUFsQixDQVhjOzs7O3NCQXJCRTtBQUFDLFVBQU0sYUFBTixDQUFEOzs7O1FBREciLCJmaWxlIjoiX2V4cC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWYXJpYW50IGZyb20gXCIuL3ZhcmlhbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhwcmVzc2lvbiBleHRlbmRzIFZhcmlhbnR7XHJcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuXCJ2YXJpYW50LmV4cFwifVxyXG5cdFxyXG5cdF9pbml0VmFyaWFudCgpe1xyXG5cdFx0c3VwZXIuX2luaXRWYXJpYW50KClcclxuXHRcdFxyXG5cdFx0Lyphc3NlbWJsZShjb2RlKSovXHJcblx0XHR0aGlzLnBhcnNlZENvZGUuYm9keVswXT17XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIkV4cHJlc3Npb25TdGF0ZW1lbnRcIixcclxuICAgICAgICAgICAgXCJleHByZXNzaW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkNhbGxFeHByZXNzaW9uXCIsXHJcbiAgICAgICAgICAgICAgICBcImNhbGxlZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBgYXNzZW1ibGVfJHt0aGlzLnZJZH1gXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJhcmd1bWVudHNcIjogW1xyXG5cdFx0XHRcdFx0dGhpcy5wYXJzZWRDb2RlLmJvZHlbMF0uZXhwcmVzc2lvblxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXNzZW1ibGUodmFsdWUpe1xyXG5cdFx0aWYodmFsdWU9PW51bGwgfHwgdmFsdWU9PXVuZGVmaW5lZCB8fCB2YWx1ZT09JycpXHJcblx0XHRcdHRoaXMuY2xlYXIoKVxyXG5cdFx0ZWxzZXtcclxuXHRcdFx0dGhpcy5hc3NlbWJsZWRYbWwuJCgndCcpLmZvckVhY2goKHQsaSk9PntcclxuXHRcdFx0XHRpZihpPT0wKVxyXG5cdFx0XHRcdFx0dC50ZXh0Q29udGVudD12YWx1ZVxyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdHQucmVtb3ZlKClcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHRcdHN1cGVyLmFzc2VtYmxlKC4uLmFyZ3VtZW50cylcclxuXHR9XHJcbn1cclxuIl19