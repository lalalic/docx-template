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
		value: function _iterate() {
			var _this2 = this,
			    _arguments = arguments;

			this.stacks.forEach(function (a) {
				_get(Object.getPrototypeOf(For.prototype), "_iterate", _this2).apply(_this2, _arguments);
			});
			this.stacks = [];
		}
	}, {
		key: "toJavascript",
		value: function toJavascript(iPara) {
			var varName = "_" + _uuid++;
			iPara[varName] = this.stacks.shift();
			return this.variantParent.toJavascript(iPara) + " with(arguments[0][\"" + varName + "\"])";
		}
	}]);

	return For;
}(_variant2.default);

exports.default = For;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbC9fZm9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQUksUUFBTSxLQUFLLEdBQUwsRUFBTjs7SUFFaUI7Ozs7O3NCQUNIO0FBQUMsVUFBTSxhQUFOLENBQUQ7Ozs7QUFFakIsVUFIb0IsR0FHcEIsR0FBYTt3QkFITyxLQUdQOztxRUFITyxpQkFJVixZQURHOztBQUVaLFFBQUssV0FBTCxHQUFpQixFQUFqQixDQUZZOzs2Q0FHRSxNQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsS0FIRjs7TUFHUCxtQ0FITzs7QUFJWixNQUFHLFdBQVMsUUFBUSxJQUFSLElBQWMscUJBQWQsRUFBb0M7QUFDL0MsV0FBUSxZQUFSLENBQXFCLE9BQXJCLENBQTZCLGVBQUs7QUFDakMsVUFBSyxXQUFMLENBQWlCLElBQWpCLENBQXNCLElBQUksRUFBSixDQUFPLElBQVAsQ0FBdEIsQ0FEaUM7SUFBTCxDQUE3QixDQUQrQztHQUFoRDtBQUtBLFFBQUssTUFBTCxHQUFZLEVBQVosQ0FUWTs7RUFBYjs7Y0FIb0I7OzZCQWVWO0FBQ1QsT0FBSSxRQUFNLEVBQU47T0FBVSxRQUFNLEtBQUssYUFBTCxDQUFtQixZQUFuQixDQUFnQyxLQUFoQyxDQUFOLENBREw7QUFFVCxPQUFJLGVBQWEsRUFBYixDQUZLO0FBR1QsUUFBSyxXQUFMLENBQWlCLE9BQWpCLENBQXlCLGFBQUc7QUFDM0IsaUJBQWEsSUFBYixjQUE0QixhQUFPLE9BQW5DLEVBRDJCO0lBQUgsQ0FBekIsQ0FIUzs7QUFPVCxPQUFJLE9BQVEsNERBRUYsS0FBSyxJQUFMLHNEQUVILGFBQWEsSUFBYixDQUFrQixHQUFsQiwrRkFKSCxDQVBLO0FBZ0JULFdBQVEsSUFBUixDQUFhLElBQWIsRUFoQlM7QUFpQlQsUUFBSyxNQUFMLEdBQVksSUFBSSxRQUFKLENBQWEsTUFBYixFQUFvQixJQUFwQixFQUEwQixLQUExQixDQUFaLENBakJTOzs7OzZCQW9CQTs7OztBQUNULFFBQUssTUFBTCxDQUFZLE9BQVosQ0FBb0IsYUFBRztBQUN0QiwrQkFyQ2tCLDZEQXFDbEIsQ0FEc0I7SUFBSCxDQUFwQixDQURTO0FBSVQsUUFBSyxNQUFMLEdBQVksRUFBWixDQUpTOzs7OytCQU9HLE9BQU07QUFDbEIsT0FBSSxnQkFBWSxPQUFaLENBRGM7QUFFbEIsU0FBTSxPQUFOLElBQWUsS0FBSyxNQUFMLENBQVksS0FBWixFQUFmLENBRmtCO0FBR2xCLFVBQVUsS0FBSyxhQUFMLENBQW1CLFlBQW5CLENBQWdDLEtBQWhDLDhCQUE2RCxnQkFBdkUsQ0FIa0I7Ozs7UUExQ0MiLCJmaWxlIjoiX2Zvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWYXJpYW50IGZyb20gXCIuL3ZhcmlhbnRcIlxyXG5pbXBvcnQgZXNwcmltYSBmcm9tIFwiZXNwcmltYVwiXHJcblxyXG52YXIgX3V1aWQ9RGF0ZS5ub3coKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9yIGV4dGVuZHMgVmFyaWFudHtcclxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm5cInZhcmlhbnQuZm9yXCJ9XHJcblx0XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMuY29kZURlZlZhcnM9W11cclxuXHRcdHZhciBbdmFyRGVjbF09dGhpcy5wYXJzZWRDb2RlLmJvZHlcclxuXHRcdGlmKHZhckRlY2wmJnZhckRlY2wudHlwZT09J1ZhcmlhYmxlRGVjbGFyYXRpb24nKXtcclxuXHRcdFx0dmFyRGVjbC5kZWNsYXJhdGlvbnMuZm9yRWFjaChkZWY9PntcclxuXHRcdFx0XHR0aGlzLmNvZGVEZWZWYXJzLnB1c2goZGVmLmlkLm5hbWUpXHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0XHR0aGlzLnN0YWNrcz1bXVxyXG5cdH1cclxuXHRcclxuXHRhc3NlbWJsZSgpe1xyXG5cdFx0dmFyIGlQYXJhPXt9LCBzY29wZT10aGlzLnZhcmlhbnRQYXJlbnQudG9KYXZhc2NyaXB0KGlQYXJhKVxyXG5cdFx0dmFyIHNldFZhcmlhYmxlcz1bXVxyXG5cdFx0dGhpcy5jb2RlRGVmVmFycy5mb3JFYWNoKGE9PntcclxuXHRcdFx0c2V0VmFyaWFibGVzLnB1c2goYHN0YWNrW1wiJHthfVwiXT0ke2F9O2ApXHJcblx0XHR9KVxyXG5cdFx0XHJcblx0XHR2YXIgY29kZT1gJHtzY29wZX0ge1xyXG5cdFx0XHRcdFx0XHRsZXQgc3RhY2tzPVtdXHJcblx0XHRcdFx0XHRcdGZvcigke3RoaXMuY29kZX0pe1xyXG5cdFx0XHRcdFx0XHRcdGxldCBzdGFjaz17fVxyXG5cdFx0XHRcdFx0XHRcdCR7c2V0VmFyaWFibGVzLmpvaW4oXCIgXCIpfVxyXG5cdFx0XHRcdFx0XHRcdHN0YWNrcy5wdXNoKHN0YWNrKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHJldHVybiBzdGFja3NcclxuXHRcdFx0XHRcdH1gXHJcblx0XHRjb25zb2xlLmluZm8oY29kZSlcclxuXHRcdHRoaXMuc3RhY2tzPW5ldyBGdW5jdGlvbihcImRhdGFcIixjb2RlKShpUGFyYSlcclxuXHR9XHJcblx0XHJcblx0X2l0ZXJhdGUoKXtcclxuXHRcdHRoaXMuc3RhY2tzLmZvckVhY2goYT0+e1xyXG5cdFx0XHRzdXBlci5faXRlcmF0ZSguLi5hcmd1bWVudHMpXHJcblx0XHR9KVxyXG5cdFx0dGhpcy5zdGFja3M9W11cclxuXHR9XHJcblx0XHJcblx0dG9KYXZhc2NyaXB0KGlQYXJhKXtcclxuXHRcdHZhciB2YXJOYW1lPWBfJHtfdXVpZCsrfWBcclxuXHRcdGlQYXJhW3Zhck5hbWVdPXRoaXMuc3RhY2tzLnNoaWZ0KClcclxuXHRcdHJldHVybiBgJHt0aGlzLnZhcmlhbnRQYXJlbnQudG9KYXZhc2NyaXB0KGlQYXJhKX0gd2l0aChhcmd1bWVudHNbMF1bXCIke3Zhck5hbWV9XCJdKWBcclxuXHR9XHJcbn0iXX0=