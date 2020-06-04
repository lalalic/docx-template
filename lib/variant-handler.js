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

var _script = require("./model/_script");

var _script2 = _interopRequireDefault(_script);

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
				case "block.script":
				case "inline.script":
					return new _script2.default(node, code);
				case "document":
					this.varDoc = new _document2.default(this.docx, children);
					return this;
				case "block.embed.subdoc":
				case "inline.embed.subdoc":
					return new _subdoc2.default(node, code);
				case "block.subdoc":
				case "inline.subdoc":
					return new _subdoc2.default.Dynamic(node, code);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92YXJpYW50LWhhbmRsZXIuanMiXSwibmFtZXMiOlsiVmFyaWFudEhhbmRsZXIiLCJkb2N4IiwidHlwZSIsImNoaWxkcmVuIiwiY29kZSIsIm5vZGUiLCJyYXdDb2RlIiwiZmxhdCIsImFycmF5IiwiZmxhdGVkIiwicmVkdWNlIiwiY29sbGVjdGVkIiwiYSIsIkFycmF5IiwiaXNBcnJheSIsInB1c2giLCJ2YXJEb2MiLCJEeW5hbWljIiwibGVuZ3RoIiwiZGF0YSIsImFzc2VtYmxlIiwiYXJndW1lbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVhQSxjLFdBQUFBLGM7OztBQUNaLHlCQUFZQyxJQUFaLEVBQWlCO0FBQUE7O0FBQUE7O0FBRWhCLFFBQUtBLElBQUwsR0FBVUEsSUFBVjtBQUZnQjtBQUdoQjs7OztnQ0FFYUMsSSxRQUF5QkMsUSxFQUFTO0FBQUEsT0FBNUJDLElBQTRCLFFBQTVCQSxJQUE0QjtBQUFBLE9BQXZCQyxJQUF1QixRQUF2QkEsSUFBdUI7QUFBQSxPQUFsQkMsT0FBa0IsUUFBbEJBLE9BQWtCOztBQUMvQyxPQUFHSCxRQUFILEVBQVk7QUFDWCxRQUFNSSxPQUFLLFNBQUxBLElBQUssQ0FBQ0MsS0FBRDtBQUFBLFNBQU9DLE1BQVAsdUVBQWMsRUFBZDtBQUFBLFlBQW1CRCxNQUFNRSxNQUFOLENBQWEsVUFBQ0MsU0FBRCxFQUFXQyxDQUFYLEVBQWU7QUFDekQsVUFBR0MsTUFBTUMsT0FBTixDQUFjRixDQUFkLENBQUgsRUFBb0I7QUFDbkJMLFlBQUtLLENBQUwsRUFBT0QsU0FBUDtBQUNBLE9BRkQsTUFFTSxJQUFHQyw4QkFBSCxFQUF3QjtBQUM3QkQsaUJBQVVJLElBQVYsQ0FBZUgsQ0FBZjtBQUNBO0FBQ0QsYUFBT0QsU0FBUDtBQUNBLE1BUDZCLEVBTzVCRixNQVA0QixDQUFuQjtBQUFBLEtBQVg7O0FBU0FOLGVBQVNJLEtBQUtKLFFBQUwsQ0FBVDtBQUNBOztBQUVELFdBQU9ELElBQVA7QUFDQyxTQUFLLHFCQUFMO0FBQ0MsWUFBTyxzQkFBWUcsSUFBWixFQUFpQkQsSUFBakIsQ0FBUDtBQUNELFNBQUssa0JBQUw7QUFDQyxZQUFPLGtCQUFlQyxJQUFmLEVBQW9CRCxJQUFwQixDQUFQO0FBQ0QsU0FBSyxXQUFMO0FBQ0EsU0FBSyxZQUFMO0FBQ0MsWUFBTyxrQkFBUUMsSUFBUixFQUFhRCxJQUFiLEVBQWtCRCxRQUFsQixDQUFQO0FBQ0QsU0FBSyxVQUFMO0FBQ0EsU0FBSyxXQUFMO0FBQ0MsWUFBTyxpQkFBT0UsSUFBUCxFQUFZRCxJQUFaLEVBQWlCRCxRQUFqQixDQUFQO0FBQ0QsU0FBSyxjQUFMO0FBQ0EsU0FBSyxlQUFMO0FBQ0MsWUFBTyxxQkFBV0UsSUFBWCxFQUFnQkQsSUFBaEIsQ0FBUDtBQUNELFNBQUssVUFBTDtBQUNDLFVBQUtZLE1BQUwsR0FBWSx1QkFBYSxLQUFLZixJQUFsQixFQUF1QkUsUUFBdkIsQ0FBWjtBQUNBLFlBQU8sSUFBUDtBQUNELFNBQUssb0JBQUw7QUFDQSxTQUFLLHFCQUFMO0FBQ0MsWUFBTyxxQkFBV0UsSUFBWCxFQUFpQkQsSUFBakIsQ0FBUDtBQUNELFNBQUssY0FBTDtBQUNBLFNBQUssZUFBTDtBQUNDLFlBQU8sSUFBSSxpQkFBT2EsT0FBWCxDQUFtQlosSUFBbkIsRUFBeUJELElBQXpCLENBQVA7QUFDRDtBQUNDLFNBQUdELFlBQVlBLFNBQVNlLE1BQVQsR0FBZ0IsQ0FBL0IsRUFBaUM7QUFDaEMsVUFBR2YsU0FBU2UsTUFBVCxJQUFpQixDQUFwQixFQUNDLE9BQU9mLFNBQVMsQ0FBVCxDQUFQLENBREQsS0FHQyxPQUFPQSxRQUFQO0FBQ0Q7QUE3Qkg7QUFnQ0E7OzsyQkFFUWdCLEksRUFBSztBQUFBOztBQUNiLFVBQU8sZ0JBQUtILE1BQUwsRUFBWUksUUFBWixnQkFBd0JDLFNBQXhCLENBQVA7QUFDQTs7Ozs7O2tCQUdhckIsYyIsImZpbGUiOiJ2YXJpYW50LWhhbmRsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9kZWxIYW5kbGVyIGZyb20gXCJkb2N4NGpzL2xpYi9vcGVueG1sL2RvY3gvbW9kZWwtaGFuZGxlclwiXG5cbmltcG9ydCBWYXJpYW50IGZyb20gXCIuL21vZGVsL3ZhcmlhbnRcIlxuaW1wb3J0IERvY3VtZW50IGZyb20gXCIuL21vZGVsL2RvY3VtZW50XCJcbmltcG9ydCBFeHByZXNzaW9uIGZyb20gXCIuL21vZGVsL19leHBcIlxuaW1wb3J0IElmIGZyb20gXCIuL21vZGVsL19pZlwiXG5pbXBvcnQgRm9yIGZyb20gXCIuL21vZGVsL19mb3JcIlxuaW1wb3J0IFBpY3R1cmUgZnJvbSBcIi4vbW9kZWwvX3BpY3R1cmVcIlxuaW1wb3J0IFN1YkRvYyBmcm9tIFwiLi9tb2RlbC9fc3ViZG9jXCJcbmltcG9ydCBTY3JpcHQgZnJvbSBcIi4vbW9kZWwvX3NjcmlwdFwiXG5cbmV4cG9ydCBjbGFzcyBWYXJpYW50SGFuZGxlciBleHRlbmRzIE1vZGVsSGFuZGxlcntcblx0Y29uc3RydWN0b3IoZG9jeCl7XG5cdFx0c3VwZXIoKVxuXHRcdHRoaXMuZG9jeD1kb2N4XG5cdH1cblxuXHRjcmVhdGVFbGVtZW50KHR5cGUse2NvZGUsbm9kZSxyYXdDb2RlfSxjaGlsZHJlbil7XG5cdFx0aWYoY2hpbGRyZW4pe1xuXHRcdFx0Y29uc3QgZmxhdD0oYXJyYXksZmxhdGVkPVtdKT0+YXJyYXkucmVkdWNlKChjb2xsZWN0ZWQsYSk9Pntcblx0XHRcdFx0aWYoQXJyYXkuaXNBcnJheShhKSl7XG5cdFx0XHRcdFx0ZmxhdChhLGNvbGxlY3RlZClcblx0XHRcdFx0fWVsc2UgaWYoYSBpbnN0YW5jZW9mIFZhcmlhbnQpe1xuXHRcdFx0XHRcdGNvbGxlY3RlZC5wdXNoKGEpXHRcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gY29sbGVjdGVkXG5cdFx0XHR9LGZsYXRlZClcblx0XHRcdFxuXHRcdFx0Y2hpbGRyZW49ZmxhdChjaGlsZHJlbilcblx0XHR9XG5cdFx0XG5cdFx0c3dpdGNoKHR5cGUpe1xuXHRcdFx0Y2FzZSBcImNvbnRyb2wucGljdHVyZS5leHBcIjpcblx0XHRcdFx0cmV0dXJuIG5ldyBQaWN0dXJlKG5vZGUsY29kZSlcblx0XHRcdGNhc2UgXCJjb250cm9sLnRleHQuZXhwXCI6XG5cdFx0XHRcdHJldHVybiBuZXcgRXhwcmVzc2lvbihub2RlLGNvZGUpXG5cdFx0XHRjYXNlIFwiYmxvY2suZm9yXCI6XG5cdFx0XHRjYXNlIFwiaW5saW5lLmZvclwiOlxuXHRcdFx0XHRyZXR1cm4gbmV3IEZvcihub2RlLGNvZGUsY2hpbGRyZW4pXG5cdFx0XHRjYXNlIFwiYmxvY2suaWZcIjpcblx0XHRcdGNhc2UgXCJpbmxpbmUuaWZcIjpcblx0XHRcdFx0cmV0dXJuIG5ldyBJZihub2RlLGNvZGUsY2hpbGRyZW4pXG5cdFx0XHRjYXNlIFwiYmxvY2suc2NyaXB0XCI6XG5cdFx0XHRjYXNlIFwiaW5saW5lLnNjcmlwdFwiOlxuXHRcdFx0XHRyZXR1cm4gbmV3IFNjcmlwdChub2RlLGNvZGUpXG5cdFx0XHRjYXNlIFwiZG9jdW1lbnRcIjpcblx0XHRcdFx0dGhpcy52YXJEb2M9bmV3IERvY3VtZW50KHRoaXMuZG9jeCxjaGlsZHJlbilcblx0XHRcdFx0cmV0dXJuIHRoaXNcblx0XHRcdGNhc2UgXCJibG9jay5lbWJlZC5zdWJkb2NcIjpcblx0XHRcdGNhc2UgXCJpbmxpbmUuZW1iZWQuc3ViZG9jXCI6XG5cdFx0XHRcdHJldHVybiBuZXcgU3ViRG9jKG5vZGUsIGNvZGUpXG5cdFx0XHRjYXNlIFwiYmxvY2suc3ViZG9jXCI6XG5cdFx0XHRjYXNlIFwiaW5saW5lLnN1YmRvY1wiOlxuXHRcdFx0XHRyZXR1cm4gbmV3IFN1YkRvYy5EeW5hbWljKG5vZGUsIGNvZGUpXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRpZihjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGg+MCl7XG5cdFx0XHRcdFx0aWYoY2hpbGRyZW4ubGVuZ3RoPT0xKVxuXHRcdFx0XHRcdFx0cmV0dXJuIGNoaWxkcmVuWzBdXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0cmV0dXJuIGNoaWxkcmVuXG5cdFx0XHRcdH1cblx0XHR9XG5cblx0fVxuXG5cdGFzc2VtYmxlKGRhdGEpe1xuXHRcdHJldHVybiB0aGlzLnZhckRvYy5hc3NlbWJsZSguLi5hcmd1bWVudHMpXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVmFyaWFudEhhbmRsZXJcbiJdfQ==