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
						wDoc._serialize();
						doSave(this.data, file);
					},
					parse: function parse() {
						return wDoc.parse.apply(wDoc, arguments);
					},

					get data() {
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
								var _require$load;

								return (_require$load = require("docx4js").load(newDocxData)).parse.apply(_require$load, arguments);
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
	return $.isNode ? wDoc.raw.generate({ type: "nodebuffer" }) : wDoc.raw.generate({ type: "blob", mimeType: "application/docx" });
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztJQUVxQjs7O0FBQ3BCLFVBRG9CLFFBQ3BCLEdBQWE7d0JBRE8sVUFDUDs7cUVBRE8sc0JBRVYsWUFERzs7QUFFWixTQUFPLE1BQVAsQ0FBYyxNQUFLLElBQUwsRUFBVSxVQUFTLGVBQVQsRUFBeUI7QUFDaEQsT0FBSSwwQkFBSjtPQUNDLHFCQUFtQixFQUFuQjtPQUNBLFdBQVMsRUFBVCxDQUgrQztBQUloRCxVQUFPO0FBQ0wsd0NBQWEsU0FBUTtBQUNwQixTQUFHLHFCQUNGLHFCQUFtQixlQUFuQixFQUNBLFFBQVEsSUFBUixDQUFhLFlBQWIsQ0FBMEIsSUFBMUIsRUFBK0IsUUFBUSxHQUFSLENBQS9CLENBRkQ7O0FBSUEsU0FBRyxxQkFBbUIsZUFBbkIsRUFDRixRQUFRLFdBQVIsR0FBb0IsSUFBcEIsQ0FERDs7QUFHQSxhQUFPLFFBQVEsSUFBUjtBQUNQLFdBQUssYUFBTCxDQURBO0FBRUEsV0FBSyxpQkFBTDtBQUNDLGVBQVEsYUFBUixHQUFzQixpQkFBdEIsQ0FERDtBQUVDLHlCQUFrQixlQUFsQixDQUFrQyxJQUFsQyxDQUF1QyxPQUF2QyxFQUZEO0FBR0MsZ0JBQVMsUUFBUSxHQUFSLENBQVQsR0FBc0IsT0FBdEIsQ0FIRDtBQUlBLGFBSkE7QUFGQSxXQU9LLFlBQUwsQ0FQQTtBQVFBLFdBQUssYUFBTDtBQUNDLGVBQVEsYUFBUixHQUFzQixpQkFBdEIsQ0FERDtBQUVDLHlCQUFrQixlQUFsQixDQUFrQyxJQUFsQyxDQUF1QyxPQUF2QyxFQUZEO0FBR0MsMEJBQW1CLElBQW5CLENBQXdCLGlCQUF4QixFQUhEO0FBSUMsZ0JBQVMsUUFBUSxHQUFSLENBQVQsR0FBc0IsT0FBdEIsQ0FKRDtBQVJBLFdBYUssVUFBTDtBQUNDLDJCQUFrQixPQUFsQixDQUREO0FBYkEsTUFSb0I7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LFdBQXhCLEdBQXFDLEtBQXJDLHNCQUE4QyxTQUE5QyxDQUFQLENBRE07UUFKRDs7QUFPTixhQUFLLFdBQUw7QUFDQSx1Q0FSTTs7TUFBUDtRQVRJOzs7SUFkTDs7QUFtQ0EsT0FBRyxhQUFILEVBQWlCO0FBQ2hCLFNBQUssUUFBTCxHQUFjLFlBQVU7QUFDdkIsV0FBTSxJQUFJLEtBQUosQ0FBVSxnRUFBVixDQUFOLENBRHVCO0tBQVYsQ0FERTtJQUFqQjs7OztRQTNIbUI7Ozs7OztBQW1JckIsU0FBUyxjQUFULENBQXdCLElBQXhCLEVBQTZCO0FBQzVCLFFBQU8sRUFBRSxNQUFGLEdBQVcsS0FBSyxHQUFMLENBQVMsUUFBVCxDQUFrQixFQUFDLE1BQUssWUFBTCxFQUFuQixDQUFYLEdBQW9ELEtBQUssR0FBTCxDQUFTLFFBQVQsQ0FBa0IsRUFBQyxNQUFNLE1BQU4sRUFBYSxVQUFVLGtCQUFWLEVBQWhDLENBQXBELENBRHFCO0NBQTdCIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGVzcHJpbWEgZnJvbSBcImVzcHJpbWFcIlxyXG5pbXBvcnQgZXNjb2RlZ2VuIGZyb20gXCJlc2NvZGVnZW5cIlxyXG5cclxuaW1wb3J0IEJhc2VEb2N1bWVudCBmcm9tIFwiZG9jeDRqcy9saWIvb3BlbnhtbC9kb2N4L21vZGVsL2RvY3VtZW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgQmFzZURvY3VtZW50e1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHRPYmplY3QuYXNzaWduKHRoaXMud0RvYyxmdW5jdGlvbih2YXJpYW50RG9jdW1lbnQpe1xyXG5cdFx0XHRsZXQgX2N1cnJlbnRDb250YWluZXIsXHJcblx0XHRcdFx0X3ZhcmlhbnRDb250YWluZXJzPVtdLFxyXG5cdFx0XHRcdHZhcmlhbnRzPXt9XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRiZWdpblZhcmlhbnQodmFyaWFudCl7XHJcblx0XHRcdFx0XHRcdGlmKF9jdXJyZW50Q29udGFpbmVyICYmXHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXIhPXZhcmlhbnREb2N1bWVudClcclxuXHRcdFx0XHRcdFx0XHR2YXJpYW50LndYbWwuc2V0QXR0cmlidXRlKCdpZCcsdmFyaWFudC52SWQpXHJcblxyXG5cdFx0XHRcdFx0XHRpZihfY3VycmVudENvbnRhaW5lcj09dmFyaWFudERvY3VtZW50KVxyXG5cdFx0XHRcdFx0XHRcdHZhcmlhbnQuaXNSb290Q2hpbGQ9dHJ1ZVxyXG5cclxuXHRcdFx0XHRcdFx0c3dpdGNoKHZhcmlhbnQudHlwZSl7XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuZXhwJzpcclxuXHRcdFx0XHRcdFx0Y2FzZSAndmFyaWFudC5waWN0dXJlJzpcclxuXHRcdFx0XHRcdFx0XHR2YXJpYW50LnZhcmlhbnRQYXJlbnQ9X2N1cnJlbnRDb250YWluZXJcclxuXHRcdFx0XHRcdFx0XHRfY3VycmVudENvbnRhaW5lci52YXJpYW50Q2hpbGRyZW4ucHVzaCh2YXJpYW50KVxyXG5cdFx0XHRcdFx0XHRcdHZhcmlhbnRzW3ZhcmlhbnQudklkXT12YXJpYW50XHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuaWYnOlxyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmZvcic6XHJcblx0XHRcdFx0XHRcdFx0dmFyaWFudC52YXJpYW50UGFyZW50PV9jdXJyZW50Q29udGFpbmVyXHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXIudmFyaWFudENoaWxkcmVuLnB1c2godmFyaWFudClcclxuXHRcdFx0XHRcdFx0XHRfdmFyaWFudENvbnRhaW5lcnMucHVzaChfY3VycmVudENvbnRhaW5lcilcclxuXHRcdFx0XHRcdFx0XHR2YXJpYW50c1t2YXJpYW50LnZJZF09dmFyaWFudFxyXG5cdFx0XHRcdFx0XHRjYXNlICdkb2N1bWVudCc6XHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXI9dmFyaWFudFxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHJldHVybiB2YXJpYW50XHJcblx0XHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRcdGVuZFZhcmlhbnQodmFyaWFudCl7XHJcblx0XHRcdFx0XHRcdHN3aXRjaCh2YXJpYW50LnR5cGUpe1xyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmlmJzpcclxuXHRcdFx0XHRcdFx0Y2FzZSAndmFyaWFudC5mb3InOlxyXG5cdFx0XHRcdFx0XHRcdF9jdXJyZW50Q29udGFpbmVyPV92YXJpYW50Q29udGFpbmVycy5wb3AoKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRcdHZhcmlhbnRzXHJcblx0XHRcdH1cclxuXHRcdH0odGhpcykpXHJcblxyXG5cdFx0dGhpcy52YXJpYW50UGFyZW50PW51bGxcclxuXHRcdHRoaXMudmFyaWFudENoaWxkcmVuPVtdXHJcblx0XHR0aGlzLnBhcnNlZENvZGU9ZXNwcmltYS5wYXJzZShcIndpdGgoZGF0YSl7d2l0aCh2YXJpYW50cyl7fX1cIilcclxuXHRcdHRoaXMuY29kZUJsb2NrPXRoaXMucGFyc2VkQ29kZS5ib2R5WzBdLmJvZHkuYm9keVswXS5ib2R5LmJvZHlcclxuXHRcdHRoaXMud0RvYy5iZWdpblZhcmlhbnQodGhpcylcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCogd2hpY2ggbWFrZXMgaXQgYXMgYSB2YXJpYW50XHJcblx0Ki9cclxuXHRwYXJzZSgpe1xyXG5cdFx0dmFyIHI9c3VwZXIucGFyc2UoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy53RG9jLmVuZFZhcmlhbnQodGhpcylcclxuXHJcblx0XHRpZih0eXBlb2YodGhpcy5wYXJzZWRDb2RlKSE9J2Z1bmN0aW9uJyl7XHJcblx0XHRcdHZhciBjb2RlPWVzY29kZWdlbi5nZW5lcmF0ZSh0aGlzLnBhcnNlZENvZGUpXHJcblx0XHRcdC8vY29uc29sZS5sb2coY29kZSlcclxuXHRcdFx0dGhpcy5wYXJzZWRDb2RlPW5ldyBGdW5jdGlvbihcImRhdGEsdmFyaWFudHNcIixlc2NvZGVnZW4uZ2VuZXJhdGUodGhpcy5wYXJzZWRDb2RlKSlcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gclxyXG5cdH1cclxuXHJcblx0dmlzaXQoKXtcclxuXHRcdC8vd2hpY2ggbWFrZXMgdGhlIGNsYXNzIGFzIGEgdmlzaXRvclxyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCogcHVibGljIEFQSSBmb3IgdmFyaWFudCBkb2N4XHJcblx0Ki9cclxuXHRhc3NlbWJsZShkYXRhLCB0cmFuc2FjdGlvbmFsKXtcclxuXHRcdGlmKCF0cmFuc2FjdGlvbmFsKVxyXG5cdFx0XHR0aGlzLnZhcmlhbnRDaGlsZHJlbi5mb3JFYWNoKGE9PmEuYXNzZW1ibGVkWG1sPWEud1htbC5jbG9uZU5vZGUodHJ1ZSkgKVxyXG5cclxuXHRcdHRoaXMucGFyc2VkQ29kZS5jYWxsKHt9LCBkYXRhLCB0aGlzLndEb2MudmFyaWFudHMpXHJcblxyXG5cdFx0bGV0IHdEb2M9dGhpcy53RG9jLCBcclxuXHRcdFx0dmFyaWFudENoaWxkcmVuPXRoaXMudmFyaWFudENoaWxkcmVuLFxyXG5cdFx0XHRkb1NhdmU9dGhpcy53RG9jLl9kb1NhdmUuYmluZCh0aGlzLndEb2MpXHJcblxyXG5cdFx0aWYodHJhbnNhY3Rpb25hbCl7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0c2F2ZShmaWxlKXtcclxuXHRcdFx0XHRcdHdEb2MuX3NlcmlhbGl6ZSgpXHJcblx0XHRcdFx0XHRkb1NhdmUodGhpcy5kYXRhLCBmaWxlKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0cGFyc2UoKXtcclxuXHRcdFx0XHRcdHJldHVybiB3RG9jLnBhcnNlKC4uLmFyZ3VtZW50cylcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGdldCBkYXRhKCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gZ2V0TmV3RG9jeERhdGEod0RvYylcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHZhcmlhbnRDaGlsZHJlblxyXG5cdFx0XHR9XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0dGhpcy52YXJpYW50Q2hpbGRyZW4ubWFwKHZhcmlhbnQ9PntcclxuXHRcdFx0XHRsZXQgcGFyZW50PXZhcmlhbnQud1htbC5wYXJlbnROb2RlXHJcblx0XHRcdFx0dmFyaWFudC5hc3NlbWJsZWRYbWwgJiYgcGFyZW50LmFwcGVuZENoaWxkKHZhcmlhbnQuYXNzZW1ibGVkWG1sKVxyXG5cdFx0XHRcdHBhcmVudC5yZW1vdmVDaGlsZCh2aWFyaWFudC53WG1sKVxyXG5cdFx0XHR9KVxyXG5cdFx0XHR3RG9jLl9zZXJpYWxpemUoKVxyXG5cdFx0XHRsZXQgbmV3RG9jeERhdGE9Z2V0TmV3RG9jeERhdGEod0RvYylcclxuXHRcdFx0d0RvYy5fcmVzdG9yZSgpXHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0c2F2ZShmaWxlKXtcclxuXHRcdFx0XHRcdGRvU2F2ZShuZXdEb2N4RGF0YSxmaWxlKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0cGFyc2UoKXtcclxuXHRcdFx0XHRcdHJldHVybiByZXF1aXJlKFwiZG9jeDRqc1wiKS5sb2FkKG5ld0RvY3hEYXRhKS5wYXJzZSguLi5hcmd1bWVudHMpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRkYXRhOm5ld0RvY3hEYXRhLFxyXG5cdFx0XHRcdHZhcmlhbnRDaGlsZHJlblxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYodHJhbnNhY3Rpb25hbCl7XHJcblx0XHRcdHRoaXMuYXNzZW1ibGU9ZnVuY3Rpb24oKXtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ0cmFuc2FjdGlvbmFsIGFzc2VtYmx5IGNhbid0IHN1cHBvcnQgbXVsdGlwbGUgdGltZXMgYXNzZW1ibGluZ1wiKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXROZXdEb2N4RGF0YSh3RG9jKXtcclxuXHRyZXR1cm4gJC5pc05vZGUgPyB3RG9jLnJhdy5nZW5lcmF0ZSh7dHlwZTpcIm5vZGVidWZmZXJcIn0pIDogd0RvYy5yYXcuZ2VuZXJhdGUoe3R5cGU6IFwiYmxvYlwiLG1pbWVUeXBlOiBcImFwcGxpY2F0aW9uL2RvY3hcIn0pXHJcbn1cclxuXHJcblxyXG4iXX0=