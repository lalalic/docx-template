"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _esprima = require("esprima");

var _esprima2 = _interopRequireDefault(_esprima);

var _docx4js2 = require("docx4js");

var _docx4js3 = _interopRequireDefault(_docx4js2);

var _document = require("./model/document");

var _document2 = _interopRequireDefault(_document);

var _exp2 = require("./model/_exp");

var _exp3 = _interopRequireDefault(_exp2);

var _if = require("./model/_if");

var _if2 = _interopRequireDefault(_if);

var _for = require("./model/_for");

var _for2 = _interopRequireDefault(_for);

var _picture = require("./model/_picture");

var _picture2 = _interopRequireDefault(_picture);

var _part = require("./part");

var _part2 = _interopRequireDefault(_part);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ignore = {
	visit: function visit() {}
};

var DocxTemplate = function (_docx4js) {
	(0, _inherits3.default)(DocxTemplate, _docx4js);

	function DocxTemplate() {
		(0, _classCallCheck3.default)(this, DocxTemplate);
		return (0, _possibleConstructorReturn3.default)(this, (DocxTemplate.__proto__ || (0, _getPrototypeOf2.default)(DocxTemplate)).apply(this, arguments));
	}

	(0, _createClass3.default)(DocxTemplate, [{
		key: "_serialize",
		value: function _serialize() {
			var _changedParts = this._changedParts;

			if (_changedParts) {
				_changedParts.forEach(function (part) {
					return part._serialize();
				});
				delete this._changedParts;
			}
		}
	}, {
		key: "_restore",
		value: function _restore() {}
	}, {
		key: "_doSave",
		value: function _doSave(newDocxData, file) {
			if ($.isNode) {
				require("f" + "s").writeFile(file || Date.now() + ".docx", newDocxData);
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
	}], [{
		key: "createVisitorFactory",
		value: function createVisitorFactory(factory) {
			return _docx4js3.default.createVisitorFactory(factory || function (wordModel) {
				switch (wordModel.type) {
					case _document2.default.type:
					case _exp3.default.type:
					case _for2.default.type:
					case _if2.default.type:
					case _picture2.default.type:
						return wordModel;
					default:
						return ignore;
				}
			});
		}
	}, {
		key: "parse",
		value: function parse(file) {
			var _this2 = this;

			return this.load(file).then(function (docx) {
				var document = docx.parse(_this2.createVisitorFactory());
				return {
					assemble: function assemble(data, transactional) {
						return document.assemble(data, transactional);
					},

					variantChildren: document.variantChildren
				};
			});
		}
	}, {
		key: "assemble",
		value: function assemble(file, data) {
			var _this3 = this;

			return this.load(file).then(function (docx) {
				return docx.parse(_this3.createVisitorFactory()).assemble(data, true);
			});
		}
	}]);
	return DocxTemplate;
}(_docx4js3.default);

DocxTemplate.Factory = function (_Factory) {
	(0, _inherits3.default)(_class, _Factory);

	function _class() {
		(0, _classCallCheck3.default)(this, _class);
		return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
	}

	(0, _createClass3.default)(_class, [{
		key: "create",
		value: function create(wXml) {
			if (wXml.localName == 'document') return new (Function.prototype.bind.apply(_document2.default, [null].concat(Array.prototype.slice.call(arguments))))();
			return (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), "create", this).apply(this, arguments);
		}
	}, {
		key: "createControl",
		value: function createControl(type, wXml, doc, parent) {
			var tagEl = wXml.$1('>sdtPr>tag'),
			    tag = tagEl && tagEl.attr('w:val') || false;

			var isExp = this.constructor.isExp;

			switch (type) {
				case "picture":
					var exp = null;
					if (exp = isExp(tag)) return new _picture2.default(wXml, doc, parent, _esprima2.default.parse(exp));
					break;
				case "richtext":
					if (tag) {
						tag = tag.trim();
						try {
							var parsedCode = _esprima2.default.parse(tag + '{}');
							if (parsedCode.body.length == 2) //for/if(){}{}
								parsedCode.body.pop();else if (parsedCode.body.length > 1) throw new Error("syntax error");

							var _parsedCode$body = (0, _slicedToArray3.default)(parsedCode.body, 1);

							var firstStatement = _parsedCode$body[0];

							switch (firstStatement.type) {
								case 'ForStatement':
									return new _for2.default(wXml, doc, parent, parsedCode);
									break;
								case 'IfStatement':
									return new _if2.default(wXml, doc, parent, parsedCode);
									break;
							}
						} catch (e) {
							//console.error(`error ${this.type} code:${this.code}`)
							//throw e
						}
					} else {
						var _exp = null;
						if (_exp = isExp(wXml.textContent.trim())) {
							return new _exp3.default(wXml, doc, parent, _esprima2.default.parse(_exp));
						}
					}
					break;
			}

			return (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), "createControl", this).apply(this, arguments);
		}
	}], [{
		key: "isExp",
		value: function isExp(text) {
			text = text.trim();
			if (text.charAt(0) == '$' && text.charAt(1) == '{' && text.charAt(text.length - 1) == '}') {
				text = text.substring(2, text.length - 1).trim();
				if (text.length) return text;
			}
			return false;
		}
	}]);
	return _class;
}(_docx4js2.Factory);

exports.default = DocxTemplate;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJpZ25vcmUiLCJ2aXNpdCIsIkRvY3hUZW1wbGF0ZSIsIl9jaGFuZ2VkUGFydHMiLCJmb3JFYWNoIiwicGFydCIsIl9zZXJpYWxpemUiLCJuZXdEb2N4RGF0YSIsImZpbGUiLCIkIiwiaXNOb2RlIiwicmVxdWlyZSIsIndyaXRlRmlsZSIsIkRhdGUiLCJub3ciLCJ1cmwiLCJ3aW5kb3ciLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJsaW5rIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwiZG93bmxvYWQiLCJocmVmIiwiY2xpY2siLCJyZW1vdmVDaGlsZCIsImZhY3RvcnkiLCJjcmVhdGVWaXNpdG9yRmFjdG9yeSIsIndvcmRNb2RlbCIsInR5cGUiLCJsb2FkIiwidGhlbiIsImRvY3giLCJwYXJzZSIsImFzc2VtYmxlIiwiZGF0YSIsInRyYW5zYWN0aW9uYWwiLCJ2YXJpYW50Q2hpbGRyZW4iLCJGYWN0b3J5Iiwid1htbCIsImxvY2FsTmFtZSIsImFyZ3VtZW50cyIsImRvYyIsInBhcmVudCIsInRhZ0VsIiwiJDEiLCJ0YWciLCJhdHRyIiwiaXNFeHAiLCJjb25zdHJ1Y3RvciIsImV4cCIsInRyaW0iLCJwYXJzZWRDb2RlIiwibGVuZ3RoIiwicG9wIiwiRXJyb3IiLCJmaXJzdFN0YXRlbWVudCIsImUiLCJ0ZXh0Q29udGVudCIsInRleHQiLCJjaGFyQXQiLCJzdWJzdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7QUFFQSxJQUFJQSxTQUFPO0FBQUNDLE1BQUQsbUJBQVEsQ0FBRTtBQUFWLENBQVg7O0lBRXFCQyxZOzs7Ozs7Ozs7OytCQUNSO0FBQUEsT0FDTkMsYUFETSxHQUNTLElBRFQsQ0FDTkEs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QUFDQSxPQUFHUSxLQUFLQyxNQUFMLENBQVksQ0FBWixLQUFrQixHQUFsQixJQUF5QkQsS0FBS0MsTUFBTCxDQUFZLENBQVosS0FBa0IsR0FBM0MsSUFBa0RELEtBQUtDLE1BQUwsQ0FBWUQsS0FBS04sTUFBTCxHQUFjLENBQTFCLEtBQWdDLEdBQXJGLEVBQXlGO0FBQ3hGTSxXQUFLQSxLQUFLRSxTQUFMLENBQWUsQ0FBZixFQUFpQkYsS0FBS04sTUFBTCxHQUFZLENBQTdCLEVBQWdDRixJQUFoQyxFQUFMO0FBQ0EsUUFBR1EsS0FBS04sTUFBUixFQUNDLE9BQU9NLElBQVA7QUFDRDtBQUNELFVBQU8sS0FBUDtBQUNBOzs7OztrQkF4R2tCM0QsWSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBlc3ByaW1hIGZyb20gXCJlc3ByaW1hXCJcclxuaW1wb3J0IGRvY3g0anMsIHtGYWN0b3J5fSBmcm9tIFwiZG9jeDRqc1wiXHJcblxyXG5pbXBvcnQgRG9jdW1lbnQgZnJvbSBcIi4vbW9kZWwvZG9jdW1lbnRcIlxyXG5pbXBvcnQgRXhwcmVzc2lvbiBmcm9tIFwiLi9tb2RlbC9fZXhwXCJcclxuaW1wb3J0IElmIGZyb20gXCIuL21vZGVsL19pZlwiXHJcbmltcG9ydCBGb3IgZnJvbSBcIi4vbW9kZWwvX2ZvclwiXHJcbmltcG9ydCBQaWN0dXJlIGZyb20gXCIuL21vZGVsL19waWN0dXJlXCJcclxuXHJcbmltcG9ydCBQYXJ0IGZyb20gXCIuL3BhcnRcIlxyXG5cclxudmFyIGlnbm9yZT17dmlzaXQoKXt9fVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jeFRlbXBsYXRlIGV4dGVuZHMgZG9jeDRqc3tcclxuXHRfc2VyaWFsaXplKCl7XHJcblx0XHR2YXIge19jaGFuZ2VkUGFydHN9PXRoaXNcclxuXHRcdGlmKF9jaGFuZ2VkUGFydHMpe1xyXG5cdFx0XHRfY2hhbmdlZFBhcnRzLmZvckVhY2gocGFydD0+cGFydC5fc2VyaWFsaXplKCkpXHJcblx0XHRcdGRlbGV0ZSB0aGlzLl9jaGFuZ2VkUGFydHNcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdF9yZXN0b3JlKCl7XHJcblxyXG5cdH1cclxuXHRcclxuXHRfZG9TYXZlKG5ld0RvY3hEYXRhLGZpbGUpe1xyXG5cdFx0aWYoJC5pc05vZGUpe1xyXG5cdFx0XHRyZXF1aXJlKFwiZlwiK1wic1wiKS53cml0ZUZpbGUoZmlsZXx8YCR7RGF0ZS5ub3coKX0uZG9jeGAsbmV3RG9jeERhdGEpXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0bGV0IHVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKG5ld0RvY3hEYXRhKVxyXG5cdFx0XHRsZXQgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspXHJcblx0XHRcdGxpbmsuZG93bmxvYWQgPSBgJHtmaWxlfHwnbmV3J30uZG9jeGA7XHJcblx0XHRcdGxpbmsuaHJlZiA9IHVybDtcclxuXHRcdFx0bGluay5jbGljaygpXHJcblx0XHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluaylcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGNyZWF0ZVZpc2l0b3JGYWN0b3J5KGZhY3Rvcnkpe1xyXG5cdFx0cmV0dXJuIGRvY3g0anMuY3JlYXRlVmlzaXRvckZhY3RvcnkoZmFjdG9yeSB8fCBmdW5jdGlvbih3b3JkTW9kZWwpe1xyXG5cdFx0XHRzd2l0Y2god29yZE1vZGVsLnR5cGUpe1xyXG5cdFx0XHRjYXNlIERvY3VtZW50LnR5cGU6XHJcblx0XHRcdGNhc2UgRXhwcmVzc2lvbi50eXBlOlxyXG5cdFx0XHRjYXNlIEZvci50eXBlOlxyXG5cdFx0XHRjYXNlIElmLnR5cGU6XHJcblx0XHRcdGNhc2UgUGljdHVyZS50eXBlOlxyXG5cdFx0XHRcdHJldHVybiB3b3JkTW9kZWxcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRyZXR1cm4gaWdub3JlXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fSBcclxuXHRcclxuXHRzdGF0aWMgRmFjdG9yeT1jbGFzcyBleHRlbmRzIEZhY3Rvcnl7XHJcblx0XHRjcmVhdGUod1htbCl7XHJcblx0XHRcdGlmKHdYbWwubG9jYWxOYW1lPT0nZG9jdW1lbnQnKVxyXG5cdFx0XHRcdHJldHVybiBuZXcgRG9jdW1lbnQoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRyZXR1cm4gc3VwZXIuY3JlYXRlKC4uLmFyZ3VtZW50cylcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0Y3JlYXRlQ29udHJvbCh0eXBlLHdYbWwsZG9jLHBhcmVudCl7XHJcblx0XHRcdGxldCB0YWdFbD13WG1sLiQxKCc+c2R0UHI+dGFnJyksXHJcblx0XHRcdFx0dGFnPXRhZ0VsICYmIHRhZ0VsLmF0dHIoJ3c6dmFsJykgfHwgZmFsc2VcclxuXHRcdFx0XHJcblx0XHRcdGxldCBpc0V4cD10aGlzLmNvbnN0cnVjdG9yLmlzRXhwXHJcblx0XHRcdFxyXG5cdFx0XHRzd2l0Y2godHlwZSl7XHJcblx0XHRcdFx0Y2FzZSBcInBpY3R1cmVcIjpcclxuXHRcdFx0XHRcdGxldCBleHA9bnVsbFxyXG5cdFx0XHRcdFx0aWYoZXhwPWlzRXhwKHRhZykpXHJcblx0XHRcdFx0XHRcdHJldHVybiBuZXcgUGljdHVyZSh3WG1sLGRvYyxwYXJlbnQsZXNwcmltYS5wYXJzZShleHApKVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0Y2FzZSBcInJpY2h0ZXh0XCI6XHJcblx0XHRcdFx0XHRpZih0YWcpe1xyXG5cdFx0XHRcdFx0XHR0YWc9dGFnLnRyaW0oKVxyXG5cdFx0XHRcdFx0XHR0cnl7XHJcblx0XHRcdFx0XHRcdFx0bGV0IHBhcnNlZENvZGU9ZXNwcmltYS5wYXJzZSh0YWcrJ3t9JylcclxuXHRcdFx0XHRcdFx0XHRpZihwYXJzZWRDb2RlLmJvZHkubGVuZ3RoPT0yKS8vZm9yL2lmKCl7fXt9XHJcblx0XHRcdFx0XHRcdFx0XHRwYXJzZWRDb2RlLmJvZHkucG9wKClcclxuXHRcdFx0XHRcdFx0XHRlbHNlIGlmKHBhcnNlZENvZGUuYm9keS5sZW5ndGg+MSlcclxuXHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcInN5bnRheCBlcnJvclwiKVxyXG5cclxuXHRcdFx0XHRcdFx0XHRsZXQgW2ZpcnN0U3RhdGVtZW50XT1wYXJzZWRDb2RlLmJvZHlcclxuXHRcdFx0XHRcdFx0XHRzd2l0Y2goZmlyc3RTdGF0ZW1lbnQudHlwZSl7XHJcblx0XHRcdFx0XHRcdFx0Y2FzZSAnRm9yU3RhdGVtZW50JzpcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBuZXcgRm9yKHdYbWwsZG9jLHBhcmVudCwgcGFyc2VkQ29kZSlcclxuXHRcdFx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0XHRcdGNhc2UgJ0lmU3RhdGVtZW50JzpcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBuZXcgSWYod1htbCxkb2MscGFyZW50LCBwYXJzZWRDb2RlKVxyXG5cdFx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9Y2F0Y2goZSl7XHJcblx0XHRcdFx0XHRcdFx0Ly9jb25zb2xlLmVycm9yKGBlcnJvciAke3RoaXMudHlwZX0gY29kZToke3RoaXMuY29kZX1gKVxyXG5cdFx0XHRcdFx0XHRcdC8vdGhyb3cgZVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0bGV0IGV4cD1udWxsO1xyXG5cdFx0XHRcdFx0XHRpZihleHA9aXNFeHAod1htbC50ZXh0Q29udGVudC50cmltKCkpKXtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbmV3IEV4cHJlc3Npb24od1htbCxkb2MscGFyZW50LGVzcHJpbWEucGFyc2UoZXhwKSlcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBzdXBlci5jcmVhdGVDb250cm9sKC4uLmFyZ3VtZW50cylcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0c3RhdGljIGlzRXhwKHRleHQpe1xyXG5cdFx0XHR0ZXh0PXRleHQudHJpbSgpXHJcblx0XHRcdGlmKHRleHQuY2hhckF0KDApID09ICckJyAmJiB0ZXh0LmNoYXJBdCgxKSA9PSAneycgJiYgdGV4dC5jaGFyQXQodGV4dC5sZW5ndGggLSAxKSA9PSAnfScpe1xyXG5cdFx0XHRcdHRleHQ9dGV4dC5zdWJzdHJpbmcoMix0ZXh0Lmxlbmd0aC0xKS50cmltKClcclxuXHRcdFx0XHRpZih0ZXh0Lmxlbmd0aClcclxuXHRcdFx0XHRcdHJldHVybiB0ZXh0XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgcGFyc2UoZmlsZSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZChmaWxlKS50aGVuKGRvY3g9PntcclxuXHRcdFx0dmFyIGRvY3VtZW50PWRvY3gucGFyc2UodGhpcy5jcmVhdGVWaXNpdG9yRmFjdG9yeSgpKVxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG5cdFx0XHRcdFx0YXNzZW1ibGUoZGF0YSx0cmFuc2FjdGlvbmFsKXtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGRvY3VtZW50LmFzc2VtYmxlKGRhdGEsdHJhbnNhY3Rpb25hbClcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR2YXJpYW50Q2hpbGRyZW46IGRvY3VtZW50LnZhcmlhbnRDaGlsZHJlblxyXG5cdFx0XHRcdH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBhc3NlbWJsZShmaWxlLGRhdGEpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvYWQoZmlsZSkudGhlbihkb2N4PT57XHJcbiAgICAgICAgICAgIHJldHVybiBkb2N4LnBhcnNlKHRoaXMuY3JlYXRlVmlzaXRvckZhY3RvcnkoKSlcclxuXHRcdFx0XHQuYXNzZW1ibGUoZGF0YSx0cnVlKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn0iXX0=