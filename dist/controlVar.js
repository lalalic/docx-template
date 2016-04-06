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

var ControlVar = function (_Control) {
    _inherits(ControlVar, _Control);

    function ControlVar() {
        _classCallCheck(this, ControlVar);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ControlVar).apply(this, arguments));

        var text = _this.srcModel.wXml.textContent.trim();
        _this.varName = text.substring(1, text.length - 2);
        return _this;
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
}(_control2.default);

exports.default = ControlVar;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9jb250cm9sVmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7O0FBQ2pCLGFBRGlCLFVBQ2pCLEdBQWE7OEJBREksWUFDSjs7MkVBREksd0JBRUosWUFEQTs7QUFFVCxZQUFJLE9BQUssTUFBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixXQUFuQixDQUErQixJQUEvQixFQUFMLENBRks7QUFHVCxjQUFLLE9BQUwsR0FBYSxLQUFLLFNBQUwsQ0FBZSxDQUFmLEVBQWlCLEtBQUssTUFBTCxHQUFZLENBQVosQ0FBOUIsQ0FIUzs7S0FBYjs7aUJBRGlCOztrQ0FPUjtBQUNMLGdCQUFJLFFBQU0sSUFBSyxRQUFKLENBQWEsRUFBYixjQUEwQixLQUFLLE9BQUwsQ0FBM0IsRUFBTixDQURDO0FBRUwsaUJBQUssWUFBTCxDQUFrQixNQUFsQixDQUF5QixLQUFLLE9BQUwsRUFBYSxLQUF0QyxFQUZLO0FBR0wsbUJBQU8sS0FBUDs7Ozs7Ozs7QUFISzs7OzZCQWVHLFdBQVU7QUFDbEIsZ0JBQUksT0FBSyxVQUFVLElBQVYsQ0FBZSxXQUFmLENBQTJCLElBQTNCLEVBQUwsQ0FEYztBQUVsQixtQkFBTyxLQUFLLE1BQUwsQ0FBWSxDQUFaLEtBQWdCLEdBQWhCLElBQXVCLEtBQUssTUFBTCxDQUFZLENBQVosS0FBZ0IsR0FBaEIsSUFBdUIsS0FBSyxNQUFMLENBQVksS0FBSyxNQUFMLEdBQVksQ0FBWixDQUFaLElBQTRCLEdBQTVCLENBRm5DOzs7O1dBdEJMIiwiZmlsZSI6ImNvbnRyb2xWYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udHJvbCBmcm9tIFwiLi9jb250cm9sXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRyb2xWYXIgZXh0ZW5kcyBDb250cm9se1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXHJcbiAgICAgICAgbGV0IHRleHQ9dGhpcy5zcmNNb2RlbC53WG1sLnRleHRDb250ZW50LnRyaW0oKVxyXG4gICAgICAgIHRoaXMudmFyTmFtZT10ZXh0LnN1YnN0cmluZygxLHRleHQubGVuZ3RoLTIpXHJcbiAgICB9XHJcblxyXG4gICAgcmVzb2x2ZSgpe1xyXG4gICAgICAgIGxldCB2YWx1ZT0obmV3IEZ1bmN0aW9uKFwiXCIsYHJldHVybiAke3RoaXMuY29udHJvbH1gKSkoKVxyXG4gICAgICAgIHRoaXMuYXNzZW1ibGVyRG9jLmFkZFZhcih0aGlzLnZhck5hbWUsdmFsdWUpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgLypcclxuICAgICAgICBsZXQgdHM9dGhpcy5zcmNNb2RlbC53WG1sLiQoJ3QnKVxyXG4gICAgICAgIHRzWzBdLnRleHRDb250ZW50PXZhbHVlXHJcbiAgICAgICAgZm9yKHZhciBpPTEsbGVuPXRzLmxlbmd0aDtpPGxlbjtpKyspXHJcbiAgICAgICAgICAgIHRzW2ldLnJlbW92ZSgpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgKi9cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICBzdGF0aWMgdGVzdCh3b3JkTW9kZWwpe1xyXG4gICAgICAgIHZhciB0ZXh0PXdvcmRNb2RlbC53WG1sLnRleHRDb250ZW50LnRyaW0oKVxyXG4gICAgICAgIHJldHVybiB0ZXh0LmNoYXJBdCgwKT09JyQnICYmIHRleHQuY2hhckF0KDEpPT0neycgJiYgdGV4dC5jaGFyQXQodGV4dC5sZW5ndGgtMSk9PSd9J1xyXG4gICAgfVxyXG59XHJcbiJdfQ==