"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

var _document = require("./model/document");

var _document2 = _interopRequireDefault(_document);

var _var = require("./model/_var");

var _var2 = _interopRequireDefault(_var);

var _if = require("./model/_if");

var _if2 = _interopRequireDefault(_if);

var _for = require("./model/_for");

var _for2 = _interopRequireDefault(_for);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.assign(_docx4js2.default.factory, {
	extendControl: function extendControl(type, wXml, doc, parent) {
		if (type !== 'richtext') return;

		var tagEl = wXml.$1('>sdtPr>tag'),
		    tag = tagEl && tagEl.attr('w:val') || false;

		if (tag) {
			if (tag.substring(0, 4) === 'for(' && tag.charAt(tag.length - 1) == ')') {
				return new _for2.default(wXml, doc, parent, tag.substring(4, tag.length - 1));
			} else if (tag.substring(0, 3) === 'if(' && tag.charAt(tag.length - 1) == ')') {
				return new _if2.default(wXml, doc, parent, tag.substring(3, tag.length - 1));
			}
		} else {
			var text = wXml.textContent.trim();
			if (text.charAt(0) == '$' && text.charAt(1) == '{' && text.charAt(text.length - 1) == '}') return new _var2.default(wXml, doc, parent, text.substring(2, text.length - 1));
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
			case 'variant.var':
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
			return docx.parse(createFactory(data));
		});
	}
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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QVAsQ0FEaUM7R0FBTixDQUEvQixDQURlO0VBUFIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZG9jeDRqcyBmcm9tIFwiZG9jeDRqc1wiXHJcblxyXG5pbXBvcnQgRG9jdW1lbnQgZnJvbSBcIi4vbW9kZWwvZG9jdW1lbnRcIlxyXG5pbXBvcnQgVmFyaWFibGUgZnJvbSBcIi4vbW9kZWwvX3ZhclwiXHJcbmltcG9ydCBJZiBmcm9tIFwiLi9tb2RlbC9faWZcIlxyXG5pbXBvcnQgRm9yIGZyb20gXCIuL21vZGVsL19mb3JcIlxyXG5cclxuT2JqZWN0LmFzc2lnbihkb2N4NGpzLmZhY3Rvcnkse1xyXG5cdGV4dGVuZENvbnRyb2wodHlwZSx3WG1sLGRvYyxwYXJlbnQpe1xyXG5cdFx0aWYodHlwZSE9PSdyaWNodGV4dCcpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHRsZXQgdGFnRWw9d1htbC4kMSgnPnNkdFByPnRhZycpLFxyXG5cdFx0XHR0YWc9dGFnRWwgJiYgdGFnRWwuYXR0cigndzp2YWwnKSB8fCBmYWxzZVxyXG5cdFx0XHJcblx0XHRpZih0YWcpe1xyXG5cdFx0XHRpZih0YWcuc3Vic3RyaW5nKDAsIDQpID09PSAnZm9yKCcgJiYgdGFnLmNoYXJBdCh0YWcubGVuZ3RoIC0gMSkgPT0gJyknKXtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IEZvcih3WG1sLGRvYyxwYXJlbnQsdGFnLnN1YnN0cmluZyg0LHRhZy5sZW5ndGgtMSkpXHJcblx0XHRcdH1lbHNlIGlmKHRhZy5zdWJzdHJpbmcoMCwgMykgPT09ICdpZignICYmIHRhZy5jaGFyQXQodGFnLmxlbmd0aCAtIDEpID09ICcpJyl7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBJZih3WG1sLGRvYyxwYXJlbnQsdGFnLnN1YnN0cmluZygzLHRhZy5sZW5ndGgtMSkpXHJcblx0XHRcdH1cclxuXHRcdH1lbHNle1xyXG5cdFx0XHRsZXQgdGV4dCA9IHdYbWwudGV4dENvbnRlbnQudHJpbSgpXHJcblx0XHRcdGlmKHRleHQuY2hhckF0KDApID09ICckJyAmJiB0ZXh0LmNoYXJBdCgxKSA9PSAneycgJiYgdGV4dC5jaGFyQXQodGV4dC5sZW5ndGggLSAxKSA9PSAnfScpXHJcblx0XHRcdFx0cmV0dXJuIG5ldyBWYXJpYWJsZSh3WG1sLGRvYyxwYXJlbnQsdGV4dC5zdWJzdHJpbmcoMix0ZXh0Lmxlbmd0aC0xKSlcclxuXHRcdH1cclxuXHR9LFxyXG5cdGV4dGVuZCh3WG1sKXtcclxuXHRcdGlmKHdYbWwubG9jYWxOYW1lPT0nZG9jdW1lbnQnKVxyXG5cdFx0XHRyZXR1cm4gbmV3IERvY3VtZW50KC4uLmFyZ3VtZW50cylcclxuXHR9XHJcbn0pXHJcblxyXG5mdW5jdGlvbiBjcmVhdGVGYWN0b3J5KGRhdGEpe1xyXG5cdGxldCBpZ25vcmU9e3Zpc2l0KCl7fX1cclxuXHRyZXR1cm4gZG9jeDRqcy5jcmVhdGVWaXNpdG9yRmFjdG9yeShmdW5jdGlvbih3b3JkTW9kZWwpe1xyXG5cdFx0c3dpdGNoKHdvcmRNb2RlbC50eXBlKXtcclxuXHRcdGNhc2UgJ2RvY3VtZW50JzpcclxuXHRcdFx0d29yZE1vZGVsLmRhdGE9ZGF0YVxyXG5cdFx0Y2FzZSAndmFyaWFudC52YXInOlxyXG5cdFx0Y2FzZSAndmFyaWFudC5mb3InOlxyXG5cdFx0Y2FzZSAndmFyaWFudC5pZic6XHJcblx0XHRcdHJldHVybiB3b3JkTW9kZWxcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdHJldHVybiBpZ25vcmVcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblx0XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIHBhcnNlKGZpbGUpe1xyXG4gICAgICAgIHJldHVybiBkb2N4NGpzLmxvYWQoZmlsZSkudGhlbihkb2N4PT57XHJcbiAgICAgICAgICAgIHJldHVybiBkb2N4LnBhcnNlKGNyZWF0ZUZhY3RvcnkoKSlcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3NlbWJsZShmaWxlLGRhdGEpe1xyXG4gICAgICAgIHJldHVybiBkb2N4NGpzLmxvYWQoZmlsZSkudGhlbihkb2N4PT57XHJcbiAgICAgICAgICAgIHJldHVybiBkb2N4LnBhcnNlKGNyZWF0ZUZhY3RvcnkoZGF0YSkpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=