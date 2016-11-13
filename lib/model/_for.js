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

var For = function (_Variant) {
	(0, _inherits3.default)(For, _Variant);

	function For() {
		(0, _classCallCheck3.default)(this, For);
		return (0, _possibleConstructorReturn3.default)(this, (For.__proto__ || (0, _getPrototypeOf2.default)(For)).apply(this, arguments));
	}

	(0, _createClass3.default)(For, [{
		key: "_initVariant",
		value: function _initVariant() {
			(0, _get3.default)(For.prototype.__proto__ || (0, _getPrototypeOf2.default)(For.prototype), "_initVariant", this).call(this);
			this.codeBlock = this.parsedCode.body[0].body.body;
			while (!Array.isArray(this.codeBlock)) {
				this.codeBlock = this.codeBlock.body;
			}this.codeBlock.push({
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
					"arguments": []
				}
			});
		}
	}, {
		key: "pre_assemble",
		value: function pre_assemble() {
			var sdtContent = this.assembledXml.$1('sdtContent');
			this.templates = sdtContent.childNodes.asArray();
			this.templates.forEach(function (a) {
				return sdtContent.removeChild(a);
			});
		}
	}, {
		key: "assemble",
		value: function assemble() {
			var sdtContent = this.assembledXml.$1('sdtContent');
			this.templates.forEach(function (a) {
				return sdtContent.appendChild(a.cloneNode(true));
			});
			(0, _get3.default)(For.prototype.__proto__ || (0, _getPrototypeOf2.default)(For.prototype), "assemble", this).apply(this, arguments);
		}
	}, {
		key: "post_assemble",
		value: function post_assemble() {
			delete this.templates;
			(0, _get3.default)(For.prototype.__proto__ || (0, _getPrototypeOf2.default)(For.prototype), "post_assemble", this).call(this);
		}
	}], [{
		key: "type",
		get: function get() {
			return "variant.for";
		}
	}]);
	return For;
}(_variant2.default);

exports.default = For;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fZm9yLmpzIl0sIm5hbWVzIjpbIkZvciIsImNvZGVCbG9jayIsInBhcnNlZENvZGUiLCJib2R5IiwiQXJyYXkiLCJpc0FycmF5IiwicHVzaCIsInZJZCIsInNkdENvbnRlbnQiLCJhc3NlbWJsZWRYbWwiLCIkMSIsInRlbXBsYXRlcyIsImNoaWxkTm9kZXMiLCJhc0FycmF5IiwiZm9yRWFjaCIsInJlbW92ZUNoaWxkIiwiYSIsImFwcGVuZENoaWxkIiwiY2xvbmVOb2RlIiwiYXJndW1lbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRXFCQSxHOzs7Ozs7Ozs7O2lDQUdOO0FBQ2I7QUFDQSxRQUFLQyxTQUFMLEdBQWUsS0FBS0MsVUFBTCxDQUFnQkMsSUFBaEIsQ0FBcUIsQ0FBckIsRUFBd0JBLElBQXhCLENBQTZCQSxJQUE1QztBQUNBLFVBQU0sQ0FBQ0MsTUFBTUMsT0FBTixDQUFjLEtBQUtKLFNBQW5CLENBQVA7QUFDQyxTQUFLQSxTQUFMLEdBQWUsS0FBS0EsU0FBTCxDQUFlRSxJQUE5QjtBQURELElBR0EsS0FBS0YsU0FBTCxDQUFlSyxJQUFmLENBQW9CO0FBQ1YsWUFBUSxxQkFERTtBQUVWLGtCQUFjO0FBQ1YsYUFBUSxnQkFERTtBQUVWLGVBQVU7QUFDckIsY0FBUSxrQkFEYTtBQUVyQixrQkFBWSxLQUZTO0FBR3JCLGdCQUFVO0FBQ1QsZUFBUSxZQURDO0FBRVQsZUFBUSxLQUFLQztBQUZKLE9BSFc7QUFPckIsa0JBQVk7QUFDWCxlQUFRLFlBREc7QUFFWCxlQUFRO0FBRkc7QUFQUyxNQUZBO0FBY1Ysa0JBQWE7QUFkSDtBQUZKLElBQXBCO0FBbUJBOzs7aUNBRWE7QUFDYixPQUFJQyxhQUFXLEtBQUtDLFlBQUwsQ0FBa0JDLEVBQWxCLENBQXFCLFlBQXJCLENBQWY7QUFDQSxRQUFLQyxTQUFMLEdBQWVILFdBQVdJLFVBQVgsQ0FBc0JDLE9BQXRCLEVBQWY7QUFDQSxRQUFLRixTQUFMLENBQWVHLE9BQWYsQ0FBdUI7QUFBQSxXQUFHTixXQUFXTyxXQUFYLENBQXVCQyxDQUF2QixDQUFIO0FBQUEsSUFBdkI7QUFDQTs7OzZCQUVTO0FBQ1QsT0FBSVIsYUFBVyxLQUFLQyxZQUFMLENBQWtCQyxFQUFsQixDQUFxQixZQUFyQixDQUFmO0FBQ0EsUUFBS0MsU0FBTCxDQUFlRyxPQUFmLENBQXVCO0FBQUEsV0FBR04sV0FBV1MsV0FBWCxDQUF1QkQsRUFBRUUsU0FBRixDQUFZLElBQVosQ0FBdkIsQ0FBSDtBQUFBLElBQXZCO0FBQ0EsNkhBQWtCQyxTQUFsQjtBQUNBOzs7a0NBRWM7QUFDZCxVQUFPLEtBQUtSLFNBQVo7QUFDQTtBQUNBOzs7c0JBNUNnQjtBQUFDLFVBQU0sYUFBTjtBQUFvQjs7Ozs7a0JBRGxCWCxHIiwiZmlsZSI6Il9mb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmFyaWFudCBmcm9tIFwiLi92YXJpYW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvciBleHRlbmRzIFZhcmlhbnR7XHJcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuXCJ2YXJpYW50LmZvclwifVxyXG5cdFxyXG5cdF9pbml0VmFyaWFudCgpe1xyXG5cdFx0c3VwZXIuX2luaXRWYXJpYW50KClcclxuXHRcdHRoaXMuY29kZUJsb2NrPXRoaXMucGFyc2VkQ29kZS5ib2R5WzBdLmJvZHkuYm9keVxyXG5cdFx0d2hpbGUoIUFycmF5LmlzQXJyYXkodGhpcy5jb2RlQmxvY2spKVxyXG5cdFx0XHR0aGlzLmNvZGVCbG9jaz10aGlzLmNvZGVCbG9jay5ib2R5XHJcblx0XHRcclxuXHRcdHRoaXMuY29kZUJsb2NrLnB1c2goe1xyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJFeHByZXNzaW9uU3RhdGVtZW50XCIsXHJcbiAgICAgICAgICAgIFwiZXhwcmVzc2lvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJDYWxsRXhwcmVzc2lvblwiLFxyXG4gICAgICAgICAgICAgICAgXCJjYWxsZWVcIjoge1xyXG5cdFx0XHRcdFx0XCJ0eXBlXCI6IFwiTWVtYmVyRXhwcmVzc2lvblwiLFxyXG5cdFx0XHRcdFx0XCJjb21wdXRlZFwiOiBmYWxzZSxcclxuXHRcdFx0XHRcdFwib2JqZWN0XCI6IHtcclxuXHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogdGhpcy52SWRcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcInByb3BlcnR5XCI6IHtcclxuXHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogXCJhc3NlbWJsZVwiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuICAgICAgICAgICAgICAgIFwiYXJndW1lbnRzXCI6IFtdXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdFxyXG5cdHByZV9hc3NlbWJsZSgpe1xyXG5cdFx0dmFyIHNkdENvbnRlbnQ9dGhpcy5hc3NlbWJsZWRYbWwuJDEoJ3NkdENvbnRlbnQnKVxyXG5cdFx0dGhpcy50ZW1wbGF0ZXM9c2R0Q29udGVudC5jaGlsZE5vZGVzLmFzQXJyYXkoKVxyXG5cdFx0dGhpcy50ZW1wbGF0ZXMuZm9yRWFjaChhPT5zZHRDb250ZW50LnJlbW92ZUNoaWxkKGEpKVxyXG5cdH1cclxuXHJcblx0YXNzZW1ibGUoKXtcclxuXHRcdHZhciBzZHRDb250ZW50PXRoaXMuYXNzZW1ibGVkWG1sLiQxKCdzZHRDb250ZW50JylcclxuXHRcdHRoaXMudGVtcGxhdGVzLmZvckVhY2goYT0+c2R0Q29udGVudC5hcHBlbmRDaGlsZChhLmNsb25lTm9kZSh0cnVlKSkpXHJcblx0XHRzdXBlci5hc3NlbWJsZSguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cdFxyXG5cdHBvc3RfYXNzZW1ibGUoKXtcclxuXHRcdGRlbGV0ZSB0aGlzLnRlbXBsYXRlc1xyXG5cdFx0c3VwZXIucG9zdF9hc3NlbWJsZSgpXHJcblx0fVxyXG59XHJcbiJdfQ==