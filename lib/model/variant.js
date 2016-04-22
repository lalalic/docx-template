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

var id = 0;

var Variant = function (_RichText) {
	_inherits(Variant, _RichText);

	function Variant() {
		_classCallCheck(this, Variant);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Variant).apply(this, arguments));

		_this.docxPart = _this.wDoc.parseContext.part.current;
		_this.vId = "__" + _this.constructor.type.split(".").pop() + "_" + id++;
		_this.parsedCode = arguments[3];
		_this._initVariant();
		return _this;
	}

	_createClass(Variant, [{
		key: "_initVariant",
		value: function _initVariant() {
			this.variantParent = null;
			this.variantChildren = [];
			this.wDoc.beginVariant(this);

			this.variantParent.codeBlock.push({
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
							"name": "pre_assemble"
						}
					},
					"arguments": []
				}
			});

			this.variantParent.codeBlock.push(this.parsedCode);

			this.variantParent.codeBlock.push({
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
							"name": "post_assemble"
						}
					},
					"arguments": []
				}
			});
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
			//this.assemble()
		}
	}, {
		key: "pre_assemble",
		value: function pre_assemble() {}
	}, {
		key: "post_assemble",
		value: function post_assemble() {
			var a = this.assembledXml;
			a && a.removeAttribute('id');
		}

		/**
  * assemble the variant Word model with data to a static word model 
  */

	}, {
		key: "assemble",
		value: function assemble() {
			this.docxPart.setChanged(true);
		}
	}, {
		key: "clear",
		value: function clear() {
			this.assembledXml.$1('sdtContent').innerHTML = "";
			/*
   if(this.assembledXml.parentNode)
   	this.assembledXml.remove()
   else
   	this.assembledXml=null
   */
		}
	}, {
		key: "assembledXml",
		set: function set(v) {
			this._assembledXml = v;
		},
		get: function get() {
			var a;
			if (this.isRootChild) return this._assembledXml || this.wXml;else if (a = this.variantParent.assembledXml) return a.querySelector("[id='" + this.vId + "']");
		}
	}]);

	return Variant;
}(_richtext2.default);

exports.default = Variant;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC92YXJpYW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLEtBQUcsQ0FBSDs7SUFDaUI7OztBQUNwQixVQURvQixPQUNwQixHQUFhO3dCQURPLFNBQ1A7O3FFQURPLHFCQUVWLFlBREc7O0FBRVosUUFBSyxRQUFMLEdBQWMsTUFBSyxJQUFMLENBQVUsWUFBVixDQUF1QixJQUF2QixDQUE0QixPQUE1QixDQUZGO0FBR1osUUFBSyxHQUFMLFVBQWMsTUFBSyxXQUFMLENBQWlCLElBQWpCLENBQXNCLEtBQXRCLENBQTRCLEdBQTVCLEVBQWlDLEdBQWpDLFdBQTBDLElBQXhELENBSFk7QUFJWixRQUFLLFVBQUwsR0FBZ0IsVUFBVSxDQUFWLENBQWhCLENBSlk7QUFLWixRQUFLLFlBQUwsR0FMWTs7RUFBYjs7Y0FEb0I7O2lDQVNOO0FBQ2IsUUFBSyxhQUFMLEdBQW1CLElBQW5CLENBRGE7QUFFYixRQUFLLGVBQUwsR0FBcUIsRUFBckIsQ0FGYTtBQUdiLFFBQUssSUFBTCxDQUFVLFlBQVYsQ0FBdUIsSUFBdkIsRUFIYTs7QUFLYixRQUFLLGFBQUwsQ0FBbUIsU0FBbkIsQ0FBNkIsSUFBN0IsQ0FBa0M7QUFDeEIsWUFBUSxxQkFBUjtBQUNBLGtCQUFjO0FBQ1YsYUFBUSxnQkFBUjtBQUNBLGVBQVU7QUFDckIsY0FBUSxrQkFBUjtBQUNBLGtCQUFZLEtBQVo7QUFDQSxnQkFBVTtBQUNULGVBQVEsWUFBUjtBQUNBLGVBQVEsS0FBSyxHQUFMO09BRlQ7QUFJQSxrQkFBWTtBQUNYLGVBQVEsWUFBUjtBQUNBLGVBQVEsY0FBUjtPQUZEO01BUFc7QUFZQSxrQkFBYSxFQUFiO0tBZEo7SUFGVixFQUxhOztBQTBCYixRQUFLLGFBQUwsQ0FBbUIsU0FBbkIsQ0FBNkIsSUFBN0IsQ0FBa0MsS0FBSyxVQUFMLENBQWxDLENBMUJhOztBQTRCYixRQUFLLGFBQUwsQ0FBbUIsU0FBbkIsQ0FBNkIsSUFBN0IsQ0FBa0M7QUFDeEIsWUFBUSxxQkFBUjtBQUNBLGtCQUFjO0FBQ1YsYUFBUSxnQkFBUjtBQUNBLGVBQVU7QUFDckIsY0FBUSxrQkFBUjtBQUNBLGtCQUFZLEtBQVo7QUFDQSxnQkFBVTtBQUNULGVBQVEsWUFBUjtBQUNBLGVBQVEsS0FBSyxHQUFMO09BRlQ7QUFJQSxrQkFBWTtBQUNYLGVBQVEsWUFBUjtBQUNBLGVBQVEsZUFBUjtPQUZEO01BUFc7QUFZQSxrQkFBYSxFQUFiO0tBZEo7SUFGVixFQTVCYTs7OzswQkFpRFA7O0FBQ04sT0FBSSwrQkEzRGUsK0NBMkRFLFVBQWpCLENBREU7QUFFTixRQUFLLElBQUwsQ0FBVSxVQUFWLENBQXFCLElBQXJCLEVBRk07QUFHTixVQUFPLENBQVAsQ0FITTs7OzswQkFNQTs7QUFDTixPQUFHLENBQUMsS0FBSyxJQUFMLENBQVUsSUFBVixFQUNILE9BREQ7O0FBRE07OztpQ0FNTzs7O2tDQUlDO0FBQ2QsT0FBSSxJQUFFLEtBQUssWUFBTCxDQURRO0FBRWQsUUFBSyxFQUFFLGVBQUYsQ0FBa0IsSUFBbEIsQ0FBTCxDQUZjOzs7Ozs7Ozs7NkJBUUw7QUFDVCxRQUFLLFFBQUwsQ0FBYyxVQUFkLENBQXlCLElBQXpCLEVBRFM7Ozs7MEJBZ0JIO0FBQ04sUUFBSyxZQUFMLENBQWtCLEVBQWxCLENBQXFCLFlBQXJCLEVBQW1DLFNBQW5DLEdBQTZDLEVBQTdDOzs7Ozs7O0FBRE07OztvQkFaVSxHQUFFO0FBQ2xCLFFBQUssYUFBTCxHQUFtQixDQUFuQixDQURrQjs7c0JBSUQ7QUFDakIsT0FBSSxDQUFKLENBRGlCO0FBRWpCLE9BQUcsS0FBSyxXQUFMLEVBQ0YsT0FBTyxLQUFLLGFBQUwsSUFBb0IsS0FBSyxJQUFMLENBRDVCLEtBRUssSUFBRyxJQUFFLEtBQUssYUFBTCxDQUFtQixZQUFuQixFQUNULE9BQU8sRUFBRSxhQUFGLFdBQXdCLEtBQUssR0FBTCxPQUF4QixDQUFQLENBREk7Ozs7UUE5RmMiLCJmaWxlIjoidmFyaWFudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSaWNoVGV4dCBmcm9tIFwiZG9jeDRqcy9saWIvb3BlbnhtbC9kb2N4L21vZGVsL2NvbnRyb2wvcmljaHRleHRcIlxyXG5pbXBvcnQgZXNwcmltYSBmcm9tIFwiZXNwcmltYVwiXHJcblxyXG52YXIgaWQ9MFxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWYXJpYW50IGV4dGVuZHMgUmljaFRleHR7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMuZG9jeFBhcnQ9dGhpcy53RG9jLnBhcnNlQ29udGV4dC5wYXJ0LmN1cnJlbnRcclxuXHRcdHRoaXMudklkPWBfXyR7dGhpcy5jb25zdHJ1Y3Rvci50eXBlLnNwbGl0KFwiLlwiKS5wb3AoKX1fJHtpZCsrfWBcclxuXHRcdHRoaXMucGFyc2VkQ29kZT1hcmd1bWVudHNbM11cclxuXHRcdHRoaXMuX2luaXRWYXJpYW50KClcclxuXHR9XHJcblxyXG5cdF9pbml0VmFyaWFudCgpe1xyXG5cdFx0dGhpcy52YXJpYW50UGFyZW50PW51bGxcclxuXHRcdHRoaXMudmFyaWFudENoaWxkcmVuPVtdXHJcblx0XHR0aGlzLndEb2MuYmVnaW5WYXJpYW50KHRoaXMpXHJcblx0XHRcclxuXHRcdHRoaXMudmFyaWFudFBhcmVudC5jb2RlQmxvY2sucHVzaCh7XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIkV4cHJlc3Npb25TdGF0ZW1lbnRcIixcclxuICAgICAgICAgICAgXCJleHByZXNzaW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkNhbGxFeHByZXNzaW9uXCIsXHJcbiAgICAgICAgICAgICAgICBcImNhbGxlZVwiOiB7XHJcblx0XHRcdFx0XHRcInR5cGVcIjogXCJNZW1iZXJFeHByZXNzaW9uXCIsXHJcblx0XHRcdFx0XHRcImNvbXB1dGVkXCI6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XCJvYmplY3RcIjoge1xyXG5cdFx0XHRcdFx0XHRcInR5cGVcIjogXCJJZGVudGlmaWVyXCIsXHJcblx0XHRcdFx0XHRcdFwibmFtZVwiOiB0aGlzLnZJZFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFwicHJvcGVydHlcIjoge1xyXG5cdFx0XHRcdFx0XHRcInR5cGVcIjogXCJJZGVudGlmaWVyXCIsXHJcblx0XHRcdFx0XHRcdFwibmFtZVwiOiBcInByZV9hc3NlbWJsZVwiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuICAgICAgICAgICAgICAgIFwiYXJndW1lbnRzXCI6IFtdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cdFx0XHJcblx0XHRcclxuXHRcdHRoaXMudmFyaWFudFBhcmVudC5jb2RlQmxvY2sucHVzaCh0aGlzLnBhcnNlZENvZGUpXHJcblx0XHRcclxuXHRcdHRoaXMudmFyaWFudFBhcmVudC5jb2RlQmxvY2sucHVzaCh7XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIkV4cHJlc3Npb25TdGF0ZW1lbnRcIixcclxuICAgICAgICAgICAgXCJleHByZXNzaW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkNhbGxFeHByZXNzaW9uXCIsXHJcbiAgICAgICAgICAgICAgICBcImNhbGxlZVwiOiB7XHJcblx0XHRcdFx0XHRcInR5cGVcIjogXCJNZW1iZXJFeHByZXNzaW9uXCIsXHJcblx0XHRcdFx0XHRcImNvbXB1dGVkXCI6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XCJvYmplY3RcIjoge1xyXG5cdFx0XHRcdFx0XHRcInR5cGVcIjogXCJJZGVudGlmaWVyXCIsXHJcblx0XHRcdFx0XHRcdFwibmFtZVwiOiB0aGlzLnZJZFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFwicHJvcGVydHlcIjoge1xyXG5cdFx0XHRcdFx0XHRcInR5cGVcIjogXCJJZGVudGlmaWVyXCIsXHJcblx0XHRcdFx0XHRcdFwibmFtZVwiOiBcInBvc3RfYXNzZW1ibGVcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcbiAgICAgICAgICAgICAgICBcImFyZ3VtZW50c1wiOiBbXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHR9XHJcblxyXG5cdHBhcnNlKCl7Ly9WYXJpYW50IGludGVyZmFjZVxyXG5cdFx0dmFyIHI9c3VwZXIucGFyc2UoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy53RG9jLmVuZFZhcmlhbnQodGhpcylcclxuXHRcdHJldHVybiByXHJcblx0fVxyXG5cclxuXHR2aXNpdCgpey8vVmlzaXRvciBpbnRlcmZhY2VcclxuXHRcdGlmKCF0aGlzLndEb2MuZGF0YSlcclxuXHRcdFx0cmV0dXJuXHJcblx0XHQvL3RoaXMuYXNzZW1ibGUoKVxyXG5cdH1cclxuXHRcclxuXHRwcmVfYXNzZW1ibGUoKXtcclxuXHRcdFxyXG5cdH1cclxuXHRcclxuXHRwb3N0X2Fzc2VtYmxlKCl7XHJcblx0XHRsZXQgYT10aGlzLmFzc2VtYmxlZFhtbFxyXG5cdFx0YSAmJiBhLnJlbW92ZUF0dHJpYnV0ZSgnaWQnKVxyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQqIGFzc2VtYmxlIHRoZSB2YXJpYW50IFdvcmQgbW9kZWwgd2l0aCBkYXRhIHRvIGEgc3RhdGljIHdvcmQgbW9kZWwgXHJcblx0Ki9cclxuXHRhc3NlbWJsZSgpe1xyXG5cdFx0dGhpcy5kb2N4UGFydC5zZXRDaGFuZ2VkKHRydWUpXHJcblx0fVxyXG5cdFxyXG5cdHNldCBhc3NlbWJsZWRYbWwodil7XHJcblx0XHR0aGlzLl9hc3NlbWJsZWRYbWw9dlxyXG5cdH1cclxuXHRcclxuXHRnZXQgYXNzZW1ibGVkWG1sKCl7XHJcblx0XHR2YXIgYTtcclxuXHRcdGlmKHRoaXMuaXNSb290Q2hpbGQpXHJcblx0XHRcdHJldHVybiB0aGlzLl9hc3NlbWJsZWRYbWx8fHRoaXMud1htbFxyXG5cdFx0ZWxzZSBpZihhPXRoaXMudmFyaWFudFBhcmVudC5hc3NlbWJsZWRYbWwpXHJcblx0XHRcdHJldHVybiBhLnF1ZXJ5U2VsZWN0b3IoYFtpZD0nJHt0aGlzLnZJZH0nXWApXHJcblx0fVxyXG5cdFxyXG5cdGNsZWFyKCl7XHJcblx0XHR0aGlzLmFzc2VtYmxlZFhtbC4kMSgnc2R0Q29udGVudCcpLmlubmVySFRNTD1cIlwiXHJcblx0XHQvKlxyXG5cdFx0aWYodGhpcy5hc3NlbWJsZWRYbWwucGFyZW50Tm9kZSlcclxuXHRcdFx0dGhpcy5hc3NlbWJsZWRYbWwucmVtb3ZlKClcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhpcy5hc3NlbWJsZWRYbWw9bnVsbFxyXG5cdFx0Ki9cclxuXHR9XHJcbn1cclxuIl19