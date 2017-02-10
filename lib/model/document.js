"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _esprima = require("esprima");

var _esprima2 = _interopRequireDefault(_esprima);

var _escodegen = require("escodegen");

var _escodegen2 = _interopRequireDefault(_escodegen);

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

var _variant = require("./variant");

var _variant2 = _interopRequireDefault(_variant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Document = function (_Variant) {
	_inherits(Document, _Variant);

	function Document(node, children, docx) {
		_classCallCheck(this, Document);

		var _this = _possibleConstructorReturn(this, (Document.__proto__ || Object.getPrototypeOf(Document)).call(this, node, null, children));

		_this.docx = docx;
		return _this;
	}

	/**
 * which makes it as a variant
 */


	_createClass(Document, [{
		key: "parse",
		value: function parse() {
			var r = _get(Document.prototype.__proto__ || Object.getPrototypeOf(Document.prototype), "parse", this).apply(this, arguments);
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

			var newDocx = this.docx.clone();

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

						return _docx4js2.default.load(this.data).then(function (docx) {
							return docx.parse.apply(docx, _arguments);
						});
					},

					get data() {
						wDoc._serialize();
						return getNewDocxData(wDoc);
					},
					get variantChildren() {
						return variantChildren;
					}
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

								return _docx4js2.default.load(newDocxData).then(function (docx) {
									return docx.parse.apply(docx, _arguments2);
								});
							},

							get data() {
								return newDocxData;
							},
							get variantChildren() {
								return variantChildren;
							}
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
}(_variant2.default);

exports.default = Document;


function getNewDocxData(wDoc) {
	if ($.isNode) return wDoc.raw.generate({ type: "nodebuffer" });
	var data = wDoc.raw.generate({ type: "blob", mimeType: "application/docx" });
	data.name = "a.docx";

	return data;
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJEb2N1bWVudCIsIm5vZGUiLCJjaGlsZHJlbiIsImRvY3giLCJyIiwiYXJndW1lbnRzIiwid0RvYyIsImVuZFZhcmlhbnQiLCJwYXJzZWRDb2RlIiwiY29kZSIsImdlbmVyYXRlIiwiRnVuY3Rpb24iLCJkYXRhIiwidHJhbnNhY3Rpb25hbCIsIm5ld0RvY3giLCJjbG9uZSIsInZhcmlhbnRDaGlsZHJlbiIsImZvckVhY2giLCJhIiwiYXNzZW1ibGVkWG1sIiwid1htbCIsImNsb25lTm9kZSIsImNhbGwiLCJ2YXJpYW50cyIsImRvU2F2ZSIsIl9kb1NhdmUiLCJiaW5kIiwic2F2ZSIsImZpbGUiLCJwYXJzZSIsImxvYWQiLCJ0aGVuIiwiX3NlcmlhbGl6ZSIsImdldE5ld0RvY3hEYXRhIiwibWFwIiwicGFyZW50IiwidmFyaWFudCIsInBhcmVudE5vZGUiLCJhcHBlbmRDaGlsZCIsInJlbW92ZUNoaWxkIiwidmlhcmlhbnQiLCJuZXdEb2N4RGF0YSIsIl9yZXN0b3JlIiwiYXNzZW1ibGUiLCJFcnJvciIsIiQiLCJpc05vZGUiLCJyYXciLCJ0eXBlIiwibWltZVR5cGUiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7QUFDcEIsbUJBQVlDLElBQVosRUFBaUJDLFFBQWpCLEVBQTBCQyxJQUExQixFQUErQjtBQUFBOztBQUFBLGtIQUN4QkYsSUFEd0IsRUFDbkIsSUFEbUIsRUFDYkMsUUFEYTs7QUFFOUIsUUFBS0MsSUFBTCxHQUFVQSxJQUFWO0FBRjhCO0FBRzlCOztBQUVEOzs7Ozs7OzBCQUdPO0FBQ04sT0FBSUMsK0dBQWlCQyxTQUFqQixDQUFKO0FBQ0EsUUFBS0MsSUFBTCxDQUFVQyxVQUFWLENBQXFCLElBQXJCOztBQUVBLE9BQUcsT0FBTyxLQUFLQyxVQUFaLElBQXlCLFVBQTVC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M0IsSUFBeEIsRUFBNkI7QUFDNUIsS0FBR3VDLEVBQUVDLE1BQUwsRUFDQyxPQUFPeEMsS0FBS3lDLEdBQUwsQ0FBU3JDLFFBQVQsQ0FBa0IsRUFBQ3NDLE1BQUssWUFBTixFQUFsQixDQUFQO0FBQ0QsS0FBSXBDLE9BQUtOLEtBQUt5QyxHQUFMLENBQVNyQyxRQUFULENBQWtCLEVBQUNzQyxNQUFNLE1BQVAsRUFBY0MsVUFBVSxrQkFBeEIsRUFBbEIsQ0FBVDtBQUNBckMsTUFBS3NDLElBQUwsR0FBVSxRQUFWOztBQUVBLFFBQU90QyxJQUFQO0FBQ0EiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXNwcmltYSBmcm9tIFwiZXNwcmltYVwiXHJcbmltcG9ydCBlc2NvZGVnZW4gZnJvbSBcImVzY29kZWdlblwiXHJcblxyXG5pbXBvcnQgZG9jeDRqcyBmcm9tIFwiZG9jeDRqc1wiXHJcblxyXG5pbXBvcnQgVmFyaWFudCBmcm9tIFwiLi92YXJpYW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgVmFyaWFudHtcclxuXHRjb25zdHJ1Y3Rvcihub2RlLGNoaWxkcmVuLGRvY3gpe1xyXG5cdFx0c3VwZXIobm9kZSxudWxsLCBjaGlsZHJlbilcclxuXHRcdHRoaXMuZG9jeD1kb2N4XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQqIHdoaWNoIG1ha2VzIGl0IGFzIGEgdmFyaWFudFxyXG5cdCovXHJcblx0cGFyc2UoKXtcclxuXHRcdHZhciByPXN1cGVyLnBhcnNlKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMud0RvYy5lbmRWYXJpYW50KHRoaXMpXHJcblxyXG5cdFx0aWYodHlwZW9mKHRoaXMucGFyc2VkQ29kZSkhPSdmdW5jdGlvbicpe1xyXG5cdFx0XHR2YXIgY29kZT1lc2NvZGVnZW4uZ2VuZXJhdGUodGhpcy5wYXJzZWRDb2RlKVxyXG5cdFx0XHQvL2NvbnNvbGUubG9nKGNvZGUpXHJcblx0XHRcdHRoaXMucGFyc2VkQ29kZT1uZXcgRnVuY3Rpb24oXCJkYXRhLHZhcmlhbnRzXCIsZXNjb2RlZ2VuLmdlbmVyYXRlKHRoaXMucGFyc2VkQ29kZSkpXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJcclxuXHR9XHJcblxyXG5cdHZpc2l0KCl7XHJcblx0XHQvL3doaWNoIG1ha2VzIHRoZSBjbGFzcyBhcyBhIHZpc2l0b3JcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCogcHVibGljIEFQSSBmb3IgdmFyaWFudCBkb2N4XHJcblx0Ki9cclxuXHRhc3NlbWJsZShkYXRhLCB0cmFuc2FjdGlvbmFsKXtcclxuXHRcdGxldCBuZXdEb2N4PXRoaXMuZG9jeC5jbG9uZSgpXHJcblx0XHRcclxuXHRcdFxyXG5cdFx0XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0XHJcblx0XHRpZighdHJhbnNhY3Rpb25hbClcclxuXHRcdFx0dGhpcy52YXJpYW50Q2hpbGRyZW4uZm9yRWFjaChhPT5hLmFzc2VtYmxlZFhtbD1hLndYbWwuY2xvbmVOb2RlKHRydWUpIClcclxuXHJcblx0XHR0aGlzLnBhcnNlZENvZGUuY2FsbCh7fSwgZGF0YSwgdGhpcy53RG9jLnZhcmlhbnRzKVxyXG5cclxuXHRcdGxldCB3RG9jPXRoaXMud0RvYyxcclxuXHRcdFx0dmFyaWFudENoaWxkcmVuPXRoaXMudmFyaWFudENoaWxkcmVuLFxyXG5cdFx0XHRkb1NhdmU9dGhpcy53RG9jLl9kb1NhdmUuYmluZCh0aGlzLndEb2MpXHJcblxyXG5cdFx0aWYodHJhbnNhY3Rpb25hbCl7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0c2F2ZShmaWxlKXtcclxuXHRcdFx0XHRcdGRvU2F2ZSh0aGlzLmRhdGEsIGZpbGUpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRwYXJzZSgpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIGRvY3g0anMubG9hZCh0aGlzLmRhdGEpLnRoZW4oZG9jeD0+ZG9jeC5wYXJzZSguLi5hcmd1bWVudHMpKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Z2V0IGRhdGEoKXtcclxuXHRcdFx0XHRcdHdEb2MuX3NlcmlhbGl6ZSgpXHJcblx0XHRcdFx0XHRyZXR1cm4gZ2V0TmV3RG9jeERhdGEod0RvYylcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGdldCB2YXJpYW50Q2hpbGRyZW4oKXtcclxuXHRcdFx0XHRcdHJldHVybiB2YXJpYW50Q2hpbGRyZW5cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1lbHNle1xyXG5cdFx0XHR0aGlzLnZhcmlhbnRDaGlsZHJlbi5tYXAodmFyaWFudD0+e1xyXG5cdFx0XHRcdGxldCBwYXJlbnQ9dmFyaWFudC53WG1sLnBhcmVudE5vZGVcclxuXHRcdFx0XHR2YXJpYW50LmFzc2VtYmxlZFhtbCAmJiBwYXJlbnQuYXBwZW5kQ2hpbGQodmFyaWFudC5hc3NlbWJsZWRYbWwpXHJcblx0XHRcdFx0cGFyZW50LnJlbW92ZUNoaWxkKHZpYXJpYW50LndYbWwpXHJcblx0XHRcdH0pXHJcblx0XHRcdHdEb2MuX3NlcmlhbGl6ZSgpXHJcblx0XHRcdGxldCBuZXdEb2N4RGF0YT1nZXROZXdEb2N4RGF0YSh3RG9jKVxyXG5cdFx0XHR3RG9jLl9yZXN0b3JlKClcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRzYXZlKGZpbGUpe1xyXG5cdFx0XHRcdFx0ZG9TYXZlKG5ld0RvY3hEYXRhLGZpbGUpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRwYXJzZSgpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIGRvY3g0anMubG9hZChuZXdEb2N4RGF0YSkudGhlbihkb2N4PT5kb2N4LnBhcnNlKC4uLmFyZ3VtZW50cykpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRnZXQgZGF0YSgpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIG5ld0RvY3hEYXRhXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRnZXQgdmFyaWFudENoaWxkcmVuKCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gdmFyaWFudENoaWxkcmVuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYodHJhbnNhY3Rpb25hbCl7XHJcblx0XHRcdHRoaXMuYXNzZW1ibGU9ZnVuY3Rpb24oKXtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ0cmFuc2FjdGlvbmFsIGFzc2VtYmx5IGNhbid0IHN1cHBvcnQgbXVsdGlwbGUgdGltZXMgYXNzZW1ibGluZ1wiKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXROZXdEb2N4RGF0YSh3RG9jKXtcclxuXHRpZigkLmlzTm9kZSlcclxuXHRcdHJldHVybiB3RG9jLnJhdy5nZW5lcmF0ZSh7dHlwZTpcIm5vZGVidWZmZXJcIn0pXHJcblx0dmFyIGRhdGE9d0RvYy5yYXcuZ2VuZXJhdGUoe3R5cGU6IFwiYmxvYlwiLG1pbWVUeXBlOiBcImFwcGxpY2F0aW9uL2RvY3hcIn0pXHJcblx0ZGF0YS5uYW1lPVwiYS5kb2N4XCJcclxuXHJcblx0cmV0dXJuIGRhdGFcclxufVxyXG4iXX0=