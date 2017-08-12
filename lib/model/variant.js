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

		node.attribs[this.constructor.ID] = "a" + uuid++;

		this.node = node;
		this.code = code;
		this.children = children || [];
		this.children.forEach(function (a) {
			return a.parent = _this;
		});
	}

	_createClass(Variant, [{
		key: "assemble",
		value: function assemble(docx, node) {}
	}, {
		key: "id",
		get: function get() {
			return this.node.attribs[this.constructor.ID];
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
			if (!this.parent) return this._assemblingNode;else return this.parent.assemblingNode.find(this.selector);
		}
	}, {
		key: "selector",
		get: function get() {
			return "[" + this.constructor.ID + "=" + this.id + "]";
		}
	}]);

	return Variant;
}();

Variant.ID = "dtid";
exports.default = Variant;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC92YXJpYW50LmpzIl0sIm5hbWVzIjpbInV1aWQiLCJWYXJpYW50Iiwibm9kZSIsImNvZGUiLCJjaGlsZHJlbiIsImF0dHJpYnMiLCJjb25zdHJ1Y3RvciIsIklEIiwiZm9yRWFjaCIsImEiLCJwYXJlbnQiLCJkb2N4IiwiZmluZCIsIm5hbWUiLCJ0cmltIiwiX2Fzc2VtYmxpbmdOb2RlIiwiYXNzZW1ibGluZ05vZGUiLCJzZWxlY3RvciIsImlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSUEsT0FBSyxDQUFUOztJQUNxQkMsTztBQUVwQixrQkFBWUMsSUFBWixFQUFpQkMsSUFBakIsRUFBc0JDLFFBQXRCLEVBQStCO0FBQUE7O0FBQUE7O0FBQzlCRixPQUFLRyxPQUFMLENBQWEsS0FBS0MsV0FBTCxDQUFpQkMsRUFBOUIsVUFBc0NQLE1BQXRDOztBQUVBLE9BQUtFLElBQUwsR0FBVUEsSUFBVjtBQUNBLE9BQUtDLElBQUwsR0FBVUEsSUFBVjtBQUNBLE9BQUtDLFFBQUwsR0FBY0EsWUFBVSxFQUF4QjtBQUNBLE9BQUtBLFFBQUwsQ0FBY0ksT0FBZCxDQUFzQjtBQUFBLFVBQUdDLEVBQUVDLE1BQUYsUUFBSDtBQUFBLEdBQXRCO0FBQ0E7Ozs7MkJBa0JRQyxJLEVBQUtULEksRUFBSyxDQUVsQjs7O3NCQWxCTztBQUNQLFVBQU8sS0FBS0EsSUFBTCxDQUFVRyxPQUFWLENBQWtCLEtBQUtDLFdBQUwsQ0FBaUJDLEVBQW5DLENBQVA7QUFDQTs7O3NCQUVZO0FBQ1osVUFBTyxLQUFLTCxJQUFMLENBQVVFLFFBQVYsQ0FBbUJRLElBQW5CLENBQXdCO0FBQUEsV0FBR0gsRUFBRUksSUFBRixJQUFRLFNBQVg7QUFBQSxJQUF4QixFQUNMVCxRQURLLENBQ0lRLElBREosQ0FDUztBQUFBLFdBQUdILEVBQUVJLElBQUYsSUFBUSxPQUFYO0FBQUEsSUFEVCxFQUM2QlIsT0FEN0IsQ0FDcUMsT0FEckMsRUFDOENTLElBRDlDLEVBQVA7QUFFQTs7O3NCQUVtQjtBQUNuQixPQUFHLENBQUMsS0FBS0osTUFBVCxFQUNDLE9BQU8sS0FBS0ssZUFBWixDQURELEtBR0MsT0FBTyxLQUFLTCxNQUFMLENBQVlNLGNBQVosQ0FBMkJKLElBQTNCLENBQWdDLEtBQUtLLFFBQXJDLENBQVA7QUFDRDs7O3NCQU1hO0FBQ2IsZ0JBQVcsS0FBS1gsV0FBTCxDQUFpQkMsRUFBNUIsU0FBa0MsS0FBS1csRUFBdkM7QUFDQTs7Ozs7O0FBakNtQmpCLE8sQ0FDYk0sRSxHQUFHLE07a0JBRFVOLE8iLCJmaWxlIjoidmFyaWFudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCB1dWlkPTBcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFyaWFudHtcclxuXHRzdGF0aWMgSUQ9XCJkdGlkXCJcclxuXHRjb25zdHJ1Y3Rvcihub2RlLGNvZGUsY2hpbGRyZW4pe1xyXG5cdFx0bm9kZS5hdHRyaWJzW3RoaXMuY29uc3RydWN0b3IuSURdPWBhJHt1dWlkKyt9YFxyXG5cdFx0IFxyXG5cdFx0dGhpcy5ub2RlPW5vZGVcclxuXHRcdHRoaXMuY29kZT1jb2RlXHJcblx0XHR0aGlzLmNoaWxkcmVuPWNoaWxkcmVufHxbXVxyXG5cdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKGE9PmEucGFyZW50PXRoaXMpXHJcblx0fVxyXG5cclxuXHRnZXQgaWQoKXtcclxuXHRcdHJldHVybiB0aGlzLm5vZGUuYXR0cmlic1t0aGlzLmNvbnN0cnVjdG9yLklEXVxyXG5cdH1cclxuXHJcblx0Z2V0IHJhd0NvZGUoKXtcclxuXHRcdHJldHVybiB0aGlzLm5vZGUuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzpzZHRQclwiKVxyXG5cdFx0XHQuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzp0YWdcIikuYXR0cmlic1tcInc6dmFsXCJdLnRyaW0oKVxyXG5cdH1cclxuXHJcblx0Z2V0IGFzc2VtYmxpbmdOb2RlKCl7XHJcblx0XHRpZighdGhpcy5wYXJlbnQpXHJcblx0XHRcdHJldHVybiB0aGlzLl9hc3NlbWJsaW5nTm9kZVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gdGhpcy5wYXJlbnQuYXNzZW1ibGluZ05vZGUuZmluZCh0aGlzLnNlbGVjdG9yKVxyXG5cdH1cclxuXHJcblx0YXNzZW1ibGUoZG9jeCxub2RlKXtcclxuXHRcdFxyXG5cdH1cclxuXHRcclxuXHRnZXQgc2VsZWN0b3IoKXtcclxuXHRcdHJldHVybiBgWyR7dGhpcy5jb25zdHJ1Y3Rvci5JRH09JHt0aGlzLmlkfV1gXHJcblx0fVxyXG59XHJcbiJdfQ==