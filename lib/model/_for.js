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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(For).apply(this, arguments));
	}

	_createClass(For, [{
		key: "_initVariant",
		value: function _initVariant() {
			_get(Object.getPrototypeOf(For.prototype), "_initVariant", this).call(this);
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
			_get(Object.getPrototypeOf(For.prototype), "assemble", this).apply(this, arguments);
		}
	}, {
		key: "post_assemble",
		value: function post_assemble() {
			delete this.templates;
			_get(Object.getPrototypeOf(For.prototype), "post_assemble", this).call(this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fZm9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7OztpQ0FHTjtBQUNiLDhCQUptQixnREFJbkIsQ0FEYTtBQUViLFFBQUssU0FBTCxHQUFlLEtBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQixDQUFyQixFQUF3QixJQUF4QixDQUE2QixJQUE3QixDQUZGO0FBR2IsVUFBTSxDQUFDLE1BQU0sT0FBTixDQUFjLEtBQUssU0FBTCxDQUFmO0FBQ0wsU0FBSyxTQUFMLEdBQWUsS0FBSyxTQUFMLENBQWUsSUFBZjtJQURoQixJQUdBLENBQUssU0FBTCxDQUFlLElBQWYsQ0FBb0I7QUFDVixZQUFRLHFCQUFSO0FBQ0Esa0JBQWM7QUFDVixhQUFRLGdCQUFSO0FBQ0EsZUFBVTtBQUNyQixjQUFRLGtCQUFSO0FBQ0Esa0JBQVksS0FBWjtBQUNBLGdCQUFVO0FBQ1QsZUFBUSxZQUFSO0FBQ0EsZUFBUSxLQUFLLEdBQUw7T0FGVDtBQUlBLGtCQUFZO0FBQ1gsZUFBUSxZQUFSO0FBQ0EsZUFBUSxVQUFSO09BRkQ7TUFQVztBQVlBLGtCQUFhLEVBQWI7S0FkSjtJQUZWLEVBTmE7Ozs7aUNBMkJBO0FBQ2IsT0FBSSxhQUFXLEtBQUssWUFBTCxDQUFrQixFQUFsQixDQUFxQixZQUFyQixDQUFYLENBRFM7QUFFYixRQUFLLFNBQUwsR0FBZSxXQUFXLFVBQVgsQ0FBc0IsT0FBdEIsRUFBZixDQUZhO0FBR2IsUUFBSyxTQUFMLENBQWUsT0FBZixDQUF1QjtXQUFHLFdBQVcsV0FBWCxDQUF1QixDQUF2QjtJQUFILENBQXZCLENBSGE7Ozs7NkJBTUo7QUFDVCxPQUFJLGFBQVcsS0FBSyxZQUFMLENBQWtCLEVBQWxCLENBQXFCLFlBQXJCLENBQVgsQ0FESztBQUVULFFBQUssU0FBTCxDQUFlLE9BQWYsQ0FBdUI7V0FBRyxXQUFXLFdBQVgsQ0FBdUIsRUFBRSxTQUFGLENBQVksSUFBWixDQUF2QjtJQUFILENBQXZCLENBRlM7QUFHVCw4QkF2Q21CLDhDQXVDRCxVQUFsQixDQUhTOzs7O2tDQU1LO0FBQ2QsVUFBTyxLQUFLLFNBQUwsQ0FETztBQUVkLDhCQTVDbUIsaURBNENuQixDQUZjOzs7O3NCQXpDRTtBQUFDLFVBQU0sYUFBTixDQUFEOzs7O1FBREciLCJmaWxlIjoiX2Zvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWYXJpYW50IGZyb20gXCIuL3ZhcmlhbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9yIGV4dGVuZHMgVmFyaWFudHtcclxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm5cInZhcmlhbnQuZm9yXCJ9XHJcblx0XHJcblx0X2luaXRWYXJpYW50KCl7XHJcblx0XHRzdXBlci5faW5pdFZhcmlhbnQoKVxyXG5cdFx0dGhpcy5jb2RlQmxvY2s9dGhpcy5wYXJzZWRDb2RlLmJvZHlbMF0uYm9keS5ib2R5XHJcblx0XHR3aGlsZSghQXJyYXkuaXNBcnJheSh0aGlzLmNvZGVCbG9jaykpXHJcblx0XHRcdHRoaXMuY29kZUJsb2NrPXRoaXMuY29kZUJsb2NrLmJvZHlcclxuXHRcdFxyXG5cdFx0dGhpcy5jb2RlQmxvY2sucHVzaCh7XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIkV4cHJlc3Npb25TdGF0ZW1lbnRcIixcclxuICAgICAgICAgICAgXCJleHByZXNzaW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkNhbGxFeHByZXNzaW9uXCIsXHJcbiAgICAgICAgICAgICAgICBcImNhbGxlZVwiOiB7XHJcblx0XHRcdFx0XHRcInR5cGVcIjogXCJNZW1iZXJFeHByZXNzaW9uXCIsXHJcblx0XHRcdFx0XHRcImNvbXB1dGVkXCI6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XCJvYmplY3RcIjoge1xyXG5cdFx0XHRcdFx0XHRcInR5cGVcIjogXCJJZGVudGlmaWVyXCIsXHJcblx0XHRcdFx0XHRcdFwibmFtZVwiOiB0aGlzLnZJZFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFwicHJvcGVydHlcIjoge1xyXG5cdFx0XHRcdFx0XHRcInR5cGVcIjogXCJJZGVudGlmaWVyXCIsXHJcblx0XHRcdFx0XHRcdFwibmFtZVwiOiBcImFzc2VtYmxlXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG4gICAgICAgICAgICAgICAgXCJhcmd1bWVudHNcIjogW11cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0XHJcblx0cHJlX2Fzc2VtYmxlKCl7XHJcblx0XHR2YXIgc2R0Q29udGVudD10aGlzLmFzc2VtYmxlZFhtbC4kMSgnc2R0Q29udGVudCcpXHJcblx0XHR0aGlzLnRlbXBsYXRlcz1zZHRDb250ZW50LmNoaWxkTm9kZXMuYXNBcnJheSgpXHJcblx0XHR0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKGE9PnNkdENvbnRlbnQucmVtb3ZlQ2hpbGQoYSkpXHJcblx0fVxyXG5cclxuXHRhc3NlbWJsZSgpe1xyXG5cdFx0dmFyIHNkdENvbnRlbnQ9dGhpcy5hc3NlbWJsZWRYbWwuJDEoJ3NkdENvbnRlbnQnKVxyXG5cdFx0dGhpcy50ZW1wbGF0ZXMuZm9yRWFjaChhPT5zZHRDb250ZW50LmFwcGVuZENoaWxkKGEuY2xvbmVOb2RlKHRydWUpKSlcclxuXHRcdHN1cGVyLmFzc2VtYmxlKC4uLmFyZ3VtZW50cylcclxuXHR9XHJcblx0XHJcblx0cG9zdF9hc3NlbWJsZSgpe1xyXG5cdFx0ZGVsZXRlIHRoaXMudGVtcGxhdGVzXHJcblx0XHRzdXBlci5wb3N0X2Fzc2VtYmxlKClcclxuXHR9XHJcbn1cclxuIl19