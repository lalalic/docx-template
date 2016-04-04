"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _docx4jsParserOpenxmlDocument = require("docx4js/parser/openxml/document");

var Assembler = (function (_Visitor) {
    _inherits(Assembler, _Visitor);

    function Assembler(srcModel, parentAssembler) {
        _classCallCheck(this, Assembler);

        _get(Object.getPrototypeOf(Assembler.prototype), "constructor", this).apply(this, arguments);
        parentAssembler && (this.assemblerDoc = parentAssembler.assemblerDoc);
        this.wXml = this.srcModel.wXml;
    }

    _createClass(Assembler, [{
        key: "visit",
        value: function visit() {
            _get(Object.getPrototypeOf(Assembler.prototype), "visit", this).apply(this, arguments);
            if (this.assemble() === false) return false;
        }
    }, {
        key: "assemble",
        value: function assemble() {}
    }, {
        key: "toString",
        value: function toString() {
            this.wXml.toString();
        }
    }]);

    return Assembler;
})(_docx4jsParserOpenxmlDocument.Visitor);

exports["default"] = Assembler;
module.exports = exports["default"];
//# sourceMappingURL=assembler.js.map