"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _variant = require("./variant");

var _variant2 = _interopRequireDefault(_variant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var esprima = require("esprima");

var For = function (_Variant) {
	_inherits(For, _Variant);

	function For() {
		_classCallCheck(this, For);

		var _this = _possibleConstructorReturn(this, (For.__proto__ || Object.getPrototypeOf(For)).apply(this, arguments));

		var codeBlock = _this.code.body[0].body.body;
		while (!Array.isArray(codeBlock)) {
			//for(){}
			codeBlock = codeBlock.body;
		}_this.children.forEach(function (a) {
			return codeBlock.push(a.code);
		});
		codeBlock.push(esprima.parse(_this.object + ".assemble(docx,$('" + _this.selector + "'), __opt)").body[0]);

		_this.code.body.unshift(esprima.parse(_this.object + ".assembling(docx,$('" + _this.selector + "'))").body[0]);
		_this.code.body.push(esprima.parse(_this.object + ".assembled(docx,$('" + _this.selector + "'))").body[0]);
		return _this;
	}

	_createClass(For, [{
		key: "assembling",
		value: function assembling(docx, node) {
			this._template = node.clone();
			this._results = [];
		}

		//loop run after each child assembled

	}, {
		key: "assemble",
		value: function assemble(docx, node, _ref) {
			var clearWrap = _ref.clearWrap;

			this._results.push(clearWrap ? node.find(">w\\:sdtContent").children() : node);
			node.replaceWith(this._template.clone());
		}
	}, {
		key: "assembled",
		value: function assembled(docx, node) {
			this._results.forEach(function (a) {
				return node.before(a);
			});
			node.remove();

			delete this._results;
			delete this._template;
		}
	}]);

	return For;
}(_variant2.default);

For.type = "variant.for";
exports.default = For;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fZm9yLmpzIl0sIm5hbWVzIjpbImVzcHJpbWEiLCJyZXF1aXJlIiwiRm9yIiwiYXJndW1lbnRzIiwiY29kZUJsb2NrIiwiY29kZSIsImJvZHkiLCJBcnJheSIsImlzQXJyYXkiLCJjaGlsZHJlbiIsImZvckVhY2giLCJwdXNoIiwiYSIsInBhcnNlIiwib2JqZWN0Iiwic2VsZWN0b3IiLCJ1bnNoaWZ0IiwiZG9jeCIsIm5vZGUiLCJfdGVtcGxhdGUiLCJjbG9uZSIsIl9yZXN1bHRzIiwiY2xlYXJXcmFwIiwiZmluZCIsInJlcGxhY2VXaXRoIiwiYmVmb3JlIiwicmVtb3ZlIiwidHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBREEsSUFBTUEsVUFBUUMsUUFBUSxTQUFSLENBQWQ7O0lBR3FCQyxHOzs7QUFFcEIsZ0JBQWE7QUFBQTs7QUFBQSx5R0FDSEMsU0FERzs7QUFHWixNQUFJQyxZQUFVLE1BQUtDLElBQUwsQ0FBVUMsSUFBVixDQUFlLENBQWYsRUFBa0JBLElBQWxCLENBQXVCQSxJQUFyQztBQUNBLFNBQU0sQ0FBQ0MsTUFBTUMsT0FBTixDQUFjSixTQUFkLENBQVA7QUFBZ0M7QUFDL0JBLGVBQVVBLFVBQVVFLElBQXBCO0FBREQsR0FHQSxNQUFLRyxRQUFMLENBQWNDLE9BQWQsQ0FBc0I7QUFBQSxVQUFHTixVQUFVTyxJQUFWLENBQWVDLEVBQUVQLElBQWpCLENBQUg7QUFBQSxHQUF0QjtBQUNBRCxZQUFVTyxJQUFWLENBQWVYLFFBQVFhLEtBQVIsQ0FBaUIsTUFBS0MsTUFBdEIsMEJBQWlELE1BQUtDLFFBQXRELGlCQUE0RVQsSUFBNUUsQ0FBaUYsQ0FBakYsQ0FBZjs7QUFFQSxRQUFLRCxJQUFMLENBQVVDLElBQVYsQ0FBZVUsT0FBZixDQUF1QmhCLFFBQVFhLEtBQVIsQ0FBaUIsTUFBS0MsTUFBdEIsNEJBQW1ELE1BQUtDLFFBQXhELFVBQXVFVCxJQUF2RSxDQUE0RSxDQUE1RSxDQUF2QjtBQUNBLFFBQUtELElBQUwsQ0FBVUMsSUFBVixDQUFlSyxJQUFmLENBQW9CWCxRQUFRYSxLQUFSLENBQWlCLE1BQUtDLE1BQXRCLDJCQUFrRCxNQUFLQyxRQUF2RCxVQUFzRVQsSUFBdEUsQ0FBMkUsQ0FBM0UsQ0FBcEI7QUFYWTtBQVlaOzs7OzZCQUVVVyxJLEVBQUtDLEksRUFBSztBQUNwQixRQUFLQyxTQUFMLEdBQWVELEtBQUtFLEtBQUwsRUFBZjtBQUNBLFFBQUtDLFFBQUwsR0FBYyxFQUFkO0FBQ0E7O0FBRUQ7Ozs7MkJBQ1NKLEksRUFBS0MsSSxRQUFrQjtBQUFBLE9BQVhJLFNBQVcsUUFBWEEsU0FBVzs7QUFDL0IsUUFBS0QsUUFBTCxDQUFjVixJQUFkLENBQW1CVyxZQUFZSixLQUFLSyxJQUFMLENBQVUsaUJBQVYsRUFBNkJkLFFBQTdCLEVBQVosR0FBc0RTLElBQXpFO0FBQ0FBLFFBQUtNLFdBQUwsQ0FBaUIsS0FBS0wsU0FBTCxDQUFlQyxLQUFmLEVBQWpCO0FBQ0E7Ozs0QkFFU0gsSSxFQUFLQyxJLEVBQUs7QUFDbkIsUUFBS0csUUFBTCxDQUFjWCxPQUFkLENBQXNCO0FBQUEsV0FBR1EsS0FBS08sTUFBTCxDQUFZYixDQUFaLENBQUg7QUFBQSxJQUF0QjtBQUNBTSxRQUFLUSxNQUFMOztBQUVBLFVBQU8sS0FBS0wsUUFBWjtBQUNBLFVBQU8sS0FBS0YsU0FBWjtBQUNBOzs7Ozs7QUFqQ21CakIsRyxDQUNieUIsSSxHQUFLLGE7a0JBRFF6QixHIiwiZmlsZSI6Il9mb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBlc3ByaW1hPXJlcXVpcmUoXCJlc3ByaW1hXCIpXHJcbmltcG9ydCBWYXJpYW50IGZyb20gXCIuL3ZhcmlhbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9yIGV4dGVuZHMgVmFyaWFudHtcclxuXHRzdGF0aWMgdHlwZT1cInZhcmlhbnQuZm9yXCJcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cclxuXHRcdGxldCBjb2RlQmxvY2s9dGhpcy5jb2RlLmJvZHlbMF0uYm9keS5ib2R5XHJcblx0XHR3aGlsZSghQXJyYXkuaXNBcnJheShjb2RlQmxvY2spKS8vZm9yKCl7fVxyXG5cdFx0XHRjb2RlQmxvY2s9Y29kZUJsb2NrLmJvZHlcclxuXHJcblx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goYT0+Y29kZUJsb2NrLnB1c2goYS5jb2RlKSlcclxuXHRcdGNvZGVCbG9jay5wdXNoKGVzcHJpbWEucGFyc2UoYCR7dGhpcy5vYmplY3R9LmFzc2VtYmxlKGRvY3gsJCgnJHt0aGlzLnNlbGVjdG9yfScpLCBfX29wdClgKS5ib2R5WzBdKVxyXG5cdFx0XHJcblx0XHR0aGlzLmNvZGUuYm9keS51bnNoaWZ0KGVzcHJpbWEucGFyc2UoYCR7dGhpcy5vYmplY3R9LmFzc2VtYmxpbmcoZG9jeCwkKCcke3RoaXMuc2VsZWN0b3J9JykpYCkuYm9keVswXSlcclxuXHRcdHRoaXMuY29kZS5ib2R5LnB1c2goZXNwcmltYS5wYXJzZShgJHt0aGlzLm9iamVjdH0uYXNzZW1ibGVkKGRvY3gsJCgnJHt0aGlzLnNlbGVjdG9yfScpKWApLmJvZHlbMF0pXHJcblx0fVxyXG5cclxuXHRhc3NlbWJsaW5nKGRvY3gsbm9kZSl7XHJcblx0XHR0aGlzLl90ZW1wbGF0ZT1ub2RlLmNsb25lKClcclxuXHRcdHRoaXMuX3Jlc3VsdHM9W11cclxuXHR9XHJcblxyXG5cdC8vbG9vcCBydW4gYWZ0ZXIgZWFjaCBjaGlsZCBhc3NlbWJsZWRcclxuXHRhc3NlbWJsZShkb2N4LG5vZGUsIHtjbGVhcldyYXB9KXtcclxuXHRcdHRoaXMuX3Jlc3VsdHMucHVzaChjbGVhcldyYXAgPyBub2RlLmZpbmQoXCI+d1xcXFw6c2R0Q29udGVudFwiKS5jaGlsZHJlbigpIDogbm9kZSlcclxuXHRcdG5vZGUucmVwbGFjZVdpdGgodGhpcy5fdGVtcGxhdGUuY2xvbmUoKSlcclxuXHR9XHJcblxyXG5cdGFzc2VtYmxlZChkb2N4LG5vZGUpe1xyXG5cdFx0dGhpcy5fcmVzdWx0cy5mb3JFYWNoKGE9Pm5vZGUuYmVmb3JlKGEpKVxyXG5cdFx0bm9kZS5yZW1vdmUoKVxyXG5cdFx0XHJcblx0XHRkZWxldGUgdGhpcy5fcmVzdWx0c1xyXG5cdFx0ZGVsZXRlIHRoaXMuX3RlbXBsYXRlXHJcblx0fVxyXG59XHJcbiJdfQ==