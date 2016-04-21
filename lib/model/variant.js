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

	function Variant(wXml) {
		_classCallCheck(this, Variant);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Variant).apply(this, arguments));

		_this.docxPart = _this.wDoc.parseContext.part.current;
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

			var fname = "assemble_" + this.vId;
			this.variantParent.codeBlock.push({
				"type": "ExpressionStatement",
				"expression": {
					"type": "CallExpression",
					"callee": {
						"type": "Identifier",
						"name": "pre_" + fname
					},
					"arguments": []
				}
			});
			this.wDoc.variantAssembles["pre_" + fname] = this.pre_assemble.bind(this);

			this.variantParent.codeBlock.push(this.parsedCode);
			this.wDoc.variantAssembles[fname] = this.assemble.bind(this);

			this.variantParent.codeBlock.push({
				"type": "ExpressionStatement",
				"expression": {
					"type": "CallExpression",
					"callee": {
						"type": "Identifier",
						"name": "post_" + fname
					},
					"arguments": []
				}
			});
			this.wDoc.variantAssembles["post_" + fname] = this.post_assemble.bind(this);
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
			if (this.assembledXml.parentNode) this.assembledXml.remove();else this.assembledXml = null;
		}
	}, {
		key: "assembledXml",
		set: function set(v) {
			this._assembledXml = v;
		},
		get: function get() {
			var a;
			if (this._assembledXml && null == this._assembledXml.parentNode) return this._assembledXml;else if (a = this.variantParent.assembledXml) return a.querySelector("[id='" + this.vId + "']");
		}
	}]);

	return Variant;
}(_richtext2.default);

exports.default = Variant;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC92YXJpYW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLEtBQUcsS0FBSyxHQUFMLEVBQUg7O0lBQ2lCOzs7QUFDcEIsVUFEb0IsT0FDcEIsQ0FBWSxJQUFaLEVBQWlCO3dCQURHLFNBQ0g7O3FFQURHLHFCQUVWLFlBRE87O0FBRWhCLFFBQUssUUFBTCxHQUFjLE1BQUssSUFBTCxDQUFVLFlBQVYsQ0FBdUIsSUFBdkIsQ0FBNEIsT0FBNUIsQ0FGRTtBQUdoQixRQUFLLEdBQUwsR0FBUyxJQUFULENBSGdCO0FBSWhCLFFBQUssSUFBTCxHQUFVLFVBQVUsQ0FBVixDQUFWLENBSmdCO0FBS2hCLFFBQUssVUFBTCxHQUFnQixVQUFVLENBQVYsQ0FBaEIsQ0FMZ0I7QUFNaEIsUUFBSyxZQUFMLEdBTmdCOztFQUFqQjs7Y0FEb0I7O2lDQVVOO0FBQ2IsUUFBSyxhQUFMLEdBQW1CLElBQW5CLENBRGE7QUFFYixRQUFLLGVBQUwsR0FBcUIsRUFBckIsQ0FGYTtBQUdiLFFBQUssSUFBTCxDQUFVLFlBQVYsQ0FBdUIsSUFBdkIsRUFIYTs7QUFPYixPQUFJLHNCQUFrQixLQUFLLEdBQUwsQ0FQVDtBQVFiLFFBQUssYUFBTCxDQUFtQixTQUFuQixDQUE2QixJQUE3QixDQUFrQztBQUN4QixZQUFRLHFCQUFSO0FBQ0Esa0JBQWM7QUFDVixhQUFRLGdCQUFSO0FBQ0EsZUFBVTtBQUNOLGNBQVEsWUFBUjtBQUNBLHVCQUFlLEtBQWY7TUFGSjtBQUlBLGtCQUFhLEVBQWI7S0FOSjtJQUZWLEVBUmE7QUFtQmIsUUFBSyxJQUFMLENBQVUsZ0JBQVYsVUFBa0MsS0FBbEMsSUFBMkMsS0FBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLElBQXZCLENBQTNDLENBbkJhOztBQXFCYixRQUFLLGFBQUwsQ0FBbUIsU0FBbkIsQ0FBNkIsSUFBN0IsQ0FBa0MsS0FBSyxVQUFMLENBQWxDLENBckJhO0FBc0JiLFFBQUssSUFBTCxDQUFVLGdCQUFWLENBQTJCLEtBQTNCLElBQWtDLEtBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsSUFBbkIsQ0FBbEMsQ0F0QmE7O0FBd0JiLFFBQUssYUFBTCxDQUFtQixTQUFuQixDQUE2QixJQUE3QixDQUFrQztBQUN4QixZQUFRLHFCQUFSO0FBQ0Esa0JBQWM7QUFDVixhQUFRLGdCQUFSO0FBQ0EsZUFBVTtBQUNOLGNBQVEsWUFBUjtBQUNBLHdCQUFnQixLQUFoQjtNQUZKO0FBSUEsa0JBQWEsRUFBYjtLQU5KO0lBRlYsRUF4QmE7QUFtQ2IsUUFBSyxJQUFMLENBQVUsZ0JBQVYsV0FBbUMsS0FBbkMsSUFBNEMsS0FBSyxhQUFMLENBQW1CLElBQW5CLENBQXdCLElBQXhCLENBQTVDLENBbkNhOzs7OzBCQXNDUDs7QUFDTixPQUFJLCtCQWpEZSwrQ0FpREUsVUFBakIsQ0FERTtBQUVOLFFBQUssSUFBTCxDQUFVLFVBQVYsQ0FBcUIsSUFBckIsRUFGTTtBQUdOLFVBQU8sQ0FBUCxDQUhNOzs7OzBCQU1BOztBQUNOLE9BQUcsQ0FBQyxLQUFLLElBQUwsQ0FBVSxJQUFWLEVBQ0gsT0FERDs7QUFETTs7O2lDQU1POzs7a0NBSUM7QUFDZCxPQUFJLElBQUUsS0FBSyxZQUFMLENBRFE7QUFFZCxRQUFLLEVBQUUsZUFBRixDQUFrQixJQUFsQixDQUFMLENBRmM7Ozs7Ozs7Ozs2QkFRTDtBQUNULFFBQUssUUFBTCxDQUFjLFVBQWQsQ0FBeUIsSUFBekIsRUFEUzs7OzswQkFnQkg7QUFDTixPQUFHLEtBQUssWUFBTCxDQUFrQixVQUFsQixFQUNGLEtBQUssWUFBTCxDQUFrQixNQUFsQixHQURELEtBR0MsS0FBSyxZQUFMLEdBQWtCLElBQWxCLENBSEQ7Ozs7b0JBYmdCLEdBQUU7QUFDbEIsUUFBSyxhQUFMLEdBQW1CLENBQW5CLENBRGtCOztzQkFJRDtBQUNqQixPQUFJLENBQUosQ0FEaUI7QUFFakIsT0FBRyxLQUFLLGFBQUwsSUFBdUIsUUFBTSxLQUFLLGFBQUwsQ0FBbUIsVUFBbkIsRUFDL0IsT0FBTyxLQUFLLGFBQUwsQ0FEUixLQUVLLElBQUcsSUFBRSxLQUFLLGFBQUwsQ0FBbUIsWUFBbkIsRUFDVCxPQUFPLEVBQUUsYUFBRixXQUF3QixLQUFLLEdBQUwsT0FBeEIsQ0FBUCxDQURJOzs7O1FBcEZjIiwiZmlsZSI6InZhcmlhbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmljaFRleHQgZnJvbSBcImRvY3g0anMvbGliL29wZW54bWwvZG9jeC9tb2RlbC9jb250cm9sL3JpY2h0ZXh0XCJcclxuaW1wb3J0IGVzcHJpbWEgZnJvbSBcImVzcHJpbWFcIlxyXG5cclxudmFyIGlkPURhdGUubm93KClcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFyaWFudCBleHRlbmRzIFJpY2hUZXh0e1xyXG5cdGNvbnN0cnVjdG9yKHdYbWwpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy5kb2N4UGFydD10aGlzLndEb2MucGFyc2VDb250ZXh0LnBhcnQuY3VycmVudFxyXG5cdFx0dGhpcy52SWQ9aWQrK1xyXG5cdFx0dGhpcy5jb2RlPWFyZ3VtZW50c1szXVxyXG5cdFx0dGhpcy5wYXJzZWRDb2RlPWFyZ3VtZW50c1s0XVxyXG5cdFx0dGhpcy5faW5pdFZhcmlhbnQoKVxyXG5cdH1cclxuXHJcblx0X2luaXRWYXJpYW50KCl7XHJcblx0XHR0aGlzLnZhcmlhbnRQYXJlbnQ9bnVsbFxyXG5cdFx0dGhpcy52YXJpYW50Q2hpbGRyZW49W11cclxuXHRcdHRoaXMud0RvYy5iZWdpblZhcmlhbnQodGhpcylcclxuXHRcdFxyXG5cdFx0XHJcblx0XHRcclxuXHRcdGxldCBmbmFtZT1gYXNzZW1ibGVfJHt0aGlzLnZJZH1gXHJcblx0XHR0aGlzLnZhcmlhbnRQYXJlbnQuY29kZUJsb2NrLnB1c2goe1xyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJFeHByZXNzaW9uU3RhdGVtZW50XCIsXHJcbiAgICAgICAgICAgIFwiZXhwcmVzc2lvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJDYWxsRXhwcmVzc2lvblwiLFxyXG4gICAgICAgICAgICAgICAgXCJjYWxsZWVcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIklkZW50aWZpZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogYHByZV8ke2ZuYW1lfWBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcImFyZ3VtZW50c1wiOiBbXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHRcdHRoaXMud0RvYy52YXJpYW50QXNzZW1ibGVzW2BwcmVfJHtmbmFtZX1gXT10aGlzLnByZV9hc3NlbWJsZS5iaW5kKHRoaXMpXHJcblx0XHRcclxuXHRcdHRoaXMudmFyaWFudFBhcmVudC5jb2RlQmxvY2sucHVzaCh0aGlzLnBhcnNlZENvZGUpXHJcblx0XHR0aGlzLndEb2MudmFyaWFudEFzc2VtYmxlc1tmbmFtZV09dGhpcy5hc3NlbWJsZS5iaW5kKHRoaXMpXHJcblx0XHRcclxuXHRcdHRoaXMudmFyaWFudFBhcmVudC5jb2RlQmxvY2sucHVzaCh7XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIkV4cHJlc3Npb25TdGF0ZW1lbnRcIixcclxuICAgICAgICAgICAgXCJleHByZXNzaW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkNhbGxFeHByZXNzaW9uXCIsXHJcbiAgICAgICAgICAgICAgICBcImNhbGxlZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBgcG9zdF8ke2ZuYW1lfWBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcImFyZ3VtZW50c1wiOiBbXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHRcdHRoaXMud0RvYy52YXJpYW50QXNzZW1ibGVzW2Bwb3N0XyR7Zm5hbWV9YF09dGhpcy5wb3N0X2Fzc2VtYmxlLmJpbmQodGhpcylcclxuXHR9XHJcblxyXG5cdHBhcnNlKCl7Ly9WYXJpYW50IGludGVyZmFjZVxyXG5cdFx0dmFyIHI9c3VwZXIucGFyc2UoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy53RG9jLmVuZFZhcmlhbnQodGhpcylcclxuXHRcdHJldHVybiByXHJcblx0fVxyXG5cclxuXHR2aXNpdCgpey8vVmlzaXRvciBpbnRlcmZhY2VcclxuXHRcdGlmKCF0aGlzLndEb2MuZGF0YSlcclxuXHRcdFx0cmV0dXJuXHJcblx0XHQvL3RoaXMuYXNzZW1ibGUoKVxyXG5cdH1cclxuXHRcclxuXHRwcmVfYXNzZW1ibGUoKXtcclxuXHRcdFxyXG5cdH1cclxuXHRcclxuXHRwb3N0X2Fzc2VtYmxlKCl7XHJcblx0XHRsZXQgYT10aGlzLmFzc2VtYmxlZFhtbFxyXG5cdFx0YSAmJiBhLnJlbW92ZUF0dHJpYnV0ZSgnaWQnKVxyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQqIGFzc2VtYmxlIHRoZSB2YXJpYW50IFdvcmQgbW9kZWwgd2l0aCBkYXRhIHRvIGEgc3RhdGljIHdvcmQgbW9kZWwgXHJcblx0Ki9cclxuXHRhc3NlbWJsZSgpe1xyXG5cdFx0dGhpcy5kb2N4UGFydC5zZXRDaGFuZ2VkKHRydWUpXHJcblx0fVxyXG5cdFxyXG5cdHNldCBhc3NlbWJsZWRYbWwodil7XHJcblx0XHR0aGlzLl9hc3NlbWJsZWRYbWw9dlxyXG5cdH1cclxuXHRcclxuXHRnZXQgYXNzZW1ibGVkWG1sKCl7XHJcblx0XHR2YXIgYTtcclxuXHRcdGlmKHRoaXMuX2Fzc2VtYmxlZFhtbCAgJiYgbnVsbD09dGhpcy5fYXNzZW1ibGVkWG1sLnBhcmVudE5vZGUpXHJcblx0XHRcdHJldHVybiB0aGlzLl9hc3NlbWJsZWRYbWxcclxuXHRcdGVsc2UgaWYoYT10aGlzLnZhcmlhbnRQYXJlbnQuYXNzZW1ibGVkWG1sKVxyXG5cdFx0XHRyZXR1cm4gYS5xdWVyeVNlbGVjdG9yKGBbaWQ9JyR7dGhpcy52SWR9J11gKVxyXG5cdH1cclxuXHRcclxuXHRjbGVhcigpe1xyXG5cdFx0aWYodGhpcy5hc3NlbWJsZWRYbWwucGFyZW50Tm9kZSlcclxuXHRcdFx0dGhpcy5hc3NlbWJsZWRYbWwucmVtb3ZlKClcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhpcy5hc3NlbWJsZWRYbWw9bnVsbFxyXG5cdH1cclxufVxyXG4iXX0=