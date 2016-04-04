"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _libControlIf = require("../../lib/controlIf");

var _libControlIf2 = _interopRequireDefault(_libControlIf);

var _libControlFor = require("../../lib/controlFor");

var _libControlFor2 = _interopRequireDefault(_libControlFor);

var _libControlVar = require("../../lib/controlVar");

var _libControlVar2 = _interopRequireDefault(_libControlVar);

var _newDocx = require("./newDocx");

var _newDocx2 = _interopRequireDefault(_newDocx);

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

describe("models", function () {
    describe("identification", function () {
        function identify(content, Model, done) {
            _docx4js2["default"].load((0, _newDocx2["default"])(content)).then(function (docx) {
                var a = { visit: function visit(a) {
                        return 1;
                    } },
                    found = false;
                docx.parse(_docx4js2["default"].createVisitorFactory(function (wordModel) {
                    if (wordModel.type == 'documentStyles') return null;
                    if (wordModel.type == 'control.richtext') if (Model.test(wordModel)) found = true;
                    return a;
                }));
                if (!found) fail();
                done();
            })["catch"](function (e) {
                return done(fail(e));
            });
        }

        it("can identify if control: if(.*)", function (done) {
            identify(contents['if'], _libControlIf2["default"], done);
        });

        it("can identify for control:for(var i=10;i>0;i--)", function (done) {
            identify(contents['for'], _libControlFor2["default"], done);
        });

        it("can identify variable control", function (done) {
            identify(contents['var'], _libControlVar2["default"], done);
        });
    });

    xdescribe("assembly", function () {
        function assemble(content, Model, data, done) {
            done();
        }
        it("if()", function (done) {
            assemble(contents['if'], _libControlIf2["default"], {}, done);
        });

        it("for()", function (done) {
            assemble(contents['for'], _libControlFor2["default"], {}, done);
        });

        it("${}", function (done) {
            assemble(contents['for'], _libControlVar2["default"], {}, done);
        });
    });

    var contents = {
        "if": "\n            <w:sdt>\n                <w:sdtPr>\n                    <w:alias w:val=\"a==1\"/>\n                    <w:tag w:val=\"if(a==1)\"/>\n                    <w:id w:val=\"922459404\"/>\n                    <w:placeholder>\n                        <w:docPart w:val=\"DefaultPlaceholder_1082065158\"/>\n                    </w:placeholder>\n                </w:sdtPr>\n                <w:sdtEndPr/>\n                <w:sdtContent>\n                    <w:p>\n                        <w:r>\n                            <w:t>hello.</w:t>\n                        </w:r>\n                    </w:p>\n                </w:sdtContent>\n            </w:sdt>",
        "for": "\n            <w:sdt>\n                <w:sdtPr>\n                    <w:alias w:val=\"loop 10 times\"/>\n                    <w:tag w:val=\"for(var i=10;i>0;i--)\"/>\n                    <w:id w:val=\"922459404\"/>\n                    <w:placeholder>\n                        <w:docPart w:val=\"DefaultPlaceholder_1082065158\"/>\n                    </w:placeholder>\n                </w:sdtPr>\n                <w:sdtEndPr/>\n                <w:sdtContent>\n                    <w:p>\n                        <w:r>\n                            <w:t>hello.</w:t>\n                        </w:r>\n                    </w:p>\n                </w:sdtContent>\n            </w:sdt>",
        "var": "\n            <w:sdt>\n                <w:sdtPr>\n                    <w:id w:val=\"922459404\"/>\n                    <w:placeholder>\n                        <w:docPart w:val=\"DefaultPlaceholder_1082065158\"/>\n                    </w:placeholder>\n                </w:sdtPr>\n                <w:sdtEndPr/>\n                <w:sdtContent>\n                    <w:p>\n                        <w:r>\n                            <w:t>" + "${name}" + "</w:t>\n                        </w:r>\n                    </w:p>\n                </w:sdtContent>\n            </w:sdt>"
    };
});
//# sourceMappingURL=modelSpec.js.map