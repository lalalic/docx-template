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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC92YXJpYW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7OztBQUNwQixVQURvQixPQUNwQixHQUFhO3dCQURPLFNBQ1A7O3FFQURPLHFCQUVWLFlBREc7O0FBRVosUUFBSyxJQUFMLEdBQVUsVUFBVSxDQUFWLENBQVYsQ0FGWTtBQUdaLE1BQUc7QUFDRixTQUFLLFVBQUwsR0FBZ0Isa0JBQVEsS0FBUixDQUFjLE1BQUssSUFBTCxDQUE5QjtBQURFLEdBQUgsQ0FFQyxPQUFNLENBQU4sRUFBUTtBQUNSLFdBQVEsS0FBUixZQUF1QixNQUFLLElBQUwsY0FBa0IsTUFBSyxJQUFMLENBQXpDLENBRFE7QUFFUixTQUFNLENBQU4sQ0FGUTtHQUFSO0FBSUQsUUFBSyxZQUFMLEdBVFk7O0VBQWI7O2NBRG9COztpQ0FhTjtBQUNiLFFBQUssYUFBTCxHQUFtQixJQUFuQixDQURhO0FBRWIsUUFBSyxlQUFMLEdBQXFCLEVBQXJCLENBRmE7QUFHYixRQUFLLElBQUwsQ0FBVSxZQUFWLENBQXVCLElBQXZCLEVBSGE7Ozs7MEJBTVA7O0FBQ04sT0FBSSwrQkFwQmUsK0NBb0JFLFVBQWpCLENBREU7QUFFTixRQUFLLElBQUwsQ0FBVSxVQUFWLENBQXFCLElBQXJCLEVBRk07QUFHTixVQUFPLENBQVAsQ0FITTs7OzswQkFNQTs7QUFDTixPQUFHLENBQUMsS0FBSyxJQUFMLENBQVUsSUFBVixFQUNILE9BREQ7QUFFQSxRQUFLLFFBQUwsR0FITTs7Ozs7Ozs7OzZCQVNHOzs7Ozs7OztnQ0FPSSxPQUFNOzs7Ozs7OzttQ0FPSjs7O2tEQUllOzs7UUFwRFgiLCJmaWxlIjoidmFyaWFudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSaWNoVGV4dCBmcm9tIFwiZG9jeDRqcy9saWIvb3BlbnhtbC9kb2N4L21vZGVsL2NvbnRyb2wvcmljaHRleHRcIlxyXG5pbXBvcnQgZXNwcmltYSBmcm9tIFwiZXNwcmltYVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWYXJpYW50IGV4dGVuZHMgUmljaFRleHR7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMuY29kZT1hcmd1bWVudHNbM11cclxuXHRcdHRyeXtcclxuXHRcdFx0dGhpcy5wYXJzZWRDb2RlPWVzcHJpbWEucGFyc2UodGhpcy5jb2RlKS8vZm9yIHZhbGlkYXRpb25cclxuXHRcdH1jYXRjaChlKXtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihgZXJyb3IgJHt0aGlzLnR5cGV9IGNvZGU6JHt0aGlzLmNvZGV9YClcclxuXHRcdFx0dGhyb3cgZVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5faW5pdFZhcmlhbnQoKVxyXG5cdH1cclxuXHJcblx0X2luaXRWYXJpYW50KCl7XHJcblx0XHR0aGlzLnZhcmlhbnRQYXJlbnQ9bnVsbFxyXG5cdFx0dGhpcy52YXJpYW50Q2hpbGRyZW49W11cclxuXHRcdHRoaXMud0RvYy5iZWdpblZhcmlhbnQodGhpcylcclxuXHR9XHJcblxyXG5cdHBhcnNlKCl7Ly9WYXJpYW50IGludGVyZmFjZVxyXG5cdFx0dmFyIHI9c3VwZXIucGFyc2UoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy53RG9jLmVuZFZhcmlhbnQodGhpcylcclxuXHRcdHJldHVybiByXHJcblx0fVxyXG5cclxuXHR2aXNpdCgpey8vVmlzaXRvciBpbnRlcmZhY2VcclxuXHRcdGlmKCF0aGlzLndEb2MuZGF0YSlcclxuXHRcdFx0cmV0dXJuXHJcblx0XHR0aGlzLmFzc2VtYmxlKClcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0KiBhc3NlbWJsZSB0aGUgdmFyaWFudCBXb3JkIG1vZGVsIHdpdGggZGF0YSB0byBhIHN0YXRpYyB3b3JkIG1vZGVsIFxyXG5cdCovXHJcblx0YXNzZW1ibGUoKXtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQqIGludGVybmFsIHVzZWQsIHRoZSBjb2RlIHRvIHJlc29sdmluZyB2YXJpYW50IHdoZW4gYXNzZW1ibGluZ1xyXG5cdCovXHJcblx0X3RvSmF2YXNjcmlwdChpUGFyYSl7XHJcblxyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQqIHt2YXJOYW1lOnh4LGlmX3h4eDp7fSwgZm9yX3h4eDp7fX1cclxuXHQqL1xyXG5cdGFzc2VtYmxlQXNEYXRhKCl7XHJcblx0XHRcclxuXHR9XHJcblx0XHJcblx0X3RvSmF2YXNjcmlwdE9mQXNzZW1ibGVBc0RhdGEoKXtcclxuXHRcdFxyXG5cdH1cclxufVxyXG4iXX0=