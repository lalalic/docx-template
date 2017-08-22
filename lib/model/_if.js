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
		}var _esprima$parse$body$ = esprima.parse("\n\t\t\tif(a){\n\t\t\t\t" + _this.object + ".assemble(docx, $('" + _this.selector + "'), __opt,true)\n\t\t\t}else{\n\t\t\t\t" + _this.object + ".assemble(docx, $('" + _this.selector + "'), __opt,false)\n\t\t\t}\n\t\t").body[0],
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
		value: function assemble(docx, node, _ref, satified) {
			var clearWrap = _ref.clearWrap;

			if (!satified) {
				node.remove();
			} else if (clearWrap) {
				node.replaceWith(node.find(">w\\:sdtContent").children());
			}
		}
	}]);

	return If;
}(_variant2.default);

If.type = "variant.if";
exports.default = If;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9faWYuanMiXSwibmFtZXMiOlsiZXNwcmltYSIsInJlcXVpcmUiLCJJZiIsImFyZ3VtZW50cyIsImNvZGVCbG9jayIsImNvZGUiLCJib2R5IiwiY29uc2VxdWVudCIsIkFycmF5IiwiaXNBcnJheSIsInBhcnNlIiwib2JqZWN0Iiwic2VsZWN0b3IiLCJhbHRlcm5hdGUiLCJwdXNoIiwiY2hpbGRyZW4iLCJmb3JFYWNoIiwiYSIsImRvY3giLCJub2RlIiwic2F0aWZpZWQiLCJjbGVhcldyYXAiLCJyZW1vdmUiLCJyZXBsYWNlV2l0aCIsImZpbmQiLCJ0eXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFEQSxJQUFNQSxVQUFRQyxRQUFRLFNBQVIsQ0FBZDs7SUFHcUJDLEU7OztBQUdwQixlQUFhO0FBQUE7O0FBQUEsdUdBQ0hDLFNBREc7O0FBR1osTUFBSUMsWUFBVSxNQUFLQyxJQUFMLENBQVVDLElBQVYsQ0FBZSxDQUFmLEVBQWtCQyxVQUFsQixDQUE2QkQsSUFBM0M7QUFDQSxTQUFNLENBQUNFLE1BQU1DLE9BQU4sQ0FBY0wsU0FBZCxDQUFQO0FBQWdDO0FBQy9CQSxlQUFVQSxVQUFVRSxJQUFwQjtBQURELEdBSlksMkJBT2lCTixRQUFRVSxLQUFSLDhCQUV6QixNQUFLQyxNQUZvQiwyQkFFUSxNQUFLQyxRQUZiLCtDQUl6QixNQUFLRCxNQUpvQiwyQkFJUSxNQUFLQyxRQUpiLHNDQU0xQk4sSUFOMEIsQ0FNckIsQ0FOcUIsQ0FQakI7QUFBQSxNQU9MQyxVQVBLLHdCQU9MQSxVQVBLO0FBQUEsTUFPTU0sU0FQTix3QkFPTUEsU0FQTjs7O0FBZVpULFlBQVVVLElBQVYsQ0FBZVAsV0FBV0QsSUFBWCxDQUFnQixDQUFoQixDQUFmO0FBQ0EsUUFBS1MsUUFBTCxDQUFjQyxPQUFkLENBQXNCO0FBQUEsVUFBR1osVUFBVVUsSUFBVixDQUFlRyxFQUFFWixJQUFqQixDQUFIO0FBQUEsR0FBdEI7O0FBRUEsUUFBS0EsSUFBTCxDQUFVQyxJQUFWLENBQWUsQ0FBZixFQUFrQk8sU0FBbEIsR0FBNEJBLFNBQTVCO0FBbEJZO0FBbUJaOzs7OzJCQUVRSyxJLEVBQU1DLEksUUFBbUJDLFEsRUFBUztBQUFBLE9BQXJCQyxTQUFxQixRQUFyQkEsU0FBcUI7O0FBQzFDLE9BQUcsQ0FBQ0QsUUFBSixFQUFhO0FBQ1pELFNBQUtHLE1BQUw7QUFDQSxJQUZELE1BRU0sSUFBR0QsU0FBSCxFQUFhO0FBQ2xCRixTQUFLSSxXQUFMLENBQWlCSixLQUFLSyxJQUFMLENBQVUsaUJBQVYsRUFBNkJULFFBQTdCLEVBQWpCO0FBQ0E7QUFDRDs7Ozs7O0FBOUJtQmIsRSxDQUNidUIsSSxHQUFLLFk7a0JBRFF2QixFIiwiZmlsZSI6Il9pZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGVzcHJpbWE9cmVxdWlyZShcImVzcHJpbWFcIilcclxuaW1wb3J0IFZhcmlhbnQgZnJvbSBcIi4vdmFyaWFudFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJZiBleHRlbmRzIFZhcmlhbnR7XHJcblx0c3RhdGljIHR5cGU9XCJ2YXJpYW50LmlmXCJcclxuXHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHJcblx0XHRsZXQgY29kZUJsb2NrPXRoaXMuY29kZS5ib2R5WzBdLmNvbnNlcXVlbnQuYm9keVxyXG5cdFx0d2hpbGUoIUFycmF5LmlzQXJyYXkoY29kZUJsb2NrKSkvL2lmKCl3aXRoKCl7fVxyXG5cdFx0XHRjb2RlQmxvY2s9Y29kZUJsb2NrLmJvZHlcclxuXHJcblx0XHRjb25zdCB7Y29uc2VxdWVudCxhbHRlcm5hdGV9PWVzcHJpbWEucGFyc2UoYFxyXG5cdFx0XHRpZihhKXtcclxuXHRcdFx0XHQke3RoaXMub2JqZWN0fS5hc3NlbWJsZShkb2N4LCAkKCcke3RoaXMuc2VsZWN0b3J9JyksIF9fb3B0LHRydWUpXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdCR7dGhpcy5vYmplY3R9LmFzc2VtYmxlKGRvY3gsICQoJyR7dGhpcy5zZWxlY3Rvcn0nKSwgX19vcHQsZmFsc2UpXHJcblx0XHRcdH1cclxuXHRcdGApLmJvZHlbMF1cclxuXHJcblx0XHRjb2RlQmxvY2sucHVzaChjb25zZXF1ZW50LmJvZHlbMF0pXHJcblx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goYT0+Y29kZUJsb2NrLnB1c2goYS5jb2RlKSlcclxuXHJcblx0XHR0aGlzLmNvZGUuYm9keVswXS5hbHRlcm5hdGU9YWx0ZXJuYXRlXHJcblx0fVxyXG5cclxuXHRhc3NlbWJsZShkb2N4LCBub2RlLCB7Y2xlYXJXcmFwfSwgc2F0aWZpZWQpe1xyXG5cdFx0aWYoIXNhdGlmaWVkKXtcclxuXHRcdFx0bm9kZS5yZW1vdmUoKVxyXG5cdFx0fWVsc2UgaWYoY2xlYXJXcmFwKXtcclxuXHRcdFx0bm9kZS5yZXBsYWNlV2l0aChub2RlLmZpbmQoXCI+d1xcXFw6c2R0Q29udGVudFwiKS5jaGlsZHJlbigpKVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=