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

var Picture = function (_Variant) {
	_inherits(Picture, _Variant);

	function Picture() {
		_classCallCheck(this, Picture);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Picture).apply(this, arguments));
	}

	_createClass(Picture, [{
		key: "_initVariant",
		value: function _initVariant() {
			_get(Object.getPrototypeOf(Picture.prototype), "_initVariant", this).call(this);

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
				this.assembledXml.parentNode.removeChild(this.assembledXml);
			} else {
				var id = this.docxPart.addRel({
					Type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
					Target: value,
					TargetMode: "External"
				});
				var blip = this.assembledXml.$1('graphicData blip');
				blip.removeAttribute("r:embed");
				blip.setAttribute("r:link", id);
			}
			_get(Object.getPrototypeOf(Picture.prototype), "assemble", this).apply(this, arguments);
		}
	}], [{
		key: "type",
		get: function get() {
			return "variant.picture";
		}
	}]);

	return Picture;
}(_variant2.default);

exports.default = Picture;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fcGljdHVyZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7aUNBR047QUFDYiw4QkFKbUIsb0RBSW5COzs7QUFEYSxPQUliLENBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQixDQUFyQixJQUF3QjtBQUNkLFlBQVEscUJBQVI7QUFDQSxrQkFBYztBQUNWLGFBQVEsZ0JBQVI7QUFDQSxlQUFVO0FBQ3JCLGNBQVEsa0JBQVI7QUFDQSxrQkFBWSxLQUFaO0FBQ0EsZ0JBQVU7QUFDVCxlQUFRLFlBQVI7QUFDQSxlQUFRLEtBQUssR0FBTDtPQUZUO0FBSUEsa0JBQVk7QUFDWCxlQUFRLFlBQVI7QUFDQSxlQUFRLFVBQVI7T0FGRDtNQVBXO0FBWUEsa0JBQWEsQ0FDeEIsS0FBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCLENBQXJCLEVBQXdCLFVBQXhCLENBRFc7S0FkSjtJQUZWLENBSmE7Ozs7MkJBMkJMLE9BQU07QUFDZCxPQUFHLFNBQU8sSUFBUCxJQUFlLFNBQU8sU0FBUCxJQUFvQixTQUFPLEVBQVAsRUFBVTtBQUMvQyxTQUFLLFlBQUwsQ0FBa0IsVUFBbEIsQ0FBNkIsV0FBN0IsQ0FBeUMsS0FBSyxZQUFMLENBQXpDLENBRCtDO0lBQWhELE1BRUs7QUFDSixRQUFJLEtBQUcsS0FBSyxRQUFMLENBQWMsTUFBZCxDQUFxQjtBQUMzQixXQUFLLDJFQUFMO0FBQ0EsYUFBTyxLQUFQO0FBQ0EsaUJBQVcsVUFBWDtLQUhNLENBQUgsQ0FEQTtBQU1KLFFBQUksT0FBSyxLQUFLLFlBQUwsQ0FBa0IsRUFBbEIsQ0FBcUIsa0JBQXJCLENBQUwsQ0FOQTtBQU9KLFNBQUssZUFBTCxDQUFxQixTQUFyQixFQVBJO0FBUUosU0FBSyxZQUFMLENBQWtCLFFBQWxCLEVBQTJCLEVBQTNCLEVBUkk7SUFGTDtBQVlBLDhCQTNDbUIsa0RBMkNELFVBQWxCLENBYmM7Ozs7c0JBN0JFO0FBQUMsVUFBTSxpQkFBTixDQUFEOzs7O1FBREciLCJmaWxlIjoiX3BpY3R1cmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmFyaWFudCBmcm9tIFwiLi92YXJpYW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBpY3R1cmUgZXh0ZW5kcyBWYXJpYW50e1xyXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVyblwidmFyaWFudC5waWN0dXJlXCJ9XHJcblx0XHJcblx0X2luaXRWYXJpYW50KCl7XHJcblx0XHRzdXBlci5faW5pdFZhcmlhbnQoKVxyXG5cdFx0XHJcblx0XHQvKmFzc2VtYmxlKGNvZGUpKi9cclxuXHRcdHRoaXMucGFyc2VkQ29kZS5ib2R5WzBdPXtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiRXhwcmVzc2lvblN0YXRlbWVudFwiLFxyXG4gICAgICAgICAgICBcImV4cHJlc3Npb25cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiQ2FsbEV4cHJlc3Npb25cIixcclxuICAgICAgICAgICAgICAgIFwiY2FsbGVlXCI6IHtcclxuXHRcdFx0XHRcdFwidHlwZVwiOiBcIk1lbWJlckV4cHJlc3Npb25cIixcclxuXHRcdFx0XHRcdFwiY29tcHV0ZWRcIjogZmFsc2UsXHJcblx0XHRcdFx0XHRcIm9iamVjdFwiOiB7XHJcblx0XHRcdFx0XHRcdFwidHlwZVwiOiBcIklkZW50aWZpZXJcIixcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IHRoaXMudklkXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XCJwcm9wZXJ0eVwiOiB7XHJcblx0XHRcdFx0XHRcdFwidHlwZVwiOiBcIklkZW50aWZpZXJcIixcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IFwiYXNzZW1ibGVcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcbiAgICAgICAgICAgICAgICBcImFyZ3VtZW50c1wiOiBbXHJcblx0XHRcdFx0XHR0aGlzLnBhcnNlZENvZGUuYm9keVswXS5leHByZXNzaW9uXHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhc3NlbWJsZSh2YWx1ZSl7XHJcblx0XHRpZih2YWx1ZT09bnVsbCB8fCB2YWx1ZT09dW5kZWZpbmVkIHx8IHZhbHVlPT0nJyl7XHJcblx0XHRcdHRoaXMuYXNzZW1ibGVkWG1sLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5hc3NlbWJsZWRYbWwpXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0bGV0IGlkPXRoaXMuZG9jeFBhcnQuYWRkUmVsKHtcclxuXHRcdFx0XHRUeXBlOlwiaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcy9pbWFnZVwiLFxyXG5cdFx0XHRcdFRhcmdldDp2YWx1ZSxcclxuXHRcdFx0XHRUYXJnZXRNb2RlOlwiRXh0ZXJuYWxcIlxyXG5cdFx0XHR9KVxyXG5cdFx0XHRsZXQgYmxpcD10aGlzLmFzc2VtYmxlZFhtbC4kMSgnZ3JhcGhpY0RhdGEgYmxpcCcpXHJcblx0XHRcdGJsaXAucmVtb3ZlQXR0cmlidXRlKFwicjplbWJlZFwiKVxyXG5cdFx0XHRibGlwLnNldEF0dHJpYnV0ZShcInI6bGlua1wiLGlkKVxyXG5cdFx0fVxyXG5cdFx0c3VwZXIuYXNzZW1ibGUoLi4uYXJndW1lbnRzKVxyXG5cdH1cclxufVxyXG4iXX0=