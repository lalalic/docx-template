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

			if (children) children = children.filter(function (a) {
				return a instanceof _variant2.default;
			});

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92YXJpYW50LWhhbmRsZXIuanMiXSwibmFtZXMiOlsiVmFyaWFudEhhbmRsZXIiLCJkb2N4IiwidHlwZSIsImNoaWxkcmVuIiwiY29kZSIsIm5vZGUiLCJyYXdDb2RlIiwiZmlsdGVyIiwiYSIsInZhckRvYyIsImxlbmd0aCIsImRhdGEiLCJhc3NlbWJsZSIsImFyZ3VtZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVhQSxjLFdBQUFBLGM7OztBQUNaLHlCQUFZQyxJQUFaLEVBQWlCO0FBQUE7O0FBQUE7O0FBRWhCLFFBQUtBLElBQUwsR0FBVUEsSUFBVjtBQUZnQjtBQUdoQjs7OztnQ0FFYUMsSSxRQUF5QkMsUSxFQUFTO0FBQUEsT0FBNUJDLElBQTRCLFFBQTVCQSxJQUE0QjtBQUFBLE9BQXZCQyxJQUF1QixRQUF2QkEsSUFBdUI7QUFBQSxPQUFsQkMsT0FBa0IsUUFBbEJBLE9BQWtCOztBQUMvQyxPQUFHSCxRQUFILEVBQ0NBLFdBQVNBLFNBQVNJLE1BQVQsQ0FBZ0I7QUFBQSxXQUFHQyw4QkFBSDtBQUFBLElBQWhCLENBQVQ7O0FBRUQsV0FBT04sSUFBUDtBQUNDLFNBQUsscUJBQUw7QUFDQyxZQUFPLHNCQUFZRyxJQUFaLEVBQWlCRCxJQUFqQixDQUFQO0FBQ0QsU0FBSyxrQkFBTDtBQUNDLFlBQU8sa0JBQWVDLElBQWYsRUFBb0JELElBQXBCLENBQVA7QUFDRCxTQUFLLFdBQUw7QUFDQSxTQUFLLFlBQUw7QUFDQyxZQUFPLGtCQUFRQyxJQUFSLEVBQWFELElBQWIsRUFBa0JELFFBQWxCLENBQVA7QUFDRCxTQUFLLFVBQUw7QUFDQSxTQUFLLFdBQUw7QUFDQyxZQUFPLGlCQUFPRSxJQUFQLEVBQVlELElBQVosRUFBaUJELFFBQWpCLENBQVA7QUFDRCxTQUFLLFVBQUw7QUFDQyxVQUFLTSxNQUFMLEdBQVksdUJBQWEsS0FBS1IsSUFBbEIsRUFBdUJFLFFBQXZCLENBQVo7QUFDQSxZQUFPLElBQVA7QUFDRDtBQUNDLFNBQUdBLFlBQVlBLFNBQVNPLE1BQVQsR0FBZ0IsQ0FBL0IsRUFBaUM7QUFDaEMsVUFBR1AsU0FBU08sTUFBVCxJQUFpQixDQUFwQixFQUNDLE9BQU9QLFNBQVMsQ0FBVCxDQUFQLENBREQsS0FHQyxPQUFPQSxRQUFQO0FBQ0Q7QUFwQkg7QUF1QkE7OzsyQkFFUVEsSSxFQUFLO0FBQUE7O0FBQ2IsVUFBTyxnQkFBS0YsTUFBTCxFQUFZRyxRQUFaLGdCQUF3QkMsU0FBeEIsQ0FBUDtBQUNBOzs7Ozs7a0JBR2FiLGMiLCJmaWxlIjoidmFyaWFudC1oYW5kbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vZGVsSGFuZGxlciBmcm9tIFwiZG9jeDRqcy9saWIvb3BlbnhtbC9kb2N4L21vZGVsLWhhbmRsZXJcIlxyXG5cclxuaW1wb3J0IFZhcmlhbnQgZnJvbSBcIi4vbW9kZWwvdmFyaWFudFwiXHJcbmltcG9ydCBEb2N1bWVudCBmcm9tIFwiLi9tb2RlbC9kb2N1bWVudFwiXHJcbmltcG9ydCBFeHByZXNzaW9uIGZyb20gXCIuL21vZGVsL19leHBcIlxyXG5pbXBvcnQgSWYgZnJvbSBcIi4vbW9kZWwvX2lmXCJcclxuaW1wb3J0IEZvciBmcm9tIFwiLi9tb2RlbC9fZm9yXCJcclxuaW1wb3J0IFBpY3R1cmUgZnJvbSBcIi4vbW9kZWwvX3BpY3R1cmVcIlxyXG5cclxuZXhwb3J0IGNsYXNzIFZhcmlhbnRIYW5kbGVyIGV4dGVuZHMgTW9kZWxIYW5kbGVye1xyXG5cdGNvbnN0cnVjdG9yKGRvY3gpe1xyXG5cdFx0c3VwZXIoKVxyXG5cdFx0dGhpcy5kb2N4PWRvY3hcclxuXHR9XHJcblxyXG5cdGNyZWF0ZUVsZW1lbnQodHlwZSx7Y29kZSxub2RlLHJhd0NvZGV9LGNoaWxkcmVuKXtcclxuXHRcdGlmKGNoaWxkcmVuKVxyXG5cdFx0XHRjaGlsZHJlbj1jaGlsZHJlbi5maWx0ZXIoYT0+YSBpbnN0YW5jZW9mIFZhcmlhbnQpXHJcblxyXG5cdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0XHRjYXNlIFwiY29udHJvbC5waWN0dXJlLmV4cFwiOlxyXG5cdFx0XHRcdHJldHVybiBuZXcgUGljdHVyZShub2RlLGNvZGUpXHJcblx0XHRcdGNhc2UgXCJjb250cm9sLnRleHQuZXhwXCI6XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBFeHByZXNzaW9uKG5vZGUsY29kZSlcclxuXHRcdFx0Y2FzZSBcImJsb2NrLmZvclwiOlxyXG5cdFx0XHRjYXNlIFwiaW5saW5lLmZvclwiOlxyXG5cdFx0XHRcdHJldHVybiBuZXcgRm9yKG5vZGUsY29kZSxjaGlsZHJlbilcclxuXHRcdFx0Y2FzZSBcImJsb2NrLmlmXCI6XHJcblx0XHRcdGNhc2UgXCJpbmxpbmUuaWZcIjpcclxuXHRcdFx0XHRyZXR1cm4gbmV3IElmKG5vZGUsY29kZSxjaGlsZHJlbilcclxuXHRcdFx0Y2FzZSBcImRvY3VtZW50XCI6XHJcblx0XHRcdFx0dGhpcy52YXJEb2M9bmV3IERvY3VtZW50KHRoaXMuZG9jeCxjaGlsZHJlbilcclxuXHRcdFx0XHRyZXR1cm4gdGhpc1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdGlmKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aD4wKXtcclxuXHRcdFx0XHRcdGlmKGNoaWxkcmVuLmxlbmd0aD09MSlcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGNoaWxkcmVuWzBdXHJcblx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdHJldHVybiBjaGlsZHJlblxyXG5cdFx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRhc3NlbWJsZShkYXRhKXtcclxuXHRcdHJldHVybiB0aGlzLnZhckRvYy5hc3NlbWJsZSguLi5hcmd1bWVudHMpXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWYXJpYW50SGFuZGxlclxyXG4iXX0=