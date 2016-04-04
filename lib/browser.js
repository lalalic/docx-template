"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _bind = Function.prototype.bind;
var _slice = Array.prototype.slice;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

var _libDocx = require("./lib/docx");

var _libDocx2 = _interopRequireDefault(_libDocx);

var _libAssembler = require("./lib/assembler");

var _libAssembler2 = _interopRequireDefault(_libAssembler);

var _libControlIf = require("./lib/controlIf");

var _libControlIf2 = _interopRequireDefault(_libControlIf);

var _libControlFor = require("./lib/controlFor");

var _libControlFor2 = _interopRequireDefault(_libControlFor);

var _libControlVar = require("./lib/controlVar");

var _libControlVar2 = _interopRequireDefault(_libControlVar);

exports["default"] = {
    createFactory: function createFactory() {
        return _docx4js2["default"].createVisitorFactory(function (wordModel, parentAssembler) {
            if (wordModel.type === 'control.richtext') {
                if (_libControlVar2["default"].test(wordModel)) {
                    return new (_bind.apply(_libControlVar2["default"], [null].concat(_slice.call(arguments))))();
                } else if (_libControlFor2["default"].test(wordModel)) {
                    return new (_bind.apply(_libControlFor2["default"], [null].concat(_slice.call(arguments))))();
                } else if (_libControlIf2["default"].test(wordModel)) {
                    return new (_bind.apply(_libControlIf2["default"], [null].concat(_slice.call(arguments))))();
                }
            } else if (wordModel.type == 'document') return new (_bind.apply(_libDocx2["default"], [null].concat(_slice.call(arguments))))();

            return new (_bind.apply(_libAssembler2["default"], [null].concat(_slice.call(arguments))))();
        });
    },

    assemble: function assemble(file) {
        var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        return _docx4js2["default"].load(file).then(function (docx) {
            return docx.parse(model.exports.createFactory());
        });
    }
};
module.exports = exports["default"];
//# sourceMappingURL=browser.js.map