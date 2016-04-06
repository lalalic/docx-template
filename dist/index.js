"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

var _docx = require("./lib/docx");

var _docx2 = _interopRequireDefault(_docx);

var _assembler = require("./lib/assembler");

var _assembler2 = _interopRequireDefault(_assembler);

var _controlIf = require("./lib/controlIf");

var _controlIf2 = _interopRequireDefault(_controlIf);

var _controlFor = require("./lib/controlFor");

var _controlFor2 = _interopRequireDefault(_controlFor);

var _controlVar = require("./lib/controlVar");

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
            } else if (wordModel.type == 'document') return new (Function.prototype.bind.apply(_docx2.default, [null].concat(Array.prototype.slice.call(arguments))))();

            return new (Function.prototype.bind.apply(_assembler2.default, [null].concat(Array.prototype.slice.call(arguments))))();
        });
    },
    assemble: function assemble(file) {
        var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        return _docx4js2.default.load(file).then(function (docx) {
            //how to pass data
            return docx.parse(model.exports.createFactory());
        });
    }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztrQkFFZTtBQUNYLDRDQUFlO0FBQ1gsZUFBTyxrQkFBUSxvQkFBUixDQUE2QixVQUFTLFNBQVQsRUFBbUIsZUFBbkIsRUFBbUM7QUFDbkUsZ0JBQUcsVUFBVSxJQUFWLEtBQWlCLGtCQUFqQixFQUFvQztBQUNuQyxvQkFBRyxxQkFBVyxJQUFYLENBQWdCLFNBQWhCLENBQUgsRUFBOEI7QUFDMUIsNkhBQXlCLGVBQXpCLENBRDBCO2lCQUE5QixNQUVNLElBQUcscUJBQVcsSUFBWCxDQUFnQixTQUFoQixDQUFILEVBQThCO0FBQ2hDLDZIQUF5QixlQUF6QixDQURnQztpQkFBOUIsTUFFQSxJQUFHLG9CQUFVLElBQVYsQ0FBZSxTQUFmLENBQUgsRUFBNkI7QUFDL0IsNEhBQXdCLGVBQXhCLENBRCtCO2lCQUE3QjthQUxWLE1BUU0sSUFBRyxVQUFVLElBQVYsSUFBZ0IsVUFBaEIsRUFDTCxtR0FBbUIsZUFBbkIsQ0FERTs7QUFHTixvSEFBd0IsZUFBeEIsQ0FabUU7U0FBbkMsQ0FBcEMsQ0FEVztLQURKO0FBa0JYLGdDQUFTLE1BQWE7WUFBUiw2REFBSyxrQkFBRzs7QUFDbEIsZUFBTyxrQkFBUSxJQUFSLENBQWEsSUFBYixFQUFtQixJQUFuQixDQUF3QixVQUFTLElBQVQsRUFBYzs7QUFFckMsbUJBQU8sS0FBSyxLQUFMLENBQVcsTUFBTSxPQUFOLENBQWMsYUFBZCxFQUFYLENBQVAsQ0FGcUM7U0FBZCxDQUEvQixDQURrQjtLQWxCWCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEb2N4NGpzIGZyb20gXCJkb2N4NGpzXCJcclxuaW1wb3J0IERvY3ggZnJvbSBcIi4vbGliL2RvY3hcIlxyXG5pbXBvcnQgQXNzZW1ibGVyIGZyb20gXCIuL2xpYi9hc3NlbWJsZXJcIlxyXG5pbXBvcnQgQ29udHJvbElmIGZyb20gXCIuL2xpYi9jb250cm9sSWZcIlxyXG5pbXBvcnQgQ29udHJvbEZvciBmcm9tIFwiLi9saWIvY29udHJvbEZvclwiXHJcbmltcG9ydCBDb250cm9sVmFyIGZyb20gXCIuL2xpYi9jb250cm9sVmFyXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGNyZWF0ZUZhY3RvcnkoKXtcclxuICAgICAgICByZXR1cm4gRG9jeDRqcy5jcmVhdGVWaXNpdG9yRmFjdG9yeShmdW5jdGlvbih3b3JkTW9kZWwscGFyZW50QXNzZW1ibGVyKXtcclxuICAgICAgICAgICAgaWYod29yZE1vZGVsLnR5cGU9PT0nY29udHJvbC5yaWNodGV4dCcpe1xyXG4gICAgICAgICAgICAgICAgaWYoQ29udHJvbFZhci50ZXN0KHdvcmRNb2RlbCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29udHJvbFZhciguLi5hcmd1bWVudHMpXHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihDb250cm9sRm9yLnRlc3Qod29yZE1vZGVsKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb250cm9sRm9yKC4uLmFyZ3VtZW50cylcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKENvbnRyb2xJZi50ZXN0KHdvcmRNb2RlbCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29udHJvbElmKC4uLmFyZ3VtZW50cylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2UgaWYod29yZE1vZGVsLnR5cGU9PSdkb2N1bWVudCcpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERvY3goLi4uYXJndW1lbnRzKVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBc3NlbWJsZXIoLi4uYXJndW1lbnRzKVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGFzc2VtYmxlKGZpbGUsZGF0YT17fSl7XHJcbiAgICAgICAgcmV0dXJuIERvY3g0anMubG9hZChmaWxlKS50aGVuKGZ1bmN0aW9uKGRvY3gpe1xyXG5cdFx0XHQvL2hvdyB0byBwYXNzIGRhdGFcclxuICAgICAgICAgICAgICAgIHJldHVybiBkb2N4LnBhcnNlKG1vZGVsLmV4cG9ydHMuY3JlYXRlRmFjdG9yeSgpKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl19