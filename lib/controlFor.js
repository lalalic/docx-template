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

var ControlFor = function (_Control) {
    _inherits(ControlFor, _Control);

    function ControlFor() {
        _classCallCheck(this, ControlFor);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ControlFor).apply(this, arguments));
    }

    _createClass(ControlFor, [{
        key: 'assemble',
        value: function assemble() {}
    }], [{
        key: 'test',
        value: function test(wordModel) {
            var tag = wordModel.getTag();
            return tag.substring(0, 4) === 'for(' && tag.charAt(tag.length - 1) == ')';
        }
    }]);

    return ControlFor;
}(_control2.default);

exports.default = ControlFor;
//# sourceMappingURL=C:\work\workspace\docx-hub\map\controlFor.js.map