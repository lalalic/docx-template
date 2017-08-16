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
	}, {
		key: "object",
		get: function get() {
			return "__variants." + this.id;
		}
	}]);

	return Variant;
}();

Variant.ID = "dtid";
exports.default = Variant;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC92YXJpYW50LmpzIl0sIm5hbWVzIjpbInV1aWQiLCJWYXJpYW50Iiwibm9kZSIsImNvZGUiLCJjaGlsZHJlbiIsImF0dHJpYnMiLCJjb25zdHJ1Y3RvciIsIklEIiwiZm9yRWFjaCIsImEiLCJwYXJlbnQiLCJkb2N4IiwiZmluZCIsIm5hbWUiLCJ0cmltIiwiX2Fzc2VtYmxpbmdOb2RlIiwiYXNzZW1ibGluZ05vZGUiLCJzZWxlY3RvciIsImlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSUEsT0FBSyxDQUFUOztJQUNxQkMsTztBQUVwQixrQkFBWUMsSUFBWixFQUFpQkMsSUFBakIsRUFBc0JDLFFBQXRCLEVBQStCO0FBQUE7O0FBQUE7O0FBQzlCRixPQUFLRyxPQUFMLENBQWEsS0FBS0MsV0FBTCxDQUFpQkMsRUFBOUIsVUFBc0NQLE1BQXRDOztBQUVBLE9BQUtFLElBQUwsR0FBVUEsSUFBVjtBQUNBLE9BQUtDLElBQUwsR0FBVUEsSUFBVjtBQUNBLE9BQUtDLFFBQUwsR0FBY0EsWUFBVSxFQUF4QjtBQUNBLE9BQUtBLFFBQUwsQ0FBY0ksT0FBZCxDQUFzQjtBQUFBLFVBQUdDLEVBQUVDLE1BQUYsUUFBSDtBQUFBLEdBQXRCO0FBQ0E7Ozs7MkJBa0JRQyxJLEVBQUtULEksRUFBSyxDQUVsQjs7O3NCQWxCTztBQUNQLFVBQU8sS0FBS0EsSUFBTCxDQUFVRyxPQUFWLENBQWtCLEtBQUtDLFdBQUwsQ0FBaUJDLEVBQW5DLENBQVA7QUFDQTs7O3NCQUVZO0FBQ1osVUFBTyxLQUFLTCxJQUFMLENBQVVFLFFBQVYsQ0FBbUJRLElBQW5CLENBQXdCO0FBQUEsV0FBR0gsRUFBRUksSUFBRixJQUFRLFNBQVg7QUFBQSxJQUF4QixFQUNMVCxRQURLLENBQ0lRLElBREosQ0FDUztBQUFBLFdBQUdILEVBQUVJLElBQUYsSUFBUSxPQUFYO0FBQUEsSUFEVCxFQUM2QlIsT0FEN0IsQ0FDcUMsT0FEckMsRUFDOENTLElBRDlDLEVBQVA7QUFFQTs7O3NCQUVtQjtBQUNuQixPQUFHLENBQUMsS0FBS0osTUFBVCxFQUNDLE9BQU8sS0FBS0ssZUFBWixDQURELEtBR0MsT0FBTyxLQUFLTCxNQUFMLENBQVlNLGNBQVosQ0FBMkJKLElBQTNCLENBQWdDLEtBQUtLLFFBQXJDLENBQVA7QUFDRDs7O3NCQU1hO0FBQ2IsZ0JBQVcsS0FBS1gsV0FBTCxDQUFpQkMsRUFBNUIsU0FBa0MsS0FBS1csRUFBdkM7QUFDQTs7O3NCQUVXO0FBQ1gsMEJBQXFCLEtBQUtBLEVBQTFCO0FBQ0E7Ozs7OztBQXJDbUJqQixPLENBQ2JNLEUsR0FBRyxNO2tCQURVTixPIiwiZmlsZSI6InZhcmlhbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgdXVpZD0wXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhcmlhbnR7XHJcblx0c3RhdGljIElEPVwiZHRpZFwiXHJcblx0Y29uc3RydWN0b3Iobm9kZSxjb2RlLGNoaWxkcmVuKXtcclxuXHRcdG5vZGUuYXR0cmlic1t0aGlzLmNvbnN0cnVjdG9yLklEXT1gYSR7dXVpZCsrfWBcclxuXHRcdCBcclxuXHRcdHRoaXMubm9kZT1ub2RlXHJcblx0XHR0aGlzLmNvZGU9Y29kZVxyXG5cdFx0dGhpcy5jaGlsZHJlbj1jaGlsZHJlbnx8W11cclxuXHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaChhPT5hLnBhcmVudD10aGlzKVxyXG5cdH1cclxuXHJcblx0Z2V0IGlkKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5ub2RlLmF0dHJpYnNbdGhpcy5jb25zdHJ1Y3Rvci5JRF1cclxuXHR9XHJcblxyXG5cdGdldCByYXdDb2RlKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5ub2RlLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6c2R0UHJcIilcclxuXHRcdFx0LmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6dGFnXCIpLmF0dHJpYnNbXCJ3OnZhbFwiXS50cmltKClcclxuXHR9XHJcblxyXG5cdGdldCBhc3NlbWJsaW5nTm9kZSgpe1xyXG5cdFx0aWYoIXRoaXMucGFyZW50KVxyXG5cdFx0XHRyZXR1cm4gdGhpcy5fYXNzZW1ibGluZ05vZGVcclxuXHRcdGVsc2VcclxuXHRcdFx0cmV0dXJuIHRoaXMucGFyZW50LmFzc2VtYmxpbmdOb2RlLmZpbmQodGhpcy5zZWxlY3RvcilcclxuXHR9XHJcblxyXG5cdGFzc2VtYmxlKGRvY3gsbm9kZSl7XHJcblx0XHRcclxuXHR9XHJcblx0XHJcblx0Z2V0IHNlbGVjdG9yKCl7XHJcblx0XHRyZXR1cm4gYFske3RoaXMuY29uc3RydWN0b3IuSUR9PSR7dGhpcy5pZH1dYFxyXG5cdH1cclxuXHRcclxuXHRnZXQgb2JqZWN0KCl7XHJcblx0XHRyZXR1cm4gYF9fdmFyaWFudHMuJHt0aGlzLmlkfWBcclxuXHR9XHJcbn1cclxuIl19