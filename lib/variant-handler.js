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
		value: function assemble(data, transactional) {
			var _varDoc;

			return (_varDoc = this.varDoc).assemble.apply(_varDoc, arguments);
		}
	}]);

	return VariantHandler;
}(_modelHandler2.default);

exports.default = VariantHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92YXJpYW50LWhhbmRsZXIuanMiXSwibmFtZXMiOlsiVmFyaWFudEhhbmRsZXIiLCJkb2N4IiwidHlwZSIsImNoaWxkcmVuIiwiY29kZSIsIm5vZGUiLCJyYXdDb2RlIiwiZmlsdGVyIiwiYSIsInZhckRvYyIsImxlbmd0aCIsImRhdGEiLCJ0cmFuc2FjdGlvbmFsIiwiYXNzZW1ibGUiLCJhcmd1bWVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFYUEsYyxXQUFBQSxjOzs7QUFDWix5QkFBWUMsSUFBWixFQUFpQjtBQUFBOztBQUFBOztBQUVoQixRQUFLQSxJQUFMLEdBQVVBLElBQVY7QUFGZ0I7QUFHaEI7Ozs7Z0NBRWFDLEksUUFBeUJDLFEsRUFBUztBQUFBLE9BQTVCQyxJQUE0QixRQUE1QkEsSUFBNEI7QUFBQSxPQUF2QkMsSUFBdUIsUUFBdkJBLElBQXVCO0FBQUEsT0FBbEJDLE9BQWtCLFFBQWxCQSxPQUFrQjs7QUFDL0MsT0FBR0gsUUFBSCxFQUNDQSxXQUFTQSxTQUFTSSxNQUFULENBQWdCO0FBQUEsV0FBR0MsOEJBQUg7QUFBQSxJQUFoQixDQUFUOztBQUVELFdBQU9OLElBQVA7QUFDQyxTQUFLLHFCQUFMO0FBQ0MsWUFBTyxzQkFBWUcsSUFBWixFQUFpQkQsSUFBakIsQ0FBUDtBQUNELFNBQUssa0JBQUw7QUFDQyxZQUFPLGtCQUFlQyxJQUFmLEVBQW9CRCxJQUFwQixDQUFQO0FBQ0QsU0FBSyxXQUFMO0FBQ0EsU0FBSyxZQUFMO0FBQ0MsWUFBTyxrQkFBUUMsSUFBUixFQUFhRCxJQUFiLEVBQWtCRCxRQUFsQixDQUFQO0FBQ0QsU0FBSyxVQUFMO0FBQ0EsU0FBSyxXQUFMO0FBQ0MsWUFBTyxpQkFBT0UsSUFBUCxFQUFZRCxJQUFaLEVBQWlCRCxRQUFqQixDQUFQO0FBQ0QsU0FBSyxVQUFMO0FBQ0MsVUFBS00sTUFBTCxHQUFZLHVCQUFhLEtBQUtSLElBQWxCLEVBQXVCRSxRQUF2QixDQUFaO0FBQ0EsWUFBTyxJQUFQO0FBQ0Q7QUFDQyxTQUFHQSxZQUFZQSxTQUFTTyxNQUFULEdBQWdCLENBQS9CLEVBQWlDO0FBQ2hDLFVBQUdQLFNBQVNPLE1BQVQsSUFBaUIsQ0FBcEIsRUFDQyxPQUFPUCxTQUFTLENBQVQsQ0FBUCxDQURELEtBR0MsT0FBT0EsUUFBUDtBQUNEO0FBcEJIO0FBdUJBOzs7MkJBRVFRLEksRUFBS0MsYSxFQUFjO0FBQUE7O0FBQzNCLFVBQU8sZ0JBQUtILE1BQUwsRUFBWUksUUFBWixnQkFBd0JDLFNBQXhCLENBQVA7QUFDQTs7Ozs7O2tCQUdhZCxjIiwiZmlsZSI6InZhcmlhbnQtaGFuZGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNb2RlbEhhbmRsZXIgZnJvbSBcImRvY3g0anMvbGliL29wZW54bWwvZG9jeC9tb2RlbC1oYW5kbGVyXCJcclxuXHJcbmltcG9ydCBWYXJpYW50IGZyb20gXCIuL21vZGVsL3ZhcmlhbnRcIlxyXG5pbXBvcnQgRG9jdW1lbnQgZnJvbSBcIi4vbW9kZWwvZG9jdW1lbnRcIlxyXG5pbXBvcnQgRXhwcmVzc2lvbiBmcm9tIFwiLi9tb2RlbC9fZXhwXCJcclxuaW1wb3J0IElmIGZyb20gXCIuL21vZGVsL19pZlwiXHJcbmltcG9ydCBGb3IgZnJvbSBcIi4vbW9kZWwvX2ZvclwiXHJcbmltcG9ydCBQaWN0dXJlIGZyb20gXCIuL21vZGVsL19waWN0dXJlXCJcclxuXHJcbmV4cG9ydCBjbGFzcyBWYXJpYW50SGFuZGxlciBleHRlbmRzIE1vZGVsSGFuZGxlcntcclxuXHRjb25zdHJ1Y3Rvcihkb2N4KXtcclxuXHRcdHN1cGVyKClcclxuXHRcdHRoaXMuZG9jeD1kb2N4XHJcblx0fVxyXG5cclxuXHRjcmVhdGVFbGVtZW50KHR5cGUse2NvZGUsbm9kZSxyYXdDb2RlfSxjaGlsZHJlbil7XHJcblx0XHRpZihjaGlsZHJlbilcclxuXHRcdFx0Y2hpbGRyZW49Y2hpbGRyZW4uZmlsdGVyKGE9PmEgaW5zdGFuY2VvZiBWYXJpYW50KVxyXG5cclxuXHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdFx0Y2FzZSBcImNvbnRyb2wucGljdHVyZS5leHBcIjpcclxuXHRcdFx0XHRyZXR1cm4gbmV3IFBpY3R1cmUobm9kZSxjb2RlKVxyXG5cdFx0XHRjYXNlIFwiY29udHJvbC50ZXh0LmV4cFwiOlxyXG5cdFx0XHRcdHJldHVybiBuZXcgRXhwcmVzc2lvbihub2RlLGNvZGUpXHJcblx0XHRcdGNhc2UgXCJibG9jay5mb3JcIjpcclxuXHRcdFx0Y2FzZSBcImlubGluZS5mb3JcIjpcclxuXHRcdFx0XHRyZXR1cm4gbmV3IEZvcihub2RlLGNvZGUsY2hpbGRyZW4pXHJcblx0XHRcdGNhc2UgXCJibG9jay5pZlwiOlxyXG5cdFx0XHRjYXNlIFwiaW5saW5lLmlmXCI6XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBJZihub2RlLGNvZGUsY2hpbGRyZW4pXHJcblx0XHRcdGNhc2UgXCJkb2N1bWVudFwiOlxyXG5cdFx0XHRcdHRoaXMudmFyRG9jPW5ldyBEb2N1bWVudCh0aGlzLmRvY3gsY2hpbGRyZW4pXHJcblx0XHRcdFx0cmV0dXJuIHRoaXNcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRpZihjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGg+MCl7XHJcblx0XHRcdFx0XHRpZihjaGlsZHJlbi5sZW5ndGg9PTEpXHJcblx0XHRcdFx0XHRcdHJldHVybiBjaGlsZHJlblswXVxyXG5cdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gY2hpbGRyZW5cclxuXHRcdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0YXNzZW1ibGUoZGF0YSx0cmFuc2FjdGlvbmFsKXtcclxuXHRcdHJldHVybiB0aGlzLnZhckRvYy5hc3NlbWJsZSguLi5hcmd1bWVudHMpXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWYXJpYW50SGFuZGxlclxyXG4iXX0=