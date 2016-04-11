'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _document = require('docx4js/dist/openxml/docx/model/document');

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7O0FBQ3BCLFVBRG9CLFFBQ3BCLEdBQWE7d0JBRE8sVUFDUDs7cUVBRE8sc0JBRVYsWUFERzs7QUFFWixTQUFPLE1BQVAsQ0FBYyxNQUFLLElBQUwsRUFBVSxVQUFTLGVBQVQsRUFBeUI7QUFDaEQsT0FBSSwwQkFBSjtPQUNDLHFCQUFtQixFQUFuQixDQUYrQztBQUdoRCxVQUFPO0FBQ0wsd0NBQWEsU0FBUTtBQUNwQixhQUFPLFFBQVEsSUFBUjtBQUNQLFdBQUssYUFBTDtBQUNDLGVBQVEsYUFBUixHQUFzQixpQkFBdEIsQ0FERDtBQUVDLHlCQUFrQixlQUFsQixDQUFrQyxJQUFsQyxDQUF1QyxPQUF2QyxFQUZEO0FBR0EsYUFIQTtBQURBLFdBS0ssWUFBTCxDQUxBO0FBTUEsV0FBSyxhQUFMO0FBQ0MsZUFBUSxhQUFSLEdBQXNCLGlCQUF0QixDQUREO0FBRUMseUJBQWtCLGVBQWxCLENBQWtDLElBQWxDLENBQXVDLE9BQXZDLEVBRkQ7QUFHQywwQkFBbUIsSUFBbkIsQ0FBd0IsaUJBQXhCLEVBSEQ7QUFOQSxXQVVLLFVBQUw7QUFDQywyQkFBa0IsT0FBbEIsQ0FERDtBQVZBLE1BRG9CO0FBY3BCLFlBQU8sT0FBUCxDQWRvQjtLQURoQjtBQWtCTCxvQ0FBVyxTQUFRO0FBQ2xCLGFBQU8sUUFBUSxJQUFSO0FBQ1AsV0FBSyxZQUFMLENBREE7QUFFQSxXQUFLLGFBQUw7QUFDQywyQkFBa0IsbUJBQW1CLEdBQW5CLEVBQWxCLENBREQ7QUFGQSxNQURrQjtLQWxCZDtJQUFQLENBSGdEO0dBQXpCLE9BQXhCLEVBRlk7O0FBaUNaLFFBQUssYUFBTCxHQUFtQixJQUFuQixDQWpDWTtBQWtDWixRQUFLLGVBQUwsR0FBcUIsRUFBckIsQ0FsQ1k7O0FBb0NaLFFBQUssSUFBTCxDQUFVLFlBQVYsUUFwQ1k7O0VBQWI7O2NBRG9COzs7Ozs7OzBCQW1EYjtBQUNOLE9BQUksK0JBcERlLGdEQW9ERSxVQUFqQixDQURFO0FBRU4sUUFBSyxJQUFMLENBQVUsVUFBVixDQUFxQixJQUFyQixFQUZNO0FBR04sVUFBTyxLQUFLLElBQUwsQ0FBVSxJQUFWLENBSEQ7QUFJTixVQUFPLENBQVAsQ0FKTTs7OzswQkFPQTs7Ozs7Z0NBSU8sT0FBTTtBQUNuQixTQUFNLE9BQU4sR0FBYyxLQUFLLElBQUwsQ0FBVSxJQUFWLENBREs7QUFFbkIsdUNBRm1COzs7O2tEQUtXO0FBQzlCLFVBQU8sS0FBSyxhQUFMLGFBQXNCLFNBQXRCLENBQVAsQ0FEOEI7Ozs7Ozs7OztpQ0FPaEIsTUFBSzs7O0FBQ25CLE9BQUksUUFBTSxFQUFDLFNBQVEsSUFBUixFQUFQLENBRGU7QUFFbkIsT0FBSSxPQUFRLEtBQUssNkJBQUwsQ0FBbUMsS0FBbkMsbUJBQ1QsS0FBSyxlQUFMLENBQXFCLE9BQXJCLENBQTZCLGFBQUc7QUFDakMsU0FBRyxPQUFLLDZCQUFMLENBQW1DLEtBQW5DLENBQUgsQ0FEaUM7SUFBSCxhQUQ1QixDQUZlOztBQVFuQixVQUFPLElBQUksUUFBSixDQUFhLE1BQWIsRUFBcUIsSUFBckIsRUFBMkIsSUFBM0IsQ0FBUCxDQVJtQjs7OztvQkFsQ1gsR0FBRTtBQUNWLFFBQUssSUFBTCxDQUFVLElBQVYsR0FBZSxDQUFmLENBRFU7O3NCQUlEO0FBQ1QsVUFBTyxLQUFLLElBQUwsQ0FBVSxJQUFWLENBREU7Ozs7UUE1Q1UiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZURvY3VtZW50IGZyb20gXCJkb2N4NGpzL2Rpc3Qvb3BlbnhtbC9kb2N4L21vZGVsL2RvY3VtZW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgQmFzZURvY3VtZW50e1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHRPYmplY3QuYXNzaWduKHRoaXMud0RvYyxmdW5jdGlvbih2YXJpYW50RG9jdW1lbnQpe1xyXG5cdFx0XHRsZXQgX2N1cnJlbnRDb250YWluZXIsXHJcblx0XHRcdFx0X3ZhcmlhbnRDb250YWluZXJzPVtdXHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRiZWdpblZhcmlhbnQodmFyaWFudCl7XHJcblx0XHRcdFx0XHRcdHN3aXRjaCh2YXJpYW50LnR5cGUpe1xyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmV4cCc6XHJcblx0XHRcdFx0XHRcdFx0dmFyaWFudC52YXJpYW50UGFyZW50PV9jdXJyZW50Q29udGFpbmVyXHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXIudmFyaWFudENoaWxkcmVuLnB1c2godmFyaWFudClcclxuXHRcdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdFx0Y2FzZSAndmFyaWFudC5pZic6XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuZm9yJzpcclxuXHRcdFx0XHRcdFx0XHR2YXJpYW50LnZhcmlhbnRQYXJlbnQ9X2N1cnJlbnRDb250YWluZXJcclxuXHRcdFx0XHRcdFx0XHRfY3VycmVudENvbnRhaW5lci52YXJpYW50Q2hpbGRyZW4ucHVzaCh2YXJpYW50KVxyXG5cdFx0XHRcdFx0XHRcdF92YXJpYW50Q29udGFpbmVycy5wdXNoKF9jdXJyZW50Q29udGFpbmVyKVxyXG5cdFx0XHRcdFx0XHRjYXNlICdkb2N1bWVudCc6XHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXI9dmFyaWFudFxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHJldHVybiB2YXJpYW50XHJcblx0XHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRcdGVuZFZhcmlhbnQodmFyaWFudCl7XHJcblx0XHRcdFx0XHRcdHN3aXRjaCh2YXJpYW50LnR5cGUpe1xyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmlmJzpcclxuXHRcdFx0XHRcdFx0Y2FzZSAndmFyaWFudC5mb3InOlxyXG5cdFx0XHRcdFx0XHRcdF9jdXJyZW50Q29udGFpbmVyPV92YXJpYW50Q29udGFpbmVycy5wb3AoKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0odGhpcykpXHJcblxyXG5cdFx0dGhpcy52YXJpYW50UGFyZW50PW51bGxcclxuXHRcdHRoaXMudmFyaWFudENoaWxkcmVuPVtdXHJcblxyXG5cdFx0dGhpcy53RG9jLmJlZ2luVmFyaWFudCh0aGlzKVxyXG5cdH1cclxuXHJcblx0c2V0IGRhdGEoZCl7XHJcblx0XHR0aGlzLndEb2MuZGF0YT1kXHJcblx0fVxyXG5cclxuXHRnZXQgZGF0YSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMud0RvYy5kYXRhXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQqIHdoaWNoIG1ha2VzIGl0IGFzIGEgdmFyaWFudFxyXG5cdCovXHJcblx0cGFyc2UoKXtcclxuXHRcdHZhciByPXN1cGVyLnBhcnNlKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMud0RvYy5lbmRWYXJpYW50KHRoaXMpXHJcblx0XHRkZWxldGUgdGhpcy53RG9jLmRhdGFcclxuXHRcdHJldHVybiByXHJcblx0fVxyXG5cclxuXHR2aXNpdCgpe1xyXG5cdFx0Ly93aGljaCBtYWtlcyB0aGUgY2xhc3MgYXMgYSB2aXNpdG9yXHJcblx0fVxyXG5cclxuXHRfdG9KYXZhc2NyaXB0KGlQYXJhKXtcclxuXHRcdGlQYXJhLl9nbG9iYWw9dGhpcy53RG9jLmRhdGFcclxuXHRcdHJldHVybiBgd2l0aChhcmd1bWVudHNbMF0uX2dsb2JhbClgXHJcblx0fVxyXG5cdFxyXG5cdF90b0phdmFzY3JpcHRPZkFzc2VtYmxlQXNEYXRhKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5fdG9KYXZhc2NyaXB0KC4uLmFyZ3VtZW50cylcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0KiB7dmFyTmFtZTp4eCxpZl94eHg6e30sIGZvcl94eHg6e319XHJcblx0Ki9cclxuXHRhc3NlbWJsZUFzRGF0YShkYXRhKXtcclxuXHRcdHZhciBpUGFyYT17X2dsb2JhbDpkYXRhfVxyXG5cdFx0dmFyIGNvZGU9YCR7dGhpcy5fdG9KYXZhc2NyaXB0T2ZBc3NlbWJsZUFzRGF0YShpUGFyYSl9IHtcclxuXHRcdFx0JHt0aGlzLnZhcmlhbnRDaGlsZHJlbi5mb3JFYWNoKGE9PntcclxuXHRcdFx0XHRgJHt0aGlzLl90b0phdmFzY3JpcHRPZkFzc2VtYmxlQXNEYXRhKGlQYXJhKX1gXHJcblx0XHRcdH0pfVxyXG5cdFx0fWBcclxuXHRcdFxyXG5cdFx0cmV0dXJuIG5ldyBGdW5jdGlvbihcImRhdGFcIiwgY29kZSkoZGF0YSlcclxuXHR9XHJcbn1cclxuIl19