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
        key: "resolve",
        value: function resolve() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9jb250cm9sRm9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7O0FBQ2pCLGFBRGlCLFVBQ2pCLEdBQWE7OEJBREksWUFDSjs7MkVBREksd0JBRUosWUFEQTs7QUFFVCxjQUFLLFNBQUwsR0FBZSxNQUFLLFFBQUwsQ0FBYyxNQUFkLEVBQWYsQ0FGUzs7S0FBYjs7aUJBRGlCOztrQ0FNUjtBQUNMLGdCQUFLLFFBQUosQ0FBYSxHQUFiLEVBQW9CLEtBQUssU0FBTCxnQkFBcEIsQ0FBRCxDQUFtRCxJQUFuRCxFQURLO0FBRUwsbUJBQU8sS0FBUCxDQUZLOzs7O2dDQUtGO0FBQ0gsZ0JBQUksT0FBSyxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBRE47QUFFSCxpQkFBSyxVQUFMLENBQWdCLFdBQWhCLENBQTRCLEtBQUssS0FBTCxFQUE1QixFQUZHOzs7OzZCQUtLLFdBQVU7QUFDbEIsZ0JBQUksTUFBSSxVQUFVLE1BQVYsRUFBSixDQURjO0FBRWxCLG1CQUFPLElBQUksU0FBSixDQUFjLENBQWQsRUFBZ0IsQ0FBaEIsTUFBcUIsTUFBckIsSUFBK0IsSUFBSSxNQUFKLENBQVcsSUFBSSxNQUFKLEdBQVcsQ0FBWCxDQUFYLElBQTBCLEdBQTFCLENBRnBCOzs7O1dBaEJMIiwiZmlsZSI6ImNvbnRyb2xGb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udHJvbCBmcm9tIFwiLi9jb250cm9sXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRyb2xGb3IgZXh0ZW5kcyBDb250cm9se1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXHJcbiAgICAgICAgdGhpcy5jb25kaXRpb249dGhpcy5zcmNNb2RlbC5nZXRUYWcoKVxyXG4gICAgfVxyXG5cclxuICAgIHJlc29sdmUoKXtcclxuICAgICAgICAobmV3IEZ1bmN0aW9uKFwibVwiLGAke3RoaXMuY29uZGl0aW9ufXttLl9sb29wKCl9YCkpKHRoaXMpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgX2xvb3AoKXtcclxuICAgICAgICBsZXQgd1htbD10aGlzLnNyY01vZGVsLndYbWw7XHJcbiAgICAgICAgd1htbC5wYXJlbnROb2RlLmFwcGVuZENoaWxkKHdYbWwuY2xvbmUoKSlcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdGVzdCh3b3JkTW9kZWwpe1xyXG4gICAgICAgIHZhciB0YWc9d29yZE1vZGVsLmdldFRhZygpXHJcbiAgICAgICAgcmV0dXJuIHRhZy5zdWJzdHJpbmcoMCw0KT09PSdmb3IoJyAmJiB0YWcuY2hhckF0KHRhZy5sZW5ndGgtMSk9PScpJ1xyXG4gICAgfVxyXG59XHJcbiJdfQ==