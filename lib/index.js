"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

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

var _esprima = require("esprima");

var _esprima2 = _interopRequireDefault(_esprima);

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
//# sourceMappingURL=data:application/json;base64,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RXZCLFFBQU8sa0JBQVEsb0JBQVIsQ0FBNkIsVUFBUyxTQUFULEVBQW1CO0FBQ3RELFVBQU8sVUFBVSxJQUFWO0FBQ1AsUUFBSyxVQUFMLENBREE7QUFFQSxRQUFLLGFBQUwsQ0FGQTtBQUdBLFFBQUssYUFBTCxDQUhBO0FBSUEsUUFBSyxZQUFMO0FBQ0MsV0FBTyxTQUFQLENBREQ7QUFKQTtBQU9DLFdBQU8sTUFBUCxDQUREO0FBTkEsR0FEc0Q7RUFBbkIsQ0FBcEMsQ0FGdUI7Q0FBeEI7O2tCQWVlO0FBQ1gsdUJBQU0sTUFBSztBQUNQLFNBQU8sa0JBQVEsSUFBUixDQUFhLElBQWIsRUFBbUIsSUFBbkIsQ0FBd0IsZ0JBQU07QUFDMUMsT0FBSSxXQUFTLEtBQUssS0FBTCxDQUFXLGVBQVgsQ0FBVCxDQURzQztBQUVqQyxVQUFPO0FBQ2QsZ0NBQVMsTUFBSyxlQUFjO0FBQzNCLFlBQU8sU0FBUyxRQUFULENBQWtCLElBQWxCLEVBQXVCLGFBQXZCLENBQVAsQ0FEMkI7S0FEZDs7QUFJZCxxQkFBaUIsU0FBUyxlQUFUO0lBSlYsQ0FGaUM7R0FBTixDQUEvQixDQURPO0VBREE7QUFhWCw2QkFBUyxNQUFLLE1BQUs7QUFDZixTQUFPLGtCQUFRLElBQVIsQ0FBYSxJQUFiLEVBQW1CLElBQW5CLENBQXdCLGdCQUFNO0FBQ2pDLFVBQU8sS0FBSyxLQUFMLENBQVcsZUFBWCxFQUE0QixRQUE1QixDQUFxQyxJQUFyQyxFQUEwQyxJQUExQyxDQUFQLENBRGlDO0dBQU4sQ0FBL0IsQ0FEZTtFQWJSIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRvY3g0anMgZnJvbSBcImRvY3g0anNcIlxyXG5cclxuaW1wb3J0IERvY3VtZW50IGZyb20gXCIuL21vZGVsL2RvY3VtZW50XCJcclxuaW1wb3J0IEV4cHJlc3Npb24gZnJvbSBcIi4vbW9kZWwvX2V4cFwiXHJcbmltcG9ydCBJZiBmcm9tIFwiLi9tb2RlbC9faWZcIlxyXG5pbXBvcnQgRm9yIGZyb20gXCIuL21vZGVsL19mb3JcIlxyXG5pbXBvcnQgUGljdHVyZSBmcm9tIFwiLi9tb2RlbC9fcGljdHVyZVwiXHJcblxyXG5pbXBvcnQgZXNwcmltYSBmcm9tIFwiZXNwcmltYVwiXHJcblxyXG5mdW5jdGlvbiBpc0V4cCh0ZXh0KXtcclxuXHR0ZXh0PXRleHQudHJpbSgpXHJcblx0aWYodGV4dC5jaGFyQXQoMCkgPT0gJyQnICYmIHRleHQuY2hhckF0KDEpID09ICd7JyAmJiB0ZXh0LmNoYXJBdCh0ZXh0Lmxlbmd0aCAtIDEpID09ICd9Jyl7XHJcblx0XHR0ZXh0PXRleHQuc3Vic3RyaW5nKDIsdGV4dC5sZW5ndGgtMSkudHJpbSgpXHJcblx0XHRpZih0ZXh0Lmxlbmd0aClcclxuXHRcdFx0cmV0dXJuIHRleHRcclxuXHR9XHJcblx0cmV0dXJuIGZhbHNlXHJcbn1cclxuXHJcbk9iamVjdC5hc3NpZ24oZG9jeDRqcy5mYWN0b3J5LHtcclxuXHRleHRlbmRDb250cm9sKHR5cGUsd1htbCxkb2MscGFyZW50KXtcclxuXHRcdGxldCB0YWdFbD13WG1sLiQxKCc+c2R0UHI+dGFnJyksXHJcblx0XHRcdHRhZz10YWdFbCAmJiB0YWdFbC5hdHRyKCd3OnZhbCcpIHx8IGZhbHNlXHJcblx0XHRcdFxyXG5cdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0Y2FzZSBcInBpY3R1cmVcIjpcclxuXHRcdFx0bGV0IGV4cD1udWxsXHJcblx0XHRcdGlmKGV4cD1pc0V4cCh0YWcpKVxyXG5cdFx0XHRcdHJldHVybiBuZXcgUGljdHVyZSh3WG1sLGRvYyxwYXJlbnQsZXNwcmltYS5wYXJzZShleHApKVxyXG5cdFx0YnJlYWtcclxuXHRcdGNhc2UgXCJyaWNodGV4dFwiOlxyXG5cdFx0XHRpZih0YWcpe1xyXG5cdFx0XHRcdHRhZz10YWcudHJpbSgpXHJcblx0XHRcdFx0dHJ5e1xyXG5cdFx0XHRcdFx0bGV0IHBhcnNlZENvZGU9ZXNwcmltYS5wYXJzZSh0YWcrJ3t9JylcclxuXHRcdFx0XHRcdGlmKHBhcnNlZENvZGUuYm9keS5sZW5ndGg9PTIpLy9mb3IvaWYoKXt9e31cclxuXHRcdFx0XHRcdFx0cGFyc2VkQ29kZS5ib2R5LnBvcCgpXHJcblx0XHRcdFx0XHRlbHNlIGlmKHBhcnNlZENvZGUuYm9keS5sZW5ndGg+MSlcclxuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwic3ludGF4IGVycm9yXCIpXHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGxldCBbZmlyc3RTdGF0ZW1lbnRdPXBhcnNlZENvZGUuYm9keVxyXG5cdFx0XHRcdFx0c3dpdGNoKGZpcnN0U3RhdGVtZW50LnR5cGUpe1xyXG5cdFx0XHRcdFx0Y2FzZSAnRm9yU3RhdGVtZW50JzpcclxuXHRcdFx0XHRcdFx0cmV0dXJuIG5ldyBGb3Iod1htbCxkb2MscGFyZW50LCBwYXJzZWRDb2RlKVxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdGNhc2UgJ0lmU3RhdGVtZW50JzpcclxuXHRcdFx0XHRcdFx0cmV0dXJuIG5ldyBJZih3WG1sLGRvYyxwYXJlbnQsIHBhcnNlZENvZGUpXHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1jYXRjaChlKXtcclxuXHRcdFx0XHRcdC8vY29uc29sZS5lcnJvcihgZXJyb3IgJHt0aGlzLnR5cGV9IGNvZGU6JHt0aGlzLmNvZGV9YClcclxuXHRcdFx0XHRcdC8vdGhyb3cgZVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0bGV0IGV4cD1udWxsO1xyXG5cdFx0XHRcdGlmKGV4cD1pc0V4cCh3WG1sLnRleHRDb250ZW50LnRyaW0oKSkpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIG5ldyBFeHByZXNzaW9uKHdYbWwsZG9jLHBhcmVudCxlc3ByaW1hLnBhcnNlKGV4cCkpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRicmVha1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0ZXh0ZW5kKHdYbWwpe1xyXG5cdFx0aWYod1htbC5sb2NhbE5hbWU9PSdkb2N1bWVudCcpXHJcblx0XHRcdHJldHVybiBuZXcgRG9jdW1lbnQoLi4uYXJndW1lbnRzKVxyXG5cdH1cclxufSlcclxuXHJcblxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRmFjdG9yeSgpe1xyXG5cdGxldCBpZ25vcmU9e3Zpc2l0KCl7fX1cclxuXHRyZXR1cm4gZG9jeDRqcy5jcmVhdGVWaXNpdG9yRmFjdG9yeShmdW5jdGlvbih3b3JkTW9kZWwpe1xyXG5cdFx0c3dpdGNoKHdvcmRNb2RlbC50eXBlKXtcclxuXHRcdGNhc2UgJ2RvY3VtZW50JzpcclxuXHRcdGNhc2UgJ3ZhcmlhbnQuZXhwJzpcclxuXHRcdGNhc2UgJ3ZhcmlhbnQuZm9yJzpcclxuXHRcdGNhc2UgJ3ZhcmlhbnQuaWYnOlxyXG5cdFx0XHRyZXR1cm4gd29yZE1vZGVsXHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRyZXR1cm4gaWdub3JlXHJcblx0XHR9XHJcblx0fSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgcGFyc2UoZmlsZSl7XHJcbiAgICAgICAgcmV0dXJuIGRvY3g0anMubG9hZChmaWxlKS50aGVuKGRvY3g9PntcclxuXHRcdFx0dmFyIGRvY3VtZW50PWRvY3gucGFyc2UoY3JlYXRlRmFjdG9yeSgpKVxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG5cdFx0XHRcdFx0YXNzZW1ibGUoZGF0YSx0cmFuc2FjdGlvbmFsKXtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGRvY3VtZW50LmFzc2VtYmxlKGRhdGEsdHJhbnNhY3Rpb25hbClcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR2YXJpYW50Q2hpbGRyZW46IGRvY3VtZW50LnZhcmlhbnRDaGlsZHJlblxyXG5cdFx0XHRcdH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3NlbWJsZShmaWxlLGRhdGEpe1xyXG4gICAgICAgIHJldHVybiBkb2N4NGpzLmxvYWQoZmlsZSkudGhlbihkb2N4PT57XHJcbiAgICAgICAgICAgIHJldHVybiBkb2N4LnBhcnNlKGNyZWF0ZUZhY3RvcnkoKSkuYXNzZW1ibGUoZGF0YSx0cnVlKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl19