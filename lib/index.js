"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ignore = {
	visit: function visit() {}
};

var DocxTemplate = function (_docx4js) {
	_inherits(DocxTemplate, _docx4js);

	function DocxTemplate() {
		_classCallCheck(this, DocxTemplate);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(DocxTemplate).apply(this, arguments));
	}

	_createClass(DocxTemplate, [{
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
	_inherits(_class, _Factory);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "create",
		value: function create(wXml) {
			if (wXml.localName == 'document') return new (Function.prototype.bind.apply(_document2.default, [null].concat(Array.prototype.slice.call(arguments))))();
			return _get(Object.getPrototypeOf(_class.prototype), "create", this).apply(this, arguments);
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

							var _parsedCode$body = _slicedToArray(parsedCode.body, 1);

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

			return _get(Object.getPrototypeOf(_class.prototype), "createControl", this).apply(this, arguments);
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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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Q0FBYyxJQUFkLENBQS9CLENBQVAsQ0FEcUM7UUFBdEM7T0F4QkQ7QUE0QkQsV0E3QkE7QUFORCxJQU5rQzs7QUE0Q2xDLDJGQUE4QixVQUE5QixDQTVDa0M7Ozs7d0JBK0N0QixNQUFLO0FBQ2pCLFVBQUssS0FBSyxJQUFMLEVBQUwsQ0FEaUI7QUFFakIsT0FBRyxLQUFLLE1BQUwsQ0FBWSxDQUFaLEtBQWtCLEdBQWxCLElBQXlCLEtBQUssTUFBTCxDQUFZLENBQVosS0FBa0IsR0FBbEIsSUFBeUIsS0FBSyxNQUFMLENBQVksS0FBSyxNQUFMLEdBQWMsQ0FBZCxDQUFaLElBQWdDLEdBQWhDLEVBQW9DO0FBQ3hGLFdBQUssS0FBSyxTQUFMLENBQWUsQ0FBZixFQUFpQixLQUFLLE1BQUwsR0FBWSxDQUFaLENBQWpCLENBQWdDLElBQWhDLEVBQUwsQ0FEd0Y7QUFFeEYsUUFBRyxLQUFLLE1BQUwsRUFDRixPQUFPLElBQVAsQ0FERDtJQUZEO0FBS0EsVUFBTyxLQUFQLENBUGlCOzs7Ozs7O2tCQWhHQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBlc3ByaW1hIGZyb20gXCJlc3ByaW1hXCJcclxuaW1wb3J0IGRvY3g0anMsIHtGYWN0b3J5fSBmcm9tIFwiZG9jeDRqc1wiXHJcblxyXG5pbXBvcnQgRG9jdW1lbnQgZnJvbSBcIi4vbW9kZWwvZG9jdW1lbnRcIlxyXG5pbXBvcnQgRXhwcmVzc2lvbiBmcm9tIFwiLi9tb2RlbC9fZXhwXCJcclxuaW1wb3J0IElmIGZyb20gXCIuL21vZGVsL19pZlwiXHJcbmltcG9ydCBGb3IgZnJvbSBcIi4vbW9kZWwvX2ZvclwiXHJcbmltcG9ydCBQaWN0dXJlIGZyb20gXCIuL21vZGVsL19waWN0dXJlXCJcclxuXHJcbmltcG9ydCBQYXJ0IGZyb20gXCIuL3BhcnRcIlxyXG5cclxudmFyIGlnbm9yZT17dmlzaXQoKXt9fVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jeFRlbXBsYXRlIGV4dGVuZHMgZG9jeDRqc3tcclxuXHRfc2VyaWFsaXplKCl7XHJcblx0XHR2YXIge19jaGFuZ2VkUGFydHN9PXRoaXNcclxuXHRcdGlmKF9jaGFuZ2VkUGFydHMpe1xyXG5cdFx0XHRfY2hhbmdlZFBhcnRzLmZvckVhY2gocGFydD0+cGFydC5fc2VyaWFsaXplKCkpXHJcblx0XHRcdGRlbGV0ZSB0aGlzLl9jaGFuZ2VkUGFydHNcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdF9yZXN0b3JlKCl7XHJcblxyXG5cdH1cclxuXHRcclxuXHRfZG9TYXZlKG5ld0RvY3hEYXRhLGZpbGUpe1xyXG5cdFx0aWYoJC5pc05vZGUpe1xyXG5cdFx0XHRyZXF1aXJlKFwiZlwiK1wic1wiKS53cml0ZUZpbGUoZmlsZXx8YCR7RGF0ZS5ub3coKX0uZG9jeGAsbmV3RG9jeERhdGEpXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0bGV0IHVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKG5ld0RvY3hEYXRhKVxyXG5cdFx0XHRsZXQgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspXHJcblx0XHRcdGxpbmsuZG93bmxvYWQgPSBgJHtmaWxlfHwnbmV3J30uZG9jeGA7XHJcblx0XHRcdGxpbmsuaHJlZiA9IHVybDtcclxuXHRcdFx0bGluay5jbGljaygpXHJcblx0XHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluaylcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGNyZWF0ZVZpc2l0b3JGYWN0b3J5KGZhY3Rvcnkpe1xyXG5cdFx0cmV0dXJuIGRvY3g0anMuY3JlYXRlVmlzaXRvckZhY3RvcnkoZmFjdG9yeSB8fCBmdW5jdGlvbih3b3JkTW9kZWwpe1xyXG5cdFx0XHRzd2l0Y2god29yZE1vZGVsLnR5cGUpe1xyXG5cdFx0XHRjYXNlIERvY3VtZW50LnR5cGU6XHJcblx0XHRcdGNhc2UgRXhwcmVzc2lvbi50eXBlOlxyXG5cdFx0XHRjYXNlIEZvci50eXBlOlxyXG5cdFx0XHRjYXNlIElmLnR5cGU6XHJcblx0XHRcdGNhc2UgUGljdHVyZS50eXBlOlxyXG5cdFx0XHRcdHJldHVybiB3b3JkTW9kZWxcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRyZXR1cm4gaWdub3JlXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fSBcclxuXHRcclxuXHRzdGF0aWMgRmFjdG9yeT1jbGFzcyBleHRlbmRzIEZhY3Rvcnl7XHJcblx0XHRjcmVhdGUod1htbCl7XHJcblx0XHRcdGlmKHdYbWwubG9jYWxOYW1lPT0nZG9jdW1lbnQnKVxyXG5cdFx0XHRcdHJldHVybiBuZXcgRG9jdW1lbnQoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRyZXR1cm4gc3VwZXIuY3JlYXRlKC4uLmFyZ3VtZW50cylcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0Y3JlYXRlQ29udHJvbCh0eXBlLHdYbWwsZG9jLHBhcmVudCl7XHJcblx0XHRcdGxldCB0YWdFbD13WG1sLiQxKCc+c2R0UHI+dGFnJyksXHJcblx0XHRcdFx0dGFnPXRhZ0VsICYmIHRhZ0VsLmF0dHIoJ3c6dmFsJykgfHwgZmFsc2VcclxuXHRcdFx0XHJcblx0XHRcdGxldCBpc0V4cD10aGlzLmNvbnN0cnVjdG9yLmlzRXhwXHJcblx0XHRcdFxyXG5cdFx0XHRzd2l0Y2godHlwZSl7XHJcblx0XHRcdFx0Y2FzZSBcInBpY3R1cmVcIjpcclxuXHRcdFx0XHRcdGxldCBleHA9bnVsbFxyXG5cdFx0XHRcdFx0aWYoZXhwPWlzRXhwKHRhZykpXHJcblx0XHRcdFx0XHRcdHJldHVybiBuZXcgUGljdHVyZSh3WG1sLGRvYyxwYXJlbnQsZXNwcmltYS5wYXJzZShleHApKVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0Y2FzZSBcInJpY2h0ZXh0XCI6XHJcblx0XHRcdFx0XHRpZih0YWcpe1xyXG5cdFx0XHRcdFx0XHR0YWc9dGFnLnRyaW0oKVxyXG5cdFx0XHRcdFx0XHR0cnl7XHJcblx0XHRcdFx0XHRcdFx0bGV0IHBhcnNlZENvZGU9ZXNwcmltYS5wYXJzZSh0YWcrJ3t9JylcclxuXHRcdFx0XHRcdFx0XHRpZihwYXJzZWRDb2RlLmJvZHkubGVuZ3RoPT0yKS8vZm9yL2lmKCl7fXt9XHJcblx0XHRcdFx0XHRcdFx0XHRwYXJzZWRDb2RlLmJvZHkucG9wKClcclxuXHRcdFx0XHRcdFx0XHRlbHNlIGlmKHBhcnNlZENvZGUuYm9keS5sZW5ndGg+MSlcclxuXHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcInN5bnRheCBlcnJvclwiKVxyXG5cclxuXHRcdFx0XHRcdFx0XHRsZXQgW2ZpcnN0U3RhdGVtZW50XT1wYXJzZWRDb2RlLmJvZHlcclxuXHRcdFx0XHRcdFx0XHRzd2l0Y2goZmlyc3RTdGF0ZW1lbnQudHlwZSl7XHJcblx0XHRcdFx0XHRcdFx0Y2FzZSAnRm9yU3RhdGVtZW50JzpcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBuZXcgRm9yKHdYbWwsZG9jLHBhcmVudCwgcGFyc2VkQ29kZSlcclxuXHRcdFx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0XHRcdGNhc2UgJ0lmU3RhdGVtZW50JzpcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBuZXcgSWYod1htbCxkb2MscGFyZW50LCBwYXJzZWRDb2RlKVxyXG5cdFx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9Y2F0Y2goZSl7XHJcblx0XHRcdFx0XHRcdFx0Ly9jb25zb2xlLmVycm9yKGBlcnJvciAke3RoaXMudHlwZX0gY29kZToke3RoaXMuY29kZX1gKVxyXG5cdFx0XHRcdFx0XHRcdC8vdGhyb3cgZVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0bGV0IGV4cD1udWxsO1xyXG5cdFx0XHRcdFx0XHRpZihleHA9aXNFeHAod1htbC50ZXh0Q29udGVudC50cmltKCkpKXtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbmV3IEV4cHJlc3Npb24od1htbCxkb2MscGFyZW50LGVzcHJpbWEucGFyc2UoZXhwKSlcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBzdXBlci5jcmVhdGVDb250cm9sKC4uLmFyZ3VtZW50cylcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0c3RhdGljIGlzRXhwKHRleHQpe1xyXG5cdFx0XHR0ZXh0PXRleHQudHJpbSgpXHJcblx0XHRcdGlmKHRleHQuY2hhckF0KDApID09ICckJyAmJiB0ZXh0LmNoYXJBdCgxKSA9PSAneycgJiYgdGV4dC5jaGFyQXQodGV4dC5sZW5ndGggLSAxKSA9PSAnfScpe1xyXG5cdFx0XHRcdHRleHQ9dGV4dC5zdWJzdHJpbmcoMix0ZXh0Lmxlbmd0aC0xKS50cmltKClcclxuXHRcdFx0XHRpZih0ZXh0Lmxlbmd0aClcclxuXHRcdFx0XHRcdHJldHVybiB0ZXh0XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgcGFyc2UoZmlsZSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZChmaWxlKS50aGVuKGRvY3g9PntcclxuXHRcdFx0dmFyIGRvY3VtZW50PWRvY3gucGFyc2UodGhpcy5jcmVhdGVWaXNpdG9yRmFjdG9yeSgpKVxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG5cdFx0XHRcdFx0YXNzZW1ibGUoZGF0YSx0cmFuc2FjdGlvbmFsKXtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGRvY3VtZW50LmFzc2VtYmxlKGRhdGEsdHJhbnNhY3Rpb25hbClcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR2YXJpYW50Q2hpbGRyZW46IGRvY3VtZW50LnZhcmlhbnRDaGlsZHJlblxyXG5cdFx0XHRcdH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBhc3NlbWJsZShmaWxlLGRhdGEpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvYWQoZmlsZSkudGhlbihkb2N4PT57XHJcbiAgICAgICAgICAgIHJldHVybiBkb2N4LnBhcnNlKHRoaXMuY3JlYXRlVmlzaXRvckZhY3RvcnkoKSlcclxuXHRcdFx0XHQuYXNzZW1ibGUoZGF0YSx0cnVlKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn0iXX0=