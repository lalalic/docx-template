"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _variant = require("./variant");

var _variant2 = _interopRequireDefault(_variant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Subdoc = function (_Variant) {
    _inherits(Subdoc, _Variant);

    function Subdoc() {
        _classCallCheck(this, Subdoc);

        var _this = _possibleConstructorReturn(this, (Subdoc.__proto__ || Object.getPrototypeOf(Subdoc)).apply(this, arguments));

        var exp = _this.code;
        _this.code = esprima.parse(_this.id + ".assemble(this,$('" + _this.selector + "'))").body[0];
        _this.code.expression.arguments.push(exp);
        _this.code.expression.arguments.push(esprima.parse("__promises").body[0]);
        return _this;
    }

    _createClass(Subdoc, [{
        key: "assemble",
        value: function assemble(docx, node, value, promises) {
            if (value === null || value === undefined || value === '') {
                node.remove();
            } else {
                var p = fetch(value).then(function (data) {
                    return docx.officeDocument.addChunk(data);
                }).then(function (rId) {
                    return node.replaceWith("<w:altChunk r:id=\"" + rId + "\"/>");
                }).catch(function (e) {
                    console.error(e);
                    node.remove();
                });
                promises.push(p);
            }
        }
    }]);

    return Subdoc;
}(_variant2.default);

Subdoc.type = "variant.subdoc";
exports.default = Subdoc;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fc3ViZG9jLmpzIl0sIm5hbWVzIjpbIlN1YmRvYyIsImFyZ3VtZW50cyIsImV4cCIsImNvZGUiLCJlc3ByaW1hIiwicGFyc2UiLCJpZCIsInNlbGVjdG9yIiwiYm9keSIsImV4cHJlc3Npb24iLCJwdXNoIiwiZG9jeCIsIm5vZGUiLCJ2YWx1ZSIsInByb21pc2VzIiwidW5kZWZpbmVkIiwicmVtb3ZlIiwicCIsImZldGNoIiwidGhlbiIsIm9mZmljZURvY3VtZW50IiwiYWRkQ2h1bmsiLCJkYXRhIiwicmVwbGFjZVdpdGgiLCJySWQiLCJjYXRjaCIsImNvbnNvbGUiLCJlcnJvciIsImUiLCJ0eXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFHcUJBLE07OztBQUdqQixzQkFBYTtBQUFBOztBQUFBLHFIQUNOQyxTQURNOztBQUVmLFlBQUlDLE1BQUksTUFBS0MsSUFBYjtBQUNBLGNBQUtBLElBQUwsR0FBVUMsUUFBUUMsS0FBUixDQUFpQixNQUFLQyxFQUF0QiwwQkFBNkMsTUFBS0MsUUFBbEQsVUFBaUVDLElBQWpFLENBQXNFLENBQXRFLENBQVY7QUFDQSxjQUFLTCxJQUFMLENBQVVNLFVBQVYsQ0FBcUJSLFNBQXJCLENBQStCUyxJQUEvQixDQUFvQ1IsR0FBcEM7QUFDTSxjQUFLQyxJQUFMLENBQVVNLFVBQVYsQ0FBcUJSLFNBQXJCLENBQStCUyxJQUEvQixDQUFvQ04sUUFBUUMsS0FBUixDQUFjLFlBQWQsRUFBNEJHLElBQTVCLENBQWlDLENBQWpDLENBQXBDO0FBTFM7QUFNZjs7OztpQ0FFUUcsSSxFQUFNQyxJLEVBQU1DLEssRUFBT0MsUSxFQUFTO0FBQ3BDLGdCQUFHRCxVQUFRLElBQVIsSUFBZ0JBLFVBQVFFLFNBQXhCLElBQXFDRixVQUFRLEVBQWhELEVBQW1EO0FBQ2xERCxxQkFBS0ksTUFBTDtBQUNBLGFBRkQsTUFFSztBQUNLLG9CQUFJQyxJQUFFQyxNQUFNTCxLQUFOLEVBQ0RNLElBREMsQ0FDSTtBQUFBLDJCQUFNUixLQUFLUyxjQUFMLENBQW9CQyxRQUFwQixDQUE2QkMsSUFBN0IsQ0FBTjtBQUFBLGlCQURKLEVBRURILElBRkMsQ0FFSTtBQUFBLDJCQUFLUCxLQUFLVyxXQUFMLHlCQUFzQ0MsR0FBdEMsVUFBTDtBQUFBLGlCQUZKLEVBR0RDLEtBSEMsQ0FHSyxhQUFHO0FBQ05DLDRCQUFRQyxLQUFSLENBQWNDLENBQWQ7QUFDQWhCLHlCQUFLSSxNQUFMO0FBQ0gsaUJBTkMsQ0FBTjtBQU9BRix5QkFBU0osSUFBVCxDQUFjTyxDQUFkO0FBQ1Q7QUFDRDs7Ozs7O0FBeEJtQmpCLE0sQ0FDVjZCLEksR0FBSyxnQjtrQkFESzdCLE0iLCJmaWxlIjoiX3N1YmRvYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWYXJpYW50IGZyb20gXCIuL3ZhcmlhbnRcIlxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1YmRvYyBleHRlbmRzIFZhcmlhbnR7XG4gICAgc3RhdGljIHR5cGU9XCJ2YXJpYW50LnN1YmRvY1wiXG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHRsZXQgZXhwPXRoaXMuY29kZVxuXHRcdHRoaXMuY29kZT1lc3ByaW1hLnBhcnNlKGAke3RoaXMuaWR9LmFzc2VtYmxlKHRoaXMsJCgnJHt0aGlzLnNlbGVjdG9yfScpKWApLmJvZHlbMF1cblx0XHR0aGlzLmNvZGUuZXhwcmVzc2lvbi5hcmd1bWVudHMucHVzaChleHApXG4gICAgICAgIHRoaXMuY29kZS5leHByZXNzaW9uLmFyZ3VtZW50cy5wdXNoKGVzcHJpbWEucGFyc2UoXCJfX3Byb21pc2VzXCIpLmJvZHlbMF0pXG5cdH1cblxuXHRhc3NlbWJsZShkb2N4LCBub2RlLCB2YWx1ZSwgcHJvbWlzZXMpe1xuXHRcdGlmKHZhbHVlPT09bnVsbCB8fCB2YWx1ZT09PXVuZGVmaW5lZCB8fCB2YWx1ZT09PScnKXtcblx0XHRcdG5vZGUucmVtb3ZlKClcblx0XHR9ZWxzZXtcbiAgICAgICAgICAgIGxldCBwPWZldGNoKHZhbHVlKVxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGE9PmRvY3gub2ZmaWNlRG9jdW1lbnQuYWRkQ2h1bmsoZGF0YSkpXG4gICAgICAgICAgICAgICAgLnRoZW4ocklkPT5ub2RlLnJlcGxhY2VXaXRoKGA8dzphbHRDaHVuayByOmlkPVwiJHtySWR9XCIvPmApKVxuICAgICAgICAgICAgICAgIC5jYXRjaChlPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmUoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHApXG5cdFx0fVxuXHR9XG59XG4iXX0=