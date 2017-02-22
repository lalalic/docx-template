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
		value: function assemble(docx, node, value) {
			if (value == null || value == undefined || value == '') {
				node.remove();
			} else {
				var id = docx.officeDocument.addExternalImage(value);
				var blip = node.find('a\\:graphic a\\:blip');
				blip.attr("r:embed", id);
			}
		}
	}]);

	return Picture;
}(_exp2.default);

Picture.type = "variant.picture";
exports.default = Picture;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fcGljdHVyZS5qcyJdLCJuYW1lcyI6WyJQaWN0dXJlIiwiZG9jeCIsIm5vZGUiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsInJlbW92ZSIsImlkIiwib2ZmaWNlRG9jdW1lbnQiLCJhZGRFeHRlcm5hbEltYWdlIiwiYmxpcCIsImZpbmQiLCJhdHRyIiwidHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7OzsyQkFHWEMsSSxFQUFNQyxJLEVBQU1DLEssRUFBTTtBQUMxQixPQUFHQSxTQUFPLElBQVAsSUFBZUEsU0FBT0MsU0FBdEIsSUFBbUNELFNBQU8sRUFBN0MsRUFBZ0Q7QUFDL0NELFNBQUtHLE1BQUw7QUFDQSxJQUZELE1BRUs7QUFDSixRQUFJQyxLQUFHTCxLQUFLTSxjQUFMLENBQW9CQyxnQkFBcEIsQ0FBcUNMLEtBQXJDLENBQVA7QUFDQSxRQUFJTSxPQUFLUCxLQUFLUSxJQUFMLENBQVUsc0JBQVYsQ0FBVDtBQUNBRCxTQUFLRSxJQUFMLENBQVUsU0FBVixFQUFxQkwsRUFBckI7QUFDQTtBQUNEOzs7Ozs7QUFYbUJOLE8sQ0FDYlksSSxHQUFLLGlCO2tCQURRWixPIiwiZmlsZSI6Il9waWN0dXJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV4cHJlc3Npb24gZnJvbSBcIi4vX2V4cFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaWN0dXJlIGV4dGVuZHMgRXhwcmVzc2lvbntcclxuXHRzdGF0aWMgdHlwZT1cInZhcmlhbnQucGljdHVyZVwiXHJcblxyXG5cdGFzc2VtYmxlKGRvY3gsIG5vZGUsIHZhbHVlKXtcclxuXHRcdGlmKHZhbHVlPT1udWxsIHx8IHZhbHVlPT11bmRlZmluZWQgfHwgdmFsdWU9PScnKXtcclxuXHRcdFx0bm9kZS5yZW1vdmUoKVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGxldCBpZD1kb2N4Lm9mZmljZURvY3VtZW50LmFkZEV4dGVybmFsSW1hZ2UodmFsdWUpXHJcblx0XHRcdGxldCBibGlwPW5vZGUuZmluZCgnYVxcXFw6Z3JhcGhpYyBhXFxcXDpibGlwJylcclxuXHRcdFx0YmxpcC5hdHRyKFwicjplbWJlZFwiLCBpZClcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIl19