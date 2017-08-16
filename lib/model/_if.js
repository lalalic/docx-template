"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _variant = require("./variant");

var _variant2 = _interopRequireDefault(_variant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var esprima = require("esprima");

var If = function (_Variant) {
	_inherits(If, _Variant);

	function If() {
		_classCallCheck(this, If);

		var _this = _possibleConstructorReturn(this, (If.__proto__ || Object.getPrototypeOf(If)).apply(this, arguments));

		var codeBlock = _this.code.body[0].consequent.body;
		while (!Array.isArray(codeBlock)) {
			//if()with(){}
			codeBlock = codeBlock.body;
		}var _esprima$parse$body$ = esprima.parse("\n\t\t\tif(a){\n\t\t\t\t" + _this.object + ".assemble(docx, $('" + _this.selector + "'),true)\n\t\t\t}else{\n\t\t\t\t" + _this.object + ".assemble(docx, $('" + _this.selector + "'),false)\n\t\t\t}\n\t\t").body[0],
		    consequent = _esprima$parse$body$.consequent,
		    alternate = _esprima$parse$body$.alternate;


		codeBlock.push(consequent.body[0]);
		_this.children.forEach(function (a) {
			return codeBlock.push(a.code);
		});

		_this.code.body[0].alternate = alternate;
		return _this;
	}

	_createClass(If, [{
		key: "assemble",
		value: function assemble(docx, node, satified) {
			if (!satified) node.remove();
		}
	}]);

	return If;
}(_variant2.default);

If.type = "variant.if";
exports.default = If;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9faWYuanMiXSwibmFtZXMiOlsiZXNwcmltYSIsInJlcXVpcmUiLCJJZiIsImFyZ3VtZW50cyIsImNvZGVCbG9jayIsImNvZGUiLCJib2R5IiwiY29uc2VxdWVudCIsIkFycmF5IiwiaXNBcnJheSIsInBhcnNlIiwib2JqZWN0Iiwic2VsZWN0b3IiLCJhbHRlcm5hdGUiLCJwdXNoIiwiY2hpbGRyZW4iLCJmb3JFYWNoIiwiYSIsImRvY3giLCJub2RlIiwic2F0aWZpZWQiLCJyZW1vdmUiLCJ0eXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFEQSxJQUFNQSxVQUFRQyxRQUFRLFNBQVIsQ0FBZDs7SUFHcUJDLEU7OztBQUdwQixlQUFhO0FBQUE7O0FBQUEsdUdBQ0hDLFNBREc7O0FBR1osTUFBSUMsWUFBVSxNQUFLQyxJQUFMLENBQVVDLElBQVYsQ0FBZSxDQUFmLEVBQWtCQyxVQUFsQixDQUE2QkQsSUFBM0M7QUFDQSxTQUFNLENBQUNFLE1BQU1DLE9BQU4sQ0FBY0wsU0FBZCxDQUFQO0FBQWdDO0FBQy9CQSxlQUFVQSxVQUFVRSxJQUFwQjtBQURELEdBSlksMkJBT2lCTixRQUFRVSxLQUFSLDhCQUV6QixNQUFLQyxNQUZvQiwyQkFFUSxNQUFLQyxRQUZiLHdDQUl6QixNQUFLRCxNQUpvQiwyQkFJUSxNQUFLQyxRQUpiLCtCQU0xQk4sSUFOMEIsQ0FNckIsQ0FOcUIsQ0FQakI7QUFBQSxNQU9MQyxVQVBLLHdCQU9MQSxVQVBLO0FBQUEsTUFPTU0sU0FQTix3QkFPTUEsU0FQTjs7O0FBZVpULFlBQVVVLElBQVYsQ0FBZVAsV0FBV0QsSUFBWCxDQUFnQixDQUFoQixDQUFmO0FBQ0EsUUFBS1MsUUFBTCxDQUFjQyxPQUFkLENBQXNCO0FBQUEsVUFBR1osVUFBVVUsSUFBVixDQUFlRyxFQUFFWixJQUFqQixDQUFIO0FBQUEsR0FBdEI7O0FBRUEsUUFBS0EsSUFBTCxDQUFVQyxJQUFWLENBQWUsQ0FBZixFQUFrQk8sU0FBbEIsR0FBNEJBLFNBQTVCO0FBbEJZO0FBbUJaOzs7OzJCQUVRSyxJLEVBQU1DLEksRUFBTUMsUSxFQUFTO0FBQzdCLE9BQUcsQ0FBQ0EsUUFBSixFQUNDRCxLQUFLRSxNQUFMO0FBQ0Q7Ozs7OztBQTNCbUJuQixFLENBQ2JvQixJLEdBQUssWTtrQkFEUXBCLEUiLCJmaWxlIjoiX2lmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZXNwcmltYT1yZXF1aXJlKFwiZXNwcmltYVwiKVxyXG5pbXBvcnQgVmFyaWFudCBmcm9tIFwiLi92YXJpYW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElmIGV4dGVuZHMgVmFyaWFudHtcclxuXHRzdGF0aWMgdHlwZT1cInZhcmlhbnQuaWZcIlxyXG5cclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cclxuXHRcdGxldCBjb2RlQmxvY2s9dGhpcy5jb2RlLmJvZHlbMF0uY29uc2VxdWVudC5ib2R5XHJcblx0XHR3aGlsZSghQXJyYXkuaXNBcnJheShjb2RlQmxvY2spKS8vaWYoKXdpdGgoKXt9XHJcblx0XHRcdGNvZGVCbG9jaz1jb2RlQmxvY2suYm9keVxyXG5cclxuXHRcdGNvbnN0IHtjb25zZXF1ZW50LGFsdGVybmF0ZX09ZXNwcmltYS5wYXJzZShgXHJcblx0XHRcdGlmKGEpe1xyXG5cdFx0XHRcdCR7dGhpcy5vYmplY3R9LmFzc2VtYmxlKGRvY3gsICQoJyR7dGhpcy5zZWxlY3Rvcn0nKSx0cnVlKVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHQke3RoaXMub2JqZWN0fS5hc3NlbWJsZShkb2N4LCAkKCcke3RoaXMuc2VsZWN0b3J9JyksZmFsc2UpXHJcblx0XHRcdH1cclxuXHRcdGApLmJvZHlbMF1cclxuXHJcblx0XHRjb2RlQmxvY2sucHVzaChjb25zZXF1ZW50LmJvZHlbMF0pXHJcblx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goYT0+Y29kZUJsb2NrLnB1c2goYS5jb2RlKSlcclxuXHJcblx0XHR0aGlzLmNvZGUuYm9keVswXS5hbHRlcm5hdGU9YWx0ZXJuYXRlXHJcblx0fVxyXG5cclxuXHRhc3NlbWJsZShkb2N4LCBub2RlLCBzYXRpZmllZCl7XHJcblx0XHRpZighc2F0aWZpZWQpXHJcblx0XHRcdG5vZGUucmVtb3ZlKClcclxuXHR9XHJcbn1cclxuIl19