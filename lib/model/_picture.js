"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _variant = require("./variant");

var _variant2 = _interopRequireDefault(_variant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Picture = function (_Variant) {
	(0, _inherits3.default)(Picture, _Variant);

	function Picture() {
		(0, _classCallCheck3.default)(this, Picture);
		return (0, _possibleConstructorReturn3.default)(this, (Picture.__proto__ || (0, _getPrototypeOf2.default)(Picture)).apply(this, arguments));
	}

	(0, _createClass3.default)(Picture, [{
		key: "_initVariant",
		value: function _initVariant() {
			(0, _get3.default)(Picture.prototype.__proto__ || (0, _getPrototypeOf2.default)(Picture.prototype), "_initVariant", this).call(this);

			/*assemble(code)*/
			this.parsedCode.body[0] = {
				"type": "ExpressionStatement",
				"expression": {
					"type": "CallExpression",
					"callee": {
						"type": "MemberExpression",
						"computed": false,
						"object": {
							"type": "Identifier",
							"name": this.vId
						},
						"property": {
							"type": "Identifier",
							"name": "assemble"
						}
					},
					"arguments": [this.parsedCode.body[0].expression]
				}
			};
		}
	}, {
		key: "assemble",
		value: function assemble(value) {
			var _this2 = this;

			if (value == null || value == undefined || value == '') {
				this.assembledXml.parentNode.removeChild(this.assembledXml);
			} else {
				(function () {
					var blip = _this2.assembledXml.$1('graphicData blip');

					_this2.getImageData(value).then(function (data) {
						var id = _this2.docxPart.addRel({
							type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
							target: data
						});
						blip.setAttribute("r:embed", id);
					});
				})();
			}
			(0, _get3.default)(Picture.prototype.__proto__ || (0, _getPrototypeOf2.default)(Picture.prototype), "assemble", this).apply(this, arguments);
		}
	}, {
		key: "getImageData",
		value: function getImageData(url) {
			return new _promise2.default(function (resolve, reject) {
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
	}], [{
		key: "type",
		get: function get() {
			return "variant.picture";
		}
	}]);
	return Picture;
}(_variant2.default);

exports.default = Picture;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fcGljdHVyZS5qcyJdLCJuYW1lcyI6WyJQaWN0dXJlIiwicGFyc2VkQ29kZSIsImJvZHkiLCJ2SWQiLCJleHByZXNzaW9uIiwidmFsdWUiLCJ1bmRlZmluZWQiLCJhc3NlbWJsZWRYbWwiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJibGlwIiwiJDEiLCJnZXRJbWFnZURhdGEiLCJ0aGVuIiwiaWQiLCJkb2N4UGFydCIsImFkZFJlbCIsInR5cGUiLCJ0YXJnZXQiLCJkYXRhIiwic2V0QXR0cmlidXRlIiwiYXJndW1lbnRzIiwidXJsIiwicmVzb2x2ZSIsInJlamVjdCIsIiQiLCJpc05vZGUiLCJyZXF1ZXN0TW9kZWwiLCJyZXF1ZXN0IiwicmVxdWlyZSIsImRlZmF1bHRzIiwiZW5jb2RpbmciLCJnZXQiLCJlcnJvciIsInJlcyIsInN0YXR1c0NvZGUiLCJCdWZmZXIiLCJ4bWxIVFRQIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwicmVzcG9uc2VUeXBlIiwib25sb2FkIiwiZSIsInN0YXR1cyIsInJlc3BvbnNlIiwiRXJyb3IiLCJyZXBvbnNlVGV4dCIsInNlbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7O2lDQUdOO0FBQ2I7O0FBRUE7QUFDQSxRQUFLQyxVQUFMLENBQWdCQyxJQUFoQixDQUFxQixDQUFyQixJQUF3QjtBQUNkLFlBQVEscUJBRE07QUFFZCxrQkFBYztBQUNWLGFBQVEsZ0JBREU7QUFFVixlQUFVO0FBQ3JCLGNBQVEsa0JBRGE7QUFFckIsa0JBQVksS0FGUztBQUdyQixnQkFBVTtBQUNULGVBQVEsWUFEQztBQUVULGVBQVEsS0FBS0M7QUFGSixPQUhXO0FBT3JCLGtCQUFZO0FBQ1gsZUFBUSxZQURHO0FBRVgsZUFBUTtBQUZHO0FBUFMsTUFGQTtBQWNWLGtCQUFhLENBQ3hCLEtBQUtGLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCLENBQXJCLEVBQXdCRSxVQURBO0FBZEg7QUFGQSxJQUF4QjtBQXFCQTs7OzJCQUVRQyxLLEVBQU07QUFBQTs7QUFDZCxPQUFHQSxTQUFPLElBQVAsSUFBZUEsU0FBT0MsU0FBdEIsSUFBbUNELFNBQU8sRUFBN0MsRUFBZ0Q7QUFDL0MsU0FBS0UsWUFBTCxDQUFrQkMsVUFBbEIsQ0FBNkJDLFdBQTdCLENBQXlDLEtBQUtGLFlBQTlDO0FBQ0EsSUFGRCxNQUVLO0FBQUE7QUFDSixTQUFJRyxPQUFLLE9BQUtILFlBQUwsQ0FBa0JJLEVBQWxCLENBQXFCLGtCQUFyQixDQUFUOztBQUVBLFlBQUtDLFlBQUwsQ0FBa0JQLEtBQWxCLEVBQXlCUSxJQUF6QixDQUE4QixnQkFBTTtBQUNuQyxVQUFJQyxLQUFHLE9BQUtDLFFBQUwsQ0FBY0MsTUFBZCxDQUFxQjtBQUMzQkMsYUFBSywyRUFEc0I7QUFFM0JDLGVBQU9DO0FBRm9CLE9BQXJCLENBQVA7QUFJQVQsV0FBS1UsWUFBTCxDQUFrQixTQUFsQixFQUE2Qk4sRUFBN0I7QUFDQSxNQU5EO0FBSEk7QUFVSjtBQUNELHFJQUFrQk8sU0FBbEI7QUFDQTs7OytCQUVZQyxHLEVBQUk7QUFDaEIsVUFBTyxzQkFBWSxVQUFDQyxPQUFELEVBQVNDLE1BQVQsRUFBa0I7QUFDcEMsUUFBR0MsRUFBRUMsTUFBTCxFQUFZO0FBQ1gsU0FBSUMsZUFBYSxTQUFqQjtBQUNBLFNBQUlDLFVBQVFDLFFBQVFGLFlBQVIsRUFBc0JHLFFBQXRCLENBQStCLEVBQUVDLFVBQVUsSUFBWixFQUEvQixDQUFaO0FBQ0FILGFBQVFJLEdBQVIsQ0FBWVYsR0FBWixFQUFpQixVQUFDVyxLQUFELEVBQU9DLEdBQVAsRUFBV2hDLElBQVgsRUFBa0I7QUFDbEMsVUFBSSxDQUFDK0IsS0FBRCxJQUFVQyxJQUFJQyxVQUFKLElBQWtCLEdBQWhDLEVBQ0NaLFFBQVEsSUFBSWEsTUFBSixDQUFXbEMsSUFBWCxDQUFSLEVBREQsS0FHQ3NCLE9BQU9TLEtBQVA7QUFDRCxNQUxEO0FBTUEsS0FURCxNQVNLO0FBQ0osU0FBSUksVUFBVSxJQUFJQyxjQUFKLEVBQWQ7QUFDR0QsYUFBUUUsSUFBUixDQUFhLEtBQWIsRUFBbUJqQixHQUFuQixFQUF1QixJQUF2QjtBQUNBZSxhQUFRRyxZQUFSLEdBQXVCLGFBQXZCO0FBQ0FILGFBQVFJLE1BQVIsR0FBaUIsVUFBU0MsQ0FBVCxFQUFXO0FBQzlCLFVBQUcsS0FBS0MsTUFBTCxJQUFhLEdBQWhCLEVBQ09wQixRQUFRLEtBQUtxQixRQUFiLEVBRFAsS0FHQ3BCLE9BQU8sSUFBSXFCLEtBQUosQ0FBVSxLQUFLQyxXQUFmLENBQVA7QUFDRSxNQUxEO0FBTUFULGFBQVFVLElBQVI7QUFDSDtBQUNELElBdEJNLENBQVA7QUF1QkE7OztzQkF0RWdCO0FBQUMsVUFBTSxpQkFBTjtBQUF3Qjs7Ozs7a0JBRHRCL0MsTyIsImZpbGUiOiJfcGljdHVyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWYXJpYW50IGZyb20gXCIuL3ZhcmlhbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGljdHVyZSBleHRlbmRzIFZhcmlhbnR7XHJcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuXCJ2YXJpYW50LnBpY3R1cmVcIn1cclxuXHJcblx0X2luaXRWYXJpYW50KCl7XHJcblx0XHRzdXBlci5faW5pdFZhcmlhbnQoKVxyXG5cclxuXHRcdC8qYXNzZW1ibGUoY29kZSkqL1xyXG5cdFx0dGhpcy5wYXJzZWRDb2RlLmJvZHlbMF09e1xyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJFeHByZXNzaW9uU3RhdGVtZW50XCIsXHJcbiAgICAgICAgICAgIFwiZXhwcmVzc2lvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJDYWxsRXhwcmVzc2lvblwiLFxyXG4gICAgICAgICAgICAgICAgXCJjYWxsZWVcIjoge1xyXG5cdFx0XHRcdFx0XCJ0eXBlXCI6IFwiTWVtYmVyRXhwcmVzc2lvblwiLFxyXG5cdFx0XHRcdFx0XCJjb21wdXRlZFwiOiBmYWxzZSxcclxuXHRcdFx0XHRcdFwib2JqZWN0XCI6IHtcclxuXHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogdGhpcy52SWRcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcInByb3BlcnR5XCI6IHtcclxuXHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiLFxyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogXCJhc3NlbWJsZVwiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuICAgICAgICAgICAgICAgIFwiYXJndW1lbnRzXCI6IFtcclxuXHRcdFx0XHRcdHRoaXMucGFyc2VkQ29kZS5ib2R5WzBdLmV4cHJlc3Npb25cclxuXHRcdFx0XHRdXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzc2VtYmxlKHZhbHVlKXtcclxuXHRcdGlmKHZhbHVlPT1udWxsIHx8IHZhbHVlPT11bmRlZmluZWQgfHwgdmFsdWU9PScnKXtcclxuXHRcdFx0dGhpcy5hc3NlbWJsZWRYbWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmFzc2VtYmxlZFhtbClcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRsZXQgYmxpcD10aGlzLmFzc2VtYmxlZFhtbC4kMSgnZ3JhcGhpY0RhdGEgYmxpcCcpXHJcblxyXG5cdFx0XHR0aGlzLmdldEltYWdlRGF0YSh2YWx1ZSkudGhlbihkYXRhPT57XHJcblx0XHRcdFx0bGV0IGlkPXRoaXMuZG9jeFBhcnQuYWRkUmVsKHtcclxuXHRcdFx0XHRcdHR5cGU6XCJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvb2ZmaWNlRG9jdW1lbnQvMjAwNi9yZWxhdGlvbnNoaXBzL2ltYWdlXCIsXHJcblx0XHRcdFx0XHR0YXJnZXQ6ZGF0YVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0YmxpcC5zZXRBdHRyaWJ1dGUoXCJyOmVtYmVkXCIsIGlkKVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdFx0c3VwZXIuYXNzZW1ibGUoLi4uYXJndW1lbnRzKVxyXG5cdH1cclxuXHJcblx0Z2V0SW1hZ2VEYXRhKHVybCl7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xyXG5cdFx0XHRpZigkLmlzTm9kZSl7XHJcblx0XHRcdFx0bGV0IHJlcXVlc3RNb2RlbD1cInJlcXVlc3RcIlxyXG5cdFx0XHRcdGxldCByZXF1ZXN0PXJlcXVpcmUocmVxdWVzdE1vZGVsKS5kZWZhdWx0cyh7IGVuY29kaW5nOiBudWxsIH0pO1xyXG5cdFx0XHRcdHJlcXVlc3QuZ2V0KHVybCwgKGVycm9yLHJlcyxib2R5KT0+e1xyXG5cdFx0XHRcdFx0aWYgKCFlcnJvciAmJiByZXMuc3RhdHVzQ29kZSA9PSAyMDApIFxyXG5cdFx0XHRcdFx0XHRyZXNvbHZlKG5ldyBCdWZmZXIoYm9keSkpXHJcblx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcilcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRsZXQgeG1sSFRUUCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cdFx0XHQgICAgeG1sSFRUUC5vcGVuKCdHRVQnLHVybCx0cnVlKTtcclxuXHRcdFx0ICAgIHhtbEhUVFAucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcclxuXHRcdFx0ICAgIHhtbEhUVFAub25sb2FkID0gZnVuY3Rpb24oZSl7XHJcblx0XHRcdFx0XHRpZih0aGlzLnN0YXR1cz09MjAwKVxyXG5cdFx0XHQgICAgICAgIFx0cmVzb2x2ZSh0aGlzLnJlc3BvbnNlKVxyXG5cdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKHRoaXMucmVwb25zZVRleHQpKVxyXG5cdFx0XHQgICAgfVxyXG5cdFx0XHQgICAgeG1sSFRUUC5zZW5kKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbiJdfQ==