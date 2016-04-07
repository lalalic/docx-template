"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

var _variantDocx = require("./variantDocx");

var _variantDocx2 = _interopRequireDefault(_variantDocx);

var _parser = require("./parser");

var _parser2 = _interopRequireDefault(_parser);

var _controlIf = require("./controlIf");

var _controlIf2 = _interopRequireDefault(_controlIf);

var _controlFor = require("./controlFor");

var _controlFor2 = _interopRequireDefault(_controlFor);

var _controlVar = require("./controlVar");

var _controlVar2 = _interopRequireDefault(_controlVar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_docx4js2.default.factory.extendControl = function (type, wXml, doc, parent) {
	if (type !== 'richtext') return;

	var tagEl = wXml.$1('>sdtPr>tag'),
	    tag = tagEl && tagEl.attr('w:val') || false;

	if (tag) {
		if (_controlFor2.default.test(tag)) {
			return new _controlFor2.default(wXml, doc, parent);
		} else if (_controlIf2.default.test(tag)) {
			return new _controlIf2.default(wXml, doc, parent);
		}
	} else if (_controlVar2.default.test(wXml)) return new _controlVar2.default(wXml, doc, parent);
};

function createFactory() {
	var ignore = { visit: function visit(a) {
			return a;
		} };
	return _docx4js2.default.createVisitorFactory(function (wordModel, parentParser) {
		if (wordModel.type === 'control.richtext') {
			if (_controlVar2.default.test(wordModel)) {
				return new (Function.prototype.bind.apply(_controlVar2.default, [null].concat(Array.prototype.slice.call(arguments))))();
			} else if (_controlFor2.default.test(wordModel)) {
				return new (Function.prototype.bind.apply(_controlFor2.default, [null].concat(Array.prototype.slice.call(arguments))))();
			} else if (_controlIf2.default.test(wordModel)) {
				return new (Function.prototype.bind.apply(_controlIf2.default, [null].concat(Array.prototype.slice.call(arguments))))();
			}
		} else if (wordModel.type == 'document') return new (Function.prototype.bind.apply(_variantDocx2.default, [null].concat(Array.prototype.slice.call(arguments))))();

		return ignore;
	});
}

exports.default = {
	parse: function parse(file) {
		return _docx4js2.default.load(file).then(function (docx) {
			return docx.parse(createFactory());
		});
	},
	assemble: function assemble(file, data) {
		return this.parse(file).then(function (variantDocx) {
			return variantDocx.assemble(data);
		});
	}
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLGtCQUFRLE9BQVIsQ0FBZ0IsYUFBaEIsR0FBOEIsVUFBUyxJQUFULEVBQWMsSUFBZCxFQUFtQixHQUFuQixFQUF1QixNQUF2QixFQUE4QjtBQUMzRCxLQUFHLFNBQU8sVUFBUCxFQUNGLE9BREQ7O0FBR0EsS0FBSSxRQUFNLEtBQUssRUFBTCxDQUFRLFlBQVIsQ0FBTjtLQUNILE1BQUksU0FBUyxNQUFNLElBQU4sQ0FBVyxPQUFYLENBQVQsSUFBZ0MsS0FBaEMsQ0FMc0Q7O0FBTzNELEtBQUcsR0FBSCxFQUFPO0FBQ04sTUFBRyxxQkFBVyxJQUFYLENBQWdCLEdBQWhCLENBQUgsRUFBd0I7QUFDdkIsVUFBTyx5QkFBZSxJQUFmLEVBQW9CLEdBQXBCLEVBQXdCLE1BQXhCLENBQVAsQ0FEdUI7R0FBeEIsTUFFTSxJQUFHLG9CQUFVLElBQVYsQ0FBZSxHQUFmLENBQUgsRUFBdUI7QUFDNUIsVUFBTyx3QkFBYyxJQUFkLEVBQW1CLEdBQW5CLEVBQXVCLE1BQXZCLENBQVAsQ0FENEI7R0FBdkI7RUFIUCxNQU1NLElBQUcscUJBQVcsSUFBWCxDQUFnQixJQUFoQixDQUFILEVBQ0wsT0FBTyx5QkFBZSxJQUFmLEVBQW9CLEdBQXBCLEVBQXdCLE1BQXhCLENBQVAsQ0FESztDQWJ1Qjs7QUFrQjlCLFNBQVMsYUFBVCxHQUF3QjtBQUN2QixLQUFJLFNBQU8sRUFBQyxPQUFNO1VBQUc7R0FBSCxFQUFkLENBRG1CO0FBRXZCLFFBQU8sa0JBQVEsb0JBQVIsQ0FBNkIsVUFBUyxTQUFULEVBQW1CLFlBQW5CLEVBQWdDO0FBQ25FLE1BQUcsVUFBVSxJQUFWLEtBQWlCLGtCQUFqQixFQUFvQztBQUN0QyxPQUFHLHFCQUFXLElBQVgsQ0FBZ0IsU0FBaEIsQ0FBSCxFQUE4QjtBQUM3Qiw2R0FBeUIsZUFBekIsQ0FENkI7SUFBOUIsTUFFTSxJQUFHLHFCQUFXLElBQVgsQ0FBZ0IsU0FBaEIsQ0FBSCxFQUE4QjtBQUNuQyw2R0FBeUIsZUFBekIsQ0FEbUM7SUFBOUIsTUFFQSxJQUFHLG9CQUFVLElBQVYsQ0FBZSxTQUFmLENBQUgsRUFBNkI7QUFDbEMsNEdBQXdCLGVBQXhCLENBRGtDO0lBQTdCO0dBTFAsTUFRTSxJQUFHLFVBQVUsSUFBVixJQUFnQixVQUFoQixFQUNSLDBHQUEwQixlQUExQixDQURLOztBQUdOLFNBQU8sTUFBUCxDQVptRTtFQUFoQyxDQUFwQyxDQUZ1QjtDQUF4Qjs7a0JBa0JlO0FBQ1gsdUJBQU0sTUFBSztBQUNQLFNBQU8sa0JBQVEsSUFBUixDQUFhLElBQWIsRUFBbUIsSUFBbkIsQ0FBd0IsZ0JBQU07QUFDakMsVUFBTyxLQUFLLEtBQUwsQ0FBVyxlQUFYLENBQVAsQ0FEaUM7R0FBTixDQUEvQixDQURPO0VBREE7QUFPWCw2QkFBUyxNQUFLLE1BQUs7QUFDZixTQUFPLEtBQUssS0FBTCxDQUFXLElBQVgsRUFBaUIsSUFBakIsQ0FBc0IsdUJBQWE7QUFDdEMsVUFBTyxZQUFZLFFBQVosQ0FBcUIsSUFBckIsQ0FBUCxDQURzQztHQUFiLENBQTdCLENBRGU7RUFQUiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEb2N4NGpzIGZyb20gXCJkb2N4NGpzXCJcclxuaW1wb3J0IFZhcmlhbnREb2N4IGZyb20gXCIuL3ZhcmlhbnREb2N4XCJcclxuaW1wb3J0IFBhcnNlciBmcm9tIFwiLi9wYXJzZXJcIlxyXG5pbXBvcnQgQ29udHJvbElmIGZyb20gXCIuL2NvbnRyb2xJZlwiXHJcbmltcG9ydCBDb250cm9sRm9yIGZyb20gXCIuL2NvbnRyb2xGb3JcIlxyXG5pbXBvcnQgQ29udHJvbFZhciBmcm9tIFwiLi9jb250cm9sVmFyXCJcclxuXHJcbkRvY3g0anMuZmFjdG9yeS5leHRlbmRDb250cm9sPWZ1bmN0aW9uKHR5cGUsd1htbCxkb2MscGFyZW50KXtcclxuXHRpZih0eXBlIT09J3JpY2h0ZXh0JylcclxuXHRcdHJldHVybjtcclxuXHRcclxuXHRsZXQgdGFnRWw9d1htbC4kMSgnPnNkdFByPnRhZycpLFxyXG5cdFx0dGFnPXRhZ0VsICYmIHRhZ0VsLmF0dHIoJ3c6dmFsJykgfHwgZmFsc2VcclxuXHRcclxuXHRpZih0YWcpe1xyXG5cdFx0aWYoQ29udHJvbEZvci50ZXN0KHRhZykpe1xyXG5cdFx0XHRyZXR1cm4gbmV3IENvbnRyb2xGb3Iod1htbCxkb2MscGFyZW50KVxyXG5cdFx0fWVsc2UgaWYoQ29udHJvbElmLnRlc3QodGFnKSl7XHJcblx0XHRcdHJldHVybiBuZXcgQ29udHJvbElmKHdYbWwsZG9jLHBhcmVudClcclxuXHRcdH1cclxuXHR9ZWxzZSBpZihDb250cm9sVmFyLnRlc3Qod1htbCkpXHJcblx0XHRyZXR1cm4gbmV3IENvbnRyb2xWYXIod1htbCxkb2MscGFyZW50KVx0XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBjcmVhdGVGYWN0b3J5KCl7XHJcblx0bGV0IGlnbm9yZT17dmlzaXQ6YT0+YX1cclxuXHRyZXR1cm4gRG9jeDRqcy5jcmVhdGVWaXNpdG9yRmFjdG9yeShmdW5jdGlvbih3b3JkTW9kZWwscGFyZW50UGFyc2VyKXtcclxuXHRcdGlmKHdvcmRNb2RlbC50eXBlPT09J2NvbnRyb2wucmljaHRleHQnKXtcclxuXHRcdFx0aWYoQ29udHJvbFZhci50ZXN0KHdvcmRNb2RlbCkpe1xyXG5cdFx0XHRcdHJldHVybiBuZXcgQ29udHJvbFZhciguLi5hcmd1bWVudHMpXHJcblx0XHRcdH1lbHNlIGlmKENvbnRyb2xGb3IudGVzdCh3b3JkTW9kZWwpKXtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IENvbnRyb2xGb3IoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHR9ZWxzZSBpZihDb250cm9sSWYudGVzdCh3b3JkTW9kZWwpKXtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IENvbnRyb2xJZiguLi5hcmd1bWVudHMpXHJcblx0XHRcdH1cclxuXHRcdH1lbHNlIGlmKHdvcmRNb2RlbC50eXBlPT0nZG9jdW1lbnQnKVxyXG5cdFx0XHRyZXR1cm4gbmV3IFZhcmlhbnREb2N4KC4uLmFyZ3VtZW50cylcclxuXHJcblx0XHRyZXR1cm4gaWdub3JlXHJcblx0fSlcclxufVxyXG5cdFxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBwYXJzZShmaWxlKXtcclxuICAgICAgICByZXR1cm4gRG9jeDRqcy5sb2FkKGZpbGUpLnRoZW4oZG9jeD0+e1xyXG4gICAgICAgICAgICByZXR1cm4gZG9jeC5wYXJzZShjcmVhdGVGYWN0b3J5KCkpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgYXNzZW1ibGUoZmlsZSxkYXRhKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZShmaWxlKS50aGVuKHZhcmlhbnREb2N4PT57XHJcbiAgICAgICAgICAgIHJldHVybiB2YXJpYW50RG9jeC5hc3NlbWJsZShkYXRhKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl19