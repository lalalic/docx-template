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
							_currentContainer.codeBlock.push(variant.parsedCode);
							break;
						case 'variant.if':
						case 'variant.for':
							variant.variantParent = _currentContainer;
							_currentContainer.variantChildren.push(variant);
							_variantContainers.push(_currentContainer);
							_currentContainer.codeBlock.push(variant.parsedCode);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQTZIQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUE1SHFCOzs7QUFDcEIsVUFEb0IsUUFDcEIsR0FBYTt3QkFETyxVQUNQOztxRUFETyxzQkFFVixZQURHOztBQUVaLFNBQU8sTUFBUCxDQUFjLE1BQUssSUFBTCxFQUFVLFVBQVMsZUFBVCxFQUF5QjtBQUNoRCxPQUFJLDBCQUFKO09BQ0MscUJBQW1CLEVBQW5CLENBRitDO0FBR2hELFVBQU87QUFDTCx3Q0FBYSxTQUFRO0FBQ3BCLGFBQU8sUUFBUSxJQUFSO0FBQ1AsV0FBSyxhQUFMO0FBQ0MsZUFBUSxhQUFSLEdBQXNCLGlCQUF0QixDQUREO0FBRUMseUJBQWtCLGVBQWxCLENBQWtDLElBQWxDLENBQXVDLE9BQXZDLEVBRkQ7QUFHQyx5QkFBa0IsU0FBbEIsQ0FBNEIsSUFBNUIsQ0FBaUMsUUFBUSxVQUFSLENBQWpDLENBSEQ7QUFJQSxhQUpBO0FBREEsV0FNSyxZQUFMLENBTkE7QUFPQSxXQUFLLGFBQUw7QUFDQyxlQUFRLGFBQVIsR0FBc0IsaUJBQXRCLENBREQ7QUFFQyx5QkFBa0IsZUFBbEIsQ0FBa0MsSUFBbEMsQ0FBdUMsT0FBdkMsRUFGRDtBQUdDLDBCQUFtQixJQUFuQixDQUF3QixpQkFBeEIsRUFIRDtBQUlDLHlCQUFrQixTQUFsQixDQUE0QixJQUE1QixDQUFpQyxRQUFRLFVBQVIsQ0FBakMsQ0FKRDtBQVBBLFdBWUssVUFBTDtBQUNDLDJCQUFrQixPQUFsQixDQUREO0FBWkEsTUFEb0I7QUFnQnBCLFlBQU8sT0FBUCxDQWhCb0I7S0FEaEI7QUFvQkwsb0NBQVcsU0FBUTtBQUNsQixhQUFPLFFBQVEsSUFBUjtBQUNQLFdBQUssWUFBTCxDQURBO0FBRUEsV0FBSyxhQUFMO0FBQ0MsMkJBQWtCLG1CQUFtQixHQUFuQixFQUFsQixDQUREO0FBRkEsTUFEa0I7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LEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBUCxDQURZO0FBRVosUUFBSyxlQUFMLENBQXFCLEVBQXJCLHNCQUEyQyxRQUEzQyxFQUFrRCxNQUFsRCxHQUZZO0FBR1osUUFBSyxHQUFMLENBQVMsT0FBVCxDQUFpQixLQUFLLE9BQUwsQ0FBakIsQ0FBK0IsVUFBL0IsQ0FBMEMsSUFBMUMsRUFIWTtHQXJCZTtFQUE3QixFQUR1Qjs7QUE2QnZCLFFBQU8sTUFBUCxDQUFjLGtCQUFhLFNBQWIsRUFBdUI7QUFDcEMsb0NBQVk7T0FDTixnQkFBZSxLQUFmLGNBRE07O0FBRVgsT0FBRyxhQUFILEVBQWlCO0FBQ2hCLGtCQUFjLE9BQWQsQ0FBc0I7WUFBTSxLQUFLLFVBQUw7S0FBTixDQUF0QixDQURnQjtBQUVoQixXQUFPLEtBQUssYUFBTCxDQUZTO0lBQWpCO0dBSG1DO0VBQXJDLEVBN0J1QjtDQUF2QixDQUFELENBc0NHLEVBQUUsTUFBRixHQUFXLFFBQVEsTUFBUixFQUFnQixhQUFoQixHQUFnQyxhQUEzQyxDQXRDSCIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlRG9jdW1lbnQgZnJvbSBcImRvY3g0anMvbGliL29wZW54bWwvZG9jeC9tb2RlbC9kb2N1bWVudFwiXHJcbmltcG9ydCBlc3ByaW1hIGZyb20gXCJlc3ByaW1hXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgQmFzZURvY3VtZW50e1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHRPYmplY3QuYXNzaWduKHRoaXMud0RvYyxmdW5jdGlvbih2YXJpYW50RG9jdW1lbnQpe1xyXG5cdFx0XHRsZXQgX2N1cnJlbnRDb250YWluZXIsXHJcblx0XHRcdFx0X3ZhcmlhbnRDb250YWluZXJzPVtdXHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRiZWdpblZhcmlhbnQodmFyaWFudCl7XHJcblx0XHRcdFx0XHRcdHN3aXRjaCh2YXJpYW50LnR5cGUpe1xyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmV4cCc6XHJcblx0XHRcdFx0XHRcdFx0dmFyaWFudC52YXJpYW50UGFyZW50PV9jdXJyZW50Q29udGFpbmVyXHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXIudmFyaWFudENoaWxkcmVuLnB1c2godmFyaWFudClcclxuXHRcdFx0XHRcdFx0XHRfY3VycmVudENvbnRhaW5lci5jb2RlQmxvY2sucHVzaCh2YXJpYW50LnBhcnNlZENvZGUpXHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuaWYnOlxyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmZvcic6XHJcblx0XHRcdFx0XHRcdFx0dmFyaWFudC52YXJpYW50UGFyZW50PV9jdXJyZW50Q29udGFpbmVyXHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXIudmFyaWFudENoaWxkcmVuLnB1c2godmFyaWFudClcclxuXHRcdFx0XHRcdFx0XHRfdmFyaWFudENvbnRhaW5lcnMucHVzaChfY3VycmVudENvbnRhaW5lcilcclxuXHRcdFx0XHRcdFx0XHRfY3VycmVudENvbnRhaW5lci5jb2RlQmxvY2sucHVzaCh2YXJpYW50LnBhcnNlZENvZGUpXHJcblx0XHRcdFx0XHRcdGNhc2UgJ2RvY3VtZW50JzpcclxuXHRcdFx0XHRcdFx0XHRfY3VycmVudENvbnRhaW5lcj12YXJpYW50XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0cmV0dXJuIHZhcmlhbnRcclxuXHRcdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdFx0ZW5kVmFyaWFudCh2YXJpYW50KXtcclxuXHRcdFx0XHRcdFx0c3dpdGNoKHZhcmlhbnQudHlwZSl7XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuaWYnOlxyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmZvcic6XHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXI9X3ZhcmlhbnRDb250YWluZXJzLnBvcCgpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSh0aGlzKSlcclxuXHJcblx0XHR0aGlzLnZhcmlhbnRQYXJlbnQ9bnVsbFxyXG5cdFx0dGhpcy52YXJpYW50Q2hpbGRyZW49W11cclxuXHRcdHRoaXMucGFyc2VkQ29kZT1lc3ByaW1hLnBhcnNlKFwid2l0aChhcmd1bWVudHNbMF0pe31cIilcclxuXHRcdHRoaXMuY29kZUJsb2NrPXRoaXMucGFyc2VkQ29kZS5ib2R5WzBdLmJvZHkuYm9keVxyXG5cdFx0dGhpcy53RG9jLmJlZ2luVmFyaWFudCh0aGlzKVxyXG5cdH1cclxuXHJcblx0c2V0IGRhdGEoZCl7XHJcblx0XHR0aGlzLndEb2MuZGF0YT1kXHJcblx0fVxyXG5cclxuXHRnZXQgZGF0YSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMud0RvYy5kYXRhXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQqIHdoaWNoIG1ha2VzIGl0IGFzIGEgdmFyaWFudFxyXG5cdCovXHJcblx0cGFyc2UoKXtcclxuXHRcdHZhciByPXN1cGVyLnBhcnNlKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMud0RvYy5lbmRWYXJpYW50KHRoaXMpXHJcblx0XHRkZWxldGUgdGhpcy53RG9jLmRhdGFcclxuXHRcdHJldHVybiByXHJcblx0fVxyXG5cclxuXHR2aXNpdCgpe1xyXG5cdFx0Ly93aGljaCBtYWtlcyB0aGUgY2xhc3MgYXMgYSB2aXNpdG9yXHJcblx0fVxyXG5cdFxyXG5cdFxyXG5cclxuXHRfdG9KYXZhc2NyaXB0KGlQYXJhKXtcclxuXHRcdGlQYXJhLl9nbG9iYWw9dGhpcy53RG9jLmRhdGFcclxuXHRcdHJldHVybiBgY29uc29sZS5pbmZvKEpTT04uc3RyaW5naWZ5KGFyZ3VtZW50c1swXSkpO3dpdGgoYXJndW1lbnRzWzBdLl9nbG9iYWwpYFxyXG5cdH1cclxuXHRcclxuXHRfdG9KYXZhc2NyaXB0T2ZBc3NlbWJsZUFzRGF0YSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuX3RvSmF2YXNjcmlwdCguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCoge3Zhck5hbWU6eHgsaWZfeHh4Ont9LCBmb3JfeHh4Ont9fVxyXG5cdCovXHJcblx0YXNzZW1ibGVBc0RhdGEoZGF0YSl7XHJcblx0XHR2YXIgaVBhcmE9e19nbG9iYWw6ZGF0YX1cclxuXHRcdHZhciBjb2RlPWAke3RoaXMuX3RvSmF2YXNjcmlwdE9mQXNzZW1ibGVBc0RhdGEoaVBhcmEpfSB7XHJcblx0XHRcdCR7dGhpcy52YXJpYW50Q2hpbGRyZW4uZm9yRWFjaChhPT57XHJcblx0XHRcdFx0YCR7dGhpcy5fdG9KYXZhc2NyaXB0T2ZBc3NlbWJsZUFzRGF0YShpUGFyYSl9YFxyXG5cdFx0XHR9KX1cclxuXHRcdH1gXHJcblx0XHRcclxuXHRcdHJldHVybiBuZXcgRnVuY3Rpb24oXCJkYXRhXCIsIGNvZGUpKGRhdGEpXHJcblx0fVxyXG5cdFxyXG5cdGFzU3RhdGljRG9jeCgpe1xyXG5cdFx0dGhpcy53RG9jLnZhcmlhbnRDaGlsZHJlbj10aGlzLnZhcmlhbnRDaGlsZHJlblxyXG5cdFx0bGV0IHdEb2M9dGhpcy53RG9jXHJcblx0XHRcclxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHRoaXMud0RvYyx7XHJcblx0XHRcdHNhdmUoZmlsZSl7XHJcblx0XHRcdFx0d0RvYy5fc2VyaWFsaXplKClcclxuXHRcdFx0XHR2YXIgYnVmZmVyPXdEb2MucmF3LmdlbmVyYXRlKHt0eXBlOlwibm9kZWJ1ZmZlclwifSlcclxuXHRcdFx0XHR2YXIgZnM9XCJmc1wiXHJcblx0XHRcdFx0cmVxdWlyZShmcykud3JpdGVGaWxlKGZpbGUsYnVmZmVyKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRkb3dubG9hZChmaWxlKXtcclxuXHRcdFx0XHR3RG9jLl9zZXJpYWxpemUoKVxyXG5cdFx0XHRcdHZhciBkYXRhPXdEb2MucmF3LmdlbmVyYXRlKHt0eXBlOiBcImJsb2JcIixtaW1lVHlwZTogXCJhcHBsaWNhdGlvbi9kb2N4XCJ9KVxyXG5cdFx0XHRcdHZhciB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChkYXRhKTtcclxuXHRcdFx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluaylcclxuXHRcdFx0XHRsaW5rLmRvd25sb2FkID0gYCR7ZmlsZXx8d0RvYy5wcm9wcy5uYW1lfHwnbmV3J30uZG9jeGA7XHJcblx0XHRcdFx0bGluay5ocmVmID0gdXJsO1xyXG5cdFx0XHRcdGxpbmsuY2xpY2soKVxyXG5cdFx0XHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluaylcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0KiBwdWJsaWMgQVBJIGZvciB2YXJpYW50IGRvY3hcclxuXHQqL1xyXG5cdGFzc2VtYmxlKGRhdGEpe1xyXG5cdFx0XHJcblx0fVxyXG59XHJcblxyXG5pbXBvcnQgRG9jeERvY3VtZW50IGZyb20gXCJkb2N4NGpzXCJcclxuaW1wb3J0IFBhcnQgZnJvbSBcImRvY3g0anMvbGliL29wZW54bWwvcGFydFwiXHJcblxyXG52YXIgeG1sZG9tPVwieG1sZG9tXCI7XHJcbihmdW5jdGlvbihYTUxTZXJpYWxpemVyKXtcclxuXHRPYmplY3QuYXNzaWduKFBhcnQucHJvdG90eXBlLHtcclxuXHRcdHNldENoYW5nZWQoYSl7XHJcblx0XHRcdHZhciB7X2NoYW5nZWRQYXJ0cz1uZXcgU2V0KCl9PXRoaXMuZG9jXHJcblx0XHRcdHRoaXMuZG9jLl9jaGFuZ2VkUGFydHM9X2NoYW5nZWRQYXJ0c1xyXG5cdFx0XHRcclxuXHRcdFx0X2NoYW5nZWRQYXJ0c1thID8gJ2FkZCcgOiAncmVtb3ZlJ10odGhpcylcclxuXHRcdH0sXHJcblx0XHRfc2VyaWFsaXplKCl7XHJcblx0XHRcdHRoaXMuZG9jLnJhdy5maWxlKHRoaXMubmFtZSwgYDw/eG1sIHZlcnNpb249XCIxLjBcIiBlbmNvZGluZz1cIlVURi04XCIgc3RhbmRhbG9uZT1cInllc1wiPz5cXHJcXG4keyhuZXcgWE1MU2VyaWFsaXplcigpKS5zZXJpYWxpemVUb1N0cmluZyh0aGlzLmRvY3VtZW50RWxlbWVudCl9YClcclxuXHRcdH0sXHJcblx0XHRcclxuXHRcdGFkZFJlbChyZWwpe1xyXG5cdFx0XHR2YXIgaWQ9YHJJZCR7TWF0aC5tYXgoT2JqZWN0LmtleXModGhpcy5yZWxzKS5tYXAoYT0+cGFyc2VJbnQoYS5zdWJzdHJpbmcoMykpKSkrMX1gXHJcblx0XHRcdHRoaXMucmVsc1tpZF09cmVsXHJcblx0XHRcdHZhciBlbD10aGlzLmRvY3VtZW50RWxlbWVudC5jcmVhdGVFbGVtZW50KCdSZWxhdGlvbnNoaXAnKVxyXG5cdFx0XHRlbC5zZXRBdHRyaWJ1dGUoXCJJZFwiLGlkKVxyXG5cdFx0XHRPYmplY3Qua2V5cyhyZWwpLmZvckVhY2goYT0+ZWwuc2V0QXR0cmlidXRlKGEscmVsW2FdKSlcclxuXHRcdFx0dGhpcy5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoZWwpXHJcblx0XHRcdHRoaXMuZG9jLmdldFBhcnQodGhpcy5yZWxOYW1lKS5zZXRDaGFuZ2VkKHRydWUpXHJcblx0XHR9LFxyXG5cdFx0XHJcblx0XHRyZW1vdmVSZWwoaWQpe1xyXG5cdFx0XHRkZWxldGUgdGhpcy5yZWxzW2lkXVxyXG5cdFx0XHR0aGlzLmRvY3VtZW50RWxlbWVudC4kMShgUmVsYXRpb25zaGlwW0lkPSR7aWR9XWApLnJlbW92ZSgpXHJcblx0XHRcdHRoaXMuZG9jLmdldFBhcnQodGhpcy5yZWxOYW1lKS5zZXRDaGFuZ2VkKHRydWUpXHJcblx0XHR9XHJcblx0fSlcclxuXHRcclxuXHRPYmplY3QuYXNzaWduKERvY3hEb2N1bWVudC5wcm90b3R5cGUse1xyXG5cdFx0X3NlcmlhbGl6ZSgpe1xyXG5cdFx0XHR2YXIge19jaGFuZ2VkUGFydHN9PXRoaXNcclxuXHRcdFx0aWYoX2NoYW5nZWRQYXJ0cyl7XHJcblx0XHRcdFx0X2NoYW5nZWRQYXJ0cy5mb3JFYWNoKHBhcnQ9PnBhcnQuX3NlcmlhbGl6ZSgpKVxyXG5cdFx0XHRcdGRlbGV0ZSB0aGlzLl9jaGFuZ2VkUGFydHNcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pXHJcbn0pKCQuaXNOb2RlID8gcmVxdWlyZSh4bWxkb20pLlhNTFNlcmlhbGl6ZXIgOiBYTUxTZXJpYWxpemVyKVxyXG4iXX0=