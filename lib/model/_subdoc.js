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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fc3ViZG9jLmpzIl0sIm5hbWVzIjpbImJhYmVsIiwicmVxdWlyZSIsImVzcHJpbWEiLCJTdWJEb2MiLCJub2RlIiwiZGF0YSIsImNvZGUiLCJwYXJzZSIsInNlbGVjdG9yIiwib2JqZWN0IiwiYm9keSIsImRvY3giLCJ0aGVuIiwidmFyRG9jIiwicmVtb3ZlIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJhc3NlbWJsZSIsInZhcmlhbnRzIiwianMiLCJzdWJkb2MiLCJySWQiLCJvZmZpY2VEb2N1bWVudCIsImFkZENodW5rIiwicmVwbGFjZVdpdGgiLCJ0eXBlIiwiRHluYW1pYyIsImRlY2xhcmF0aW9ucyIsImluaXQiLCJhcmd1bWVudCIsImFyZ3VtZW50cyIsInB1c2giLCJ2YWx1ZSIsInVuZGVmaW5lZCIsIlByb21pc2UiLCJyZXNvbHZlIiwiY29uc29sZSIsImVycm9yIiwiZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7QUFQQSxJQUFNQSxRQUFRQyxRQUFRLFlBQVIsQ0FBZDtBQUNBLElBQU1DLFVBQVFELFFBQVEsU0FBUixDQUFkOztJQVFxQkUsTTs7O0FBR3BCLGlCQUFZQyxJQUFaLEVBQWtCQyxJQUFsQixFQUF1QjtBQUFBOztBQUFBLDhHQUNoQkQsSUFEZ0I7O0FBRXRCLFFBQUtDLElBQUwsR0FBVUEsSUFBVjtBQUNBLFFBQUtDLElBQUwsR0FBVUosUUFBUUssS0FBUixzREFDTSxNQUFLQyxRQURYLHlDQUVlLE1BQUtDLE1BRnBCLGlrQkFhTCxNQUFLQSxNQWJBLHNEQWVMQyxJQWZLLENBZUEsQ0FmQSxFQWVHQSxJQWZiO0FBSHNCO0FBbUJ0Qjs7Ozt3QkFFS0MsSSxFQUFNUCxJLEVBQUs7QUFBQTs7QUFDaEIsVUFBTyxXQUFhRyxLQUFiLENBQW1CLEtBQUtGLElBQXhCLEVBQ0xPLElBREssQ0FDQSxrQkFBUTtBQUNiLFFBQUcsQ0FBQ0MsTUFBSixFQUFXO0FBQ1ZULFVBQUtVLE1BQUw7QUFDQSxLQUZELE1BRU0sSUFBR0QsT0FBT0UsUUFBUCxDQUFnQkMsTUFBaEIsSUFBd0IsQ0FBM0IsRUFBNkI7QUFDbEMsWUFBS0MsUUFBTCxDQUFjTixJQUFkLEVBQW9CUCxJQUFwQixFQUEwQixPQUFLQyxJQUEvQjtBQUNBLEtBRkssTUFFRDtBQUNKLFNBQUlhLFdBQVNMLE9BQU9LLFFBQXBCO0FBQ0EsU0FBSVosT0FBS08sT0FBT00sRUFBUCxDQUFVLEVBQVYsQ0FBVDtBQUNBLFlBQU8sRUFBQ04sY0FBRCxFQUFTUCxVQUFULEVBQWVZLGtCQUFmLEVBQVA7QUFDQTtBQUNELElBWEssQ0FBUDtBQVlBOzs7MkJBRVFQLEksRUFBTVAsSSxFQUFPZ0IsTSxFQUFPO0FBQzVCLE9BQUlDLE1BQUlWLEtBQUtXLGNBQUwsQ0FBb0JDLFFBQXBCLENBQTZCSCxNQUE3QixDQUFSO0FBQ0FoQixRQUFLb0IsV0FBTCx5QkFBc0NILEdBQXRDO0FBQ0E7Ozs7OztBQTFDbUJsQixNLENBQ2JzQixJLEdBQUssZ0I7a0JBRFF0QixNOztJQTZDZnVCLE87OztBQUNGLGtCQUFZdEIsSUFBWixFQUFrQkUsSUFBbEIsRUFBdUI7QUFBQTs7QUFFekI7QUFGeUIsaUhBQ25CRixJQURtQixFQUNkLElBRGM7O0FBR3pCLFNBQUtFLElBQUwsQ0FBVUksSUFBVixDQUFlLENBQWYsRUFBa0JpQixZQUFsQixDQUErQixDQUEvQixFQUFrQ0MsSUFBbEMsQ0FBdUNDLFFBQXZDLENBQWdEQyxTQUFoRCxDQUEwREMsSUFBMUQsQ0FBK0R6QixJQUEvRCxFQUh5QixDQUcyQztBQUgzQztBQUl6Qjs7Ozt3QkFFS0ssSSxFQUFNUCxJLEVBQU00QixLLEVBQU07QUFBQTs7QUFDdkIsT0FBR0EsVUFBUSxJQUFSLElBQWdCQSxVQUFRQyxTQUF4QixJQUFxQ0QsVUFBUSxFQUFoRCxFQUFtRDtBQUNsRCxXQUFPRSxRQUFRQyxPQUFSLEVBQVA7QUFDQSxJQUZELE1BRUs7QUFDSixXQUFPLCtCQUFNSCxLQUFOLEVBQ0xwQixJQURLLENBQ0EsZ0JBQU07QUFDWCxTQUFHLENBQUNQLElBQUosRUFBUztBQUNSK0IsY0FBUUMsS0FBUixDQUFjLGdCQUFjTCxLQUE1QjtBQUNBLE1BRkQsTUFFSztBQUNKLGFBQUszQixJQUFMLEdBQVVBLElBQVY7QUFDQSx5SEFBbUJNLElBQW5CLEVBQXdCUCxJQUF4QjtBQUNBO0FBQ0QsS0FSSyxFQVFILGFBQUc7QUFDTGdDLGFBQVFDLEtBQVIsQ0FBY0MsQ0FBZDtBQUNBLEtBVkssQ0FBUDtBQVdBO0FBQ0Q7Ozs2QkFFUztBQUNULCtHQUFrQlIsU0FBbEI7QUFDQSxVQUFPLEtBQUt6QixJQUFaO0FBQ0E7Ozs7RUE1Qm9CRixNOztBQWlDdEJBLE9BQU91QixPQUFQLEdBQWVBLE9BQWYiLCJmaWxlIjoiX3N1YmRvYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGJhYmVsID0gcmVxdWlyZShcImJhYmVsLWNvcmVcIilcclxuY29uc3QgZXNwcmltYT1yZXF1aXJlKFwiZXNwcmltYVwiKVxyXG5pbXBvcnQgZXNjb2RlZ2VuIGZyb20gXCJlc2NvZGVnZW5cIlxyXG5cclxuaW1wb3J0IGZldGNoIGZyb20gXCJpc29tb3JwaGljLWZldGNoXCJcclxuaW1wb3J0IFZhcmlhbnQgZnJvbSBcIi4vdmFyaWFudFwiXHJcbmltcG9ydCB7SUR9IGZyb20gXCIuL3ZhcmlhbnRcIlxyXG5pbXBvcnQgRG9jeFRlbXBsYXRlIGZyb20gXCIuLlwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdWJEb2MgZXh0ZW5kcyBWYXJpYW50e1xyXG5cdHN0YXRpYyB0eXBlPVwidmFyaWFudC5zdWJkb2NcIlxyXG5cclxuXHRjb25zdHJ1Y3Rvcihub2RlLCBkYXRhKXtcclxuXHRcdHN1cGVyKG5vZGUpXHJcblx0XHR0aGlzLmRhdGE9ZGF0YVxyXG5cdFx0dGhpcy5jb2RlPWVzcHJpbWEucGFyc2UoYGFzeW5jIGZ1bmN0aW9uIGFzc2VtYmxlKCl7XHJcblx0XHRcdFx0bGV0IG5vZGU9JCgnJHt0aGlzLnNlbGVjdG9yfScpXHJcblx0XHRcdFx0bGV0IHZhckRvY0luZm89YXdhaXQgJHt0aGlzLm9iamVjdH0ucGFyc2UoZG9jeCwgbm9kZSlcclxuXHRcdFx0XHRpZih2YXJEb2NJbmZvKXtcclxuXHRcdFx0XHRcdGxldCB7dmFyRG9jLCB2YXJpYW50cywgY29kZX09dmFyRG9jSW5mb1xyXG5cdFx0XHRcdFx0bGV0IHRhcmdldERvYz12YXJEb2MuZG9jeC5jbG9uZSgpXHJcblx0XHRcdFx0XHRsZXQgc3ViZG9jPWV2YWwoXCIoZnVuY3Rpb24oZG9jeCwgX192YXJpYW50cywkKXtcIitjb2RlK1wifSlcIilcclxuXHRcdFx0XHRcdGxldCBzdGF0aWNEb2M9YXdhaXQgc3ViZG9jKHRhcmdldERvYyx2YXJpYW50cyx0YXJnZXREb2Mub2ZmaWNlRG9jdW1lbnQuY29udGVudClcclxuXHRcdFx0XHRcdGlmKCFfX29wdC5jbGVhcldyYXApe1xyXG5cdFx0XHRcdFx0XHRzdGF0aWNEb2Mub2ZmaWNlRG9jdW1lbnQuY29udGVudChcIlske0lEfV1cIikucmVtb3ZlQXR0cihcIiR7SUR9XCIpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRsZXQgemlwPXN0YXRpY0RvYy5zZXJpYWxpemUoKVxyXG5cdFx0XHRcdFx0bGV0IGRhdGE9emlwLmdlbmVyYXRlKHt0eXBlOlwibm9kZWJ1ZmZlclwifSlcclxuXHRcdFx0XHRcdCR7dGhpcy5vYmplY3R9LmFzc2VtYmxlKGRvY3gsIG5vZGUsIGRhdGEpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9YCkuYm9keVswXS5ib2R5XHJcblx0fVxyXG5cclxuXHRwYXJzZShkb2N4LCBub2RlKXtcclxuXHRcdHJldHVybiBEb2N4VGVtcGxhdGUucGFyc2UodGhpcy5kYXRhKVxyXG5cdFx0XHQudGhlbih2YXJEb2M9PntcclxuXHRcdFx0XHRpZighdmFyRG9jKXtcclxuXHRcdFx0XHRcdG5vZGUucmVtb3ZlKClcclxuXHRcdFx0XHR9ZWxzZSBpZih2YXJEb2MuY2hpbGRyZW4ubGVuZ3RoPT0wKXtcclxuXHRcdFx0XHRcdHRoaXMuYXNzZW1ibGUoZG9jeCwgbm9kZSwgdGhpcy5kYXRhKVxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0bGV0IHZhcmlhbnRzPXZhckRvYy52YXJpYW50c1xyXG5cdFx0XHRcdFx0bGV0IGNvZGU9dmFyRG9jLmpzKHt9KVxyXG5cdFx0XHRcdFx0cmV0dXJuIHt2YXJEb2MsIGNvZGUsIHZhcmlhbnRzfVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHR9XHJcblxyXG5cdGFzc2VtYmxlKGRvY3gsIG5vZGUsICBzdWJkb2Mpe1xyXG5cdFx0bGV0IHJJZD1kb2N4Lm9mZmljZURvY3VtZW50LmFkZENodW5rKHN1YmRvYylcclxuXHRcdG5vZGUucmVwbGFjZVdpdGgoYDx3OmFsdENodW5rIHI6aWQ9XCIke3JJZH1cIi8+YClcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIER5bmFtaWMgZXh0ZW5kcyBTdWJEb2N7XHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBjb2RlKXtcclxuXHRcdHN1cGVyKG5vZGUsbnVsbClcclxuXHRcdC8vbGV0IHZhckRvY0luZm89YXdhaXQgX192YXJpYW50cy5hMC5wYXJzZShkb2N4LCBub2RlLCB2YWx1ZSlcclxuXHRcdHRoaXMuY29kZS5ib2R5WzFdLmRlY2xhcmF0aW9uc1swXS5pbml0LmFyZ3VtZW50LmFyZ3VtZW50cy5wdXNoKGNvZGUpLy9mb3IgdmFsdWVcclxuXHR9XHJcblxyXG5cdHBhcnNlKGRvY3gsIG5vZGUsIHZhbHVlKXtcclxuXHRcdGlmKHZhbHVlPT09bnVsbCB8fCB2YWx1ZT09PXVuZGVmaW5lZCB8fCB2YWx1ZT09PScnKXtcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0cmV0dXJuIGZldGNoKHZhbHVlKVxyXG5cdFx0XHRcdC50aGVuKGRhdGE9PntcclxuXHRcdFx0XHRcdGlmKCFkYXRhKXtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcihcIm5vIGRhdGEgYXQgXCIrdmFsdWUpXHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0dGhpcy5kYXRhPWRhdGFcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHN1cGVyLnBhcnNlKGRvY3gsbm9kZSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LCBlPT57XHJcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGUpXHJcblx0XHRcdFx0fSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzc2VtYmxlKCl7XHJcblx0XHRzdXBlci5hc3NlbWJsZSguLi5hcmd1bWVudHMpXHJcblx0XHRkZWxldGUgdGhpcy5kYXRhXHJcblx0fVxyXG59XHJcblxyXG5cclxuXHJcblN1YkRvYy5EeW5hbWljPUR5bmFtaWNcclxuIl19