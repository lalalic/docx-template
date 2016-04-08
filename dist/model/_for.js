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
				setVariables.push("stack[\"" + a + "\"]=" + a + ";");
			});

			var code = scope + " {\n\t\t\t\t\t\tlet stacks=[]\n\t\t\t\t\t\tfor(" + this.code + "){\n\t\t\t\t\t\t\tlet stack={}\n\t\t\t\t\t\t\t" + setVariables.join(" ") + "\n\t\t\t\t\t\t\tstacks.push(stack)\n\t\t\t\t\t\t}\n\t\t\t\t\t\treturn stacks\n\t\t\t\t\t}";
			console.info(code);
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
			var varName = "_" + _uuid++;
			iPara[varName] = this.stacks[0];
			return this.variantParent.toJavascript(iPara) + " with(arguments[0][\"" + varName + "\"])";
		}
	}]);

	return For;
}(_variant2.default);

exports.default = For;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbC9fZm9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQUksUUFBTSxLQUFLLEdBQUwsRUFBTjs7SUFFaUI7Ozs7O3NCQUNIO0FBQUMsVUFBTSxhQUFOLENBQUQ7Ozs7QUFFakIsVUFIb0IsR0FHcEIsR0FBYTt3QkFITyxLQUdQOztxRUFITyxpQkFJVixZQURHOztBQUVaLFFBQUssV0FBTCxHQUFpQixFQUFqQixDQUZZOzs2Q0FHRSxNQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsS0FIRjs7TUFHUCxtQ0FITzs7QUFJWixNQUFHLFdBQVMsUUFBUSxJQUFSLElBQWMscUJBQWQsRUFBb0M7QUFDL0MsV0FBUSxZQUFSLENBQXFCLE9BQXJCLENBQTZCLGVBQUs7QUFDakMsVUFBSyxXQUFMLENBQWlCLElBQWpCLENBQXNCLElBQUksRUFBSixDQUFPLElBQVAsQ0FBdEIsQ0FEaUM7SUFBTCxDQUE3QixDQUQrQztHQUFoRDtBQUtBLFFBQUssTUFBTCxHQUFZLEVBQVosQ0FUWTs7RUFBYjs7Y0FIb0I7OzZCQWVWO0FBQ1QsT0FBSSxRQUFNLEVBQU47T0FBVSxRQUFNLEtBQUssYUFBTCxDQUFtQixZQUFuQixDQUFnQyxLQUFoQyxDQUFOLENBREw7QUFFVCxPQUFJLGVBQWEsRUFBYixDQUZLO0FBR1QsUUFBSyxXQUFMLENBQWlCLE9BQWpCLENBQXlCLGFBQUc7QUFDM0IsaUJBQWEsSUFBYixjQUE0QixhQUFPLE9BQW5DLEVBRDJCO0lBQUgsQ0FBekIsQ0FIUzs7QUFPVCxPQUFJLE9BQVEsNERBRUYsS0FBSyxJQUFMLHNEQUVILGFBQWEsSUFBYixDQUFrQixHQUFsQiwrRkFKSCxDQVBLO0FBZ0JULFdBQVEsSUFBUixDQUFhLElBQWIsRUFoQlM7QUFpQlQsUUFBSyxNQUFMLEdBQVksSUFBSSxRQUFKLENBQWEsTUFBYixFQUFvQixJQUFwQixFQUEwQixLQUExQixDQUFaLENBakJTOzs7OzJCQW9CRCxHQUFFLHlCQUF3QjtBQUNsQyxPQUFHLENBQUMsS0FBSyxJQUFMLENBQVUsSUFBVixFQUNILGtDQXJDa0IsOENBcUNPLFVBQXpCLENBREQ7O0FBR0EsT0FBSSxhQUFXLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxZQUFiLENBQVg7T0FDSCxjQUFZLFdBQVcsVUFBWCxDQUFzQixPQUF0QixFQUFaO09BQ0EsTUFBSSxZQUFZLE1BQVosQ0FONkI7O0FBUWxDLGVBQVksT0FBWixDQUFvQixhQUFHO0FBQ3RCLGVBQVcsV0FBWCxDQUF1QixDQUF2QixFQURzQjtJQUFILENBQXBCLENBUmtDOztBQVlsQyxRQUFLLE1BQUwsQ0FBWSxPQUFaLENBQW9CLGFBQUc7QUFDdEIsZ0JBQVksT0FBWixDQUFvQixhQUFHO0FBQ3RCLGdCQUFXLFdBQVgsQ0FBdUIsRUFBRSxTQUFGLENBQVksSUFBWixDQUF2QixFQURzQjtLQUFILENBQXBCLENBRHNCO0lBQUgsQ0FBcEIsQ0Faa0M7O0FBa0JsQyxRQUFJLElBQUksSUFBRSxDQUFGLEVBQUksV0FBUyxXQUFXLFVBQVgsRUFBc0IsSUFBRSxXQUFTLFNBQVMsTUFBVCxHQUFnQixDQUF6QixFQUE0QixJQUFFLENBQUYsRUFBSyxHQUE5RSxFQUFrRjtBQUNqRixRQUFHLEtBQU0sSUFBRSxHQUFGLElBQU8sQ0FBUCxFQUNSLEtBQUssTUFBTCxDQUFZLEtBQVosR0FERDs7QUFHQSxLQUFFLEtBQUssYUFBTCxDQUFtQixTQUFTLENBQVQsQ0FBbkIsQ0FBRCxJQUFxQyxFQUFFLFNBQVMsQ0FBVCxDQUFGLENBQXRDLENBSmlGO0lBQWxGOztBQU9BLFFBQUssTUFBTCxHQUFZLEVBQVosQ0F6QmtDOzs7OytCQTRCdEIsT0FBTTtBQUNsQixPQUFJLGdCQUFZLE9BQVosQ0FEYztBQUVsQixTQUFNLE9BQU4sSUFBZSxLQUFLLE1BQUwsQ0FBWSxDQUFaLENBQWYsQ0FGa0I7QUFHbEIsVUFBVSxLQUFLLGFBQUwsQ0FBbUIsWUFBbkIsQ0FBZ0MsS0FBaEMsOEJBQTZELGdCQUF2RSxDQUhrQjs7OztRQS9EQyIsImZpbGUiOiJfZm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZhcmlhbnQgZnJvbSBcIi4vdmFyaWFudFwiXHJcbmltcG9ydCBlc3ByaW1hIGZyb20gXCJlc3ByaW1hXCJcclxuXHJcbnZhciBfdXVpZD1EYXRlLm5vdygpXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3IgZXh0ZW5kcyBWYXJpYW50e1xyXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVyblwidmFyaWFudC5mb3JcIn1cclxuXHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMuY29kZURlZlZhcnM9W11cclxuXHRcdHZhciBbdmFyRGVjbF09dGhpcy5wYXJzZWRDb2RlLmJvZHlcclxuXHRcdGlmKHZhckRlY2wmJnZhckRlY2wudHlwZT09J1ZhcmlhYmxlRGVjbGFyYXRpb24nKXtcclxuXHRcdFx0dmFyRGVjbC5kZWNsYXJhdGlvbnMuZm9yRWFjaChkZWY9PntcclxuXHRcdFx0XHR0aGlzLmNvZGVEZWZWYXJzLnB1c2goZGVmLmlkLm5hbWUpXHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0XHR0aGlzLnN0YWNrcz1bXVxyXG5cdH1cclxuXHJcblx0YXNzZW1ibGUoKXtcclxuXHRcdHZhciBpUGFyYT17fSwgc2NvcGU9dGhpcy52YXJpYW50UGFyZW50LnRvSmF2YXNjcmlwdChpUGFyYSlcclxuXHRcdHZhciBzZXRWYXJpYWJsZXM9W11cclxuXHRcdHRoaXMuY29kZURlZlZhcnMuZm9yRWFjaChhPT57XHJcblx0XHRcdHNldFZhcmlhYmxlcy5wdXNoKGBzdGFja1tcIiR7YX1cIl09JHthfTtgKVxyXG5cdFx0fSlcclxuXHJcblx0XHR2YXIgY29kZT1gJHtzY29wZX0ge1xyXG5cdFx0XHRcdFx0XHRsZXQgc3RhY2tzPVtdXHJcblx0XHRcdFx0XHRcdGZvcigke3RoaXMuY29kZX0pe1xyXG5cdFx0XHRcdFx0XHRcdGxldCBzdGFjaz17fVxyXG5cdFx0XHRcdFx0XHRcdCR7c2V0VmFyaWFibGVzLmpvaW4oXCIgXCIpfVxyXG5cdFx0XHRcdFx0XHRcdHN0YWNrcy5wdXNoKHN0YWNrKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHJldHVybiBzdGFja3NcclxuXHRcdFx0XHRcdH1gXHJcblx0XHRjb25zb2xlLmluZm8oY29kZSlcclxuXHRcdHRoaXMuc3RhY2tzPW5ldyBGdW5jdGlvbihcImRhdGFcIixjb2RlKShpUGFyYSlcclxuXHR9XHJcblxyXG5cdF9pdGVyYXRlKGYscGFyYW1pemVkVmlzaXRGYWN0b3JpZXMpe1xyXG5cdFx0aWYoIXRoaXMud0RvYy5kYXRhKVxyXG5cdFx0XHRyZXR1cm4gc3VwZXIuX2l0ZXJhdGUoLi4uYXJndW1lbnRzKVxyXG5cclxuXHRcdHZhciBzZHRDb250ZW50PXRoaXMud1htbC4kMSgnc2R0Q29udGVudCcpLFxyXG5cdFx0XHRyYXdDaGlsZHJlbj1zZHRDb250ZW50LmNoaWxkTm9kZXMuYXNBcnJheSgpLFxyXG5cdFx0XHRsZW49cmF3Q2hpbGRyZW4ubGVuZ3RoO1xyXG5cclxuXHRcdHJhd0NoaWxkcmVuLmZvckVhY2goYT0+e1xyXG5cdFx0XHRzZHRDb250ZW50LnJlbW92ZUNoaWxkKGEpXHJcblx0XHR9KVxyXG5cclxuXHRcdHRoaXMuc3RhY2tzLmZvckVhY2goYT0+e1xyXG5cdFx0XHRyYXdDaGlsZHJlbi5mb3JFYWNoKGI9PntcclxuXHRcdFx0XHRzZHRDb250ZW50LmFwcGVuZENoaWxkKGIuY2xvbmVOb2RlKHRydWUpKVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHJcblx0XHRmb3IodmFyIGk9MCxjaGlsZHJlbj1zZHRDb250ZW50LmNoaWxkTm9kZXMsbD1jaGlsZHJlbj9jaGlsZHJlbi5sZW5ndGg6MDsgaTxsOyBpKyspe1xyXG5cdFx0XHRpZihpICYmIChpJWxlbj09MCkpXHJcblx0XHRcdFx0dGhpcy5zdGFja3Muc2hpZnQoKTtcclxuXHJcblx0XHRcdCghdGhpcy5fc2hvdWxkSWdub3JlKGNoaWxkcmVuW2ldKSkgJiYgZihjaGlsZHJlbltpXSlcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnN0YWNrcz1bXVxyXG5cdH1cclxuXHJcblx0dG9KYXZhc2NyaXB0KGlQYXJhKXtcclxuXHRcdHZhciB2YXJOYW1lPWBfJHtfdXVpZCsrfWBcclxuXHRcdGlQYXJhW3Zhck5hbWVdPXRoaXMuc3RhY2tzWzBdXHJcblx0XHRyZXR1cm4gYCR7dGhpcy52YXJpYW50UGFyZW50LnRvSmF2YXNjcmlwdChpUGFyYSl9IHdpdGgoYXJndW1lbnRzWzBdW1wiJHt2YXJOYW1lfVwiXSlgXHJcblx0fVxyXG59XHJcbiJdfQ==