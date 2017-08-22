"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _exp = require("./_exp");

var _exp2 = _interopRequireDefault(_exp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Picture = function (_Expression) {
	_inherits(Picture, _Expression);

	function Picture() {
		_classCallCheck(this, Picture);

		return _possibleConstructorReturn(this, (Picture.__proto__ || Object.getPrototypeOf(Picture)).apply(this, arguments));
	}

	_createClass(Picture, [{
		key: "assemble",
		value: function assemble(docx, node, _ref, value) {
			var clearWrap = _ref.clearWrap;

			if (value == null || value == undefined || value == '') {
				node.remove();
			} else {
				var id = docx.officeDocument.addExternalImage(value);
				var blip = node.find('a\\:graphic a\\:blip');
				blip.attr("r:embed", null);
				blip.attr("r:link", id);

				if (clearWrap) {
					node.replaceWith(node.find(">w\\:sdtContent").children());
				}
			}
		}
	}]);

	return Picture;
}(_exp2.default);

Picture.type = "variant.picture";
exports.default = Picture;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fcGljdHVyZS5qcyJdLCJuYW1lcyI6WyJQaWN0dXJlIiwiZG9jeCIsIm5vZGUiLCJ2YWx1ZSIsImNsZWFyV3JhcCIsInVuZGVmaW5lZCIsInJlbW92ZSIsImlkIiwib2ZmaWNlRG9jdW1lbnQiLCJhZGRFeHRlcm5hbEltYWdlIiwiYmxpcCIsImZpbmQiLCJhdHRyIiwicmVwbGFjZVdpdGgiLCJjaGlsZHJlbiIsInR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7MkJBR1hDLEksRUFBTUMsSSxRQUFtQkMsSyxFQUFNO0FBQUEsT0FBbEJDLFNBQWtCLFFBQWxCQSxTQUFrQjs7QUFDdkMsT0FBR0QsU0FBTyxJQUFQLElBQWVBLFNBQU9FLFNBQXRCLElBQW1DRixTQUFPLEVBQTdDLEVBQWdEO0FBQy9DRCxTQUFLSSxNQUFMO0FBQ0EsSUFGRCxNQUVLO0FBQ0osUUFBSUMsS0FBR04sS0FBS08sY0FBTCxDQUFvQkMsZ0JBQXBCLENBQXFDTixLQUFyQyxDQUFQO0FBQ0EsUUFBSU8sT0FBS1IsS0FBS1MsSUFBTCxDQUFVLHNCQUFWLENBQVQ7QUFDQUQsU0FBS0UsSUFBTCxDQUFVLFNBQVYsRUFBcUIsSUFBckI7QUFDQUYsU0FBS0UsSUFBTCxDQUFVLFFBQVYsRUFBb0JMLEVBQXBCOztBQUVBLFFBQUdILFNBQUgsRUFBYTtBQUNaRixVQUFLVyxXQUFMLENBQWlCWCxLQUFLUyxJQUFMLENBQVUsaUJBQVYsRUFBNkJHLFFBQTdCLEVBQWpCO0FBQ0E7QUFDRDtBQUNEOzs7Ozs7QUFoQm1CZCxPLENBQ2JlLEksR0FBSyxpQjtrQkFEUWYsTyIsImZpbGUiOiJfcGljdHVyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFeHByZXNzaW9uIGZyb20gXCIuL19leHBcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGljdHVyZSBleHRlbmRzIEV4cHJlc3Npb257XHJcblx0c3RhdGljIHR5cGU9XCJ2YXJpYW50LnBpY3R1cmVcIlxyXG5cclxuXHRhc3NlbWJsZShkb2N4LCBub2RlLCB7Y2xlYXJXcmFwfSwgdmFsdWUpe1xyXG5cdFx0aWYodmFsdWU9PW51bGwgfHwgdmFsdWU9PXVuZGVmaW5lZCB8fCB2YWx1ZT09Jycpe1xyXG5cdFx0XHRub2RlLnJlbW92ZSgpXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0bGV0IGlkPWRvY3gub2ZmaWNlRG9jdW1lbnQuYWRkRXh0ZXJuYWxJbWFnZSh2YWx1ZSlcclxuXHRcdFx0bGV0IGJsaXA9bm9kZS5maW5kKCdhXFxcXDpncmFwaGljIGFcXFxcOmJsaXAnKVxyXG5cdFx0XHRibGlwLmF0dHIoXCJyOmVtYmVkXCIsIG51bGwpXHJcblx0XHRcdGJsaXAuYXR0cihcInI6bGlua1wiLCBpZClcclxuXHRcdFx0XHJcblx0XHRcdGlmKGNsZWFyV3JhcCl7XHJcblx0XHRcdFx0bm9kZS5yZXBsYWNlV2l0aChub2RlLmZpbmQoXCI+d1xcXFw6c2R0Q29udGVudFwiKS5jaGlsZHJlbigpKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==