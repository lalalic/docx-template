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
						blip.setAttribute("r:embed", id);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9fcGljdHVyZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7aUNBR047QUFDYiw4QkFKbUIsb0RBSW5COzs7QUFEYSxPQUliLENBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQixDQUFyQixJQUF3QjtBQUNkLFlBQVEscUJBQVI7QUFDQSxrQkFBYztBQUNWLGFBQVEsZ0JBQVI7QUFDQSxlQUFVO0FBQ3JCLGNBQVEsa0JBQVI7QUFDQSxrQkFBWSxLQUFaO0FBQ0EsZ0JBQVU7QUFDVCxlQUFRLFlBQVI7QUFDQSxlQUFRLEtBQUssR0FBTDtPQUZUO0FBSUEsa0JBQVk7QUFDWCxlQUFRLFlBQVI7QUFDQSxlQUFRLFVBQVI7T0FGRDtNQVBXO0FBWUEsa0JBQWEsQ0FDeEIsS0FBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCLENBQXJCLEVBQXdCLFVBQXhCLENBRFc7S0FkSjtJQUZWLENBSmE7Ozs7MkJBMkJMLE9BQU07OztBQUNkLE9BQUcsU0FBTyxJQUFQLElBQWUsU0FBTyxTQUFQLElBQW9CLFNBQU8sRUFBUCxFQUFVO0FBQy9DLFNBQUssWUFBTCxDQUFrQixVQUFsQixDQUE2QixXQUE3QixDQUF5QyxLQUFLLFlBQUwsQ0FBekMsQ0FEK0M7SUFBaEQsTUFFSzs7QUFDSixTQUFJLE9BQUssT0FBSyxZQUFMLENBQWtCLEVBQWxCLENBQXFCLGtCQUFyQixDQUFMOztBQUVKLFlBQUssWUFBTCxDQUFrQixLQUFsQixFQUF5QixJQUF6QixDQUE4QixnQkFBTTtBQUNuQyxVQUFJLEtBQUcsT0FBSyxRQUFMLENBQWMsTUFBZCxDQUFxQjtBQUMzQixhQUFLLDJFQUFMO0FBQ0EsZUFBTyxJQUFQO09BRk0sQ0FBSCxDQUQrQjtBQUtuQyxXQUFLLFlBQUwsQ0FBa0IsU0FBbEIsRUFBNkIsRUFBN0IsRUFMbUM7TUFBTixDQUE5QjtTQUhJO0lBRkw7QUFhQSw4QkE1Q21CLGtEQTRDRCxVQUFsQixDQWRjOzs7OytCQWlCRixLQUFJO0FBQ2hCLFVBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVMsTUFBVCxFQUFrQjtBQUNwQyxRQUFHLEVBQUUsTUFBRixFQUFTO0FBQ1gsU0FBSSxRQUFNLElBQUksS0FBSixDQUFVLEdBQVYsRUFBZSxDQUFmLENBQU4sQ0FETztBQUVYLFNBQUksT0FBSyxRQUFRLEtBQVIsQ0FBTCxDQUZPO0FBR1gsVUFBSyxPQUFMLENBQWEsR0FBYixFQUFrQixlQUFLO0FBQ3RCLFVBQUksT0FBSyxJQUFJLE1BQUosRUFBTCxDQURrQjtBQUV0QixVQUFJLEVBQUosQ0FBTyxNQUFQLEVBQWM7Y0FBTyxLQUFLLE1BQUwsQ0FBWSxLQUFaO09BQVAsQ0FBZCxDQUZzQjtBQUd0QixVQUFJLEVBQUosQ0FBTyxLQUFQLEVBQWM7Y0FBSSxRQUFRLElBQVI7T0FBSixDQUFkLENBSHNCO01BQUwsQ0FBbEIsQ0FJRyxFQUpILENBSU0sT0FKTixFQUllO2FBQUcsT0FBTyxDQUFQO01BQUgsQ0FKZixDQUhXO0tBQVosTUFRSztBQUNKLFNBQUksVUFBVSxJQUFJLGNBQUosRUFBVixDQURBO0FBRUQsYUFBUSxJQUFSLENBQWEsS0FBYixFQUFtQixHQUFuQixFQUF1QixJQUF2QixFQUZDO0FBR0QsYUFBUSxZQUFSLEdBQXVCLGFBQXZCLENBSEM7QUFJRCxhQUFRLE1BQVIsR0FBaUIsVUFBUyxDQUFULEVBQVc7QUFDOUIsVUFBRyxLQUFLLE1BQUwsSUFBYSxHQUFiLEVBQ0ksUUFBUSxLQUFLLFFBQUwsQ0FBUixDQURQLEtBR0MsT0FBTyxJQUFJLEtBQUosQ0FBVSxLQUFLLFdBQUwsQ0FBakIsRUFIRDtNQURtQixDQUpoQjtBQVVELGFBQVEsSUFBUixHQVZDO0tBUkw7SUFEa0IsQ0FBbkIsQ0FEZ0I7Ozs7c0JBOUNBO0FBQUMsVUFBTSxpQkFBTixDQUFEOzs7O1FBREciLCJmaWxlIjoiX3BpY3R1cmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmFyaWFudCBmcm9tIFwiLi92YXJpYW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBpY3R1cmUgZXh0ZW5kcyBWYXJpYW50e1xyXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVyblwidmFyaWFudC5waWN0dXJlXCJ9XHJcblxyXG5cdF9pbml0VmFyaWFudCgpe1xyXG5cdFx0c3VwZXIuX2luaXRWYXJpYW50KClcclxuXHJcblx0XHQvKmFzc2VtYmxlKGNvZGUpKi9cclxuXHRcdHRoaXMucGFyc2VkQ29kZS5ib2R5WzBdPXtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiRXhwcmVzc2lvblN0YXRlbWVudFwiLFxyXG4gICAgICAgICAgICBcImV4cHJlc3Npb25cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiQ2FsbEV4cHJlc3Npb25cIixcclxuICAgICAgICAgICAgICAgIFwiY2FsbGVlXCI6IHtcclxuXHRcdFx0XHRcdFwidHlwZVwiOiBcIk1lbWJlckV4cHJlc3Npb25cIixcclxuXHRcdFx0XHRcdFwiY29tcHV0ZWRcIjogZmFsc2UsXHJcblx0XHRcdFx0XHRcIm9iamVjdFwiOiB7XHJcblx0XHRcdFx0XHRcdFwidHlwZVwiOiBcIklkZW50aWZpZXJcIixcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IHRoaXMudklkXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XCJwcm9wZXJ0eVwiOiB7XHJcblx0XHRcdFx0XHRcdFwidHlwZVwiOiBcIklkZW50aWZpZXJcIixcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IFwiYXNzZW1ibGVcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcbiAgICAgICAgICAgICAgICBcImFyZ3VtZW50c1wiOiBbXHJcblx0XHRcdFx0XHR0aGlzLnBhcnNlZENvZGUuYm9keVswXS5leHByZXNzaW9uXHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhc3NlbWJsZSh2YWx1ZSl7XHJcblx0XHRpZih2YWx1ZT09bnVsbCB8fCB2YWx1ZT09dW5kZWZpbmVkIHx8IHZhbHVlPT0nJyl7XHJcblx0XHRcdHRoaXMuYXNzZW1ibGVkWG1sLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5hc3NlbWJsZWRYbWwpXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0bGV0IGJsaXA9dGhpcy5hc3NlbWJsZWRYbWwuJDEoJ2dyYXBoaWNEYXRhIGJsaXAnKVxyXG5cclxuXHRcdFx0dGhpcy5nZXRJbWFnZURhdGEodmFsdWUpLnRoZW4oZGF0YT0+e1xyXG5cdFx0XHRcdGxldCBpZD10aGlzLmRvY3hQYXJ0LmFkZFJlbCh7XHJcblx0XHRcdFx0XHR0eXBlOlwiaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcy9pbWFnZVwiLFxyXG5cdFx0XHRcdFx0dGFyZ2V0OmRhdGFcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdGJsaXAuc2V0QXR0cmlidXRlKFwicjplbWJlZFwiLCBpZClcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHRcdHN1cGVyLmFzc2VtYmxlKC4uLmFyZ3VtZW50cylcclxuXHR9XHJcblxyXG5cdGdldEltYWdlRGF0YSh1cmwpe1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuXHRcdFx0aWYoJC5pc05vZGUpe1xyXG5cdFx0XHRcdGxldCBwcm90bz11cmwuc3BsaXQoXCI6XCIpWzBdXHJcblx0XHRcdFx0bGV0IGh0dHA9cmVxdWlyZShwcm90bylcclxuXHRcdFx0XHRodHRwLnJlcXVlc3QodXJsLCByZXM9PntcclxuXHRcdFx0XHRcdGxldCBkYXRhPW5ldyBCdWZmZXIoKVxyXG5cdFx0XHRcdFx0cmVzLm9uKCdkYXRhJyxjaHVuaz0+ZGF0YS5hcHBlbmQoY2h1bmspKVxyXG5cdFx0XHRcdFx0cmVzLm9uKCdlbmQnLCAoKT0+cmVzb2x2ZShkYXRhKSlcclxuXHRcdFx0XHR9KS5vbihcImVycm9yXCIsIGU9PnJlamVjdChlKSlcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0dmFyIHhtbEhUVFAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHRcdFx0ICAgIHhtbEhUVFAub3BlbignR0VUJyx1cmwsdHJ1ZSk7XHJcblx0XHRcdCAgICB4bWxIVFRQLnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XHJcblx0XHRcdCAgICB4bWxIVFRQLm9ubG9hZCA9IGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRcdFx0aWYodGhpcy5zdGF0dXM9PTIwMClcclxuXHRcdFx0ICAgICAgICBcdHJlc29sdmUodGhpcy5yZXNwb25zZSlcclxuXHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcih0aGlzLnJlcG9uc2VUZXh0KSlcclxuXHRcdFx0ICAgIH1cclxuXHRcdFx0ICAgIHhtbEhUVFAuc2VuZCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG4iXX0=