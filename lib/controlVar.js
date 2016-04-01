'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _control = require('./control');

var _control2 = _interopRequireDefault(_control);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ControlVar = function (_Control) {
    _inherits(ControlVar, _Control);

    function ControlVar() {
        _classCallCheck(this, ControlVar);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ControlVar).apply(this, arguments));
    }

    _createClass(ControlVar, [{
        key: 'assemble',
        value: function assemble() {}
    }], [{
        key: 'test',
        value: function test(wordModel) {
            var text = wordModel.getText();
            return text.charAt(0) == '$' && text.charAt(1) == '{' && text.charAt(text.length - 1) == '}';
        }
    }]);

    return ControlVar;
}(_control2.default);

exports.default = ControlVar;
//# sourceMappingURL=C:\work\workspace\docx-hub\map\controlVar.js.map