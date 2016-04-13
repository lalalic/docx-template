'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _document = require('docx4js/lib/openxml/docx/model/document');

var _document2 = _interopRequireDefault(_document);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Document = function (_BaseDocument) {
	_inherits(Document, _BaseDocument);

	function Document() {
		_classCallCheck(this, Document);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Document).apply(this, arguments));

		Object.assign(_this.wDoc, function (variantDocument) {
			var _currentContainer = void 0,
			    _variantContainers = [];
			return {
				beginVariant: function beginVariant(variant) {
					switch (variant.type) {
						case 'variant.exp':
							variant.variantParent = _currentContainer;
							_currentContainer.variantChildren.push(variant);
							break;
						case 'variant.if':
						case 'variant.for':
							variant.variantParent = _currentContainer;
							_currentContainer.variantChildren.push(variant);
							_variantContainers.push(_currentContainer);
						case 'document':
							_currentContainer = variant;
					}
					return variant;
				},
				endVariant: function endVariant(variant) {
					switch (variant.type) {
						case 'variant.if':
						case 'variant.for':
							_currentContainer = _variantContainers.pop();
					}
				}
			};
		}(_this));

		_this.variantParent = null;
		_this.variantChildren = [];

		_this.wDoc.beginVariant(_this);
		return _this;
	}

	_createClass(Document, [{
		key: 'parse',


		/**
  * which makes it as a variant
  */
		value: function parse() {
			var r = _get(Object.getPrototypeOf(Document.prototype), 'parse', this).apply(this, arguments);
			this.wDoc.endVariant(this);
			delete this.wDoc.data;
			return r;
		}
	}, {
		key: 'visit',
		value: function visit() {
			//which makes the class as a visitor
		}
	}, {
		key: '_toJavascript',
		value: function _toJavascript(iPara) {
			iPara._global = this.wDoc.data;
			return 'with(arguments[0]._global)';
		}
	}, {
		key: '_toJavascriptOfAssembleAsData',
		value: function _toJavascriptOfAssembleAsData() {
			return this._toJavascript.apply(this, arguments);
		}

		/**
  * {varName:xx,if_xxx:{}, for_xxx:{}}
  */

	}, {
		key: 'assembleAsData',
		value: function assembleAsData(data) {
			var _this2 = this;

			var iPara = { _global: data };
			var code = this._toJavascriptOfAssembleAsData(iPara) + ' {\n\t\t\t' + this.variantChildren.forEach(function (a) {
				'' + _this2._toJavascriptOfAssembleAsData(iPara);
			}) + '\n\t\t}';

			return new Function("data", code)(data);
		}
	}, {
		key: 'data',
		set: function set(d) {
			this.wDoc.data = d;
		},
		get: function get() {
			return this.wDoc.data;
		}
	}]);

	return Document;
}(_document2.default);

exports.default = Document;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7O0FBQ3BCLFVBRG9CLFFBQ3BCLEdBQWE7d0JBRE8sVUFDUDs7cUVBRE8sc0JBRVYsWUFERzs7QUFFWixTQUFPLE1BQVAsQ0FBYyxNQUFLLElBQUwsRUFBVSxVQUFTLGVBQVQsRUFBeUI7QUFDaEQsT0FBSSwwQkFBSjtPQUNDLHFCQUFtQixFQUFuQixDQUYrQztBQUdoRCxVQUFPO0FBQ0wsd0NBQWEsU0FBUTtBQUNwQixhQUFPLFFBQVEsSUFBUjtBQUNQLFdBQUssYUFBTDtBQUNDLGVBQVEsYUFBUixHQUFzQixpQkFBdEIsQ0FERDtBQUVDLHlCQUFrQixlQUFsQixDQUFrQyxJQUFsQyxDQUF1QyxPQUF2QyxFQUZEO0FBR0EsYUFIQTtBQURBLFdBS0ssWUFBTCxDQUxBO0FBTUEsV0FBSyxhQUFMO0FBQ0MsZUFBUSxhQUFSLEdBQXNCLGlCQUF0QixDQUREO0FBRUMseUJBQWtCLGVBQWxCLENBQWtDLElBQWxDLENBQXVDLE9BQXZDLEVBRkQ7QUFHQywwQkFBbUIsSUFBbkIsQ0FBd0IsaUJBQXhCLEVBSEQ7QUFOQSxXQVVLLFVBQUw7QUFDQywyQkFBa0IsT0FBbEIsQ0FERDtBQVZBLE1BRG9CO0FBY3BCLFlBQU8sT0FBUCxDQWRvQjtLQURoQjtBQWtCTCxvQ0FBVyxTQUFRO0FBQ2xCLGFBQU8sUUFBUSxJQUFSO0FBQ1AsV0FBSyxZQUFMLENBREE7QUFFQSxXQUFLLGFBQUw7QUFDQywyQkFBa0IsbUJBQW1CLEdBQW5CLEVBQWxCLENBREQ7QUFGQSxNQURrQjtLQWxCZDtJQUFQLENBSGdEO0dBQXpCLE9BQXhCLEVBRlk7O0FBaUNaLFFBQUssYUFBTCxHQUFtQixJQUFuQixDQWpDWTtBQWtDWixRQUFLLGVBQUwsR0FBcUIsRUFBckIsQ0FsQ1k7O0FBb0NaLFFBQUssSUFBTCxDQUFVLFlBQVYsUUFwQ1k7O0VBQWI7O2NBRG9COzs7Ozs7OzBCQW1EYjtBQUNOLE9BQUksK0JBcERlLGdEQW9ERSxVQUFqQixDQURFO0FBRU4sUUFBSyxJQUFMLENBQVUsVUFBVixDQUFxQixJQUFyQixFQUZNO0FBR04sVUFBTyxLQUFLLElBQUwsQ0FBVSxJQUFWLENBSEQ7QUFJTixVQUFPLENBQVAsQ0FKTTs7OzswQkFPQTs7Ozs7Z0NBSU8sT0FBTTtBQUNuQixTQUFNLE9BQU4sR0FBYyxLQUFLLElBQUwsQ0FBVSxJQUFWLENBREs7QUFFbkIsdUNBRm1COzs7O2tEQUtXO0FBQzlCLFVBQU8sS0FBSyxhQUFMLGFBQXNCLFNBQXRCLENBQVAsQ0FEOEI7Ozs7Ozs7OztpQ0FPaEIsTUFBSzs7O0FBQ25CLE9BQUksUUFBTSxFQUFDLFNBQVEsSUFBUixFQUFQLENBRGU7QUFFbkIsT0FBSSxPQUFRLEtBQUssNkJBQUwsQ0FBbUMsS0FBbkMsbUJBQ1QsS0FBSyxlQUFMLENBQXFCLE9BQXJCLENBQTZCLGFBQUc7QUFDakMsU0FBRyxPQUFLLDZCQUFMLENBQW1DLEtBQW5DLENBQUgsQ0FEaUM7SUFBSCxhQUQ1QixDQUZlOztBQVFuQixVQUFPLElBQUksUUFBSixDQUFhLE1BQWIsRUFBcUIsSUFBckIsRUFBMkIsSUFBM0IsQ0FBUCxDQVJtQjs7OztvQkFsQ1gsR0FBRTtBQUNWLFFBQUssSUFBTCxDQUFVLElBQVYsR0FBZSxDQUFmLENBRFU7O3NCQUlEO0FBQ1QsVUFBTyxLQUFLLElBQUwsQ0FBVSxJQUFWLENBREU7Ozs7UUE1Q1UiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZURvY3VtZW50IGZyb20gXCJkb2N4NGpzL2xpYi9vcGVueG1sL2RvY3gvbW9kZWwvZG9jdW1lbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBCYXNlRG9jdW1lbnR7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdE9iamVjdC5hc3NpZ24odGhpcy53RG9jLGZ1bmN0aW9uKHZhcmlhbnREb2N1bWVudCl7XHJcblx0XHRcdGxldCBfY3VycmVudENvbnRhaW5lcixcclxuXHRcdFx0XHRfdmFyaWFudENvbnRhaW5lcnM9W11cclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdGJlZ2luVmFyaWFudCh2YXJpYW50KXtcclxuXHRcdFx0XHRcdFx0c3dpdGNoKHZhcmlhbnQudHlwZSl7XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuZXhwJzpcclxuXHRcdFx0XHRcdFx0XHR2YXJpYW50LnZhcmlhbnRQYXJlbnQ9X2N1cnJlbnRDb250YWluZXJcclxuXHRcdFx0XHRcdFx0XHRfY3VycmVudENvbnRhaW5lci52YXJpYW50Q2hpbGRyZW4ucHVzaCh2YXJpYW50KVxyXG5cdFx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmlmJzpcclxuXHRcdFx0XHRcdFx0Y2FzZSAndmFyaWFudC5mb3InOlxyXG5cdFx0XHRcdFx0XHRcdHZhcmlhbnQudmFyaWFudFBhcmVudD1fY3VycmVudENvbnRhaW5lclxyXG5cdFx0XHRcdFx0XHRcdF9jdXJyZW50Q29udGFpbmVyLnZhcmlhbnRDaGlsZHJlbi5wdXNoKHZhcmlhbnQpXHJcblx0XHRcdFx0XHRcdFx0X3ZhcmlhbnRDb250YWluZXJzLnB1c2goX2N1cnJlbnRDb250YWluZXIpXHJcblx0XHRcdFx0XHRcdGNhc2UgJ2RvY3VtZW50JzpcclxuXHRcdFx0XHRcdFx0XHRfY3VycmVudENvbnRhaW5lcj12YXJpYW50XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0cmV0dXJuIHZhcmlhbnRcclxuXHRcdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdFx0ZW5kVmFyaWFudCh2YXJpYW50KXtcclxuXHRcdFx0XHRcdFx0c3dpdGNoKHZhcmlhbnQudHlwZSl7XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuaWYnOlxyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmZvcic6XHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXI9X3ZhcmlhbnRDb250YWluZXJzLnBvcCgpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSh0aGlzKSlcclxuXHJcblx0XHR0aGlzLnZhcmlhbnRQYXJlbnQ9bnVsbFxyXG5cdFx0dGhpcy52YXJpYW50Q2hpbGRyZW49W11cclxuXHJcblx0XHR0aGlzLndEb2MuYmVnaW5WYXJpYW50KHRoaXMpXHJcblx0fVxyXG5cclxuXHRzZXQgZGF0YShkKXtcclxuXHRcdHRoaXMud0RvYy5kYXRhPWRcclxuXHR9XHJcblxyXG5cdGdldCBkYXRhKCl7XHJcblx0XHRyZXR1cm4gdGhpcy53RG9jLmRhdGFcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCogd2hpY2ggbWFrZXMgaXQgYXMgYSB2YXJpYW50XHJcblx0Ki9cclxuXHRwYXJzZSgpe1xyXG5cdFx0dmFyIHI9c3VwZXIucGFyc2UoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy53RG9jLmVuZFZhcmlhbnQodGhpcylcclxuXHRcdGRlbGV0ZSB0aGlzLndEb2MuZGF0YVxyXG5cdFx0cmV0dXJuIHJcclxuXHR9XHJcblxyXG5cdHZpc2l0KCl7XHJcblx0XHQvL3doaWNoIG1ha2VzIHRoZSBjbGFzcyBhcyBhIHZpc2l0b3JcclxuXHR9XHJcblxyXG5cdF90b0phdmFzY3JpcHQoaVBhcmEpe1xyXG5cdFx0aVBhcmEuX2dsb2JhbD10aGlzLndEb2MuZGF0YVxyXG5cdFx0cmV0dXJuIGB3aXRoKGFyZ3VtZW50c1swXS5fZ2xvYmFsKWBcclxuXHR9XHJcblx0XHJcblx0X3RvSmF2YXNjcmlwdE9mQXNzZW1ibGVBc0RhdGEoKXtcclxuXHRcdHJldHVybiB0aGlzLl90b0phdmFzY3JpcHQoLi4uYXJndW1lbnRzKVxyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQqIHt2YXJOYW1lOnh4LGlmX3h4eDp7fSwgZm9yX3h4eDp7fX1cclxuXHQqL1xyXG5cdGFzc2VtYmxlQXNEYXRhKGRhdGEpe1xyXG5cdFx0dmFyIGlQYXJhPXtfZ2xvYmFsOmRhdGF9XHJcblx0XHR2YXIgY29kZT1gJHt0aGlzLl90b0phdmFzY3JpcHRPZkFzc2VtYmxlQXNEYXRhKGlQYXJhKX0ge1xyXG5cdFx0XHQke3RoaXMudmFyaWFudENoaWxkcmVuLmZvckVhY2goYT0+e1xyXG5cdFx0XHRcdGAke3RoaXMuX3RvSmF2YXNjcmlwdE9mQXNzZW1ibGVBc0RhdGEoaVBhcmEpfWBcclxuXHRcdFx0fSl9XHJcblx0XHR9YFxyXG5cdFx0XHJcblx0XHRyZXR1cm4gbmV3IEZ1bmN0aW9uKFwiZGF0YVwiLCBjb2RlKShkYXRhKVxyXG5cdH1cclxufVxyXG4iXX0=