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

var For = function (_Variant) {
	_inherits(For, _Variant);

	function For() {
		_classCallCheck(this, For);

		var _this = _possibleConstructorReturn(this, (For.__proto__ || Object.getPrototypeOf(For)).apply(this, arguments));

		var codeBlock = _this.code.body[0].body.body;
		while (!Array.isArray(codeBlock)) {
			//for()with(){}
			codeBlock = codeBlock.body;
		}_this.children.forEach(function (a) {
			return codeBlock.push(a.code);
		});
		codeBlock.push(_esprima2.default.parse(_this.id + ".assemble(this,$('" + _this.selector + "'))").body[0]);

		_this.code.body.unshift(_esprima2.default.parse(_this.id + ".assembling(this,$('" + _this.selector + "'))").body[0]);
		_this.code.body.push(_esprima2.default.parse(_this.id + ".assembled(this,$('" + _this.selector + "'))").body[0]);
		return _this;
	}

	_createClass(For, [{
		key: "assembling",
		value: function assembling(docx, node) {
			this._template = node.clone();
			this._results = [];
		}

		//loop run after each child assembled

	}, {
		key: "assemble",
		value: function assemble(docx, node) {
			this._results.push(node);
			node.replaceWith(this._template.clone());
		}
	}, {
		key: "assembled",
		value: function assembled(docx, node) {
			this._results.forEach(function (a) {
				return node.before(a);
			});
			node.remove();

			delete this._results;
			delete this._template;
		}
	}]);

	return For;
}(_variant2.default);

For.type = "variant.for";
exports.default = For;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fZm9yLmpzIl0sIm5hbWVzIjpbIkZvciIsImFyZ3VtZW50cyIsImNvZGVCbG9jayIsImNvZGUiLCJib2R5IiwiQXJyYXkiLCJpc0FycmF5IiwiY2hpbGRyZW4iLCJmb3JFYWNoIiwicHVzaCIsImEiLCJwYXJzZSIsImlkIiwic2VsZWN0b3IiLCJ1bnNoaWZ0IiwiZG9jeCIsIm5vZGUiLCJfdGVtcGxhdGUiLCJjbG9uZSIsIl9yZXN1bHRzIiwicmVwbGFjZVdpdGgiLCJiZWZvcmUiLCJyZW1vdmUiLCJ0eXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsRzs7O0FBRXBCLGdCQUFhO0FBQUE7O0FBQUEseUdBQ0hDLFNBREc7O0FBR1osTUFBSUMsWUFBVSxNQUFLQyxJQUFMLENBQVVDLElBQVYsQ0FBZSxDQUFmLEVBQWtCQSxJQUFsQixDQUF1QkEsSUFBckM7QUFDQSxTQUFNLENBQUNDLE1BQU1DLE9BQU4sQ0FBY0osU0FBZCxDQUFQO0FBQWdDO0FBQy9CQSxlQUFVQSxVQUFVRSxJQUFwQjtBQURELEdBR0EsTUFBS0csUUFBTCxDQUFjQyxPQUFkLENBQXNCO0FBQUEsVUFBR04sVUFBVU8sSUFBVixDQUFlQyxFQUFFUCxJQUFqQixDQUFIO0FBQUEsR0FBdEI7QUFDQUQsWUFBVU8sSUFBVixDQUFlLGtCQUFRRSxLQUFSLENBQWlCLE1BQUtDLEVBQXRCLDBCQUE2QyxNQUFLQyxRQUFsRCxVQUFpRVQsSUFBakUsQ0FBc0UsQ0FBdEUsQ0FBZjs7QUFFQSxRQUFLRCxJQUFMLENBQVVDLElBQVYsQ0FBZVUsT0FBZixDQUF1QixrQkFBUUgsS0FBUixDQUFpQixNQUFLQyxFQUF0Qiw0QkFBK0MsTUFBS0MsUUFBcEQsVUFBbUVULElBQW5FLENBQXdFLENBQXhFLENBQXZCO0FBQ0EsUUFBS0QsSUFBTCxDQUFVQyxJQUFWLENBQWVLLElBQWYsQ0FBb0Isa0JBQVFFLEtBQVIsQ0FBaUIsTUFBS0MsRUFBdEIsMkJBQThDLE1BQUtDLFFBQW5ELFVBQWtFVCxJQUFsRSxDQUF1RSxDQUF2RSxDQUFwQjtBQVhZO0FBWVo7Ozs7NkJBRVVXLEksRUFBS0MsSSxFQUFLO0FBQ3BCLFFBQUtDLFNBQUwsR0FBZUQsS0FBS0UsS0FBTCxFQUFmO0FBQ0EsUUFBS0MsUUFBTCxHQUFjLEVBQWQ7QUFDQTs7QUFFRDs7OzsyQkFDU0osSSxFQUFLQyxJLEVBQUs7QUFDbEIsUUFBS0csUUFBTCxDQUFjVixJQUFkLENBQW1CTyxJQUFuQjtBQUNBQSxRQUFLSSxXQUFMLENBQWlCLEtBQUtILFNBQUwsQ0FBZUMsS0FBZixFQUFqQjtBQUNBOzs7NEJBRVNILEksRUFBS0MsSSxFQUFLO0FBQ25CLFFBQUtHLFFBQUwsQ0FBY1gsT0FBZCxDQUFzQjtBQUFBLFdBQUdRLEtBQUtLLE1BQUwsQ0FBWVgsQ0FBWixDQUFIO0FBQUEsSUFBdEI7QUFDQU0sUUFBS00sTUFBTDs7QUFFQSxVQUFPLEtBQUtILFFBQVo7QUFDQSxVQUFPLEtBQUtGLFNBQVo7QUFDQTs7Ozs7O0FBakNtQmpCLEcsQ0FDYnVCLEksR0FBSyxhO2tCQURRdkIsRyIsImZpbGUiOiJfZm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGVzcHJpbWEgZnJvbSBcImVzcHJpbWFcIlxyXG5pbXBvcnQgVmFyaWFudCBmcm9tIFwiLi92YXJpYW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvciBleHRlbmRzIFZhcmlhbnR7XHJcblx0c3RhdGljIHR5cGU9XCJ2YXJpYW50LmZvclwiXHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHJcblx0XHRsZXQgY29kZUJsb2NrPXRoaXMuY29kZS5ib2R5WzBdLmJvZHkuYm9keVxyXG5cdFx0d2hpbGUoIUFycmF5LmlzQXJyYXkoY29kZUJsb2NrKSkvL2Zvcigpd2l0aCgpe31cclxuXHRcdFx0Y29kZUJsb2NrPWNvZGVCbG9jay5ib2R5XHJcblxyXG5cdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKGE9PmNvZGVCbG9jay5wdXNoKGEuY29kZSkpXHJcblx0XHRjb2RlQmxvY2sucHVzaChlc3ByaW1hLnBhcnNlKGAke3RoaXMuaWR9LmFzc2VtYmxlKHRoaXMsJCgnJHt0aGlzLnNlbGVjdG9yfScpKWApLmJvZHlbMF0pXHJcblx0XHRcclxuXHRcdHRoaXMuY29kZS5ib2R5LnVuc2hpZnQoZXNwcmltYS5wYXJzZShgJHt0aGlzLmlkfS5hc3NlbWJsaW5nKHRoaXMsJCgnJHt0aGlzLnNlbGVjdG9yfScpKWApLmJvZHlbMF0pXHJcblx0XHR0aGlzLmNvZGUuYm9keS5wdXNoKGVzcHJpbWEucGFyc2UoYCR7dGhpcy5pZH0uYXNzZW1ibGVkKHRoaXMsJCgnJHt0aGlzLnNlbGVjdG9yfScpKWApLmJvZHlbMF0pXHJcblx0fVxyXG5cclxuXHRhc3NlbWJsaW5nKGRvY3gsbm9kZSl7XHJcblx0XHR0aGlzLl90ZW1wbGF0ZT1ub2RlLmNsb25lKClcclxuXHRcdHRoaXMuX3Jlc3VsdHM9W11cclxuXHR9XHJcblxyXG5cdC8vbG9vcCBydW4gYWZ0ZXIgZWFjaCBjaGlsZCBhc3NlbWJsZWRcclxuXHRhc3NlbWJsZShkb2N4LG5vZGUpe1xyXG5cdFx0dGhpcy5fcmVzdWx0cy5wdXNoKG5vZGUpXHJcblx0XHRub2RlLnJlcGxhY2VXaXRoKHRoaXMuX3RlbXBsYXRlLmNsb25lKCkpXHJcblx0fVxyXG5cclxuXHRhc3NlbWJsZWQoZG9jeCxub2RlKXtcclxuXHRcdHRoaXMuX3Jlc3VsdHMuZm9yRWFjaChhPT5ub2RlLmJlZm9yZShhKSlcclxuXHRcdG5vZGUucmVtb3ZlKClcclxuXHRcdFxyXG5cdFx0ZGVsZXRlIHRoaXMuX3Jlc3VsdHNcclxuXHRcdGRlbGV0ZSB0aGlzLl90ZW1wbGF0ZVxyXG5cdH1cclxufVxyXG4iXX0=