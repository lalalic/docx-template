"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uuid = 0;

var Variant = function () {
	function Variant(node, code, children) {
		var _this = this;

		_classCallCheck(this, Variant);

		if (node.attribs.id === undefined) node.attribs.id = "a" + uuid++;

		this.node = node;
		this.code = code;
		this.children = children || [];
		this.children.forEach(function (a) {
			return a.parent = _this;
		});
	}

	_createClass(Variant, [{
		key: "assemble",
		value: function assemble(docx, node) {
			delete node.attribs.id;
		}
	}, {
		key: "id",
		get: function get() {
			return this.node.attribs.id;
		}
	}, {
		key: "rawCode",
		get: function get() {
			return this.node.children.find(function (a) {
				return a.name == "w:sdtPr";
			}).children.find(function (a) {
				return a.name == "w:tag";
			}).attribs["w:val"].trim();
		}
	}, {
		key: "assemblingNode",
		get: function get() {
			if (!this.parent) return this._assemblingNode;else return this.parent.assemblingNode.find("#" + this.id);
		}
	}]);

	return Variant;
}();

exports.default = Variant;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC92YXJpYW50LmpzIl0sIm5hbWVzIjpbInV1aWQiLCJWYXJpYW50Iiwibm9kZSIsImNvZGUiLCJjaGlsZHJlbiIsImF0dHJpYnMiLCJpZCIsInVuZGVmaW5lZCIsImZvckVhY2giLCJhIiwicGFyZW50IiwiZG9jeCIsImZpbmQiLCJuYW1lIiwidHJpbSIsIl9hc3NlbWJsaW5nTm9kZSIsImFzc2VtYmxpbmdOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSUEsT0FBSyxDQUFUOztJQUNxQkMsTztBQUNwQixrQkFBWUMsSUFBWixFQUFpQkMsSUFBakIsRUFBc0JDLFFBQXRCLEVBQStCO0FBQUE7O0FBQUE7O0FBQzlCLE1BQUdGLEtBQUtHLE9BQUwsQ0FBYUMsRUFBYixLQUFrQkMsU0FBckIsRUFDQ0wsS0FBS0csT0FBTCxDQUFhQyxFQUFiLFNBQW9CTixNQUFwQjs7QUFFRCxPQUFLRSxJQUFMLEdBQVVBLElBQVY7QUFDQSxPQUFLQyxJQUFMLEdBQVVBLElBQVY7QUFDQSxPQUFLQyxRQUFMLEdBQWNBLFlBQVUsRUFBeEI7QUFDQSxPQUFLQSxRQUFMLENBQWNJLE9BQWQsQ0FBc0I7QUFBQSxVQUFHQyxFQUFFQyxNQUFGLFFBQUg7QUFBQSxHQUF0QjtBQUNBOzs7OzJCQWtCUUMsSSxFQUFLVCxJLEVBQUs7QUFDbEIsVUFBT0EsS0FBS0csT0FBTCxDQUFhQyxFQUFwQjtBQUNBOzs7c0JBbEJPO0FBQ1AsVUFBTyxLQUFLSixJQUFMLENBQVVHLE9BQVYsQ0FBa0JDLEVBQXpCO0FBQ0E7OztzQkFFWTtBQUNaLFVBQU8sS0FBS0osSUFBTCxDQUFVRSxRQUFWLENBQW1CUSxJQUFuQixDQUF3QjtBQUFBLFdBQUdILEVBQUVJLElBQUYsSUFBUSxTQUFYO0FBQUEsSUFBeEIsRUFDTFQsUUFESyxDQUNJUSxJQURKLENBQ1M7QUFBQSxXQUFHSCxFQUFFSSxJQUFGLElBQVEsT0FBWDtBQUFBLElBRFQsRUFDNkJSLE9BRDdCLENBQ3FDLE9BRHJDLEVBQzhDUyxJQUQ5QyxFQUFQO0FBRUE7OztzQkFFbUI7QUFDbkIsT0FBRyxDQUFDLEtBQUtKLE1BQVQsRUFDQyxPQUFPLEtBQUtLLGVBQVosQ0FERCxLQUdDLE9BQU8sS0FBS0wsTUFBTCxDQUFZTSxjQUFaLENBQTJCSixJQUEzQixPQUFvQyxLQUFLTixFQUF6QyxDQUFQO0FBQ0Q7Ozs7OztrQkF6Qm1CTCxPIiwiZmlsZSI6InZhcmlhbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgdXVpZD0wXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhcmlhbnR7XHJcblx0Y29uc3RydWN0b3Iobm9kZSxjb2RlLGNoaWxkcmVuKXtcclxuXHRcdGlmKG5vZGUuYXR0cmlicy5pZD09PXVuZGVmaW5lZClcclxuXHRcdFx0bm9kZS5hdHRyaWJzLmlkPWBhJHt1dWlkKyt9YFxyXG5cdFx0XHJcblx0XHR0aGlzLm5vZGU9bm9kZVxyXG5cdFx0dGhpcy5jb2RlPWNvZGVcclxuXHRcdHRoaXMuY2hpbGRyZW49Y2hpbGRyZW58fFtdXHJcblx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goYT0+YS5wYXJlbnQ9dGhpcylcclxuXHR9XHJcblxyXG5cdGdldCBpZCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMubm9kZS5hdHRyaWJzLmlkXHJcblx0fVxyXG5cclxuXHRnZXQgcmF3Q29kZSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMubm9kZS5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnNkdFByXCIpXHJcblx0XHRcdC5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnRhZ1wiKS5hdHRyaWJzW1widzp2YWxcIl0udHJpbSgpXHJcblx0fVxyXG5cclxuXHRnZXQgYXNzZW1ibGluZ05vZGUoKXtcclxuXHRcdGlmKCF0aGlzLnBhcmVudClcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2Fzc2VtYmxpbmdOb2RlXHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiB0aGlzLnBhcmVudC5hc3NlbWJsaW5nTm9kZS5maW5kKGAjJHt0aGlzLmlkfWApXHJcblx0fVxyXG5cclxuXHRhc3NlbWJsZShkb2N4LG5vZGUpe1xyXG5cdFx0ZGVsZXRlIG5vZGUuYXR0cmlicy5pZFxyXG5cdH1cclxufVxyXG4iXX0=