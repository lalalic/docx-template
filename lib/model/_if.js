"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
		key: "assemble",
		value: function assemble() {
			var iPara = {},
			    code = this._toJavascript(iPara);
			var satified = new Function("data", code + " return true")(iPara);
			if (!satified) {
				var content = this.wXml.$1('sdtContent');
				while (content.lastChild) {
					content.removeChild(content.lastChild);
				}
			}
		}
	}, {
		key: "_toJavascript",
		value: function _toJavascript(iPara) {
			return this.variantParent._toJavascript(iPara) + " if(" + this.code + ")";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9faWYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs2QkFHVjtBQUNULE9BQUksUUFBTSxFQUFOO09BQVUsT0FBSyxLQUFLLGFBQUwsQ0FBbUIsS0FBbkIsQ0FBTCxDQURMO0FBRVQsT0FBSSxXQUFTLElBQUksUUFBSixDQUFhLE1BQWIsRUFBdUIscUJBQXZCLEVBQTJDLEtBQTNDLENBQVQsQ0FGSztBQUdULE9BQUcsQ0FBQyxRQUFELEVBQVU7QUFDWixRQUFJLFVBQVEsS0FBSyxJQUFMLENBQVUsRUFBVixDQUFhLFlBQWIsQ0FBUixDQURRO0FBRVosV0FBTSxRQUFRLFNBQVI7QUFDTCxhQUFRLFdBQVIsQ0FBb0IsUUFBUSxTQUFSLENBQXBCO0tBREQ7SUFGRDs7OztnQ0FNYSxPQUFNO0FBQ25CLFVBQVUsS0FBSyxhQUFMLENBQW1CLGFBQW5CLENBQWlDLEtBQWpDLGFBQThDLEtBQUssSUFBTCxNQUF4RCxDQURtQjs7OztzQkFYSDtBQUFDLFVBQU0sWUFBTixDQUFEOzs7O1FBREciLCJmaWxlIjoiX2lmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZhcmlhbnQgZnJvbSBcIi4vdmFyaWFudFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJZiBleHRlbmRzIFZhcmlhbnR7XHJcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuXCJ2YXJpYW50LmlmXCJ9XHJcblxyXG5cdGFzc2VtYmxlKCl7XHJcblx0XHR2YXIgaVBhcmE9e30sIGNvZGU9dGhpcy5fdG9KYXZhc2NyaXB0KGlQYXJhKVxyXG5cdFx0dmFyIHNhdGlmaWVkPW5ldyBGdW5jdGlvbihcImRhdGFcIixgJHtjb2RlfSByZXR1cm4gdHJ1ZWApKGlQYXJhKVxyXG5cdFx0aWYoIXNhdGlmaWVkKXtcclxuXHRcdFx0bGV0IGNvbnRlbnQ9dGhpcy53WG1sLiQxKCdzZHRDb250ZW50JylcclxuXHRcdFx0d2hpbGUoY29udGVudC5sYXN0Q2hpbGQpXHJcblx0XHRcdFx0Y29udGVudC5yZW1vdmVDaGlsZChjb250ZW50Lmxhc3RDaGlsZClcclxuXHRcdH1cclxuXHR9XHJcblx0X3RvSmF2YXNjcmlwdChpUGFyYSl7XHJcblx0XHRyZXR1cm4gYCR7dGhpcy52YXJpYW50UGFyZW50Ll90b0phdmFzY3JpcHQoaVBhcmEpfSBpZigke3RoaXMuY29kZX0pYFxyXG5cdH1cclxufVxyXG4iXX0=