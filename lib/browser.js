"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

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
            }

            return new _assembler2.default();
        });
    },
    assemble: function assemble(file) {
        var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        return _docx4js2.default.load(file).then(function (docx) {
            return docx.parse(model.exports.createFactory());
        });
    }
};
//# sourceMappingURL=C:\work\workspace\docx-hub\map\browser.js.map