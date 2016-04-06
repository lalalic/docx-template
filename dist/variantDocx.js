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

        _this.assemblerDoc = _this;
        return _this;
    }

    _createClass(Docx, [{
        key: 'addVar',
        value: function addVar(name, value) {
            this._current[name] = value;
        }
    }, {
        key: 'ignoreIf',
        value: function ignoreIf(tag) {
            this._current['if_' + tag] = false;
        }
    }, {
        key: 'addIf',
        value: function addIf(tag) {
            this._current['if_' + tag] = {};
            this._current = this._current['if_' + tag];
        }
    }, {
        key: 'addFor',
        value: function addFor(tag) {
            this._current['for_' + tag] = {};
            this._current = this._current['for_' + tag];
        }
    }, {
        key: 'assemble',
        value: function assemble() {
            this._current = this._ast = {};
        }
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
    }, {
        key: 'ast',
        get: function get() {
            return this._ast;
        }
    }]);

    return Docx;
}(_assembler2.default);

exports.default = Docx;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi92YXJpYW50RG9jeC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUI7OztBQUNqQixhQURpQixJQUNqQixHQUFhOzhCQURJLE1BQ0o7OzJFQURJLGtCQUVKLFlBREE7O0FBRVQsY0FBSyxZQUFMLFNBRlM7O0tBQWI7O2lCQURpQjs7K0JBTVYsTUFBSyxPQUFNO0FBQ2QsaUJBQUssUUFBTCxDQUFjLElBQWQsSUFBb0IsS0FBcEIsQ0FEYzs7OztpQ0FJVCxLQUFJO0FBQ1QsaUJBQUssUUFBTCxTQUFvQixHQUFwQixJQUEyQixLQUEzQixDQURTOzs7OzhCQUlQLEtBQUk7QUFDTixpQkFBSyxRQUFMLFNBQW9CLEdBQXBCLElBQTJCLEVBQTNCLENBRE07QUFFTixpQkFBSyxRQUFMLEdBQWMsS0FBSyxRQUFMLFNBQW9CLEdBQXBCLENBQWQsQ0FGTTs7OzsrQkFLSCxLQUFJO0FBQ1AsaUJBQUssUUFBTCxVQUFxQixHQUFyQixJQUE0QixFQUE1QixDQURPO0FBRVAsaUJBQUssUUFBTCxHQUFjLEtBQUssUUFBTCxVQUFxQixHQUFyQixDQUFkLENBRk87Ozs7bUNBS0Q7QUFDTixpQkFBSyxRQUFMLEdBQWMsS0FBSyxJQUFMLEdBQVUsRUFBVixDQURSOzs7OzZCQVFMLE1BQUs7QUFDTixnQkFBSSxPQUFLLEtBQUssUUFBTCxDQUFjLElBQWQsQ0FESDtBQUVOLGdCQUFJLE1BQUksS0FBSyxHQUFMLENBQVMsS0FBVCxFQUFKLENBRkU7QUFHTixnQkFBSSxJQUFKLENBQVMsS0FBSyxJQUFMLENBQVUsZ0JBQVYsQ0FBVCxFQUFxQyxLQUFLLFFBQUwsRUFBckMsRUFITTtBQUlOLGdCQUFJLE9BQUssSUFBSSxRQUFKLENBQWEsRUFBQyxNQUFLLFlBQUwsRUFBZCxDQUFMLENBSkU7Ozs7a0NBT0Q7Ozs0QkFYQTtBQUNMLG1CQUFPLEtBQUssSUFBTCxDQURGOzs7O1dBNUJRIiwiZmlsZSI6InZhcmlhbnREb2N4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFzc2VtYmxlciBmcm9tICcuL2Fzc2VtYmxlcidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jeCBleHRlbmRzIEFzc2VtYmxlcntcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXG4gICAgICAgIHRoaXMuYXNzZW1ibGVyRG9jPXRoaXNcbiAgICB9XG5cbiAgICBhZGRWYXIobmFtZSx2YWx1ZSl7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRbbmFtZV09dmFsdWVcbiAgICB9XG5cbiAgICBpZ25vcmVJZih0YWcpe1xuICAgICAgICB0aGlzLl9jdXJyZW50W2BpZl8ke3RhZ31gXT1mYWxzZVxuICAgIH1cblxuICAgIGFkZElmKHRhZyl7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRbYGlmXyR7dGFnfWBdPXt9XG4gICAgICAgIHRoaXMuX2N1cnJlbnQ9dGhpcy5fY3VycmVudFtgaWZfJHt0YWd9YF1cbiAgICB9XG5cbiAgICBhZGRGb3IodGFnKXtcbiAgICAgICAgdGhpcy5fY3VycmVudFtgZm9yXyR7dGFnfWBdPXt9XG4gICAgICAgIHRoaXMuX2N1cnJlbnQ9dGhpcy5fY3VycmVudFtgZm9yXyR7dGFnfWBdXG4gICAgfVxuXG4gICAgYXNzZW1ibGUoKXtcbiAgICAgICAgdGhpcy5fY3VycmVudD10aGlzLl9hc3Q9e31cbiAgICB9XG5cbiAgICBnZXQgYXN0KCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9hc3RcbiAgICB9XG5cbiAgICBzYXZlKG5hbWUpe1xuICAgICAgICBsZXQgd0RvYz10aGlzLnNyY01vZGVsLndEb2NcbiAgICAgICAgbGV0IHppcD13RG9jLnJhdy5jbG9uZSgpXG4gICAgICAgIHppcC5maWxlKHdEb2MucmVsc1snb2ZmaWNlRG9jdW1lbnQnXSx0aGlzLnRvU3RyaW5nKCkpXG4gICAgICAgIHZhciBkYXRhPXppcC5nZW5lcmF0ZSh7dHlwZTpcIm5vZGVidWZmZXJcIn0pXG4gICAgfVxuXG4gICAgcmVsZWFzZSgpe1xuXG4gICAgfVxufVxuIl19