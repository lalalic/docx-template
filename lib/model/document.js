'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _document = require('docx4js/lib/openxml/docx/model/document');

var _document2 = _interopRequireDefault(_document);

var _part = require('docx4js/lib/openxml/part');

var _part2 = _interopRequireDefault(_part);

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
			if (this.wDoc.data && this.variantChildren.length) {
				this.wDoc.partMain.change = true;
				this.wDoc.partMain.save();
			}

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
		key: 'asStaticDocx',
		value: function asStaticDocx() {
			this.wDoc.variantChildren = this.variantChildren;
			var wDoc = this.wDoc;

			return Object.assign(this.wDoc, {
				save: function save(file) {
					var buffer = wDoc.raw.generate({ type: "nodebuffer" });
					var fs = "fs";
					require(fs).writeFile(file, buffer);
				},
				download: function download(file) {
					var file = wDoc.raw.generate({ type: "blob", mimeType: "application/docx" });
					var url = window.URL.createObjectURL(file);
					var link = document.createElement("a");
					document.body.appendChild(link);
					link.download = (file || wDoc.props.name || 'new') + '.docx';
					link.href = url;
					link.click();
					document.body.removeChild(link);
				}
			});
		}

		/**
  * public API for variant docx
  */

	}, {
		key: 'assemble',
		value: function assemble(data) {}
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


var xmldom = "xmldom";
(function (XMLSerializer) {
	Object.assign(_part2.default.prototype, {
		changed: false,
		save: function save() {
			if (this.changed) {
				this.doc.raw.file(this.name, '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' + new XMLSerializer().serializeToString(this.documentElement));
				this.changed = false;
			}
		},
		addRel: function addRel() {},
		removeRel: function removeRel() {}
	});
})($.isNode ? require(xmldom).XMLSerializer : XMLSerializer);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUEySEE7Ozs7Ozs7Ozs7OztJQXpIcUI7OztBQUNwQixVQURvQixRQUNwQixHQUFhO3dCQURPLFVBQ1A7O3FFQURPLHNCQUVWLFlBREc7O0FBRVosU0FBTyxNQUFQLENBQWMsTUFBSyxJQUFMLEVBQVUsVUFBUyxlQUFULEVBQXlCO0FBQ2hELE9BQUksMEJBQUo7T0FDQyxxQkFBbUIsRUFBbkIsQ0FGK0M7QUFHaEQsVUFBTztBQUNMLHdDQUFhLFNBQVE7QUFDcEIsYUFBTyxRQUFRLElBQVI7QUFDUCxXQUFLLGFBQUw7QUFDQyxlQUFRLGFBQVIsR0FBc0IsaUJBQXRCLENBREQ7QUFFQyx5QkFBa0IsZUFBbEIsQ0FBa0MsSUFBbEMsQ0FBdUMsT0FBdkMsRUFGRDtBQUdBLGFBSEE7QUFEQSxXQUtLLFlBQUwsQ0FMQTtBQU1BLFdBQUssYUFBTDtBQUNDLGVBQVEsYUFBUixHQUFzQixpQkFBdEIsQ0FERDtBQUVDLHlCQUFrQixlQUFsQixDQUFrQyxJQUFsQyxDQUF1QyxPQUF2QyxFQUZEO0FBR0MsMEJBQW1CLElBQW5CLENBQXdCLGlCQUF4QixFQUhEO0FBTkEsV0FVSyxVQUFMO0FBQ0MsMkJBQWtCLE9BQWxCLENBREQ7QUFWQSxNQURvQjtBQWNwQixZQUFPLE9BQVAsQ0Fkb0I7S0FEaEI7QUFrQkwsb0NBQVcsU0FBUTtBQUNsQixhQUFPLFFBQVEsSUFBUjtBQUNQLFdBQUssWUFBTCxDQURBO0FBRUEsV0FBSyxhQUFMO0FBQ0MsMkJBQWtCLG1CQUFtQixHQUFuQixFQUFsQixDQUREO0FBRkEsTUFEa0I7S0FsQmQ7SUFBUCxDQUhnRDtHQUF6QixPQUF4QixFQUZZOztBQWlDWixRQUFLLGFBQUwsR0FBbUIsSUFBbkIsQ0FqQ1k7QUFrQ1osUUFBSyxlQUFMLEdBQXFCLEVBQXJCLENBbENZOztBQW9DWixRQUFLLElBQUwsQ0FBVSxZQUFWLFFB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LGFBQUosRUFBRCxDQUFzQixpQkFBdEIsQ0FBd0MsS0FBSyxlQUFMLENBQW5JLEVBRGU7QUFFZixTQUFLLE9BQUwsR0FBYSxLQUFiLENBRmU7SUFBaEI7R0FIMkI7QUFVNUIsNEJBQVEsRUFWb0I7QUFjNUIsa0NBQVcsRUFkaUI7RUFBN0IsRUFEdUI7Q0FBdkIsQ0FBRCxDQW1CRyxFQUFFLE1BQUYsR0FBVyxRQUFRLE1BQVIsRUFBZ0IsYUFBaEIsR0FBZ0MsYUFBM0MsQ0FuQkgiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZURvY3VtZW50IGZyb20gXCJkb2N4NGpzL2xpYi9vcGVueG1sL2RvY3gvbW9kZWwvZG9jdW1lbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBCYXNlRG9jdW1lbnR7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdE9iamVjdC5hc3NpZ24odGhpcy53RG9jLGZ1bmN0aW9uKHZhcmlhbnREb2N1bWVudCl7XHJcblx0XHRcdGxldCBfY3VycmVudENvbnRhaW5lcixcclxuXHRcdFx0XHRfdmFyaWFudENvbnRhaW5lcnM9W11cclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdGJlZ2luVmFyaWFudCh2YXJpYW50KXtcclxuXHRcdFx0XHRcdFx0c3dpdGNoKHZhcmlhbnQudHlwZSl7XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuZXhwJzpcclxuXHRcdFx0XHRcdFx0XHR2YXJpYW50LnZhcmlhbnRQYXJlbnQ9X2N1cnJlbnRDb250YWluZXJcclxuXHRcdFx0XHRcdFx0XHRfY3VycmVudENvbnRhaW5lci52YXJpYW50Q2hpbGRyZW4ucHVzaCh2YXJpYW50KVxyXG5cdFx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmlmJzpcclxuXHRcdFx0XHRcdFx0Y2FzZSAndmFyaWFudC5mb3InOlxyXG5cdFx0XHRcdFx0XHRcdHZhcmlhbnQudmFyaWFudFBhcmVudD1fY3VycmVudENvbnRhaW5lclxyXG5cdFx0XHRcdFx0XHRcdF9jdXJyZW50Q29udGFpbmVyLnZhcmlhbnRDaGlsZHJlbi5wdXNoKHZhcmlhbnQpXHJcblx0XHRcdFx0XHRcdFx0X3ZhcmlhbnRDb250YWluZXJzLnB1c2goX2N1cnJlbnRDb250YWluZXIpXHJcblx0XHRcdFx0XHRcdGNhc2UgJ2RvY3VtZW50JzpcclxuXHRcdFx0XHRcdFx0XHRfY3VycmVudENvbnRhaW5lcj12YXJpYW50XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0cmV0dXJuIHZhcmlhbnRcclxuXHRcdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdFx0ZW5kVmFyaWFudCh2YXJpYW50KXtcclxuXHRcdFx0XHRcdFx0c3dpdGNoKHZhcmlhbnQudHlwZSl7XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuaWYnOlxyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmZvcic6XHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXI9X3ZhcmlhbnRDb250YWluZXJzLnBvcCgpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSh0aGlzKSlcclxuXHJcblx0XHR0aGlzLnZhcmlhbnRQYXJlbnQ9bnVsbFxyXG5cdFx0dGhpcy52YXJpYW50Q2hpbGRyZW49W11cclxuXHJcblx0XHR0aGlzLndEb2MuYmVnaW5WYXJpYW50KHRoaXMpXHJcblx0fVxyXG5cclxuXHRzZXQgZGF0YShkKXtcclxuXHRcdHRoaXMud0RvYy5kYXRhPWRcclxuXHR9XHJcblxyXG5cdGdldCBkYXRhKCl7XHJcblx0XHRyZXR1cm4gdGhpcy53RG9jLmRhdGFcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCogd2hpY2ggbWFrZXMgaXQgYXMgYSB2YXJpYW50XHJcblx0Ki9cclxuXHRwYXJzZSgpe1xyXG5cdFx0dmFyIHI9c3VwZXIucGFyc2UoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy53RG9jLmVuZFZhcmlhbnQodGhpcylcclxuXHRcdGlmKHRoaXMud0RvYy5kYXRhICYmIHRoaXMudmFyaWFudENoaWxkcmVuLmxlbmd0aCl7XHJcblx0XHRcdHRoaXMud0RvYy5wYXJ0TWFpbi5jaGFuZ2U9dHJ1ZVxyXG5cdFx0XHR0aGlzLndEb2MucGFydE1haW4uc2F2ZSgpXHJcblx0XHR9XHJcblx0XHRcdFxyXG5cdFx0ZGVsZXRlIHRoaXMud0RvYy5kYXRhXHJcblx0XHRyZXR1cm4gclxyXG5cdH1cclxuXHJcblx0dmlzaXQoKXtcclxuXHRcdC8vd2hpY2ggbWFrZXMgdGhlIGNsYXNzIGFzIGEgdmlzaXRvclxyXG5cdH1cclxuXHJcblx0X3RvSmF2YXNjcmlwdChpUGFyYSl7XHJcblx0XHRpUGFyYS5fZ2xvYmFsPXRoaXMud0RvYy5kYXRhXHJcblx0XHRyZXR1cm4gYHdpdGgoYXJndW1lbnRzWzBdLl9nbG9iYWwpYFxyXG5cdH1cclxuXHRcclxuXHRfdG9KYXZhc2NyaXB0T2ZBc3NlbWJsZUFzRGF0YSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuX3RvSmF2YXNjcmlwdCguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCoge3Zhck5hbWU6eHgsaWZfeHh4Ont9LCBmb3JfeHh4Ont9fVxyXG5cdCovXHJcblx0YXNzZW1ibGVBc0RhdGEoZGF0YSl7XHJcblx0XHR2YXIgaVBhcmE9e19nbG9iYWw6ZGF0YX1cclxuXHRcdHZhciBjb2RlPWAke3RoaXMuX3RvSmF2YXNjcmlwdE9mQXNzZW1ibGVBc0RhdGEoaVBhcmEpfSB7XHJcblx0XHRcdCR7dGhpcy52YXJpYW50Q2hpbGRyZW4uZm9yRWFjaChhPT57XHJcblx0XHRcdFx0YCR7dGhpcy5fdG9KYXZhc2NyaXB0T2ZBc3NlbWJsZUFzRGF0YShpUGFyYSl9YFxyXG5cdFx0XHR9KX1cclxuXHRcdH1gXHJcblx0XHRcclxuXHRcdHJldHVybiBuZXcgRnVuY3Rpb24oXCJkYXRhXCIsIGNvZGUpKGRhdGEpXHJcblx0fVxyXG5cdFxyXG5cdGFzU3RhdGljRG9jeCgpe1xyXG5cdFx0dGhpcy53RG9jLnZhcmlhbnRDaGlsZHJlbj10aGlzLnZhcmlhbnRDaGlsZHJlblxyXG5cdFx0bGV0IHdEb2M9dGhpcy53RG9jXHJcblx0XHRcclxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHRoaXMud0RvYyx7XHJcblx0XHRcdHNhdmUoZmlsZSl7XHJcblx0XHRcdFx0dmFyIGJ1ZmZlcj13RG9jLnJhdy5nZW5lcmF0ZSh7dHlwZTpcIm5vZGVidWZmZXJcIn0pXHJcblx0XHRcdFx0dmFyIGZzPVwiZnNcIlxyXG5cdFx0XHRcdHJlcXVpcmUoZnMpLndyaXRlRmlsZShmaWxlLGJ1ZmZlcilcclxuXHRcdFx0fSxcclxuXHRcdFx0ZG93bmxvYWQoZmlsZSl7XHJcblx0XHRcdFx0dmFyIGZpbGU9d0RvYy5yYXcuZ2VuZXJhdGUoe3R5cGU6IFwiYmxvYlwiLG1pbWVUeXBlOiBcImFwcGxpY2F0aW9uL2RvY3hcIn0pXHJcblx0XHRcdFx0dmFyIHVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xyXG5cdFx0XHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XHJcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKVxyXG5cdFx0XHRcdGxpbmsuZG93bmxvYWQgPSBgJHtmaWxlfHx3RG9jLnByb3BzLm5hbWV8fCduZXcnfS5kb2N4YDtcclxuXHRcdFx0XHRsaW5rLmhyZWYgPSB1cmw7XHJcblx0XHRcdFx0bGluay5jbGljaygpXHJcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQqIHB1YmxpYyBBUEkgZm9yIHZhcmlhbnQgZG9jeFxyXG5cdCovXHJcblx0YXNzZW1ibGUoZGF0YSl7XHJcblx0XHRcclxuXHR9XHJcbn1cclxuXHJcbmltcG9ydCBQYXJ0IGZyb20gXCJkb2N4NGpzL2xpYi9vcGVueG1sL3BhcnRcIlxyXG5cclxudmFyIHhtbGRvbT1cInhtbGRvbVwiO1xyXG4oZnVuY3Rpb24oWE1MU2VyaWFsaXplcil7XHJcblx0T2JqZWN0LmFzc2lnbihQYXJ0LnByb3RvdHlwZSx7XHJcblx0XHRjaGFuZ2VkOmZhbHNlLFxyXG5cdFx0c2F2ZSgpe1xyXG5cdFx0XHRpZih0aGlzLmNoYW5nZWQpe1xyXG5cdFx0XHRcdHRoaXMuZG9jLnJhdy5maWxlKHRoaXMubmFtZSwgYDw/eG1sIHZlcnNpb249XCIxLjBcIiBlbmNvZGluZz1cIlVURi04XCIgc3RhbmRhbG9uZT1cInllc1wiPz5cXHJcXG4keyhuZXcgWE1MU2VyaWFsaXplcigpKS5zZXJpYWxpemVUb1N0cmluZyh0aGlzLmRvY3VtZW50RWxlbWVudCl9YClcclxuXHRcdFx0XHR0aGlzLmNoYW5nZWQ9ZmFsc2VcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH0sXHJcblx0XHRcclxuXHRcdGFkZFJlbCgpe1xyXG5cdFx0XHRcclxuXHRcdH0sXHJcblx0XHRcclxuXHRcdHJlbW92ZVJlbCgpe1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHR9KVx0XHJcbn0pKCQuaXNOb2RlID8gcmVxdWlyZSh4bWxkb20pLlhNTFNlcmlhbGl6ZXIgOiBYTUxTZXJpYWxpemVyKVxyXG4iXX0=