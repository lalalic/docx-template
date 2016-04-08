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
						case 'variant.var':
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
		value: function parse() {
			var r = _get(Object.getPrototypeOf(Document.prototype), 'parse', this).apply(this, arguments);
			this.wDoc.endVariant(this);
			delete this.wDoc.data;
			return r;
		}
	}, {
		key: 'visit',
		value: function visit() {}
	}, {
		key: 'toJavascript',
		value: function toJavascript(args) {
			args._global = this.wDoc.data;
			return 'with(arguments[0]._global)';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7O0FBQ3BCLFVBRG9CLFFBQ3BCLEdBQWE7d0JBRE8sVUFDUDs7cUVBRE8sc0JBRVYsWUFERzs7QUFFWixTQUFPLE1BQVAsQ0FBYyxNQUFLLElBQUwsRUFBVSxVQUFTLGVBQVQsRUFBeUI7QUFDaEQsT0FBSSwwQkFBSjtPQUNDLHFCQUFtQixFQUFuQixDQUYrQztBQUdoRCxVQUFPO0FBQ0wsd0NBQWEsU0FBUTtBQUNwQixhQUFPLFFBQVEsSUFBUjtBQUNQLFdBQUssYUFBTDtBQUNDLGVBQVEsYUFBUixHQUFzQixpQkFBdEIsQ0FERDtBQUVDLHlCQUFrQixlQUFsQixDQUFrQyxJQUFsQyxDQUF1QyxPQUF2QyxFQUZEO0FBR0EsYUFIQTtBQURBLFdBS0ssWUFBTCxDQUxBO0FBTUEsV0FBSyxhQUFMO0FBQ0MsZUFBUSxhQUFSLEdBQXNCLGlCQUF0QixDQUREO0FBRUMseUJBQWtCLGVBQWxCLENBQWtDLElBQWxDLENBQXVDLE9BQXZDLEVBRkQ7QUFHQywwQkFBbUIsSUFBbkIsQ0FBd0IsaUJBQXhCLEVBSEQ7QUFOQSxXQVVLLFVBQUw7QUFDQywyQkFBa0IsT0FBbEIsQ0FERDtBQVZBLE1BRG9CO0FBY3BCLFlBQU8sT0FBUCxDQWRvQjtLQURoQjtBQWtCTCxvQ0FBVyxTQUFRO0FBQ2xCLGFBQU8sUUFBUSxJQUFSO0FBQ1AsV0FBSyxZQUFMLENBREE7QUFFQSxXQUFLLGFBQUw7QUFDQywyQkFBa0IsbUJBQW1CLEdBQW5CLEVBQWxCLENBREQ7QUFGQSxNQURrQjtLQWxCZDtJQUFQLENBSGdEO0dBQXpCLE9BQXhCLEVBRlk7O0FBaUNaLFFBQUssYUFBTCxHQUFtQixJQUFuQixDQWpDWTtBQWtDWixRQUFLLGVBQUwsR0FBcUIsRUFBckIsQ0FsQ1k7O0FBb0NaLFFBQUssSUFBTCxDQUFVLFlBQVYsUUFwQ1k7O0VBQWI7O2NBRG9COzswQkFnRGI7QUFDTixPQUFJLCtCQWpEZSxnREFpREUsVUFBakIsQ0FERTtBQUVOLFFBQUssSUFBTCxDQUFVLFVBQVYsQ0FBcUIsSUFBckIsRUFGTTtBQUdOLFVBQU8sS0FBSyxJQUFMLENBQVUsSUFBVixDQUhEO0FBSU4sVUFBTyxDQUFQLENBSk07Ozs7MEJBT0E7OzsrQkFJTSxNQUFLO0FBQ2pCLFFBQUssT0FBTCxHQUFhLEtBQUssSUFBTCxDQUFVLElBQVYsQ0FESTtBQUVqQix1Q0FGaUI7Ozs7b0JBbkJULEdBQUU7QUFDVixRQUFLLElBQUwsQ0FBVSxJQUFWLEdBQWUsQ0FBZixDQURVOztzQkFJRDtBQUNULFVBQU8sS0FBSyxJQUFMLENBQVUsSUFBVixDQURFOzs7O1FBNUNVIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VEb2N1bWVudCBmcm9tIFwiZG9jeDRqcy9kaXN0L29wZW54bWwvZG9jeC9tb2RlbC9kb2N1bWVudFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudCBleHRlbmRzIEJhc2VEb2N1bWVudHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLndEb2MsZnVuY3Rpb24odmFyaWFudERvY3VtZW50KXtcclxuXHRcdFx0bGV0IF9jdXJyZW50Q29udGFpbmVyLCBcclxuXHRcdFx0XHRfdmFyaWFudENvbnRhaW5lcnM9W11cclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdGJlZ2luVmFyaWFudCh2YXJpYW50KXtcclxuXHRcdFx0XHRcdFx0c3dpdGNoKHZhcmlhbnQudHlwZSl7XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQudmFyJzpcclxuXHRcdFx0XHRcdFx0XHR2YXJpYW50LnZhcmlhbnRQYXJlbnQ9X2N1cnJlbnRDb250YWluZXJcclxuXHRcdFx0XHRcdFx0XHRfY3VycmVudENvbnRhaW5lci52YXJpYW50Q2hpbGRyZW4ucHVzaCh2YXJpYW50KVxyXG5cdFx0XHRcdFx0XHRicmVha1x0XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuaWYnOlxyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmZvcic6XHJcblx0XHRcdFx0XHRcdFx0dmFyaWFudC52YXJpYW50UGFyZW50PV9jdXJyZW50Q29udGFpbmVyXHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXIudmFyaWFudENoaWxkcmVuLnB1c2godmFyaWFudClcdFx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRcdF92YXJpYW50Q29udGFpbmVycy5wdXNoKF9jdXJyZW50Q29udGFpbmVyKVxyXG5cdFx0XHRcdFx0XHRjYXNlICdkb2N1bWVudCc6XHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXI9dmFyaWFudFxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHJldHVybiB2YXJpYW50XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRlbmRWYXJpYW50KHZhcmlhbnQpe1xyXG5cdFx0XHRcdFx0XHRzd2l0Y2godmFyaWFudC50eXBlKXtcclxuXHRcdFx0XHRcdFx0Y2FzZSAndmFyaWFudC5pZic6XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuZm9yJzpcclxuXHRcdFx0XHRcdFx0XHRfY3VycmVudENvbnRhaW5lcj1fdmFyaWFudENvbnRhaW5lcnMucG9wKClcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KHRoaXMpKVxyXG5cdFx0XHJcblx0XHR0aGlzLnZhcmlhbnRQYXJlbnQ9bnVsbFxyXG5cdFx0dGhpcy52YXJpYW50Q2hpbGRyZW49W11cclxuXHRcdFxyXG5cdFx0dGhpcy53RG9jLmJlZ2luVmFyaWFudCh0aGlzKVxyXG5cdH1cclxuXHRcclxuXHRzZXQgZGF0YShkKXtcclxuXHRcdHRoaXMud0RvYy5kYXRhPWRcclxuXHR9XHJcblx0XHJcblx0Z2V0IGRhdGEoKXtcclxuXHRcdHJldHVybiB0aGlzLndEb2MuZGF0YVxyXG5cdH1cclxuXHRcclxuXHRwYXJzZSgpe1xyXG5cdFx0dmFyIHI9c3VwZXIucGFyc2UoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy53RG9jLmVuZFZhcmlhbnQodGhpcylcclxuXHRcdGRlbGV0ZSB0aGlzLndEb2MuZGF0YVxyXG5cdFx0cmV0dXJuIHJcclxuXHR9XHJcblx0XHJcblx0dmlzaXQoKXtcclxuXHRcdFxyXG5cdH1cclxuXHRcclxuXHR0b0phdmFzY3JpcHQoYXJncyl7XHJcblx0XHRhcmdzLl9nbG9iYWw9dGhpcy53RG9jLmRhdGFcclxuXHRcdHJldHVybiBgd2l0aChhcmd1bWVudHNbMF0uX2dsb2JhbClgXHJcblx0fVxyXG59XHJcbiJdfQ==