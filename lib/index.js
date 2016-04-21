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
				if (text.charAt(0) == '$' && text.charAt(1) == '{' && text.charAt(text.length - 1) == '}') {
					var exp = text.substring(2, text.length - 1);
					return new _exp2.default(wXml, doc, parent, exp, _esprima2.default.parse(exp));
				}
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
//# sourceMappingURL=data:application/json;base64,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QixTQUFTLGVBQVQ7SUFKVixDQUZpQztHQUFOLENBQS9CLENBRE87RUFEQTtBQWFYLDZCQUFTLE1BQUssTUFBSztBQUNmLFNBQU8sa0JBQVEsSUFBUixDQUFhLElBQWIsRUFBbUIsSUFBbkIsQ0FBd0IsZ0JBQU07QUFDakMsVUFBTyxLQUFLLEtBQUwsQ0FBVyxlQUFYLEVBQTRCLFFBQTVCLENBQXFDLElBQXJDLEVBQTBDLElBQTFDLENBQVAsQ0FEaUM7R0FBTixDQUEvQixDQURlO0VBYlIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZG9jeDRqcyBmcm9tIFwiZG9jeDRqc1wiXHJcblxyXG5pbXBvcnQgRG9jdW1lbnQgZnJvbSBcIi4vbW9kZWwvZG9jdW1lbnRcIlxyXG5pbXBvcnQgRXhwcmVzc2lvbiBmcm9tIFwiLi9tb2RlbC9fZXhwXCJcclxuaW1wb3J0IElmIGZyb20gXCIuL21vZGVsL19pZlwiXHJcbmltcG9ydCBGb3IgZnJvbSBcIi4vbW9kZWwvX2ZvclwiXHJcbmltcG9ydCBlc3ByaW1hIGZyb20gXCJlc3ByaW1hXCJcclxuXHJcbk9iamVjdC5hc3NpZ24oZG9jeDRqcy5mYWN0b3J5LHtcclxuXHRleHRlbmRDb250cm9sKHR5cGUsd1htbCxkb2MscGFyZW50KXtcclxuXHRcdGlmKHR5cGUhPT0ncmljaHRleHQnKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0bGV0IHRhZ0VsPXdYbWwuJDEoJz5zZHRQcj50YWcnKSxcclxuXHRcdFx0dGFnPXRhZ0VsICYmIHRhZ0VsLmF0dHIoJ3c6dmFsJykgfHwgZmFsc2VcclxuXHJcblx0XHRpZih0YWcpe1xyXG5cdFx0XHR0cnl7XHJcblx0XHRcdFx0bGV0IHBhcnNlZENvZGU9ZXNwcmltYS5wYXJzZSh0YWcrJ3t9JylcclxuXHRcdFx0XHRsZXQgW2ZpcnN0U3RhdGVtZW50XT1wYXJzZWRDb2RlLmJvZHlcclxuXHRcdFx0XHRzd2l0Y2goZmlyc3RTdGF0ZW1lbnQudHlwZSl7XHJcblx0XHRcdFx0Y2FzZSAnRm9yU3RhdGVtZW50JzpcclxuXHRcdFx0XHRcdHJldHVybiBuZXcgRm9yKHdYbWwsZG9jLHBhcmVudCx0YWcuc3Vic3RyaW5nKDQsdGFnLmxlbmd0aC0xKSwgcGFyc2VkQ29kZSlcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdGNhc2UgJ0lmU3RhdGVtZW50JzpcclxuXHRcdFx0XHRcdHJldHVybiBuZXcgSWYod1htbCxkb2MscGFyZW50LHRhZy5zdWJzdHJpbmcoMyx0YWcubGVuZ3RoLTEpLCBwYXJzZWRDb2RlKVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9Y2F0Y2goZSl7XHJcblx0XHRcdFx0Ly9jb25zb2xlLmVycm9yKGBlcnJvciAke3RoaXMudHlwZX0gY29kZToke3RoaXMuY29kZX1gKVxyXG5cdFx0XHRcdC8vdGhyb3cgZVxyXG5cdFx0XHR9XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0bGV0IHRleHQgPSB3WG1sLnRleHRDb250ZW50LnRyaW0oKVxyXG5cdFx0XHRpZih0ZXh0LmNoYXJBdCgwKSA9PSAnJCcgJiYgdGV4dC5jaGFyQXQoMSkgPT0gJ3snICYmIHRleHQuY2hhckF0KHRleHQubGVuZ3RoIC0gMSkgPT0gJ30nKXtcclxuXHRcdFx0XHRsZXQgZXhwPXRleHQuc3Vic3RyaW5nKDIsdGV4dC5sZW5ndGgtMSlcclxuXHRcdFx0XHRyZXR1cm4gbmV3IEV4cHJlc3Npb24od1htbCxkb2MscGFyZW50LGV4cCwgZXNwcmltYS5wYXJzZShleHApKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHRleHRlbmQod1htbCl7XHJcblx0XHRpZih3WG1sLmxvY2FsTmFtZT09J2RvY3VtZW50JylcclxuXHRcdFx0cmV0dXJuIG5ldyBEb2N1bWVudCguLi5hcmd1bWVudHMpXHJcblx0fVxyXG59KVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBjcmVhdGVGYWN0b3J5KCl7XHJcblx0bGV0IGlnbm9yZT17dmlzaXQoKXt9fVxyXG5cdHJldHVybiBkb2N4NGpzLmNyZWF0ZVZpc2l0b3JGYWN0b3J5KGZ1bmN0aW9uKHdvcmRNb2RlbCl7XHJcblx0XHRzd2l0Y2god29yZE1vZGVsLnR5cGUpe1xyXG5cdFx0Y2FzZSAnZG9jdW1lbnQnOlxyXG5cdFx0Y2FzZSAndmFyaWFudC5leHAnOlxyXG5cdFx0Y2FzZSAndmFyaWFudC5mb3InOlxyXG5cdFx0Y2FzZSAndmFyaWFudC5pZic6XHJcblx0XHRcdHJldHVybiB3b3JkTW9kZWxcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdHJldHVybiBpZ25vcmVcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBwYXJzZShmaWxlKXtcclxuICAgICAgICByZXR1cm4gZG9jeDRqcy5sb2FkKGZpbGUpLnRoZW4oZG9jeD0+e1xyXG5cdFx0XHR2YXIgZG9jdW1lbnQ9ZG9jeC5wYXJzZShjcmVhdGVGYWN0b3J5KCkpXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcblx0XHRcdFx0XHRhc3NlbWJsZShkYXRhLHRyYW5zYWN0aW9uYWwpe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZG9jdW1lbnQuYXNzZW1ibGUoZGF0YSx0cmFuc2FjdGlvbmFsKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHZhcmlhbnRDaGlsZHJlbjogZG9jdW1lbnQudmFyaWFudENoaWxkcmVuXHJcblx0XHRcdFx0fVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGFzc2VtYmxlKGZpbGUsZGF0YSl7XHJcbiAgICAgICAgcmV0dXJuIGRvY3g0anMubG9hZChmaWxlKS50aGVuKGRvY3g9PntcclxuICAgICAgICAgICAgcmV0dXJuIGRvY3gucGFyc2UoY3JlYXRlRmFjdG9yeSgpKS5hc3NlbWJsZShkYXRhLHRydWUpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=