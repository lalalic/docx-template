"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

		var _this$parsedCode$body = _this.parsedCode.body[0];
		var init = _this$parsedCode$body.init;
		var test = _this$parsedCode$body.test;
		var update = _this$parsedCode$body.update;

		if (init && init.type == 'VariableDeclaration') {
			init.declarations.forEach(function (def) {
				_this.codeDefVars.push(def.id.name);
			});
		}
		_this.stacks = [];
		return _this;
	}

	_createClass(For, [{
		key: "_initVariant",
		value: function _initVariant() {
			this.codeBlock = this.parsedCode.body[0].body.body;
			while (!Array.isArray(this.codeBlock)) {
				this.codeBlock = this.codeBlock.body;
			}_get(Object.getPrototypeOf(For.prototype), "_initVariant", this).call(this);
		}
	}, {
		key: "assemble",
		value: function assemble() {
			var iPara = {},
			    scope = this.variantParent._toJavascript(iPara);
			var setVariables = [];
			this.codeDefVars.forEach(function (a) {
				setVariables.push("stack." + a + "=" + a + ";");
			});

			var code = scope + " {\n\t\t\t\t\t\tvar stacks=[]\n\t\t\t\t\t\tfor(" + this.code + "){\n\t\t\t\t\t\t\tvar stack={}\n\t\t\t\t\t\t\t" + setVariables.join(" ") + "\n\t\t\t\t\t\t\tstacks.push(stack)\n\t\t\t\t\t\t}\n\t\t\t\t\t\treturn stacks\n\t\t\t\t\t}";
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
			_get(Object.getPrototypeOf(For.prototype), "assemble", this).apply(this, arguments);
		}
	}, {
		key: "_toJavascript",
		value: function _toJavascript(iPara) {
			var varName = "_aa" + _uuid++;
			iPara[varName] = this.stacks[0];
			return this.variantParent._toJavascript(iPara) + " with(arguments[0]." + varName + ")";
		}
	}]);

	return For;
}(_variant2.default);

exports.default = For;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fZm9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFFBQU0sS0FBSyxHQUFMLEVBQU47O0lBRWlCOzs7OztzQkFDSDtBQUFDLFVBQU0sYUFBTixDQUFEOzs7O0FBRWpCLFVBSG9CLEdBR3BCLEdBQWE7d0JBSE8sS0FHUDs7cUVBSE8saUJBSVYsWUFERzs7QUFHWixRQUFLLFdBQUwsR0FBaUIsRUFBakIsQ0FIWTs7OEJBS2EsTUFBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCLENBQXJCLEVBTGI7TUFLUCxrQ0FMTztNQUtELGtDQUxDO01BS0ssc0NBTEw7O0FBTVosTUFBRyxRQUFNLEtBQUssSUFBTCxJQUFXLHFCQUFYLEVBQWlDO0FBQ3pDLFFBQUssWUFBTCxDQUFrQixPQUFsQixDQUEwQixlQUFLO0FBQzlCLFVBQUssV0FBTCxDQUFpQixJQUFqQixDQUFzQixJQUFJLEVBQUosQ0FBTyxJQUFQLENBQXRCLENBRDhCO0lBQUwsQ0FBMUIsQ0FEeUM7R0FBMUM7QUFLQSxRQUFLLE1BQUwsR0FBWSxFQUFaLENBWFk7O0VBQWI7O2NBSG9COztpQ0FpQk47QUFDYixRQUFLLFNBQUwsR0FBZSxLQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBcUIsQ0FBckIsRUFBd0IsSUFBeEIsQ0FBNkIsSUFBN0IsQ0FERjtBQUViLFVBQU0sQ0FBQyxNQUFNLE9BQU4sQ0FBYyxLQUFLLFNBQUwsQ0FBZjtBQUNMLFNBQUssU0FBTCxHQUFlLEtBQUssU0FBTCxDQUFlLElBQWY7SUFEaEIsMkJBbkJtQixnREFxQm5CLENBSmE7Ozs7NkJBT0o7QUFDVCxPQUFJLFFBQU0sRUFBTjtPQUFVLFFBQU0sS0FBSyxhQUFMLENBQW1CLGFBQW5CLENBQWlDLEtBQWpDLENBQU4sQ0FETDtBQUVULE9BQUksZUFBYSxFQUFiLENBRks7QUFHVCxRQUFLLFdBQUwsQ0FBaUIsT0FBakIsQ0FBeUIsYUFBRztBQUMzQixpQkFBYSxJQUFiLFlBQTJCLFVBQUssT0FBaEMsRUFEMkI7SUFBSCxDQUF6QixDQUhTOztBQU9ULE9BQUksT0FBUSw0REFFRixLQUFLLElBQUwsc0RBRUgsYUFBYSxJQUFiLENBQWtCLEdBQWxCLCtGQUpILENBUEs7QUFnQlQsUUFBSyxNQUFMLEdBQVksSUFBSSxRQUFKLENBQWEsTUFBYixFQUFvQixJQUFwQixFQUEwQixLQUExQixDQUFaLENBaEJTOzs7OzJCQW1CRCxHQUFFLHlCQUF3QjtBQUNsQyxPQUFHLENBQUMsS0FBSyxJQUFMLENBQVUsSUFBVixFQUNILGtDQTdDa0IsOENBNkNPLFVBQXpCLENBREQ7O0FBR0EsT0FBSSxhQUFXLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxZQUFiLENBQVg7T0FDSCxjQUFZLFdBQVcsVUFBWCxDQUFzQixPQUF0QixFQUFaO09BQ0EsTUFBSSxZQUFZLE1BQVosQ0FONkI7O0FBUWxDLGVBQVksT0FBWixDQUFvQixhQUFHO0FBQ3RCLGVBQVcsV0FBWCxDQUF1QixDQUF2QixFQURzQjtJQUFILENBQXBCLENBUmtDOztBQVlsQyxRQUFLLE1BQUwsQ0FBWSxPQUFaLENBQW9CLGFBQUc7QUFDdEIsZ0JBQVksT0FBWixDQUFvQixhQUFHO0FBQ3RCLGdCQUFXLFdBQVgsQ0FBdUIsRUFBRSxTQUFGLENBQVksSUFBWixDQUF2QixFQURzQjtLQUFILENBQXBCLENBRHNCO0lBQUgsQ0FBcEIsQ0Faa0M7O0FBa0JsQyxRQUFJLElBQUksSUFBRSxDQUFGLEVBQUksV0FBUyxXQUFXLFVBQVgsRUFBc0IsSUFBRSxXQUFTLFNBQVMsTUFBVCxHQUFnQixDQUF6QixFQUE0QixJQUFFLENBQUYsRUFBSyxHQUE5RSxFQUFrRjtBQUNqRixRQUFHLEtBQU0sSUFBRSxHQUFGLElBQU8sQ0FBUCxFQUNSLEtBQUssTUFBTCxDQUFZLEtBQVosR0FERDs7QUFHQSxLQUFFLEtBQUssYUFBTCxDQUFtQixTQUFTLENBQVQsQ0FBbkIsQ0FBRCxJQUFxQyxFQUFFLFNBQVMsQ0FBVCxDQUFGLENBQXRDLENBSmlGO0lBQWxGOztBQU9BLFFBQUssTUFBTCxHQUFZLEVBQVosQ0F6QmtDO0FBMEJsQyw4QkFyRW1CLDhDQXFFRCxVQUFsQixDQTFCa0M7Ozs7Z0NBNkJyQixPQUFNO0FBQ25CLE9BQUksa0JBQWMsT0FBZCxDQURlO0FBRW5CLFNBQU0sT0FBTixJQUFlLEtBQUssTUFBTCxDQUFZLENBQVosQ0FBZixDQUZtQjtBQUduQixVQUFVLEtBQUssYUFBTCxDQUFtQixhQUFuQixDQUFpQyxLQUFqQyw0QkFBNkQsYUFBdkUsQ0FIbUI7Ozs7UUF4RUEiLCJmaWxlIjoiX2Zvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWYXJpYW50IGZyb20gXCIuL3ZhcmlhbnRcIlxyXG5pbXBvcnQgZXNwcmltYSBmcm9tIFwiZXNwcmltYVwiXHJcblxyXG52YXIgX3V1aWQ9RGF0ZS5ub3coKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9yIGV4dGVuZHMgVmFyaWFudHtcclxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm5cInZhcmlhbnQuZm9yXCJ9XHJcblxyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHRcclxuXHRcdHRoaXMuY29kZURlZlZhcnM9W11cclxuXHRcdFxyXG5cdFx0dmFyIHtpbml0LCB0ZXN0LCB1cGRhdGV9PXRoaXMucGFyc2VkQ29kZS5ib2R5WzBdXHJcblx0XHRpZihpbml0JiZpbml0LnR5cGU9PSdWYXJpYWJsZURlY2xhcmF0aW9uJyl7XHJcblx0XHRcdGluaXQuZGVjbGFyYXRpb25zLmZvckVhY2goZGVmPT57XHJcblx0XHRcdFx0dGhpcy5jb2RlRGVmVmFycy5wdXNoKGRlZi5pZC5uYW1lKVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5zdGFja3M9W11cclxuXHR9XHJcblx0XHJcblx0X2luaXRWYXJpYW50KCl7XHJcblx0XHR0aGlzLmNvZGVCbG9jaz10aGlzLnBhcnNlZENvZGUuYm9keVswXS5ib2R5LmJvZHlcclxuXHRcdHdoaWxlKCFBcnJheS5pc0FycmF5KHRoaXMuY29kZUJsb2NrKSlcclxuXHRcdFx0dGhpcy5jb2RlQmxvY2s9dGhpcy5jb2RlQmxvY2suYm9keVxyXG5cdFx0c3VwZXIuX2luaXRWYXJpYW50KClcclxuXHR9XHJcblxyXG5cdGFzc2VtYmxlKCl7XHJcblx0XHR2YXIgaVBhcmE9e30sIHNjb3BlPXRoaXMudmFyaWFudFBhcmVudC5fdG9KYXZhc2NyaXB0KGlQYXJhKVxyXG5cdFx0dmFyIHNldFZhcmlhYmxlcz1bXVxyXG5cdFx0dGhpcy5jb2RlRGVmVmFycy5mb3JFYWNoKGE9PntcclxuXHRcdFx0c2V0VmFyaWFibGVzLnB1c2goYHN0YWNrLiR7YX09JHthfTtgKVxyXG5cdFx0fSlcclxuXHJcblx0XHR2YXIgY29kZT1gJHtzY29wZX0ge1xyXG5cdFx0XHRcdFx0XHR2YXIgc3RhY2tzPVtdXHJcblx0XHRcdFx0XHRcdGZvcigke3RoaXMuY29kZX0pe1xyXG5cdFx0XHRcdFx0XHRcdHZhciBzdGFjaz17fVxyXG5cdFx0XHRcdFx0XHRcdCR7c2V0VmFyaWFibGVzLmpvaW4oXCIgXCIpfVxyXG5cdFx0XHRcdFx0XHRcdHN0YWNrcy5wdXNoKHN0YWNrKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHJldHVybiBzdGFja3NcclxuXHRcdFx0XHRcdH1gXHJcblx0XHR0aGlzLnN0YWNrcz1uZXcgRnVuY3Rpb24oXCJkYXRhXCIsY29kZSkoaVBhcmEpXHJcblx0fVxyXG5cclxuXHRfaXRlcmF0ZShmLHBhcmFtaXplZFZpc2l0RmFjdG9yaWVzKXtcclxuXHRcdGlmKCF0aGlzLndEb2MuZGF0YSlcclxuXHRcdFx0cmV0dXJuIHN1cGVyLl9pdGVyYXRlKC4uLmFyZ3VtZW50cylcclxuXHJcblx0XHR2YXIgc2R0Q29udGVudD10aGlzLndYbWwuJDEoJ3NkdENvbnRlbnQnKSxcclxuXHRcdFx0cmF3Q2hpbGRyZW49c2R0Q29udGVudC5jaGlsZE5vZGVzLmFzQXJyYXkoKSxcclxuXHRcdFx0bGVuPXJhd0NoaWxkcmVuLmxlbmd0aDtcclxuXHJcblx0XHRyYXdDaGlsZHJlbi5mb3JFYWNoKGE9PntcclxuXHRcdFx0c2R0Q29udGVudC5yZW1vdmVDaGlsZChhKVxyXG5cdFx0fSlcclxuXHJcblx0XHR0aGlzLnN0YWNrcy5mb3JFYWNoKGE9PntcclxuXHRcdFx0cmF3Q2hpbGRyZW4uZm9yRWFjaChiPT57XHJcblx0XHRcdFx0c2R0Q29udGVudC5hcHBlbmRDaGlsZChiLmNsb25lTm9kZSh0cnVlKSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblxyXG5cdFx0Zm9yKHZhciBpPTAsY2hpbGRyZW49c2R0Q29udGVudC5jaGlsZE5vZGVzLGw9Y2hpbGRyZW4/Y2hpbGRyZW4ubGVuZ3RoOjA7IGk8bDsgaSsrKXtcclxuXHRcdFx0aWYoaSAmJiAoaSVsZW49PTApKVxyXG5cdFx0XHRcdHRoaXMuc3RhY2tzLnNoaWZ0KCk7XHJcblxyXG5cdFx0XHQoIXRoaXMuX3Nob3VsZElnbm9yZShjaGlsZHJlbltpXSkpICYmIGYoY2hpbGRyZW5baV0pXHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zdGFja3M9W11cclxuXHRcdHN1cGVyLmFzc2VtYmxlKC4uLmFyZ3VtZW50cylcclxuXHR9XHJcblxyXG5cdF90b0phdmFzY3JpcHQoaVBhcmEpe1xyXG5cdFx0dmFyIHZhck5hbWU9YF9hYSR7X3V1aWQrK31gXHJcblx0XHRpUGFyYVt2YXJOYW1lXT10aGlzLnN0YWNrc1swXVxyXG5cdFx0cmV0dXJuIGAke3RoaXMudmFyaWFudFBhcmVudC5fdG9KYXZhc2NyaXB0KGlQYXJhKX0gd2l0aChhcmd1bWVudHNbMF0uJHt2YXJOYW1lfSlgXHJcblx0fVxyXG59XHJcbiJdfQ==