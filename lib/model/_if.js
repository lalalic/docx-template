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
			_get(Object.getPrototypeOf(If.prototype), "_initVariant", this).call(this);

			this.codeBlock = this.parsedCode.body[0].consequent.body;
			while (!Array.isArray(this.codeBlock)) {
				//if()with(){}
				this.codeBlock = this.codeBlock.body;
			} /*if(...){assemble(true),...}else assemble(false)*/
			var assemble_name = "assemble_" + this.vId;
			this.codeBlock.push({
				"type": "ExpressionStatement",
				"expression": {
					"type": "CallExpression",
					"callee": {
						"type": "Identifier",
						"name": assemble_name
					},
					"arguments": [{
						"type": "Literal",
						"value": true,
						"raw": "false"
					}]
				}
			});

			this.parsedCode.body[0].alternate = {
				"type": "ExpressionStatement",
				"expression": {
					"type": "CallExpression",
					"callee": {
						"type": "Identifier",
						"name": assemble_name
					},
					"arguments": [{
						"type": "Literal",
						"value": false,
						"raw": "false"
					}]
				}
			};
		}
	}, {
		key: "assemble",
		value: function assemble(satified) {
			if (!satified) {
				this.clear();
				_get(Object.getPrototypeOf(If.prototype), "assemble", this).apply(this, arguments);
			} else {
				//keep it
			}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9faWYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7O2lDQUVOO0FBQ2IsOEJBSG1CLCtDQUduQixDQURhOztBQUdiLFFBQUssU0FBTCxHQUFlLEtBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQixDQUFyQixFQUF3QixVQUF4QixDQUFtQyxJQUFuQyxDQUhGO0FBSWIsVUFBTSxDQUFDLE1BQU0sT0FBTixDQUFjLEtBQUssU0FBTCxDQUFmOztBQUNMLFNBQUssU0FBTCxHQUFlLEtBQUssU0FBTCxDQUFlLElBQWY7SUFEaEI7QUFKYSxPQVNULGdCQUFjLGNBQVksS0FBSyxHQUFMLENBVGpCO0FBVWIsUUFBSyxTQUFMLENBQWUsSUFBZixDQUFvQjtBQUNuQixZQUFRLHFCQUFSO0FBQ0Esa0JBQWM7QUFDYixhQUFRLGdCQUFSO0FBQ0EsZUFBVTtBQUNULGNBQVEsWUFBUjtBQUNBLGNBQVEsYUFBUjtNQUZEO0FBSUEsa0JBQWEsQ0FDWjtBQUNDLGNBQVEsU0FBUjtBQUNBLGVBQVMsSUFBVDtBQUNBLGFBQU8sT0FBUDtNQUpXLENBQWI7S0FORDtJQUZELEVBVmE7O0FBNEJiLFFBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQixDQUFyQixFQUF3QixTQUF4QixHQUFrQztBQUNqQyxZQUFRLHFCQUFSO0FBQ0Esa0JBQWM7QUFDYixhQUFRLGdCQUFSO0FBQ0EsZUFBVTtBQUNULGNBQVEsWUFBUjtBQUNBLGNBQVEsYUFBUjtNQUZEO0FBSUEsa0JBQWEsQ0FDWjtBQUNDLGNBQVEsU0FBUjtBQUNBLGVBQVMsS0FBVDtBQUNBLGFBQU8sT0FBUDtNQUpXLENBQWI7S0FORDtJQUZELENBNUJhOzs7OzJCQStDTCxVQUFTO0FBQ2pCLE9BQUcsQ0FBQyxRQUFELEVBQVU7QUFDWixTQUFLLEtBQUwsR0FEWTtBQUVaLCtCQXBEa0IsNkNBb0RBLFVBQWxCLENBRlk7SUFBYixNQUdLOztJQUhMOzs7O3NCQWpEZ0I7QUFBQyxVQUFNLFlBQU4sQ0FBRDs7OztRQURHIiwiZmlsZSI6Il9pZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWYXJpYW50IGZyb20gXCIuL3ZhcmlhbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWYgZXh0ZW5kcyBWYXJpYW50e1xyXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVyblwidmFyaWFudC5pZlwifVxyXG5cdF9pbml0VmFyaWFudCgpe1xyXG5cdFx0c3VwZXIuX2luaXRWYXJpYW50KClcclxuXHRcdFxyXG5cdFx0dGhpcy5jb2RlQmxvY2s9dGhpcy5wYXJzZWRDb2RlLmJvZHlbMF0uY29uc2VxdWVudC5ib2R5XHJcblx0XHR3aGlsZSghQXJyYXkuaXNBcnJheSh0aGlzLmNvZGVCbG9jaykpLy9pZigpd2l0aCgpe31cclxuXHRcdFx0dGhpcy5jb2RlQmxvY2s9dGhpcy5jb2RlQmxvY2suYm9keVxyXG5cdFx0XHRcclxuXHRcdFxyXG5cdFx0LyppZiguLi4pe2Fzc2VtYmxlKHRydWUpLC4uLn1lbHNlIGFzc2VtYmxlKGZhbHNlKSovXHJcblx0XHRsZXQgYXNzZW1ibGVfbmFtZT1cImFzc2VtYmxlX1wiK3RoaXMudklkXHJcblx0XHR0aGlzLmNvZGVCbG9jay5wdXNoKHtcclxuXHRcdFx0XCJ0eXBlXCI6IFwiRXhwcmVzc2lvblN0YXRlbWVudFwiLFxyXG5cdFx0XHRcImV4cHJlc3Npb25cIjoge1xyXG5cdFx0XHRcdFwidHlwZVwiOiBcIkNhbGxFeHByZXNzaW9uXCIsXHJcblx0XHRcdFx0XCJjYWxsZWVcIjoge1xyXG5cdFx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFx0XCJuYW1lXCI6IGFzc2VtYmxlX25hbWVcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdFwiYXJndW1lbnRzXCI6IFtcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiTGl0ZXJhbFwiLFxyXG5cdFx0XHRcdFx0XHRcInZhbHVlXCI6IHRydWUsXHJcblx0XHRcdFx0XHRcdFwicmF3XCI6IFwiZmFsc2VcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHRcdFxyXG5cdFx0dGhpcy5wYXJzZWRDb2RlLmJvZHlbMF0uYWx0ZXJuYXRlPXtcclxuXHRcdFx0XCJ0eXBlXCI6IFwiRXhwcmVzc2lvblN0YXRlbWVudFwiLFxyXG5cdFx0XHRcImV4cHJlc3Npb25cIjoge1xyXG5cdFx0XHRcdFwidHlwZVwiOiBcIkNhbGxFeHByZXNzaW9uXCIsXHJcblx0XHRcdFx0XCJjYWxsZWVcIjoge1xyXG5cdFx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFx0XCJuYW1lXCI6IGFzc2VtYmxlX25hbWVcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdFwiYXJndW1lbnRzXCI6IFtcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiTGl0ZXJhbFwiLFxyXG5cdFx0XHRcdFx0XHRcInZhbHVlXCI6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcInJhd1wiOiBcImZhbHNlXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRdXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzc2VtYmxlKHNhdGlmaWVkKXtcclxuXHRcdGlmKCFzYXRpZmllZCl7XHJcblx0XHRcdHRoaXMuY2xlYXIoKVxyXG5cdFx0XHRzdXBlci5hc3NlbWJsZSguLi5hcmd1bWVudHMpXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0Ly9rZWVwIGl0XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==