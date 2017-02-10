"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _variant = require("./variant");

var _variant2 = _interopRequireDefault(_variant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Picture = function (_Variant) {
	_inherits(Picture, _Variant);

	function Picture() {
		_classCallCheck(this, Picture);

		return _possibleConstructorReturn(this, (Picture.__proto__ || Object.getPrototypeOf(Picture)).apply(this, arguments));
	}

	_createClass(Picture, [{
		key: "_initVariant",
		value: function _initVariant() {
			_get(Picture.prototype.__proto__ || Object.getPrototypeOf(Picture.prototype), "_initVariant", this).call(this);

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
			_get(Picture.prototype.__proto__ || Object.getPrototypeOf(Picture.prototype), "assemble", this).apply(this, arguments);
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
	}], [{
		key: "type",
		get: function get() {
			return "variant.picture";
		}
	}]);

	return Picture;
}(_variant2.default);

exports.default = Picture;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fcGljdHVyZS5qcyJdLCJuYW1lcyI6WyJQaWN0dXJlIiwicGFyc2VkQ29kZSIsImJvZHkiLCJ2SWQiLCJleHByZXNzaW9uIiwidmFsdWUiLCJ1bmRlZmluZWQiLCJhc3NlbWJsZWRYbWwiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJibGlwIiwiJDEiLCJnZXRJbWFnZURhdGEiLCJ0aGVuIiwiaWQiLCJkb2N4UGFydCIsImFkZFJlbCIsInR5cGUiLCJ0YXJnZXQiLCJkYXRhIiwic2V0QXR0cmlidXRlIiwiYXJndW1lbnRzIiwidXJsIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCIkIiwiaXNOb2RlIiwicmVxdWVzdE1vZGVsIiwicmVxdWVzdCIsInJlcXVpcmUiLCJkZWZhdWx0cyIsImVuY29kaW5nIiwiZ2V0IiwiZXJyb3IiLCJyZXMiLCJzdGF0dXNDb2RlIiwiQnVmZmVyIiwieG1sSFRUUCIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsInJlc3BvbnNlVHlwZSIsIm9ubG9hZCIsImUiLCJzdGF0dXMiLCJyZXNwb25zZSIsIkVycm9yIiwicmVwb25zZVRleHQiLCJzZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7aUNBR047QUFDYjs7QUFFQTtBQUNBLFFBQUtDLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCLENBQXJCLElBQXdCO0FBQ2QsWUFBUSxxQkFETTtBQUVkLGtCQUFjO0FBQ1YsYUFBUSxnQkFERTtBQUVWLGVBQVU7QUFDckIsY0FBUSxrQkFEYTtBQUVyQixrQkFBWSxLQUZTO0FBR3JCLGdCQUFVO0FBQ1QsZUFBUSxZQURDO0FBRVQsZUFBUSxLQUFLQztBQUZKLE9BSFc7QUFPckIsa0JBQVk7QUFDWCxlQUFRLFlBREc7QUFFWCxlQUFRO0FBRkc7QUFQUyxNQUZBO0FBY1Ysa0JBQWEsQ0FDeEIsS0FBS0YsVUFBTCxDQUFnQkMsSUFBaEIsQ0FBcUIsQ0FBckIsRUFBd0JFLFVBREE7QUFkSDtBQUZBLElBQXhCO0FBcUJBOzs7MkJBRVFDLEssRUFBTTtBQUFBOztBQUNkLE9BQUdBLFNBQU8sSUFBUCxJQUFlQSxTQUFPQyxTQUF0QixJQUFtQ0QsU0FBTyxFQUE3QyxFQUFnRDtBQUMvQyxTQUFLRSxZQUFMLENBQWtCQyxVQUFsQixDQUE2QkMsV0FBN0IsQ0FBeUMsS0FBS0YsWUFBOUM7QUFDQSxJQUZELE1BRUs7QUFBQTtBQUNKLFNBQUlHLE9BQUssT0FBS0gsWUFBTCxDQUFrQkksRUFBbEIsQ0FBcUIsa0JBQXJCLENBQVQ7O0FBRUEsWUFBS0MsWUFBTCxDQUFrQlAsS0FBbEIsRUFBeUJRLElBQXpCLENBQThCLGdCQUFNO0FBQ25DLFVBQUlDLEtBQUcsT0FBS0MsUUFBTCxDQUFjQyxNQUFkLENBQXFCO0FBQzNCQyxhQUFLLDJFQURzQjtBQUUzQkMsZUFBT0M7QUFGb0IsT0FBckIsQ0FBUDtBQUlBVCxXQUFLVSxZQUFMLENBQWtCLFNBQWxCLEVBQTZCTixFQUE3QjtBQUNBLE1BTkQ7QUFISTtBQVVKO0FBQ0QsK0dBQWtCTyxTQUFsQjtBQUNBOzs7K0JBRVlDLEcsRUFBSTtBQUNoQixVQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVNDLE1BQVQsRUFBa0I7QUFDcEMsUUFBR0MsRUFBRUMsTUFBTCxFQUFZO0FBQ1gsU0FBSUMsZUFBYSxTQUFqQjtBQUNBLFNBQUlDLFVBQVFDLFFBQVFGLFlBQVIsRUFBc0JHLFFBQXRCLENBQStCLEVBQUVDLFVBQVUsSUFBWixFQUEvQixDQUFaO0FBQ0FILGFBQVFJLEdBQVIsQ0FBWVgsR0FBWixFQUFpQixVQUFDWSxLQUFELEVBQU9DLEdBQVAsRUFBV2pDLElBQVgsRUFBa0I7QUFDbEMsVUFBSSxDQUFDZ0MsS0FBRCxJQUFVQyxJQUFJQyxVQUFKLElBQWtCLEdBQWhDLEVBQ0NaLFFBQVEsSUFBSWEsTUFBSixDQUFXbkMsSUFBWCxDQUFSLEVBREQsS0FHQ3VCLE9BQU9TLEtBQVA7QUFDRCxNQUxEO0FBTUEsS0FURCxNQVNLO0FBQ0osU0FBSUksVUFBVSxJQUFJQyxjQUFKLEVBQWQ7QUFDR0QsYUFBUUUsSUFBUixDQUFhLEtBQWIsRUFBbUJsQixHQUFuQixFQUF1QixJQUF2QjtBQUNBZ0IsYUFBUUcsWUFBUixHQUF1QixhQUF2QjtBQUNBSCxhQUFRSSxNQUFSLEdBQWlCLFVBQVNDLENBQVQsRUFBVztBQUM5QixVQUFHLEtBQUtDLE1BQUwsSUFBYSxHQUFoQixFQUNPcEIsUUFBUSxLQUFLcUIsUUFBYixFQURQLEtBR0NwQixPQUFPLElBQUlxQixLQUFKLENBQVUsS0FBS0MsV0FBZixDQUFQO0FBQ0UsTUFMRDtBQU1BVCxhQUFRVSxJQUFSO0FBQ0g7QUFDRCxJQXRCTSxDQUFQO0FBdUJBOzs7c0JBdEVnQjtBQUFDLFVBQU0saUJBQU47QUFBd0I7Ozs7OztrQkFEdEJoRCxPIiwiZmlsZSI6Il9waWN0dXJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZhcmlhbnQgZnJvbSBcIi4vdmFyaWFudFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaWN0dXJlIGV4dGVuZHMgVmFyaWFudHtcclxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm5cInZhcmlhbnQucGljdHVyZVwifVxyXG5cclxuXHRfaW5pdFZhcmlhbnQoKXtcclxuXHRcdHN1cGVyLl9pbml0VmFyaWFudCgpXHJcblxyXG5cdFx0Lyphc3NlbWJsZShjb2RlKSovXHJcblx0XHR0aGlzLnBhcnNlZENvZGUuYm9keVswXT17XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIkV4cHJlc3Npb25TdGF0ZW1lbnRcIixcclxuICAgICAgICAgICAgXCJleHByZXNzaW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkNhbGxFeHByZXNzaW9uXCIsXHJcbiAgICAgICAgICAgICAgICBcImNhbGxlZVwiOiB7XHJcblx0XHRcdFx0XHRcInR5cGVcIjogXCJNZW1iZXJFeHByZXNzaW9uXCIsXHJcblx0XHRcdFx0XHRcImNvbXB1dGVkXCI6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XCJvYmplY3RcIjoge1xyXG5cdFx0XHRcdFx0XHRcInR5cGVcIjogXCJJZGVudGlmaWVyXCIsXHJcblx0XHRcdFx0XHRcdFwibmFtZVwiOiB0aGlzLnZJZFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFwicHJvcGVydHlcIjoge1xyXG5cdFx0XHRcdFx0XHRcInR5cGVcIjogXCJJZGVudGlmaWVyXCIsXHJcblx0XHRcdFx0XHRcdFwibmFtZVwiOiBcImFzc2VtYmxlXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG4gICAgICAgICAgICAgICAgXCJhcmd1bWVudHNcIjogW1xyXG5cdFx0XHRcdFx0dGhpcy5wYXJzZWRDb2RlLmJvZHlbMF0uZXhwcmVzc2lvblxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXNzZW1ibGUodmFsdWUpe1xyXG5cdFx0aWYodmFsdWU9PW51bGwgfHwgdmFsdWU9PXVuZGVmaW5lZCB8fCB2YWx1ZT09Jycpe1xyXG5cdFx0XHR0aGlzLmFzc2VtYmxlZFhtbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuYXNzZW1ibGVkWG1sKVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGxldCBibGlwPXRoaXMuYXNzZW1ibGVkWG1sLiQxKCdncmFwaGljRGF0YSBibGlwJylcclxuXHJcblx0XHRcdHRoaXMuZ2V0SW1hZ2VEYXRhKHZhbHVlKS50aGVuKGRhdGE9PntcclxuXHRcdFx0XHRsZXQgaWQ9dGhpcy5kb2N4UGFydC5hZGRSZWwoe1xyXG5cdFx0XHRcdFx0dHlwZTpcImh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9vZmZpY2VEb2N1bWVudC8yMDA2L3JlbGF0aW9uc2hpcHMvaW1hZ2VcIixcclxuXHRcdFx0XHRcdHRhcmdldDpkYXRhXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRibGlwLnNldEF0dHJpYnV0ZShcInI6ZW1iZWRcIiwgaWQpXHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0XHRzdXBlci5hc3NlbWJsZSguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cclxuXHRnZXRJbWFnZURhdGEodXJsKXtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XHJcblx0XHRcdGlmKCQuaXNOb2RlKXtcclxuXHRcdFx0XHRsZXQgcmVxdWVzdE1vZGVsPVwicmVxdWVzdFwiXHJcblx0XHRcdFx0bGV0IHJlcXVlc3Q9cmVxdWlyZShyZXF1ZXN0TW9kZWwpLmRlZmF1bHRzKHsgZW5jb2Rpbmc6IG51bGwgfSk7XHJcblx0XHRcdFx0cmVxdWVzdC5nZXQodXJsLCAoZXJyb3IscmVzLGJvZHkpPT57XHJcblx0XHRcdFx0XHRpZiAoIWVycm9yICYmIHJlcy5zdGF0dXNDb2RlID09IDIwMCkgXHJcblx0XHRcdFx0XHRcdHJlc29sdmUobmV3IEJ1ZmZlcihib2R5KSlcclxuXHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGxldCB4bWxIVFRQID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblx0XHRcdCAgICB4bWxIVFRQLm9wZW4oJ0dFVCcsdXJsLHRydWUpO1xyXG5cdFx0XHQgICAgeG1sSFRUUC5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xyXG5cdFx0XHQgICAgeG1sSFRUUC5vbmxvYWQgPSBmdW5jdGlvbihlKXtcclxuXHRcdFx0XHRcdGlmKHRoaXMuc3RhdHVzPT0yMDApXHJcblx0XHRcdCAgICAgICAgXHRyZXNvbHZlKHRoaXMucmVzcG9uc2UpXHJcblx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IodGhpcy5yZXBvbnNlVGV4dCkpXHJcblx0XHRcdCAgICB9XHJcblx0XHRcdCAgICB4bWxIVFRQLnNlbmQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuIl19