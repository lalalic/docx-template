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

		return _possibleConstructorReturn(this, (If.__proto__ || Object.getPrototypeOf(If)).apply(this, arguments));
	}

	_createClass(If, [{
		key: "_initVariant",
		value: function _initVariant() {
			_get(If.prototype.__proto__ || Object.getPrototypeOf(If.prototype), "_initVariant", this).call(this);

			this.codeBlock = this.parsedCode.body[0].consequent.body;
			while (!Array.isArray(this.codeBlock)) {
				//if()with(){}
				this.codeBlock = this.codeBlock.body;
			} /*if(...){assemble(true),...}else assemble(false)*/
			this.codeBlock.push({
				"type": "ExpressionStatement",
				"expression": {
					"type": "CallExpression",
					"callee": {
						"type": "MemberExpression",
						"computed": false,
						"object": {
							"type": "Identifier",
							"name": this.vId
						},
						"property": {
							"type": "Identifier",
							"name": "assemble"
						}
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
						"type": "MemberExpression",
						"computed": false,
						"object": {
							"type": "Identifier",
							"name": this.vId
						},
						"property": {
							"type": "Identifier",
							"name": "assemble"
						}
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
				_get(If.prototype.__proto__ || Object.getPrototypeOf(If.prototype), "assemble", this).apply(this, arguments);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9faWYuanMiXSwibmFtZXMiOlsiSWYiLCJjb2RlQmxvY2siLCJwYXJzZWRDb2RlIiwiYm9keSIsImNvbnNlcXVlbnQiLCJBcnJheSIsImlzQXJyYXkiLCJwdXNoIiwidklkIiwiYWx0ZXJuYXRlIiwic2F0aWZpZWQiLCJjbGVhciIsImFyZ3VtZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEU7Ozs7Ozs7Ozs7O2lDQUVOO0FBQ2I7O0FBRUEsUUFBS0MsU0FBTCxHQUFlLEtBQUtDLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCLENBQXJCLEVBQXdCQyxVQUF4QixDQUFtQ0QsSUFBbEQ7QUFDQSxVQUFNLENBQUNFLE1BQU1DLE9BQU4sQ0FBYyxLQUFLTCxTQUFuQixDQUFQO0FBQXFDO0FBQ3BDLFNBQUtBLFNBQUwsR0FBZSxLQUFLQSxTQUFMLENBQWVFLElBQTlCO0FBREQsSUFKYSxDQVFiO0FBQ0EsUUFBS0YsU0FBTCxDQUFlTSxJQUFmLENBQW9CO0FBQ25CLFlBQVEscUJBRFc7QUFFbkIsa0JBQWM7QUFDYixhQUFRLGdCQURLO0FBRWIsZUFBVTtBQUNULGNBQVEsa0JBREM7QUFFVCxrQkFBWSxLQUZIO0FBR1QsZ0JBQVU7QUFDVCxlQUFRLFlBREM7QUFFVCxlQUFRLEtBQUtDO0FBRkosT0FIRDtBQU9ULGtCQUFZO0FBQ1gsZUFBUSxZQURHO0FBRVgsZUFBUTtBQUZHO0FBUEgsTUFGRztBQWNiLGtCQUFhLENBQ1o7QUFDQyxjQUFRLFNBRFQ7QUFFQyxlQUFTLElBRlY7QUFHQyxhQUFPO0FBSFIsTUFEWTtBQWRBO0FBRkssSUFBcEI7O0FBMEJBLFFBQUtOLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCLENBQXJCLEVBQXdCTSxTQUF4QixHQUFrQztBQUNqQyxZQUFRLHFCQUR5QjtBQUVqQyxrQkFBYztBQUNiLGFBQVEsZ0JBREs7QUFFYixlQUFVO0FBQ1QsY0FBUSxrQkFEQztBQUVULGtCQUFZLEtBRkg7QUFHVCxnQkFBVTtBQUNULGVBQVEsWUFEQztBQUVULGVBQVEsS0FBS0Q7QUFGSixPQUhEO0FBT1Qsa0JBQVk7QUFDWCxlQUFRLFlBREc7QUFFWCxlQUFRO0FBRkc7QUFQSCxNQUZHO0FBY2Isa0JBQWEsQ0FDWjtBQUNDLGNBQVEsU0FEVDtBQUVDLGVBQVMsS0FGVjtBQUdDLGFBQU87QUFIUixNQURZO0FBZEE7QUFGbUIsSUFBbEM7QUF5QkE7OzsyQkFFUUUsUSxFQUFTO0FBQ2pCLE9BQUcsQ0FBQ0EsUUFBSixFQUFhO0FBQ1osU0FBS0MsS0FBTDtBQUNBLHNHQUFrQkMsU0FBbEI7QUFDQSxJQUhELE1BR0s7QUFDSjtBQUNBO0FBQ0Q7OztzQkF0RWdCO0FBQUMsVUFBTSxZQUFOO0FBQW1COzs7Ozs7a0JBRGpCWixFIiwiZmlsZSI6Il9pZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWYXJpYW50IGZyb20gXCIuL3ZhcmlhbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWYgZXh0ZW5kcyBWYXJpYW50e1xyXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVyblwidmFyaWFudC5pZlwifVxyXG5cdF9pbml0VmFyaWFudCgpe1xyXG5cdFx0c3VwZXIuX2luaXRWYXJpYW50KClcclxuXHRcdFxyXG5cdFx0dGhpcy5jb2RlQmxvY2s9dGhpcy5wYXJzZWRDb2RlLmJvZHlbMF0uY29uc2VxdWVudC5ib2R5XHJcblx0XHR3aGlsZSghQXJyYXkuaXNBcnJheSh0aGlzLmNvZGVCbG9jaykpLy9pZigpd2l0aCgpe31cclxuXHRcdFx0dGhpcy5jb2RlQmxvY2s9dGhpcy5jb2RlQmxvY2suYm9keVxyXG5cdFx0XHRcclxuXHRcdFxyXG5cdFx0LyppZiguLi4pe2Fzc2VtYmxlKHRydWUpLC4uLn1lbHNlIGFzc2VtYmxlKGZhbHNlKSovXHJcblx0XHR0aGlzLmNvZGVCbG9jay5wdXNoKHtcclxuXHRcdFx0XCJ0eXBlXCI6IFwiRXhwcmVzc2lvblN0YXRlbWVudFwiLFxyXG5cdFx0XHRcImV4cHJlc3Npb25cIjoge1xyXG5cdFx0XHRcdFwidHlwZVwiOiBcIkNhbGxFeHByZXNzaW9uXCIsXHJcblx0XHRcdFx0XCJjYWxsZWVcIjoge1xyXG5cdFx0XHRcdFx0XCJ0eXBlXCI6IFwiTWVtYmVyRXhwcmVzc2lvblwiLFxyXG5cdFx0XHRcdFx0XCJjb21wdXRlZFwiOiBmYWxzZSxcclxuXHRcdFx0XHRcdFwib2JqZWN0XCI6IHtcclxuXHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogdGhpcy52SWRcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcInByb3BlcnR5XCI6IHtcclxuXHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogXCJhc3NlbWJsZVwiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRcImFyZ3VtZW50c1wiOiBbXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFwidHlwZVwiOiBcIkxpdGVyYWxcIixcclxuXHRcdFx0XHRcdFx0XCJ2YWx1ZVwiOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcInJhd1wiOiBcImZhbHNlXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRdXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHRcclxuXHRcdHRoaXMucGFyc2VkQ29kZS5ib2R5WzBdLmFsdGVybmF0ZT17XHJcblx0XHRcdFwidHlwZVwiOiBcIkV4cHJlc3Npb25TdGF0ZW1lbnRcIixcclxuXHRcdFx0XCJleHByZXNzaW9uXCI6IHtcclxuXHRcdFx0XHRcInR5cGVcIjogXCJDYWxsRXhwcmVzc2lvblwiLFxyXG5cdFx0XHRcdFwiY2FsbGVlXCI6IHtcclxuXHRcdFx0XHRcdFwidHlwZVwiOiBcIk1lbWJlckV4cHJlc3Npb25cIixcclxuXHRcdFx0XHRcdFwiY29tcHV0ZWRcIjogZmFsc2UsXHJcblx0XHRcdFx0XHRcIm9iamVjdFwiOiB7XHJcblx0XHRcdFx0XHRcdFwidHlwZVwiOiBcIklkZW50aWZpZXJcIixcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IHRoaXMudklkXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XCJwcm9wZXJ0eVwiOiB7XHJcblx0XHRcdFx0XHRcdFwidHlwZVwiOiBcIklkZW50aWZpZXJcIixcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IFwiYXNzZW1ibGVcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0XCJhcmd1bWVudHNcIjogW1xyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcInR5cGVcIjogXCJMaXRlcmFsXCIsXHJcblx0XHRcdFx0XHRcdFwidmFsdWVcIjogZmFsc2UsXHJcblx0XHRcdFx0XHRcdFwicmF3XCI6IFwiZmFsc2VcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXNzZW1ibGUoc2F0aWZpZWQpe1xyXG5cdFx0aWYoIXNhdGlmaWVkKXtcclxuXHRcdFx0dGhpcy5jbGVhcigpXHJcblx0XHRcdHN1cGVyLmFzc2VtYmxlKC4uLmFyZ3VtZW50cylcclxuXHRcdH1lbHNle1xyXG5cdFx0XHQvL2tlZXAgaXRcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIl19