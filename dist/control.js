"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parser = require("./parser");

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = function (_Parser) {
    _inherits(Control, _Parser);

    function Control() {
        _classCallCheck(this, Control);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Control).apply(this, arguments));

        _this.control = _this.srcModel.getTag();
        _this.wXml = _this.srcModel.wXml.clone();
        return _this;
    }

    /**
     * don't override this if you don't know what you are doing, use resolve
     */


    _createClass(Control, [{
        key: "parse",
        value: function parse() {
            var _this2 = this;

            (function (raw) {
                _this2.srcModel._getValidChildren = _this2.getResolvingContent;
                try {
                    return _this2.resolve();
                } catch (e) {
                    console.error(e.message);
                } finally {
                    _this2.srcModel._getValidChildren = raw;
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
}(_parser2.default);

exports.default = Control;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9jb250cm9sLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7O0FBQ2pCLGFBRGlCLE9BQ2pCLEdBQWE7OEJBREksU0FDSjs7MkVBREkscUJBRUosWUFEQTs7QUFFVCxjQUFLLE9BQUwsR0FBYSxNQUFLLFFBQUwsQ0FBYyxNQUFkLEVBQWIsQ0FGUztBQUdULGNBQUssSUFBTCxHQUFVLE1BQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsS0FBbkIsRUFBVixDQUhTOztLQUFiOzs7Ozs7O2lCQURpQjs7Z0NBVVY7OztBQUNILGFBQUMsZUFBSztBQUNGLHVCQUFLLFFBQUwsQ0FBYyxpQkFBZCxHQUFnQyxPQUFLLG1CQUFMLENBRDlCO0FBRUYsb0JBQUc7QUFDQywyQkFBTyxPQUFLLE9BQUwsRUFBUCxDQUREO2lCQUFILENBRUMsT0FBTSxDQUFOLEVBQVE7QUFDTCw0QkFBUSxLQUFSLENBQWMsRUFBRSxPQUFGLENBQWQsQ0FESztpQkFBUixTQUVPO0FBQ0osMkJBQUssUUFBTCxDQUFjLGlCQUFkLEdBQWdDLEdBQWhDLENBREk7aUJBSlI7YUFGSCxDQUFELENBU0csS0FBSyxRQUFMLENBQWMsaUJBQWQsQ0FUSCxDQURHOzs7Ozs7Ozs7a0NBZ0JFO0FBQ0wsb0JBQVEsR0FBUixDQUFZLGlCQUFaLEVBREs7Ozs7OENBSVk7QUFDakIsbUJBQU8sS0FBSyxJQUFMLENBQVUsVUFBVixDQURVOzs7O21DQUlYO0FBQ04sbUJBQU8sQ0FBQyxLQUFLLElBQUwsSUFBVyxFQUFYLENBQUQsQ0FBZ0IsUUFBaEIsRUFBUCxDQURNOzs7O1dBbENPIiwiZmlsZSI6ImNvbnRyb2wuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFyc2VyIGZyb20gXCIuL3BhcnNlclwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250cm9sIGV4dGVuZHMgUGFyc2Vye1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXHJcbiAgICAgICAgdGhpcy5jb250cm9sPXRoaXMuc3JjTW9kZWwuZ2V0VGFnKClcclxuICAgICAgICB0aGlzLndYbWw9dGhpcy5zcmNNb2RlbC53WG1sLmNsb25lKClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRvbid0IG92ZXJyaWRlIHRoaXMgaWYgeW91IGRvbid0IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nLCB1c2UgcmVzb2x2ZVxyXG4gICAgICovXHJcbiAgICBwYXJzZSgpe1xyXG4gICAgICAgIChyYXc9PntcclxuICAgICAgICAgICAgdGhpcy5zcmNNb2RlbC5fZ2V0VmFsaWRDaGlsZHJlbj10aGlzLmdldFJlc29sdmluZ0NvbnRlbnRcclxuICAgICAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVzb2x2ZSgpXHJcbiAgICAgICAgICAgIH1jYXRjaChlKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZS5tZXNzYWdlKVxyXG4gICAgICAgICAgICB9ZmluYWxseXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3JjTW9kZWwuX2dldFZhbGlkQ2hpbGRyZW49cmF3XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSh0aGlzLnNyY01vZGVsLl9nZXRWYWxpZENoaWxkcmVuKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaW5oZXJpZWQgY2xhc3Mgc2hvdWxkIG92ZXJyaWRlIHRoaXMsIGluc3RlYWQgb2YgYXNzZW1ibGVcclxuICAgICAqL1xyXG4gICAgcmVzb2x2ZSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVzb2x2ZSB2YXJpYW50XCIpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmVzb2x2aW5nQ29udGVudCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLndYbWwuY2hpbGROb2Rlc1xyXG4gICAgfVxyXG5cclxuICAgIHRvU3RyaW5nKCl7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLndYbWx8fFwiXCIpLnRvU3RyaW5nKClcclxuICAgIH1cclxufVxyXG4iXX0=