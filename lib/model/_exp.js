"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _variant = require("./variant");

var _variant2 = _interopRequireDefault(_variant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Expression = function (_Variant) {
	(0, _inherits3.default)(Expression, _Variant);

	function Expression() {
		(0, _classCallCheck3.default)(this, Expression);
		return (0, _possibleConstructorReturn3.default)(this, (Expression.__proto__ || (0, _getPrototypeOf2.default)(Expression)).apply(this, arguments));
	}

	(0, _createClass3.default)(Expression, [{
		key: "_initVariant",
		value: function _initVariant() {
			(0, _get3.default)(Expression.prototype.__proto__ || (0, _getPrototypeOf2.default)(Expression.prototype), "_initVariant", this).call(this);

			/*assemble(code)*/
			this.parsedCode.body[0] = {
				"type": "TryStatement",
				"block": {
					"type": "BlockStatement",
					"body": [{
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
					}]
				},
				"guardedHandlers": [],
				"handlers": [{
					"type": "CatchClause",
					"param": {
						"type": "Identifier",
						"name": "e"
					},
					"body": {
						"type": "BlockStatement",
						"body": []
					}
				}],
				"handler": {
					"type": "CatchClause",
					"param": {
						"type": "Identifier",
						"name": "e"
					},
					"body": {
						"type": "BlockStatement",
						"body": []
					}
				},
				"finalizer": null
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
			(0, _get3.default)(Expression.prototype.__proto__ || (0, _getPrototypeOf2.default)(Expression.prototype), "assemble", this).apply(this, arguments);
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
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fZXhwLmpzIl0sIm5hbWVzIjpbIkV4cHJlc3Npb24iLCJwYXJzZWRDb2RlIiwiYm9keSIsInZJZCIsImV4cHJlc3Npb24iLCJ2YWx1ZSIsInVuZGVmaW5lZCIsImFzc2VtYmxlZFhtbCIsIiQiLCJmb3JFYWNoIiwidCIsInJlbW92ZSIsImkiLCJ0ZXh0Q29udGVudCIsImFyZ3VtZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVxQkEsVTs7Ozs7Ozs7OztpQ0FHTjtBQUNiOztBQUVBO0FBQ0EsUUFBS0MsVUFBTCxDQUFnQkMsSUFBaEIsQ0FBcUIsQ0FBckIsSUFBd0I7QUFDZCxZQUFRLGNBRE07QUFFZCxhQUFTO0FBQ0wsYUFBUSxnQkFESDtBQUVMLGFBQVEsQ0FBQztBQUNuQixjQUFRLHFCQURXO0FBRW5CLG9CQUFjO0FBQ2IsZUFBUSxnQkFESztBQUViLGlCQUFVO0FBQ1QsZ0JBQVEsa0JBREM7QUFFVCxvQkFBWSxLQUZIO0FBR1Qsa0JBQVU7QUFDVCxpQkFBUSxZQURDO0FBRVQsaUJBQVEsS0FBS0M7QUFGSixTQUhEO0FBT1Qsb0JBQVk7QUFDWCxpQkFBUSxZQURHO0FBRVgsaUJBQVE7QUFGRztBQVBILFFBRkc7QUFjYixvQkFBYSxDQUNaLEtBQUtGLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCLENBQXJCLEVBQXdCRSxVQURaO0FBZEE7QUFGSyxNQUFEO0FBRkgsS0FGSztBQTBCZCx1QkFBbUIsRUExQkw7QUEyQmQsZ0JBQVksQ0FDUjtBQUNJLGFBQVEsYUFEWjtBQUVJLGNBQVM7QUFDTCxjQUFRLFlBREg7QUFFTCxjQUFRO0FBRkgsTUFGYjtBQU1JLGFBQVE7QUFDSixjQUFRLGdCQURKO0FBRUosY0FBUTtBQUZKO0FBTlosS0FEUSxDQTNCRTtBQXdDZCxlQUFXO0FBQ1AsYUFBUSxhQUREO0FBRVAsY0FBUztBQUNMLGNBQVEsWUFESDtBQUVMLGNBQVE7QUFGSCxNQUZGO0FBTVAsYUFBUTtBQUNKLGNBQVEsZ0JBREo7QUFFSixjQUFRO0FBRko7QUFORCxLQXhDRztBQW1EZCxpQkFBYTtBQW5EQyxJQUF4QjtBQXFEQTs7OzJCQUVRQyxLLEVBQU07QUFDZCxPQUFHQSxTQUFPLElBQVAsSUFBZUEsU0FBT0MsU0FBdEIsSUFBbUNELFNBQU8sRUFBN0MsRUFBZ0Q7QUFDL0MsU0FBS0UsWUFBTCxDQUFrQkMsQ0FBbEIsQ0FBb0IsR0FBcEIsRUFBeUJDLE9BQXpCLENBQWlDO0FBQUEsWUFBR0MsRUFBRUMsTUFBRixFQUFIO0FBQUEsS0FBakM7QUFDQSxJQUZELE1BRUs7QUFDSixTQUFLSixZQUFMLENBQWtCQyxDQUFsQixDQUFvQixHQUFwQixFQUF5QkMsT0FBekIsQ0FBaUMsVUFBQ0MsQ0FBRCxFQUFHRSxDQUFILEVBQU87QUFDdkMsU0FBR0EsS0FBRyxDQUFOLEVBQ0NGLEVBQUVHLFdBQUYsR0FBY1IsS0FBZCxDQURELEtBR0NLLEVBQUVDLE1BQUY7QUFDRCxLQUxEO0FBTUE7QUFDRCwySUFBa0JHLFNBQWxCO0FBQ0E7OztzQkF6RWdCO0FBQUMsVUFBTSxhQUFOO0FBQW9COzs7OztrQkFEbEJkLFUiLCJmaWxlIjoiX2V4cC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWYXJpYW50IGZyb20gXCIuL3ZhcmlhbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhwcmVzc2lvbiBleHRlbmRzIFZhcmlhbnR7XHJcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuXCJ2YXJpYW50LmV4cFwifVxyXG5cdFxyXG5cdF9pbml0VmFyaWFudCgpe1xyXG5cdFx0c3VwZXIuX2luaXRWYXJpYW50KClcclxuXHRcdFxyXG5cdFx0Lyphc3NlbWJsZShjb2RlKSovXHJcblx0XHR0aGlzLnBhcnNlZENvZGUuYm9keVswXT17XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIlRyeVN0YXRlbWVudFwiLFxyXG4gICAgICAgICAgICBcImJsb2NrXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkJsb2NrU3RhdGVtZW50XCIsXHJcbiAgICAgICAgICAgICAgICBcImJvZHlcIjogW3tcclxuXHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiRXhwcmVzc2lvblN0YXRlbWVudFwiLFxyXG5cdFx0XHRcdFx0XHRcImV4cHJlc3Npb25cIjoge1xyXG5cdFx0XHRcdFx0XHRcdFwidHlwZVwiOiBcIkNhbGxFeHByZXNzaW9uXCIsXHJcblx0XHRcdFx0XHRcdFx0XCJjYWxsZWVcIjoge1xyXG5cdFx0XHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiTWVtYmVyRXhwcmVzc2lvblwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XCJjb21wdXRlZFwiOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0XHRcdFwib2JqZWN0XCI6IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcIm5hbWVcIjogdGhpcy52SWRcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHRcInByb3BlcnR5XCI6IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcIm5hbWVcIjogXCJhc3NlbWJsZVwiXHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRcImFyZ3VtZW50c1wiOiBbXHJcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnBhcnNlZENvZGUuYm9keVswXS5leHByZXNzaW9uXHJcblx0XHRcdFx0XHRcdFx0XVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImd1YXJkZWRIYW5kbGVyc1wiOiBbXSxcclxuICAgICAgICAgICAgXCJoYW5kbGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiQ2F0Y2hDbGF1c2VcIixcclxuICAgICAgICAgICAgICAgICAgICBcInBhcmFtXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJlXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYm9keVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkJsb2NrU3RhdGVtZW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9keVwiOiBbXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJoYW5kbGVyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkNhdGNoQ2xhdXNlXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcmFtXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJJZGVudGlmaWVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiZVwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJib2R5XCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJCbG9ja1N0YXRlbWVudFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYm9keVwiOiBbXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImZpbmFsaXplclwiOiBudWxsXHJcbiAgICAgICAgfVxyXG5cdH1cclxuXHJcblx0YXNzZW1ibGUodmFsdWUpe1xyXG5cdFx0aWYodmFsdWU9PW51bGwgfHwgdmFsdWU9PXVuZGVmaW5lZCB8fCB2YWx1ZT09Jycpe1xyXG5cdFx0XHR0aGlzLmFzc2VtYmxlZFhtbC4kKCd0JykuZm9yRWFjaCh0PT50LnJlbW92ZSgpKVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHRoaXMuYXNzZW1ibGVkWG1sLiQoJ3QnKS5mb3JFYWNoKCh0LGkpPT57XHJcblx0XHRcdFx0aWYoaT09MClcclxuXHRcdFx0XHRcdHQudGV4dENvbnRlbnQ9dmFsdWVcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHR0LnJlbW92ZSgpXHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0XHRzdXBlci5hc3NlbWJsZSguLi5hcmd1bWVudHMpXHJcblx0fVxyXG59XHJcbiJdfQ==