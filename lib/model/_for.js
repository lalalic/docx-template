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
		codeBlock.push(_esprima2.default.parse(_this.id + ".assemble(this,$('#" + _this.id + "'))").body[0]);

		_this.code.body.unshift(_esprima2.default.parse(_this.id + ".assembling(this,$('#" + _this.id + "'))").body[0]);
		_this.code.body.push(_esprima2.default.parse(_this.id + ".assembled(this,$('#" + _this.id + "'))").body[0]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fZm9yLmpzIl0sIm5hbWVzIjpbIkZvciIsImFyZ3VtZW50cyIsImNvZGVCbG9jayIsImNvZGUiLCJib2R5IiwiQXJyYXkiLCJpc0FycmF5IiwiY2hpbGRyZW4iLCJmb3JFYWNoIiwicHVzaCIsImEiLCJwYXJzZSIsImlkIiwidW5zaGlmdCIsImRvY3giLCJub2RlIiwiX3RlbXBsYXRlIiwiY2xvbmUiLCJfcmVzdWx0cyIsInJlcGxhY2VXaXRoIiwiYmVmb3JlIiwicmVtb3ZlIiwidHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEc7OztBQUVwQixnQkFBYTtBQUFBOztBQUFBLHlHQUNIQyxTQURHOztBQUdaLE1BQUlDLFlBQVUsTUFBS0MsSUFBTCxDQUFVQyxJQUFWLENBQWUsQ0FBZixFQUFrQkEsSUFBbEIsQ0FBdUJBLElBQXJDO0FBQ0EsU0FBTSxDQUFDQyxNQUFNQyxPQUFOLENBQWNKLFNBQWQsQ0FBUDtBQUFnQztBQUMvQkEsZUFBVUEsVUFBVUUsSUFBcEI7QUFERCxHQUdBLE1BQUtHLFFBQUwsQ0FBY0MsT0FBZCxDQUFzQjtBQUFBLFVBQUdOLFVBQVVPLElBQVYsQ0FBZUMsRUFBRVAsSUFBakIsQ0FBSDtBQUFBLEdBQXRCO0FBQ0FELFlBQVVPLElBQVYsQ0FBZSxrQkFBUUUsS0FBUixDQUFpQixNQUFLQyxFQUF0QiwyQkFBOEMsTUFBS0EsRUFBbkQsVUFBNERSLElBQTVELENBQWlFLENBQWpFLENBQWY7O0FBRUEsUUFBS0QsSUFBTCxDQUFVQyxJQUFWLENBQWVTLE9BQWYsQ0FBdUIsa0JBQVFGLEtBQVIsQ0FBaUIsTUFBS0MsRUFBdEIsNkJBQWdELE1BQUtBLEVBQXJELFVBQThEUixJQUE5RCxDQUFtRSxDQUFuRSxDQUF2QjtBQUNBLFFBQUtELElBQUwsQ0FBVUMsSUFBVixDQUFlSyxJQUFmLENBQW9CLGtCQUFRRSxLQUFSLENBQWlCLE1BQUtDLEVBQXRCLDRCQUErQyxNQUFLQSxFQUFwRCxVQUE2RFIsSUFBN0QsQ0FBa0UsQ0FBbEUsQ0FBcEI7QUFYWTtBQVlaOzs7OzZCQUVVVSxJLEVBQUtDLEksRUFBSztBQUNwQixRQUFLQyxTQUFMLEdBQWVELEtBQUtFLEtBQUwsRUFBZjtBQUNBLFFBQUtDLFFBQUwsR0FBYyxFQUFkO0FBQ0E7O0FBRUQ7Ozs7MkJBQ1NKLEksRUFBS0MsSSxFQUFLO0FBQ2xCLFFBQUtHLFFBQUwsQ0FBY1QsSUFBZCxDQUFtQk0sSUFBbkI7QUFDQUEsUUFBS0ksV0FBTCxDQUFpQixLQUFLSCxTQUFMLENBQWVDLEtBQWYsRUFBakI7QUFDQTs7OzRCQUVTSCxJLEVBQUtDLEksRUFBSztBQUNuQixRQUFLRyxRQUFMLENBQWNWLE9BQWQsQ0FBc0I7QUFBQSxXQUFHTyxLQUFLSyxNQUFMLENBQVlWLENBQVosQ0FBSDtBQUFBLElBQXRCO0FBQ0FLLFFBQUtNLE1BQUw7O0FBRUEsVUFBTyxLQUFLSCxRQUFaO0FBQ0EsVUFBTyxLQUFLRixTQUFaO0FBQ0E7Ozs7OztBQWpDbUJoQixHLENBQ2JzQixJLEdBQUssYTtrQkFEUXRCLEciLCJmaWxlIjoiX2Zvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBlc3ByaW1hIGZyb20gXCJlc3ByaW1hXCJcclxuaW1wb3J0IFZhcmlhbnQgZnJvbSBcIi4vdmFyaWFudFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3IgZXh0ZW5kcyBWYXJpYW50e1xyXG5cdHN0YXRpYyB0eXBlPVwidmFyaWFudC5mb3JcIlxyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblxyXG5cdFx0bGV0IGNvZGVCbG9jaz10aGlzLmNvZGUuYm9keVswXS5ib2R5LmJvZHlcclxuXHRcdHdoaWxlKCFBcnJheS5pc0FycmF5KGNvZGVCbG9jaykpLy9mb3IoKXdpdGgoKXt9XHJcblx0XHRcdGNvZGVCbG9jaz1jb2RlQmxvY2suYm9keVxyXG5cclxuXHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaChhPT5jb2RlQmxvY2sucHVzaChhLmNvZGUpKVxyXG5cdFx0Y29kZUJsb2NrLnB1c2goZXNwcmltYS5wYXJzZShgJHt0aGlzLmlkfS5hc3NlbWJsZSh0aGlzLCQoJyMke3RoaXMuaWR9JykpYCkuYm9keVswXSlcclxuXHRcdFxyXG5cdFx0dGhpcy5jb2RlLmJvZHkudW5zaGlmdChlc3ByaW1hLnBhcnNlKGAke3RoaXMuaWR9LmFzc2VtYmxpbmcodGhpcywkKCcjJHt0aGlzLmlkfScpKWApLmJvZHlbMF0pXHJcblx0XHR0aGlzLmNvZGUuYm9keS5wdXNoKGVzcHJpbWEucGFyc2UoYCR7dGhpcy5pZH0uYXNzZW1ibGVkKHRoaXMsJCgnIyR7dGhpcy5pZH0nKSlgKS5ib2R5WzBdKVxyXG5cdH1cclxuXHJcblx0YXNzZW1ibGluZyhkb2N4LG5vZGUpe1xyXG5cdFx0dGhpcy5fdGVtcGxhdGU9bm9kZS5jbG9uZSgpXHJcblx0XHR0aGlzLl9yZXN1bHRzPVtdXHJcblx0fVxyXG5cclxuXHQvL2xvb3AgcnVuIGFmdGVyIGVhY2ggY2hpbGQgYXNzZW1ibGVkXHJcblx0YXNzZW1ibGUoZG9jeCxub2RlKXtcclxuXHRcdHRoaXMuX3Jlc3VsdHMucHVzaChub2RlKVxyXG5cdFx0bm9kZS5yZXBsYWNlV2l0aCh0aGlzLl90ZW1wbGF0ZS5jbG9uZSgpKVxyXG5cdH1cclxuXHJcblx0YXNzZW1ibGVkKGRvY3gsbm9kZSl7XHJcblx0XHR0aGlzLl9yZXN1bHRzLmZvckVhY2goYT0+bm9kZS5iZWZvcmUoYSkpXHJcblx0XHRub2RlLnJlbW92ZSgpXHJcblx0XHRcclxuXHRcdGRlbGV0ZSB0aGlzLl9yZXN1bHRzXHJcblx0XHRkZWxldGUgdGhpcy5fdGVtcGxhdGVcclxuXHR9XHJcbn1cclxuIl19