"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _control = require("./control");

var _control2 = _interopRequireDefault(_control);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ControlFor = function (_Control) {
    _inherits(ControlFor, _Control);

    function ControlFor() {
        _classCallCheck(this, ControlFor);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ControlFor).apply(this, arguments));

        _this.condition = _this.srcModel.getTag();
        return _this;
    }

    _createClass(ControlFor, [{
        key: "assemble",
        value: function assemble() {
            new Function("m", this.condition + "{m._loop()}")(this);
            return false;
        }
    }, {
        key: "_loop",
        value: function _loop() {
            var wXml = this.srcModel.wXml;
            wXml.parentNode.appendChild(wXml.clone());
        }
    }], [{
        key: "test",
        value: function test(wordModel) {
            var tag = wordModel.getTag();
            return tag.substring(0, 4) === 'for(' && tag.charAt(tag.length - 1) == ')';
        }
    }]);

    return ControlFor;
}(_control2.default);

exports.default = ControlFor;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9jb250cm9sRm9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7O0FBQ2pCLGFBRGlCLFVBQ2pCLEdBQWE7OEJBREksWUFDSjs7MkVBREksd0JBRUosWUFEQTs7QUFFVCxjQUFLLFNBQUwsR0FBZSxNQUFLLFFBQUwsQ0FBYyxNQUFkLEVBQWYsQ0FGUzs7S0FBYjs7aUJBRGlCOzttQ0FNUDtBQUNOLGdCQUFLLFFBQUosQ0FBYSxHQUFiLEVBQW9CLEtBQUssU0FBTCxnQkFBcEIsQ0FBRCxDQUFtRCxJQUFuRCxFQURNO0FBRU4sbUJBQU8sS0FBUCxDQUZNOzs7O2dDQUtIO0FBQ0gsZ0JBQUksT0FBSyxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBRE47QUFFSCxpQkFBSyxVQUFMLENBQWdCLFdBQWhCLENBQTRCLEtBQUssS0FBTCxFQUE1QixFQUZHOzs7OzZCQUtLLFdBQVU7QUFDbEIsZ0JBQUksTUFBSSxVQUFVLE1BQVYsRUFBSixDQURjO0FBRWxCLG1CQUFPLElBQUksU0FBSixDQUFjLENBQWQsRUFBZ0IsQ0FBaEIsTUFBcUIsTUFBckIsSUFBK0IsSUFBSSxNQUFKLENBQVcsSUFBSSxNQUFKLEdBQVcsQ0FBWCxDQUFYLElBQTBCLEdBQTFCLENBRnBCOzs7O1dBaEJMIiwiZmlsZSI6ImNvbnRyb2xGb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udHJvbCBmcm9tIFwiLi9jb250cm9sXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRyb2xGb3IgZXh0ZW5kcyBDb250cm9se1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXHJcbiAgICAgICAgdGhpcy5jb25kaXRpb249dGhpcy5zcmNNb2RlbC5nZXRUYWcoKVxyXG4gICAgfVxyXG5cclxuICAgIGFzc2VtYmxlKCl7XHJcbiAgICAgICAgKG5ldyBGdW5jdGlvbihcIm1cIixgJHt0aGlzLmNvbmRpdGlvbn17bS5fbG9vcCgpfWApKSh0aGlzKVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIF9sb29wKCl7XHJcbiAgICAgICAgbGV0IHdYbWw9dGhpcy5zcmNNb2RlbC53WG1sO1xyXG4gICAgICAgIHdYbWwucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCh3WG1sLmNsb25lKCkpXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHRlc3Qod29yZE1vZGVsKXtcclxuICAgICAgICB2YXIgdGFnPXdvcmRNb2RlbC5nZXRUYWcoKVxyXG4gICAgICAgIHJldHVybiB0YWcuc3Vic3RyaW5nKDAsNCk9PT0nZm9yKCcgJiYgdGFnLmNoYXJBdCh0YWcubGVuZ3RoLTEpPT0nKSdcclxuICAgIH1cclxufVxyXG4iXX0=