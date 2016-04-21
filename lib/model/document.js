"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _document = require("docx4js/lib/openxml/docx/model/document");

var _document2 = _interopRequireDefault(_document);

var _esprima = require("esprima");

var _esprima2 = _interopRequireDefault(_esprima);

var _escodegen = require("escodegen");

var _escodegen2 = _interopRequireDefault(_escodegen);

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

var _part = require("docx4js/lib/openxml/part");

var _part2 = _interopRequireDefault(_part);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function callee(name) {
	return {
		"type": "ExpressionStatement",
		"expression": {
			"type": "CallExpression",
			"callee": {
				"type": "Identifier",
				"name": name
			},
			"arguments": []
		}
	};
}

var Document = function (_BaseDocument) {
	_inherits(Document, _BaseDocument);

	function Document() {
		_classCallCheck(this, Document);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Document).apply(this, arguments));

		Object.assign(_this.wDoc, function (variantDocument) {
			var _currentContainer = void 0,
			    _variantContainers = [],
			    variantParams = {};
			return {
				beginVariant: function beginVariant(variant) {
					var fname = 'assemble_';
					switch (variant.type) {
						case 'variant.exp':
							variant.variantParent = _currentContainer;
							_currentContainer.variantChildren.push(variant);
							fname = "assemble_" + variant.vId;
							_currentContainer.codeBlock.push(callee(fname));
							variantParams[fname] = variant.assemble.bind(variant);
							break;
						case 'variant.if':
						case 'variant.for':
							variant.variantParent = _currentContainer;
							_currentContainer.variantChildren.push(variant);
							_variantContainers.push(_currentContainer);
							_currentContainer.codeBlock.push(variant.parsedCode);

							fname = "assemble_" + variant.vId;
							variant.codeBlock.push(callee(fname));
							variantParams[fname] = variant.assemble.bind(variant);
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


				variantParams: variantParams
			};
		}(_this));

		_this.variantParent = null;
		_this.variantChildren = [];
		_this.parsedCode = _esprima2.default.parse("with(arguments[0]){}");
		_this.codeBlock = _this.parsedCode.body[0].body.body;
		_this.wDoc.beginVariant(_this);
		return _this;
	}

	_createClass(Document, [{
		key: "parse",


		/**
  * which makes it as a variant
  */
		value: function parse() {
			var r = _get(Object.getPrototypeOf(Document.prototype), "parse", this).apply(this, arguments);
			this.wDoc.endVariant(this);

			this.variantChildren.map(function (variant) {
				variant.rawXml = variant.wXml;
				variant.wXml = variant.wXml.cloneNode(true);
			});

			if (typeof this.parsedCode != 'function') this.parsedCode = new Function("data,option", _escodegen2.default.generate(this.parsedCode));

			return r;
		}
	}, {
		key: "visit",
		value: function visit() {
			//which makes the class as a visitor
		}
	}, {
		key: "_toJavascript",
		value: function _toJavascript(iPara) {
			iPara._global = this.wDoc.data;
			return "console.info(JSON.stringify(arguments[0]));with(arguments[0]._global)";
		}
	}, {
		key: "_toJavascriptOfAssembleAsData",
		value: function _toJavascriptOfAssembleAsData() {
			return this._toJavascript.apply(this, arguments);
		}

		/**
  * {varName:xx,if_xxx:{}, for_xxx:{}}
  */

	}, {
		key: "assembleAsData",
		value: function assembleAsData(data) {
			var _this2 = this;

			var iPara = { _global: data };
			var code = this._toJavascriptOfAssembleAsData(iPara) + " {\n\t\t\t" + this.variantChildren.forEach(function (a) {
				"" + _this2._toJavascriptOfAssembleAsData(iPara);
			}) + "\n\t\t}";

			return new Function("data", code)(data);
		}
	}, {
		key: "asStaticDocx",
		value: function asStaticDocx() {
			this.wDoc.variantChildren = this.variantChildren;
			var wDoc = this.wDoc;

			return Object.assign(this.wDoc, {
				save: function save(file) {
					wDoc._serialize();
					var buffer = wDoc.raw.generate({ type: "nodebuffer" });
					var fs = "fs";
					require(fs).writeFile(file, buffer);
				},
				download: function download(file) {
					wDoc._serialize();
					var data = wDoc.raw.generate({ type: "blob", mimeType: "application/docx" });
					var url = window.URL.createObjectURL(data);
					var link = document.createElement("a");
					document.body.appendChild(link);
					link.download = (file || wDoc.props.name || 'new') + ".docx";
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
		key: "assemble",
		value: function assemble(data) {}
	}, {
		key: "data",
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
		setChanged: function setChanged(a) {
			var _doc$_changedParts = this.doc._changedParts;

			var _changedParts = _doc$_changedParts === undefined ? new Set() : _doc$_changedParts;

			this.doc._changedParts = _changedParts;

			_changedParts[a ? 'add' : 'remove'](this);
		},
		_serialize: function _serialize() {
			this.doc.raw.file(this.name, "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\r\n" + new XMLSerializer().serializeToString(this.documentElement));
		},
		addRel: function addRel(rel) {
			var id = "rId" + (Math.max(Object.keys(this.rels).map(function (a) {
				return parseInt(a.substring(3));
			})) + 1);
			this.rels[id] = rel;
			var el = this.documentElement.createElement('Relationship');
			el.setAttribute("Id", id);
			Object.keys(rel).forEach(function (a) {
				return el.setAttribute(a, rel[a]);
			});
			this.documentElement.appendChild(el);
			this.doc.getPart(this.relName).setChanged(true);
		},
		removeRel: function removeRel(id) {
			delete this.rels[id];
			this.documentElement.$1("Relationship[Id=" + id + "]").remove();
			this.doc.getPart(this.relName).setChanged(true);
		}
	});

	Object.assign(_docx4js2.default.prototype, {
		_serialize: function _serialize() {
			var _changedParts = this._changedParts;

			if (_changedParts) {
				_changedParts.forEach(function (part) {
					return part._serialize();
				});
				delete this._changedParts;
			}
		}
	});
})($.isNode ? require(xmldom).XMLSerializer : XMLSerializer);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBOEpBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQTdKQSxTQUFTLE1BQVQsQ0FBZ0IsSUFBaEIsRUFBcUI7QUFDcEIsUUFBTztBQUNOLFVBQVEscUJBQVI7QUFDQSxnQkFBYztBQUNiLFdBQVEsZ0JBQVI7QUFDQSxhQUFVO0FBQ1QsWUFBUSxZQUFSO0FBQ0EsWUFBUSxJQUFSO0lBRkQ7QUFJQSxnQkFBYSxFQUFiO0dBTkQ7RUFGRCxDQURvQjtDQUFyQjs7SUFjcUI7OztBQUNwQixVQURvQixRQUNwQixHQUFhO3dCQURPLFVBQ1A7O3FFQURPLHNCQUVWLFlBREc7O0FBRVosU0FBTyxNQUFQLENBQWMsTUFBSyxJQUFMLEVBQVUsVUFBUyxlQUFULEVBQXlCO0FBQ2hELE9BQUksMEJBQUo7T0FDQyxxQkFBbUIsRUFBbkI7T0FDQSxnQkFBYyxFQUFkLENBSCtDO0FBSWhELFVBQU87QUFDTCx3Q0FBYSxTQUFRO0FBQ3BCLFNBQUksUUFBTSxXQUFOLENBRGdCO0FBRXBCLGFBQU8sUUFBUSxJQUFSO0FBQ1AsV0FBSyxhQUFMO0FBQ0MsZUFBUSxhQUFSLEdBQXNCLGlCQUF0QixDQUREO0FBRUMseUJBQWtCLGVBQWxCLENBQWtDLElBQWxDLENBQXVDLE9BQXZDLEVBRkQ7QUFHQyxlQUFNLGNBQVksUUFBUSxHQUFSLENBSG5CO0FBSUMseUJBQWtCLFNBQWxCLENBQTRCLElBQTVCLENBQWlDLE9BQU8sS0FBUCxDQUFqQyxFQUpEO0FBS0MscUJBQWMsS0FBZCxJQUFxQixRQUFRLFFBQVIsQ0FBaUIsSUFBakIsQ0FBc0IsT0FBdEIsQ0FBckIsQ0FMRDtBQU1BLGFBTkE7QUFEQSxXQVFLLFlBQUwsQ0FSQTtBQVNBLFdBQUssYUFBTDtBQUNDLGVBQVEsYUFBUixHQUFzQixpQkFBdEIsQ0FERDtBQUVDLHlCQUFrQixlQUFsQixD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LEVBSFk7R0FyQmU7RUFBN0IsRUFEdUI7O0FBNkJ2QixRQUFPLE1BQVAsQ0FBYyxrQkFBYSxTQUFiLEVBQXVCO0FBQ3BDLG9DQUFZO09BQ04sZ0JBQWUsS0FBZixjQURNOztBQUVYLE9BQUcsYUFBSCxFQUFpQjtBQUNoQixrQkFBYyxPQUFkLENBQXNCO1lBQU0sS0FBSyxVQUFMO0tBQU4sQ0FBdEIsQ0FEZ0I7QUFFaEIsV0FBTyxLQUFLLGFBQUwsQ0FGUztJQUFqQjtHQUhtQztFQUFyQyxFQTdCdUI7Q0FBdkIsQ0FBRCxDQXNDRyxFQUFFLE1BQUYsR0FBVyxRQUFRLE1BQVIsRUFBZ0IsYUFBaEIsR0FBZ0MsYUFBM0MsQ0F0Q0giLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZURvY3VtZW50IGZyb20gXCJkb2N4NGpzL2xpYi9vcGVueG1sL2RvY3gvbW9kZWwvZG9jdW1lbnRcIlxyXG5pbXBvcnQgZXNwcmltYSBmcm9tIFwiZXNwcmltYVwiXHJcbmltcG9ydCBlc2NvZGVnZW4gZnJvbSBcImVzY29kZWdlblwiXHJcblxyXG5mdW5jdGlvbiBjYWxsZWUobmFtZSl7XHJcblx0cmV0dXJuIHtcclxuXHRcdFwidHlwZVwiOiBcIkV4cHJlc3Npb25TdGF0ZW1lbnRcIixcclxuXHRcdFwiZXhwcmVzc2lvblwiOiB7XHJcblx0XHRcdFwidHlwZVwiOiBcIkNhbGxFeHByZXNzaW9uXCIsXHJcblx0XHRcdFwiY2FsbGVlXCI6IHtcclxuXHRcdFx0XHRcInR5cGVcIjogXCJJZGVudGlmaWVyXCIsXHJcblx0XHRcdFx0XCJuYW1lXCI6IG5hbWVcclxuXHRcdFx0fSxcclxuXHRcdFx0XCJhcmd1bWVudHNcIjogW11cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgQmFzZURvY3VtZW50e1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHRPYmplY3QuYXNzaWduKHRoaXMud0RvYyxmdW5jdGlvbih2YXJpYW50RG9jdW1lbnQpe1xyXG5cdFx0XHRsZXQgX2N1cnJlbnRDb250YWluZXIsXHJcblx0XHRcdFx0X3ZhcmlhbnRDb250YWluZXJzPVtdLFxyXG5cdFx0XHRcdHZhcmlhbnRQYXJhbXM9e31cclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdGJlZ2luVmFyaWFudCh2YXJpYW50KXtcclxuXHRcdFx0XHRcdFx0bGV0IGZuYW1lPSdhc3NlbWJsZV8nXHJcblx0XHRcdFx0XHRcdHN3aXRjaCh2YXJpYW50LnR5cGUpe1xyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmV4cCc6XHJcblx0XHRcdFx0XHRcdFx0dmFyaWFudC52YXJpYW50UGFyZW50PV9jdXJyZW50Q29udGFpbmVyXHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXIudmFyaWFudENoaWxkcmVuLnB1c2godmFyaWFudClcclxuXHRcdFx0XHRcdFx0XHRmbmFtZT1cImFzc2VtYmxlX1wiK3ZhcmlhbnQudklkXHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXIuY29kZUJsb2NrLnB1c2goY2FsbGVlKGZuYW1lKSlcclxuXHRcdFx0XHRcdFx0XHR2YXJpYW50UGFyYW1zW2ZuYW1lXT12YXJpYW50LmFzc2VtYmxlLmJpbmQodmFyaWFudClcclxuXHRcdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdFx0Y2FzZSAndmFyaWFudC5pZic6XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuZm9yJzpcclxuXHRcdFx0XHRcdFx0XHR2YXJpYW50LnZhcmlhbnRQYXJlbnQ9X2N1cnJlbnRDb250YWluZXJcclxuXHRcdFx0XHRcdFx0XHRfY3VycmVudENvbnRhaW5lci52YXJpYW50Q2hpbGRyZW4ucHVzaCh2YXJpYW50KVxyXG5cdFx0XHRcdFx0XHRcdF92YXJpYW50Q29udGFpbmVycy5wdXNoKF9jdXJyZW50Q29udGFpbmVyKVxyXG5cdFx0XHRcdFx0XHRcdF9jdXJyZW50Q29udGFpbmVyLmNvZGVCbG9jay5wdXNoKHZhcmlhbnQucGFyc2VkQ29kZSlcclxuXHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0XHRmbmFtZT1cImFzc2VtYmxlX1wiK3ZhcmlhbnQudklkXHJcblx0XHRcdFx0XHRcdFx0dmFyaWFudC5jb2RlQmxvY2sucHVzaChjYWxsZWUoZm5hbWUpKVxyXG5cdFx0XHRcdFx0XHRcdHZhcmlhbnRQYXJhbXNbZm5hbWVdPXZhcmlhbnQuYXNzZW1ibGUuYmluZCh2YXJpYW50KVxyXG5cdFx0XHRcdFx0XHRjYXNlICdkb2N1bWVudCc6XHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXI9dmFyaWFudFxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHJldHVybiB2YXJpYW50XHJcblx0XHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRcdGVuZFZhcmlhbnQodmFyaWFudCl7XHJcblx0XHRcdFx0XHRcdHN3aXRjaCh2YXJpYW50LnR5cGUpe1xyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmlmJzpcclxuXHRcdFx0XHRcdFx0Y2FzZSAndmFyaWFudC5mb3InOlxyXG5cdFx0XHRcdFx0XHRcdF9jdXJyZW50Q29udGFpbmVyPV92YXJpYW50Q29udGFpbmVycy5wb3AoKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR2YXJpYW50UGFyYW1zXHJcblx0XHRcdH1cclxuXHRcdH0odGhpcykpXHJcblxyXG5cdFx0dGhpcy52YXJpYW50UGFyZW50PW51bGxcclxuXHRcdHRoaXMudmFyaWFudENoaWxkcmVuPVtdXHJcblx0XHR0aGlzLnBhcnNlZENvZGU9ZXNwcmltYS5wYXJzZShcIndpdGgoYXJndW1lbnRzWzBdKXt9XCIpXHJcblx0XHR0aGlzLmNvZGVCbG9jaz10aGlzLnBhcnNlZENvZGUuYm9keVswXS5ib2R5LmJvZHlcclxuXHRcdHRoaXMud0RvYy5iZWdpblZhcmlhbnQodGhpcylcclxuXHR9XHJcblxyXG5cdHNldCBkYXRhKGQpe1xyXG5cdFx0dGhpcy53RG9jLmRhdGE9ZFxyXG5cdH1cclxuXHJcblx0Z2V0IGRhdGEoKXtcclxuXHRcdHJldHVybiB0aGlzLndEb2MuZGF0YVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0KiB3aGljaCBtYWtlcyBpdCBhcyBhIHZhcmlhbnRcclxuXHQqL1xyXG5cdHBhcnNlKCl7XHJcblx0XHR2YXIgcj1zdXBlci5wYXJzZSguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLndEb2MuZW5kVmFyaWFudCh0aGlzKVxyXG5cclxuXHRcdHRoaXMudmFyaWFudENoaWxkcmVuLm1hcCh2YXJpYW50PT57XHJcblx0XHRcdHZhcmlhbnQucmF3WG1sPXZhcmlhbnQud1htbFxyXG5cdFx0XHR2YXJpYW50LndYbWw9dmFyaWFudC53WG1sLmNsb25lTm9kZSh0cnVlKVxyXG5cdFx0fSlcclxuXHRcdFxyXG5cdFx0aWYodHlwZW9mKHRoaXMucGFyc2VkQ29kZSkhPSdmdW5jdGlvbicpXHJcblx0XHRcdHRoaXMucGFyc2VkQ29kZT1uZXcgRnVuY3Rpb24oXCJkYXRhLG9wdGlvblwiLGVzY29kZWdlbi5nZW5lcmF0ZSh0aGlzLnBhcnNlZENvZGUpKVxyXG5cclxuXHRcdHJldHVybiByXHJcblx0fVxyXG5cclxuXHR2aXNpdCgpe1xyXG5cdFx0Ly93aGljaCBtYWtlcyB0aGUgY2xhc3MgYXMgYSB2aXNpdG9yXHJcblx0fVxyXG5cdFxyXG5cdFxyXG5cclxuXHRfdG9KYXZhc2NyaXB0KGlQYXJhKXtcclxuXHRcdGlQYXJhLl9nbG9iYWw9dGhpcy53RG9jLmRhdGFcclxuXHRcdHJldHVybiBgY29uc29sZS5pbmZvKEpTT04uc3RyaW5naWZ5KGFyZ3VtZW50c1swXSkpO3dpdGgoYXJndW1lbnRzWzBdLl9nbG9iYWwpYFxyXG5cdH1cclxuXHRcclxuXHRfdG9KYXZhc2NyaXB0T2ZBc3NlbWJsZUFzRGF0YSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuX3RvSmF2YXNjcmlwdCguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCoge3Zhck5hbWU6eHgsaWZfeHh4Ont9LCBmb3JfeHh4Ont9fVxyXG5cdCovXHJcblx0YXNzZW1ibGVBc0RhdGEoZGF0YSl7XHJcblx0XHR2YXIgaVBhcmE9e19nbG9iYWw6ZGF0YX1cclxuXHRcdHZhciBjb2RlPWAke3RoaXMuX3RvSmF2YXNjcmlwdE9mQXNzZW1ibGVBc0RhdGEoaVBhcmEpfSB7XHJcblx0XHRcdCR7dGhpcy52YXJpYW50Q2hpbGRyZW4uZm9yRWFjaChhPT57XHJcblx0XHRcdFx0YCR7dGhpcy5fdG9KYXZhc2NyaXB0T2ZBc3NlbWJsZUFzRGF0YShpUGFyYSl9YFxyXG5cdFx0XHR9KX1cclxuXHRcdH1gXHJcblx0XHRcclxuXHRcdHJldHVybiBuZXcgRnVuY3Rpb24oXCJkYXRhXCIsIGNvZGUpKGRhdGEpXHJcblx0fVxyXG5cdFxyXG5cdGFzU3RhdGljRG9jeCgpe1xyXG5cdFx0dGhpcy53RG9jLnZhcmlhbnRDaGlsZHJlbj10aGlzLnZhcmlhbnRDaGlsZHJlblxyXG5cdFx0bGV0IHdEb2M9dGhpcy53RG9jXHJcblx0XHRcclxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHRoaXMud0RvYyx7XHJcblx0XHRcdHNhdmUoZmlsZSl7XHJcblx0XHRcdFx0d0RvYy5fc2VyaWFsaXplKClcclxuXHRcdFx0XHR2YXIgYnVmZmVyPXdEb2MucmF3LmdlbmVyYXRlKHt0eXBlOlwibm9kZWJ1ZmZlclwifSlcclxuXHRcdFx0XHR2YXIgZnM9XCJmc1wiXHJcblx0XHRcdFx0cmVxdWlyZShmcykud3JpdGVGaWxlKGZpbGUsYnVmZmVyKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRkb3dubG9hZChmaWxlKXtcclxuXHRcdFx0XHR3RG9jLl9zZXJpYWxpemUoKVxyXG5cdFx0XHRcdHZhciBkYXRhPXdEb2MucmF3LmdlbmVyYXRlKHt0eXBlOiBcImJsb2JcIixtaW1lVHlwZTogXCJhcHBsaWNhdGlvbi9kb2N4XCJ9KVxyXG5cdFx0XHRcdHZhciB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChkYXRhKTtcclxuXHRcdFx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluaylcclxuXHRcdFx0XHRsaW5rLmRvd25sb2FkID0gYCR7ZmlsZXx8d0RvYy5wcm9wcy5uYW1lfHwnbmV3J30uZG9jeGA7XHJcblx0XHRcdFx0bGluay5ocmVmID0gdXJsO1xyXG5cdFx0XHRcdGxpbmsuY2xpY2soKVxyXG5cdFx0XHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluaylcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0KiBwdWJsaWMgQVBJIGZvciB2YXJpYW50IGRvY3hcclxuXHQqL1xyXG5cdGFzc2VtYmxlKGRhdGEpe1xyXG5cdFx0XHJcblx0XHRcclxuXHR9XHJcbn1cclxuXHJcbmltcG9ydCBEb2N4RG9jdW1lbnQgZnJvbSBcImRvY3g0anNcIlxyXG5pbXBvcnQgUGFydCBmcm9tIFwiZG9jeDRqcy9saWIvb3BlbnhtbC9wYXJ0XCJcclxuXHJcbnZhciB4bWxkb209XCJ4bWxkb21cIjtcclxuKGZ1bmN0aW9uKFhNTFNlcmlhbGl6ZXIpe1xyXG5cdE9iamVjdC5hc3NpZ24oUGFydC5wcm90b3R5cGUse1xyXG5cdFx0c2V0Q2hhbmdlZChhKXtcclxuXHRcdFx0dmFyIHtfY2hhbmdlZFBhcnRzPW5ldyBTZXQoKX09dGhpcy5kb2NcclxuXHRcdFx0dGhpcy5kb2MuX2NoYW5nZWRQYXJ0cz1fY2hhbmdlZFBhcnRzXHJcblx0XHRcdFxyXG5cdFx0XHRfY2hhbmdlZFBhcnRzW2EgPyAnYWRkJyA6ICdyZW1vdmUnXSh0aGlzKVxyXG5cdFx0fSxcclxuXHRcdF9zZXJpYWxpemUoKXtcclxuXHRcdFx0dGhpcy5kb2MucmF3LmZpbGUodGhpcy5uYW1lLCBgPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwiVVRGLThcIiBzdGFuZGFsb25lPVwieWVzXCI/PlxcclxcbiR7KG5ldyBYTUxTZXJpYWxpemVyKCkpLnNlcmlhbGl6ZVRvU3RyaW5nKHRoaXMuZG9jdW1lbnRFbGVtZW50KX1gKVxyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0YWRkUmVsKHJlbCl7XHJcblx0XHRcdHZhciBpZD1gcklkJHtNYXRoLm1heChPYmplY3Qua2V5cyh0aGlzLnJlbHMpLm1hcChhPT5wYXJzZUludChhLnN1YnN0cmluZygzKSkpKSsxfWBcclxuXHRcdFx0dGhpcy5yZWxzW2lkXT1yZWxcclxuXHRcdFx0dmFyIGVsPXRoaXMuZG9jdW1lbnRFbGVtZW50LmNyZWF0ZUVsZW1lbnQoJ1JlbGF0aW9uc2hpcCcpXHJcblx0XHRcdGVsLnNldEF0dHJpYnV0ZShcIklkXCIsaWQpXHJcblx0XHRcdE9iamVjdC5rZXlzKHJlbCkuZm9yRWFjaChhPT5lbC5zZXRBdHRyaWJ1dGUoYSxyZWxbYV0pKVxyXG5cdFx0XHR0aGlzLmRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZChlbClcclxuXHRcdFx0dGhpcy5kb2MuZ2V0UGFydCh0aGlzLnJlbE5hbWUpLnNldENoYW5nZWQodHJ1ZSlcclxuXHRcdH0sXHJcblx0XHRcclxuXHRcdHJlbW92ZVJlbChpZCl7XHJcblx0XHRcdGRlbGV0ZSB0aGlzLnJlbHNbaWRdXHJcblx0XHRcdHRoaXMuZG9jdW1lbnRFbGVtZW50LiQxKGBSZWxhdGlvbnNoaXBbSWQ9JHtpZH1dYCkucmVtb3ZlKClcclxuXHRcdFx0dGhpcy5kb2MuZ2V0UGFydCh0aGlzLnJlbE5hbWUpLnNldENoYW5nZWQodHJ1ZSlcclxuXHRcdH1cclxuXHR9KVxyXG5cdFxyXG5cdE9iamVjdC5hc3NpZ24oRG9jeERvY3VtZW50LnByb3RvdHlwZSx7XHJcblx0XHRfc2VyaWFsaXplKCl7XHJcblx0XHRcdHZhciB7X2NoYW5nZWRQYXJ0c309dGhpc1xyXG5cdFx0XHRpZihfY2hhbmdlZFBhcnRzKXtcclxuXHRcdFx0XHRfY2hhbmdlZFBhcnRzLmZvckVhY2gocGFydD0+cGFydC5fc2VyaWFsaXplKCkpXHJcblx0XHRcdFx0ZGVsZXRlIHRoaXMuX2NoYW5nZWRQYXJ0c1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSlcclxufSkoJC5pc05vZGUgPyByZXF1aXJlKHhtbGRvbSkuWE1MU2VyaWFsaXplciA6IFhNTFNlcmlhbGl6ZXIpXHJcbiJdfQ==