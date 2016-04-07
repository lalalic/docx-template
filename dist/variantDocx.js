'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

var _docx4js = require('docx4js');

var _docx4js2 = _interopRequireDefault(_docx4js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VariantDocx = function (_Parser) {
    _inherits(VariantDocx, _Parser);

    function VariantDocx() {
        _classCallCheck(this, VariantDocx);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VariantDocx).apply(this, arguments));

        _this.parserDoc = _this;
        return _this;
    }

    _createClass(VariantDocx, [{
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
        key: 'parse',
        value: function parse() {
            this._current = this._ast = {};
        }

        /**
        * @return: DocxDocument 
        */

    }, {
        key: 'assemble',
        value: function assemble(data) {}
    }, {
        key: 'release',
        value: function release() {}
    }]);

    return VariantDocx;
}(_parser2.default);

exports.default = VariantDocx;

var DocxDocument = function (_Docx4js) {
    _inherits(DocxDocument, _Docx4js);

    function DocxDocument() {
        _classCallCheck(this, DocxDocument);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DocxDocument).apply(this, arguments));
    }

    _createClass(DocxDocument, [{
        key: 'save',
        value: function save(name) {
            var wDoc = this.srcModel.wDoc;
            var zip = wDoc.raw.clone();
            zip.file(wDoc.rels['officeDocument'], this.toString());
            var data = zip.generate({ type: "nodebuffer" });
        }
    }]);

    return DocxDocument;
}(_docx4js2.default);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi92YXJpYW50RG9jeC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7O0FBQ2pCLGFBRGlCLFdBQ2pCLEdBQWE7OEJBREksYUFDSjs7MkVBREkseUJBRUosWUFEQTs7QUFFVCxjQUFLLFNBQUwsU0FGUzs7S0FBYjs7aUJBRGlCOzsrQkFNVixNQUFLLE9BQU07QUFDZCxpQkFBSyxRQUFMLENBQWMsSUFBZCxJQUFvQixLQUFwQixDQURjOzs7O2lDQUlULEtBQUk7QUFDVCxpQkFBSyxRQUFMLFNBQW9CLEdBQXBCLElBQTJCLEtBQTNCLENBRFM7Ozs7OEJBSVAsS0FBSTtBQUNOLGlCQUFLLFFBQUwsU0FBb0IsR0FBcEIsSUFBMkIsRUFBM0IsQ0FETTtBQUVOLGlCQUFLLFFBQUwsR0FBYyxLQUFLLFFBQUwsU0FBb0IsR0FBcEIsQ0FBZCxDQUZNOzs7OytCQUtILEtBQUk7QUFDUCxpQkFBSyxRQUFMLFVBQXFCLEdBQXJCLElBQTRCLEVBQTVCLENBRE87QUFFUCxpQkFBSyxRQUFMLEdBQWMsS0FBSyxRQUFMLFVBQXFCLEdBQXJCLENBQWQsQ0FGTzs7OztnQ0FLSjtBQUNILGlCQUFLLFFBQUwsR0FBYyxLQUFLLElBQUwsR0FBVSxFQUFWLENBRFg7Ozs7Ozs7OztpQ0FPRCxNQUFLOzs7a0NBSUY7OztXQW5DUTs7Ozs7SUF3Q2Y7Ozs7Ozs7Ozs7OzZCQUNHLE1BQUs7QUFDTixnQkFBSSxPQUFLLEtBQUssUUFBTCxDQUFjLElBQWQsQ0FESDtBQUVOLGdCQUFJLE1BQUksS0FBSyxHQUFMLENBQVMsS0FBVCxFQUFKLENBRkU7QUFHTixnQkFBSSxJQUFKLENBQVMsS0FBSyxJQUFMLENBQVUsZ0JBQVYsQ0FBVCxFQUFxQyxLQUFLLFFBQUwsRUFBckMsRUFITTtBQUlOLGdCQUFJLE9BQUssSUFBSSxRQUFKLENBQWEsRUFBQyxNQUFLLFlBQUwsRUFBZCxDQUFMLENBSkU7Ozs7V0FEUiIsImZpbGUiOiJ2YXJpYW50RG9jeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJzZXIgZnJvbSAnLi9wYXJzZXInXG5pbXBvcnQgRG9jeDRqcyBmcm9tIFwiZG9jeDRqc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhcmlhbnREb2N4IGV4dGVuZHMgUGFyc2Vye1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcbiAgICAgICAgdGhpcy5wYXJzZXJEb2M9dGhpc1xuICAgIH1cblxuICAgIGFkZFZhcihuYW1lLHZhbHVlKXtcbiAgICAgICAgdGhpcy5fY3VycmVudFtuYW1lXT12YWx1ZVxuICAgIH1cblxuICAgIGlnbm9yZUlmKHRhZyl7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRbYGlmXyR7dGFnfWBdPWZhbHNlXG4gICAgfVxuXG4gICAgYWRkSWYodGFnKXtcbiAgICAgICAgdGhpcy5fY3VycmVudFtgaWZfJHt0YWd9YF09e31cbiAgICAgICAgdGhpcy5fY3VycmVudD10aGlzLl9jdXJyZW50W2BpZl8ke3RhZ31gXVxuICAgIH1cblxuICAgIGFkZEZvcih0YWcpe1xuICAgICAgICB0aGlzLl9jdXJyZW50W2Bmb3JfJHt0YWd9YF09e31cbiAgICAgICAgdGhpcy5fY3VycmVudD10aGlzLl9jdXJyZW50W2Bmb3JfJHt0YWd9YF1cbiAgICB9XG5cbiAgICBwYXJzZSgpe1xuICAgICAgICB0aGlzLl9jdXJyZW50PXRoaXMuX2FzdD17fVxuICAgIH1cblx0XG5cdC8qKlxuXHQqIEByZXR1cm46IERvY3hEb2N1bWVudCBcblx0Ki9cblx0YXNzZW1ibGUoZGF0YSl7XG5cdFx0XG5cdH1cblxuICAgIHJlbGVhc2UoKXtcblxuICAgIH1cbn1cblxuY2xhc3MgRG9jeERvY3VtZW50IGV4dGVuZHMgRG9jeDRqc3tcbiAgICBzYXZlKG5hbWUpe1xuICAgICAgICBsZXQgd0RvYz10aGlzLnNyY01vZGVsLndEb2NcbiAgICAgICAgbGV0IHppcD13RG9jLnJhdy5jbG9uZSgpXG4gICAgICAgIHppcC5maWxlKHdEb2MucmVsc1snb2ZmaWNlRG9jdW1lbnQnXSx0aGlzLnRvU3RyaW5nKCkpXG4gICAgICAgIHZhciBkYXRhPXppcC5nZW5lcmF0ZSh7dHlwZTpcIm5vZGVidWZmZXJcIn0pXG4gICAgfVxufVxuIl19