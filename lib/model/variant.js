"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _esprima = require("esprima");

var _esprima2 = _interopRequireDefault(_esprima);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Variant = function () {
	function Variant(node, code, children) {
		var _this = this;

		_classCallCheck(this, Variant);

		this.node = node;
		if (children) (this.children = children).forEach(function (a) {
			return a.parent = _this;
		});

		this.vId = "__" + this.constructor.type + "_" + node.id;
		this.parsedCode = code;
		this._initVariant();
	}

	_createClass(Variant, [{
		key: "_initVariant",
		value: function _initVariant() {
			this.variantParent = null;
			this.variantChildren = [];
			this.wDoc.beginVariant(this);

			this.variantParent.codeBlock.push({
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
							"name": "pre_assemble"
						}
					},
					"arguments": []
				}
			});

			this.variantParent.codeBlock.push(this.parsedCode);

			this.variantParent.codeBlock.push({
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
							"name": "post_assemble"
						}
					},
					"arguments": []
				}
			});
		}
	}, {
		key: "parse",
		value: function parse() {
			//Variant interface
			var r = _get(Variant.prototype.__proto__ || Object.getPrototypeOf(Variant.prototype), "parse", this).apply(this, arguments);
			this.wDoc.endVariant(this);
			return r;
		}
	}, {
		key: "visit",
		value: function visit() {
			//Visitor interface
			if (!this.wDoc.data) return;
			//this.assemble()
		}
	}, {
		key: "pre_assemble",
		value: function pre_assemble() {}
	}, {
		key: "post_assemble",
		value: function post_assemble() {
			var a = this.assembledXml;
			a && a.removeAttribute('id');
		}

		/**
  * assemble the variant Word model with data to a static word model 
  */

	}, {
		key: "assemble",
		value: function assemble() {
			this.docxPart.setChanged(true);
		}
	}, {
		key: "clear",
		value: function clear() {
			Array.from(this.assembledXml.$1('sdtContent').childNodes).forEach(function (child) {
				return child.parentNode.removeChild(child);
			});
		}
	}, {
		key: "toJs",
		value: function toJs() {
			var _this2 = this;

			return this.children.reduce(function (state, child) {
				state.push({
					"type": "ExpressionStatement",
					"expression": {
						"type": "CallExpression",
						"callee": {
							"type": "MemberExpression",
							"computed": false,
							"object": {
								"type": "Identifier",
								"name": _this2.vId
							},
							"property": {
								"type": "Identifier",
								"name": "pre_assemble"
							}
						},
						"arguments": []
					}
				});
				state.push(child.toJs());
				state.push({
					"type": "ExpressionStatement",
					"expression": {
						"type": "CallExpression",
						"callee": {
							"type": "MemberExpression",
							"computed": false,
							"object": {
								"type": "Identifier",
								"name": _this2.vId
							},
							"property": {
								"type": "Identifier",
								"name": "post_assemble"
							}
						},
						"arguments": []
					}
				});
			}, []);
		}
	}, {
		key: "assembledXml",
		set: function set(v) {
			this._assembledXml = v;
		},
		get: function get() {
			var a;
			if (this.isRootChild) return this._assembledXml || this.wXml;else if (a = this.variantParent.assembledXml) return a.querySelector("[id='" + this.vId + "']");
		}
	}]);

	return Variant;
}();

exports.default = Variant;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC92YXJpYW50LmpzIl0sIm5hbWVzIjpbIlZhcmlhbnQiLCJub2RlIiwiY29kZSIsImNoaWxkcmVuIiwiZm9yRWFjaCIsImEiLCJwYXJlbnQiLCJ2SWQiLCJjb25zdHJ1Y3RvciIsInR5cGUiLCJpZCIsInBhcnNlZENvZGUiLCJfaW5pdFZhcmlhbnQiLCJ2YXJpYW50UGFyZW50IiwidmFyaWFudENoaWxkcmVuIiwid0RvYyIsImJlZ2luVmFyaWFudCIsImNvZGVCbG9jayIsInB1c2giLCJyIiwiYXJndW1lbnRzIiwiZW5kVmFyaWFudCIsImRhdGEiLCJhc3NlbWJsZWRYbWwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJkb2N4UGFydCIsInNldENoYW5nZWQiLCJBcnJheSIsImZyb20iLCIkMSIsImNoaWxkTm9kZXMiLCJjaGlsZCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInJlZHVjZSIsInN0YXRlIiwidG9KcyIsInYiLCJfYXNzZW1ibGVkWG1sIiwiaXNSb290Q2hpbGQiLCJ3WG1sIiwicXVlcnlTZWxlY3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7OztJQUVxQkEsTztBQUNwQixrQkFBWUMsSUFBWixFQUFpQkMsSUFBakIsRUFBc0JDLFFBQXRCLEVBQStCO0FBQUE7O0FBQUE7O0FBQzlCLE9BQUtGLElBQUwsR0FBVUEsSUFBVjtBQUNBLE1BQUdFLFFBQUgsRUFDQyxDQUFDLEtBQUtBLFFBQUwsR0FBY0EsUUFBZixFQUF5QkMsT0FBekIsQ0FBaUM7QUFBQSxVQUFHQyxFQUFFQyxNQUFGLFFBQUg7QUFBQSxHQUFqQzs7QUFFRCxPQUFLQyxHQUFMLFVBQWMsS0FBS0MsV0FBTCxDQUFpQkMsSUFBL0IsU0FBdUNSLEtBQUtTLEVBQTVDO0FBQ0EsT0FBS0MsVUFBTCxHQUFnQlQsSUFBaEI7QUFDQSxPQUFLVSxZQUFMO0FBQ0E7Ozs7aUNBRWE7QUFDYixRQUFLQyxhQUFMLEdBQW1CLElBQW5CO0FBQ0EsUUFBS0MsZUFBTCxHQUFxQixFQUFyQjtBQUNBLFFBQUtDLElBQUwsQ0FBVUMsWUFBVixDQUF1QixJQUF2Qjs7QUFFQSxRQUFLSCxhQUFMLENBQW1CSSxTQUFuQixDQUE2QkMsSUFBN0IsQ0FBa0M7QUFDeEIsWUFBUSxxQkFEZ0I7QUFFeEIsa0JBQWM7QUFDVixhQUFRLGdCQURFO0FBRVYsZUFBVTtBQUNyQixjQUFRLGtCQURhO0FBRXJCLGtCQUFZLEtBRlM7QUFHckIsZ0JBQVU7QUFDVCxlQUFRLFlBREM7QUFFVCxlQUFRLEtBQUtYO0FBRkosT0FIVztBQU9yQixrQkFBWTtBQUNYLGVBQVEsWUFERztBQUVYLGVBQVE7QUFGRztBQVBTLE1BRkE7QUFjVixrQkFBYTtBQWRIO0FBRlUsSUFBbEM7O0FBcUJBLFFBQUtNLGFBQUwsQ0FBbUJJLFNBQW5CLENBQTZCQyxJQUE3QixDQUFrQyxLQUFLUCxVQUF2Qzs7QUFFQSxRQUFLRSxhQUFMLENBQW1CSSxTQUFuQixDQUE2QkMsSUFBN0IsQ0FBa0M7QUFDeEIsWUFBUSxxQkFEZ0I7QUFFeEIsa0JBQWM7QUFDVixhQUFRLGdCQURFO0FBRVYsZUFBVTtBQUNyQixjQUFRLGtCQURhO0FBRXJCLGtCQUFZLEtBRlM7QUFHckIsZ0JBQVU7QUFDVCxlQUFRLFlBREM7QUFFVCxlQUFRLEtBQUtYO0FBRkosT0FIVztBQU9yQixrQkFBWTtBQUNYLGVBQVEsWUFERztBQUVYLGVBQVE7QUFGRztBQVBTLE1BRkE7QUFjVixrQkFBYTtBQWRIO0FBRlUsSUFBbEM7QUFtQkE7OzswQkFFTTtBQUFDO0FBQ1AsT0FBSVksNkdBQWlCQyxTQUFqQixDQUFKO0FBQ0EsUUFBS0wsSUFBTCxDQUFVTSxVQUFWLENBQXFCLElBQXJCO0FBQ0EsVUFBT0YsQ0FBUDtBQUNBOzs7MEJBRU07QUFBQztBQUNQLE9BQUcsQ0FBQyxLQUFLSixJQUFMLENBQVVPLElBQWQsRUFDQztBQUNEO0FBQ0E7OztpQ0FFYSxDQUViOzs7a0NBRWM7QUFDZCxPQUFJakIsSUFBRSxLQUFLa0IsWUFBWDtBQUNBbEIsUUFBS0EsRUFBRW1CLGVBQUYsQ0FBa0IsSUFBbEIsQ0FBTDtBQUNBOztBQUVEOzs7Ozs7NkJBR1U7QUFDVCxRQUFLQyxRQUFMLENBQWNDLFVBQWQsQ0FBeUIsSUFBekI7QUFDQTs7OzBCQWNNO0FBQ05DLFNBQU1DLElBQU4sQ0FBVyxLQUFLTCxZQUFMLENBQWtCTSxFQUFsQixDQUFxQixZQUFyQixFQUFtQ0MsVUFBOUMsRUFDRTFCLE9BREYsQ0FDVTtBQUFBLFdBQU8yQixNQUFNQyxVQUFOLENBQWlCQyxXQUFqQixDQUE2QkYsS0FBN0IsQ0FBUDtBQUFBLElBRFY7QUFFQTs7O3lCQUVLO0FBQUE7O0FBQ0wsVUFBTyxLQUFLNUIsUUFBTCxDQUFjK0IsTUFBZCxDQUFxQixVQUFDQyxLQUFELEVBQVFKLEtBQVIsRUFBZ0I7QUFDM0NJLFVBQU1qQixJQUFOLENBQVc7QUFDVixhQUFRLHFCQURFO0FBRVYsbUJBQWM7QUFDYixjQUFRLGdCQURLO0FBRWIsZ0JBQVU7QUFDVCxlQUFRLGtCQURDO0FBRVQsbUJBQVksS0FGSDtBQUdULGlCQUFVO0FBQ1QsZ0JBQVEsWUFEQztBQUVULGdCQUFRLE9BQUtYO0FBRkosUUFIRDtBQU9ULG1CQUFZO0FBQ1gsZ0JBQVEsWUFERztBQUVYLGdCQUFRO0FBRkc7QUFQSCxPQUZHO0FBY2IsbUJBQWE7QUFkQTtBQUZKLEtBQVg7QUFtQkE0QixVQUFNakIsSUFBTixDQUFXYSxNQUFNSyxJQUFOLEVBQVg7QUFDQUQsVUFBTWpCLElBQU4sQ0FBVztBQUNWLGFBQVEscUJBREU7QUFFVixtQkFBYztBQUNiLGNBQVEsZ0JBREs7QUFFYixnQkFBVTtBQUNULGVBQVEsa0JBREM7QUFFVCxtQkFBWSxLQUZIO0FBR1QsaUJBQVU7QUFDVCxnQkFBUSxZQURDO0FBRVQsZ0JBQVEsT0FBS1g7QUFGSixRQUhEO0FBT1QsbUJBQVk7QUFDWCxnQkFBUSxZQURHO0FBRVgsZ0JBQVE7QUFGRztBQVBILE9BRkc7QUFjYixtQkFBYTtBQWRBO0FBRkosS0FBWDtBQW1CQSxJQXhDTSxFQXdDTCxFQXhDSyxDQUFQO0FBeUNBOzs7b0JBM0RnQjhCLEMsRUFBRTtBQUNsQixRQUFLQyxhQUFMLEdBQW1CRCxDQUFuQjtBQUNBLEc7c0JBRWlCO0FBQ2pCLE9BQUloQyxDQUFKO0FBQ0EsT0FBRyxLQUFLa0MsV0FBUixFQUNDLE9BQU8sS0FBS0QsYUFBTCxJQUFvQixLQUFLRSxJQUFoQyxDQURELEtBRUssSUFBR25DLElBQUUsS0FBS1EsYUFBTCxDQUFtQlUsWUFBeEIsRUFDSixPQUFPbEIsRUFBRW9DLGFBQUYsV0FBd0IsS0FBS2xDLEdBQTdCLFFBQVA7QUFDRDs7Ozs7O2tCQWxHbUJQLE8iLCJmaWxlIjoidmFyaWFudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBlc3ByaW1hIGZyb20gXCJlc3ByaW1hXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhcmlhbnR7XHJcblx0Y29uc3RydWN0b3Iobm9kZSxjb2RlLGNoaWxkcmVuKXtcclxuXHRcdHRoaXMubm9kZT1ub2RlXHJcblx0XHRpZihjaGlsZHJlbilcclxuXHRcdFx0KHRoaXMuY2hpbGRyZW49Y2hpbGRyZW4pLmZvckVhY2goYT0+YS5wYXJlbnQ9dGhpcylcclxuXHRcdFxyXG5cdFx0dGhpcy52SWQ9YF9fJHt0aGlzLmNvbnN0cnVjdG9yLnR5cGV9XyR7bm9kZS5pZH1gXHJcblx0XHR0aGlzLnBhcnNlZENvZGU9Y29kZVxyXG5cdFx0dGhpcy5faW5pdFZhcmlhbnQoKVxyXG5cdH1cclxuXHJcblx0X2luaXRWYXJpYW50KCl7XHJcblx0XHR0aGlzLnZhcmlhbnRQYXJlbnQ9bnVsbFxyXG5cdFx0dGhpcy52YXJpYW50Q2hpbGRyZW49W11cclxuXHRcdHRoaXMud0RvYy5iZWdpblZhcmlhbnQodGhpcylcclxuXHRcdFxyXG5cdFx0dGhpcy52YXJpYW50UGFyZW50LmNvZGVCbG9jay5wdXNoKHtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiRXhwcmVzc2lvblN0YXRlbWVudFwiLFxyXG4gICAgICAgICAgICBcImV4cHJlc3Npb25cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiQ2FsbEV4cHJlc3Npb25cIixcclxuICAgICAgICAgICAgICAgIFwiY2FsbGVlXCI6IHtcclxuXHRcdFx0XHRcdFwidHlwZVwiOiBcIk1lbWJlckV4cHJlc3Npb25cIixcclxuXHRcdFx0XHRcdFwiY29tcHV0ZWRcIjogZmFsc2UsXHJcblx0XHRcdFx0XHRcIm9iamVjdFwiOiB7XHJcblx0XHRcdFx0XHRcdFwidHlwZVwiOiBcIklkZW50aWZpZXJcIixcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IHRoaXMudklkXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XCJwcm9wZXJ0eVwiOiB7XHJcblx0XHRcdFx0XHRcdFwidHlwZVwiOiBcIklkZW50aWZpZXJcIixcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IFwicHJlX2Fzc2VtYmxlXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG4gICAgICAgICAgICAgICAgXCJhcmd1bWVudHNcIjogW11cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblx0XHRcclxuXHRcdFxyXG5cdFx0dGhpcy52YXJpYW50UGFyZW50LmNvZGVCbG9jay5wdXNoKHRoaXMucGFyc2VkQ29kZSlcclxuXHRcdFxyXG5cdFx0dGhpcy52YXJpYW50UGFyZW50LmNvZGVCbG9jay5wdXNoKHtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiRXhwcmVzc2lvblN0YXRlbWVudFwiLFxyXG4gICAgICAgICAgICBcImV4cHJlc3Npb25cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiQ2FsbEV4cHJlc3Npb25cIixcclxuICAgICAgICAgICAgICAgIFwiY2FsbGVlXCI6IHtcclxuXHRcdFx0XHRcdFwidHlwZVwiOiBcIk1lbWJlckV4cHJlc3Npb25cIixcclxuXHRcdFx0XHRcdFwiY29tcHV0ZWRcIjogZmFsc2UsXHJcblx0XHRcdFx0XHRcIm9iamVjdFwiOiB7XHJcblx0XHRcdFx0XHRcdFwidHlwZVwiOiBcIklkZW50aWZpZXJcIixcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IHRoaXMudklkXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XCJwcm9wZXJ0eVwiOiB7XHJcblx0XHRcdFx0XHRcdFwidHlwZVwiOiBcIklkZW50aWZpZXJcIixcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IFwicG9zdF9hc3NlbWJsZVwiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuICAgICAgICAgICAgICAgIFwiYXJndW1lbnRzXCI6IFtdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cdH1cclxuXHJcblx0cGFyc2UoKXsvL1ZhcmlhbnQgaW50ZXJmYWNlXHJcblx0XHR2YXIgcj1zdXBlci5wYXJzZSguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLndEb2MuZW5kVmFyaWFudCh0aGlzKVxyXG5cdFx0cmV0dXJuIHJcclxuXHR9XHJcblxyXG5cdHZpc2l0KCl7Ly9WaXNpdG9yIGludGVyZmFjZVxyXG5cdFx0aWYoIXRoaXMud0RvYy5kYXRhKVxyXG5cdFx0XHRyZXR1cm5cclxuXHRcdC8vdGhpcy5hc3NlbWJsZSgpXHJcblx0fVxyXG5cdFxyXG5cdHByZV9hc3NlbWJsZSgpe1xyXG5cdFx0XHJcblx0fVxyXG5cdFxyXG5cdHBvc3RfYXNzZW1ibGUoKXtcclxuXHRcdGxldCBhPXRoaXMuYXNzZW1ibGVkWG1sXHJcblx0XHRhICYmIGEucmVtb3ZlQXR0cmlidXRlKCdpZCcpXHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCogYXNzZW1ibGUgdGhlIHZhcmlhbnQgV29yZCBtb2RlbCB3aXRoIGRhdGEgdG8gYSBzdGF0aWMgd29yZCBtb2RlbCBcclxuXHQqL1xyXG5cdGFzc2VtYmxlKCl7XHJcblx0XHR0aGlzLmRvY3hQYXJ0LnNldENoYW5nZWQodHJ1ZSlcclxuXHR9XHJcblx0XHJcblx0c2V0IGFzc2VtYmxlZFhtbCh2KXtcclxuXHRcdHRoaXMuX2Fzc2VtYmxlZFhtbD12XHJcblx0fVxyXG5cdFxyXG5cdGdldCBhc3NlbWJsZWRYbWwoKXtcclxuXHRcdHZhciBhO1xyXG5cdFx0aWYodGhpcy5pc1Jvb3RDaGlsZClcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2Fzc2VtYmxlZFhtbHx8dGhpcy53WG1sXHJcblx0XHRlbHNlIGlmKGE9dGhpcy52YXJpYW50UGFyZW50LmFzc2VtYmxlZFhtbClcclxuXHRcdFx0cmV0dXJuIGEucXVlcnlTZWxlY3RvcihgW2lkPScke3RoaXMudklkfSddYClcclxuXHR9XHJcblx0XHJcblx0Y2xlYXIoKXtcclxuXHRcdEFycmF5LmZyb20odGhpcy5hc3NlbWJsZWRYbWwuJDEoJ3NkdENvbnRlbnQnKS5jaGlsZE5vZGVzKVxyXG5cdFx0XHQuZm9yRWFjaChjaGlsZD0+Y2hpbGQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjaGlsZCkpXHJcblx0fVxyXG5cdFxyXG5cdHRvSnMoKXtcclxuXHRcdHJldHVybiB0aGlzLmNoaWxkcmVuLnJlZHVjZSgoc3RhdGUsIGNoaWxkKT0+e1xyXG5cdFx0XHRzdGF0ZS5wdXNoKHtcclxuXHRcdFx0XHRcInR5cGVcIjogXCJFeHByZXNzaW9uU3RhdGVtZW50XCIsXHJcblx0XHRcdFx0XCJleHByZXNzaW9uXCI6IHtcclxuXHRcdFx0XHRcdFwidHlwZVwiOiBcIkNhbGxFeHByZXNzaW9uXCIsXHJcblx0XHRcdFx0XHRcImNhbGxlZVwiOiB7XHJcblx0XHRcdFx0XHRcdFwidHlwZVwiOiBcIk1lbWJlckV4cHJlc3Npb25cIixcclxuXHRcdFx0XHRcdFx0XCJjb21wdXRlZFwiOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0XCJvYmplY3RcIjoge1xyXG5cdFx0XHRcdFx0XHRcdFwidHlwZVwiOiBcIklkZW50aWZpZXJcIixcclxuXHRcdFx0XHRcdFx0XHRcIm5hbWVcIjogdGhpcy52SWRcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XCJwcm9wZXJ0eVwiOiB7XHJcblx0XHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFx0XHRcdFwibmFtZVwiOiBcInByZV9hc3NlbWJsZVwiXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcImFyZ3VtZW50c1wiOiBbXVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdFx0c3RhdGUucHVzaChjaGlsZC50b0pzKCkpXHJcblx0XHRcdHN0YXRlLnB1c2goe1xyXG5cdFx0XHRcdFwidHlwZVwiOiBcIkV4cHJlc3Npb25TdGF0ZW1lbnRcIixcclxuXHRcdFx0XHRcImV4cHJlc3Npb25cIjoge1xyXG5cdFx0XHRcdFx0XCJ0eXBlXCI6IFwiQ2FsbEV4cHJlc3Npb25cIixcclxuXHRcdFx0XHRcdFwiY2FsbGVlXCI6IHtcclxuXHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiTWVtYmVyRXhwcmVzc2lvblwiLFxyXG5cdFx0XHRcdFx0XHRcImNvbXB1dGVkXCI6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcIm9iamVjdFwiOiB7XHJcblx0XHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFx0XHRcdFwibmFtZVwiOiB0aGlzLnZJZFxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcInByb3BlcnR5XCI6IHtcclxuXHRcdFx0XHRcdFx0XHRcInR5cGVcIjogXCJJZGVudGlmaWVyXCIsXHJcblx0XHRcdFx0XHRcdFx0XCJuYW1lXCI6IFwicG9zdF9hc3NlbWJsZVwiXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcImFyZ3VtZW50c1wiOiBbXVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH0sW10pXHJcblx0fVxyXG59XHJcbiJdfQ==