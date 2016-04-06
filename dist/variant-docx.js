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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi92YXJpYW50LWRvY3guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7QUFDakIsYUFEaUIsSUFDakIsR0FBYTs4QkFESSxNQUNKOzsyRUFESSxrQkFFSixZQURBOztBQUVULGNBQUssWUFBTCxTQUZTOztLQUFiOztpQkFEaUI7OytCQU1WLE1BQUssT0FBTTtBQUNkLGlCQUFLLFFBQUwsQ0FBYyxJQUFkLElBQW9CLEtBQXBCLENBRGM7Ozs7aUNBSVQsS0FBSTtBQUNULGlCQUFLLFFBQUwsU0FBb0IsR0FBcEIsSUFBMkIsS0FBM0IsQ0FEUzs7Ozs4QkFJUCxLQUFJO0FBQ04saUJBQUssUUFBTCxTQUFvQixHQUFwQixJQUEyQixFQUEzQixDQURNO0FBRU4saUJBQUssUUFBTCxHQUFjLEtBQUssUUFBTCxTQUFvQixHQUFwQixDQUFkLENBRk07Ozs7K0JBS0gsS0FBSTtBQUNQLGlCQUFLLFFBQUwsVUFBcUIsR0FBckIsSUFBNEIsRUFBNUIsQ0FETztBQUVQLGlCQUFLLFFBQUwsR0FBYyxLQUFLLFFBQUwsVUFBcUIsR0FBckIsQ0FBZCxDQUZPOzs7O21DQUtEO0FBQ04saUJBQUssUUFBTCxHQUFjLEtBQUssSUFBTCxHQUFVLEVBQVYsQ0FEUjs7Ozs2QkFRTCxNQUFLO0FBQ04sZ0JBQUksT0FBSyxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBREg7QUFFTixnQkFBSSxNQUFJLEtBQUssR0FBTCxDQUFTLEtBQVQsRUFBSixDQUZFO0FBR04sZ0JBQUksSUFBSixDQUFTLEtBQUssSUFBTCxDQUFVLGdCQUFWLENBQVQsRUFBcUMsS0FBSyxRQUFMLEVBQXJDLEVBSE07QUFJTixnQkFBSSxPQUFLLElBQUksUUFBSixDQUFhLEVBQUMsTUFBSyxZQUFMLEVBQWQsQ0FBTCxDQUpFOzs7O2tDQU9EOzs7NEJBWEE7QUFDTCxtQkFBTyxLQUFLLElBQUwsQ0FERjs7OztXQTVCUSIsImZpbGUiOiJ2YXJpYW50LWRvY3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXNzZW1ibGVyIGZyb20gJy4vYXNzZW1ibGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N4IGV4dGVuZHMgQXNzZW1ibGVye1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcbiAgICAgICAgdGhpcy5hc3NlbWJsZXJEb2M9dGhpc1xuICAgIH1cblxuICAgIGFkZFZhcihuYW1lLHZhbHVlKXtcbiAgICAgICAgdGhpcy5fY3VycmVudFtuYW1lXT12YWx1ZVxuICAgIH1cblxuICAgIGlnbm9yZUlmKHRhZyl7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRbYGlmXyR7dGFnfWBdPWZhbHNlXG4gICAgfVxuXG4gICAgYWRkSWYodGFnKXtcbiAgICAgICAgdGhpcy5fY3VycmVudFtgaWZfJHt0YWd9YF09e31cbiAgICAgICAgdGhpcy5fY3VycmVudD10aGlzLl9jdXJyZW50W2BpZl8ke3RhZ31gXVxuICAgIH1cblxuICAgIGFkZEZvcih0YWcpe1xuICAgICAgICB0aGlzLl9jdXJyZW50W2Bmb3JfJHt0YWd9YF09e31cbiAgICAgICAgdGhpcy5fY3VycmVudD10aGlzLl9jdXJyZW50W2Bmb3JfJHt0YWd9YF1cbiAgICB9XG5cbiAgICBhc3NlbWJsZSgpe1xuICAgICAgICB0aGlzLl9jdXJyZW50PXRoaXMuX2FzdD17fVxuICAgIH1cblxuICAgIGdldCBhc3QoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FzdFxuICAgIH1cblxuICAgIHNhdmUobmFtZSl7XG4gICAgICAgIGxldCB3RG9jPXRoaXMuc3JjTW9kZWwud0RvY1xuICAgICAgICBsZXQgemlwPXdEb2MucmF3LmNsb25lKClcbiAgICAgICAgemlwLmZpbGUod0RvYy5yZWxzWydvZmZpY2VEb2N1bWVudCddLHRoaXMudG9TdHJpbmcoKSlcbiAgICAgICAgdmFyIGRhdGE9emlwLmdlbmVyYXRlKHt0eXBlOlwibm9kZWJ1ZmZlclwifSlcbiAgICB9XG5cbiAgICByZWxlYXNlKCl7XG5cbiAgICB9XG59XG4iXX0=