"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _control = require("./control");

var _control2 = _interopRequireDefault(_control);

var ControlVar = (function (_Control) {
    _inherits(ControlVar, _Control);

    function ControlVar() {
        _classCallCheck(this, ControlVar);

        _get(Object.getPrototypeOf(ControlVar.prototype), "constructor", this).apply(this, arguments);
        var text = this.srcModel.wXml.textContent.trim();
        this.varName = text.substring(1, text.length - 2);
    }

    _createClass(ControlVar, [{
        key: "resolve",
        value: function resolve() {
            var value = new Function("", "return " + this.control)();
            this.assemblerDoc.addVar(this.varName, value);
            return false;
            /*
            let ts=this.srcModel.wXml.$('t')
            ts[0].textContent=value
            for(var i=1,len=ts.length;i<len;i++)
                ts[i].remove()
            return false
            */
        }
    }], [{
        key: "test",
        value: function test(wordModel) {
            var text = wordModel.wXml.textContent.trim();
            return text.charAt(0) == '$' && text.charAt(1) == '{' && text.charAt(text.length - 1) == '}';
        }
    }]);

    return ControlVar;
})(_control2["default"]);

exports["default"] = ControlVar;
module.exports = exports["default"];
//# sourceMappingURL=controlVar.js.map