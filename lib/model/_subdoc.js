"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _escodegen = require("escodegen");

var _escodegen2 = _interopRequireDefault(_escodegen);

var _isomorphicFetch = require("isomorphic-fetch");

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _variant = require("./variant");

var _variant2 = _interopRequireDefault(_variant);

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var babel = require("babel-core");
var esprima = require("esprima");

var SubDoc = function (_Variant) {
	_inherits(SubDoc, _Variant);

	function SubDoc(node, data) {
		_classCallCheck(this, SubDoc);

		var _this = _possibleConstructorReturn(this, (SubDoc.__proto__ || Object.getPrototypeOf(SubDoc)).call(this, node));

		_this.data = data;
		_this.code = esprima.parse("async function assemble(){\n\t\t\t\tlet node=$('" + _this.selector + "')\n\t\t\t\tlet varDocInfo=await " + _this.object + ".parse(docx, node)\n\t\t\t\tif(varDocInfo){\n\t\t\t\t\tlet {varDoc, variants, code}=varDocInfo\n\t\t\t\t\tlet targetDoc=varDoc.docx.clone()\n\t\t\t\t\tlet subdoc=eval(\"(function(docx, __variants,$){\"+code+\"})\")\n\t\t\t\t\tlet staticDoc=await subdoc(targetDoc,variants,targetDoc.officeDocument.content)\n\t\t\t\t\tif(!__opt.clearWrap){\n\t\t\t\t\t\tstaticDoc.officeDocument.content(\"[" + _variant.ID + "]\").removeAttr(\"" + _variant.ID + "\")\n\t\t\t\t\t}\n\t\t\t\t\tlet zip=staticDoc.serialize()\n\t\t\t\t\tlet data=zip.generate({type:\"nodebuffer\"})\n\t\t\t\t\t" + _this.object + ".assemble(docx, node, data)\n\t\t\t\t}\n\t\t\t}").body[0].body;
		return _this;
	}

	_createClass(SubDoc, [{
		key: "parse",
		value: function parse(docx, node) {
			var _this2 = this;

			return _2.default.parse(this.data).then(function (varDoc) {
				if (!varDoc) {
					node.remove();
				} else if (varDoc.children.length == 0) {
					_this2.assemble(docx, node, _this2.data);
				} else {
					var variants = varDoc.variants;
					var code = varDoc.js({});
					return { varDoc: varDoc, code: code, variants: variants };
				}
			});
		}
	}, {
		key: "assemble",
		value: function assemble(docx, node, subdoc) {
			var rId = docx.officeDocument.addChunk(subdoc);
			node.replaceWith("<w:altChunk r:id=\"" + rId + "\"/>");
		}
	}]);

	return SubDoc;
}(_variant2.default);

SubDoc.type = "variant.subdoc";
exports.default = SubDoc;

var Dynamic = function (_SubDoc) {
	_inherits(Dynamic, _SubDoc);

	function Dynamic(node, code) {
		_classCallCheck(this, Dynamic);

		//let varDocInfo=await __variants.a0.parse(docx, node, value)
		var _this3 = _possibleConstructorReturn(this, (Dynamic.__proto__ || Object.getPrototypeOf(Dynamic)).call(this, node, null));

		_this3.code.body[1].declarations[0].init.argument.arguments.push(code); //for value
		return _this3;
	}

	_createClass(Dynamic, [{
		key: "parse",
		value: function parse(docx, node, value) {
			var _this4 = this;

			if (value === null || value === undefined || value === '') {
				return Promise.resolve();
			} else {
				return (0, _isomorphicFetch2.default)(value).then(function (data) {
					if (!data) {
						console.error("no data at " + value);
					} else {
						_this4.data = data;
						return _get(Dynamic.prototype.__proto__ || Object.getPrototypeOf(Dynamic.prototype), "parse", _this4).call(_this4, docx, node);
					}
				}, function (e) {
					console.error(e);
				});
			}
		}
	}, {
		key: "assemble",
		value: function assemble() {
			_get(Dynamic.prototype.__proto__ || Object.getPrototypeOf(Dynamic.prototype), "assemble", this).apply(this, arguments);
			delete this.data;
		}
	}]);

	return Dynamic;
}(SubDoc);

SubDoc.Dynamic = Dynamic;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fc3ViZG9jLmpzIl0sIm5hbWVzIjpbImJhYmVsIiwicmVxdWlyZSIsImVzcHJpbWEiLCJTdWJEb2MiLCJub2RlIiwiZGF0YSIsImNvZGUiLCJwYXJzZSIsInNlbGVjdG9yIiwib2JqZWN0IiwiYm9keSIsImRvY3giLCJ0aGVuIiwidmFyRG9jIiwicmVtb3ZlIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJhc3NlbWJsZSIsInZhcmlhbnRzIiwianMiLCJzdWJkb2MiLCJySWQiLCJvZmZpY2VEb2N1bWVudCIsImFkZENodW5rIiwicmVwbGFjZVdpdGgiLCJ0eXBlIiwiRHluYW1pYyIsImRlY2xhcmF0aW9ucyIsImluaXQiLCJhcmd1bWVudCIsImFyZ3VtZW50cyIsInB1c2giLCJ2YWx1ZSIsInVuZGVmaW5lZCIsIlByb21pc2UiLCJyZXNvbHZlIiwiY29uc29sZSIsImVycm9yIiwiZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7QUFQQSxJQUFNQSxRQUFRQyxRQUFRLFlBQVIsQ0FBZDtBQUNBLElBQU1DLFVBQVFELFFBQVEsU0FBUixDQUFkOztJQVFxQkUsTTs7O0FBR3BCLGlCQUFZQyxJQUFaLEVBQWtCQyxJQUFsQixFQUF1QjtBQUFBOztBQUFBLDhHQUNoQkQsSUFEZ0I7O0FBRXRCLFFBQUtDLElBQUwsR0FBVUEsSUFBVjtBQUNBLFFBQUtDLElBQUwsR0FBVUosUUFBUUssS0FBUixzREFDTSxNQUFLQyxRQURYLHlDQUVlLE1BQUtDLE1BRnBCLGlrQkFhTCxNQUFLQSxNQWJBLHNEQWVMQyxJQWZLLENBZUEsQ0FmQSxFQWVHQSxJQWZiO0FBSHNCO0FBbUJ0Qjs7Ozt3QkFFS0MsSSxFQUFNUCxJLEVBQUs7QUFBQTs7QUFDaEIsVUFBTyxXQUFhRyxLQUFiLENBQW1CLEtBQUtGLElBQXhCLEVBQ0xPLElBREssQ0FDQSxrQkFBUTtBQUNiLFFBQUcsQ0FBQ0MsTUFBSixFQUFXO0FBQ1ZULFVBQUtVLE1BQUw7QUFDQSxLQUZELE1BRU0sSUFBR0QsT0FBT0UsUUFBUCxDQUFnQkMsTUFBaEIsSUFBd0IsQ0FBM0IsRUFBNkI7QUFDbEMsWUFBS0MsUUFBTCxDQUFjTixJQUFkLEVBQW9CUCxJQUFwQixFQUEwQixPQUFLQyxJQUEvQjtBQUNBLEtBRkssTUFFRDtBQUNKLFNBQUlhLFdBQVNMLE9BQU9LLFFBQXBCO0FBQ0EsU0FBSVosT0FBS08sT0FBT00sRUFBUCxDQUFVLEVBQVYsQ0FBVDtBQUNBLFlBQU8sRUFBQ04sY0FBRCxFQUFTUCxVQUFULEVBQWVZLGtCQUFmLEVBQVA7QUFDQTtBQUNELElBWEssQ0FBUDtBQVlBOzs7MkJBRVFQLEksRUFBTVAsSSxFQUFPZ0IsTSxFQUFPO0FBQzVCLE9BQUlDLE1BQUlWLEtBQUtXLGNBQUwsQ0FBb0JDLFFBQXBCLENBQTZCSCxNQUE3QixDQUFSO0FBQ0FoQixRQUFLb0IsV0FBTCx5QkFBc0NILEdBQXRDO0FBQ0E7Ozs7OztBQTFDbUJsQixNLENBQ2JzQixJLEdBQUssZ0I7a0JBRFF0QixNOztJQTZDZnVCLE87OztBQUNGLGtCQUFZdEIsSUFBWixFQUFrQkUsSUFBbEIsRUFBdUI7QUFBQTs7QUFFekI7QUFGeUIsaUhBQ25CRixJQURtQixFQUNkLElBRGM7O0FBR3pCLFNBQUtFLElBQUwsQ0FBVUksSUFBVixDQUFlLENBQWYsRUFBa0JpQixZQUFsQixDQUErQixDQUEvQixFQUFrQ0MsSUFBbEMsQ0FBdUNDLFFBQXZDLENBQWdEQyxTQUFoRCxDQUEwREMsSUFBMUQsQ0FBK0R6QixJQUEvRCxFQUh5QixDQUcyQztBQUgzQztBQUl6Qjs7Ozt3QkFFS0ssSSxFQUFNUCxJLEVBQU00QixLLEVBQU07QUFBQTs7QUFDdkIsT0FBR0EsVUFBUSxJQUFSLElBQWdCQSxVQUFRQyxTQUF4QixJQUFxQ0QsVUFBUSxFQUFoRCxFQUFtRDtBQUNsRCxXQUFPRSxRQUFRQyxPQUFSLEVBQVA7QUFDQSxJQUZELE1BRUs7QUFDSixXQUFPLCtCQUFNSCxLQUFOLEVBQ0xwQixJQURLLENBQ0EsZ0JBQU07QUFDWCxTQUFHLENBQUNQLElBQUosRUFBUztBQUNSK0IsY0FBUUMsS0FBUixDQUFjLGdCQUFjTCxLQUE1QjtBQUNBLE1BRkQsTUFFSztBQUNKLGFBQUszQixJQUFMLEdBQVVBLElBQVY7QUFDQSx5SEFBbUJNLElBQW5CLEVBQXdCUCxJQUF4QjtBQUNBO0FBQ0QsS0FSSyxFQVFILGFBQUc7QUFDTGdDLGFBQVFDLEtBQVIsQ0FBY0MsQ0FBZDtBQUNBLEtBVkssQ0FBUDtBQVdBO0FBQ0Q7Ozs2QkFFUztBQUNULCtHQUFrQlIsU0FBbEI7QUFDQSxVQUFPLEtBQUt6QixJQUFaO0FBQ0E7Ozs7RUE1Qm9CRixNOztBQWlDdEJBLE9BQU91QixPQUFQLEdBQWVBLE9BQWYiLCJmaWxlIjoiX3N1YmRvYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGJhYmVsID0gcmVxdWlyZShcImJhYmVsLWNvcmVcIilcbmNvbnN0IGVzcHJpbWE9cmVxdWlyZShcImVzcHJpbWFcIilcbmltcG9ydCBlc2NvZGVnZW4gZnJvbSBcImVzY29kZWdlblwiXG5cbmltcG9ydCBmZXRjaCBmcm9tIFwiaXNvbW9ycGhpYy1mZXRjaFwiXG5pbXBvcnQgVmFyaWFudCBmcm9tIFwiLi92YXJpYW50XCJcbmltcG9ydCB7SUR9IGZyb20gXCIuL3ZhcmlhbnRcIlxuaW1wb3J0IERvY3hUZW1wbGF0ZSBmcm9tIFwiLi5cIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdWJEb2MgZXh0ZW5kcyBWYXJpYW50e1xuXHRzdGF0aWMgdHlwZT1cInZhcmlhbnQuc3ViZG9jXCJcblxuXHRjb25zdHJ1Y3Rvcihub2RlLCBkYXRhKXtcblx0XHRzdXBlcihub2RlKVxuXHRcdHRoaXMuZGF0YT1kYXRhXG5cdFx0dGhpcy5jb2RlPWVzcHJpbWEucGFyc2UoYGFzeW5jIGZ1bmN0aW9uIGFzc2VtYmxlKCl7XG5cdFx0XHRcdGxldCBub2RlPSQoJyR7dGhpcy5zZWxlY3Rvcn0nKVxuXHRcdFx0XHRsZXQgdmFyRG9jSW5mbz1hd2FpdCAke3RoaXMub2JqZWN0fS5wYXJzZShkb2N4LCBub2RlKVxuXHRcdFx0XHRpZih2YXJEb2NJbmZvKXtcblx0XHRcdFx0XHRsZXQge3ZhckRvYywgdmFyaWFudHMsIGNvZGV9PXZhckRvY0luZm9cblx0XHRcdFx0XHRsZXQgdGFyZ2V0RG9jPXZhckRvYy5kb2N4LmNsb25lKClcblx0XHRcdFx0XHRsZXQgc3ViZG9jPWV2YWwoXCIoZnVuY3Rpb24oZG9jeCwgX192YXJpYW50cywkKXtcIitjb2RlK1wifSlcIilcblx0XHRcdFx0XHRsZXQgc3RhdGljRG9jPWF3YWl0IHN1YmRvYyh0YXJnZXREb2MsdmFyaWFudHMsdGFyZ2V0RG9jLm9mZmljZURvY3VtZW50LmNvbnRlbnQpXG5cdFx0XHRcdFx0aWYoIV9fb3B0LmNsZWFyV3JhcCl7XG5cdFx0XHRcdFx0XHRzdGF0aWNEb2Mub2ZmaWNlRG9jdW1lbnQuY29udGVudChcIlske0lEfV1cIikucmVtb3ZlQXR0cihcIiR7SUR9XCIpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGxldCB6aXA9c3RhdGljRG9jLnNlcmlhbGl6ZSgpXG5cdFx0XHRcdFx0bGV0IGRhdGE9emlwLmdlbmVyYXRlKHt0eXBlOlwibm9kZWJ1ZmZlclwifSlcblx0XHRcdFx0XHQke3RoaXMub2JqZWN0fS5hc3NlbWJsZShkb2N4LCBub2RlLCBkYXRhKVxuXHRcdFx0XHR9XG5cdFx0XHR9YCkuYm9keVswXS5ib2R5XG5cdH1cblxuXHRwYXJzZShkb2N4LCBub2RlKXtcblx0XHRyZXR1cm4gRG9jeFRlbXBsYXRlLnBhcnNlKHRoaXMuZGF0YSlcblx0XHRcdC50aGVuKHZhckRvYz0+e1xuXHRcdFx0XHRpZighdmFyRG9jKXtcblx0XHRcdFx0XHRub2RlLnJlbW92ZSgpXG5cdFx0XHRcdH1lbHNlIGlmKHZhckRvYy5jaGlsZHJlbi5sZW5ndGg9PTApe1xuXHRcdFx0XHRcdHRoaXMuYXNzZW1ibGUoZG9jeCwgbm9kZSwgdGhpcy5kYXRhKVxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRsZXQgdmFyaWFudHM9dmFyRG9jLnZhcmlhbnRzXG5cdFx0XHRcdFx0bGV0IGNvZGU9dmFyRG9jLmpzKHt9KVxuXHRcdFx0XHRcdHJldHVybiB7dmFyRG9jLCBjb2RlLCB2YXJpYW50c31cblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0fVxuXG5cdGFzc2VtYmxlKGRvY3gsIG5vZGUsICBzdWJkb2Mpe1xuXHRcdGxldCBySWQ9ZG9jeC5vZmZpY2VEb2N1bWVudC5hZGRDaHVuayhzdWJkb2MpXG5cdFx0bm9kZS5yZXBsYWNlV2l0aChgPHc6YWx0Q2h1bmsgcjppZD1cIiR7cklkfVwiLz5gKVxuXHR9XG59XG5cbmNsYXNzIER5bmFtaWMgZXh0ZW5kcyBTdWJEb2N7XG4gICAgY29uc3RydWN0b3Iobm9kZSwgY29kZSl7XG5cdFx0c3VwZXIobm9kZSxudWxsKVxuXHRcdC8vbGV0IHZhckRvY0luZm89YXdhaXQgX192YXJpYW50cy5hMC5wYXJzZShkb2N4LCBub2RlLCB2YWx1ZSlcblx0XHR0aGlzLmNvZGUuYm9keVsxXS5kZWNsYXJhdGlvbnNbMF0uaW5pdC5hcmd1bWVudC5hcmd1bWVudHMucHVzaChjb2RlKS8vZm9yIHZhbHVlXG5cdH1cblxuXHRwYXJzZShkb2N4LCBub2RlLCB2YWx1ZSl7XG5cdFx0aWYodmFsdWU9PT1udWxsIHx8IHZhbHVlPT09dW5kZWZpbmVkIHx8IHZhbHVlPT09Jycpe1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gZmV0Y2godmFsdWUpXG5cdFx0XHRcdC50aGVuKGRhdGE9Pntcblx0XHRcdFx0XHRpZighZGF0YSl7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFwibm8gZGF0YSBhdCBcIit2YWx1ZSlcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHRoaXMuZGF0YT1kYXRhXG5cdFx0XHRcdFx0XHRyZXR1cm4gc3VwZXIucGFyc2UoZG9jeCxub2RlKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSwgZT0+e1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZSlcblx0XHRcdFx0fSlcblx0XHR9XG5cdH1cblxuXHRhc3NlbWJsZSgpe1xuXHRcdHN1cGVyLmFzc2VtYmxlKC4uLmFyZ3VtZW50cylcblx0XHRkZWxldGUgdGhpcy5kYXRhXG5cdH1cbn1cblxuXG5cblN1YkRvYy5EeW5hbWljPUR5bmFtaWNcbiJdfQ==