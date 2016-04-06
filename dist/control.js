"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assembler = require("./assembler");

var _assembler2 = _interopRequireDefault(_assembler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = function (_Assembler) {
    _inherits(Control, _Assembler);

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
        key: "assemble",
        value: function assemble() {
            var _this2 = this;

            (function (raw) {
                _this2.srcModel._getValidChildren = _this2.getResolvingContent;
                try {
                    _this2.resolve();
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
}(_assembler2.default);

exports.default = Control;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9jb250cm9sLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7O0FBQ2pCLGFBRGlCLE9BQ2pCLEdBQWE7OEJBREksU0FDSjs7MkVBREkscUJBRUosWUFEQTs7QUFFVCxjQUFLLE9BQUwsR0FBYSxNQUFLLFFBQUwsQ0FBYyxNQUFkLEVBQWIsQ0FGUztBQUdULGNBQUssSUFBTCxHQUFVLE1BQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsS0FBbkIsRUFBVixDQUhTOztLQUFiOzs7Ozs7O2lCQURpQjs7bUNBVVA7OztBQUNOLGFBQUMsZUFBSztBQUNGLHVCQUFLLFFBQUwsQ0FBYyxpQkFBZCxHQUFnQyxPQUFLLG1CQUFMLENBRDlCO0FBRUYsb0JBQUc7QUFDQywyQkFBSyxPQUFMLEdBREQ7aUJBQUgsQ0FFQyxPQUFNLENBQU4sRUFBUTtBQUNMLDRCQUFRLEtBQVIsQ0FBYyxFQUFFLE9BQUYsQ0FBZCxDQURLO2lCQUFSLFNBRU87QUFDSiwyQkFBSyxRQUFMLENBQWMsaUJBQWQsR0FBZ0MsR0FBaEMsQ0FESTtpQkFKUjthQUZILENBQUQsQ0FTRyxLQUFLLFFBQUwsQ0FBYyxpQkFBZCxDQVRILENBRE07Ozs7Ozs7OztrQ0FnQkQ7QUFDTCxvQkFBUSxHQUFSLENBQVksaUJBQVosRUFESzs7Ozs4Q0FJWTtBQUNqQixtQkFBTyxLQUFLLElBQUwsQ0FBVSxVQUFWLENBRFU7Ozs7bUNBSVg7QUFDTixtQkFBTyxDQUFDLEtBQUssSUFBTCxJQUFXLEVBQVgsQ0FBRCxDQUFnQixRQUFoQixFQUFQLENBRE07Ozs7V0FsQ08iLCJmaWxlIjoiY29udHJvbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBc3NlbWJsZXIgZnJvbSBcIi4vYXNzZW1ibGVyXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRyb2wgZXh0ZW5kcyBBc3NlbWJsZXJ7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcclxuICAgICAgICB0aGlzLmNvbnRyb2w9dGhpcy5zcmNNb2RlbC5nZXRUYWcoKVxyXG4gICAgICAgIHRoaXMud1htbD10aGlzLnNyY01vZGVsLndYbWwuY2xvbmUoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZG9uJ3Qgb3ZlcnJpZGUgdGhpcyBpZiB5b3UgZG9uJ3Qga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcsIHVzZSByZXNvbHZlXHJcbiAgICAgKi9cclxuICAgIGFzc2VtYmxlKCl7XHJcbiAgICAgICAgKHJhdz0+e1xyXG4gICAgICAgICAgICB0aGlzLnNyY01vZGVsLl9nZXRWYWxpZENoaWxkcmVuPXRoaXMuZ2V0UmVzb2x2aW5nQ29udGVudFxyXG4gICAgICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc29sdmUoKVxyXG4gICAgICAgICAgICB9Y2F0Y2goZSl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUubWVzc2FnZSlcclxuICAgICAgICAgICAgfWZpbmFsbHl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNyY01vZGVsLl9nZXRWYWxpZENoaWxkcmVuPXJhd1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkodGhpcy5zcmNNb2RlbC5fZ2V0VmFsaWRDaGlsZHJlbilcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGluaGVyaWVkIGNsYXNzIHNob3VsZCBvdmVycmlkZSB0aGlzLCBpbnN0ZWFkIG9mIGFzc2VtYmxlXHJcbiAgICAgKi9cclxuICAgIHJlc29sdmUoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInJlc29sdmUgdmFyaWFudFwiKVxyXG4gICAgfVxyXG5cclxuICAgIGdldFJlc29sdmluZ0NvbnRlbnQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy53WG1sLmNoaWxkTm9kZXNcclxuICAgIH1cclxuXHJcbiAgICB0b1N0cmluZygpe1xyXG4gICAgICAgIHJldHVybiAodGhpcy53WG1sfHxcIlwiKS50b1N0cmluZygpXHJcbiAgICB9XHJcbn1cclxuIl19