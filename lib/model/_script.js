"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _esprima = require("esprima");

var esprima = _interopRequireWildcard(_esprima);

var _escodegen = require("escodegen");

var _escodegen2 = _interopRequireDefault(_escodegen);

var _variant = require("./variant");

var _variant2 = _interopRequireDefault(_variant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Script = function (_Variant) {
	_inherits(Script, _Variant);

	function Script(node, code, children) {
		_classCallCheck(this, Script);

		var _this = _possibleConstructorReturn(this, (Script.__proto__ || Object.getPrototypeOf(Script)).call(this, node, code));

		_this.code.body.push(esprima.parse(_this.object + ".assemble(docx,$('" + _this.selector + "'), __opt)").body[0]);
		return _this;
	}

	_createClass(Script, [{
		key: "assemble",
		value: function assemble(docx, node, opt) {
			node.remove();
		}
	}]);

	return Script;
}(_variant2.default);

Script.type = "variant.script";
exports.default = Script;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fc2NyaXB0LmpzIl0sIm5hbWVzIjpbImVzcHJpbWEiLCJTY3JpcHQiLCJub2RlIiwiY29kZSIsImNoaWxkcmVuIiwiYm9keSIsInB1c2giLCJwYXJzZSIsIm9iamVjdCIsInNlbGVjdG9yIiwiZG9jeCIsIm9wdCIsInJlbW92ZSIsInR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0lBQVlBLE87O0FBQ1o7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJDLE07OztBQUVwQixpQkFBWUMsSUFBWixFQUFrQkMsSUFBbEIsRUFBd0JDLFFBQXhCLEVBQWlDO0FBQUE7O0FBQUEsOEdBQzFCRixJQUQwQixFQUNyQkMsSUFEcUI7O0FBRWhDLFFBQUtBLElBQUwsQ0FBVUUsSUFBVixDQUFlQyxJQUFmLENBQW9CTixRQUFRTyxLQUFSLENBQWlCLE1BQUtDLE1BQXRCLDBCQUFpRCxNQUFLQyxRQUF0RCxpQkFBNEVKLElBQTVFLENBQWlGLENBQWpGLENBQXBCO0FBRmdDO0FBR2hDOzs7OzJCQUVRSyxJLEVBQU1SLEksRUFBTVMsRyxFQUFJO0FBQ3hCVCxRQUFLVSxNQUFMO0FBQ0E7Ozs7OztBQVRtQlgsTSxDQUNiWSxJLEdBQUssZ0I7a0JBRFFaLE0iLCJmaWxlIjoiX3NjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGVzcHJpbWEgZnJvbSBcImVzcHJpbWFcIlxuaW1wb3J0IGVzY29kZWdlbiBmcm9tIFwiZXNjb2RlZ2VuXCJcbmltcG9ydCBWYXJpYW50IGZyb20gXCIuL3ZhcmlhbnRcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JpcHQgZXh0ZW5kcyBWYXJpYW50e1xuXHRzdGF0aWMgdHlwZT1cInZhcmlhbnQuc2NyaXB0XCJcblx0Y29uc3RydWN0b3Iobm9kZSwgY29kZSwgY2hpbGRyZW4pe1xuXHRcdHN1cGVyKG5vZGUsY29kZSlcblx0XHR0aGlzLmNvZGUuYm9keS5wdXNoKGVzcHJpbWEucGFyc2UoYCR7dGhpcy5vYmplY3R9LmFzc2VtYmxlKGRvY3gsJCgnJHt0aGlzLnNlbGVjdG9yfScpLCBfX29wdClgKS5ib2R5WzBdKVxuXHR9XG5cdFxuXHRhc3NlbWJsZShkb2N4LCBub2RlLCBvcHQpe1xuXHRcdG5vZGUucmVtb3ZlKClcblx0fVxufSJdfQ==