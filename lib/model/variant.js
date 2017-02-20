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

		if (node.attribs.id === undefined) {
			Object.defineProperty(node.attribs, "id", {
				value: "a" + uuid++,
				writable: false,
				enumerable: false //not output in xml
			});
		}

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC92YXJpYW50LmpzIl0sIm5hbWVzIjpbInV1aWQiLCJWYXJpYW50Iiwibm9kZSIsImNvZGUiLCJjaGlsZHJlbiIsImF0dHJpYnMiLCJpZCIsInVuZGVmaW5lZCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ3cml0YWJsZSIsImVudW1lcmFibGUiLCJmb3JFYWNoIiwiYSIsInBhcmVudCIsImRvY3giLCJmaW5kIiwibmFtZSIsInRyaW0iLCJfYXNzZW1ibGluZ05vZGUiLCJhc3NlbWJsaW5nTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUlBLE9BQUssQ0FBVDs7SUFDcUJDLE87QUFDcEIsa0JBQVlDLElBQVosRUFBaUJDLElBQWpCLEVBQXNCQyxRQUF0QixFQUErQjtBQUFBOztBQUFBOztBQUM5QixNQUFHRixLQUFLRyxPQUFMLENBQWFDLEVBQWIsS0FBa0JDLFNBQXJCLEVBQStCO0FBQzlCQyxVQUFPQyxjQUFQLENBQXNCUCxLQUFLRyxPQUEzQixFQUFtQyxJQUFuQyxFQUF3QztBQUN2Q0ssaUJBQVVWLE1BRDZCO0FBRXZDVyxjQUFTLEtBRjhCO0FBR3ZDQyxnQkFBVyxLQUg0QixDQUd2QjtBQUh1QixJQUF4QztBQUtBOztBQUVELE9BQUtWLElBQUwsR0FBVUEsSUFBVjtBQUNBLE9BQUtDLElBQUwsR0FBVUEsSUFBVjtBQUNBLE9BQUtDLFFBQUwsR0FBY0EsWUFBVSxFQUF4QjtBQUNBLE9BQUtBLFFBQUwsQ0FBY1MsT0FBZCxDQUFzQjtBQUFBLFVBQUdDLEVBQUVDLE1BQUYsUUFBSDtBQUFBLEdBQXRCO0FBQ0E7Ozs7MkJBa0JRQyxJLEVBQUtkLEksRUFBSztBQUNsQixVQUFPQSxLQUFLRyxPQUFMLENBQWFDLEVBQXBCO0FBQ0E7OztzQkFsQk87QUFDUCxVQUFPLEtBQUtKLElBQUwsQ0FBVUcsT0FBVixDQUFrQkMsRUFBekI7QUFDQTs7O3NCQUVZO0FBQ1osVUFBTyxLQUFLSixJQUFMLENBQVVFLFFBQVYsQ0FBbUJhLElBQW5CLENBQXdCO0FBQUEsV0FBR0gsRUFBRUksSUFBRixJQUFRLFNBQVg7QUFBQSxJQUF4QixFQUNMZCxRQURLLENBQ0lhLElBREosQ0FDUztBQUFBLFdBQUdILEVBQUVJLElBQUYsSUFBUSxPQUFYO0FBQUEsSUFEVCxFQUM2QmIsT0FEN0IsQ0FDcUMsT0FEckMsRUFDOENjLElBRDlDLEVBQVA7QUFFQTs7O3NCQUVtQjtBQUNuQixPQUFHLENBQUMsS0FBS0osTUFBVCxFQUNDLE9BQU8sS0FBS0ssZUFBWixDQURELEtBR0MsT0FBTyxLQUFLTCxNQUFMLENBQVlNLGNBQVosQ0FBMkJKLElBQTNCLE9BQW9DLEtBQUtYLEVBQXpDLENBQVA7QUFDRDs7Ozs7O2tCQTlCbUJMLE8iLCJmaWxlIjoidmFyaWFudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCB1dWlkPTBcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFyaWFudHtcclxuXHRjb25zdHJ1Y3Rvcihub2RlLGNvZGUsY2hpbGRyZW4pe1xyXG5cdFx0aWYobm9kZS5hdHRyaWJzLmlkPT09dW5kZWZpbmVkKXtcclxuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5vZGUuYXR0cmlicyxcImlkXCIse1xyXG5cdFx0XHRcdHZhbHVlOmBhJHt1dWlkKyt9YCxcclxuXHRcdFx0XHR3cml0YWJsZTpmYWxzZSxcclxuXHRcdFx0XHRlbnVtZXJhYmxlOmZhbHNlLy9ub3Qgb3V0cHV0IGluIHhtbFxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHR0aGlzLm5vZGU9bm9kZVxyXG5cdFx0dGhpcy5jb2RlPWNvZGVcclxuXHRcdHRoaXMuY2hpbGRyZW49Y2hpbGRyZW58fFtdXHJcblx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goYT0+YS5wYXJlbnQ9dGhpcylcclxuXHR9XHJcblxyXG5cdGdldCBpZCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMubm9kZS5hdHRyaWJzLmlkXHJcblx0fVxyXG5cclxuXHRnZXQgcmF3Q29kZSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMubm9kZS5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnNkdFByXCIpXHJcblx0XHRcdC5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnRhZ1wiKS5hdHRyaWJzW1widzp2YWxcIl0udHJpbSgpXHJcblx0fVxyXG5cclxuXHRnZXQgYXNzZW1ibGluZ05vZGUoKXtcclxuXHRcdGlmKCF0aGlzLnBhcmVudClcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2Fzc2VtYmxpbmdOb2RlXHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiB0aGlzLnBhcmVudC5hc3NlbWJsaW5nTm9kZS5maW5kKGAjJHt0aGlzLmlkfWApXHJcblx0fVxyXG5cclxuXHRhc3NlbWJsZShkb2N4LG5vZGUpe1xyXG5cdFx0ZGVsZXRlIG5vZGUuYXR0cmlicy5pZFxyXG5cdH1cclxufVxyXG4iXX0=