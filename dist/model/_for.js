"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _variant = require("./variant");

var _variant2 = _interopRequireDefault(_variant);

var _esprima = require("esprima");

var _esprima2 = _interopRequireDefault(_esprima);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _uuid = Date.now();

var For = function (_Variant) {
	_inherits(For, _Variant);

	_createClass(For, null, [{
		key: "type",
		get: function get() {
			return "variant.for";
		}
	}]);

	function For() {
		_classCallCheck(this, For);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(For).apply(this, arguments));

		_this.codeDefVars = [];

		var _this$parsedCode$body = _slicedToArray(_this.parsedCode.body, 1);

		var varDecl = _this$parsedCode$body[0];

		if (varDecl && varDecl.type == 'VariableDeclaration') {
			varDecl.declarations.forEach(function (def) {
				_this.codeDefVars.push(def.id.name);
			});
		}
		_this.stacks = [];
		return _this;
	}

	_createClass(For, [{
		key: "assemble",
		value: function assemble() {
			var iPara = {},
			    scope = this.variantParent.toJavascript(iPara);
			var setVariables = [];
			this.codeDefVars.forEach(function (a) {
				setVariables.push("stack." + a + "=" + a + ";");
			});

			var code = scope + " {\n\t\t\t\t\t\tlet stacks=[]\n\t\t\t\t\t\tfor(" + this.code + "){\n\t\t\t\t\t\t\tlet stack={}\n\t\t\t\t\t\t\t" + setVariables.join(" ") + "\n\t\t\t\t\t\t\tstacks.push(stack)\n\t\t\t\t\t\t}\n\t\t\t\t\t\treturn stacks\n\t\t\t\t\t}";
			this.stacks = new Function("data", code)(iPara);
		}
	}, {
		key: "_iterate",
		value: function _iterate(f, paramizedVisitFactories) {
			if (!this.wDoc.data) return _get(Object.getPrototypeOf(For.prototype), "_iterate", this).apply(this, arguments);

			var sdtContent = this.wXml.$1('sdtContent'),
			    rawChildren = sdtContent.childNodes.asArray(),
			    len = rawChildren.length;

			rawChildren.forEach(function (a) {
				sdtContent.removeChild(a);
			});

			this.stacks.forEach(function (a) {
				rawChildren.forEach(function (b) {
					sdtContent.appendChild(b.cloneNode(true));
				});
			});

			for (var i = 0, children = sdtContent.childNodes, l = children ? children.length : 0; i < l; i++) {
				if (i && i % len == 0) this.stacks.shift();

				!this._shouldIgnore(children[i]) && f(children[i]);
			}

			this.stacks = [];
		}
	}, {
		key: "toJavascript",
		value: function toJavascript(iPara) {
			var varName = "_aa" + _uuid++;
			iPara[varName] = this.stacks[0];
			return this.variantParent.toJavascript(iPara) + " with(arguments[0]." + varName + ")";
		}
	}]);

	return For;
}(_variant2.default);

exports.default = For;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbC9fZm9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQUksUUFBTSxLQUFLLEdBQUwsRUFBTjs7SUFFaUI7Ozs7O3NCQUNIO0FBQUMsVUFBTSxhQUFOLENBQUQ7Ozs7QUFFakIsVUFIb0IsR0FHcEIsR0FBYTt3QkFITyxLQUdQOztxRUFITyxpQkFJVixZQURHOztBQUVaLFFBQUssV0FBTCxHQUFpQixFQUFqQixDQUZZOzs2Q0FHRSxNQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsS0FIRjs7TUFHUCxtQ0FITzs7QUFJWixNQUFHLFdBQVMsUUFBUSxJQUFSLElBQWMscUJBQWQsRUFBb0M7QUFDL0MsV0FBUSxZQUFSLENBQXFCLE9BQXJCLENBQTZCLGVBQUs7QUFDakMsVUFBSyxXQUFMLENBQWlCLElBQWpCLENBQXNCLElBQUksRUFBSixDQUFPLElBQVAsQ0FBdEIsQ0FEaUM7SUFBTCxDQUE3QixDQUQrQztHQUFoRDtBQUtBLFFBQUssTUFBTCxHQUFZLEVBQVosQ0FUWTs7RUFBYjs7Y0FIb0I7OzZCQWVWO0FBQ1QsT0FBSSxRQUFNLEVBQU47T0FBVSxRQUFNLEtBQUssYUFBTCxDQUFtQixZQUFuQixDQUFnQyxLQUFoQyxDQUFOLENBREw7QUFFVCxPQUFJLGVBQWEsRUFBYixDQUZLO0FBR1QsUUFBSyxXQUFMLENBQWlCLE9BQWpCLENBQXlCLGFBQUc7QUFDM0IsaUJBQWEsSUFBYixZQUEyQixVQUFLLE9BQWhDLEVBRDJCO0lBQUgsQ0FBekIsQ0FIUzs7QUFPVCxPQUFJLE9BQVEsNERBRUYsS0FBSyxJQUFMLHNEQUVILGFBQWEsSUFBYixDQUFrQixHQUFsQiwrRkFKSCxDQVBLO0FBZ0JULFFBQUssTUFBTCxHQUFZLElBQUksUUFBSixDQUFhLE1BQWIsRUFBb0IsSUFBcEIsRUFBMEIsS0FBMUIsQ0FBWixDQWhCUzs7OzsyQkFtQkQsR0FBRSx5QkFBd0I7QUFDbEMsT0FBRyxDQUFDLEtBQUssSUFBTCxDQUFVLElBQVYsRUFDSCxrQ0FwQ2tCLDhDQW9DTyxVQUF6QixDQUREOztBQUdBLE9BQUksYUFBVyxLQUFLLElBQUwsQ0FBVSxFQUFWLENBQWEsWUFBYixDQUFYO09BQ0gsY0FBWSxXQUFXLFVBQVgsQ0FBc0IsT0FBdEIsRUFBWjtPQUNBLE1BQUksWUFBWSxNQUFaLENBTjZCOztBQVFsQyxlQUFZLE9BQVosQ0FBb0IsYUFBRztBQUN0QixlQUFXLFdBQVgsQ0FBdUIsQ0FBdkIsRUFEc0I7SUFBSCxDQUFwQixDQVJrQzs7QUFZbEMsUUFBSyxNQUFMLENBQVksT0FBWixDQUFvQixhQUFHO0FBQ3RCLGdCQUFZLE9BQVosQ0FBb0IsYUFBRztBQUN0QixnQkFBVyxXQUFYLENBQXVCLEVBQUUsU0FBRixDQUFZLElBQVosQ0FBdkIsRUFEc0I7S0FBSCxDQUFwQixDQURzQjtJQUFILENBQXBCLENBWmtDOztBQWtCbEMsUUFBSSxJQUFJLElBQUUsQ0FBRixFQUFJLFdBQVMsV0FBVyxVQUFYLEVBQXNCLElBQUUsV0FBUyxTQUFTLE1BQVQsR0FBZ0IsQ0FBekIsRUFBNEIsSUFBRSxDQUFGLEVBQUssR0FBOUUsRUFBa0Y7QUFDakYsUUFBRyxLQUFNLElBQUUsR0FBRixJQUFPLENBQVAsRUFDUixLQUFLLE1BQUwsQ0FBWSxLQUFaLEdBREQ7O0FBR0EsS0FBRSxLQUFLLGFBQUwsQ0FBbUIsU0FBUyxDQUFULENBQW5CLENBQUQsSUFBcUMsRUFBRSxTQUFTLENBQVQsQ0FBRixDQUF0QyxDQUppRjtJQUFsRjs7QUFPQSxRQUFLLE1BQUwsR0FBWSxFQUFaLENBekJrQzs7OzsrQkE0QnRCLE9BQU07QUFDbEIsT0FBSSxrQkFBYyxPQUFkLENBRGM7QUFFbEIsU0FBTSxPQUFOLElBQWUsS0FBSyxNQUFMLENBQVksQ0FBWixDQUFmLENBRmtCO0FBR2xCLFVBQVUsS0FBSyxhQUFMLENBQW1CLFlBQW5CLENBQWdDLEtBQWhDLDRCQUE0RCxhQUF0RSxDQUhrQjs7OztRQTlEQyIsImZpbGUiOiJfZm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZhcmlhbnQgZnJvbSBcIi4vdmFyaWFudFwiXHJcbmltcG9ydCBlc3ByaW1hIGZyb20gXCJlc3ByaW1hXCJcclxuXHJcbnZhciBfdXVpZD1EYXRlLm5vdygpXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3IgZXh0ZW5kcyBWYXJpYW50e1xyXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVyblwidmFyaWFudC5mb3JcIn1cclxuXHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMuY29kZURlZlZhcnM9W11cclxuXHRcdHZhciBbdmFyRGVjbF09dGhpcy5wYXJzZWRDb2RlLmJvZHlcclxuXHRcdGlmKHZhckRlY2wmJnZhckRlY2wudHlwZT09J1ZhcmlhYmxlRGVjbGFyYXRpb24nKXtcclxuXHRcdFx0dmFyRGVjbC5kZWNsYXJhdGlvbnMuZm9yRWFjaChkZWY9PntcclxuXHRcdFx0XHR0aGlzLmNvZGVEZWZWYXJzLnB1c2goZGVmLmlkLm5hbWUpXHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0XHR0aGlzLnN0YWNrcz1bXVxyXG5cdH1cclxuXHJcblx0YXNzZW1ibGUoKXtcclxuXHRcdHZhciBpUGFyYT17fSwgc2NvcGU9dGhpcy52YXJpYW50UGFyZW50LnRvSmF2YXNjcmlwdChpUGFyYSlcclxuXHRcdHZhciBzZXRWYXJpYWJsZXM9W11cclxuXHRcdHRoaXMuY29kZURlZlZhcnMuZm9yRWFjaChhPT57XHJcblx0XHRcdHNldFZhcmlhYmxlcy5wdXNoKGBzdGFjay4ke2F9PSR7YX07YClcclxuXHRcdH0pXHJcblxyXG5cdFx0dmFyIGNvZGU9YCR7c2NvcGV9IHtcclxuXHRcdFx0XHRcdFx0bGV0IHN0YWNrcz1bXVxyXG5cdFx0XHRcdFx0XHRmb3IoJHt0aGlzLmNvZGV9KXtcclxuXHRcdFx0XHRcdFx0XHRsZXQgc3RhY2s9e31cclxuXHRcdFx0XHRcdFx0XHQke3NldFZhcmlhYmxlcy5qb2luKFwiIFwiKX1cclxuXHRcdFx0XHRcdFx0XHRzdGFja3MucHVzaChzdGFjaylcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gc3RhY2tzXHJcblx0XHRcdFx0XHR9YFxyXG5cdFx0dGhpcy5zdGFja3M9bmV3IEZ1bmN0aW9uKFwiZGF0YVwiLGNvZGUpKGlQYXJhKVxyXG5cdH1cclxuXHJcblx0X2l0ZXJhdGUoZixwYXJhbWl6ZWRWaXNpdEZhY3Rvcmllcyl7XHJcblx0XHRpZighdGhpcy53RG9jLmRhdGEpXHJcblx0XHRcdHJldHVybiBzdXBlci5faXRlcmF0ZSguLi5hcmd1bWVudHMpXHJcblxyXG5cdFx0dmFyIHNkdENvbnRlbnQ9dGhpcy53WG1sLiQxKCdzZHRDb250ZW50JyksXHJcblx0XHRcdHJhd0NoaWxkcmVuPXNkdENvbnRlbnQuY2hpbGROb2Rlcy5hc0FycmF5KCksXHJcblx0XHRcdGxlbj1yYXdDaGlsZHJlbi5sZW5ndGg7XHJcblxyXG5cdFx0cmF3Q2hpbGRyZW4uZm9yRWFjaChhPT57XHJcblx0XHRcdHNkdENvbnRlbnQucmVtb3ZlQ2hpbGQoYSlcclxuXHRcdH0pXHJcblxyXG5cdFx0dGhpcy5zdGFja3MuZm9yRWFjaChhPT57XHJcblx0XHRcdHJhd0NoaWxkcmVuLmZvckVhY2goYj0+e1xyXG5cdFx0XHRcdHNkdENvbnRlbnQuYXBwZW5kQ2hpbGQoYi5jbG9uZU5vZGUodHJ1ZSkpXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cclxuXHRcdGZvcih2YXIgaT0wLGNoaWxkcmVuPXNkdENvbnRlbnQuY2hpbGROb2RlcyxsPWNoaWxkcmVuP2NoaWxkcmVuLmxlbmd0aDowOyBpPGw7IGkrKyl7XHJcblx0XHRcdGlmKGkgJiYgKGklbGVuPT0wKSlcclxuXHRcdFx0XHR0aGlzLnN0YWNrcy5zaGlmdCgpO1xyXG5cclxuXHRcdFx0KCF0aGlzLl9zaG91bGRJZ25vcmUoY2hpbGRyZW5baV0pKSAmJiBmKGNoaWxkcmVuW2ldKVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc3RhY2tzPVtdXHJcblx0fVxyXG5cclxuXHR0b0phdmFzY3JpcHQoaVBhcmEpe1xyXG5cdFx0dmFyIHZhck5hbWU9YF9hYSR7X3V1aWQrK31gXHJcblx0XHRpUGFyYVt2YXJOYW1lXT10aGlzLnN0YWNrc1swXVxyXG5cdFx0cmV0dXJuIGAke3RoaXMudmFyaWFudFBhcmVudC50b0phdmFzY3JpcHQoaVBhcmEpfSB3aXRoKGFyZ3VtZW50c1swXS4ke3Zhck5hbWV9KWBcclxuXHR9XHJcbn1cclxuIl19