"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

var _esprima = require("esprima");

var _esprima2 = _interopRequireDefault(_esprima);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isExp(text) {
	text = text.trim();
	if (text.charAt(0) == '$' && text.charAt(1) == '{' && text.charAt(text.length - 1) == '}') {
		text = text.substring(2, text.length - 1).trim();
		if (text.length) return text;
	}
	return false;
}

Object.assign(_docx4js2.default.factory, {
	extendControl: function extendControl(type, wXml, doc, parent) {
		var tagEl = wXml.$1('>sdtPr>tag'),
		    tag = tagEl && tagEl.attr('w:val') || false;

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
	},
	extend: function extend(wXml) {
		if (wXml.localName == 'document') return new (Function.prototype.bind.apply(_document2.default, [null].concat(Array.prototype.slice.call(arguments))))();
	}
});

function createFactory() {
	var ignore = {
		visit: function visit() {}
	};
	return _docx4js2.default.createVisitorFactory(function (wordModel) {
		switch (wordModel.type) {
			case 'document':
			case 'variant.exp':
			case 'variant.for':
			case 'variant.if':
				return wordModel;
			default:
				return ignore;
		}
	});
}

exports.default = {
	parse: function parse(file) {
		return _docx4js2.default.load(file).then(function (docx) {
			var document = docx.parse(createFactory());
			return {
				assemble: function assemble(data, transactional) {
					return document.assemble(data, transactional);
				},

				variantChildren: document.variantChildren
			};
		});
	},
	assemble: function assemble(file, data) {
		return _docx4js2.default.load(file).then(function (docx) {
			return docx.parse(createFactory()).assemble(data, true);
		});
	}
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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RXZCLFFBQU8sa0JBQVEsb0JBQVIsQ0FBNkIsVUFBUyxTQUFULEVBQW1CO0FBQ3RELFVBQU8sVUFBVSxJQUFWO0FBQ1AsUUFBSyxVQUFMLENBREE7QUFFQSxRQUFLLGFBQUwsQ0FGQTtBQUdBLFFBQUssYUFBTCxDQUhBO0FBSUEsUUFBSyxZQUFMO0FBQ0MsV0FBTyxTQUFQLENBREQ7QUFKQTtBQU9DLFdBQU8sTUFBUCxDQUREO0FBTkEsR0FEc0Q7RUFBbkIsQ0FBcEMsQ0FGdUI7Q0FBeEI7O2tCQWVlO0FBQ1gsdUJBQU0sTUFBSztBQUNQLFNBQU8sa0JBQVEsSUFBUixDQUFhLElBQWIsRUFBbUIsSUFBbkIsQ0FBd0IsZ0JBQU07QUFDMUMsT0FBSSxXQUFTLEtBQUssS0FBTCxDQUFXLGVBQVgsQ0FBVCxDQURzQztBQUVqQyxVQUFPO0FBQ2QsZ0NBQVMsTUFBSyxlQUFjO0FBQzNCLFlBQU8sU0FBUyxRQUFULENBQWtCLElBQWxCLEVBQXVCLGFBQXZCLENBQVAsQ0FEMkI7S0FEZDs7QUFJZCxxQkFBaUIsU0FBUyxlQUFUO0lBSlYsQ0FGaUM7R0FBTixDQUEvQixDQURPO0VBREE7QUFhWCw2QkFBUyxNQUFLLE1BQUs7QUFDZixTQUFPLGtCQUFRLElBQVIsQ0FBYSxJQUFiLEVBQW1CLElBQW5CLENBQXdCLGdCQUFNO0FBQ2pDLFVBQU8sS0FBSyxLQUFMLENBQVcsZUFBWCxFQUE0QixRQUE1QixDQUFxQyxJQUFyQyxFQUEwQyxJQUExQyxDQUFQLENBRGlDO0dBQU4sQ0FBL0IsQ0FEZTtFQWJSIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRvY3g0anMgZnJvbSBcImRvY3g0anNcIlxyXG5pbXBvcnQgZXNwcmltYSBmcm9tIFwiZXNwcmltYVwiXHJcblxyXG5pbXBvcnQgRG9jdW1lbnQgZnJvbSBcIi4vbW9kZWwvZG9jdW1lbnRcIlxyXG5pbXBvcnQgRXhwcmVzc2lvbiBmcm9tIFwiLi9tb2RlbC9fZXhwXCJcclxuaW1wb3J0IElmIGZyb20gXCIuL21vZGVsL19pZlwiXHJcbmltcG9ydCBGb3IgZnJvbSBcIi4vbW9kZWwvX2ZvclwiXHJcbmltcG9ydCBQaWN0dXJlIGZyb20gXCIuL21vZGVsL19waWN0dXJlXCJcclxuXHJcbmZ1bmN0aW9uIGlzRXhwKHRleHQpe1xyXG5cdHRleHQ9dGV4dC50cmltKClcclxuXHRpZih0ZXh0LmNoYXJBdCgwKSA9PSAnJCcgJiYgdGV4dC5jaGFyQXQoMSkgPT0gJ3snICYmIHRleHQuY2hhckF0KHRleHQubGVuZ3RoIC0gMSkgPT0gJ30nKXtcclxuXHRcdHRleHQ9dGV4dC5zdWJzdHJpbmcoMix0ZXh0Lmxlbmd0aC0xKS50cmltKClcclxuXHRcdGlmKHRleHQubGVuZ3RoKVxyXG5cdFx0XHRyZXR1cm4gdGV4dFxyXG5cdH1cclxuXHRyZXR1cm4gZmFsc2VcclxufVxyXG5cclxuT2JqZWN0LmFzc2lnbihkb2N4NGpzLmZhY3Rvcnkse1xyXG5cdGV4dGVuZENvbnRyb2wodHlwZSx3WG1sLGRvYyxwYXJlbnQpe1xyXG5cdFx0bGV0IHRhZ0VsPXdYbWwuJDEoJz5zZHRQcj50YWcnKSxcclxuXHRcdFx0dGFnPXRhZ0VsICYmIHRhZ0VsLmF0dHIoJ3c6dmFsJykgfHwgZmFsc2VcclxuXHJcblx0XHRzd2l0Y2godHlwZSl7XHJcblx0XHRjYXNlIFwicGljdHVyZVwiOlxyXG5cdFx0XHRsZXQgZXhwPW51bGxcclxuXHRcdFx0aWYoZXhwPWlzRXhwKHRhZykpXHJcblx0XHRcdFx0cmV0dXJuIG5ldyBQaWN0dXJlKHdYbWwsZG9jLHBhcmVudCxlc3ByaW1hLnBhcnNlKGV4cCkpXHJcblx0XHRicmVha1xyXG5cdFx0Y2FzZSBcInJpY2h0ZXh0XCI6XHJcblx0XHRcdGlmKHRhZyl7XHJcblx0XHRcdFx0dGFnPXRhZy50cmltKClcclxuXHRcdFx0XHR0cnl7XHJcblx0XHRcdFx0XHRsZXQgcGFyc2VkQ29kZT1lc3ByaW1hLnBhcnNlKHRhZysne30nKVxyXG5cdFx0XHRcdFx0aWYocGFyc2VkQ29kZS5ib2R5Lmxlbmd0aD09MikvL2Zvci9pZigpe317fVxyXG5cdFx0XHRcdFx0XHRwYXJzZWRDb2RlLmJvZHkucG9wKClcclxuXHRcdFx0XHRcdGVsc2UgaWYocGFyc2VkQ29kZS5ib2R5Lmxlbmd0aD4xKVxyXG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJzeW50YXggZXJyb3JcIilcclxuXHJcblx0XHRcdFx0XHRsZXQgW2ZpcnN0U3RhdGVtZW50XT1wYXJzZWRDb2RlLmJvZHlcclxuXHRcdFx0XHRcdHN3aXRjaChmaXJzdFN0YXRlbWVudC50eXBlKXtcclxuXHRcdFx0XHRcdGNhc2UgJ0ZvclN0YXRlbWVudCc6XHJcblx0XHRcdFx0XHRcdHJldHVybiBuZXcgRm9yKHdYbWwsZG9jLHBhcmVudCwgcGFyc2VkQ29kZSlcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRjYXNlICdJZlN0YXRlbWVudCc6XHJcblx0XHRcdFx0XHRcdHJldHVybiBuZXcgSWYod1htbCxkb2MscGFyZW50LCBwYXJzZWRDb2RlKVxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9Y2F0Y2goZSl7XHJcblx0XHRcdFx0XHQvL2NvbnNvbGUuZXJyb3IoYGVycm9yICR7dGhpcy50eXBlfSBjb2RlOiR7dGhpcy5jb2RlfWApXHJcblx0XHRcdFx0XHQvL3Rocm93IGVcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGxldCBleHA9bnVsbDtcclxuXHRcdFx0XHRpZihleHA9aXNFeHAod1htbC50ZXh0Q29udGVudC50cmltKCkpKXtcclxuXHRcdFx0XHRcdHJldHVybiBuZXcgRXhwcmVzc2lvbih3WG1sLGRvYyxwYXJlbnQsZXNwcmltYS5wYXJzZShleHApKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0YnJlYWtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGV4dGVuZCh3WG1sKXtcclxuXHRcdGlmKHdYbWwubG9jYWxOYW1lPT0nZG9jdW1lbnQnKVxyXG5cdFx0XHRyZXR1cm4gbmV3IERvY3VtZW50KC4uLmFyZ3VtZW50cylcclxuXHR9XHJcbn0pXHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUZhY3RvcnkoKXtcclxuXHRsZXQgaWdub3JlPXt2aXNpdCgpe319XHJcblx0cmV0dXJuIGRvY3g0anMuY3JlYXRlVmlzaXRvckZhY3RvcnkoZnVuY3Rpb24od29yZE1vZGVsKXtcclxuXHRcdHN3aXRjaCh3b3JkTW9kZWwudHlwZSl7XHJcblx0XHRjYXNlICdkb2N1bWVudCc6XHJcblx0XHRjYXNlICd2YXJpYW50LmV4cCc6XHJcblx0XHRjYXNlICd2YXJpYW50LmZvcic6XHJcblx0XHRjYXNlICd2YXJpYW50LmlmJzpcclxuXHRcdFx0cmV0dXJuIHdvcmRNb2RlbFxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuIGlnbm9yZVxyXG5cdFx0fVxyXG5cdH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIHBhcnNlKGZpbGUpe1xyXG4gICAgICAgIHJldHVybiBkb2N4NGpzLmxvYWQoZmlsZSkudGhlbihkb2N4PT57XHJcblx0XHRcdHZhciBkb2N1bWVudD1kb2N4LnBhcnNlKGNyZWF0ZUZhY3RvcnkoKSlcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuXHRcdFx0XHRcdGFzc2VtYmxlKGRhdGEsdHJhbnNhY3Rpb25hbCl7XHJcblx0XHRcdFx0XHRcdHJldHVybiBkb2N1bWVudC5hc3NlbWJsZShkYXRhLHRyYW5zYWN0aW9uYWwpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0dmFyaWFudENoaWxkcmVuOiBkb2N1bWVudC52YXJpYW50Q2hpbGRyZW5cclxuXHRcdFx0XHR9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgYXNzZW1ibGUoZmlsZSxkYXRhKXtcclxuICAgICAgICByZXR1cm4gZG9jeDRqcy5sb2FkKGZpbGUpLnRoZW4oZG9jeD0+e1xyXG4gICAgICAgICAgICByZXR1cm4gZG9jeC5wYXJzZShjcmVhdGVGYWN0b3J5KCkpLmFzc2VtYmxlKGRhdGEsdHJ1ZSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiJdfQ==