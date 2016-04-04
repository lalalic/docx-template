"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _assembler = require("./assembler");

var _assembler2 = _interopRequireDefault(_assembler);

var Control = (function (_Assembler) {
    _inherits(Control, _Assembler);

    function Control() {
        _classCallCheck(this, Control);

        _get(Object.getPrototypeOf(Control.prototype), "constructor", this).apply(this, arguments);
        this.control = this.srcModel.getTag();
        this.wXml = this.srcModel.wXml.clone();
    }

    /**
     * don't override this if you don't know what you are doing, use resolve
     */

    _createClass(Control, [{
        key: "assemble",
        value: function assemble() {
            var _this = this;

            (function (raw) {
                _this.srcModel._getValidChildren = _this.getResolvingContent;
                try {
                    _this.resolve();
                } catch (e) {
                    console.error(e.message);
                } finally {
                    _this.srcModel._getValidChildren = raw;
                }
            })(this.srcModel._getValidChildren);
        }

        /**
         * inheried class should override this, instead of assemble
         */
    }, {
        key: "resolve",
        value: function resolve() {
            console.log("resolve variant");
        }
    }, {
        key: "getResolvingContent",
        value: function getResolvingContent() {
            return this.wXml.childNodes;
        }
    }, {
        key: "toString",
        value: function toString() {
            return (this.wXml || "").toString();
        }
    }]);

    return Control;
})(_assembler2["default"]);

exports["default"] = Control;
module.exports = exports["default"];
//# sourceMappingURL=control.js.map