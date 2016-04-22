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

var If = function (_Variant) {
	_inherits(If, _Variant);

	function If() {
		_classCallCheck(this, If);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(If).apply(this, arguments));
	}

	_createClass(If, [{
		key: "_initVariant",
		value: function _initVariant() {
			_get(Object.getPrototypeOf(If.prototype), "_initVariant", this).call(this);

			this.codeBlock = this.parsedCode.body[0].consequent.body;
			while (!Array.isArray(this.codeBlock)) {
				//if()with(){}
				this.codeBlock = this.codeBlock.body;
			} /*if(...){assemble(true),...}else assemble(false)*/
			this.codeBlock.push({
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
					"arguments": [{
						"type": "Literal",
						"value": true,
						"raw": "false"
					}]
				}
			});

			this.parsedCode.body[0].alternate = {
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
					"arguments": [{
						"type": "Literal",
						"value": false,
						"raw": "false"
					}]
				}
			};
		}
	}, {
		key: "assemble",
		value: function assemble(satified) {
			if (!satified) {
				this.clear();
				_get(Object.getPrototypeOf(If.prototype), "assemble", this).apply(this, arguments);
			} else {
				//keep it
			}
		}
	}], [{
		key: "type",
		get: function get() {
			return "variant.if";
		}
	}]);

	return If;
}(_variant2.default);

exports.default = If;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9faWYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7O2lDQUVOO0FBQ2IsOEJBSG1CLCtDQUduQixDQURhOztBQUdiLFFBQUssU0FBTCxHQUFlLEtBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQixDQUFyQixFQUF3QixVQUF4QixDQUFtQyxJQUFuQyxDQUhGO0FBSWIsVUFBTSxDQUFDLE1BQU0sT0FBTixDQUFjLEtBQUssU0FBTCxDQUFmOztBQUNMLFNBQUssU0FBTCxHQUFlLEtBQUssU0FBTCxDQUFlLElBQWY7SUFEaEI7QUFKYSxPQVNiLENBQUssU0FBTCxDQUFlLElBQWYsQ0FBb0I7QUFDbkIsWUFBUSxxQkFBUjtBQUNBLGtCQUFjO0FBQ2IsYUFBUSxnQkFBUjtBQUNBLGVBQVU7QUFDVCxjQUFRLGtCQUFSO0FBQ0Esa0JBQVksS0FBWjtBQUNBLGdCQUFVO0FBQ1QsZUFBUSxZQUFSO0FBQ0EsZUFBUSxLQUFLLEdBQUw7T0FGVDtBQUlBLGtCQUFZO0FBQ1gsZUFBUSxZQUFSO0FBQ0EsZUFBUSxVQUFSO09BRkQ7TUFQRDtBQVlBLGtCQUFhLENBQ1o7QUFDQyxjQUFRLFNBQVI7QUFDQSxlQUFTLElBQVQ7QUFDQSxhQUFPLE9BQVA7TUFKVyxDQUFiO0tBZEQ7SUFGRCxFQVRhOztBQW1DYixRQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBcUIsQ0FBckIsRUFBd0IsU0FBeEIsR0FBa0M7QUFDakMsWUFBUSxxQkFBUjtBQUNBLGtCQUFjO0FBQ2IsYUFBUSxnQkFBUjtBQUNBLGVBQVU7QUFDVCxjQUFRLGtCQUFSO0FBQ0Esa0JBQVksS0FBWjtBQUNBLGdCQUFVO0FBQ1QsZUFBUSxZQUFSO0FBQ0EsZUFBUSxLQUFLLEdBQUw7T0FGVDtBQUlBLGtCQUFZO0FBQ1gsZUFBUSxZQUFSO0FBQ0EsZUFBUSxVQUFSO09BRkQ7TUFQRDtBQVlBLGtCQUFhLENBQ1o7QUFDQyxjQUFRLFNBQVI7QUFDQSxlQUFTLEtBQVQ7QUFDQSxhQUFPLE9BQVA7TUFKVyxDQUFiO0tBZEQ7SUFGRCxDQW5DYTs7OzsyQkE4REwsVUFBUztBQUNqQixPQUFHLENBQUMsUUFBRCxFQUFVO0FBQ1osU0FBSyxLQUFMLEdBRFk7QUFFWiwrQkFuRWtCLDZDQW1FQSxVQUFsQixDQUZZO0lBQWIsTUFHSzs7SUFITDs7OztzQkFoRWdCO0FBQUMsVUFBTSxZQUFOLENBQUQ7Ozs7UUFERyIsImZpbGUiOiJfaWYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmFyaWFudCBmcm9tIFwiLi92YXJpYW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElmIGV4dGVuZHMgVmFyaWFudHtcclxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm5cInZhcmlhbnQuaWZcIn1cclxuXHRfaW5pdFZhcmlhbnQoKXtcclxuXHRcdHN1cGVyLl9pbml0VmFyaWFudCgpXHJcblx0XHRcclxuXHRcdHRoaXMuY29kZUJsb2NrPXRoaXMucGFyc2VkQ29kZS5ib2R5WzBdLmNvbnNlcXVlbnQuYm9keVxyXG5cdFx0d2hpbGUoIUFycmF5LmlzQXJyYXkodGhpcy5jb2RlQmxvY2spKS8vaWYoKXdpdGgoKXt9XHJcblx0XHRcdHRoaXMuY29kZUJsb2NrPXRoaXMuY29kZUJsb2NrLmJvZHlcclxuXHRcdFx0XHJcblx0XHRcclxuXHRcdC8qaWYoLi4uKXthc3NlbWJsZSh0cnVlKSwuLi59ZWxzZSBhc3NlbWJsZShmYWxzZSkqL1xyXG5cdFx0dGhpcy5jb2RlQmxvY2sucHVzaCh7XHJcblx0XHRcdFwidHlwZVwiOiBcIkV4cHJlc3Npb25TdGF0ZW1lbnRcIixcclxuXHRcdFx0XCJleHByZXNzaW9uXCI6IHtcclxuXHRcdFx0XHRcInR5cGVcIjogXCJDYWxsRXhwcmVzc2lvblwiLFxyXG5cdFx0XHRcdFwiY2FsbGVlXCI6IHtcclxuXHRcdFx0XHRcdFwidHlwZVwiOiBcIk1lbWJlckV4cHJlc3Npb25cIixcclxuXHRcdFx0XHRcdFwiY29tcHV0ZWRcIjogZmFsc2UsXHJcblx0XHRcdFx0XHRcIm9iamVjdFwiOiB7XHJcblx0XHRcdFx0XHRcdFwidHlwZVwiOiBcIklkZW50aWZpZXJcIixcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IHRoaXMudklkXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XCJwcm9wZXJ0eVwiOiB7XHJcblx0XHRcdFx0XHRcdFwidHlwZVwiOiBcIklkZW50aWZpZXJcIixcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IFwiYXNzZW1ibGVcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0XCJhcmd1bWVudHNcIjogW1xyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcInR5cGVcIjogXCJMaXRlcmFsXCIsXHJcblx0XHRcdFx0XHRcdFwidmFsdWVcIjogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XCJyYXdcIjogXCJmYWxzZVwiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0XHJcblx0XHR0aGlzLnBhcnNlZENvZGUuYm9keVswXS5hbHRlcm5hdGU9e1xyXG5cdFx0XHRcInR5cGVcIjogXCJFeHByZXNzaW9uU3RhdGVtZW50XCIsXHJcblx0XHRcdFwiZXhwcmVzc2lvblwiOiB7XHJcblx0XHRcdFx0XCJ0eXBlXCI6IFwiQ2FsbEV4cHJlc3Npb25cIixcclxuXHRcdFx0XHRcImNhbGxlZVwiOiB7XHJcblx0XHRcdFx0XHRcInR5cGVcIjogXCJNZW1iZXJFeHByZXNzaW9uXCIsXHJcblx0XHRcdFx0XHRcImNvbXB1dGVkXCI6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XCJvYmplY3RcIjoge1xyXG5cdFx0XHRcdFx0XHRcInR5cGVcIjogXCJJZGVudGlmaWVyXCIsXHJcblx0XHRcdFx0XHRcdFwibmFtZVwiOiB0aGlzLnZJZFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFwicHJvcGVydHlcIjoge1xyXG5cdFx0XHRcdFx0XHRcInR5cGVcIjogXCJJZGVudGlmaWVyXCIsXHJcblx0XHRcdFx0XHRcdFwibmFtZVwiOiBcImFzc2VtYmxlXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdFwiYXJndW1lbnRzXCI6IFtcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiTGl0ZXJhbFwiLFxyXG5cdFx0XHRcdFx0XHRcInZhbHVlXCI6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcInJhd1wiOiBcImZhbHNlXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRdXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzc2VtYmxlKHNhdGlmaWVkKXtcclxuXHRcdGlmKCFzYXRpZmllZCl7XHJcblx0XHRcdHRoaXMuY2xlYXIoKVxyXG5cdFx0XHRzdXBlci5hc3NlbWJsZSguLi5hcmd1bWVudHMpXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0Ly9rZWVwIGl0XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==