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
			Array.from(this.assembledXml.$1('sdtContent').childNodes).forEach(function (child) {
				return child.parentNode.removeChild(child);
			});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC92YXJpYW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLEtBQUcsQ0FBSDs7SUFDaUI7OztBQUNwQixVQURvQixPQUNwQixHQUFhO3dCQURPLFNBQ1A7O3FFQURPLHFCQUVWLFlBREc7O0FBRVosUUFBSyxRQUFMLEdBQWMsTUFBSyxJQUFMLENBQVUsWUFBVixDQUF1QixJQUF2QixDQUE0QixPQUE1QixDQUZGO0FBR1osUUFBSyxHQUFMLFVBQWMsTUFBSyxXQUFMLENBQWlCLElBQWpCLENBQXNCLEtBQXRCLENBQTRCLEdBQTVCLEVBQWlDLEdBQWpDLFdBQTBDLElBQXhELENBSFk7QUFJWixRQUFLLFVBQUwsR0FBZ0IsVUFBVSxDQUFWLENBQWhCLENBSlk7QUFLWixRQUFLLFlBQUwsR0FMWTs7RUFBYjs7Y0FEb0I7O2lDQVNOO0FBQ2IsUUFBSyxhQUFMLEdBQW1CLElBQW5CLENBRGE7QUFFYixRQUFLLGVBQUwsR0FBcUIsRUFBckIsQ0FGYTtBQUdiLFFBQUssSUFBTCxDQUFVLFlBQVYsQ0FBdUIsSUFBdkIsRUFIYTs7QUFLYixRQUFLLGFBQUwsQ0FBbUIsU0FBbkIsQ0FBNkIsSUFBN0IsQ0FBa0M7QUFDeEIsWUFBUSxxQkFBUjtBQUNBLGtCQUFjO0FBQ1YsYUFBUSxnQkFBUjtBQUNBLGVBQVU7QUFDckIsY0FBUSxrQkFBUjtBQUNBLGtCQUFZLEtBQVo7QUFDQSxnQkFBVTtBQUNULGVBQVEsWUFBUjtBQUNBLGVBQVEsS0FBSyxHQUFMO09BRlQ7QUFJQSxrQkFBWTtBQUNYLGVBQVEsWUFBUjtBQUNBLGVBQVEsY0FBUjtPQUZEO01BUFc7QUFZQSxrQkFBYSxFQUFiO0tBZEo7SUFGVixFQUxhOztBQTBCYixRQUFLLGFBQUwsQ0FBbUIsU0FBbkIsQ0FBNkIsSUFBN0IsQ0FBa0MsS0FBSyxVQUFMLENBQWxDLENBMUJhOztBQTRCYixRQUFLLGFBQUwsQ0FBbUIsU0FBbkIsQ0FBNkIsSUFBN0IsQ0FBa0M7QUFDeEIsWUFBUSxxQkFBUjtBQUNBLGtCQUFjO0FBQ1YsYUFBUSxnQkFBUjtBQUNBLGVBQVU7QUFDckIsY0FBUSxrQkFBUjtBQUNBLGtCQUFZLEtBQVo7QUFDQSxnQkFBVTtBQUNULGVBQVEsWUFBUjtBQUNBLGVBQVEsS0FBSyxHQUFMO09BRlQ7QUFJQSxrQkFBWTtBQUNYLGVBQVEsWUFBUjtBQUNBLGVBQVEsZUFBUjtPQUZEO01BUFc7QUFZQSxrQkFBYSxFQUFiO0tBZEo7SUFGVixFQTVCYTs7OzswQkFpRFA7O0FBQ04sT0FBSSwrQkEzRGUsK0NBMkRFLFVBQWpCLENBREU7QUFFTixRQUFLLElBQUwsQ0FBVSxVQUFWLENBQXFCLElBQXJCLEVBRk07QUFHTixVQUFPLENBQVAsQ0FITTs7OzswQkFNQTs7QUFDTixPQUFHLENBQUMsS0FBSyxJQUFMLENBQVUsSUFBVixFQUNILE9BREQ7O0FBRE07OztpQ0FNTzs7O2tDQUlDO0FBQ2QsT0FBSSxJQUFFLEtBQUssWUFBTCxDQURRO0FBRWQsUUFBSyxFQUFFLGVBQUYsQ0FBa0IsSUFBbEIsQ0FBTCxDQUZjOzs7Ozs7Ozs7NkJBUUw7QUFDVCxRQUFLLFFBQUwsQ0FBYyxVQUFkLENBQXlCLElBQXpCLEVBRFM7Ozs7MEJBZ0JIO0FBQ04sU0FBTSxJQUFOLENBQVcsS0FBSyxZQUFMLENBQWtCLEVBQWxCLENBQXFCLFlBQXJCLEVBQW1DLFVBQW5DLENBQVgsQ0FDRSxPQURGLENBQ1U7V0FBTyxNQUFNLFVBQU4sQ0FBaUIsV0FBakIsQ0FBNkIsS0FBN0I7SUFBUCxDQURWLENBRE07Ozs7b0JBWlUsR0FBRTtBQUNsQixRQUFLLGFBQUwsR0FBbUIsQ0FBbkIsQ0FEa0I7O3NCQUlEO0FBQ2pCLE9BQUksQ0FBSixDQURpQjtBQUVqQixPQUFHLEtBQUssV0FBTCxFQUNGLE9BQU8sS0FBSyxhQUFMLElBQW9CLEtBQUssSUFBTCxDQUQ1QixLQUVLLElBQUcsSUFBRSxLQUFLLGFBQUwsQ0FBbUIsWUFBbkIsRUFDVCxPQUFPLEVBQUUsYUFBRixXQUF3QixLQUFLLEdBQUwsT0FBeEIsQ0FBUCxDQURJOzs7O1FBOUZjIiwiZmlsZSI6InZhcmlhbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmljaFRleHQgZnJvbSBcImRvY3g0anMvbGliL29wZW54bWwvZG9jeC9tb2RlbC9jb250cm9sL3JpY2h0ZXh0XCJcclxuaW1wb3J0IGVzcHJpbWEgZnJvbSBcImVzcHJpbWFcIlxyXG5cclxudmFyIGlkPTBcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFyaWFudCBleHRlbmRzIFJpY2hUZXh0e1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLmRvY3hQYXJ0PXRoaXMud0RvYy5wYXJzZUNvbnRleHQucGFydC5jdXJyZW50XHJcblx0XHR0aGlzLnZJZD1gX18ke3RoaXMuY29uc3RydWN0b3IudHlwZS5zcGxpdChcIi5cIikucG9wKCl9XyR7aWQrK31gXHJcblx0XHR0aGlzLnBhcnNlZENvZGU9YXJndW1lbnRzWzNdXHJcblx0XHR0aGlzLl9pbml0VmFyaWFudCgpXHJcblx0fVxyXG5cclxuXHRfaW5pdFZhcmlhbnQoKXtcclxuXHRcdHRoaXMudmFyaWFudFBhcmVudD1udWxsXHJcblx0XHR0aGlzLnZhcmlhbnRDaGlsZHJlbj1bXVxyXG5cdFx0dGhpcy53RG9jLmJlZ2luVmFyaWFudCh0aGlzKVxyXG5cdFx0XHJcblx0XHR0aGlzLnZhcmlhbnRQYXJlbnQuY29kZUJsb2NrLnB1c2goe1xyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJFeHByZXNzaW9uU3RhdGVtZW50XCIsXHJcbiAgICAgICAgICAgIFwiZXhwcmVzc2lvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJDYWxsRXhwcmVzc2lvblwiLFxyXG4gICAgICAgICAgICAgICAgXCJjYWxsZWVcIjoge1xyXG5cdFx0XHRcdFx0XCJ0eXBlXCI6IFwiTWVtYmVyRXhwcmVzc2lvblwiLFxyXG5cdFx0XHRcdFx0XCJjb21wdXRlZFwiOiBmYWxzZSxcclxuXHRcdFx0XHRcdFwib2JqZWN0XCI6IHtcclxuXHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogdGhpcy52SWRcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcInByb3BlcnR5XCI6IHtcclxuXHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogXCJwcmVfYXNzZW1ibGVcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcbiAgICAgICAgICAgICAgICBcImFyZ3VtZW50c1wiOiBbXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHRcdFxyXG5cdFx0XHJcblx0XHR0aGlzLnZhcmlhbnRQYXJlbnQuY29kZUJsb2NrLnB1c2godGhpcy5wYXJzZWRDb2RlKVxyXG5cdFx0XHJcblx0XHR0aGlzLnZhcmlhbnRQYXJlbnQuY29kZUJsb2NrLnB1c2goe1xyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJFeHByZXNzaW9uU3RhdGVtZW50XCIsXHJcbiAgICAgICAgICAgIFwiZXhwcmVzc2lvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJDYWxsRXhwcmVzc2lvblwiLFxyXG4gICAgICAgICAgICAgICAgXCJjYWxsZWVcIjoge1xyXG5cdFx0XHRcdFx0XCJ0eXBlXCI6IFwiTWVtYmVyRXhwcmVzc2lvblwiLFxyXG5cdFx0XHRcdFx0XCJjb21wdXRlZFwiOiBmYWxzZSxcclxuXHRcdFx0XHRcdFwib2JqZWN0XCI6IHtcclxuXHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogdGhpcy52SWRcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcInByb3BlcnR5XCI6IHtcclxuXHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogXCJwb3N0X2Fzc2VtYmxlXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG4gICAgICAgICAgICAgICAgXCJhcmd1bWVudHNcIjogW11cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblx0fVxyXG5cclxuXHRwYXJzZSgpey8vVmFyaWFudCBpbnRlcmZhY2VcclxuXHRcdHZhciByPXN1cGVyLnBhcnNlKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMud0RvYy5lbmRWYXJpYW50KHRoaXMpXHJcblx0XHRyZXR1cm4gclxyXG5cdH1cclxuXHJcblx0dmlzaXQoKXsvL1Zpc2l0b3IgaW50ZXJmYWNlXHJcblx0XHRpZighdGhpcy53RG9jLmRhdGEpXHJcblx0XHRcdHJldHVyblxyXG5cdFx0Ly90aGlzLmFzc2VtYmxlKClcclxuXHR9XHJcblx0XHJcblx0cHJlX2Fzc2VtYmxlKCl7XHJcblx0XHRcclxuXHR9XHJcblx0XHJcblx0cG9zdF9hc3NlbWJsZSgpe1xyXG5cdFx0bGV0IGE9dGhpcy5hc3NlbWJsZWRYbWxcclxuXHRcdGEgJiYgYS5yZW1vdmVBdHRyaWJ1dGUoJ2lkJylcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0KiBhc3NlbWJsZSB0aGUgdmFyaWFudCBXb3JkIG1vZGVsIHdpdGggZGF0YSB0byBhIHN0YXRpYyB3b3JkIG1vZGVsIFxyXG5cdCovXHJcblx0YXNzZW1ibGUoKXtcclxuXHRcdHRoaXMuZG9jeFBhcnQuc2V0Q2hhbmdlZCh0cnVlKVxyXG5cdH1cclxuXHRcclxuXHRzZXQgYXNzZW1ibGVkWG1sKHYpe1xyXG5cdFx0dGhpcy5fYXNzZW1ibGVkWG1sPXZcclxuXHR9XHJcblx0XHJcblx0Z2V0IGFzc2VtYmxlZFhtbCgpe1xyXG5cdFx0dmFyIGE7XHJcblx0XHRpZih0aGlzLmlzUm9vdENoaWxkKVxyXG5cdFx0XHRyZXR1cm4gdGhpcy5fYXNzZW1ibGVkWG1sfHx0aGlzLndYbWxcclxuXHRcdGVsc2UgaWYoYT10aGlzLnZhcmlhbnRQYXJlbnQuYXNzZW1ibGVkWG1sKVxyXG5cdFx0XHRyZXR1cm4gYS5xdWVyeVNlbGVjdG9yKGBbaWQ9JyR7dGhpcy52SWR9J11gKVxyXG5cdH1cclxuXHRcclxuXHRjbGVhcigpe1xyXG5cdFx0QXJyYXkuZnJvbSh0aGlzLmFzc2VtYmxlZFhtbC4kMSgnc2R0Q29udGVudCcpLmNoaWxkTm9kZXMpXHJcblx0XHRcdC5mb3JFYWNoKGNoaWxkPT5jaGlsZC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNoaWxkKSlcclxuXHR9XHJcbn1cclxuIl19