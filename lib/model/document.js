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
			delete this.wDoc.data;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQXFKQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFwSkEsU0FBUyxNQUFULENBQWdCLElBQWhCLEVBQXFCO0FBQ3BCLFFBQU87QUFDTixVQUFRLHFCQUFSO0FBQ0EsZ0JBQWM7QUFDYixXQUFRLGdCQUFSO0FBQ0EsYUFBVTtBQUNULFlBQVEsWUFBUjtBQUNBLFlBQVEsSUFBUjtJQUZEO0FBSUEsZ0JBQWEsRUFBYjtHQU5EO0VBRkQsQ0FEb0I7Q0FBckI7O0lBY3FCOzs7QUFDcEIsVUFEb0IsUUFDcEIsR0FBYTt3QkFETyxVQUNQOztxRUFETyxzQkFFVixZQURHOztBQUVaLFNBQU8sTUFBUCxDQUFjLE1BQUssSUFBTCxFQUFVLFVBQVMsZUFBVCxFQUF5QjtBQUNoRCxPQUFJLDBCQUFKO09BQ0MscUJBQW1CLEVBQW5CO09BQ0EsZ0JBQWMsRUFBZCxDQUgrQztBQUloRCxVQUFPO0FBQ0wsd0NBQWEsU0FBUTtBQUNwQixTQUFJLFFBQU0sV0FBTixDQURnQjtBQUVwQixhQUFPLFFBQVEsSUFBUjtBQUNQLFdBQUssYUFBTDtBQUNDLGVBQVEsYUFBUixHQUFzQixpQkFBdEIsQ0FERDtBQUVDLHlCQUFrQixlQUFsQixDQUFrQyxJQUFsQyxDQUF1QyxPQUF2QyxFQUZEO0FBR0MsZUFBTSxjQUFZLFFBQVEsR0FBUixDQUhuQjtBQUlDLHlCQUFrQixTQUFsQixDQUE0QixJQUE1QixDQUFpQyxPQUFPLEtBQVAsQ0FBakMsRUFKRDtBQUtDLHFCQUFjLEtBQWQsSUFBcUIsUUFBUSxRQUFSLENBQWlCLElBQWpCLENBQXNCLE9BQXRCLENBQXJCLENBTEQ7QUFNQSxhQU5BO0FBREEsV0FRSyxZQUFMLENBUkE7QUFTQSxXQUFLLGFBQUw7QUFDQyxlQUFRLGFBQVIsR0FBc0IsaUJBQXRCLENBREQ7QUFFQyx5QkFBa0IsZUFBbEIsQ0FBa0MsSUFB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USxNQUFSLEVBQWdCLGFBQWhCLEdBQWdDLGFBQTNDLENBdENIIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VEb2N1bWVudCBmcm9tIFwiZG9jeDRqcy9saWIvb3BlbnhtbC9kb2N4L21vZGVsL2RvY3VtZW50XCJcclxuaW1wb3J0IGVzcHJpbWEgZnJvbSBcImVzcHJpbWFcIlxyXG5cclxuZnVuY3Rpb24gY2FsbGVlKG5hbWUpe1xyXG5cdHJldHVybiB7XHJcblx0XHRcInR5cGVcIjogXCJFeHByZXNzaW9uU3RhdGVtZW50XCIsXHJcblx0XHRcImV4cHJlc3Npb25cIjoge1xyXG5cdFx0XHRcInR5cGVcIjogXCJDYWxsRXhwcmVzc2lvblwiLFxyXG5cdFx0XHRcImNhbGxlZVwiOiB7XHJcblx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFwibmFtZVwiOiBuYW1lXHJcblx0XHRcdH0sXHJcblx0XHRcdFwiYXJndW1lbnRzXCI6IFtdXHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudCBleHRlbmRzIEJhc2VEb2N1bWVudHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLndEb2MsZnVuY3Rpb24odmFyaWFudERvY3VtZW50KXtcclxuXHRcdFx0bGV0IF9jdXJyZW50Q29udGFpbmVyLFxyXG5cdFx0XHRcdF92YXJpYW50Q29udGFpbmVycz1bXSxcclxuXHRcdFx0XHR2YXJpYW50UGFyYW1zPXt9XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRiZWdpblZhcmlhbnQodmFyaWFudCl7XHJcblx0XHRcdFx0XHRcdGxldCBmbmFtZT0nYXNzZW1ibGVfJ1xyXG5cdFx0XHRcdFx0XHRzd2l0Y2godmFyaWFudC50eXBlKXtcclxuXHRcdFx0XHRcdFx0Y2FzZSAndmFyaWFudC5leHAnOlxyXG5cdFx0XHRcdFx0XHRcdHZhcmlhbnQudmFyaWFudFBhcmVudD1fY3VycmVudENvbnRhaW5lclxyXG5cdFx0XHRcdFx0XHRcdF9jdXJyZW50Q29udGFpbmVyLnZhcmlhbnRDaGlsZHJlbi5wdXNoKHZhcmlhbnQpXHJcblx0XHRcdFx0XHRcdFx0Zm5hbWU9XCJhc3NlbWJsZV9cIit2YXJpYW50LnZJZFxyXG5cdFx0XHRcdFx0XHRcdF9jdXJyZW50Q29udGFpbmVyLmNvZGVCbG9jay5wdXNoKGNhbGxlZShmbmFtZSkpXHJcblx0XHRcdFx0XHRcdFx0dmFyaWFudFBhcmFtc1tmbmFtZV09dmFyaWFudC5hc3NlbWJsZS5iaW5kKHZhcmlhbnQpXHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuaWYnOlxyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmZvcic6XHJcblx0XHRcdFx0XHRcdFx0dmFyaWFudC52YXJpYW50UGFyZW50PV9jdXJyZW50Q29udGFpbmVyXHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXIudmFyaWFudENoaWxkcmVuLnB1c2godmFyaWFudClcclxuXHRcdFx0XHRcdFx0XHRfdmFyaWFudENvbnRhaW5lcnMucHVzaChfY3VycmVudENvbnRhaW5lcilcclxuXHRcdFx0XHRcdFx0XHRfY3VycmVudENvbnRhaW5lci5jb2RlQmxvY2sucHVzaCh2YXJpYW50LnBhcnNlZENvZGUpXHJcblx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdFx0Zm5hbWU9XCJhc3NlbWJsZV9cIit2YXJpYW50LnZJZFxyXG5cdFx0XHRcdFx0XHRcdHZhcmlhbnQuY29kZUJsb2NrLnB1c2goY2FsbGVlKGZuYW1lKSlcclxuXHRcdFx0XHRcdFx0XHR2YXJpYW50UGFyYW1zW2ZuYW1lXT12YXJpYW50LmFzc2VtYmxlLmJpbmQodmFyaWFudClcclxuXHRcdFx0XHRcdFx0Y2FzZSAnZG9jdW1lbnQnOlxyXG5cdFx0XHRcdFx0XHRcdF9jdXJyZW50Q29udGFpbmVyPXZhcmlhbnRcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdmFyaWFudFxyXG5cdFx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0XHRlbmRWYXJpYW50KHZhcmlhbnQpe1xyXG5cdFx0XHRcdFx0XHRzd2l0Y2godmFyaWFudC50eXBlKXtcclxuXHRcdFx0XHRcdFx0Y2FzZSAndmFyaWFudC5pZic6XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuZm9yJzpcclxuXHRcdFx0XHRcdFx0XHRfY3VycmVudENvbnRhaW5lcj1fdmFyaWFudENvbnRhaW5lcnMucG9wKClcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0dmFyaWFudFBhcmFtc1xyXG5cdFx0XHR9XHJcblx0XHR9KHRoaXMpKVxyXG5cclxuXHRcdHRoaXMudmFyaWFudFBhcmVudD1udWxsXHJcblx0XHR0aGlzLnZhcmlhbnRDaGlsZHJlbj1bXVxyXG5cdFx0dGhpcy5wYXJzZWRDb2RlPWVzcHJpbWEucGFyc2UoXCJ3aXRoKGFyZ3VtZW50c1swXSl7fVwiKVxyXG5cdFx0dGhpcy5jb2RlQmxvY2s9dGhpcy5wYXJzZWRDb2RlLmJvZHlbMF0uYm9keS5ib2R5XHJcblx0XHR0aGlzLndEb2MuYmVnaW5WYXJpYW50KHRoaXMpXHJcblx0fVxyXG5cclxuXHRzZXQgZGF0YShkKXtcclxuXHRcdHRoaXMud0RvYy5kYXRhPWRcclxuXHR9XHJcblxyXG5cdGdldCBkYXRhKCl7XHJcblx0XHRyZXR1cm4gdGhpcy53RG9jLmRhdGFcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCogd2hpY2ggbWFrZXMgaXQgYXMgYSB2YXJpYW50XHJcblx0Ki9cclxuXHRwYXJzZSgpe1xyXG5cdFx0dmFyIHI9c3VwZXIucGFyc2UoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy53RG9jLmVuZFZhcmlhbnQodGhpcylcclxuXHRcdGRlbGV0ZSB0aGlzLndEb2MuZGF0YVxyXG5cdFx0cmV0dXJuIHJcclxuXHR9XHJcblxyXG5cdHZpc2l0KCl7XHJcblx0XHQvL3doaWNoIG1ha2VzIHRoZSBjbGFzcyBhcyBhIHZpc2l0b3JcclxuXHR9XHJcblx0XHJcblx0XHJcblxyXG5cdF90b0phdmFzY3JpcHQoaVBhcmEpe1xyXG5cdFx0aVBhcmEuX2dsb2JhbD10aGlzLndEb2MuZGF0YVxyXG5cdFx0cmV0dXJuIGBjb25zb2xlLmluZm8oSlNPTi5zdHJpbmdpZnkoYXJndW1lbnRzWzBdKSk7d2l0aChhcmd1bWVudHNbMF0uX2dsb2JhbClgXHJcblx0fVxyXG5cdFxyXG5cdF90b0phdmFzY3JpcHRPZkFzc2VtYmxlQXNEYXRhKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5fdG9KYXZhc2NyaXB0KC4uLmFyZ3VtZW50cylcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0KiB7dmFyTmFtZTp4eCxpZl94eHg6e30sIGZvcl94eHg6e319XHJcblx0Ki9cclxuXHRhc3NlbWJsZUFzRGF0YShkYXRhKXtcclxuXHRcdHZhciBpUGFyYT17X2dsb2JhbDpkYXRhfVxyXG5cdFx0dmFyIGNvZGU9YCR7dGhpcy5fdG9KYXZhc2NyaXB0T2ZBc3NlbWJsZUFzRGF0YShpUGFyYSl9IHtcclxuXHRcdFx0JHt0aGlzLnZhcmlhbnRDaGlsZHJlbi5mb3JFYWNoKGE9PntcclxuXHRcdFx0XHRgJHt0aGlzLl90b0phdmFzY3JpcHRPZkFzc2VtYmxlQXNEYXRhKGlQYXJhKX1gXHJcblx0XHRcdH0pfVxyXG5cdFx0fWBcclxuXHRcdFxyXG5cdFx0cmV0dXJuIG5ldyBGdW5jdGlvbihcImRhdGFcIiwgY29kZSkoZGF0YSlcclxuXHR9XHJcblx0XHJcblx0YXNTdGF0aWNEb2N4KCl7XHJcblx0XHR0aGlzLndEb2MudmFyaWFudENoaWxkcmVuPXRoaXMudmFyaWFudENoaWxkcmVuXHJcblx0XHRsZXQgd0RvYz10aGlzLndEb2NcclxuXHRcdFxyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24odGhpcy53RG9jLHtcclxuXHRcdFx0c2F2ZShmaWxlKXtcclxuXHRcdFx0XHR3RG9jLl9zZXJpYWxpemUoKVxyXG5cdFx0XHRcdHZhciBidWZmZXI9d0RvYy5yYXcuZ2VuZXJhdGUoe3R5cGU6XCJub2RlYnVmZmVyXCJ9KVxyXG5cdFx0XHRcdHZhciBmcz1cImZzXCJcclxuXHRcdFx0XHRyZXF1aXJlKGZzKS53cml0ZUZpbGUoZmlsZSxidWZmZXIpXHJcblx0XHRcdH0sXHJcblx0XHRcdGRvd25sb2FkKGZpbGUpe1xyXG5cdFx0XHRcdHdEb2MuX3NlcmlhbGl6ZSgpXHJcblx0XHRcdFx0dmFyIGRhdGE9d0RvYy5yYXcuZ2VuZXJhdGUoe3R5cGU6IFwiYmxvYlwiLG1pbWVUeXBlOiBcImFwcGxpY2F0aW9uL2RvY3hcIn0pXHJcblx0XHRcdFx0dmFyIHVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGRhdGEpO1xyXG5cdFx0XHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XHJcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKVxyXG5cdFx0XHRcdGxpbmsuZG93bmxvYWQgPSBgJHtmaWxlfHx3RG9jLnByb3BzLm5hbWV8fCduZXcnfS5kb2N4YDtcclxuXHRcdFx0XHRsaW5rLmhyZWYgPSB1cmw7XHJcblx0XHRcdFx0bGluay5jbGljaygpXHJcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQqIHB1YmxpYyBBUEkgZm9yIHZhcmlhbnQgZG9jeFxyXG5cdCovXHJcblx0YXNzZW1ibGUoZGF0YSl7XHJcblx0XHRcclxuXHR9XHJcbn1cclxuXHJcbmltcG9ydCBEb2N4RG9jdW1lbnQgZnJvbSBcImRvY3g0anNcIlxyXG5pbXBvcnQgUGFydCBmcm9tIFwiZG9jeDRqcy9saWIvb3BlbnhtbC9wYXJ0XCJcclxuXHJcbnZhciB4bWxkb209XCJ4bWxkb21cIjtcclxuKGZ1bmN0aW9uKFhNTFNlcmlhbGl6ZXIpe1xyXG5cdE9iamVjdC5hc3NpZ24oUGFydC5wcm90b3R5cGUse1xyXG5cdFx0c2V0Q2hhbmdlZChhKXtcclxuXHRcdFx0dmFyIHtfY2hhbmdlZFBhcnRzPW5ldyBTZXQoKX09dGhpcy5kb2NcclxuXHRcdFx0dGhpcy5kb2MuX2NoYW5nZWRQYXJ0cz1fY2hhbmdlZFBhcnRzXHJcblx0XHRcdFxyXG5cdFx0XHRfY2hhbmdlZFBhcnRzW2EgPyAnYWRkJyA6ICdyZW1vdmUnXSh0aGlzKVxyXG5cdFx0fSxcclxuXHRcdF9zZXJpYWxpemUoKXtcclxuXHRcdFx0dGhpcy5kb2MucmF3LmZpbGUodGhpcy5uYW1lLCBgPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwiVVRGLThcIiBzdGFuZGFsb25lPVwieWVzXCI/PlxcclxcbiR7KG5ldyBYTUxTZXJpYWxpemVyKCkpLnNlcmlhbGl6ZVRvU3RyaW5nKHRoaXMuZG9jdW1lbnRFbGVtZW50KX1gKVxyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0YWRkUmVsKHJlbCl7XHJcblx0XHRcdHZhciBpZD1gcklkJHtNYXRoLm1heChPYmplY3Qua2V5cyh0aGlzLnJlbHMpLm1hcChhPT5wYXJzZUludChhLnN1YnN0cmluZygzKSkpKSsxfWBcclxuXHRcdFx0dGhpcy5yZWxzW2lkXT1yZWxcclxuXHRcdFx0dmFyIGVsPXRoaXMuZG9jdW1lbnRFbGVtZW50LmNyZWF0ZUVsZW1lbnQoJ1JlbGF0aW9uc2hpcCcpXHJcblx0XHRcdGVsLnNldEF0dHJpYnV0ZShcIklkXCIsaWQpXHJcblx0XHRcdE9iamVjdC5rZXlzKHJlbCkuZm9yRWFjaChhPT5lbC5zZXRBdHRyaWJ1dGUoYSxyZWxbYV0pKVxyXG5cdFx0XHR0aGlzLmRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZChlbClcclxuXHRcdFx0dGhpcy5kb2MuZ2V0UGFydCh0aGlzLnJlbE5hbWUpLnNldENoYW5nZWQodHJ1ZSlcclxuXHRcdH0sXHJcblx0XHRcclxuXHRcdHJlbW92ZVJlbChpZCl7XHJcblx0XHRcdGRlbGV0ZSB0aGlzLnJlbHNbaWRdXHJcblx0XHRcdHRoaXMuZG9jdW1lbnRFbGVtZW50LiQxKGBSZWxhdGlvbnNoaXBbSWQ9JHtpZH1dYCkucmVtb3ZlKClcclxuXHRcdFx0dGhpcy5kb2MuZ2V0UGFydCh0aGlzLnJlbE5hbWUpLnNldENoYW5nZWQodHJ1ZSlcclxuXHRcdH1cclxuXHR9KVxyXG5cdFxyXG5cdE9iamVjdC5hc3NpZ24oRG9jeERvY3VtZW50LnByb3RvdHlwZSx7XHJcblx0XHRfc2VyaWFsaXplKCl7XHJcblx0XHRcdHZhciB7X2NoYW5nZWRQYXJ0c309dGhpc1xyXG5cdFx0XHRpZihfY2hhbmdlZFBhcnRzKXtcclxuXHRcdFx0XHRfY2hhbmdlZFBhcnRzLmZvckVhY2gocGFydD0+cGFydC5fc2VyaWFsaXplKCkpXHJcblx0XHRcdFx0ZGVsZXRlIHRoaXMuX2NoYW5nZWRQYXJ0c1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSlcclxufSkoJC5pc05vZGUgPyByZXF1aXJlKHhtbGRvbSkuWE1MU2VyaWFsaXplciA6IFhNTFNlcmlhbGl6ZXIpXHJcbiJdfQ==