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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Picture).apply(this, arguments));
	}

	_createClass(Picture, [{
		key: "_initVariant",
		value: function _initVariant() {
			_get(Object.getPrototypeOf(Picture.prototype), "_initVariant", this).call(this);

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
						blip.removeAttribute("r:embed");
						blip.setAttribute("r:link", id);
					});
				})();
			}
			_get(Object.getPrototypeOf(Picture.prototype), "assemble", this).apply(this, arguments);
		}
	}, {
		key: "getImageData",
		value: function getImageData(url) {
			return new Promise(function (resolve, reject) {
				if ($.isNode) {
					var proto = url.split(":")[0];
					var http = require(proto);
					http.request(url, function (res) {
						var data = new Buffer();
						res.on('data', function (chunk) {
							return data.append(chunk);
						});
						res.on('end', function () {
							return resolve(data);
						});
					}).on("error", function (e) {
						return reject(e);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fcGljdHVyZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7aUNBR047QUFDYiw4QkFKbUIsb0RBSW5COzs7QUFEYSxPQUliLENBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQixDQUFyQixJQUF3QjtBQUNkLFlBQVEscUJBQVI7QUFDQSxrQkFBYztBQUNWLGFBQVEsZ0JBQVI7QUFDQSxlQUFVO0FBQ3JCLGNBQVEsa0JBQVI7QUFDQSxrQkFBWSxLQUFaO0FBQ0EsZ0JBQVU7QUFDVCxlQUFRLFlBQVI7QUFDQSxlQUFRLEtBQUssR0FBTDtPQUZUO0FBSUEsa0JBQVk7QUFDWCxlQUFRLFlBQVI7QUFDQSxlQUFRLFVBQVI7T0FGRDtNQVBXO0FBWUEsa0JBQWEsQ0FDeEIsS0FBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCLENBQXJCLEVBQXdCLFVBQXhCLENBRFc7S0FkSjtJQUZWLENBSmE7Ozs7MkJBMkJMLE9BQU07OztBQUNkLE9BQUcsU0FBTyxJQUFQLElBQWUsU0FBTyxTQUFQLElBQW9CLFNBQU8sRUFBUCxFQUFVO0FBQy9DLFNBQUssWUFBTCxDQUFrQixVQUFsQixDQUE2QixXQUE3QixDQUF5QyxLQUFLLFlBQUwsQ0FBekMsQ0FEK0M7SUFBaEQsTUFFSzs7QUFDSixTQUFJLE9BQUssT0FBSyxZQUFMLENBQWtCLEVBQWxCLENBQXFCLGtCQUFyQixDQUFMOztBQUVKLFlBQUssWUFBTCxDQUFrQixLQUFsQixFQUF5QixJQUF6QixDQUE4QixnQkFBTTtBQUNuQyxVQUFJLEtBQUcsT0FBSyxRQUFMLENBQWMsTUFBZCxDQUFxQjtBQUMzQixhQUFLLDJFQUFMO0FBQ0EsZUFBTyxJQUFQO09BRk0sQ0FBSCxDQUQrQjtBQUtuQyxXQUFLLGVBQUwsQ0FBcUIsU0FBckIsRUFMbUM7QUFNbkMsV0FBSyxZQUFMLENBQWtCLFFBQWxCLEVBQTJCLEVBQTNCLEVBTm1DO01BQU4sQ0FBOUI7U0FISTtJQUZMO0FBY0EsOEJBN0NtQixrREE2Q0QsVUFBbEIsQ0FmYzs7OzsrQkFrQkYsS0FBSTtBQUNoQixVQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFTLE1BQVQsRUFBa0I7QUFDcEMsUUFBRyxFQUFFLE1BQUYsRUFBUztBQUNYLFNBQUksUUFBTSxJQUFJLEtBQUosQ0FBVSxHQUFWLEVBQWUsQ0FBZixDQUFOLENBRE87QUFFWCxTQUFJLE9BQUssUUFBUSxLQUFSLENBQUwsQ0FGTztBQUdYLFVBQUssT0FBTCxDQUFhLEdBQWIsRUFBa0IsZUFBSztBQUN0QixVQUFJLE9BQUssSUFBSSxNQUFKLEVBQUwsQ0FEa0I7QUFFdEIsVUFBSSxFQUFKLENBQU8sTUFBUCxFQUFjO2NBQU8sS0FBSyxNQUFMLENBQVksS0FBWjtPQUFQLENBQWQsQ0FGc0I7QUFHdEIsVUFBSSxFQUFKLENBQU8sS0FBUCxFQUFjO2NBQUksUUFBUSxJQUFSO09BQUosQ0FBZCxDQUhzQjtNQUFMLENBQWxCLENBSUcsRUFKSCxDQUlNLE9BSk4sRUFJZTthQUFHLE9BQU8sQ0FBUDtNQUFILENBSmYsQ0FIVztLQUFaLE1BUUs7QUFDSixTQUFJLFVBQVUsSUFBSSxjQUFKLEVBQVYsQ0FEQTtBQUVELGFBQVEsSUFBUixDQUFhLEtBQWIsRUFBbUIsR0FBbkIsRUFBdUIsSUFBdkIsRUFGQztBQUdELGFBQVEsWUFBUixHQUF1QixhQUF2QixDQUhDO0FBSUQsYUFBUSxNQUFSLEdBQWlCLFVBQVMsQ0FBVCxFQUFXO0FBQzlCLFVBQUcsS0FBSyxNQUFMLElBQWEsR0FBYixFQUNJLFFBQVEsS0FBSyxRQUFMLENBQVIsQ0FEUCxLQUdDLE9BQU8sSUFBSSxLQUFKLENBQVUsS0FBSyxXQUFMLENBQWpCLEVBSEQ7TUFEbUIsQ0FKaEI7QUFVRCxhQUFRLElBQVIsR0FWQztLQVJMO0lBRGtCLENBQW5CLENBRGdCOzs7O3NCQS9DQTtBQUFDLFVBQU0saUJBQU4sQ0FBRDs7OztRQURHIiwiZmlsZSI6Il9waWN0dXJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZhcmlhbnQgZnJvbSBcIi4vdmFyaWFudFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaWN0dXJlIGV4dGVuZHMgVmFyaWFudHtcclxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm5cInZhcmlhbnQucGljdHVyZVwifVxyXG5cclxuXHRfaW5pdFZhcmlhbnQoKXtcclxuXHRcdHN1cGVyLl9pbml0VmFyaWFudCgpXHJcblxyXG5cdFx0Lyphc3NlbWJsZShjb2RlKSovXHJcblx0XHR0aGlzLnBhcnNlZENvZGUuYm9keVswXT17XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIkV4cHJlc3Npb25TdGF0ZW1lbnRcIixcclxuICAgICAgICAgICAgXCJleHByZXNzaW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkNhbGxFeHByZXNzaW9uXCIsXHJcbiAgICAgICAgICAgICAgICBcImNhbGxlZVwiOiB7XHJcblx0XHRcdFx0XHRcInR5cGVcIjogXCJNZW1iZXJFeHByZXNzaW9uXCIsXHJcblx0XHRcdFx0XHRcImNvbXB1dGVkXCI6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XCJvYmplY3RcIjoge1xyXG5cdFx0XHRcdFx0XHRcInR5cGVcIjogXCJJZGVudGlmaWVyXCIsXHJcblx0XHRcdFx0XHRcdFwibmFtZVwiOiB0aGlzLnZJZFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFwicHJvcGVydHlcIjoge1xyXG5cdFx0XHRcdFx0XHRcInR5cGVcIjogXCJJZGVudGlmaWVyXCIsXHJcblx0XHRcdFx0XHRcdFwibmFtZVwiOiBcImFzc2VtYmxlXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG4gICAgICAgICAgICAgICAgXCJhcmd1bWVudHNcIjogW1xyXG5cdFx0XHRcdFx0dGhpcy5wYXJzZWRDb2RlLmJvZHlbMF0uZXhwcmVzc2lvblxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXNzZW1ibGUodmFsdWUpe1xyXG5cdFx0aWYodmFsdWU9PW51bGwgfHwgdmFsdWU9PXVuZGVmaW5lZCB8fCB2YWx1ZT09Jycpe1xyXG5cdFx0XHR0aGlzLmFzc2VtYmxlZFhtbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuYXNzZW1ibGVkWG1sKVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGxldCBibGlwPXRoaXMuYXNzZW1ibGVkWG1sLiQxKCdncmFwaGljRGF0YSBibGlwJylcclxuXHJcblx0XHRcdHRoaXMuZ2V0SW1hZ2VEYXRhKHZhbHVlKS50aGVuKGRhdGE9PntcclxuXHRcdFx0XHRsZXQgaWQ9dGhpcy5kb2N4UGFydC5hZGRSZWwoe1xyXG5cdFx0XHRcdFx0dHlwZTpcImh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9vZmZpY2VEb2N1bWVudC8yMDA2L3JlbGF0aW9uc2hpcHMvaW1hZ2VcIixcclxuXHRcdFx0XHRcdHRhcmdldDpkYXRhXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRibGlwLnJlbW92ZUF0dHJpYnV0ZShcInI6ZW1iZWRcIilcclxuXHRcdFx0XHRibGlwLnNldEF0dHJpYnV0ZShcInI6bGlua1wiLGlkKVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdFx0c3VwZXIuYXNzZW1ibGUoLi4uYXJndW1lbnRzKVxyXG5cdH1cclxuXHJcblx0Z2V0SW1hZ2VEYXRhKHVybCl7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xyXG5cdFx0XHRpZigkLmlzTm9kZSl7XHJcblx0XHRcdFx0bGV0IHByb3RvPXVybC5zcGxpdChcIjpcIilbMF1cclxuXHRcdFx0XHRsZXQgaHR0cD1yZXF1aXJlKHByb3RvKVxyXG5cdFx0XHRcdGh0dHAucmVxdWVzdCh1cmwsIHJlcz0+e1xyXG5cdFx0XHRcdFx0bGV0IGRhdGE9bmV3IEJ1ZmZlcigpXHJcblx0XHRcdFx0XHRyZXMub24oJ2RhdGEnLGNodW5rPT5kYXRhLmFwcGVuZChjaHVuaykpXHJcblx0XHRcdFx0XHRyZXMub24oJ2VuZCcsICgpPT5yZXNvbHZlKGRhdGEpKVxyXG5cdFx0XHRcdH0pLm9uKFwiZXJyb3JcIiwgZT0+cmVqZWN0KGUpKVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHR2YXIgeG1sSFRUUCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cdFx0XHQgICAgeG1sSFRUUC5vcGVuKCdHRVQnLHVybCx0cnVlKTtcclxuXHRcdFx0ICAgIHhtbEhUVFAucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcclxuXHRcdFx0ICAgIHhtbEhUVFAub25sb2FkID0gZnVuY3Rpb24oZSl7XHJcblx0XHRcdFx0XHRpZih0aGlzLnN0YXR1cz09MjAwKVxyXG5cdFx0XHQgICAgICAgIFx0cmVzb2x2ZSh0aGlzLnJlc3BvbnNlKVxyXG5cdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKHRoaXMucmVwb25zZVRleHQpKVxyXG5cdFx0XHQgICAgfVxyXG5cdFx0XHQgICAgeG1sSFRUUC5zZW5kKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbiJdfQ==