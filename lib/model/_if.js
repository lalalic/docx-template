"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _variant = require("./variant");

var _variant2 = _interopRequireDefault(_variant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var If = function (_Variant) {
	(0, _inherits3.default)(If, _Variant);

	function If() {
		(0, _classCallCheck3.default)(this, If);
		return (0, _possibleConstructorReturn3.default)(this, (If.__proto__ || (0, _getPrototypeOf2.default)(If)).apply(this, arguments));
	}

	(0, _createClass3.default)(If, [{
		key: "_initVariant",
		value: function _initVariant() {
			(0, _get3.default)(If.prototype.__proto__ || (0, _getPrototypeOf2.default)(If.prototype), "_initVariant", this).call(this);

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
				(0, _get3.default)(If.prototype.__proto__ || (0, _getPrototypeOf2.default)(If.prototype), "assemble", this).apply(this, arguments);
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
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9faWYuanMiXSwibmFtZXMiOlsiSWYiLCJjb2RlQmxvY2siLCJwYXJzZWRDb2RlIiwiYm9keSIsImNvbnNlcXVlbnQiLCJBcnJheSIsImlzQXJyYXkiLCJwdXNoIiwidklkIiwiYWx0ZXJuYXRlIiwic2F0aWZpZWQiLCJjbGVhciIsImFyZ3VtZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVxQkEsRTs7Ozs7Ozs7OztpQ0FFTjtBQUNiOztBQUVBLFFBQUtDLFNBQUwsR0FBZSxLQUFLQyxVQUFMLENBQWdCQyxJQUFoQixDQUFxQixDQUFyQixFQUF3QkMsVUFBeEIsQ0FBbUNELElBQWxEO0FBQ0EsVUFBTSxDQUFDRSxNQUFNQyxPQUFOLENBQWMsS0FBS0wsU0FBbkIsQ0FBUDtBQUFxQztBQUNwQyxTQUFLQSxTQUFMLEdBQWUsS0FBS0EsU0FBTCxDQUFlRSxJQUE5QjtBQURELElBSmEsQ0FRYjtBQUNBLFFBQUtGLFNBQUwsQ0FBZU0sSUFBZixDQUFvQjtBQUNuQixZQUFRLHFCQURXO0FBRW5CLGtCQUFjO0FBQ2IsYUFBUSxnQkFESztBQUViLGVBQVU7QUFDVCxjQUFRLGtCQURDO0FBRVQsa0JBQVksS0FGSDtBQUdULGdCQUFVO0FBQ1QsZUFBUSxZQURDO0FBRVQsZUFBUSxLQUFLQztBQUZKLE9BSEQ7QUFPVCxrQkFBWTtBQUNYLGVBQVEsWUFERztBQUVYLGVBQVE7QUFGRztBQVBILE1BRkc7QUFjYixrQkFBYSxDQUNaO0FBQ0MsY0FBUSxTQURUO0FBRUMsZUFBUyxJQUZWO0FBR0MsYUFBTztBQUhSLE1BRFk7QUFkQTtBQUZLLElBQXBCOztBQTBCQSxRQUFLTixVQUFMLENBQWdCQyxJQUFoQixDQUFxQixDQUFyQixFQUF3Qk0sU0FBeEIsR0FBa0M7QUFDakMsWUFBUSxxQkFEeUI7QUFFakMsa0JBQWM7QUFDYixhQUFRLGdCQURLO0FBRWIsZUFBVTtBQUNULGNBQVEsa0JBREM7QUFFVCxrQkFBWSxLQUZIO0FBR1QsZ0JBQVU7QUFDVCxlQUFRLFlBREM7QUFFVCxlQUFRLEtBQUtEO0FBRkosT0FIRDtBQU9ULGtCQUFZO0FBQ1gsZUFBUSxZQURHO0FBRVgsZUFBUTtBQUZHO0FBUEgsTUFGRztBQWNiLGtCQUFhLENBQ1o7QUFDQyxjQUFRLFNBRFQ7QUFFQyxlQUFTLEtBRlY7QUFHQyxhQUFPO0FBSFIsTUFEWTtBQWRBO0FBRm1CLElBQWxDO0FBeUJBOzs7MkJBRVFFLFEsRUFBUztBQUNqQixPQUFHLENBQUNBLFFBQUosRUFBYTtBQUNaLFNBQUtDLEtBQUw7QUFDQSw0SEFBa0JDLFNBQWxCO0FBQ0EsSUFIRCxNQUdLO0FBQ0o7QUFDQTtBQUNEOzs7c0JBdEVnQjtBQUFDLFVBQU0sWUFBTjtBQUFtQjs7Ozs7a0JBRGpCWixFIiwiZmlsZSI6Il9pZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWYXJpYW50IGZyb20gXCIuL3ZhcmlhbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWYgZXh0ZW5kcyBWYXJpYW50e1xyXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVyblwidmFyaWFudC5pZlwifVxyXG5cdF9pbml0VmFyaWFudCgpe1xyXG5cdFx0c3VwZXIuX2luaXRWYXJpYW50KClcclxuXHRcdFxyXG5cdFx0dGhpcy5jb2RlQmxvY2s9dGhpcy5wYXJzZWRDb2RlLmJvZHlbMF0uY29uc2VxdWVudC5ib2R5XHJcblx0XHR3aGlsZSghQXJyYXkuaXNBcnJheSh0aGlzLmNvZGVCbG9jaykpLy9pZigpd2l0aCgpe31cclxuXHRcdFx0dGhpcy5jb2RlQmxvY2s9dGhpcy5jb2RlQmxvY2suYm9keVxyXG5cdFx0XHRcclxuXHRcdFxyXG5cdFx0LyppZiguLi4pe2Fzc2VtYmxlKHRydWUpLC4uLn1lbHNlIGFzc2VtYmxlKGZhbHNlKSovXHJcblx0XHR0aGlzLmNvZGVCbG9jay5wdXNoKHtcclxuXHRcdFx0XCJ0eXBlXCI6IFwiRXhwcmVzc2lvblN0YXRlbWVudFwiLFxyXG5cdFx0XHRcImV4cHJlc3Npb25cIjoge1xyXG5cdFx0XHRcdFwidHlwZVwiOiBcIkNhbGxFeHByZXNzaW9uXCIsXHJcblx0XHRcdFx0XCJjYWxsZWVcIjoge1xyXG5cdFx0XHRcdFx0XCJ0eXBlXCI6IFwiTWVtYmVyRXhwcmVzc2lvblwiLFxyXG5cdFx0XHRcdFx0XCJjb21wdXRlZFwiOiBmYWxzZSxcclxuXHRcdFx0XHRcdFwib2JqZWN0XCI6IHtcclxuXHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogdGhpcy52SWRcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcInByb3BlcnR5XCI6IHtcclxuXHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogXCJhc3NlbWJsZVwiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRcImFyZ3VtZW50c1wiOiBbXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFwidHlwZVwiOiBcIkxpdGVyYWxcIixcclxuXHRcdFx0XHRcdFx0XCJ2YWx1ZVwiOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcInJhd1wiOiBcImZhbHNlXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRdXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHRcclxuXHRcdHRoaXMucGFyc2VkQ29kZS5ib2R5WzBdLmFsdGVybmF0ZT17XHJcblx0XHRcdFwidHlwZVwiOiBcIkV4cHJlc3Npb25TdGF0ZW1lbnRcIixcclxuXHRcdFx0XCJleHByZXNzaW9uXCI6IHtcclxuXHRcdFx0XHRcInR5cGVcIjogXCJDYWxsRXhwcmVzc2lvblwiLFxyXG5cdFx0XHRcdFwiY2FsbGVlXCI6IHtcclxuXHRcdFx0XHRcdFwidHlwZVwiOiBcIk1lbWJlckV4cHJlc3Npb25cIixcclxuXHRcdFx0XHRcdFwiY29tcHV0ZWRcIjogZmFsc2UsXHJcblx0XHRcdFx0XHRcIm9iamVjdFwiOiB7XHJcblx0XHRcdFx0XHRcdFwidHlwZVwiOiBcIklkZW50aWZpZXJcIixcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IHRoaXMudklkXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XCJwcm9wZXJ0eVwiOiB7XHJcblx0XHRcdFx0XHRcdFwidHlwZVwiOiBcIklkZW50aWZpZXJcIixcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IFwiYXNzZW1ibGVcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0XCJhcmd1bWVudHNcIjogW1xyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcInR5cGVcIjogXCJMaXRlcmFsXCIsXHJcblx0XHRcdFx0XHRcdFwidmFsdWVcIjogZmFsc2UsXHJcblx0XHRcdFx0XHRcdFwicmF3XCI6IFwiZmFsc2VcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXNzZW1ibGUoc2F0aWZpZWQpe1xyXG5cdFx0aWYoIXNhdGlmaWVkKXtcclxuXHRcdFx0dGhpcy5jbGVhcigpXHJcblx0XHRcdHN1cGVyLmFzc2VtYmxlKC4uLmFyZ3VtZW50cylcclxuXHRcdH1lbHNle1xyXG5cdFx0XHQvL2tlZXAgaXRcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIl19