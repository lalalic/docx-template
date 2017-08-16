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

		node.attribs[this.constructor.ID] = "" + this.constructor.type.split(".").pop() + uuid++;
		this._beautify(node);

		this.node = node;
		this.code = code;
		this.children = children || [];
		this.children.forEach(function (a) {
			return a.parent = _this;
		});
	}

	_createClass(Variant, [{
		key: "_beautify",
		value: function _beautify(node) {
			var sdtPr = node.children.find(function (a) {
				return a.name == "w:sdtPr";
			});
			var tag = sdtPr.children.find(function (a) {
				return a.name == "w:tag";
			});
			tag.attribs["w:val"] = "//" + tag.attribs["w:val"];

			this.comment = "";
			var alias = sdtPr.children.find(function (a) {
				return a.name == "w:alias";
			});
			if (alias && alias.attribs["w:val"]) this.comment = alias.attribs["w:val"];
		}
	}, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC92YXJpYW50LmpzIl0sIm5hbWVzIjpbInV1aWQiLCJWYXJpYW50Iiwibm9kZSIsImNvZGUiLCJjaGlsZHJlbiIsImF0dHJpYnMiLCJjb25zdHJ1Y3RvciIsIklEIiwidHlwZSIsInNwbGl0IiwicG9wIiwiX2JlYXV0aWZ5IiwiZm9yRWFjaCIsImEiLCJwYXJlbnQiLCJzZHRQciIsImZpbmQiLCJuYW1lIiwidGFnIiwiY29tbWVudCIsImFsaWFzIiwiZG9jeCIsInRyaW0iLCJfYXNzZW1ibGluZ05vZGUiLCJhc3NlbWJsaW5nTm9kZSIsInNlbGVjdG9yIiwiaWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxPQUFLLENBQVQ7O0lBQ3FCQyxPO0FBRXBCLGtCQUFZQyxJQUFaLEVBQWlCQyxJQUFqQixFQUFzQkMsUUFBdEIsRUFBK0I7QUFBQTs7QUFBQTs7QUFDOUJGLE9BQUtHLE9BQUwsQ0FBYSxLQUFLQyxXQUFMLENBQWlCQyxFQUE5QixTQUFxQyxLQUFLRCxXQUFMLENBQWlCRSxJQUFqQixDQUFzQkMsS0FBdEIsQ0FBNEIsR0FBNUIsRUFBaUNDLEdBQWpDLEVBQXJDLEdBQThFVixNQUE5RTtBQUNBLE9BQUtXLFNBQUwsQ0FBZVQsSUFBZjs7QUFFQSxPQUFLQSxJQUFMLEdBQVVBLElBQVY7QUFDQSxPQUFLQyxJQUFMLEdBQVVBLElBQVY7QUFDQSxPQUFLQyxRQUFMLEdBQWNBLFlBQVUsRUFBeEI7QUFDQSxPQUFLQSxRQUFMLENBQWNRLE9BQWQsQ0FBc0I7QUFBQSxVQUFHQyxFQUFFQyxNQUFGLFFBQUg7QUFBQSxHQUF0QjtBQUNBOzs7OzRCQUVTWixJLEVBQUs7QUFDZCxPQUFJYSxRQUFNYixLQUFLRSxRQUFMLENBQWNZLElBQWQsQ0FBbUI7QUFBQSxXQUFHSCxFQUFFSSxJQUFGLElBQVEsU0FBWDtBQUFBLElBQW5CLENBQVY7QUFDQSxPQUFJQyxNQUFJSCxNQUFNWCxRQUFOLENBQWVZLElBQWYsQ0FBb0I7QUFBQSxXQUFHSCxFQUFFSSxJQUFGLElBQVEsT0FBWDtBQUFBLElBQXBCLENBQVI7QUFDQUMsT0FBSWIsT0FBSixDQUFZLE9BQVosV0FBMEJhLElBQUliLE9BQUosQ0FBWSxPQUFaLENBQTFCOztBQUVBLFFBQUtjLE9BQUwsR0FBYSxFQUFiO0FBQ0EsT0FBSUMsUUFBTUwsTUFBTVgsUUFBTixDQUFlWSxJQUFmLENBQW9CO0FBQUEsV0FBR0gsRUFBRUksSUFBRixJQUFRLFNBQVg7QUFBQSxJQUFwQixDQUFWO0FBQ0EsT0FBR0csU0FBU0EsTUFBTWYsT0FBTixDQUFjLE9BQWQsQ0FBWixFQUNDLEtBQUtjLE9BQUwsR0FBYUMsTUFBTWYsT0FBTixDQUFjLE9BQWQsQ0FBYjtBQUNEOzs7MkJBa0JRZ0IsSSxFQUFLbkIsSSxFQUFLLENBRWxCOzs7c0JBbEJPO0FBQ1AsVUFBTyxLQUFLQSxJQUFMLENBQVVHLE9BQVYsQ0FBa0IsS0FBS0MsV0FBTCxDQUFpQkMsRUFBbkMsQ0FBUDtBQUNBOzs7c0JBRVk7QUFDWixVQUFPLEtBQUtMLElBQUwsQ0FBVUUsUUFBVixDQUFtQlksSUFBbkIsQ0FBd0I7QUFBQSxXQUFHSCxFQUFFSSxJQUFGLElBQVEsU0FBWDtBQUFBLElBQXhCLEVBQ0xiLFFBREssQ0FDSVksSUFESixDQUNTO0FBQUEsV0FBR0gsRUFBRUksSUFBRixJQUFRLE9BQVg7QUFBQSxJQURULEVBQzZCWixPQUQ3QixDQUNxQyxPQURyQyxFQUM4Q2lCLElBRDlDLEVBQVA7QUFFQTs7O3NCQUVtQjtBQUNuQixPQUFHLENBQUMsS0FBS1IsTUFBVCxFQUNDLE9BQU8sS0FBS1MsZUFBWixDQURELEtBR0MsT0FBTyxLQUFLVCxNQUFMLENBQVlVLGNBQVosQ0FBMkJSLElBQTNCLENBQWdDLEtBQUtTLFFBQXJDLENBQVA7QUFDRDs7O3NCQU1hO0FBQ2IsZ0JBQVcsS0FBS25CLFdBQUwsQ0FBaUJDLEVBQTVCLFNBQWtDLEtBQUttQixFQUF2QztBQUNBOzs7c0JBRVc7QUFDWCwwQkFBcUIsS0FBS0EsRUFBMUI7QUFDQTs7Ozs7O0FBakRtQnpCLE8sQ0FDYk0sRSxHQUFHLE07a0JBRFVOLE8iLCJmaWxlIjoidmFyaWFudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCB1dWlkPTBcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFyaWFudHtcclxuXHRzdGF0aWMgSUQ9XCJkdGlkXCJcclxuXHRjb25zdHJ1Y3Rvcihub2RlLGNvZGUsY2hpbGRyZW4pe1xyXG5cdFx0bm9kZS5hdHRyaWJzW3RoaXMuY29uc3RydWN0b3IuSURdPWAke3RoaXMuY29uc3RydWN0b3IudHlwZS5zcGxpdChcIi5cIikucG9wKCl9JHt1dWlkKyt9YFxyXG5cdFx0dGhpcy5fYmVhdXRpZnkobm9kZSlcclxuXHRcdFxyXG5cdFx0dGhpcy5ub2RlPW5vZGVcclxuXHRcdHRoaXMuY29kZT1jb2RlXHJcblx0XHR0aGlzLmNoaWxkcmVuPWNoaWxkcmVufHxbXVxyXG5cdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKGE9PmEucGFyZW50PXRoaXMpXHJcblx0fVxyXG5cdFxyXG5cdF9iZWF1dGlmeShub2RlKXtcclxuXHRcdGxldCBzZHRQcj1ub2RlLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6c2R0UHJcIilcclxuXHRcdGxldCB0YWc9c2R0UHIuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzp0YWdcIilcclxuXHRcdHRhZy5hdHRyaWJzW1widzp2YWxcIl09YC8vJHt0YWcuYXR0cmlic1tcInc6dmFsXCJdfWBcclxuXHRcdFxyXG5cdFx0dGhpcy5jb21tZW50PVwiXCJcclxuXHRcdGxldCBhbGlhcz1zZHRQci5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OmFsaWFzXCIpXHJcblx0XHRpZihhbGlhcyAmJiBhbGlhcy5hdHRyaWJzW1widzp2YWxcIl0pXHJcblx0XHRcdHRoaXMuY29tbWVudD1hbGlhcy5hdHRyaWJzW1widzp2YWxcIl1cclxuXHR9XHJcblxyXG5cdGdldCBpZCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMubm9kZS5hdHRyaWJzW3RoaXMuY29uc3RydWN0b3IuSURdXHJcblx0fVxyXG5cclxuXHRnZXQgcmF3Q29kZSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMubm9kZS5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnNkdFByXCIpXHJcblx0XHRcdC5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnRhZ1wiKS5hdHRyaWJzW1widzp2YWxcIl0udHJpbSgpXHJcblx0fVxyXG5cclxuXHRnZXQgYXNzZW1ibGluZ05vZGUoKXtcclxuXHRcdGlmKCF0aGlzLnBhcmVudClcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2Fzc2VtYmxpbmdOb2RlXHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiB0aGlzLnBhcmVudC5hc3NlbWJsaW5nTm9kZS5maW5kKHRoaXMuc2VsZWN0b3IpXHJcblx0fVxyXG5cclxuXHRhc3NlbWJsZShkb2N4LG5vZGUpe1xyXG5cdFx0XHJcblx0fVxyXG5cdFxyXG5cdGdldCBzZWxlY3Rvcigpe1xyXG5cdFx0cmV0dXJuIGBbJHt0aGlzLmNvbnN0cnVjdG9yLklEfT0ke3RoaXMuaWR9XWBcclxuXHR9XHJcblx0XHJcblx0Z2V0IG9iamVjdCgpe1xyXG5cdFx0cmV0dXJuIGBfX3ZhcmlhbnRzLiR7dGhpcy5pZH1gXHJcblx0fVxyXG59XHJcbiJdfQ==