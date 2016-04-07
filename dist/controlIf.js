"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _control = require("./control");

var _control2 = _interopRequireDefault(_control);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ControlIf = function (_Control) {
    _inherits(ControlIf, _Control);

    function ControlIf() {
        _classCallCheck(this, ControlIf);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ControlIf).apply(this, arguments));
    }

    _createClass(ControlIf, [{
        key: "getResolvingContent",
        value: function getResolvingContent() {
            if (new Function("", this.control + " return true")() !== true) {
                this.parentParser.ignoreIf(this.srcModel.getTag());
                return [];
            } else {
                this.parentParser.addIf(this.srcModel.getTag());
                return _get(Object.getPrototypeOf(ControlIf.prototype), "getResolvingContent", this).call(this);
            }
        }
    }], [{
        key: "test",
        value: function test(wordModel) {
            var tag = wordModel.getTag();
            return tag.substring(0, 3) === 'if(' && tag.charAt(tag.length - 1) == ')';
        }
    }]);

    return ControlIf;
}(_control2.default);

exports.default = ControlIf;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9jb250cm9sSWYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzhDQUNJO0FBQ2pCLGdCQUFHLElBQUssUUFBSixDQUFhLEVBQWIsRUFBbUIsS0FBSyxPQUFMLGlCQUFuQixDQUFELE9BQXFELElBQXJELEVBQTBEO0FBQ3pELHFCQUFLLFlBQUwsQ0FBa0IsUUFBbEIsQ0FBMkIsS0FBSyxRQUFMLENBQWMsTUFBZCxFQUEzQixFQUR5RDtBQUV6RCx1QkFBTyxFQUFQLENBRnlEO2FBQTdELE1BR0s7QUFDRCxxQkFBSyxZQUFMLENBQWtCLEtBQWxCLENBQXdCLEtBQUssUUFBTCxDQUFjLE1BQWQsRUFBeEIsRUFEQztBQUVELGtEQVBTLDZEQU9ULENBRkM7YUFITDs7Ozs2QkFTUSxXQUFVO0FBQ2xCLGdCQUFJLE1BQUksVUFBVSxNQUFWLEVBQUosQ0FEYztBQUVsQixtQkFBTyxJQUFJLFNBQUosQ0FBYyxDQUFkLEVBQWdCLENBQWhCLE1BQXFCLEtBQXJCLElBQThCLElBQUksTUFBSixDQUFXLElBQUksTUFBSixHQUFXLENBQVgsQ0FBWCxJQUEwQixHQUExQixDQUZuQjs7OztXQVhMIiwiZmlsZSI6ImNvbnRyb2xJZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb250cm9sIGZyb20gXCIuL2NvbnRyb2xcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbElmIGV4dGVuZHMgQ29udHJvbHtcclxuICAgIGdldFJlc29sdmluZ0NvbnRlbnQoKXtcclxuICAgICAgICBpZigobmV3IEZ1bmN0aW9uKFwiXCIsYCR7dGhpcy5jb250cm9sfSByZXR1cm4gdHJ1ZWApKSgpIT09dHJ1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50UGFyc2VyLmlnbm9yZUlmKHRoaXMuc3JjTW9kZWwuZ2V0VGFnKCkpXHJcbiAgICAgICAgICAgIHJldHVybiBbXVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudFBhcnNlci5hZGRJZih0aGlzLnNyY01vZGVsLmdldFRhZygpKVxyXG4gICAgICAgICAgICByZXR1cm4gc3VwZXIuZ2V0UmVzb2x2aW5nQ29udGVudCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB0ZXN0KHdvcmRNb2RlbCl7XHJcbiAgICAgICAgdmFyIHRhZz13b3JkTW9kZWwuZ2V0VGFnKClcclxuICAgICAgICByZXR1cm4gdGFnLnN1YnN0cmluZygwLDMpPT09J2lmKCcgJiYgdGFnLmNoYXJBdCh0YWcubGVuZ3RoLTEpPT0nKSdcclxuICAgIH1cclxufVxyXG4iXX0=