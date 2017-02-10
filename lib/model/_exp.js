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

		return _possibleConstructorReturn(this, (Expression.__proto__ || Object.getPrototypeOf(Expression)).apply(this, arguments));
	}

	_createClass(Expression, [{
		key: "_initVariant",
		value: function _initVariant() {
			_get(Expression.prototype.__proto__ || Object.getPrototypeOf(Expression.prototype), "_initVariant", this).call(this);

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
			_get(Expression.prototype.__proto__ || Object.getPrototypeOf(Expression.prototype), "assemble", this).apply(this, arguments);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fZXhwLmpzIl0sIm5hbWVzIjpbIkV4cHJlc3Npb24iLCJwYXJzZWRDb2RlIiwiYm9keSIsInZJZCIsImV4cHJlc3Npb24iLCJ2YWx1ZSIsInVuZGVmaW5lZCIsImFzc2VtYmxlZFhtbCIsIiQiLCJmb3JFYWNoIiwidCIsInJlbW92ZSIsImkiLCJ0ZXh0Q29udGVudCIsImFyZ3VtZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFU7Ozs7Ozs7Ozs7O2lDQUdOO0FBQ2I7O0FBRUE7QUFDQSxRQUFLQyxVQUFMLENBQWdCQyxJQUFoQixDQUFxQixDQUFyQixJQUF3QjtBQUNkLFlBQVEsY0FETTtBQUVkLGFBQVM7QUFDTCxhQUFRLGdCQURIO0FBRUwsYUFBUSxDQUFDO0FBQ25CLGNBQVEscUJBRFc7QUFFbkIsb0JBQWM7QUFDYixlQUFRLGdCQURLO0FBRWIsaUJBQVU7QUFDVCxnQkFBUSxrQkFEQztBQUVULG9CQUFZLEtBRkg7QUFHVCxrQkFBVTtBQUNULGlCQUFRLFlBREM7QUFFVCxpQkFBUSxLQUFLQztBQUZKLFNBSEQ7QUFPVCxvQkFBWTtBQUNYLGlCQUFRLFlBREc7QUFFWCxpQkFBUTtBQUZHO0FBUEgsUUFGRztBQWNiLG9CQUFhLENBQ1osS0FBS0YsVUFBTCxDQUFnQkMsSUFBaEIsQ0FBcUIsQ0FBckIsRUFBd0JFLFVBRFo7QUFkQTtBQUZLLE1BQUQ7QUFGSCxLQUZLO0FBMEJkLHVCQUFtQixFQTFCTDtBQTJCZCxnQkFBWSxDQUNSO0FBQ0ksYUFBUSxhQURaO0FBRUksY0FBUztBQUNMLGNBQVEsWUFESDtBQUVMLGNBQVE7QUFGSCxNQUZiO0FBTUksYUFBUTtBQUNKLGNBQVEsZ0JBREo7QUFFSixjQUFRO0FBRko7QUFOWixLQURRLENBM0JFO0FBd0NkLGVBQVc7QUFDUCxhQUFRLGFBREQ7QUFFUCxjQUFTO0FBQ0wsY0FBUSxZQURIO0FBRUwsY0FBUTtBQUZILE1BRkY7QUFNUCxhQUFRO0FBQ0osY0FBUSxnQkFESjtBQUVKLGNBQVE7QUFGSjtBQU5ELEtBeENHO0FBbURkLGlCQUFhO0FBbkRDLElBQXhCO0FBcURBOzs7MkJBRVFDLEssRUFBTTtBQUNkLE9BQUdBLFNBQU8sSUFBUCxJQUFlQSxTQUFPQyxTQUF0QixJQUFtQ0QsU0FBTyxFQUE3QyxFQUFnRDtBQUMvQyxTQUFLRSxZQUFMLENBQWtCQyxDQUFsQixDQUFvQixHQUFwQixFQUF5QkMsT0FBekIsQ0FBaUM7QUFBQSxZQUFHQyxFQUFFQyxNQUFGLEVBQUg7QUFBQSxLQUFqQztBQUNBLElBRkQsTUFFSztBQUNKLFNBQUtKLFlBQUwsQ0FBa0JDLENBQWxCLENBQW9CLEdBQXBCLEVBQXlCQyxPQUF6QixDQUFpQyxVQUFDQyxDQUFELEVBQUdFLENBQUgsRUFBTztBQUN2QyxTQUFHQSxLQUFHLENBQU4sRUFDQ0YsRUFBRUcsV0FBRixHQUFjUixLQUFkLENBREQsS0FHQ0ssRUFBRUMsTUFBRjtBQUNELEtBTEQ7QUFNQTtBQUNELHFIQUFrQkcsU0FBbEI7QUFDQTs7O3NCQXpFZ0I7QUFBQyxVQUFNLGFBQU47QUFBb0I7Ozs7OztrQkFEbEJkLFUiLCJmaWxlIjoiX2V4cC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWYXJpYW50IGZyb20gXCIuL3ZhcmlhbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhwcmVzc2lvbiBleHRlbmRzIFZhcmlhbnR7XHJcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuXCJ2YXJpYW50LmV4cFwifVxyXG5cdFxyXG5cdF9pbml0VmFyaWFudCgpe1xyXG5cdFx0c3VwZXIuX2luaXRWYXJpYW50KClcclxuXHRcdFxyXG5cdFx0Lyphc3NlbWJsZShjb2RlKSovXHJcblx0XHR0aGlzLnBhcnNlZENvZGUuYm9keVswXT17XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIlRyeVN0YXRlbWVudFwiLFxyXG4gICAgICAgICAgICBcImJsb2NrXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkJsb2NrU3RhdGVtZW50XCIsXHJcbiAgICAgICAgICAgICAgICBcImJvZHlcIjogW3tcclxuXHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiRXhwcmVzc2lvblN0YXRlbWVudFwiLFxyXG5cdFx0XHRcdFx0XHRcImV4cHJlc3Npb25cIjoge1xyXG5cdFx0XHRcdFx0XHRcdFwidHlwZVwiOiBcIkNhbGxFeHByZXNzaW9uXCIsXHJcblx0XHRcdFx0XHRcdFx0XCJjYWxsZWVcIjoge1xyXG5cdFx0XHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiTWVtYmVyRXhwcmVzc2lvblwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XCJjb21wdXRlZFwiOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0XHRcdFwib2JqZWN0XCI6IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcIm5hbWVcIjogdGhpcy52SWRcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHRcInByb3BlcnR5XCI6IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcIm5hbWVcIjogXCJhc3NlbWJsZVwiXHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRcImFyZ3VtZW50c1wiOiBbXHJcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnBhcnNlZENvZGUuYm9keVswXS5leHByZXNzaW9uXHJcblx0XHRcdFx0XHRcdFx0XVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImd1YXJkZWRIYW5kbGVyc1wiOiBbXSxcclxuICAgICAgICAgICAgXCJoYW5kbGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiQ2F0Y2hDbGF1c2VcIixcclxuICAgICAgICAgICAgICAgICAgICBcInBhcmFtXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJlXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYm9keVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkJsb2NrU3RhdGVtZW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9keVwiOiBbXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJoYW5kbGVyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkNhdGNoQ2xhdXNlXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcmFtXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJJZGVudGlmaWVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiZVwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJib2R5XCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJCbG9ja1N0YXRlbWVudFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYm9keVwiOiBbXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImZpbmFsaXplclwiOiBudWxsXHJcbiAgICAgICAgfVxyXG5cdH1cclxuXHJcblx0YXNzZW1ibGUodmFsdWUpe1xyXG5cdFx0aWYodmFsdWU9PW51bGwgfHwgdmFsdWU9PXVuZGVmaW5lZCB8fCB2YWx1ZT09Jycpe1xyXG5cdFx0XHR0aGlzLmFzc2VtYmxlZFhtbC4kKCd0JykuZm9yRWFjaCh0PT50LnJlbW92ZSgpKVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHRoaXMuYXNzZW1ibGVkWG1sLiQoJ3QnKS5mb3JFYWNoKCh0LGkpPT57XHJcblx0XHRcdFx0aWYoaT09MClcclxuXHRcdFx0XHRcdHQudGV4dENvbnRlbnQ9dmFsdWVcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHR0LnJlbW92ZSgpXHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0XHRzdXBlci5hc3NlbWJsZSguLi5hcmd1bWVudHMpXHJcblx0fVxyXG59XHJcbiJdfQ==