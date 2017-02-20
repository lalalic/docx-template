"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _exp = require("./_exp");

var _exp2 = _interopRequireDefault(_exp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Picture = function (_Expression) {
	_inherits(Picture, _Expression);

	function Picture() {
		_classCallCheck(this, Picture);

		return _possibleConstructorReturn(this, (Picture.__proto__ || Object.getPrototypeOf(Picture)).apply(this, arguments));
	}

	_createClass(Picture, [{
		key: "assemble",
		value: function assemble(docx, node, value) {
			if (value == null || value == undefined || value == '') {
				node.remove();
			} else {
				return this.getImageData(value).then(function (data) {
					var id = docx.officeDocument.addImage(data);
					var blip = node.find('a\\:graphic a\\:blip');
					blip.attr("r:embed", id);
				});
			}
		}
	}, {
		key: "getImageData",
		value: function getImageData(url) {
			return new Promise(function (resolve, reject) {
				if ($.isNode) {
					var requestModel = "request";
					var request = require(requestModel).defaults({ encoding: null });
					request.get(url, function (error, res, body) {
						if (!error && res.statusCode == 200) resolve(new Buffer(body));else reject(error);
					});
				} else {
					var xmlHTTP = new XMLHttpRequest();
					xmlHTTP.open('GET', url, true);
					xmlHTTP.responseType = 'arraybuffer';
					xmlHTTP.onload = function (e) {
						if (this.status == 200) resolve(this.response);else reject(new Error(this.reponseText));
					};
					xmlHTTP.send();
				}
			});
		}
	}]);

	return Picture;
}(_exp2.default);

Picture.type = "variant.picture";
exports.default = Picture;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fcGljdHVyZS5qcyJdLCJuYW1lcyI6WyJQaWN0dXJlIiwiZG9jeCIsIm5vZGUiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsInJlbW92ZSIsImdldEltYWdlRGF0YSIsInRoZW4iLCJpZCIsIm9mZmljZURvY3VtZW50IiwiYWRkSW1hZ2UiLCJkYXRhIiwiYmxpcCIsImZpbmQiLCJhdHRyIiwidXJsIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCIkIiwiaXNOb2RlIiwicmVxdWVzdE1vZGVsIiwicmVxdWVzdCIsInJlcXVpcmUiLCJkZWZhdWx0cyIsImVuY29kaW5nIiwiZ2V0IiwiZXJyb3IiLCJyZXMiLCJib2R5Iiwic3RhdHVzQ29kZSIsIkJ1ZmZlciIsInhtbEhUVFAiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJyZXNwb25zZVR5cGUiLCJvbmxvYWQiLCJlIiwic3RhdHVzIiwicmVzcG9uc2UiLCJFcnJvciIsInJlcG9uc2VUZXh0Iiwic2VuZCIsInR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7MkJBR1hDLEksRUFBTUMsSSxFQUFNQyxLLEVBQU07QUFDMUIsT0FBR0EsU0FBTyxJQUFQLElBQWVBLFNBQU9DLFNBQXRCLElBQW1DRCxTQUFPLEVBQTdDLEVBQWdEO0FBQy9DRCxTQUFLRyxNQUFMO0FBQ0EsSUFGRCxNQUVLO0FBQ0osV0FBTyxLQUFLQyxZQUFMLENBQWtCSCxLQUFsQixFQUF5QkksSUFBekIsQ0FBOEIsZ0JBQU07QUFDMUMsU0FBSUMsS0FBR1AsS0FBS1EsY0FBTCxDQUFvQkMsUUFBcEIsQ0FBNkJDLElBQTdCLENBQVA7QUFDQSxTQUFJQyxPQUFLVixLQUFLVyxJQUFMLENBQVUsc0JBQVYsQ0FBVDtBQUNBRCxVQUFLRSxJQUFMLENBQVUsU0FBVixFQUFxQk4sRUFBckI7QUFDQSxLQUpNLENBQVA7QUFLQTtBQUNEOzs7K0JBRVlPLEcsRUFBSTtBQUNoQixVQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVNDLE1BQVQsRUFBa0I7QUFDcEMsUUFBR0MsRUFBRUMsTUFBTCxFQUFZO0FBQ1gsU0FBSUMsZUFBYSxTQUFqQjtBQUNBLFNBQUlDLFVBQVFDLFFBQVFGLFlBQVIsRUFBc0JHLFFBQXRCLENBQStCLEVBQUVDLFVBQVUsSUFBWixFQUEvQixDQUFaO0FBQ0FILGFBQVFJLEdBQVIsQ0FBWVgsR0FBWixFQUFpQixVQUFDWSxLQUFELEVBQU9DLEdBQVAsRUFBV0MsSUFBWCxFQUFrQjtBQUNsQyxVQUFJLENBQUNGLEtBQUQsSUFBVUMsSUFBSUUsVUFBSixJQUFrQixHQUFoQyxFQUNDYixRQUFRLElBQUljLE1BQUosQ0FBV0YsSUFBWCxDQUFSLEVBREQsS0FHQ1gsT0FBT1MsS0FBUDtBQUNELE1BTEQ7QUFNQSxLQVRELE1BU0s7QUFDSixTQUFJSyxVQUFVLElBQUlDLGNBQUosRUFBZDtBQUNHRCxhQUFRRSxJQUFSLENBQWEsS0FBYixFQUFtQm5CLEdBQW5CLEVBQXVCLElBQXZCO0FBQ0FpQixhQUFRRyxZQUFSLEdBQXVCLGFBQXZCO0FBQ0FILGFBQVFJLE1BQVIsR0FBaUIsVUFBU0MsQ0FBVCxFQUFXO0FBQzlCLFVBQUcsS0FBS0MsTUFBTCxJQUFhLEdBQWhCLEVBQ09yQixRQUFRLEtBQUtzQixRQUFiLEVBRFAsS0FHQ3JCLE9BQU8sSUFBSXNCLEtBQUosQ0FBVSxLQUFLQyxXQUFmLENBQVA7QUFDRSxNQUxEO0FBTUFULGFBQVFVLElBQVI7QUFDSDtBQUNELElBdEJNLENBQVA7QUF1QkE7Ozs7OztBQXZDbUIxQyxPLENBQ2IyQyxJLEdBQUssaUI7a0JBRFEzQyxPIiwiZmlsZSI6Il9waWN0dXJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV4cHJlc3Npb24gZnJvbSBcIi4vX2V4cFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaWN0dXJlIGV4dGVuZHMgRXhwcmVzc2lvbntcclxuXHRzdGF0aWMgdHlwZT1cInZhcmlhbnQucGljdHVyZVwiXHJcblxyXG5cdGFzc2VtYmxlKGRvY3gsIG5vZGUsIHZhbHVlKXtcclxuXHRcdGlmKHZhbHVlPT1udWxsIHx8IHZhbHVlPT11bmRlZmluZWQgfHwgdmFsdWU9PScnKXtcclxuXHRcdFx0bm9kZS5yZW1vdmUoKVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHJldHVybiB0aGlzLmdldEltYWdlRGF0YSh2YWx1ZSkudGhlbihkYXRhPT57XHJcblx0XHRcdFx0bGV0IGlkPWRvY3gub2ZmaWNlRG9jdW1lbnQuYWRkSW1hZ2UoZGF0YSlcclxuXHRcdFx0XHRsZXQgYmxpcD1ub2RlLmZpbmQoJ2FcXFxcOmdyYXBoaWMgYVxcXFw6YmxpcCcpXHJcblx0XHRcdFx0YmxpcC5hdHRyKFwicjplbWJlZFwiLCBpZClcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldEltYWdlRGF0YSh1cmwpe1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuXHRcdFx0aWYoJC5pc05vZGUpe1xyXG5cdFx0XHRcdGxldCByZXF1ZXN0TW9kZWw9XCJyZXF1ZXN0XCJcclxuXHRcdFx0XHRsZXQgcmVxdWVzdD1yZXF1aXJlKHJlcXVlc3RNb2RlbCkuZGVmYXVsdHMoeyBlbmNvZGluZzogbnVsbCB9KTtcclxuXHRcdFx0XHRyZXF1ZXN0LmdldCh1cmwsIChlcnJvcixyZXMsYm9keSk9PntcclxuXHRcdFx0XHRcdGlmICghZXJyb3IgJiYgcmVzLnN0YXR1c0NvZGUgPT0gMjAwKVxyXG5cdFx0XHRcdFx0XHRyZXNvbHZlKG5ldyBCdWZmZXIoYm9keSkpXHJcblx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcilcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRsZXQgeG1sSFRUUCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cdFx0XHQgICAgeG1sSFRUUC5vcGVuKCdHRVQnLHVybCx0cnVlKTtcclxuXHRcdFx0ICAgIHhtbEhUVFAucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcclxuXHRcdFx0ICAgIHhtbEhUVFAub25sb2FkID0gZnVuY3Rpb24oZSl7XHJcblx0XHRcdFx0XHRpZih0aGlzLnN0YXR1cz09MjAwKVxyXG5cdFx0XHQgICAgICAgIFx0cmVzb2x2ZSh0aGlzLnJlc3BvbnNlKVxyXG5cdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKHRoaXMucmVwb25zZVRleHQpKVxyXG5cdFx0XHQgICAgfVxyXG5cdFx0XHQgICAgeG1sSFRUUC5zZW5kKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbiJdfQ==