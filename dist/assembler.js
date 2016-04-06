"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _docx4js = require("docx4js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Assembler = function (_Visitor) {
    _inherits(Assembler, _Visitor);

    function Assembler(srcModel, parentAssembler) {
        _classCallCheck(this, Assembler);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Assembler).apply(this, arguments));

        parentAssembler && (_this.assemblerDoc = parentAssembler.assemblerDoc);
        _this.wXml = _this.srcModel.wXml;
        return _this;
    }

    _createClass(Assembler, [{
        key: "visit",
        value: function visit() {
            _get(Object.getPrototypeOf(Assembler.prototype), "visit", this).apply(this, arguments);
            if (this.parse() === false) return false;
        }
        /**
         * find controls
         */

    }, {
        key: "parse",
        value: function parse() {}
    }, {
        key: "toString",
        value: function toString() {
            this.wXml.toString();
        }
    }]);

    return Assembler;
}(_docx4js.Visitor);

exports.default = Assembler;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9hc3NlbWJsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7OztJQUVxQjs7O0FBQ2pCLGFBRGlCLFNBQ2pCLENBQVksUUFBWixFQUFxQixlQUFyQixFQUFxQzs4QkFEcEIsV0FDb0I7OzJFQURwQix1QkFFSixZQUR3Qjs7QUFFakMsNEJBQW9CLE1BQUssWUFBTCxHQUFrQixnQkFBZ0IsWUFBaEIsQ0FBdEMsQ0FGaUM7QUFHakMsY0FBSyxJQUFMLEdBQVUsTUFBSyxRQUFMLENBQWMsSUFBZCxDQUh1Qjs7S0FBckM7O2lCQURpQjs7Z0NBT1Y7QUFDSCx1Q0FSYSxpREFRRSxVQUFmLENBREc7QUFFSCxnQkFBRyxLQUFLLEtBQUwsT0FBZSxLQUFmLEVBQ0MsT0FBTyxLQUFQLENBREo7Ozs7Ozs7O2dDQU1HOzs7bUNBSUc7QUFDTixpQkFBSyxJQUFMLENBQVUsUUFBVixHQURNOzs7O1dBbkJPIiwiZmlsZSI6ImFzc2VtYmxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VmlzaXRvcn0gZnJvbSBcImRvY3g0anNcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXNzZW1ibGVyIGV4dGVuZHMgVmlzaXRvcntcclxuICAgIGNvbnN0cnVjdG9yKHNyY01vZGVsLHBhcmVudEFzc2VtYmxlcil7XHJcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKVxyXG4gICAgICAgIHBhcmVudEFzc2VtYmxlciAmJiAodGhpcy5hc3NlbWJsZXJEb2M9cGFyZW50QXNzZW1ibGVyLmFzc2VtYmxlckRvYylcclxuICAgICAgICB0aGlzLndYbWw9dGhpcy5zcmNNb2RlbC53WG1sXHJcbiAgICB9XHJcblxyXG4gICAgdmlzaXQoKXtcclxuICAgICAgICBzdXBlci52aXNpdCguLi5hcmd1bWVudHMpXHJcbiAgICAgICAgaWYodGhpcy5wYXJzZSgpPT09ZmFsc2UpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBmaW5kIGNvbnRyb2xzXHJcbiAgICAgKi9cclxuICAgIHBhcnNlKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRvU3RyaW5nKCl7XHJcbiAgICAgICAgdGhpcy53WG1sLnRvU3RyaW5nKClcclxuICAgIH1cclxufVxyXG4iXX0=