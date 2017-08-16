"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.VariantHandler = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _modelHandler = require("docx4js/lib/openxml/docx/model-handler");

var _modelHandler2 = _interopRequireDefault(_modelHandler);

var _variant = require("./model/variant");

var _variant2 = _interopRequireDefault(_variant);

var _document = require("./model/document");

var _document2 = _interopRequireDefault(_document);

var _exp = require("./model/_exp");

var _exp2 = _interopRequireDefault(_exp);

var _if = require("./model/_if");

var _if2 = _interopRequireDefault(_if);

var _for = require("./model/_for");

var _for2 = _interopRequireDefault(_for);

var _picture = require("./model/_picture");

var _picture2 = _interopRequireDefault(_picture);

var _subdoc = require("./model/_subdoc");

var _subdoc2 = _interopRequireDefault(_subdoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VariantHandler = exports.VariantHandler = function (_ModelHandler) {
	_inherits(VariantHandler, _ModelHandler);

	function VariantHandler(docx) {
		_classCallCheck(this, VariantHandler);

		var _this = _possibleConstructorReturn(this, (VariantHandler.__proto__ || Object.getPrototypeOf(VariantHandler)).call(this));

		_this.docx = docx;
		return _this;
	}

	_createClass(VariantHandler, [{
		key: "createElement",
		value: function createElement(type, _ref, children) {
			var code = _ref.code,
			    node = _ref.node,
			    rawCode = _ref.rawCode;

			if (children) {
				var flat = function flat(array) {
					var flated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
					return array.reduce(function (collected, a) {
						if (Array.isArray(a)) {
							flat(a, collected);
						} else if (a instanceof _variant2.default) {
							collected.push(a);
						}
						return collected;
					}, flated);
				};

				children = flat(children);
			}

			switch (type) {
				case "control.picture.exp":
					return new _picture2.default(node, code);
				case "control.text.exp":
					return new _exp2.default(node, code);
				case "block.for":
				case "inline.for":
					return new _for2.default(node, code, children);
				case "block.if":
				case "inline.if":
					return new _if2.default(node, code, children);
				case "document":
					this.varDoc = new _document2.default(this.docx, children);
					return this;
				case "block.subdoc":
				case "inline.subdoc":
					return new _subdoc2.default.Dynamic(node, code);
				case "chunk":
					{
						var _arguments$ = arguments[1],
						    contentType = _arguments$.contentType,
						    data = _arguments$.data;

						if (contentType == this.docx.constructor.mime) {
							return new _subdoc2.default(node, data);
						}
					}
				default:
					if (children && children.length > 0) {
						if (children.length == 1) return children[0];else return children;
					}
			}
		}
	}, {
		key: "assemble",
		value: function assemble(data) {
			var _varDoc;

			return (_varDoc = this.varDoc).assemble.apply(_varDoc, arguments);
		}
	}]);

	return VariantHandler;
}(_modelHandler2.default);

exports.default = VariantHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92YXJpYW50LWhhbmRsZXIuanMiXSwibmFtZXMiOlsiVmFyaWFudEhhbmRsZXIiLCJkb2N4IiwidHlwZSIsImNoaWxkcmVuIiwiY29kZSIsIm5vZGUiLCJyYXdDb2RlIiwiZmxhdCIsImFycmF5IiwiZmxhdGVkIiwicmVkdWNlIiwiY29sbGVjdGVkIiwiYSIsIkFycmF5IiwiaXNBcnJheSIsInB1c2giLCJ2YXJEb2MiLCJEeW5hbWljIiwiYXJndW1lbnRzIiwiY29udGVudFR5cGUiLCJkYXRhIiwiY29uc3RydWN0b3IiLCJtaW1lIiwibGVuZ3RoIiwiYXNzZW1ibGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVhQSxjLFdBQUFBLGM7OztBQUNaLHlCQUFZQyxJQUFaLEVBQWlCO0FBQUE7O0FBQUE7O0FBRWhCLFFBQUtBLElBQUwsR0FBVUEsSUFBVjtBQUZnQjtBQUdoQjs7OztnQ0FFYUMsSSxRQUF5QkMsUSxFQUFTO0FBQUEsT0FBNUJDLElBQTRCLFFBQTVCQSxJQUE0QjtBQUFBLE9BQXZCQyxJQUF1QixRQUF2QkEsSUFBdUI7QUFBQSxPQUFsQkMsT0FBa0IsUUFBbEJBLE9BQWtCOztBQUMvQyxPQUFHSCxRQUFILEVBQVk7QUFDWCxRQUFNSSxPQUFLLFNBQUxBLElBQUssQ0FBQ0MsS0FBRDtBQUFBLFNBQU9DLE1BQVAsdUVBQWMsRUFBZDtBQUFBLFlBQW1CRCxNQUFNRSxNQUFOLENBQWEsVUFBQ0MsU0FBRCxFQUFXQyxDQUFYLEVBQWU7QUFDekQsVUFBR0MsTUFBTUMsT0FBTixDQUFjRixDQUFkLENBQUgsRUFBb0I7QUFDbkJMLFlBQUtLLENBQUwsRUFBT0QsU0FBUDtBQUNBLE9BRkQsTUFFTSxJQUFHQyw4QkFBSCxFQUF3QjtBQUM3QkQsaUJBQVVJLElBQVYsQ0FBZUgsQ0FBZjtBQUNBO0FBQ0QsYUFBT0QsU0FBUDtBQUNBLE1BUDZCLEVBTzVCRixNQVA0QixDQUFuQjtBQUFBLEtBQVg7O0FBU0FOLGVBQVNJLEtBQUtKLFFBQUwsQ0FBVDtBQUNBOztBQUVELFdBQU9ELElBQVA7QUFDQyxTQUFLLHFCQUFMO0FBQ0MsWUFBTyxzQkFBWUcsSUFBWixFQUFpQkQsSUFBakIsQ0FBUDtBQUNELFNBQUssa0JBQUw7QUFDQyxZQUFPLGtCQUFlQyxJQUFmLEVBQW9CRCxJQUFwQixDQUFQO0FBQ0QsU0FBSyxXQUFMO0FBQ0EsU0FBSyxZQUFMO0FBQ0MsWUFBTyxrQkFBUUMsSUFBUixFQUFhRCxJQUFiLEVBQWtCRCxRQUFsQixDQUFQO0FBQ0QsU0FBSyxVQUFMO0FBQ0EsU0FBSyxXQUFMO0FBQ0MsWUFBTyxpQkFBT0UsSUFBUCxFQUFZRCxJQUFaLEVBQWlCRCxRQUFqQixDQUFQO0FBQ0QsU0FBSyxVQUFMO0FBQ0MsVUFBS2EsTUFBTCxHQUFZLHVCQUFhLEtBQUtmLElBQWxCLEVBQXVCRSxRQUF2QixDQUFaO0FBQ0EsWUFBTyxJQUFQO0FBQ0QsU0FBSyxjQUFMO0FBQ0EsU0FBSyxlQUFMO0FBQ0MsWUFBTyxJQUFJLGlCQUFPYyxPQUFYLENBQW1CWixJQUFuQixFQUF5QkQsSUFBekIsQ0FBUDtBQUNELFNBQUssT0FBTDtBQUFhO0FBQUEsd0JBQ2FjLFVBQVUsQ0FBVixDQURiO0FBQUEsVUFDTEMsV0FESyxlQUNMQSxXQURLO0FBQUEsVUFDT0MsSUFEUCxlQUNPQSxJQURQOztBQUVaLFVBQUdELGVBQWEsS0FBS2xCLElBQUwsQ0FBVW9CLFdBQVYsQ0FBc0JDLElBQXRDLEVBQTJDO0FBQzFDLGNBQU8scUJBQVdqQixJQUFYLEVBQWlCZSxJQUFqQixDQUFQO0FBQ0E7QUFDRDtBQUNEO0FBQ0MsU0FBR2pCLFlBQVlBLFNBQVNvQixNQUFULEdBQWdCLENBQS9CLEVBQWlDO0FBQ2hDLFVBQUdwQixTQUFTb0IsTUFBVCxJQUFpQixDQUFwQixFQUNDLE9BQU9wQixTQUFTLENBQVQsQ0FBUCxDQURELEtBR0MsT0FBT0EsUUFBUDtBQUNEO0FBN0JIO0FBZ0NBOzs7MkJBRVFpQixJLEVBQUs7QUFBQTs7QUFDYixVQUFPLGdCQUFLSixNQUFMLEVBQVlRLFFBQVosZ0JBQXdCTixTQUF4QixDQUFQO0FBQ0E7Ozs7OztrQkFHYWxCLGMiLCJmaWxlIjoidmFyaWFudC1oYW5kbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vZGVsSGFuZGxlciBmcm9tIFwiZG9jeDRqcy9saWIvb3BlbnhtbC9kb2N4L21vZGVsLWhhbmRsZXJcIlxyXG5cclxuaW1wb3J0IFZhcmlhbnQgZnJvbSBcIi4vbW9kZWwvdmFyaWFudFwiXHJcbmltcG9ydCBEb2N1bWVudCBmcm9tIFwiLi9tb2RlbC9kb2N1bWVudFwiXHJcbmltcG9ydCBFeHByZXNzaW9uIGZyb20gXCIuL21vZGVsL19leHBcIlxyXG5pbXBvcnQgSWYgZnJvbSBcIi4vbW9kZWwvX2lmXCJcclxuaW1wb3J0IEZvciBmcm9tIFwiLi9tb2RlbC9fZm9yXCJcclxuaW1wb3J0IFBpY3R1cmUgZnJvbSBcIi4vbW9kZWwvX3BpY3R1cmVcIlxyXG5pbXBvcnQgU3ViRG9jIGZyb20gXCIuL21vZGVsL19zdWJkb2NcIlxyXG5cclxuZXhwb3J0IGNsYXNzIFZhcmlhbnRIYW5kbGVyIGV4dGVuZHMgTW9kZWxIYW5kbGVye1xyXG5cdGNvbnN0cnVjdG9yKGRvY3gpe1xyXG5cdFx0c3VwZXIoKVxyXG5cdFx0dGhpcy5kb2N4PWRvY3hcclxuXHR9XHJcblxyXG5cdGNyZWF0ZUVsZW1lbnQodHlwZSx7Y29kZSxub2RlLHJhd0NvZGV9LGNoaWxkcmVuKXtcclxuXHRcdGlmKGNoaWxkcmVuKXtcclxuXHRcdFx0Y29uc3QgZmxhdD0oYXJyYXksZmxhdGVkPVtdKT0+YXJyYXkucmVkdWNlKChjb2xsZWN0ZWQsYSk9PntcclxuXHRcdFx0XHRpZihBcnJheS5pc0FycmF5KGEpKXtcclxuXHRcdFx0XHRcdGZsYXQoYSxjb2xsZWN0ZWQpXHJcblx0XHRcdFx0fWVsc2UgaWYoYSBpbnN0YW5jZW9mIFZhcmlhbnQpe1xyXG5cdFx0XHRcdFx0Y29sbGVjdGVkLnB1c2goYSlcdFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gY29sbGVjdGVkXHJcblx0XHRcdH0sZmxhdGVkKVxyXG5cdFx0XHRcclxuXHRcdFx0Y2hpbGRyZW49ZmxhdChjaGlsZHJlbilcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0XHRjYXNlIFwiY29udHJvbC5waWN0dXJlLmV4cFwiOlxyXG5cdFx0XHRcdHJldHVybiBuZXcgUGljdHVyZShub2RlLGNvZGUpXHJcblx0XHRcdGNhc2UgXCJjb250cm9sLnRleHQuZXhwXCI6XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBFeHByZXNzaW9uKG5vZGUsY29kZSlcclxuXHRcdFx0Y2FzZSBcImJsb2NrLmZvclwiOlxyXG5cdFx0XHRjYXNlIFwiaW5saW5lLmZvclwiOlxyXG5cdFx0XHRcdHJldHVybiBuZXcgRm9yKG5vZGUsY29kZSxjaGlsZHJlbilcclxuXHRcdFx0Y2FzZSBcImJsb2NrLmlmXCI6XHJcblx0XHRcdGNhc2UgXCJpbmxpbmUuaWZcIjpcclxuXHRcdFx0XHRyZXR1cm4gbmV3IElmKG5vZGUsY29kZSxjaGlsZHJlbilcclxuXHRcdFx0Y2FzZSBcImRvY3VtZW50XCI6XHJcblx0XHRcdFx0dGhpcy52YXJEb2M9bmV3IERvY3VtZW50KHRoaXMuZG9jeCxjaGlsZHJlbilcclxuXHRcdFx0XHRyZXR1cm4gdGhpc1xyXG5cdFx0XHRjYXNlIFwiYmxvY2suc3ViZG9jXCI6XHJcblx0XHRcdGNhc2UgXCJpbmxpbmUuc3ViZG9jXCI6XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBTdWJEb2MuRHluYW1pYyhub2RlLCBjb2RlKVxyXG5cdFx0XHRjYXNlIFwiY2h1bmtcIjp7XHJcblx0XHRcdFx0Y29uc3Qge2NvbnRlbnRUeXBlLGRhdGF9PWFyZ3VtZW50c1sxXVxyXG5cdFx0XHRcdGlmKGNvbnRlbnRUeXBlPT10aGlzLmRvY3guY29uc3RydWN0b3IubWltZSl7XHJcblx0XHRcdFx0XHRyZXR1cm4gbmV3IFN1YkRvYyhub2RlLCBkYXRhKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdGlmKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aD4wKXtcclxuXHRcdFx0XHRcdGlmKGNoaWxkcmVuLmxlbmd0aD09MSlcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGNoaWxkcmVuWzBdXHJcblx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdHJldHVybiBjaGlsZHJlblxyXG5cdFx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRhc3NlbWJsZShkYXRhKXtcclxuXHRcdHJldHVybiB0aGlzLnZhckRvYy5hc3NlbWJsZSguLi5hcmd1bWVudHMpXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWYXJpYW50SGFuZGxlclxyXG4iXX0=