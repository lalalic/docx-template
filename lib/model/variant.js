"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _richtext = require("docx4js/lib/openxml/docx/model/control/richtext");

var _richtext2 = _interopRequireDefault(_richtext);

var _esprima = require("esprima");

var _esprima2 = _interopRequireDefault(_esprima);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var id = Date.now();

var Variant = function (_RichText) {
	_inherits(Variant, _RichText);

	function Variant() {
		_classCallCheck(this, Variant);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Variant).apply(this, arguments));

		_this.vId = id++;
		_this.code = arguments[3];
		_this.parsedCode = arguments[4];
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
			//Variant interface
			var r = _get(Object.getPrototypeOf(Variant.prototype), "parse", this).apply(this, arguments);
			this.wDoc.endVariant(this);
			return r;
		}
	}, {
		key: "visit",
		value: function visit() {
			//Visitor interface
			if (!this.wDoc.data) return;
			this.assemble();
		}

		/**
  * assemble the variant Word model with data to a static word model 
  */

	}, {
		key: "assemble",
		value: function assemble() {
			this.wDoc.parseContext.part.current.setChanged(true);
		}

		/**
  * internal used, the code to resolving variant when assembling
  */

	}, {
		key: "_toJavascript",
		value: function _toJavascript(iPara) {}

		/**
  * {varName:xx,if_xxx:{}, for_xxx:{}}
  */

	}, {
		key: "assembleAsData",
		value: function assembleAsData() {}
	}, {
		key: "_toJavascriptOfAssembleAsData",
		value: function _toJavascriptOfAssembleAsData() {}
	}]);

	return Variant;
}(_richtext2.default);

exports.default = Variant;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC92YXJpYW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLEtBQUcsS0FBSyxHQUFMLEVBQUg7O0lBQ2lCOzs7QUFDcEIsVUFEb0IsT0FDcEIsR0FBYTt3QkFETyxTQUNQOztxRUFETyxxQkFFVixZQURHOztBQUVaLFFBQUssR0FBTCxHQUFTLElBQVQsQ0FGWTtBQUdaLFFBQUssSUFBTCxHQUFVLFVBQVUsQ0FBVixDQUFWLENBSFk7QUFJWixRQUFLLFVBQUwsR0FBZ0IsVUFBVSxDQUFWLENBQWhCLENBSlk7QUFLWixRQUFLLFlBQUwsR0FMWTs7RUFBYjs7Y0FEb0I7O2lDQVNOO0FBQ2IsUUFBSyxhQUFMLEdBQW1CLElBQW5CLENBRGE7QUFFYixRQUFLLGVBQUwsR0FBcUIsRUFBckIsQ0FGYTtBQUdiLFFBQUssSUFBTCxDQUFVLFlBQVYsQ0FBdUIsSUFBdkIsRUFIYTs7OzswQkFNUDs7QUFDTixPQUFJLCtCQWhCZSwrQ0FnQkUsVUFBakIsQ0FERTtBQUVOLFFBQUssSUFBTCxDQUFVLFVBQVYsQ0FBcUIsSUFBckIsRUFGTTtBQUdOLFVBQU8sQ0FBUCxDQUhNOzs7OzBCQU1BOztBQUNOLE9BQUcsQ0FBQyxLQUFLLElBQUwsQ0FBVSxJQUFWLEVBQ0gsT0FERDtBQUVBLFFBQUssUUFBTCxHQUhNOzs7Ozs7Ozs7NkJBU0c7QUFDVCxRQUFLLElBQUwsQ0FBVSxZQUFWLENBQXVCLElBQXZCLENBQTRCLE9BQTVCLENBQW9DLFVBQXBDLENBQStDLElBQS9DLEVBRFM7Ozs7Ozs7OztnQ0FPSSxPQUFNOzs7Ozs7OzttQ0FPSjs7O2tEQUllOzs7UUFoRFgiLCJmaWxlIjoidmFyaWFudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSaWNoVGV4dCBmcm9tIFwiZG9jeDRqcy9saWIvb3BlbnhtbC9kb2N4L21vZGVsL2NvbnRyb2wvcmljaHRleHRcIlxyXG5pbXBvcnQgZXNwcmltYSBmcm9tIFwiZXNwcmltYVwiXHJcblxyXG52YXIgaWQ9RGF0ZS5ub3coKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWYXJpYW50IGV4dGVuZHMgUmljaFRleHR7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMudklkPWlkKytcclxuXHRcdHRoaXMuY29kZT1hcmd1bWVudHNbM11cclxuXHRcdHRoaXMucGFyc2VkQ29kZT1hcmd1bWVudHNbNF1cclxuXHRcdHRoaXMuX2luaXRWYXJpYW50KClcclxuXHR9XHJcblxyXG5cdF9pbml0VmFyaWFudCgpe1xyXG5cdFx0dGhpcy52YXJpYW50UGFyZW50PW51bGxcclxuXHRcdHRoaXMudmFyaWFudENoaWxkcmVuPVtdXHJcblx0XHR0aGlzLndEb2MuYmVnaW5WYXJpYW50KHRoaXMpXHJcblx0fVxyXG5cclxuXHRwYXJzZSgpey8vVmFyaWFudCBpbnRlcmZhY2VcclxuXHRcdHZhciByPXN1cGVyLnBhcnNlKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMud0RvYy5lbmRWYXJpYW50KHRoaXMpXHJcblx0XHRyZXR1cm4gclxyXG5cdH1cclxuXHJcblx0dmlzaXQoKXsvL1Zpc2l0b3IgaW50ZXJmYWNlXHJcblx0XHRpZighdGhpcy53RG9jLmRhdGEpXHJcblx0XHRcdHJldHVyblxyXG5cdFx0dGhpcy5hc3NlbWJsZSgpXHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCogYXNzZW1ibGUgdGhlIHZhcmlhbnQgV29yZCBtb2RlbCB3aXRoIGRhdGEgdG8gYSBzdGF0aWMgd29yZCBtb2RlbCBcclxuXHQqL1xyXG5cdGFzc2VtYmxlKCl7XHJcblx0XHR0aGlzLndEb2MucGFyc2VDb250ZXh0LnBhcnQuY3VycmVudC5zZXRDaGFuZ2VkKHRydWUpXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQqIGludGVybmFsIHVzZWQsIHRoZSBjb2RlIHRvIHJlc29sdmluZyB2YXJpYW50IHdoZW4gYXNzZW1ibGluZ1xyXG5cdCovXHJcblx0X3RvSmF2YXNjcmlwdChpUGFyYSl7XHJcblxyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQqIHt2YXJOYW1lOnh4LGlmX3h4eDp7fSwgZm9yX3h4eDp7fX1cclxuXHQqL1xyXG5cdGFzc2VtYmxlQXNEYXRhKCl7XHJcblx0XHRcclxuXHR9XHJcblx0XHJcblx0X3RvSmF2YXNjcmlwdE9mQXNzZW1ibGVBc0RhdGEoKXtcclxuXHRcdFxyXG5cdH1cclxufVxyXG4iXX0=