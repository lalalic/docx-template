"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _richtext = require("docx4js/dist/openxml/docx/model/control/richtext");

var _richtext2 = _interopRequireDefault(_richtext);

var _esprima = require("esprima");

var _esprima2 = _interopRequireDefault(_esprima);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Variant = function (_RichText) {
	_inherits(Variant, _RichText);

	function Variant() {
		_classCallCheck(this, Variant);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Variant).apply(this, arguments));

		_this.code = arguments[3];
		_this.parsedCode = _esprima2.default.parse(_this.code); //for validation
		_this._initVariant();
		return _this;
	}

	_createClass(Variant, [{
		key: "_initVariant",
		value: function _initVariant() {
			this.variantParent = null;
			this.variantChildren = [];
			this.wDoc.beginVariant(this);
		}
	}, {
		key: "parse",
		value: function parse() {
			var r = _get(Object.getPrototypeOf(Variant.prototype), "parse", this).apply(this, arguments);
			this.wDoc.endVariant(this);
			return r;
		}
	}, {
		key: "visit",
		value: function visit() {
			if (!this.wDoc.data) return;
			this.assemble();
		}
	}, {
		key: "assemble",
		value: function assemble() {}
	}, {
		key: "_toJavascript",
		value: function _toJavascript(iPara) {}
	}]);

	return Variant;
}(_richtext2.default);

exports.default = Variant;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbC92YXJpYW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7OztBQUNwQixVQURvQixPQUNwQixHQUFhO3dCQURPLFNBQ1A7O3FFQURPLHFCQUVWLFlBREc7O0FBRVosUUFBSyxJQUFMLEdBQVUsVUFBVSxDQUFWLENBQVYsQ0FGWTtBQUdaLFFBQUssVUFBTCxHQUFnQixrQkFBUSxLQUFSLENBQWMsTUFBSyxJQUFMLENBQTlCO0FBSFksT0FJWixDQUFLLFlBQUwsR0FKWTs7RUFBYjs7Y0FEb0I7O2lDQVFOO0FBQ2IsUUFBSyxhQUFMLEdBQW1CLElBQW5CLENBRGE7QUFFYixRQUFLLGVBQUwsR0FBcUIsRUFBckIsQ0FGYTtBQUdiLFFBQUssSUFBTCxDQUFVLFlBQVYsQ0FBdUIsSUFBdkIsRUFIYTs7OzswQkFNUDtBQUNOLE9BQUksK0JBZmUsK0NBZUUsVUFBakIsQ0FERTtBQUVOLFFBQUssSUFBTCxDQUFVLFVBQVYsQ0FBcUIsSUFBckIsRUFGTTtBQUdOLFVBQU8sQ0FBUCxDQUhNOzs7OzBCQU1BO0FBQ04sT0FBRyxDQUFDLEtBQUssSUFBTCxDQUFVLElBQVYsRUFDSCxPQUREO0FBRUEsUUFBSyxRQUFMLEdBSE07Ozs7NkJBTUc7OztnQ0FJSSxPQUFNOzs7UUE5QkEiLCJmaWxlIjoidmFyaWFudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSaWNoVGV4dCBmcm9tIFwiZG9jeDRqcy9kaXN0L29wZW54bWwvZG9jeC9tb2RlbC9jb250cm9sL3JpY2h0ZXh0XCJcclxuaW1wb3J0IGVzcHJpbWEgZnJvbSBcImVzcHJpbWFcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFyaWFudCBleHRlbmRzIFJpY2hUZXh0e1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLmNvZGU9YXJndW1lbnRzWzNdXHJcblx0XHR0aGlzLnBhcnNlZENvZGU9ZXNwcmltYS5wYXJzZSh0aGlzLmNvZGUpLy9mb3IgdmFsaWRhdGlvblxyXG5cdFx0dGhpcy5faW5pdFZhcmlhbnQoKVxyXG5cdH1cclxuXHRcclxuXHRfaW5pdFZhcmlhbnQoKXtcclxuXHRcdHRoaXMudmFyaWFudFBhcmVudD1udWxsXHJcblx0XHR0aGlzLnZhcmlhbnRDaGlsZHJlbj1bXVxyXG5cdFx0dGhpcy53RG9jLmJlZ2luVmFyaWFudCh0aGlzKVxyXG5cdH1cclxuXHRcclxuXHRwYXJzZSgpe1xyXG5cdFx0dmFyIHI9c3VwZXIucGFyc2UoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy53RG9jLmVuZFZhcmlhbnQodGhpcylcclxuXHRcdHJldHVybiByXHJcblx0fVxyXG5cdFxyXG5cdHZpc2l0KCl7XHJcblx0XHRpZighdGhpcy53RG9jLmRhdGEpXHJcblx0XHRcdHJldHVyblxyXG5cdFx0dGhpcy5hc3NlbWJsZSgpXHJcblx0fVxyXG5cdFxyXG5cdGFzc2VtYmxlKCl7XHJcblx0XHRcclxuXHR9XHJcblx0XHJcblx0X3RvSmF2YXNjcmlwdChpUGFyYSl7XHJcblx0XHRcclxuXHR9XHJcbn0iXX0=