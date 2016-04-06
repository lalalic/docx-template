'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assembler = require('./assembler');

var _assembler2 = _interopRequireDefault(_assembler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Docx = function (_Assembler) {
    _inherits(Docx, _Assembler);

    function Docx() {
        _classCallCheck(this, Docx);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Docx).apply(this, arguments));

        _this.content = {};
        _this.assemblerDoc = _this;
        return _this;
    }

    _createClass(Docx, [{
        key: 'addVar',
        value: function addVar(name, value) {
            this.current[name] = value;
        }
    }, {
        key: 'ignoreIf',
        value: function ignoreIf(tag) {
            this.current['if_' + tag] = false;
        }
    }, {
        key: 'addIf',
        value: function addIf(tag) {
            this.current['if_' + tag] = {};
            this.current = this.current['if_' + tag];
        }
    }, {
        key: 'addFor',
        value: function addFor(tag) {
            this.current['for_' + tag] = {};
            this.current = this.current['for_' + tag];
        }
    }, {
        key: 'assemble',
        value: function assemble() {}
    }, {
        key: 'save',
        value: function save(name) {
            var wDoc = this.srcModel.wDoc;
            var zip = wDoc.raw.clone();
            zip.file(wDoc.rels['officeDocument'], this.toString());
            var data = zip.generate({ type: "nodebuffer" });
        }
    }, {
        key: 'release',
        value: function release() {}
    }]);

    return Docx;
}(_assembler2.default);

exports.default = Docx;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9kb2N4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7O0FBQ2pCLGFBRGlCLElBQ2pCLEdBQWE7OEJBREksTUFDSjs7MkVBREksa0JBRUosWUFEQTs7QUFFVCxjQUFLLE9BQUwsR0FBYSxFQUFiLENBRlM7QUFHVCxjQUFLLFlBQUwsU0FIUzs7S0FBYjs7aUJBRGlCOzsrQkFPVixNQUFLLE9BQU07QUFDZCxpQkFBSyxPQUFMLENBQWEsSUFBYixJQUFtQixLQUFuQixDQURjOzs7O2lDQUlULEtBQUk7QUFDVCxpQkFBSyxPQUFMLFNBQW1CLEdBQW5CLElBQTBCLEtBQTFCLENBRFM7Ozs7OEJBSVAsS0FBSTtBQUNOLGlCQUFLLE9BQUwsU0FBbUIsR0FBbkIsSUFBMEIsRUFBMUIsQ0FETTtBQUVOLGlCQUFLLE9BQUwsR0FBYSxLQUFLLE9BQUwsU0FBbUIsR0FBbkIsQ0FBYixDQUZNOzs7OytCQUtILEtBQUk7QUFDUCxpQkFBSyxPQUFMLFVBQW9CLEdBQXBCLElBQTJCLEVBQTNCLENBRE87QUFFUCxpQkFBSyxPQUFMLEdBQWEsS0FBSyxPQUFMLFVBQW9CLEdBQXBCLENBQWIsQ0FGTzs7OzttQ0FLRDs7OzZCQUlMLE1BQUs7QUFDTixnQkFBSSxPQUFLLEtBQUssUUFBTCxDQUFjLElBQWQsQ0FESDtBQUVOLGdCQUFJLE1BQUksS0FBSyxHQUFMLENBQVMsS0FBVCxFQUFKLENBRkU7QUFHTixnQkFBSSxJQUFKLENBQVMsS0FBSyxJQUFMLENBQVUsZ0JBQVYsQ0FBVCxFQUFxQyxLQUFLLFFBQUwsRUFBckMsRUFITTtBQUlOLGdCQUFJLE9BQUssSUFBSSxRQUFKLENBQWEsRUFBQyxNQUFLLFlBQUwsRUFBZCxDQUFMLENBSkU7Ozs7a0NBUUQ7OztXQXJDUSIsImZpbGUiOiJkb2N4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFzc2VtYmxlciBmcm9tICcuL2Fzc2VtYmxlcidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jeCBleHRlbmRzIEFzc2VtYmxlcntcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXG4gICAgICAgIHRoaXMuY29udGVudD17fVxuICAgICAgICB0aGlzLmFzc2VtYmxlckRvYz10aGlzXG4gICAgfVxuXG4gICAgYWRkVmFyKG5hbWUsdmFsdWUpe1xuICAgICAgICB0aGlzLmN1cnJlbnRbbmFtZV09dmFsdWVcbiAgICB9XG5cbiAgICBpZ25vcmVJZih0YWcpe1xuICAgICAgICB0aGlzLmN1cnJlbnRbYGlmXyR7dGFnfWBdPWZhbHNlXG4gICAgfVxuXG4gICAgYWRkSWYodGFnKXtcbiAgICAgICAgdGhpcy5jdXJyZW50W2BpZl8ke3RhZ31gXT17fVxuICAgICAgICB0aGlzLmN1cnJlbnQ9dGhpcy5jdXJyZW50W2BpZl8ke3RhZ31gXVxuICAgIH1cblxuICAgIGFkZEZvcih0YWcpe1xuICAgICAgICB0aGlzLmN1cnJlbnRbYGZvcl8ke3RhZ31gXT17fVxuICAgICAgICB0aGlzLmN1cnJlbnQ9dGhpcy5jdXJyZW50W2Bmb3JfJHt0YWd9YF1cbiAgICB9XG5cbiAgICBhc3NlbWJsZSgpe1xuXG4gICAgfVxuXG4gICAgc2F2ZShuYW1lKXtcbiAgICAgICAgbGV0IHdEb2M9dGhpcy5zcmNNb2RlbC53RG9jXG4gICAgICAgIGxldCB6aXA9d0RvYy5yYXcuY2xvbmUoKVxuICAgICAgICB6aXAuZmlsZSh3RG9jLnJlbHNbJ29mZmljZURvY3VtZW50J10sdGhpcy50b1N0cmluZygpKVxuICAgICAgICB2YXIgZGF0YT16aXAuZ2VuZXJhdGUoe3R5cGU6XCJub2RlYnVmZmVyXCJ9KVxuXG4gICAgfVxuXG4gICAgcmVsZWFzZSgpe1xuXG4gICAgfVxufVxuIl19