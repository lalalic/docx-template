"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xmlEscape = require("xml-escape");

var _xmlEscape2 = _interopRequireDefault(_xmlEscape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
		key: "xmlescape",
		value: function xmlescape(v) {
			return (0, _xmlEscape2.default)(v.toString());
		}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC92YXJpYW50LmpzIl0sIm5hbWVzIjpbInV1aWQiLCJWYXJpYW50Iiwibm9kZSIsImNvZGUiLCJjaGlsZHJlbiIsImF0dHJpYnMiLCJjb25zdHJ1Y3RvciIsIklEIiwidHlwZSIsInNwbGl0IiwicG9wIiwiX2JlYXV0aWZ5IiwiZm9yRWFjaCIsImEiLCJwYXJlbnQiLCJzZHRQciIsImZpbmQiLCJuYW1lIiwidGFnIiwiY29tbWVudCIsImFsaWFzIiwiZG9jeCIsInYiLCJ0b1N0cmluZyIsInRyaW0iLCJfYXNzZW1ibGluZ05vZGUiLCJhc3NlbWJsaW5nTm9kZSIsInNlbGVjdG9yIiwiaWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBQ0EsSUFBSUEsT0FBSyxDQUFUOztJQUNxQkMsTztBQUVwQixrQkFBWUMsSUFBWixFQUFpQkMsSUFBakIsRUFBc0JDLFFBQXRCLEVBQStCO0FBQUE7O0FBQUE7O0FBQzlCRixPQUFLRyxPQUFMLENBQWEsS0FBS0MsV0FBTCxDQUFpQkMsRUFBOUIsU0FBcUMsS0FBS0QsV0FBTCxDQUFpQkUsSUFBakIsQ0FBc0JDLEtBQXRCLENBQTRCLEdBQTVCLEVBQWlDQyxHQUFqQyxFQUFyQyxHQUE4RVYsTUFBOUU7QUFDQSxPQUFLVyxTQUFMLENBQWVULElBQWY7O0FBRUEsT0FBS0EsSUFBTCxHQUFVQSxJQUFWO0FBQ0EsT0FBS0MsSUFBTCxHQUFVQSxJQUFWO0FBQ0EsT0FBS0MsUUFBTCxHQUFjQSxZQUFVLEVBQXhCO0FBQ0EsT0FBS0EsUUFBTCxDQUFjUSxPQUFkLENBQXNCO0FBQUEsVUFBR0MsRUFBRUMsTUFBRixRQUFIO0FBQUEsR0FBdEI7QUFDQTs7Ozs0QkFFU1osSSxFQUFLO0FBQ2QsT0FBSWEsUUFBTWIsS0FBS0UsUUFBTCxDQUFjWSxJQUFkLENBQW1CO0FBQUEsV0FBR0gsRUFBRUksSUFBRixJQUFRLFNBQVg7QUFBQSxJQUFuQixDQUFWO0FBQ0EsT0FBSUMsTUFBSUgsTUFBTVgsUUFBTixDQUFlWSxJQUFmLENBQW9CO0FBQUEsV0FBR0gsRUFBRUksSUFBRixJQUFRLE9BQVg7QUFBQSxJQUFwQixDQUFSO0FBQ0FDLE9BQUliLE9BQUosQ0FBWSxPQUFaLFdBQTBCYSxJQUFJYixPQUFKLENBQVksT0FBWixDQUExQjs7QUFFQSxRQUFLYyxPQUFMLEdBQWEsRUFBYjtBQUNBLE9BQUlDLFFBQU1MLE1BQU1YLFFBQU4sQ0FBZVksSUFBZixDQUFvQjtBQUFBLFdBQUdILEVBQUVJLElBQUYsSUFBUSxTQUFYO0FBQUEsSUFBcEIsQ0FBVjtBQUNBLE9BQUdHLFNBQVNBLE1BQU1mLE9BQU4sQ0FBYyxPQUFkLENBQVosRUFDQyxLQUFLYyxPQUFMLEdBQWFDLE1BQU1mLE9BQU4sQ0FBYyxPQUFkLENBQWI7QUFDRDs7OzJCQWtCUWdCLEksRUFBS25CLEksRUFBSyxDQUVsQjs7OzRCQVVTb0IsQyxFQUFFO0FBQ1gsVUFBTyx5QkFBVUEsRUFBRUMsUUFBRixFQUFWLENBQVA7QUFDQTs7O3NCQTlCTztBQUNQLFVBQU8sS0FBS3JCLElBQUwsQ0FBVUcsT0FBVixDQUFrQixLQUFLQyxXQUFMLENBQWlCQyxFQUFuQyxDQUFQO0FBQ0E7OztzQkFFWTtBQUNaLFVBQU8sS0FBS0wsSUFBTCxDQUFVRSxRQUFWLENBQW1CWSxJQUFuQixDQUF3QjtBQUFBLFdBQUdILEVBQUVJLElBQUYsSUFBUSxTQUFYO0FBQUEsSUFBeEIsRUFDTGIsUUFESyxDQUNJWSxJQURKLENBQ1M7QUFBQSxXQUFHSCxFQUFFSSxJQUFGLElBQVEsT0FBWDtBQUFBLElBRFQsRUFDNkJaLE9BRDdCLENBQ3FDLE9BRHJDLEVBQzhDbUIsSUFEOUMsRUFBUDtBQUVBOzs7c0JBRW1CO0FBQ25CLE9BQUcsQ0FBQyxLQUFLVixNQUFULEVBQ0MsT0FBTyxLQUFLVyxlQUFaLENBREQsS0FHQyxPQUFPLEtBQUtYLE1BQUwsQ0FBWVksY0FBWixDQUEyQlYsSUFBM0IsQ0FBZ0MsS0FBS1csUUFBckMsQ0FBUDtBQUNEOzs7c0JBTWE7QUFDYixnQkFBVyxLQUFLckIsV0FBTCxDQUFpQkMsRUFBNUIsU0FBa0MsS0FBS3FCLEVBQXZDO0FBQ0E7OztzQkFFVztBQUNYLDBCQUFxQixLQUFLQSxFQUExQjtBQUNBOzs7Ozs7QUFqRG1CM0IsTyxDQUNiTSxFLEdBQUcsTTtrQkFEVU4sTyIsImZpbGUiOiJ2YXJpYW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHhtbGVzY2FwZSBmcm9tIFwieG1sLWVzY2FwZVwiXHJcbmxldCB1dWlkPTBcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFyaWFudHtcclxuXHRzdGF0aWMgSUQ9XCJkdGlkXCJcclxuXHRjb25zdHJ1Y3Rvcihub2RlLGNvZGUsY2hpbGRyZW4pe1xyXG5cdFx0bm9kZS5hdHRyaWJzW3RoaXMuY29uc3RydWN0b3IuSURdPWAke3RoaXMuY29uc3RydWN0b3IudHlwZS5zcGxpdChcIi5cIikucG9wKCl9JHt1dWlkKyt9YFxyXG5cdFx0dGhpcy5fYmVhdXRpZnkobm9kZSlcclxuXHRcdFxyXG5cdFx0dGhpcy5ub2RlPW5vZGVcclxuXHRcdHRoaXMuY29kZT1jb2RlXHJcblx0XHR0aGlzLmNoaWxkcmVuPWNoaWxkcmVufHxbXVxyXG5cdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKGE9PmEucGFyZW50PXRoaXMpXHJcblx0fVxyXG5cdFxyXG5cdF9iZWF1dGlmeShub2RlKXtcclxuXHRcdGxldCBzZHRQcj1ub2RlLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6c2R0UHJcIilcclxuXHRcdGxldCB0YWc9c2R0UHIuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzp0YWdcIilcclxuXHRcdHRhZy5hdHRyaWJzW1widzp2YWxcIl09YC8vJHt0YWcuYXR0cmlic1tcInc6dmFsXCJdfWBcclxuXHRcdFxyXG5cdFx0dGhpcy5jb21tZW50PVwiXCJcclxuXHRcdGxldCBhbGlhcz1zZHRQci5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OmFsaWFzXCIpXHJcblx0XHRpZihhbGlhcyAmJiBhbGlhcy5hdHRyaWJzW1widzp2YWxcIl0pXHJcblx0XHRcdHRoaXMuY29tbWVudD1hbGlhcy5hdHRyaWJzW1widzp2YWxcIl1cclxuXHR9XHJcblxyXG5cdGdldCBpZCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMubm9kZS5hdHRyaWJzW3RoaXMuY29uc3RydWN0b3IuSURdXHJcblx0fVxyXG5cclxuXHRnZXQgcmF3Q29kZSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMubm9kZS5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnNkdFByXCIpXHJcblx0XHRcdC5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnRhZ1wiKS5hdHRyaWJzW1widzp2YWxcIl0udHJpbSgpXHJcblx0fVxyXG5cclxuXHRnZXQgYXNzZW1ibGluZ05vZGUoKXtcclxuXHRcdGlmKCF0aGlzLnBhcmVudClcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2Fzc2VtYmxpbmdOb2RlXHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiB0aGlzLnBhcmVudC5hc3NlbWJsaW5nTm9kZS5maW5kKHRoaXMuc2VsZWN0b3IpXHJcblx0fVxyXG5cclxuXHRhc3NlbWJsZShkb2N4LG5vZGUpe1xyXG5cdFx0XHJcblx0fVxyXG5cdFxyXG5cdGdldCBzZWxlY3Rvcigpe1xyXG5cdFx0cmV0dXJuIGBbJHt0aGlzLmNvbnN0cnVjdG9yLklEfT0ke3RoaXMuaWR9XWBcclxuXHR9XHJcblx0XHJcblx0Z2V0IG9iamVjdCgpe1xyXG5cdFx0cmV0dXJuIGBfX3ZhcmlhbnRzLiR7dGhpcy5pZH1gXHJcblx0fVxyXG5cdFxyXG5cdHhtbGVzY2FwZSh2KXtcclxuXHRcdHJldHVybiB4bWxlc2NhcGUodi50b1N0cmluZygpKVxyXG5cdH1cclxufVxyXG4iXX0=