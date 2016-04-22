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
			var _this2 = this;

			if (value == null || value == undefined || value == '') {
				this.assembledXml.parentNode.removeChild(this.assembledXml);
			} else {
				(function () {
					var blip = _this2.assembledXml.$1('graphicData blip');

					_this2.getImageData(value).then(function (data) {
						var id = _this2.docxPart.addRel({
							type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
							target: data
						});
						blip.removeAttribute("r:embed");
						blip.setAttribute("r:link", id);
					});
				})();
			}
			_get(Object.getPrototypeOf(Picture.prototype), "assemble", this).apply(this, arguments);
		}
	}, {
		key: "getImageData",
		value: function getImageData(url) {
			return $.get(url);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fcGljdHVyZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7aUNBR047QUFDYiw4QkFKbUIsb0RBSW5COzs7QUFEYSxPQUliLENBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQixDQUFyQixJQUF3QjtBQUNkLFlBQVEscUJBQVI7QUFDQSxrQkFBYztBQUNWLGFBQVEsZ0JBQVI7QUFDQSxlQUFVO0FBQ3JCLGNBQVEsa0JBQVI7QUFDQSxrQkFBWSxLQUFaO0FBQ0EsZ0JBQVU7QUFDVCxlQUFRLFlBQVI7QUFDQSxlQUFRLEtBQUssR0FBTDtPQUZUO0FBSUEsa0JBQVk7QUFDWCxlQUFRLFlBQVI7QUFDQSxlQUFRLFVBQVI7T0FGRDtNQVBXO0FBWUEsa0JBQWEsQ0FDeEIsS0FBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCLENBQXJCLEVBQXdCLFVBQXhCLENBRFc7S0FkSjtJQUZWLENBSmE7Ozs7MkJBMkJMLE9BQU07OztBQUNkLE9BQUcsU0FBTyxJQUFQLElBQWUsU0FBTyxTQUFQLElBQW9CLFNBQU8sRUFBUCxFQUFVO0FBQy9DLFNBQUssWUFBTCxDQUFrQixVQUFsQixDQUE2QixXQUE3QixDQUF5QyxLQUFLLFlBQUwsQ0FBekMsQ0FEK0M7SUFBaEQsTUFFSzs7QUFDSixTQUFJLE9BQUssT0FBSyxZQUFMLENBQWtCLEVBQWxCLENBQXFCLGtCQUFyQixDQUFMOztBQUVKLFlBQUssWUFBTCxDQUFrQixLQUFsQixFQUF5QixJQUF6QixDQUE4QixnQkFBTTtBQUNuQyxVQUFJLEtBQUcsT0FBSyxRQUFMLENBQWMsTUFBZCxDQUFxQjtBQUMzQixhQUFLLDJFQUFMO0FBQ0EsZUFBTyxJQUFQO09BRk0sQ0FBSCxDQUQrQjtBQUtuQyxXQUFLLGVBQUwsQ0FBcUIsU0FBckIsRUFMbUM7QUFNbkMsV0FBSyxZQUFMLENBQWtCLFFBQWxCLEVBQTJCLEVBQTNCLEVBTm1DO01BQU4sQ0FBOUI7U0FISTtJQUZMO0FBY0EsOEJBN0NtQixrREE2Q0QsVUFBbEIsQ0FmYzs7OzsrQkFrQkYsS0FBSTtBQUNoQixVQUFPLEVBQUUsR0FBRixDQUFNLEdBQU4sQ0FBUCxDQURnQjs7OztzQkEvQ0E7QUFBQyxVQUFNLGlCQUFOLENBQUQ7Ozs7UUFERyIsImZpbGUiOiJfcGljdHVyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWYXJpYW50IGZyb20gXCIuL3ZhcmlhbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGljdHVyZSBleHRlbmRzIFZhcmlhbnR7XHJcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuXCJ2YXJpYW50LnBpY3R1cmVcIn1cclxuXHJcblx0X2luaXRWYXJpYW50KCl7XHJcblx0XHRzdXBlci5faW5pdFZhcmlhbnQoKVxyXG5cclxuXHRcdC8qYXNzZW1ibGUoY29kZSkqL1xyXG5cdFx0dGhpcy5wYXJzZWRDb2RlLmJvZHlbMF09e1xyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJFeHByZXNzaW9uU3RhdGVtZW50XCIsXHJcbiAgICAgICAgICAgIFwiZXhwcmVzc2lvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJDYWxsRXhwcmVzc2lvblwiLFxyXG4gICAgICAgICAgICAgICAgXCJjYWxsZWVcIjoge1xyXG5cdFx0XHRcdFx0XCJ0eXBlXCI6IFwiTWVtYmVyRXhwcmVzc2lvblwiLFxyXG5cdFx0XHRcdFx0XCJjb21wdXRlZFwiOiBmYWxzZSxcclxuXHRcdFx0XHRcdFwib2JqZWN0XCI6IHtcclxuXHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogdGhpcy52SWRcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcInByb3BlcnR5XCI6IHtcclxuXHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogXCJhc3NlbWJsZVwiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuICAgICAgICAgICAgICAgIFwiYXJndW1lbnRzXCI6IFtcclxuXHRcdFx0XHRcdHRoaXMucGFyc2VkQ29kZS5ib2R5WzBdLmV4cHJlc3Npb25cclxuXHRcdFx0XHRdXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzc2VtYmxlKHZhbHVlKXtcclxuXHRcdGlmKHZhbHVlPT1udWxsIHx8IHZhbHVlPT11bmRlZmluZWQgfHwgdmFsdWU9PScnKXtcclxuXHRcdFx0dGhpcy5hc3NlbWJsZWRYbWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmFzc2VtYmxlZFhtbClcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRsZXQgYmxpcD10aGlzLmFzc2VtYmxlZFhtbC4kMSgnZ3JhcGhpY0RhdGEgYmxpcCcpXHJcblxyXG5cdFx0XHR0aGlzLmdldEltYWdlRGF0YSh2YWx1ZSkudGhlbihkYXRhPT57XHJcblx0XHRcdFx0bGV0IGlkPXRoaXMuZG9jeFBhcnQuYWRkUmVsKHtcclxuXHRcdFx0XHRcdHR5cGU6XCJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvb2ZmaWNlRG9jdW1lbnQvMjAwNi9yZWxhdGlvbnNoaXBzL2ltYWdlXCIsXHJcblx0XHRcdFx0XHR0YXJnZXQ6ZGF0YVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0YmxpcC5yZW1vdmVBdHRyaWJ1dGUoXCJyOmVtYmVkXCIpXHJcblx0XHRcdFx0YmxpcC5zZXRBdHRyaWJ1dGUoXCJyOmxpbmtcIixpZClcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHRcdHN1cGVyLmFzc2VtYmxlKC4uLmFyZ3VtZW50cylcclxuXHR9XHJcblxyXG5cdGdldEltYWdlRGF0YSh1cmwpe1xyXG5cdFx0cmV0dXJuICQuZ2V0KHVybClcclxuXHR9XHJcbn1cclxuIl19