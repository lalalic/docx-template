"use strict";

var _controlIf = require("../../lib/controlIf");

var _controlIf2 = _interopRequireDefault(_controlIf);

var _controlFor = require("../../lib/controlFor");

var _controlFor2 = _interopRequireDefault(_controlFor);

var _controlVar = require("../../lib/controlVar");

var _controlVar2 = _interopRequireDefault(_controlVar);

var _newDocx = require("./newDocx");

var _newDocx2 = _interopRequireDefault(_newDocx);

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function identify(content, Model, done) {
    _docx4js2.default.load((0, _newDocx2.default)(content)).then(function (docx) {
        docx.parse(_docx4js2.default.createVisistorFactory(function (wordModel) {
            if (wordModel.type == 'control.richtext') if (Model.test(wordModel)) done();
        }));
        fail();
        done();
    });
}

describe("identify models", function () {
    it("can identify if control: if(.*)", function (done) {
        identify("\n            <w:sdt>\n    \t\t\t<w:sdtPr>\n    \t\t\t\t<w:alias w:val=\"a==1\"/>\n    \t\t\t\t<w:tag w:val=\"if(a==1)\"/>\n    \t\t\t\t<w:id w:val=\"922459404\"/>\n    \t\t\t\t<w:placeholder>\n    \t\t\t\t\t<w:docPart w:val=\"DefaultPlaceholder_1082065158\"/>\n    \t\t\t\t</w:placeholder>\n    \t\t\t</w:sdtPr>\n    \t\t\t<w:sdtEndPr/>\n    \t\t\t<w:sdtContent>\n                    <w:p>\n    \t\t\t\t\t<w:r>\n    \t\t\t\t\t\t<w:t>hello.</w:t>\n    \t\t\t\t\t</w:r>\n    \t\t\t\t</w:p>\n                </w:sdtContent>\n    \t\t</w:sdt>", _controlIf2.default, done);
    });

    it("can identify for control:for(var i=10;i>0;i--)", function (done) {
        identify("\n            <w:sdt>\n    \t\t\t<w:sdtPr>\n    \t\t\t\t<w:alias w:val=\"loop 10 times\"/>\n    \t\t\t\t<w:tag w:val=\"for(var i=10;i>0;i--)\"/>\n    \t\t\t\t<w:id w:val=\"922459404\"/>\n    \t\t\t\t<w:placeholder>\n    \t\t\t\t\t<w:docPart w:val=\"DefaultPlaceholder_1082065158\"/>\n    \t\t\t\t</w:placeholder>\n    \t\t\t</w:sdtPr>\n    \t\t\t<w:sdtEndPr/>\n    \t\t\t<w:sdtContent>\n                    <w:p>\n    \t\t\t\t\t<w:r>\n    \t\t\t\t\t\t<w:t>hello.</w:t>\n    \t\t\t\t\t</w:r>\n    \t\t\t\t</w:p>\n                </w:sdtContent>\n    \t\t</w:sdt>", _controlFor2.default, done);
    });

    it("can identify variable control", function (done) {
        identify("\n            <w:sdt>\n    \t\t\t<w:sdtPr>\n    \t\t\t\t<w:id w:val=\"922459404\"/>\n    \t\t\t\t<w:placeholder>\n    \t\t\t\t\t<w:docPart w:val=\"DefaultPlaceholder_1082065158\"/>\n    \t\t\t\t</w:placeholder>\n    \t\t\t</w:sdtPr>\n    \t\t\t<w:sdtEndPr/>\n    \t\t\t<w:sdtContent>\n                    <w:p>\n    \t\t\t\t\t<w:r>\n    \t\t\t\t\t\t<w:t>" + name + "</w:t>\n    \t\t\t\t\t</w:r>\n    \t\t\t\t</w:p>\n                </w:sdtContent>\n    \t\t</w:sdt>", _controlVar2.default, done);
    });
});
//# sourceMappingURL=C:\work\workspace\docx-hub\spec\fixture\modelSpec.js.map