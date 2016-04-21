"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _variant = require("./variant");

var _variant2 = _interopRequireDefault(_variant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var If = function (_Variant) {
	_inherits(If, _Variant);

	function If() {
		_classCallCheck(this, If);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(If).apply(this, arguments));
	}

	_createClass(If, [{
		key: "_initVariant",
		value: function _initVariant() {
			this.codeBlock = this.parsedCode.body[0].consequent.body;
			while (!Array.isArray(this.codeBlock)) {
				//if()with(){}
				this.codeBlock = this.codeBlock.body;
			}this.parsedCode.body[0].alternate = {
				"type": "ExpressionStatement",
				"expression": {
					"type": "CallExpression",
					"callee": {
						"type": "Identifier",
						"name": "assemble_" + this.vId
					},
					"arguments": [{
						"type": "Literal",
						"value": false,
						"raw": "false"
					}]
				}
			};
			_get(Object.getPrototypeOf(If.prototype), "_initVariant", this).call(this);
		}
	}, {
		key: "assemble",
		value: function assemble() {
			var iPara = {},
			    code = this._toJavascript(iPara);
			var satified = new Function("data", code + " return true")(iPara);
			if (!satified) {
				var content = this.wXml.$1('sdtContent');
				while (content.lastChild) {
					content.removeChild(content.lastChild);
				}
			}
			_get(Object.getPrototypeOf(If.prototype), "assemble", this).apply(this, arguments);
		}
	}, {
		key: "_toJavascript",
		value: function _toJavascript(iPara) {
			return this.variantParent._toJavascript(iPara) + " if(" + this.code + ")";
		}
	}], [{
		key: "type",
		get: function get() {
			return "variant.if";
		}
	}]);

	return If;
}(_variant2.default);

exports.default = If;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9faWYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7O2lDQUVOO0FBQ2IsUUFBSyxTQUFMLEdBQWUsS0FBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCLENBQXJCLEVBQXdCLFVBQXhCLENBQW1DLElBQW5DLENBREY7QUFFYixVQUFNLENBQUMsTUFBTSxPQUFOLENBQWMsS0FBSyxTQUFMLENBQWY7O0FBQ0wsU0FBSyxTQUFMLEdBQWUsS0FBSyxTQUFMLENBQWUsSUFBZjtJQURoQixJQUdBLENBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQixDQUFyQixFQUF3QixTQUF4QixHQUFrQztBQUNqQyxZQUFRLHFCQUFSO0FBQ0Esa0JBQWM7QUFDYixhQUFRLGdCQUFSO0FBQ0EsZUFBVTtBQUNULGNBQVEsWUFBUjtBQUNBLGNBQVEsY0FBWSxLQUFLLEdBQUw7TUFGckI7QUFJQSxrQkFBYSxDQUNaO0FBQ0MsY0FBUSxTQUFSO0FBQ0EsZUFBUyxLQUFUO0FBQ0EsYUFBTyxPQUFQO01BSlcsQ0FBYjtLQU5EO0lBRkQsQ0FMYTtBQXNCYiw4QkF4Qm1CLCtDQXdCbkIsQ0F0QmE7Ozs7NkJBeUJKO0FBQ1QsT0FBSSxRQUFNLEVBQU47T0FBVSxPQUFLLEtBQUssYUFBTCxDQUFtQixLQUFuQixDQUFMLENBREw7QUFFVCxPQUFJLFdBQVMsSUFBSSxRQUFKLENBQWEsTUFBYixFQUF1QixxQkFBdkIsRUFBMkMsS0FBM0MsQ0FBVCxDQUZLO0FBR1QsT0FBRyxDQUFDLFFBQUQsRUFBVTtBQUNaLFFBQUksVUFBUSxLQUFLLElBQUwsQ0FBVSxFQUFWLENBQWEsWUFBYixDQUFSLENBRFE7QUFFWixXQUFNLFFBQVEsU0FBUjtBQUNMLGFBQVEsV0FBUixDQUFvQixRQUFRLFNBQVIsQ0FBcEI7S0FERDtJQUZEO0FBS0EsOEJBbkNtQiw2Q0FtQ0QsVUFBbEIsQ0FSUzs7OztnQ0FVSSxPQUFNO0FBQ25CLFVBQVUsS0FBSyxhQUFMLENBQW1CLGFBQW5CLENBQWlDLEtBQWpDLGFBQThDLEtBQUssSUFBTCxNQUF4RCxDQURtQjs7OztzQkFwQ0g7QUFBQyxVQUFNLFlBQU4sQ0FBRDs7OztRQURHIiwiZmlsZSI6Il9pZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWYXJpYW50IGZyb20gXCIuL3ZhcmlhbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWYgZXh0ZW5kcyBWYXJpYW50e1xyXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVyblwidmFyaWFudC5pZlwifVxyXG5cdF9pbml0VmFyaWFudCgpe1xyXG5cdFx0dGhpcy5jb2RlQmxvY2s9dGhpcy5wYXJzZWRDb2RlLmJvZHlbMF0uY29uc2VxdWVudC5ib2R5XHJcblx0XHR3aGlsZSghQXJyYXkuaXNBcnJheSh0aGlzLmNvZGVCbG9jaykpLy9pZigpd2l0aCgpe31cclxuXHRcdFx0dGhpcy5jb2RlQmxvY2s9dGhpcy5jb2RlQmxvY2suYm9keVxyXG5cdFx0XHJcblx0XHR0aGlzLnBhcnNlZENvZGUuYm9keVswXS5hbHRlcm5hdGU9e1xyXG5cdFx0XHRcInR5cGVcIjogXCJFeHByZXNzaW9uU3RhdGVtZW50XCIsXHJcblx0XHRcdFwiZXhwcmVzc2lvblwiOiB7XHJcblx0XHRcdFx0XCJ0eXBlXCI6IFwiQ2FsbEV4cHJlc3Npb25cIixcclxuXHRcdFx0XHRcImNhbGxlZVwiOiB7XHJcblx0XHRcdFx0XHRcInR5cGVcIjogXCJJZGVudGlmaWVyXCIsXHJcblx0XHRcdFx0XHRcIm5hbWVcIjogXCJhc3NlbWJsZV9cIit0aGlzLnZJZFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0XCJhcmd1bWVudHNcIjogW1xyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcInR5cGVcIjogXCJMaXRlcmFsXCIsXHJcblx0XHRcdFx0XHRcdFwidmFsdWVcIjogZmFsc2UsXHJcblx0XHRcdFx0XHRcdFwicmF3XCI6IFwiZmFsc2VcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0c3VwZXIuX2luaXRWYXJpYW50KClcclxuXHR9XHJcblxyXG5cdGFzc2VtYmxlKCl7XHJcblx0XHR2YXIgaVBhcmE9e30sIGNvZGU9dGhpcy5fdG9KYXZhc2NyaXB0KGlQYXJhKVxyXG5cdFx0dmFyIHNhdGlmaWVkPW5ldyBGdW5jdGlvbihcImRhdGFcIixgJHtjb2RlfSByZXR1cm4gdHJ1ZWApKGlQYXJhKVxyXG5cdFx0aWYoIXNhdGlmaWVkKXtcclxuXHRcdFx0bGV0IGNvbnRlbnQ9dGhpcy53WG1sLiQxKCdzZHRDb250ZW50JylcclxuXHRcdFx0d2hpbGUoY29udGVudC5sYXN0Q2hpbGQpXHJcblx0XHRcdFx0Y29udGVudC5yZW1vdmVDaGlsZChjb250ZW50Lmxhc3RDaGlsZClcclxuXHRcdH1cclxuXHRcdHN1cGVyLmFzc2VtYmxlKC4uLmFyZ3VtZW50cylcclxuXHR9XHJcblx0X3RvSmF2YXNjcmlwdChpUGFyYSl7XHJcblx0XHRyZXR1cm4gYCR7dGhpcy52YXJpYW50UGFyZW50Ll90b0phdmFzY3JpcHQoaVBhcmEpfSBpZigke3RoaXMuY29kZX0pYFxyXG5cdH1cclxufVxyXG4iXX0=