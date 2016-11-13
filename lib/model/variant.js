"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _from = require("babel-runtime/core-js/array/from");

var _from2 = _interopRequireDefault(_from);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _richtext = require("docx4js/lib/openxml/docx/model/control/richtext");

var _richtext2 = _interopRequireDefault(_richtext);

var _esprima = require("esprima");

var _esprima2 = _interopRequireDefault(_esprima);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var id = 0;

var Variant = function (_RichText) {
	(0, _inherits3.default)(Variant, _RichText);

	function Variant() {
		(0, _classCallCheck3.default)(this, Variant);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Variant.__proto__ || (0, _getPrototypeOf2.default)(Variant)).apply(this, arguments));

		_this.docxPart = _this.wDoc.parseContext.part.current;
		_this.vId = "__" + _this.constructor.type.split(".").pop() + "_" + id++;
		_this.parsedCode = arguments[3];
		_this._initVariant();
		return _this;
	}

	(0, _createClass3.default)(Variant, [{
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
			var r = (0, _get3.default)(Variant.prototype.__proto__ || (0, _getPrototypeOf2.default)(Variant.prototype), "parse", this).apply(this, arguments);
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
			(0, _from2.default)(this.assembledXml.$1('sdtContent').childNodes).forEach(function (child) {
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
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC92YXJpYW50LmpzIl0sIm5hbWVzIjpbImlkIiwiVmFyaWFudCIsImFyZ3VtZW50cyIsImRvY3hQYXJ0Iiwid0RvYyIsInBhcnNlQ29udGV4dCIsInBhcnQiLCJjdXJyZW50IiwidklkIiwiY29uc3RydWN0b3IiLCJ0eXBlIiwic3BsaXQiLCJwb3AiLCJwYXJzZWRDb2RlIiwiX2luaXRWYXJpYW50IiwidmFyaWFudFBhcmVudCIsInZhcmlhbnRDaGlsZHJlbiIsImJlZ2luVmFyaWFudCIsImNvZGVCbG9jayIsInB1c2giLCJyIiwiZW5kVmFyaWFudCIsImRhdGEiLCJhIiwiYXNzZW1ibGVkWG1sIiwicmVtb3ZlQXR0cmlidXRlIiwic2V0Q2hhbmdlZCIsIiQxIiwiY2hpbGROb2RlcyIsImZvckVhY2giLCJjaGlsZCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInYiLCJfYXNzZW1ibGVkWG1sIiwiaXNSb290Q2hpbGQiLCJ3WG1sIiwicXVlcnlTZWxlY3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUlBLEtBQUcsQ0FBUDs7SUFDcUJDLE87OztBQUNwQixvQkFBYTtBQUFBOztBQUFBLHVJQUNIQyxTQURHOztBQUVaLFFBQUtDLFFBQUwsR0FBYyxNQUFLQyxJQUFMLENBQVVDLFlBQVYsQ0FBdUJDLElBQXZCLENBQTRCQyxPQUExQztBQUNBLFFBQUtDLEdBQUwsVUFBYyxNQUFLQyxXQUFMLENBQWlCQyxJQUFqQixDQUFzQkMsS0FBdEIsQ0FBNEIsR0FBNUIsRUFBaUNDLEdBQWpDLEVBQWQsU0FBd0RaLElBQXhEO0FBQ0EsUUFBS2EsVUFBTCxHQUFnQlgsVUFBVSxDQUFWLENBQWhCO0FBQ0EsUUFBS1ksWUFBTDtBQUxZO0FBTVo7Ozs7aUNBRWE7QUFDYixRQUFLQyxhQUFMLEdBQW1CLElBQW5CO0FBQ0EsUUFBS0MsZUFBTCxHQUFxQixFQUFyQjtBQUNBLFFBQUtaLElBQUwsQ0FBVWEsWUFBVixDQUF1QixJQUF2Qjs7QUFFQSxRQUFLRixhQUFMLENBQW1CRyxTQUFuQixDQUE2QkMsSUFBN0IsQ0FBa0M7QUFDeEIsWUFBUSxxQkFEZ0I7QUFFeEIsa0JBQWM7QUFDVixhQUFRLGdCQURFO0FBRVYsZUFBVTtBQUNyQixjQUFRLGtCQURhO0FBRXJCLGtCQUFZLEtBRlM7QUFHckIsZ0JBQVU7QUFDVCxlQUFRLFlBREM7QUFFVCxlQUFRLEtBQUtYO0FBRkosT0FIVztBQU9yQixrQkFBWTtBQUNYLGVBQVEsWUFERztBQUVYLGVBQVE7QUFGRztBQVBTLE1BRkE7QUFjVixrQkFBYTtBQWRIO0FBRlUsSUFBbEM7O0FBcUJBLFFBQUtPLGFBQUwsQ0FBbUJHLFNBQW5CLENBQTZCQyxJQUE3QixDQUFrQyxLQUFLTixVQUF2Qzs7QUFFQSxRQUFLRSxhQUFMLENBQW1CRyxTQUFuQixDQUE2QkMsSUFBN0IsQ0FBa0M7QUFDeEIsWUFBUSxxQkFEZ0I7QUFFeEIsa0JBQWM7QUFDVixhQUFRLGdCQURFO0FBRVYsZUFBVTtBQUNyQixjQUFRLGtCQURhO0FBRXJCLGtCQUFZLEtBRlM7QUFHckIsZ0JBQVU7QUFDVCxlQUFRLFlBREM7QUFFVCxlQUFRLEtBQUtYO0FBRkosT0FIVztBQU9yQixrQkFBWTtBQUNYLGVBQVEsWUFERztBQUVYLGVBQVE7QUFGRztBQVBTLE1BRkE7QUFjVixrQkFBYTtBQWRIO0FBRlUsSUFBbEM7QUFtQkE7OzswQkFFTTtBQUFDO0FBQ1AsT0FBSVksbUlBQWlCbEIsU0FBakIsQ0FBSjtBQUNBLFFBQUtFLElBQUwsQ0FBVWlCLFVBQVYsQ0FBcUIsSUFBckI7QUFDQSxVQUFPRCxDQUFQO0FBQ0E7OzswQkFFTTtBQUFDO0FBQ1AsT0FBRyxDQUFDLEtBQUtoQixJQUFMLENBQVVrQixJQUFkLEVBQ0M7QUFDRDtBQUNBOzs7aUNBRWEsQ0FFYjs7O2tDQUVjO0FBQ2QsT0FBSUMsSUFBRSxLQUFLQyxZQUFYO0FBQ0FELFFBQUtBLEVBQUVFLGVBQUYsQ0FBa0IsSUFBbEIsQ0FBTDtBQUNBOztBQUVEOzs7Ozs7NkJBR1U7QUFDVCxRQUFLdEIsUUFBTCxDQUFjdUIsVUFBZCxDQUF5QixJQUF6QjtBQUNBOzs7MEJBY007QUFDTix1QkFBVyxLQUFLRixZQUFMLENBQWtCRyxFQUFsQixDQUFxQixZQUFyQixFQUFtQ0MsVUFBOUMsRUFDRUMsT0FERixDQUNVO0FBQUEsV0FBT0MsTUFBTUMsVUFBTixDQUFpQkMsV0FBakIsQ0FBNkJGLEtBQTdCLENBQVA7QUFBQSxJQURWO0FBRUE7OztvQkFmZ0JHLEMsRUFBRTtBQUNsQixRQUFLQyxhQUFMLEdBQW1CRCxDQUFuQjtBQUNBLEc7c0JBRWlCO0FBQ2pCLE9BQUlWLENBQUo7QUFDQSxPQUFHLEtBQUtZLFdBQVIsRUFDQyxPQUFPLEtBQUtELGFBQUwsSUFBb0IsS0FBS0UsSUFBaEMsQ0FERCxLQUVLLElBQUdiLElBQUUsS0FBS1IsYUFBTCxDQUFtQlMsWUFBeEIsRUFDSixPQUFPRCxFQUFFYyxhQUFGLFdBQXdCLEtBQUs3QixHQUE3QixRQUFQO0FBQ0Q7Ozs7O2tCQWhHbUJQLE8iLCJmaWxlIjoidmFyaWFudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSaWNoVGV4dCBmcm9tIFwiZG9jeDRqcy9saWIvb3BlbnhtbC9kb2N4L21vZGVsL2NvbnRyb2wvcmljaHRleHRcIlxyXG5pbXBvcnQgZXNwcmltYSBmcm9tIFwiZXNwcmltYVwiXHJcblxyXG52YXIgaWQ9MFxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWYXJpYW50IGV4dGVuZHMgUmljaFRleHR7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMuZG9jeFBhcnQ9dGhpcy53RG9jLnBhcnNlQ29udGV4dC5wYXJ0LmN1cnJlbnRcclxuXHRcdHRoaXMudklkPWBfXyR7dGhpcy5jb25zdHJ1Y3Rvci50eXBlLnNwbGl0KFwiLlwiKS5wb3AoKX1fJHtpZCsrfWBcclxuXHRcdHRoaXMucGFyc2VkQ29kZT1hcmd1bWVudHNbM11cclxuXHRcdHRoaXMuX2luaXRWYXJpYW50KClcclxuXHR9XHJcblxyXG5cdF9pbml0VmFyaWFudCgpe1xyXG5cdFx0dGhpcy52YXJpYW50UGFyZW50PW51bGxcclxuXHRcdHRoaXMudmFyaWFudENoaWxkcmVuPVtdXHJcblx0XHR0aGlzLndEb2MuYmVnaW5WYXJpYW50KHRoaXMpXHJcblx0XHRcclxuXHRcdHRoaXMudmFyaWFudFBhcmVudC5jb2RlQmxvY2sucHVzaCh7XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIkV4cHJlc3Npb25TdGF0ZW1lbnRcIixcclxuICAgICAgICAgICAgXCJleHByZXNzaW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkNhbGxFeHByZXNzaW9uXCIsXHJcbiAgICAgICAgICAgICAgICBcImNhbGxlZVwiOiB7XHJcblx0XHRcdFx0XHRcInR5cGVcIjogXCJNZW1iZXJFeHByZXNzaW9uXCIsXHJcblx0XHRcdFx0XHRcImNvbXB1dGVkXCI6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XCJvYmplY3RcIjoge1xyXG5cdFx0XHRcdFx0XHRcInR5cGVcIjogXCJJZGVudGlmaWVyXCIsXHJcblx0XHRcdFx0XHRcdFwibmFtZVwiOiB0aGlzLnZJZFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFwicHJvcGVydHlcIjoge1xyXG5cdFx0XHRcdFx0XHRcInR5cGVcIjogXCJJZGVudGlmaWVyXCIsXHJcblx0XHRcdFx0XHRcdFwibmFtZVwiOiBcInByZV9hc3NlbWJsZVwiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuICAgICAgICAgICAgICAgIFwiYXJndW1lbnRzXCI6IFtdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cdFx0XHJcblx0XHRcclxuXHRcdHRoaXMudmFyaWFudFBhcmVudC5jb2RlQmxvY2sucHVzaCh0aGlzLnBhcnNlZENvZGUpXHJcblx0XHRcclxuXHRcdHRoaXMudmFyaWFudFBhcmVudC5jb2RlQmxvY2sucHVzaCh7XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIkV4cHJlc3Npb25TdGF0ZW1lbnRcIixcclxuICAgICAgICAgICAgXCJleHByZXNzaW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkNhbGxFeHByZXNzaW9uXCIsXHJcbiAgICAgICAgICAgICAgICBcImNhbGxlZVwiOiB7XHJcblx0XHRcdFx0XHRcInR5cGVcIjogXCJNZW1iZXJFeHByZXNzaW9uXCIsXHJcblx0XHRcdFx0XHRcImNvbXB1dGVkXCI6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XCJvYmplY3RcIjoge1xyXG5cdFx0XHRcdFx0XHRcInR5cGVcIjogXCJJZGVudGlmaWVyXCIsXHJcblx0XHRcdFx0XHRcdFwibmFtZVwiOiB0aGlzLnZJZFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFwicHJvcGVydHlcIjoge1xyXG5cdFx0XHRcdFx0XHRcInR5cGVcIjogXCJJZGVudGlmaWVyXCIsXHJcblx0XHRcdFx0XHRcdFwibmFtZVwiOiBcInBvc3RfYXNzZW1ibGVcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcbiAgICAgICAgICAgICAgICBcImFyZ3VtZW50c1wiOiBbXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHR9XHJcblxyXG5cdHBhcnNlKCl7Ly9WYXJpYW50IGludGVyZmFjZVxyXG5cdFx0dmFyIHI9c3VwZXIucGFyc2UoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy53RG9jLmVuZFZhcmlhbnQodGhpcylcclxuXHRcdHJldHVybiByXHJcblx0fVxyXG5cclxuXHR2aXNpdCgpey8vVmlzaXRvciBpbnRlcmZhY2VcclxuXHRcdGlmKCF0aGlzLndEb2MuZGF0YSlcclxuXHRcdFx0cmV0dXJuXHJcblx0XHQvL3RoaXMuYXNzZW1ibGUoKVxyXG5cdH1cclxuXHRcclxuXHRwcmVfYXNzZW1ibGUoKXtcclxuXHRcdFxyXG5cdH1cclxuXHRcclxuXHRwb3N0X2Fzc2VtYmxlKCl7XHJcblx0XHRsZXQgYT10aGlzLmFzc2VtYmxlZFhtbFxyXG5cdFx0YSAmJiBhLnJlbW92ZUF0dHJpYnV0ZSgnaWQnKVxyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQqIGFzc2VtYmxlIHRoZSB2YXJpYW50IFdvcmQgbW9kZWwgd2l0aCBkYXRhIHRvIGEgc3RhdGljIHdvcmQgbW9kZWwgXHJcblx0Ki9cclxuXHRhc3NlbWJsZSgpe1xyXG5cdFx0dGhpcy5kb2N4UGFydC5zZXRDaGFuZ2VkKHRydWUpXHJcblx0fVxyXG5cdFxyXG5cdHNldCBhc3NlbWJsZWRYbWwodil7XHJcblx0XHR0aGlzLl9hc3NlbWJsZWRYbWw9dlxyXG5cdH1cclxuXHRcclxuXHRnZXQgYXNzZW1ibGVkWG1sKCl7XHJcblx0XHR2YXIgYTtcclxuXHRcdGlmKHRoaXMuaXNSb290Q2hpbGQpXHJcblx0XHRcdHJldHVybiB0aGlzLl9hc3NlbWJsZWRYbWx8fHRoaXMud1htbFxyXG5cdFx0ZWxzZSBpZihhPXRoaXMudmFyaWFudFBhcmVudC5hc3NlbWJsZWRYbWwpXHJcblx0XHRcdHJldHVybiBhLnF1ZXJ5U2VsZWN0b3IoYFtpZD0nJHt0aGlzLnZJZH0nXWApXHJcblx0fVxyXG5cdFxyXG5cdGNsZWFyKCl7XHJcblx0XHRBcnJheS5mcm9tKHRoaXMuYXNzZW1ibGVkWG1sLiQxKCdzZHRDb250ZW50JykuY2hpbGROb2RlcylcclxuXHRcdFx0LmZvckVhY2goY2hpbGQ9PmNoaWxkLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY2hpbGQpKVxyXG5cdH1cclxufVxyXG4iXX0=