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

var For = function (_Variant) {
	_inherits(For, _Variant);

	function For() {
		_classCallCheck(this, For);

		return _possibleConstructorReturn(this, (For.__proto__ || Object.getPrototypeOf(For)).apply(this, arguments));
	}

	_createClass(For, [{
		key: "_initVariant",
		value: function _initVariant() {
			_get(For.prototype.__proto__ || Object.getPrototypeOf(For.prototype), "_initVariant", this).call(this);
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
			_get(For.prototype.__proto__ || Object.getPrototypeOf(For.prototype), "assemble", this).apply(this, arguments);
		}
	}, {
		key: "post_assemble",
		value: function post_assemble() {
			delete this.templates;
			_get(For.prototype.__proto__ || Object.getPrototypeOf(For.prototype), "post_assemble", this).call(this);
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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fZm9yLmpzIl0sIm5hbWVzIjpbIkZvciIsImNvZGVCbG9jayIsInBhcnNlZENvZGUiLCJib2R5IiwiQXJyYXkiLCJpc0FycmF5IiwicHVzaCIsInZJZCIsInNkdENvbnRlbnQiLCJhc3NlbWJsZWRYbWwiLCIkMSIsInRlbXBsYXRlcyIsImNoaWxkTm9kZXMiLCJhc0FycmF5IiwiZm9yRWFjaCIsInJlbW92ZUNoaWxkIiwiYSIsImFwcGVuZENoaWxkIiwiY2xvbmVOb2RlIiwiYXJndW1lbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQkEsRzs7Ozs7Ozs7Ozs7aUNBR047QUFDYjtBQUNBLFFBQUtDLFNBQUwsR0FBZSxLQUFLQyxVQUFMLENBQWdCQyxJQUFoQixDQUFxQixDQUFyQixFQUF3QkEsSUFBeEIsQ0FBNkJBLElBQTVDO0FBQ0EsVUFBTSxDQUFDQyxNQUFNQyxPQUFOLENBQWMsS0FBS0osU0FBbkIsQ0FBUDtBQUNDLFNBQUtBLFNBQUwsR0FBZSxLQUFLQSxTQUFMLENBQWVFLElBQTlCO0FBREQsSUFHQSxLQUFLRixTQUFMLENBQWVLLElBQWYsQ0FBb0I7QUFDVixZQUFRLHFCQURFO0FBRVYsa0JBQWM7QUFDVixhQUFRLGdCQURFO0FBRVYsZUFBVTtBQUNyQixjQUFRLGtCQURhO0FBRXJCLGtCQUFZLEtBRlM7QUFHckIsZ0JBQVU7QUFDVCxlQUFRLFlBREM7QUFFVCxlQUFRLEtBQUtDO0FBRkosT0FIVztBQU9yQixrQkFBWTtBQUNYLGVBQVEsWUFERztBQUVYLGVBQVE7QUFGRztBQVBTLE1BRkE7QUFjVixrQkFBYTtBQWRIO0FBRkosSUFBcEI7QUFtQkE7OztpQ0FFYTtBQUNiLE9BQUlDLGFBQVcsS0FBS0MsWUFBTCxDQUFrQkMsRUFBbEIsQ0FBcUIsWUFBckIsQ0FBZjtBQUNBLFFBQUtDLFNBQUwsR0FBZUgsV0FBV0ksVUFBWCxDQUFzQkMsT0FBdEIsRUFBZjtBQUNBLFFBQUtGLFNBQUwsQ0FBZUcsT0FBZixDQUF1QjtBQUFBLFdBQUdOLFdBQVdPLFdBQVgsQ0FBdUJDLENBQXZCLENBQUg7QUFBQSxJQUF2QjtBQUNBOzs7NkJBRVM7QUFDVCxPQUFJUixhQUFXLEtBQUtDLFlBQUwsQ0FBa0JDLEVBQWxCLENBQXFCLFlBQXJCLENBQWY7QUFDQSxRQUFLQyxTQUFMLENBQWVHLE9BQWYsQ0FBdUI7QUFBQSxXQUFHTixXQUFXUyxXQUFYLENBQXVCRCxFQUFFRSxTQUFGLENBQVksSUFBWixDQUF2QixDQUFIO0FBQUEsSUFBdkI7QUFDQSx1R0FBa0JDLFNBQWxCO0FBQ0E7OztrQ0FFYztBQUNkLFVBQU8sS0FBS1IsU0FBWjtBQUNBO0FBQ0E7OztzQkE1Q2dCO0FBQUMsVUFBTSxhQUFOO0FBQW9COzs7Ozs7a0JBRGxCWCxHIiwiZmlsZSI6Il9mb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmFyaWFudCBmcm9tIFwiLi92YXJpYW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvciBleHRlbmRzIFZhcmlhbnR7XHJcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuXCJ2YXJpYW50LmZvclwifVxyXG5cdFxyXG5cdF9pbml0VmFyaWFudCgpe1xyXG5cdFx0c3VwZXIuX2luaXRWYXJpYW50KClcclxuXHRcdHRoaXMuY29kZUJsb2NrPXRoaXMucGFyc2VkQ29kZS5ib2R5WzBdLmJvZHkuYm9keVxyXG5cdFx0d2hpbGUoIUFycmF5LmlzQXJyYXkodGhpcy5jb2RlQmxvY2spKVxyXG5cdFx0XHR0aGlzLmNvZGVCbG9jaz10aGlzLmNvZGVCbG9jay5ib2R5XHJcblx0XHRcclxuXHRcdHRoaXMuY29kZUJsb2NrLnB1c2goe1xyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJFeHByZXNzaW9uU3RhdGVtZW50XCIsXHJcbiAgICAgICAgICAgIFwiZXhwcmVzc2lvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJDYWxsRXhwcmVzc2lvblwiLFxyXG4gICAgICAgICAgICAgICAgXCJjYWxsZWVcIjoge1xyXG5cdFx0XHRcdFx0XCJ0eXBlXCI6IFwiTWVtYmVyRXhwcmVzc2lvblwiLFxyXG5cdFx0XHRcdFx0XCJjb21wdXRlZFwiOiBmYWxzZSxcclxuXHRcdFx0XHRcdFwib2JqZWN0XCI6IHtcclxuXHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogdGhpcy52SWRcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcInByb3BlcnR5XCI6IHtcclxuXHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogXCJhc3NlbWJsZVwiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuICAgICAgICAgICAgICAgIFwiYXJndW1lbnRzXCI6IFtdXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdFxyXG5cdHByZV9hc3NlbWJsZSgpe1xyXG5cdFx0dmFyIHNkdENvbnRlbnQ9dGhpcy5hc3NlbWJsZWRYbWwuJDEoJ3NkdENvbnRlbnQnKVxyXG5cdFx0dGhpcy50ZW1wbGF0ZXM9c2R0Q29udGVudC5jaGlsZE5vZGVzLmFzQXJyYXkoKVxyXG5cdFx0dGhpcy50ZW1wbGF0ZXMuZm9yRWFjaChhPT5zZHRDb250ZW50LnJlbW92ZUNoaWxkKGEpKVxyXG5cdH1cclxuXHJcblx0YXNzZW1ibGUoKXtcclxuXHRcdHZhciBzZHRDb250ZW50PXRoaXMuYXNzZW1ibGVkWG1sLiQxKCdzZHRDb250ZW50JylcclxuXHRcdHRoaXMudGVtcGxhdGVzLmZvckVhY2goYT0+c2R0Q29udGVudC5hcHBlbmRDaGlsZChhLmNsb25lTm9kZSh0cnVlKSkpXHJcblx0XHRzdXBlci5hc3NlbWJsZSguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cdFxyXG5cdHBvc3RfYXNzZW1ibGUoKXtcclxuXHRcdGRlbGV0ZSB0aGlzLnRlbXBsYXRlc1xyXG5cdFx0c3VwZXIucG9zdF9hc3NlbWJsZSgpXHJcblx0fVxyXG59XHJcbiJdfQ==