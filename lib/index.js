"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

var _document = require("./model/document");

var _document2 = _interopRequireDefault(_document);

var _exp = require("./model/_exp");

var _exp2 = _interopRequireDefault(_exp);

var _if = require("./model/_if");

var _if2 = _interopRequireDefault(_if);

var _for = require("./model/_for");

var _for2 = _interopRequireDefault(_for);

var _esprima = require("esprima");

var _esprima2 = _interopRequireDefault(_esprima);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.assign(_docx4js2.default.factory, {
	extendControl: function extendControl(type, wXml, doc, parent) {
		if (type !== 'richtext') return;

		var tagEl = wXml.$1('>sdtPr>tag'),
		    tag = tagEl && tagEl.attr('w:val') || false;

		if (tag) {
			try {
				var parsedCode = _esprima2.default.parse(tag + '{}');

				var _parsedCode$body = _slicedToArray(parsedCode.body, 1);

				var firstStatement = _parsedCode$body[0];

				switch (firstStatement.type) {
					case 'ForStatement':
						return new _for2.default(wXml, doc, parent, tag.substring(4, tag.length - 1), parsedCode);
						break;
					case 'IfStatement':
						return new _if2.default(wXml, doc, parent, tag.substring(3, tag.length - 1), parsedCode);
						break;
				}
			} catch (e) {
				//console.error(`error ${this.type} code:${this.code}`)
				//throw e
			}
		} else {
				var text = wXml.textContent.trim();
				if (text.charAt(0) == '$' && text.charAt(1) == '{' && text.charAt(text.length - 1) == '}') return new _exp2.default(wXml, doc, parent, text.substring(2, text.length - 1));
			}
	},
	extend: function extend(wXml) {
		if (wXml.localName == 'document') return new (Function.prototype.bind.apply(_document2.default, [null].concat(Array.prototype.slice.call(arguments))))();
	}
});

function createFactory(data) {
	var ignore = {
		visit: function visit() {}
	};
	return _docx4js2.default.createVisitorFactory(function (wordModel) {
		switch (wordModel.type) {
			case 'document':
				wordModel.data = data;
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
			return docx.parse(createFactory());
		});
	},
	assemble: function assemble(file, data) {
		return _docx4js2.default.load(file).then(function (docx) {
			return docx.parse(createFactory(data)).asStaticDocx();
		});
	}
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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QUFoQyxFQUFQLENBRGlDO0dBQU4sQ0FBL0IsQ0FEZTtFQVBSIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRvY3g0anMgZnJvbSBcImRvY3g0anNcIlxyXG5cclxuaW1wb3J0IERvY3VtZW50IGZyb20gXCIuL21vZGVsL2RvY3VtZW50XCJcclxuaW1wb3J0IEV4cHJlc3Npb24gZnJvbSBcIi4vbW9kZWwvX2V4cFwiXHJcbmltcG9ydCBJZiBmcm9tIFwiLi9tb2RlbC9faWZcIlxyXG5pbXBvcnQgRm9yIGZyb20gXCIuL21vZGVsL19mb3JcIlxyXG5pbXBvcnQgZXNwcmltYSBmcm9tIFwiZXNwcmltYVwiXHJcblxyXG5PYmplY3QuYXNzaWduKGRvY3g0anMuZmFjdG9yeSx7XHJcblx0ZXh0ZW5kQ29udHJvbCh0eXBlLHdYbWwsZG9jLHBhcmVudCl7XHJcblx0XHRpZih0eXBlIT09J3JpY2h0ZXh0JylcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdGxldCB0YWdFbD13WG1sLiQxKCc+c2R0UHI+dGFnJyksXHJcblx0XHRcdHRhZz10YWdFbCAmJiB0YWdFbC5hdHRyKCd3OnZhbCcpIHx8IGZhbHNlXHJcblxyXG5cdFx0aWYodGFnKXtcclxuXHRcdFx0dHJ5e1xyXG5cdFx0XHRcdGxldCBwYXJzZWRDb2RlPWVzcHJpbWEucGFyc2UodGFnKyd7fScpXHJcblx0XHRcdFx0bGV0IFtmaXJzdFN0YXRlbWVudF09cGFyc2VkQ29kZS5ib2R5XHJcblx0XHRcdFx0c3dpdGNoKGZpcnN0U3RhdGVtZW50LnR5cGUpe1xyXG5cdFx0XHRcdGNhc2UgJ0ZvclN0YXRlbWVudCc6XHJcblx0XHRcdFx0XHRyZXR1cm4gbmV3IEZvcih3WG1sLGRvYyxwYXJlbnQsdGFnLnN1YnN0cmluZyg0LHRhZy5sZW5ndGgtMSksIHBhcnNlZENvZGUpXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRjYXNlICdJZlN0YXRlbWVudCc6XHJcblx0XHRcdFx0XHRyZXR1cm4gbmV3IElmKHdYbWwsZG9jLHBhcmVudCx0YWcuc3Vic3RyaW5nKDMsdGFnLmxlbmd0aC0xKSwgcGFyc2VkQ29kZSlcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fWNhdGNoKGUpe1xyXG5cdFx0XHRcdC8vY29uc29sZS5lcnJvcihgZXJyb3IgJHt0aGlzLnR5cGV9IGNvZGU6JHt0aGlzLmNvZGV9YClcclxuXHRcdFx0XHQvL3Rocm93IGVcclxuXHRcdFx0fVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGxldCB0ZXh0ID0gd1htbC50ZXh0Q29udGVudC50cmltKClcclxuXHRcdFx0aWYodGV4dC5jaGFyQXQoMCkgPT0gJyQnICYmIHRleHQuY2hhckF0KDEpID09ICd7JyAmJiB0ZXh0LmNoYXJBdCh0ZXh0Lmxlbmd0aCAtIDEpID09ICd9JylcclxuXHRcdFx0XHRyZXR1cm4gbmV3IEV4cHJlc3Npb24od1htbCxkb2MscGFyZW50LHRleHQuc3Vic3RyaW5nKDIsdGV4dC5sZW5ndGgtMSkpXHJcblx0XHR9XHJcblx0fSxcclxuXHRleHRlbmQod1htbCl7XHJcblx0XHRpZih3WG1sLmxvY2FsTmFtZT09J2RvY3VtZW50JylcclxuXHRcdFx0cmV0dXJuIG5ldyBEb2N1bWVudCguLi5hcmd1bWVudHMpXHJcblx0fVxyXG59KVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBjcmVhdGVGYWN0b3J5KGRhdGEpe1xyXG5cdGxldCBpZ25vcmU9e3Zpc2l0KCl7fX1cclxuXHRyZXR1cm4gZG9jeDRqcy5jcmVhdGVWaXNpdG9yRmFjdG9yeShmdW5jdGlvbih3b3JkTW9kZWwpe1xyXG5cdFx0c3dpdGNoKHdvcmRNb2RlbC50eXBlKXtcclxuXHRcdGNhc2UgJ2RvY3VtZW50JzpcclxuXHRcdFx0d29yZE1vZGVsLmRhdGE9ZGF0YVxyXG5cdFx0Y2FzZSAndmFyaWFudC5leHAnOlxyXG5cdFx0Y2FzZSAndmFyaWFudC5mb3InOlxyXG5cdFx0Y2FzZSAndmFyaWFudC5pZic6XHJcblx0XHRcdHJldHVybiB3b3JkTW9kZWxcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdHJldHVybiBpZ25vcmVcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBwYXJzZShmaWxlKXtcclxuICAgICAgICByZXR1cm4gZG9jeDRqcy5sb2FkKGZpbGUpLnRoZW4oZG9jeD0+e1xyXG4gICAgICAgICAgICByZXR1cm4gZG9jeC5wYXJzZShjcmVhdGVGYWN0b3J5KCkpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgYXNzZW1ibGUoZmlsZSxkYXRhKXtcclxuICAgICAgICByZXR1cm4gZG9jeDRqcy5sb2FkKGZpbGUpLnRoZW4oZG9jeD0+e1xyXG4gICAgICAgICAgICByZXR1cm4gZG9jeC5wYXJzZShjcmVhdGVGYWN0b3J5KGRhdGEpKS5hc1N0YXRpY0RvY3goKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl19