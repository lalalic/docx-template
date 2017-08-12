"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _esprima = require("esprima");

var _esprima2 = _interopRequireDefault(_esprima);

var _variant = require("./variant");

var _variant2 = _interopRequireDefault(_variant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var If = function (_Variant) {
	_inherits(If, _Variant);

	function If() {
		_classCallCheck(this, If);

		var _this = _possibleConstructorReturn(this, (If.__proto__ || Object.getPrototypeOf(If)).apply(this, arguments));

		var codeBlock = _this.code.body[0].consequent.body;
		while (!Array.isArray(codeBlock)) {
			//if()with(){}
			codeBlock = codeBlock.body;
		}
		var _esprima$parse$body$ = _esprima2.default.parse("\n\t\t\tif(a){\n\t\t\t\t" + _this.id + ".assemble(this, $('" + _this.selector + "'),true)\n\t\t\t}else{\n\t\t\t\t" + _this.id + ".assemble(this, $('" + _this.selector + "'),false)\n\t\t\t}\n\t\t").body[0],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9faWYuanMiXSwibmFtZXMiOlsiSWYiLCJhcmd1bWVudHMiLCJjb2RlQmxvY2siLCJjb2RlIiwiYm9keSIsImNvbnNlcXVlbnQiLCJBcnJheSIsImlzQXJyYXkiLCJwYXJzZSIsImlkIiwic2VsZWN0b3IiLCJhbHRlcm5hdGUiLCJwdXNoIiwiY2hpbGRyZW4iLCJmb3JFYWNoIiwiYSIsImRvY3giLCJub2RlIiwic2F0aWZpZWQiLCJyZW1vdmUiLCJ0eXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsRTs7O0FBR3BCLGVBQWE7QUFBQTs7QUFBQSx1R0FDSEMsU0FERzs7QUFHWixNQUFJQyxZQUFVLE1BQUtDLElBQUwsQ0FBVUMsSUFBVixDQUFlLENBQWYsRUFBa0JDLFVBQWxCLENBQTZCRCxJQUEzQztBQUNBLFNBQU0sQ0FBQ0UsTUFBTUMsT0FBTixDQUFjTCxTQUFkLENBQVA7QUFBZ0M7QUFDL0JBLGVBQVVBLFVBQVVFLElBQXBCO0FBREQ7QUFKWSw2QkFPaUIsa0JBQVFJLEtBQVIsOEJBRXpCLE1BQUtDLEVBRm9CLDJCQUVJLE1BQUtDLFFBRlQsd0NBSXpCLE1BQUtELEVBSm9CLDJCQUlJLE1BQUtDLFFBSlQsK0JBTTFCTixJQU4wQixDQU1yQixDQU5xQixDQVBqQjtBQUFBLE1BT0xDLFVBUEssd0JBT0xBLFVBUEs7QUFBQSxNQU9NTSxTQVBOLHdCQU9NQSxTQVBOOztBQWVaVCxZQUFVVSxJQUFWLENBQWVQLFdBQVdELElBQVgsQ0FBZ0IsQ0FBaEIsQ0FBZjtBQUNBLFFBQUtTLFFBQUwsQ0FBY0MsT0FBZCxDQUFzQjtBQUFBLFVBQUdaLFVBQVVVLElBQVYsQ0FBZUcsRUFBRVosSUFBakIsQ0FBSDtBQUFBLEdBQXRCOztBQUVBLFFBQUtBLElBQUwsQ0FBVUMsSUFBVixDQUFlLENBQWYsRUFBa0JPLFNBQWxCLEdBQTRCQSxTQUE1QjtBQWxCWTtBQW1CWjs7OzsyQkFFUUssSSxFQUFNQyxJLEVBQU1DLFEsRUFBUztBQUM3QixPQUFHLENBQUNBLFFBQUosRUFDQ0QsS0FBS0UsTUFBTDtBQUNEOzs7Ozs7QUEzQm1CbkIsRSxDQUNib0IsSSxHQUFLLFk7a0JBRFFwQixFIiwiZmlsZSI6Il9pZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBlc3ByaW1hIGZyb20gXCJlc3ByaW1hXCJcclxuaW1wb3J0IFZhcmlhbnQgZnJvbSBcIi4vdmFyaWFudFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJZiBleHRlbmRzIFZhcmlhbnR7XHJcblx0c3RhdGljIHR5cGU9XCJ2YXJpYW50LmlmXCJcclxuXHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHJcblx0XHRsZXQgY29kZUJsb2NrPXRoaXMuY29kZS5ib2R5WzBdLmNvbnNlcXVlbnQuYm9keVxyXG5cdFx0d2hpbGUoIUFycmF5LmlzQXJyYXkoY29kZUJsb2NrKSkvL2lmKCl3aXRoKCl7fVxyXG5cdFx0XHRjb2RlQmxvY2s9Y29kZUJsb2NrLmJvZHlcclxuXHJcblx0XHRjb25zdCB7Y29uc2VxdWVudCxhbHRlcm5hdGV9PWVzcHJpbWEucGFyc2UoYFxyXG5cdFx0XHRpZihhKXtcclxuXHRcdFx0XHQke3RoaXMuaWR9LmFzc2VtYmxlKHRoaXMsICQoJyR7dGhpcy5zZWxlY3Rvcn0nKSx0cnVlKVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHQke3RoaXMuaWR9LmFzc2VtYmxlKHRoaXMsICQoJyR7dGhpcy5zZWxlY3Rvcn0nKSxmYWxzZSlcclxuXHRcdFx0fVxyXG5cdFx0YCkuYm9keVswXVxyXG5cclxuXHRcdGNvZGVCbG9jay5wdXNoKGNvbnNlcXVlbnQuYm9keVswXSlcclxuXHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaChhPT5jb2RlQmxvY2sucHVzaChhLmNvZGUpKVxyXG5cclxuXHRcdHRoaXMuY29kZS5ib2R5WzBdLmFsdGVybmF0ZT1hbHRlcm5hdGVcclxuXHR9XHJcblxyXG5cdGFzc2VtYmxlKGRvY3gsIG5vZGUsIHNhdGlmaWVkKXtcclxuXHRcdGlmKCFzYXRpZmllZClcclxuXHRcdFx0bm9kZS5yZW1vdmUoKVxyXG5cdH1cclxufVxyXG4iXX0=