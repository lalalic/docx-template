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

var Parser = function (_Visitor) {
    _inherits(Parser, _Visitor);

    function Parser(srcModel, parentParser) {
        _classCallCheck(this, Parser);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Parser).apply(this, arguments));

        parentParser && (_this.parserDoc = parentParser.parserDoc);
        _this._children = [];
        return _this;
    }

    _createClass(Parser, [{
        key: "visit",
        value: function visit() {
            _get(Object.getPrototypeOf(Parser.prototype), "visit", this).apply(this, arguments);
            return this.parse();
        }
        /**
         * find controls
         */

    }, {
        key: "parse",
        value: function parse() {}
    }, {
        key: "addChild",
        value: function addChild(child) {
            this._children.push(child);
            return child;
        }
    }, {
        key: "toString",
        value: function toString() {
            this.wXml.toString();
        }
    }]);

    return Parser;
}(_docx4js.Visitor);

exports.default = Parser;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wYXJzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7OztJQUVxQjs7O0FBQ2pCLGFBRGlCLE1BQ2pCLENBQVksUUFBWixFQUFxQixZQUFyQixFQUFrQzs4QkFEakIsUUFDaUI7OzJFQURqQixvQkFFSixZQURxQjs7QUFFOUIseUJBQWlCLE1BQUssU0FBTCxHQUFlLGFBQWEsU0FBYixDQUFoQyxDQUY4QjtBQUdwQyxjQUFLLFNBQUwsR0FBZSxFQUFmLENBSG9DOztLQUFsQzs7aUJBRGlCOztnQ0FPVjtBQUNILHVDQVJhLDhDQVFFLFVBQWYsQ0FERztBQUVILG1CQUFPLEtBQUssS0FBTCxFQUFQLENBRkc7Ozs7Ozs7O2dDQU9BOzs7aUNBSUQsT0FBTTtBQUNkLGlCQUFLLFNBQUwsQ0FBZSxJQUFmLENBQW9CLEtBQXBCLEVBRGM7QUFFZCxtQkFBTyxLQUFQLENBRmM7Ozs7bUNBS0Y7QUFDTixpQkFBSyxJQUFMLENBQVUsUUFBVixHQURNOzs7O1dBdkJPIiwiZmlsZSI6InBhcnNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VmlzaXRvcn0gZnJvbSBcImRvY3g0anNcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFyc2VyIGV4dGVuZHMgVmlzaXRvcntcclxuICAgIGNvbnN0cnVjdG9yKHNyY01vZGVsLHBhcmVudFBhcnNlcil7XHJcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKVxyXG4gICAgICAgIHBhcmVudFBhcnNlciAmJiAodGhpcy5wYXJzZXJEb2M9cGFyZW50UGFyc2VyLnBhcnNlckRvYylcclxuXHRcdHRoaXMuX2NoaWxkcmVuPVtdXHJcbiAgICB9XHJcblxyXG4gICAgdmlzaXQoKXtcclxuICAgICAgICBzdXBlci52aXNpdCguLi5hcmd1bWVudHMpXHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2UoKVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBmaW5kIGNvbnRyb2xzXHJcbiAgICAgKi9cclxuICAgIHBhcnNlKCl7XHJcblxyXG4gICAgfVxyXG5cdFxyXG5cdGFkZENoaWxkKGNoaWxkKXtcclxuXHRcdHRoaXMuX2NoaWxkcmVuLnB1c2goY2hpbGQpXHJcblx0XHRyZXR1cm4gY2hpbGRcclxuXHR9XHJcblxyXG4gICAgdG9TdHJpbmcoKXtcclxuICAgICAgICB0aGlzLndYbWwudG9TdHJpbmcoKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==