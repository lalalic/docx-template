"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

var _variantDocx = require("./variantDocx");

var _variantDocx2 = _interopRequireDefault(_variantDocx);

var _assembler = require("./assembler");

var _assembler2 = _interopRequireDefault(_assembler);

var _controlIf = require("./controlIf");

var _controlIf2 = _interopRequireDefault(_controlIf);

var _controlFor = require("./controlFor");

var _controlFor2 = _interopRequireDefault(_controlFor);

var _controlVar = require("./controlVar");

var _controlVar2 = _interopRequireDefault(_controlVar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    createFactory: function createFactory() {
        return _docx4js2.default.createVisitorFactory(function (wordModel, parentAssembler) {
            if (wordModel.type === 'control.richtext') {
                if (_controlVar2.default.test(wordModel)) {
                    return new (Function.prototype.bind.apply(_controlVar2.default, [null].concat(Array.prototype.slice.call(arguments))))();
                } else if (_controlFor2.default.test(wordModel)) {
                    return new (Function.prototype.bind.apply(_controlFor2.default, [null].concat(Array.prototype.slice.call(arguments))))();
                } else if (_controlIf2.default.test(wordModel)) {
                    return new (Function.prototype.bind.apply(_controlIf2.default, [null].concat(Array.prototype.slice.call(arguments))))();
                }
            } else if (wordModel.type == 'document') return new (Function.prototype.bind.apply(Docx, [null].concat(Array.prototype.slice.call(arguments))))();

            return new (Function.prototype.bind.apply(_assembler2.default, [null].concat(Array.prototype.slice.call(arguments))))();
        });
    },
    parse: function parse(file) {
        var _this = this;

        return _docx4js2.default.load(file).then(function (docx) {
            return docx.parse(_this.createFactory());
        });
    },
    assemble: function assemble(file, data) {
        return this.parse(file).then(function (variantDocx) {
            return variantDocx.assemble(data);
        });
    }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztrQkFFZTtBQUNYLDRDQUFlO0FBQ1gsZUFBTyxrQkFBUSxvQkFBUixDQUE2QixVQUFTLFNBQVQsRUFBbUIsZUFBbkIsRUFBbUM7QUFDbkUsZ0JBQUcsVUFBVSxJQUFWLEtBQWlCLGtCQUFqQixFQUFvQztBQUNuQyxvQkFBRyxxQkFBVyxJQUFYLENBQWdCLFNBQWhCLENBQUgsRUFBOEI7QUFDMUIsNkhBQXlCLGVBQXpCLENBRDBCO2lCQUE5QixNQUVNLElBQUcscUJBQVcsSUFBWCxDQUFnQixTQUFoQixDQUFILEVBQThCO0FBQ2hDLDZIQUF5QixlQUF6QixDQURnQztpQkFBOUIsTUFFQSxJQUFHLG9CQUFVLElBQVYsQ0FBZSxTQUFmLENBQUgsRUFBNkI7QUFDL0IsNEhBQXdCLGVBQXhCLENBRCtCO2lCQUE3QjthQUxWLE1BUU0sSUFBRyxVQUFVLElBQVYsSUFBZ0IsVUFBaEIsRUFDTCwwQ0FBVywrQ0FBUSxlQUFuQixDQURFOztBQUdOLG9IQUF3QixlQUF4QixDQVptRTtTQUFuQyxDQUFwQyxDQURXO0tBREo7QUFrQlgsMEJBQU0sTUFBSzs7O0FBQ1AsZUFBTyxrQkFBUSxJQUFSLENBQWEsSUFBYixFQUFtQixJQUFuQixDQUF3QixnQkFBTTtBQUNqQyxtQkFBTyxLQUFLLEtBQUwsQ0FBVyxNQUFLLGFBQUwsRUFBWCxDQUFQLENBRGlDO1NBQU4sQ0FBL0IsQ0FETztLQWxCQTtBQXdCWCxnQ0FBUyxNQUFLLE1BQUs7QUFDZixlQUFPLEtBQUssS0FBTCxDQUFXLElBQVgsRUFBaUIsSUFBakIsQ0FBc0IsdUJBQWE7QUFDdEMsbUJBQU8sWUFBWSxRQUFaLENBQXFCLElBQXJCLENBQVAsQ0FEc0M7U0FBYixDQUE3QixDQURlO0tBeEJSIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERvY3g0anMgZnJvbSBcImRvY3g0anNcIlxyXG5pbXBvcnQgVmFyaWFudERvY3ggZnJvbSBcIi4vdmFyaWFudERvY3hcIlxyXG5pbXBvcnQgQXNzZW1ibGVyIGZyb20gXCIuL2Fzc2VtYmxlclwiXHJcbmltcG9ydCBDb250cm9sSWYgZnJvbSBcIi4vY29udHJvbElmXCJcclxuaW1wb3J0IENvbnRyb2xGb3IgZnJvbSBcIi4vY29udHJvbEZvclwiXHJcbmltcG9ydCBDb250cm9sVmFyIGZyb20gXCIuL2NvbnRyb2xWYXJcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY3JlYXRlRmFjdG9yeSgpe1xyXG4gICAgICAgIHJldHVybiBEb2N4NGpzLmNyZWF0ZVZpc2l0b3JGYWN0b3J5KGZ1bmN0aW9uKHdvcmRNb2RlbCxwYXJlbnRBc3NlbWJsZXIpe1xyXG4gICAgICAgICAgICBpZih3b3JkTW9kZWwudHlwZT09PSdjb250cm9sLnJpY2h0ZXh0Jyl7XHJcbiAgICAgICAgICAgICAgICBpZihDb250cm9sVmFyLnRlc3Qod29yZE1vZGVsKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb250cm9sVmFyKC4uLmFyZ3VtZW50cylcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKENvbnRyb2xGb3IudGVzdCh3b3JkTW9kZWwpKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbnRyb2xGb3IoLi4uYXJndW1lbnRzKVxyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoQ29udHJvbElmLnRlc3Qod29yZE1vZGVsKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb250cm9sSWYoLi4uYXJndW1lbnRzKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZSBpZih3b3JkTW9kZWwudHlwZT09J2RvY3VtZW50JylcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRG9jeCguLi5hcmd1bWVudHMpXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEFzc2VtYmxlciguLi5hcmd1bWVudHMpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgcGFyc2UoZmlsZSl7XHJcbiAgICAgICAgcmV0dXJuIERvY3g0anMubG9hZChmaWxlKS50aGVuKGRvY3g9PntcclxuICAgICAgICAgICAgcmV0dXJuIGRvY3gucGFyc2UodGhpcy5jcmVhdGVGYWN0b3J5KCkpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgYXNzZW1ibGUoZmlsZSxkYXRhKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZShmaWxlKS50aGVuKHZhcmlhbnREb2N4PT57XHJcbiAgICAgICAgICAgIHJldHVybiB2YXJpYW50RG9jeC5hc3NlbWJsZShkYXRhKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl19