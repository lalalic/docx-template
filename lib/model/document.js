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

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

var _document = require("docx4js/lib/openxml/docx/model/document");

var _document2 = _interopRequireDefault(_document);

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
			    variantAssembles = {};
			return {
				beginVariant: function beginVariant(variant) {
					if (_currentContainer && _currentContainer != variantDocument) variant.wXml.setAttribute('id', variant.vId);

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
				},


				variantAssembles: variantAssembles
			};
		}(_this));

		_this.variantParent = null;
		_this.variantChildren = [];
		_this.parsedCode = _esprima2.default.parse("with(arguments[0]){with(arguments[1]){}}");
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
				this.parsedCode = new Function("data,option", code);
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

			this.variantChildren.map(function (variant) {
				variant.assembledXml = transactional ? variant.wXml.cloneNode(true) : variant.wXml;
			});

			this.parsedCode(data, this.wDoc.variantAssembles);

			var wDoc = this.wDoc,
			    variantChildren = this.variantChildren;

			function getNewDocxData() {
				return $.isNode ? wDoc.raw.generate({ type: "nodebuffer" }) : wDoc.raw.generate({ type: "blob", mimeType: "application/docx" });
			}

			function doSave(newDocxData, file) {
				if ($.isNode) {
					var fs = "fs";
					require(fs).writeFile(file || Date.now() + ".docx", newDocxData);
				} else {
					var url = window.URL.createObjectURL(newDocxData);
					var link = document.createElement("a");
					document.body.appendChild(link);
					link.download = (file || 'new') + ".docx";
					link.href = url;
					link.click();
					document.body.removeChild(link);
				}
			}

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
						return getNewDocxData();
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
					var newDocxData = getNewDocxData();
					return {
						v: {
							save: function save(file) {
								doSave(newDocxData, file);
							},
							parse: function parse() {
								var _docx4js$load;

								return (_docx4js$load = _docx4js2.default.load(newDocxData)).parse.apply(_docx4js$load, arguments);
							},

							data: newDocxData,
							variantChildren: variantChildren
						}
					};
				}();

				if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
			}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFFQTs7OztBQXVKQTs7Ozs7Ozs7Ozs7O0FBckpBLFNBQVMsTUFBVCxDQUFnQixJQUFoQixFQUFxQjtBQUNwQixRQUFPO0FBQ04sVUFBUSxxQkFBUjtBQUNBLGdCQUFjO0FBQ2IsV0FBUSxnQkFBUjtBQUNBLGFBQVU7QUFDVCxZQUFRLFlBQVI7QUFDQSxZQUFRLElBQVI7SUFGRDtBQUlBLGdCQUFhLEVBQWI7R0FORDtFQUZELENBRG9CO0NBQXJCOztJQWNxQjs7O0FBQ3BCLFVBRG9CLFFBQ3BCLEdBQWE7d0JBRE8sVUFDUDs7cUVBRE8sc0JBRVYsWUFERzs7QUFFWixTQUFPLE1BQVAsQ0FBYyxNQUFLLElBQUwsRUFBVSxVQUFTLGVBQVQsRUFBeUI7QUFDaEQsT0FBSSwwQkFBSjtPQUNDLHFCQUFtQixFQUFuQjtPQUNBLG1CQUFpQixFQUFqQixDQUgrQztBQUloRCxVQUFPO0FBQ0wsd0NBQWEsU0FBUTtBQUNwQixTQUFHLHFCQUNGLHFCQUFtQixlQUFuQixFQUNBLFFBQVEsSUFBUixDQUFhLFlBQWIsQ0FBMEIsSUFBMUIsRUFBK0IsUUFBUSxHQUFSLENBQS9CLENBRkQ7O0FBSUEsYUFBTyxRQUFRLElBQVI7QUFDUCxXQUFLLGFBQUw7QUFDQyxlQUFRLGFBQVIsR0FBc0IsaUJBQXRCLENBREQ7QUFFQyx5QkFBa0IsZUFBbEIsQ0FBa0MsSUFBbEMsQ0FBdUMsT0FBdkMsRUFGRDtBQUdBLGFBSEE7QUFEQSxXQUtLLFlBQUwsQ0FMQTtBQU1BLFdBQUssYUFBTDtBQUNDLGVBQVEsYUFBUixHQUFzQixpQkFBdEIsQ0FERDtBQUVDLHlCQUFrQixlQUFsQixDQUFrQyxJQUFsQyxDQUF1QyxPQUF2QyxFQUZEO0FBR0MsMEJBQW1CLElBQW5CLENBQXdCLGlCQUF4QixFQUhEO0FBTkEsV0FVSyxVQUFMO0FBQ0Ms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Q0FBYyxrQkFBYSxTQUFiLEVBQXVCO0FBQ3BDLG9DQUFZO09BQ04sZ0JBQWUsS0FBZixjQURNOztBQUVYLE9BQUcsYUFBSCxFQUFpQjtBQUNoQixrQkFBYyxPQUFkLENBQXNCO1lBQU0sS0FBSyxVQUFMO0tBQU4sQ0FBdEIsQ0FEZ0I7QUFFaEIsV0FBTyxLQUFLLGFBQUwsQ0FGUztJQUFqQjtHQUhtQztFQUFyQyxFQTdCdUI7Q0FBdkIsQ0FBRCxDQXNDRyxFQUFFLE1BQUYsR0FBVyxRQUFRLE1BQVIsRUFBZ0IsYUFBaEIsR0FBZ0MsYUFBM0MsQ0F0Q0giLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXNwcmltYSBmcm9tIFwiZXNwcmltYVwiXHJcbmltcG9ydCBlc2NvZGVnZW4gZnJvbSBcImVzY29kZWdlblwiXHJcblxyXG5pbXBvcnQgZG9jeDRqcyBmcm9tIFwiZG9jeDRqc1wiXHJcblxyXG5pbXBvcnQgQmFzZURvY3VtZW50IGZyb20gXCJkb2N4NGpzL2xpYi9vcGVueG1sL2RvY3gvbW9kZWwvZG9jdW1lbnRcIlxyXG5cclxuZnVuY3Rpb24gY2FsbGVlKG5hbWUpe1xyXG5cdHJldHVybiB7XHJcblx0XHRcInR5cGVcIjogXCJFeHByZXNzaW9uU3RhdGVtZW50XCIsXHJcblx0XHRcImV4cHJlc3Npb25cIjoge1xyXG5cdFx0XHRcInR5cGVcIjogXCJDYWxsRXhwcmVzc2lvblwiLFxyXG5cdFx0XHRcImNhbGxlZVwiOiB7XHJcblx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFwibmFtZVwiOiBuYW1lXHJcblx0XHRcdH0sXHJcblx0XHRcdFwiYXJndW1lbnRzXCI6IFtdXHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudCBleHRlbmRzIEJhc2VEb2N1bWVudHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLndEb2MsZnVuY3Rpb24odmFyaWFudERvY3VtZW50KXtcclxuXHRcdFx0bGV0IF9jdXJyZW50Q29udGFpbmVyLFxyXG5cdFx0XHRcdF92YXJpYW50Q29udGFpbmVycz1bXSxcclxuXHRcdFx0XHR2YXJpYW50QXNzZW1ibGVzPXt9XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRiZWdpblZhcmlhbnQodmFyaWFudCl7XHJcblx0XHRcdFx0XHRcdGlmKF9jdXJyZW50Q29udGFpbmVyICYmXHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXIhPXZhcmlhbnREb2N1bWVudClcclxuXHRcdFx0XHRcdFx0XHR2YXJpYW50LndYbWwuc2V0QXR0cmlidXRlKCdpZCcsdmFyaWFudC52SWQpXHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRzd2l0Y2godmFyaWFudC50eXBlKXtcclxuXHRcdFx0XHRcdFx0Y2FzZSAndmFyaWFudC5leHAnOlxyXG5cdFx0XHRcdFx0XHRcdHZhcmlhbnQudmFyaWFudFBhcmVudD1fY3VycmVudENvbnRhaW5lclxyXG5cdFx0XHRcdFx0XHRcdF9jdXJyZW50Q29udGFpbmVyLnZhcmlhbnRDaGlsZHJlbi5wdXNoKHZhcmlhbnQpXHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuaWYnOlxyXG5cdFx0XHRcdFx0XHRjYXNlICd2YXJpYW50LmZvcic6XHJcblx0XHRcdFx0XHRcdFx0dmFyaWFudC52YXJpYW50UGFyZW50PV9jdXJyZW50Q29udGFpbmVyXHJcblx0XHRcdFx0XHRcdFx0X2N1cnJlbnRDb250YWluZXIudmFyaWFudENoaWxkcmVuLnB1c2godmFyaWFudClcclxuXHRcdFx0XHRcdFx0XHRfdmFyaWFudENvbnRhaW5lcnMucHVzaChfY3VycmVudENvbnRhaW5lcilcclxuXHRcdFx0XHRcdFx0Y2FzZSAnZG9jdW1lbnQnOlxyXG5cdFx0XHRcdFx0XHRcdF9jdXJyZW50Q29udGFpbmVyPXZhcmlhbnRcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdmFyaWFudFxyXG5cdFx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0XHRlbmRWYXJpYW50KHZhcmlhbnQpe1xyXG5cdFx0XHRcdFx0XHRzd2l0Y2godmFyaWFudC50eXBlKXtcclxuXHRcdFx0XHRcdFx0Y2FzZSAndmFyaWFudC5pZic6XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3ZhcmlhbnQuZm9yJzpcclxuXHRcdFx0XHRcdFx0XHRfY3VycmVudENvbnRhaW5lcj1fdmFyaWFudENvbnRhaW5lcnMucG9wKClcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0dmFyaWFudEFzc2VtYmxlc1xyXG5cdFx0XHR9XHJcblx0XHR9KHRoaXMpKVxyXG5cclxuXHRcdHRoaXMudmFyaWFudFBhcmVudD1udWxsXHJcblx0XHR0aGlzLnZhcmlhbnRDaGlsZHJlbj1bXVxyXG5cdFx0dGhpcy5wYXJzZWRDb2RlPWVzcHJpbWEucGFyc2UoXCJ3aXRoKGFyZ3VtZW50c1swXSl7d2l0aChhcmd1bWVudHNbMV0pe319XCIpXHJcblx0XHR0aGlzLmNvZGVCbG9jaz10aGlzLnBhcnNlZENvZGUuYm9keVswXS5ib2R5LmJvZHlbMF0uYm9keS5ib2R5XHJcblx0XHR0aGlzLndEb2MuYmVnaW5WYXJpYW50KHRoaXMpXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQqIHdoaWNoIG1ha2VzIGl0IGFzIGEgdmFyaWFudFxyXG5cdCovXHJcblx0cGFyc2UoKXtcclxuXHRcdHZhciByPXN1cGVyLnBhcnNlKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMud0RvYy5lbmRWYXJpYW50KHRoaXMpXHJcblxyXG5cdFx0aWYodHlwZW9mKHRoaXMucGFyc2VkQ29kZSkhPSdmdW5jdGlvbicpe1xyXG5cdFx0XHRsZXQgY29kZT1lc2NvZGVnZW4uZ2VuZXJhdGUodGhpcy5wYXJzZWRDb2RlKVxyXG5cdFx0XHR0aGlzLnBhcnNlZENvZGU9bmV3IEZ1bmN0aW9uKFwiZGF0YSxvcHRpb25cIixjb2RlKVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJcclxuXHR9XHJcblxyXG5cdHZpc2l0KCl7XHJcblx0XHQvL3doaWNoIG1ha2VzIHRoZSBjbGFzcyBhcyBhIHZpc2l0b3JcclxuXHR9XHJcblx0XHJcblx0XHJcblx0LyoqXHJcblx0KiBwdWJsaWMgQVBJIGZvciB2YXJpYW50IGRvY3hcclxuXHQqL1xyXG5cdGFzc2VtYmxlKGRhdGEsIHRyYW5zYWN0aW9uYWwpe1xyXG5cdFx0dGhpcy52YXJpYW50Q2hpbGRyZW4ubWFwKHZhcmlhbnQ9PntcclxuXHRcdFx0dmFyaWFudC5hc3NlbWJsZWRYbWw9IHRyYW5zYWN0aW9uYWwgPyB2YXJpYW50LndYbWwuY2xvbmVOb2RlKHRydWUpIDogdmFyaWFudC53WG1sXHJcblx0XHR9KVxyXG5cdFx0XHJcblx0XHR0aGlzLnBhcnNlZENvZGUoZGF0YSwgdGhpcy53RG9jLnZhcmlhbnRBc3NlbWJsZXMpXHJcblx0XHRcclxuXHRcdGxldCB3RG9jPXRoaXMud0RvYywgdmFyaWFudENoaWxkcmVuPXRoaXMudmFyaWFudENoaWxkcmVuXHJcblx0XHRcdFxyXG5cdFx0ZnVuY3Rpb24gZ2V0TmV3RG9jeERhdGEoKXtcclxuXHRcdFx0cmV0dXJuICQuaXNOb2RlID8gd0RvYy5yYXcuZ2VuZXJhdGUoe3R5cGU6XCJub2RlYnVmZmVyXCJ9KSA6IHdEb2MucmF3LmdlbmVyYXRlKHt0eXBlOiBcImJsb2JcIixtaW1lVHlwZTogXCJhcHBsaWNhdGlvbi9kb2N4XCJ9KVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRmdW5jdGlvbiBkb1NhdmUobmV3RG9jeERhdGEsZmlsZSl7XHJcblx0XHRcdGlmKCQuaXNOb2RlKXtcclxuXHRcdFx0XHRsZXQgZnM9XCJmc1wiXHJcblx0XHRcdFx0cmVxdWlyZShmcykud3JpdGVGaWxlKGZpbGV8fGAke0RhdGUubm93KCl9LmRvY3hgLG5ld0RvY3hEYXRhKVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRsZXQgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwobmV3RG9jeERhdGEpXHJcblx0XHRcdFx0bGV0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspXHJcblx0XHRcdFx0bGluay5kb3dubG9hZCA9IGAke2ZpbGV8fCduZXcnfS5kb2N4YDtcclxuXHRcdFx0XHRsaW5rLmhyZWYgPSB1cmw7XHJcblx0XHRcdFx0bGluay5jbGljaygpXHJcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGlmKHRyYW5zYWN0aW9uYWwpe1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHNhdmUoZmlsZSl7XHJcblx0XHRcdFx0XHR3RG9jLl9zZXJpYWxpemUoKVxyXG5cdFx0XHRcdFx0ZG9TYXZlKHRoaXMuZGF0YSwgZmlsZSlcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHBhcnNlKCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gd0RvYy5wYXJzZSguLi5hcmd1bWVudHMpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRnZXQgZGF0YSgpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIGdldE5ld0RvY3hEYXRhKClcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHZhcmlhbnRDaGlsZHJlblxyXG5cdFx0XHR9XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0dGhpcy52YXJpYW50Q2hpbGRyZW4ubWFwKHZhcmlhbnQ9PntcclxuXHRcdFx0XHRsZXQgcGFyZW50PXZhcmlhbnQud1htbC5wYXJlbnROb2RlXHJcblx0XHRcdFx0dmFyaWFudC5hc3NlbWJsZWRYbWwgJiYgcGFyZW50LmFwcGVuZENoaWxkKHZhcmlhbnQuYXNzZW1ibGVkWG1sKVxyXG5cdFx0XHRcdHBhcmVudC5yZW1vdmVDaGlsZCh2aWFyaWFudC53WG1sKVxyXG5cdFx0XHR9KVxyXG5cdFx0XHR3RG9jLl9zZXJpYWxpemUoKVxyXG5cdFx0XHRsZXQgbmV3RG9jeERhdGE9Z2V0TmV3RG9jeERhdGEoKVxyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHNhdmUoZmlsZSl7XHJcblx0XHRcdFx0XHRkb1NhdmUobmV3RG9jeERhdGEsZmlsZSlcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHBhcnNlKCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gZG9jeDRqcy5sb2FkKG5ld0RvY3hEYXRhKS5wYXJzZSguLi5hcmd1bWVudHMpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRkYXRhOm5ld0RvY3hEYXRhLFxyXG5cdFx0XHRcdHZhcmlhbnRDaGlsZHJlblxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5pbXBvcnQgRG9jeERvY3VtZW50IGZyb20gXCJkb2N4NGpzXCJcclxuaW1wb3J0IFBhcnQgZnJvbSBcImRvY3g0anMvbGliL29wZW54bWwvcGFydFwiXHJcblxyXG52YXIgeG1sZG9tPVwieG1sZG9tXCI7XHJcbihmdW5jdGlvbihYTUxTZXJpYWxpemVyKXtcclxuXHRPYmplY3QuYXNzaWduKFBhcnQucHJvdG90eXBlLHtcclxuXHRcdHNldENoYW5nZWQoYSl7XHJcblx0XHRcdHZhciB7X2NoYW5nZWRQYXJ0cz1uZXcgU2V0KCl9PXRoaXMuZG9jXHJcblx0XHRcdHRoaXMuZG9jLl9jaGFuZ2VkUGFydHM9X2NoYW5nZWRQYXJ0c1xyXG5cdFx0XHRcclxuXHRcdFx0X2NoYW5nZWRQYXJ0c1thID8gJ2FkZCcgOiAncmVtb3ZlJ10odGhpcylcclxuXHRcdH0sXHJcblx0XHRfc2VyaWFsaXplKCl7XHJcblx0XHRcdHRoaXMuZG9jLnJhdy5maWxlKHRoaXMubmFtZSwgYDw/eG1sIHZlcnNpb249XCIxLjBcIiBlbmNvZGluZz1cIlVURi04XCIgc3RhbmRhbG9uZT1cInllc1wiPz5cXHJcXG4keyhuZXcgWE1MU2VyaWFsaXplcigpKS5zZXJpYWxpemVUb1N0cmluZyh0aGlzLmRvY3VtZW50RWxlbWVudCl9YClcclxuXHRcdH0sXHJcblx0XHRcclxuXHRcdGFkZFJlbChyZWwpe1xyXG5cdFx0XHR2YXIgaWQ9YHJJZCR7TWF0aC5tYXgoT2JqZWN0LmtleXModGhpcy5yZWxzKS5tYXAoYT0+cGFyc2VJbnQoYS5zdWJzdHJpbmcoMykpKSkrMX1gXHJcblx0XHRcdHRoaXMucmVsc1tpZF09cmVsXHJcblx0XHRcdHZhciBlbD10aGlzLmRvY3VtZW50RWxlbWVudC5jcmVhdGVFbGVtZW50KCdSZWxhdGlvbnNoaXAnKVxyXG5cdFx0XHRlbC5zZXRBdHRyaWJ1dGUoXCJJZFwiLGlkKVxyXG5cdFx0XHRPYmplY3Qua2V5cyhyZWwpLmZvckVhY2goYT0+ZWwuc2V0QXR0cmlidXRlKGEscmVsW2FdKSlcclxuXHRcdFx0dGhpcy5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoZWwpXHJcblx0XHRcdHRoaXMuZG9jLmdldFBhcnQodGhpcy5yZWxOYW1lKS5zZXRDaGFuZ2VkKHRydWUpXHJcblx0XHR9LFxyXG5cdFx0XHJcblx0XHRyZW1vdmVSZWwoaWQpe1xyXG5cdFx0XHRkZWxldGUgdGhpcy5yZWxzW2lkXVxyXG5cdFx0XHR0aGlzLmRvY3VtZW50RWxlbWVudC4kMShgUmVsYXRpb25zaGlwW0lkPSR7aWR9XWApLnJlbW92ZSgpXHJcblx0XHRcdHRoaXMuZG9jLmdldFBhcnQodGhpcy5yZWxOYW1lKS5zZXRDaGFuZ2VkKHRydWUpXHJcblx0XHR9XHJcblx0fSlcclxuXHRcclxuXHRPYmplY3QuYXNzaWduKERvY3hEb2N1bWVudC5wcm90b3R5cGUse1xyXG5cdFx0X3NlcmlhbGl6ZSgpe1xyXG5cdFx0XHR2YXIge19jaGFuZ2VkUGFydHN9PXRoaXNcclxuXHRcdFx0aWYoX2NoYW5nZWRQYXJ0cyl7XHJcblx0XHRcdFx0X2NoYW5nZWRQYXJ0cy5mb3JFYWNoKHBhcnQ9PnBhcnQuX3NlcmlhbGl6ZSgpKVxyXG5cdFx0XHRcdGRlbGV0ZSB0aGlzLl9jaGFuZ2VkUGFydHNcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pXHJcbn0pKCQuaXNOb2RlID8gcmVxdWlyZSh4bWxkb20pLlhNTFNlcmlhbGl6ZXIgOiBYTUxTZXJpYWxpemVyKVxyXG4iXX0=