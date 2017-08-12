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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92YXJpYW50LWhhbmRsZXIuanMiXSwibmFtZXMiOlsiVmFyaWFudEhhbmRsZXIiLCJkb2N4IiwidHlwZSIsImNoaWxkcmVuIiwiY29kZSIsIm5vZGUiLCJyYXdDb2RlIiwiZmxhdCIsImFycmF5IiwiZmxhdGVkIiwicmVkdWNlIiwiY29sbGVjdGVkIiwiYSIsIkFycmF5IiwiaXNBcnJheSIsInB1c2giLCJ2YXJEb2MiLCJsZW5ndGgiLCJkYXRhIiwiYXNzZW1ibGUiLCJhcmd1bWVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFYUEsYyxXQUFBQSxjOzs7QUFDWix5QkFBWUMsSUFBWixFQUFpQjtBQUFBOztBQUFBOztBQUVoQixRQUFLQSxJQUFMLEdBQVVBLElBQVY7QUFGZ0I7QUFHaEI7Ozs7Z0NBRWFDLEksUUFBeUJDLFEsRUFBUztBQUFBLE9BQTVCQyxJQUE0QixRQUE1QkEsSUFBNEI7QUFBQSxPQUF2QkMsSUFBdUIsUUFBdkJBLElBQXVCO0FBQUEsT0FBbEJDLE9BQWtCLFFBQWxCQSxPQUFrQjs7QUFDL0MsT0FBR0gsUUFBSCxFQUFZO0FBQ1gsUUFBTUksT0FBSyxTQUFMQSxJQUFLLENBQUNDLEtBQUQ7QUFBQSxTQUFPQyxNQUFQLHVFQUFjLEVBQWQ7QUFBQSxZQUFtQkQsTUFBTUUsTUFBTixDQUFhLFVBQUNDLFNBQUQsRUFBV0MsQ0FBWCxFQUFlO0FBQ3pELFVBQUdDLE1BQU1DLE9BQU4sQ0FBY0YsQ0FBZCxDQUFILEVBQW9CO0FBQ25CTCxZQUFLSyxDQUFMLEVBQU9ELFNBQVA7QUFDQSxPQUZELE1BRU0sSUFBR0MsOEJBQUgsRUFBd0I7QUFDN0JELGlCQUFVSSxJQUFWLENBQWVILENBQWY7QUFDQTtBQUNELGFBQU9ELFNBQVA7QUFDQSxNQVA2QixFQU81QkYsTUFQNEIsQ0FBbkI7QUFBQSxLQUFYOztBQVNBTixlQUFTSSxLQUFLSixRQUFMLENBQVQ7QUFDQTs7QUFFRCxXQUFPRCxJQUFQO0FBQ0MsU0FBSyxxQkFBTDtBQUNDLFlBQU8sc0JBQVlHLElBQVosRUFBaUJELElBQWpCLENBQVA7QUFDRCxTQUFLLGtCQUFMO0FBQ0MsWUFBTyxrQkFBZUMsSUFBZixFQUFvQkQsSUFBcEIsQ0FBUDtBQUNELFNBQUssV0FBTDtBQUNBLFNBQUssWUFBTDtBQUNDLFlBQU8sa0JBQVFDLElBQVIsRUFBYUQsSUFBYixFQUFrQkQsUUFBbEIsQ0FBUDtBQUNELFNBQUssVUFBTDtBQUNBLFNBQUssV0FBTDtBQUNDLFlBQU8saUJBQU9FLElBQVAsRUFBWUQsSUFBWixFQUFpQkQsUUFBakIsQ0FBUDtBQUNELFNBQUssVUFBTDtBQUNDLFVBQUthLE1BQUwsR0FBWSx1QkFBYSxLQUFLZixJQUFsQixFQUF1QkUsUUFBdkIsQ0FBWjtBQUNBLFlBQU8sSUFBUDtBQUNEO0FBQ0MsU0FBR0EsWUFBWUEsU0FBU2MsTUFBVCxHQUFnQixDQUEvQixFQUFpQztBQUNoQyxVQUFHZCxTQUFTYyxNQUFULElBQWlCLENBQXBCLEVBQ0MsT0FBT2QsU0FBUyxDQUFULENBQVAsQ0FERCxLQUdDLE9BQU9BLFFBQVA7QUFDRDtBQXBCSDtBQXVCQTs7OzJCQUVRZSxJLEVBQUs7QUFBQTs7QUFDYixVQUFPLGdCQUFLRixNQUFMLEVBQVlHLFFBQVosZ0JBQXdCQyxTQUF4QixDQUFQO0FBQ0E7Ozs7OztrQkFHYXBCLGMiLCJmaWxlIjoidmFyaWFudC1oYW5kbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vZGVsSGFuZGxlciBmcm9tIFwiZG9jeDRqcy9saWIvb3BlbnhtbC9kb2N4L21vZGVsLWhhbmRsZXJcIlxuXG5pbXBvcnQgVmFyaWFudCBmcm9tIFwiLi9tb2RlbC92YXJpYW50XCJcbmltcG9ydCBEb2N1bWVudCBmcm9tIFwiLi9tb2RlbC9kb2N1bWVudFwiXG5pbXBvcnQgRXhwcmVzc2lvbiBmcm9tIFwiLi9tb2RlbC9fZXhwXCJcbmltcG9ydCBJZiBmcm9tIFwiLi9tb2RlbC9faWZcIlxuaW1wb3J0IEZvciBmcm9tIFwiLi9tb2RlbC9fZm9yXCJcbmltcG9ydCBQaWN0dXJlIGZyb20gXCIuL21vZGVsL19waWN0dXJlXCJcblxuZXhwb3J0IGNsYXNzIFZhcmlhbnRIYW5kbGVyIGV4dGVuZHMgTW9kZWxIYW5kbGVye1xuXHRjb25zdHJ1Y3Rvcihkb2N4KXtcblx0XHRzdXBlcigpXG5cdFx0dGhpcy5kb2N4PWRvY3hcblx0fVxuXG5cdGNyZWF0ZUVsZW1lbnQodHlwZSx7Y29kZSxub2RlLHJhd0NvZGV9LGNoaWxkcmVuKXtcblx0XHRpZihjaGlsZHJlbil7XG5cdFx0XHRjb25zdCBmbGF0PShhcnJheSxmbGF0ZWQ9W10pPT5hcnJheS5yZWR1Y2UoKGNvbGxlY3RlZCxhKT0+e1xuXHRcdFx0XHRpZihBcnJheS5pc0FycmF5KGEpKXtcblx0XHRcdFx0XHRmbGF0KGEsY29sbGVjdGVkKVxuXHRcdFx0XHR9ZWxzZSBpZihhIGluc3RhbmNlb2YgVmFyaWFudCl7XG5cdFx0XHRcdFx0Y29sbGVjdGVkLnB1c2goYSlcdFxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBjb2xsZWN0ZWRcblx0XHRcdH0sZmxhdGVkKVxuXHRcdFx0XG5cdFx0XHRjaGlsZHJlbj1mbGF0KGNoaWxkcmVuKVxuXHRcdH1cblx0XHRcblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0XHRjYXNlIFwiY29udHJvbC5waWN0dXJlLmV4cFwiOlxuXHRcdFx0XHRyZXR1cm4gbmV3IFBpY3R1cmUobm9kZSxjb2RlKVxuXHRcdFx0Y2FzZSBcImNvbnRyb2wudGV4dC5leHBcIjpcblx0XHRcdFx0cmV0dXJuIG5ldyBFeHByZXNzaW9uKG5vZGUsY29kZSlcblx0XHRcdGNhc2UgXCJibG9jay5mb3JcIjpcblx0XHRcdGNhc2UgXCJpbmxpbmUuZm9yXCI6XG5cdFx0XHRcdHJldHVybiBuZXcgRm9yKG5vZGUsY29kZSxjaGlsZHJlbilcblx0XHRcdGNhc2UgXCJibG9jay5pZlwiOlxuXHRcdFx0Y2FzZSBcImlubGluZS5pZlwiOlxuXHRcdFx0XHRyZXR1cm4gbmV3IElmKG5vZGUsY29kZSxjaGlsZHJlbilcblx0XHRcdGNhc2UgXCJkb2N1bWVudFwiOlxuXHRcdFx0XHR0aGlzLnZhckRvYz1uZXcgRG9jdW1lbnQodGhpcy5kb2N4LGNoaWxkcmVuKVxuXHRcdFx0XHRyZXR1cm4gdGhpc1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0aWYoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoPjApe1xuXHRcdFx0XHRcdGlmKGNoaWxkcmVuLmxlbmd0aD09MSlcblx0XHRcdFx0XHRcdHJldHVybiBjaGlsZHJlblswXVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdHJldHVybiBjaGlsZHJlblxuXHRcdFx0XHR9XG5cdFx0fVxuXG5cdH1cblxuXHRhc3NlbWJsZShkYXRhKXtcblx0XHRyZXR1cm4gdGhpcy52YXJEb2MuYXNzZW1ibGUoLi4uYXJndW1lbnRzKVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZhcmlhbnRIYW5kbGVyXG4iXX0=