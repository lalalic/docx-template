"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _esprima = require("esprima");

var _esprima2 = _interopRequireDefault(_esprima);

var _escodegen = require("escodegen");

var _escodegen2 = _interopRequireDefault(_escodegen);

var _document = require("docx4js/lib/openxml/docx/model/document");

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
			    _variantContainers = [],
			    variants = {};
			return {
				beginVariant: function beginVariant(variant) {
					if (_currentContainer && _currentContainer != variantDocument) variant.wXml.setAttribute('id', variant.vId);

					if (_currentContainer == variantDocument) variant.isRootChild = true;

					switch (variant.type) {
						case 'variant.exp':
						case 'variant.picture':
							variant.variantParent = _currentContainer;
							_currentContainer.variantChildren.push(variant);
							variants[variant.vId] = variant;
							break;
						case 'variant.if':
						case 'variant.for':
							variant.variantParent = _currentContainer;
							_currentContainer.variantChildren.push(variant);
							_variantContainers.push(_currentContainer);
							variants[variant.vId] = variant;
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
				},


				variants: variants
			};
		}(_this));

		_this.variantParent = null;
		_this.variantChildren = [];
		_this.parsedCode = _esprima2.default.parse("with(data){with(variants){}}");
		_this.codeBlock = _this.parsedCode.body[0].body.body[0].body.body;
		_this.wDoc.beginVariant(_this);
		return _this;
	}

	/**
 * which makes it as a variant
 */


	_createClass(Document, [{
		key: "parse",
		value: function parse() {
			var r = _get(Object.getPrototypeOf(Document.prototype), "parse", this).apply(this, arguments);
			this.wDoc.endVariant(this);

			if (typeof this.parsedCode != 'function') {
				var code = _escodegen2.default.generate(this.parsedCode);
				//console.log(code)
				this.parsedCode = new Function("data,variants", _escodegen2.default.generate(this.parsedCode));
			}

			return r;
		}
	}, {
		key: "visit",
		value: function visit() {}
		//which makes the class as a visitor


		/**
  * public API for variant docx
  */

	}, {
		key: "assemble",
		value: function assemble(data, transactional) {
			var _this2 = this;

			if (!transactional) this.variantChildren.forEach(function (a) {
				return a.assembledXml = a.wXml.cloneNode(true);
			});

			this.parsedCode.call({}, data, this.wDoc.variants);

			var wDoc = this.wDoc,
			    variantChildren = this.variantChildren,
			    doSave = this.wDoc._doSave.bind(this.wDoc);

			if (transactional) {
				return {
					save: function save(file) {
						doSave(this.data, file);
					},
					parse: function parse() {
						var _arguments = arguments;

						return require("docx4js").load(this.data).then(function (docx) {
							return docx.parse.apply(docx, _arguments);
						});
					},

					get data() {
						wDoc._serialize();
						return getNewDocxData(wDoc);
					},
					variantChildren: variantChildren
				};
			} else {
				var _ret = function () {
					_this2.variantChildren.map(function (variant) {
						var parent = variant.wXml.parentNode;
						variant.assembledXml && parent.appendChild(variant.assembledXml);
						parent.removeChild(viariant.wXml);
					});
					wDoc._serialize();
					var newDocxData = getNewDocxData(wDoc);
					wDoc._restore();
					return {
						v: {
							save: function save(file) {
								doSave(newDocxData, file);
							},
							parse: function parse() {
								var _arguments2 = arguments;

								return require("docx4js").load(newDocxData).then(function (docx) {
									return docx.parse.apply(docx, _arguments2);
								});
							},

							data: newDocxData,
							variantChildren: variantChildren
						}
					};
				}();

				if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
			}

			if (transactional) {
				this.assemble = function () {
					throw new Error("transactional assembly can't support multiple times assembling");
				};
			}
		}
	}]);

	return Document;
}(_document2.default);

exports.default = Document;


function getNewDocxData(wDoc) {
	if ($.isNode) return wDoc.raw.generate({ type: "nodebuffer" });
	var data = wDoc.raw.generate({ type: "blob", mimeType: "application/docx" });
	data.name = "[docx-template generated].docx";
	return data;
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztJQUVxQjs7O0FBQ3BCLFVBRG9CLFFBQ3BCLEdBQWE7d0JBRE8sVUFDUDs7cUVBRE8sc0JBRVYsWUFERzs7QUFFWixTQUFPLE1BQVAsQ0FBYyxNQUFLLElBQUwsRUFBVSxVQUFTLGVBQVQsRUFBeUI7QUFDaEQsT0FBSSwwQkFBSjtPQUNDLHFCQUFtQixFQUFuQjtPQUNBLFdBQVMsRUFBVCxDQUgrQztBQUloRCxVQUFPO0FBQ0wsd0NBQWEsU0FBUTtBQUNwQixTQUFHLHFCQUNGLHFCQUFtQixlQUFuQixFQUNBLFFBQVEsSUFBUixDQUFhLFlBQWIsQ0FBMEIsSUFBMUIsRUFBK0IsUUFBUSxHQUFSLENBQS9CLENBRkQ7O0FBSUEsU0FBRyxxQkFBbUIsZUFBbkIsRUFDRixRQUFRLFdBQVIsR0FBb0IsSUFBcEIsQ0FERDs7QUFHQSxhQUFPLFFBQVEsSUFBUjtBQUNQLFdBQUssYUFBTCxDQURBO0FBRUEsV0FBSyxpQkFBTDtBQUNDLGVBQVEsYUFBUixHQUFzQixpQkFBdEIsQ0FERDtBQUVDLHlCQUFrQixlQUFsQixDQUFrQyxJQUFsQyxDQUF1QyxPQUF2QyxFQUZEO0FBR0MsZ0JBQVMsUUFBUSxHQUFSLENBQVQsR0FBc0IsT0FBdEIsQ0FIRDtBQUlBLGFBSkE7QUFGQSxXQU9LLFlBQUwsQ0FQQTtBQVFBLFdBQUssYUFBTDtBQUNDLGVBQVEsYUFBUixHQUFzQixpQkFBdEIsQ0FERDtBQUVDLHlCQUFrQixlQUFsQixDQUFrQyxJQUFsQyxDQUF1QyxPQUF2QyxFQUZEO0FBR0MsMEJBQW1CLElBQW5CLENBQXdCLGlCQUF4QixFQUhEO0FBSUMsZ0JBQVMsUUFBUSxHQUFSLENBQVQsR0FBc0IsT0FBdEIsQ0FKRDtBQVJBLFdBYUssVUFBTDtBQUNDLDJCQUFrQixPQUFsQixDQUREO0FBYkEsTUFSb0I7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QW5CLEVBRFM7UUFESjtBQUlOLCtCQUFPOzs7QUFDTixlQUFPLFFBQVEsU0FBUixFQUFtQixJQUFuQixDQUF3QixXQUF4QixFQUFxQyxJQUFyQyxDQUEwQztnQkFBTSxLQUFLLEtBQUw7U0FBTixDQUFqRCxDQURNO1FBSkQ7O0FBT04sYUFBSyxXQUFMO0FBQ0EsdUNBUk07O01BQVA7UUFUSTs7O0lBZEw7O0FBbUNBLE9BQUcsYUFBSCxFQUFpQjtBQUNoQixTQUFLLFFBQUwsR0FBYyxZQUFVO0FBQ3ZCLFdBQU0sSUFBSSxLQUFKLENBQVUsZ0VBQVYsQ0FBTixDQUR1QjtLQUFWLENBREU7SUFBakI7Ozs7UUEzSG1COzs7Ozs7QUFtSXJCLFNBQVMsY0FBVCxDQUF3QixJQUF4QixFQUE2QjtBQUM1QixLQUFHLEVBQUUsTUFBRixFQUNGLE9BQU8sS0FBSyxHQUFMLENBQVMsUUFBVCxDQUFrQixFQUFDLE1BQUssWUFBTCxFQUFuQixDQUFQLENBREQ7QUFFQSxLQUFJLE9BQUssS0FBSyxHQUFMLENBQVMsUUFBVCxDQUFrQixFQUFDLE1BQU0sTUFBTixFQUFhLFVBQVUsa0JBQVYsRUFBaEMsQ0FBTCxDQUh3QjtBQUk1QixNQUFLLElBQUwsR0FBVSxnQ0FBVixDQUo0QjtBQUs1QixRQUFPLElBQVAsQ0FMNEI7Q0FBN0IiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXNwcmltYSBmcm9tIFwiZXNwcmltYVwiXHJcbmltcG9ydCBlc2NvZGVnZW4gZnJvbSBcImVzY29kZWdlblwiXHJcblxyXG5pbXBvcnQgQmFzZURvY3VtZW50IGZyb20gXCJkb2N4NGpzL2xpYi9vcGVueG1sL2RvY3gvbW9kZWwvZG9jdW1lbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBCYXNlRG9jdW1lbnR7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdE9iamVjdC5hc3NpZ24odGhpcy53RG9jLGZ1bmN0aW9uKHZhcmlhbnREb2N1bWVudCl7XHJcblx0XHRcdGxldCBfY3VycmVudENvbnRhaW5lcixcclxuXHRcdFx0XHRfdmFyaWFudENvbnRhaW5lcnM9W10sXHJcblx0XHRcdFx0dmFyaWFudHM9e31cclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdGJlZ2luVmFyaWFudCh2YXJpYW50KXtcclxuXHRcdFx0XHRcdFx0aWYoX2N1cnJlbnRDb250YWluZXIgJiZcclxuXHRcdFx0XHRcdFx0XHRfY3VycmVudENvbnRhaW5lciE9dmFyaWFudERvY3VtZW50KVxyXG5cdFx0XHRcdFx0XHRcdHZhcmlhbnQud1htbC5zZXRBdHRyaWJ1dGUoJ2lkJyx2YXJpYW50LnZJZClcclxuXHJcblx0XHRcdFx0XHRcdGlmKF9jdXJyZW50Q29udGFpbmVyPT12YXJpYW50RG9jdW1lbnQpXHJcblx0XHRcdFx0XHRcdFx0dmFyaWFudC5pc1Jvb3RDaGlsZD10cnVlXHJcblxyXG5cdFx0XHRcdFx0XHRzd2l0Y2godmFyaWFudC50eXBlKXtcclxuXHRcdFx0XHRcdFx0Y2FzZSAndmFyaWFudC5leHAnOlxyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LnBpY3R1cmUnOlxyXG5cdFx0XHRcdFx0XHRcdHZhcmlhbnQudmFyaWFudFBhcmVudD1fY3VycmVudENvbnRhaW5lclxyXG5cdFx0XHRcdFx0XHRcdF9jdXJyZW50Q29udGFpbmVyLnZhcmlhbnRDaGlsZHJlbi5wdXNoKHZhcmlhbnQpXHJcblx0XHRcdFx0XHRcdFx0dmFyaWFudHNbdmFyaWFudC52SWRdPXZhcmlhbnRcclxuXHRcdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdFx0Y2FzZSAndmFyaWFudC5pZic6XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuZm9yJzpcclxuXHRcdFx0XHRcdFx0XHR2YXJpYW50LnZhcmlhbnRQYXJlbnQ9X2N1cnJlbnRDb250YWluZXJcclxuXHRcdFx0XHRcdFx0XHRfY3VycmVudENvbnRhaW5lci52YXJpYW50Q2hpbGRyZW4ucHVzaCh2YXJpYW50KVxyXG5cdFx0XHRcdFx0XHRcdF92YXJpYW50Q29udGFpbmVycy5wdXNoKF9jdXJyZW50Q29udGFpbmVyKVxyXG5cdFx0XHRcdFx0XHRcdHZhcmlhbnRzW3ZhcmlhbnQudklkXT12YXJpYW50XHJcblx0XHRcdFx0XHRcdGNhc2UgJ2RvY3VtZW50JzpcclxuXHRcdFx0XHRcdFx0XHRfY3VycmVudENvbnRhaW5lcj12YXJpYW50XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0cmV0dXJuIHZhcmlhbnRcclxuXHRcdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdFx0ZW5kVmFyaWFudCh2YXJpYW50KXtcclxuXHRcdFx0XHRcdFx0c3dpdGNoKHZhcmlhbnQudHlwZSl7XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuaWYnOlxyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmZvcic6XHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXI9X3ZhcmlhbnRDb250YWluZXJzLnBvcCgpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdFx0dmFyaWFudHNcclxuXHRcdFx0fVxyXG5cdFx0fSh0aGlzKSlcclxuXHJcblx0XHR0aGlzLnZhcmlhbnRQYXJlbnQ9bnVsbFxyXG5cdFx0dGhpcy52YXJpYW50Q2hpbGRyZW49W11cclxuXHRcdHRoaXMucGFyc2VkQ29kZT1lc3ByaW1hLnBhcnNlKFwid2l0aChkYXRhKXt3aXRoKHZhcmlhbnRzKXt9fVwiKVxyXG5cdFx0dGhpcy5jb2RlQmxvY2s9dGhpcy5wYXJzZWRDb2RlLmJvZHlbMF0uYm9keS5ib2R5WzBdLmJvZHkuYm9keVxyXG5cdFx0dGhpcy53RG9jLmJlZ2luVmFyaWFudCh0aGlzKVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0KiB3aGljaCBtYWtlcyBpdCBhcyBhIHZhcmlhbnRcclxuXHQqL1xyXG5cdHBhcnNlKCl7XHJcblx0XHR2YXIgcj1zdXBlci5wYXJzZSguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLndEb2MuZW5kVmFyaWFudCh0aGlzKVxyXG5cclxuXHRcdGlmKHR5cGVvZih0aGlzLnBhcnNlZENvZGUpIT0nZnVuY3Rpb24nKXtcclxuXHRcdFx0dmFyIGNvZGU9ZXNjb2RlZ2VuLmdlbmVyYXRlKHRoaXMucGFyc2VkQ29kZSlcclxuXHRcdFx0Ly9jb25zb2xlLmxvZyhjb2RlKVxyXG5cdFx0XHR0aGlzLnBhcnNlZENvZGU9bmV3IEZ1bmN0aW9uKFwiZGF0YSx2YXJpYW50c1wiLGVzY29kZWdlbi5nZW5lcmF0ZSh0aGlzLnBhcnNlZENvZGUpKVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByXHJcblx0fVxyXG5cclxuXHR2aXNpdCgpe1xyXG5cdFx0Ly93aGljaCBtYWtlcyB0aGUgY2xhc3MgYXMgYSB2aXNpdG9yXHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0KiBwdWJsaWMgQVBJIGZvciB2YXJpYW50IGRvY3hcclxuXHQqL1xyXG5cdGFzc2VtYmxlKGRhdGEsIHRyYW5zYWN0aW9uYWwpe1xyXG5cdFx0aWYoIXRyYW5zYWN0aW9uYWwpXHJcblx0XHRcdHRoaXMudmFyaWFudENoaWxkcmVuLmZvckVhY2goYT0+YS5hc3NlbWJsZWRYbWw9YS53WG1sLmNsb25lTm9kZSh0cnVlKSApXHJcblxyXG5cdFx0dGhpcy5wYXJzZWRDb2RlLmNhbGwoe30sIGRhdGEsIHRoaXMud0RvYy52YXJpYW50cylcclxuXHJcblx0XHRsZXQgd0RvYz10aGlzLndEb2MsIFxyXG5cdFx0XHR2YXJpYW50Q2hpbGRyZW49dGhpcy52YXJpYW50Q2hpbGRyZW4sXHJcblx0XHRcdGRvU2F2ZT10aGlzLndEb2MuX2RvU2F2ZS5iaW5kKHRoaXMud0RvYylcclxuXHJcblx0XHRpZih0cmFuc2FjdGlvbmFsKXtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRzYXZlKGZpbGUpe1xyXG5cdFx0XHRcdFx0ZG9TYXZlKHRoaXMuZGF0YSwgZmlsZSlcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHBhcnNlKCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gcmVxdWlyZShcImRvY3g0anNcIikubG9hZCh0aGlzLmRhdGEpLnRoZW4oZG9jeD0+ZG9jeC5wYXJzZSguLi5hcmd1bWVudHMpKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Z2V0IGRhdGEoKXtcclxuXHRcdFx0XHRcdHdEb2MuX3NlcmlhbGl6ZSgpXHJcblx0XHRcdFx0XHRyZXR1cm4gZ2V0TmV3RG9jeERhdGEod0RvYylcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHZhcmlhbnRDaGlsZHJlblxyXG5cdFx0XHR9XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0dGhpcy52YXJpYW50Q2hpbGRyZW4ubWFwKHZhcmlhbnQ9PntcclxuXHRcdFx0XHRsZXQgcGFyZW50PXZhcmlhbnQud1htbC5wYXJlbnROb2RlXHJcblx0XHRcdFx0dmFyaWFudC5hc3NlbWJsZWRYbWwgJiYgcGFyZW50LmFwcGVuZENoaWxkKHZhcmlhbnQuYXNzZW1ibGVkWG1sKVxyXG5cdFx0XHRcdHBhcmVudC5yZW1vdmVDaGlsZCh2aWFyaWFudC53WG1sKVxyXG5cdFx0XHR9KVxyXG5cdFx0XHR3RG9jLl9zZXJpYWxpemUoKVxyXG5cdFx0XHRsZXQgbmV3RG9jeERhdGE9Z2V0TmV3RG9jeERhdGEod0RvYylcclxuXHRcdFx0d0RvYy5fcmVzdG9yZSgpXHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0c2F2ZShmaWxlKXtcclxuXHRcdFx0XHRcdGRvU2F2ZShuZXdEb2N4RGF0YSxmaWxlKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0cGFyc2UoKXtcclxuXHRcdFx0XHRcdHJldHVybiByZXF1aXJlKFwiZG9jeDRqc1wiKS5sb2FkKG5ld0RvY3hEYXRhKS50aGVuKGRvY3g9PmRvY3gucGFyc2UoLi4uYXJndW1lbnRzKSlcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGRhdGE6bmV3RG9jeERhdGEsXHJcblx0XHRcdFx0dmFyaWFudENoaWxkcmVuXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZih0cmFuc2FjdGlvbmFsKXtcclxuXHRcdFx0dGhpcy5hc3NlbWJsZT1mdW5jdGlvbigpe1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcInRyYW5zYWN0aW9uYWwgYXNzZW1ibHkgY2FuJ3Qgc3VwcG9ydCBtdWx0aXBsZSB0aW1lcyBhc3NlbWJsaW5nXCIpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE5ld0RvY3hEYXRhKHdEb2Mpe1xyXG5cdGlmKCQuaXNOb2RlKVxyXG5cdFx0cmV0dXJuIHdEb2MucmF3LmdlbmVyYXRlKHt0eXBlOlwibm9kZWJ1ZmZlclwifSlcclxuXHR2YXIgZGF0YT13RG9jLnJhdy5nZW5lcmF0ZSh7dHlwZTogXCJibG9iXCIsbWltZVR5cGU6IFwiYXBwbGljYXRpb24vZG9jeFwifSlcclxuXHRkYXRhLm5hbWU9XCJbZG9jeC10ZW1wbGF0ZSBnZW5lcmF0ZWRdLmRvY3hcIlxyXG5cdHJldHVybiBkYXRhXHJcbn1cclxuXHJcblxyXG4iXX0=