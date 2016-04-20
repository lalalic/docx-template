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
			this.codeBlock = this.parsedCode.body[0].consequent.body;
			while (!Array.isArray(this.codeBlock)) {
				//if()with(){}
				this.codeBlock = this.codeBlock.body;
			}_get(Object.getPrototypeOf(If.prototype), "_initVariant", this).call(this);
		}
	}, {
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
			_get(Object.getPrototypeOf(If.prototype), "assemble", this).apply(this, arguments);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9faWYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7O2lDQUVOO0FBQ2IsUUFBSyxTQUFMLEdBQWUsS0FBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCLENBQXJCLEVBQXdCLFVBQXhCLENBQW1DLElBQW5DLENBREY7QUFFYixVQUFNLENBQUMsTUFBTSxPQUFOLENBQWMsS0FBSyxTQUFMLENBQWY7O0FBQ0wsU0FBSyxTQUFMLEdBQWUsS0FBSyxTQUFMLENBQWUsSUFBZjtJQURoQiwyQkFKbUIsK0NBTW5CLENBSmE7Ozs7NkJBT0o7QUFDVCxPQUFJLFFBQU0sRUFBTjtPQUFVLE9BQUssS0FBSyxhQUFMLENBQW1CLEtBQW5CLENBQUwsQ0FETDtBQUVULE9BQUksV0FBUyxJQUFJLFFBQUosQ0FBYSxNQUFiLEVBQXVCLHFCQUF2QixFQUEyQyxLQUEzQyxDQUFULENBRks7QUFHVCxPQUFHLENBQUMsUUFBRCxFQUFVO0FBQ1osUUFBSSxVQUFRLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxZQUFiLENBQVIsQ0FEUTtBQUVaLFdBQU0sUUFBUSxTQUFSO0FBQ0wsYUFBUSxXQUFSLENBQW9CLFFBQVEsU0FBUixDQUFwQjtLQUREO0lBRkQ7QUFLQSw4QkFqQm1CLDZDQWlCRCxVQUFsQixDQVJTOzs7O2dDQVVJLE9BQU07QUFDbkIsVUFBVSxLQUFLLGFBQUwsQ0FBbUIsYUFBbkIsQ0FBaUMsS0FBakMsYUFBOEMsS0FBSyxJQUFMLE1BQXhELENBRG1COzs7O3NCQWxCSDtBQUFDLFVBQU0sWUFBTixDQUFEOzs7O1FBREciLCJmaWxlIjoiX2lmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZhcmlhbnQgZnJvbSBcIi4vdmFyaWFudFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJZiBleHRlbmRzIFZhcmlhbnR7XHJcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuXCJ2YXJpYW50LmlmXCJ9XHJcblx0X2luaXRWYXJpYW50KCl7XHJcblx0XHR0aGlzLmNvZGVCbG9jaz10aGlzLnBhcnNlZENvZGUuYm9keVswXS5jb25zZXF1ZW50LmJvZHlcclxuXHRcdHdoaWxlKCFBcnJheS5pc0FycmF5KHRoaXMuY29kZUJsb2NrKSkvL2lmKCl3aXRoKCl7fVxyXG5cdFx0XHR0aGlzLmNvZGVCbG9jaz10aGlzLmNvZGVCbG9jay5ib2R5XHJcblx0XHRzdXBlci5faW5pdFZhcmlhbnQoKVxyXG5cdH1cclxuXHJcblx0YXNzZW1ibGUoKXtcclxuXHRcdHZhciBpUGFyYT17fSwgY29kZT10aGlzLl90b0phdmFzY3JpcHQoaVBhcmEpXHJcblx0XHR2YXIgc2F0aWZpZWQ9bmV3IEZ1bmN0aW9uKFwiZGF0YVwiLGAke2NvZGV9IHJldHVybiB0cnVlYCkoaVBhcmEpXHJcblx0XHRpZighc2F0aWZpZWQpe1xyXG5cdFx0XHRsZXQgY29udGVudD10aGlzLndYbWwuJDEoJ3NkdENvbnRlbnQnKVxyXG5cdFx0XHR3aGlsZShjb250ZW50Lmxhc3RDaGlsZClcclxuXHRcdFx0XHRjb250ZW50LnJlbW92ZUNoaWxkKGNvbnRlbnQubGFzdENoaWxkKVxyXG5cdFx0fVxyXG5cdFx0c3VwZXIuYXNzZW1ibGUoLi4uYXJndW1lbnRzKVxyXG5cdH1cclxuXHRfdG9KYXZhc2NyaXB0KGlQYXJhKXtcclxuXHRcdHJldHVybiBgJHt0aGlzLnZhcmlhbnRQYXJlbnQuX3RvSmF2YXNjcmlwdChpUGFyYSl9IGlmKCR7dGhpcy5jb2RlfSlgXHJcblx0fVxyXG59XHJcbiJdfQ==