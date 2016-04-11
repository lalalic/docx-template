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
		try {
			_this.parsedCode = _esprima2.default.parse(_this.code); //for validation
		} catch (e) {
			console.error("error " + _this.type + " code:" + _this.code);
			throw e;
		}
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
		value: function assemble() {}

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbC92YXJpYW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7OztBQUNwQixVQURvQixPQUNwQixHQUFhO3dCQURPLFNBQ1A7O3FFQURPLHFCQUVWLFlBREc7O0FBRVosUUFBSyxJQUFMLEdBQVUsVUFBVSxDQUFWLENBQVYsQ0FGWTtBQUdaLE1BQUc7QUFDRixTQUFLLFVBQUwsR0FBZ0Isa0JBQVEsS0FBUixDQUFjLE1BQUssSUFBTCxDQUE5QjtBQURFLEdBQUgsQ0FFQyxPQUFNLENBQU4sRUFBUTtBQUNSLFdBQVEsS0FBUixZQUF1QixNQUFLLElBQUwsY0FBa0IsTUFBSyxJQUFMLENBQXpDLENBRFE7QUFFUixTQUFNLENBQU4sQ0FGUTtHQUFSO0FBSUQsUUFBSyxZQUFMLEdBVFk7O0VBQWI7O2NBRG9COztpQ0FhTjtBQUNiLFFBQUssYUFBTCxHQUFtQixJQUFuQixDQURhO0FBRWIsUUFBSyxlQUFMLEdBQXFCLEVBQXJCLENBRmE7QUFHYixRQUFLLElBQUwsQ0FBVSxZQUFWLENBQXVCLElBQXZCLEVBSGE7Ozs7MEJBTVA7O0FBQ04sT0FBSSwrQkFwQmUsK0NBb0JFLFVBQWpCLENBREU7QUFFTixRQUFLLElBQUwsQ0FBVSxVQUFWLENBQXFCLElBQXJCLEVBRk07QUFHTixVQUFPLENBQVAsQ0FITTs7OzswQkFNQTs7QUFDTixPQUFHLENBQUMsS0FBSyxJQUFMLENBQVUsSUFBVixFQUNILE9BREQ7QUFFQSxRQUFLLFFBQUwsR0FITTs7Ozs7Ozs7OzZCQVNHOzs7Ozs7OztnQ0FPSSxPQUFNOzs7Ozs7OzttQ0FPSjs7O2tEQUllOzs7UUFwRFgiLCJmaWxlIjoidmFyaWFudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSaWNoVGV4dCBmcm9tIFwiZG9jeDRqcy9kaXN0L29wZW54bWwvZG9jeC9tb2RlbC9jb250cm9sL3JpY2h0ZXh0XCJcclxuaW1wb3J0IGVzcHJpbWEgZnJvbSBcImVzcHJpbWFcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFyaWFudCBleHRlbmRzIFJpY2hUZXh0e1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLmNvZGU9YXJndW1lbnRzWzNdXHJcblx0XHR0cnl7XHJcblx0XHRcdHRoaXMucGFyc2VkQ29kZT1lc3ByaW1hLnBhcnNlKHRoaXMuY29kZSkvL2ZvciB2YWxpZGF0aW9uXHJcblx0XHR9Y2F0Y2goZSl7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoYGVycm9yICR7dGhpcy50eXBlfSBjb2RlOiR7dGhpcy5jb2RlfWApXHJcblx0XHRcdHRocm93IGVcclxuXHRcdH1cclxuXHRcdHRoaXMuX2luaXRWYXJpYW50KClcclxuXHR9XHJcblxyXG5cdF9pbml0VmFyaWFudCgpe1xyXG5cdFx0dGhpcy52YXJpYW50UGFyZW50PW51bGxcclxuXHRcdHRoaXMudmFyaWFudENoaWxkcmVuPVtdXHJcblx0XHR0aGlzLndEb2MuYmVnaW5WYXJpYW50KHRoaXMpXHJcblx0fVxyXG5cclxuXHRwYXJzZSgpey8vVmFyaWFudCBpbnRlcmZhY2VcclxuXHRcdHZhciByPXN1cGVyLnBhcnNlKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMud0RvYy5lbmRWYXJpYW50KHRoaXMpXHJcblx0XHRyZXR1cm4gclxyXG5cdH1cclxuXHJcblx0dmlzaXQoKXsvL1Zpc2l0b3IgaW50ZXJmYWNlXHJcblx0XHRpZighdGhpcy53RG9jLmRhdGEpXHJcblx0XHRcdHJldHVyblxyXG5cdFx0dGhpcy5hc3NlbWJsZSgpXHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCogYXNzZW1ibGUgdGhlIHZhcmlhbnQgV29yZCBtb2RlbCB3aXRoIGRhdGEgdG8gYSBzdGF0aWMgd29yZCBtb2RlbCBcclxuXHQqL1xyXG5cdGFzc2VtYmxlKCl7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0KiBpbnRlcm5hbCB1c2VkLCB0aGUgY29kZSB0byByZXNvbHZpbmcgdmFyaWFudCB3aGVuIGFzc2VtYmxpbmdcclxuXHQqL1xyXG5cdF90b0phdmFzY3JpcHQoaVBhcmEpe1xyXG5cclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0KiB7dmFyTmFtZTp4eCxpZl94eHg6e30sIGZvcl94eHg6e319XHJcblx0Ki9cclxuXHRhc3NlbWJsZUFzRGF0YSgpe1xyXG5cdFx0XHJcblx0fVxyXG5cdFxyXG5cdF90b0phdmFzY3JpcHRPZkFzc2VtYmxlQXNEYXRhKCl7XHJcblx0XHRcclxuXHR9XHJcbn1cclxuIl19