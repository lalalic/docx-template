"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lib = require("../../lib");

var _lib2 = _interopRequireDefault(_lib);

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

var _newDocx = require("./newDocx");

var _newDocx2 = _interopRequireDefault(_newDocx);

describe("docxhub", function () {
    it("can assemble with data", function () {
        _lib2["default"].assemble("", /*docx4js load file*/{} /*data*/).then(function (assembled) {
            assembled.save();
            assembled.release();
        });
    });

    it("can create factory for advanced usage", function () {
        var factory = _lib2["default"].createFactory();
        _docx4js2["default"].load("").then(function (docx) {
            var assembled = docx.parse(factory);
            assembled.save();
            assembled.release();
        });
    });
});
//# sourceMappingURL=hubSpec.js.map