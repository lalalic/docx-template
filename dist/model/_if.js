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
			debugger;
			var iPara = {},
			    code = this.toJavascript(iPara);
			var satified = new Function("data", code + " return true")(iPara);
			if (!satified) {
				var content = this.wXml.$1('sdtContent');
				while (content.lastChild) {
					content.removeChild(content.lastChild);
				}
			}
		}
	}, {
		key: "toJavascript",
		value: function toJavascript(iPara) {
			return this.variantParent.toJavascript(iPara) + " if(" + this.code + ")";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbC9faWYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs2QkFHVjtBQUNULFlBRFM7QUFFVCxPQUFJLFFBQU0sRUFBTjtPQUFVLE9BQUssS0FBSyxZQUFMLENBQWtCLEtBQWxCLENBQUwsQ0FGTDtBQUdULE9BQUksV0FBUyxJQUFJLFFBQUosQ0FBYSxNQUFiLEVBQXVCLHFCQUF2QixFQUEyQyxLQUEzQyxDQUFULENBSEs7QUFJVCxPQUFHLENBQUMsUUFBRCxFQUFVO0FBQ1osUUFBSSxVQUFRLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxZQUFiLENBQVIsQ0FEUTtBQUVaLFdBQU0sUUFBUSxTQUFSO0FBQ0wsYUFBUSxXQUFSLENBQW9CLFFBQVEsU0FBUixDQUFwQjtLQUREO0lBRkQ7Ozs7K0JBTVksT0FBTTtBQUNsQixVQUFVLEtBQUssYUFBTCxDQUFtQixZQUFuQixDQUFnQyxLQUFoQyxhQUE2QyxLQUFLLElBQUwsTUFBdkQsQ0FEa0I7Ozs7c0JBWkY7QUFBQyxVQUFNLFlBQU4sQ0FBRDs7OztRQURHIiwiZmlsZSI6Il9pZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWYXJpYW50IGZyb20gXCIuL3ZhcmlhbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWYgZXh0ZW5kcyBWYXJpYW50e1xyXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVyblwidmFyaWFudC5pZlwifVxyXG5cclxuXHRhc3NlbWJsZSgpe1xyXG5cdFx0ZGVidWdnZXJcclxuXHRcdHZhciBpUGFyYT17fSwgY29kZT10aGlzLnRvSmF2YXNjcmlwdChpUGFyYSlcclxuXHRcdHZhciBzYXRpZmllZD1uZXcgRnVuY3Rpb24oXCJkYXRhXCIsYCR7Y29kZX0gcmV0dXJuIHRydWVgKShpUGFyYSlcclxuXHRcdGlmKCFzYXRpZmllZCl7XHJcblx0XHRcdGxldCBjb250ZW50PXRoaXMud1htbC4kMSgnc2R0Q29udGVudCcpXHJcblx0XHRcdHdoaWxlKGNvbnRlbnQubGFzdENoaWxkKVxyXG5cdFx0XHRcdGNvbnRlbnQucmVtb3ZlQ2hpbGQoY29udGVudC5sYXN0Q2hpbGQpXHJcblx0XHR9XHJcblx0fVxyXG5cdHRvSmF2YXNjcmlwdChpUGFyYSl7XHJcblx0XHRyZXR1cm4gYCR7dGhpcy52YXJpYW50UGFyZW50LnRvSmF2YXNjcmlwdChpUGFyYSl9IGlmKCR7dGhpcy5jb2RlfSlgXHJcblx0fVxyXG59XHJcbiJdfQ==