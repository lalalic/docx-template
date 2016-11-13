'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _part = require('docx4js/lib/openxml/part');

var _part2 = _interopRequireDefault(_part);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isNode() {
	return !!!document;
}

(function (XMLSerializer) {
	(0, _assign2.default)(_part2.default.prototype, {
		setChanged: function setChanged(a) {
			var _doc$_changedParts = this.doc._changedParts;

			var _changedParts = _doc$_changedParts === undefined ? new _set2.default() : _doc$_changedParts;

			this.doc._changedParts = _changedParts;

			_changedParts[a ? 'add' : 'remove'](this);
		},
		_serialize: function _serialize() {
			this.doc.raw.file(this.name, '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' + new XMLSerializer().serializeToString(this.documentElement));
		},
		getFolderAndRelName: function getFolderAndRelName() {
			var name = this.name;
			var i = name.lastIndexOf('/'),
			    folder,
			    relName;
			if (i !== -1) {
				folder = name.substring(0, i);
				relName = folder + "/_rels/" + name.substring(i + 1) + ".rels";
			} else {
				folder = "";
				relName = "_rels/" + name + ".rels";
			}
			return [folder, relName];
		},
		addRel: function addRel(rel) {
			var _this = this;

			var _getFolderAndRelName = this.getFolderAndRelName();

			var _getFolderAndRelName2 = (0, _slicedToArray3.default)(_getFolderAndRelName, 2);

			var folder = _getFolderAndRelName2[0];
			var relName = _getFolderAndRelName2[1];

			var id = 'rId' + (Math.max.apply(Math, (0, _toConsumableArray3.default)((0, _keys2.default)(this.rels).map(function (a) {
				return parseInt(a.substring(3));
			}))) + 1);
			this.rels[id] = rel;
			var type = rel.type;
			var target = rel.target;

			if (typeof target == 'string') rel.targetMode = "External";else if (type.endsWith("/image")) {
				var targetName = "media/image" + (Math.max.apply(Math, (0, _toConsumableArray3.default)((0, _keys2.default)(this.rels).map(function (a) {
					var t = _this.rels[a];
					if (t.type == 'image' && !t.targetMode) return parseInt(t.target.match(/\d+/)[0] || "0");

					return 0;
				}))) + 1) + ".jpg";
				var partName = folder + '/' + targetName;
				this.doc.raw.file(partName, target);
				this.doc.parts[partName] = this.doc.raw.file(partName);
				rel.target = partName;
				type = "image";
			}

			var relPart = this.doc.getPart(relName);
			var root = relPart.documentElement,
			    el = root.ownerDocument.createElement('Relationship');
			el.setAttribute("Id", id);
			var naming = function naming(a) {
				return a.charAt(0).toUpperCase() + a.substr(1);
			};
			(0, _keys2.default)(rel).forEach(function (a) {
				return el.setAttribute(naming(a), rel[a]);
			});
			root.appendChild(el);
			rel.type = type;
			relPart.setChanged(true);
			return id;
		},
		removeRel: function removeRel(id) {
			delete this.rels[id];
			this.documentElement.$1('Relationship[Id=' + id + ']').remove();

			var _getFolderAndRelName3 = this.getFolderAndRelName();

			var _getFolderAndRelName4 = (0, _slicedToArray3.default)(_getFolderAndRelName3, 2);

			var folder = _getFolderAndRelName4[0];
			var relName = _getFolderAndRelName4[1];

			this.doc.getPart(relName).setChanged(true);
		}
	});
})(isNode() ? require("xml" + "dom").XMLSerializer : XMLSerializer);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYXJ0LmpzIl0sIm5hbWVzIjpbImlzTm9kZSIsImRvY3VtZW50IiwiWE1MU2VyaWFsaXplciIsInByb3RvdHlwZSIsInNldENoYW5nZWQiLCJhIiwiZG9jIiwiX2NoYW5nZWRQYXJ0cyIsIl9zZXJpYWxpemUiLCJyYXciLCJmaWxlIiwibmFtZSIsInNlcmlhbGl6ZVRvU3RyaW5nIiwiZG9jdW1lbnRFbGVtZW50IiwiZ2V0Rm9sZGVyQW5kUmVsTmFtZSIsImkiLCJsYXN0SW5kZXhPZiIsImZvbGRlciIsInJlbE5hbWUiLCJzdWJzdHJpbmciLCJhZGRSZWwiLCJyZWwiLCJpZCIsIk1hdGgiLCJtYXgiLCJyZWxzIiwibWFwIiwicGFyc2VJbnQiLCJ0eXBlIiwidGFyZ2V0IiwidGFyZ2V0TW9kZSIsImVuZHNXaXRoIiwidGFyZ2V0TmFtZSIsInQiLCJtYXRjaCIsInBhcnROYW1lIiwicGFydHMiLCJyZWxQYXJ0IiwiZ2V0UGFydCIsInJvb3QiLCJlbCIsIm93bmVyRG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwibmFtaW5nIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzdWJzdHIiLCJmb3JFYWNoIiwiYXBwZW5kQ2hpbGQiLCJyZW1vdmVSZWwiLCIkMSIsInJlbW92ZSIsInJlcXVpcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBRUEsU0FBU0EsTUFBVCxHQUFpQjtBQUNoQixRQUFPLENBQUMsQ0FBQyxDQUFDQyxRQUFWO0FBQ0E7O0FBRUQsQ0FBQyxVQUFTQyxhQUFULEVBQXVCO0FBQ3ZCLHVCQUFjLGVBQUtDLFNBQW5CLEVBQTZCO0FBQzVCQyxZQUQ0QixzQkFDakJDLENBRGlCLEVBQ2Y7QUFBQSw0QkFDa0IsS0FBS0MsR0FEdkIsQ0FDUEMsYUFETzs7QUFBQSxPQUNQQSxhQURPLHNDQUNPLG1CQURQOztBQUVaLFFBQUtELEdBQUwsQ0FBU0MsYUFBVCxHQUF1QkEsYUFBdkI7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QWlDLGNBQWpDLENBREo7QUFFQUYsTUFBR0csWUFBSCxDQUFnQixJQUFoQixFQUFxQnJCLEVBQXJCO0FBQ0EsT0FBSXNCLFNBQU8sU0FBUEEsTUFBTyxDQUFDdkMsQ0FBRDtBQUFBLFdBQUtBLEVBQUV3QyxNQUFGLENBQVMsQ0FBVCxFQUFZQyxXQUFaLEtBQTBCekMsRUFBRTBDLE1BQUYsQ0FBUyxDQUFULENBQS9CO0FBQUEsSUFBWDtBQUNBLHVCQUFZMUIsR0FBWixFQUFpQjJCLE9BQWpCLENBQXlCO0FBQUEsV0FBR1IsR0FBR0csWUFBSCxDQUFnQkMsT0FBT3ZDLENBQVAsQ0FBaEIsRUFBMEJnQixJQUFJaEIsQ0FBSixDQUExQixDQUFIO0FBQUEsSUFBekI7QUFDQWtDLFFBQUtVLFdBQUwsQ0FBaUJULEVBQWpCO0FBQ0FuQixPQUFJTyxJQUFKLEdBQVNBLElBQVQ7QUFDQVMsV0FBUWpDLFVBQVIsQ0FBbUIsSUFBbkI7QUFDQSxVQUFPa0IsRUFBUDtBQUNBLEdBekQyQjtBQTJENUI0QixXQTNENEIscUJBMkRsQjVCLEVBM0RrQixFQTJEZjtBQUNaLFVBQU8sS0FBS0csSUFBTCxDQUFVSCxFQUFWLENBQVA7QUFDQSxRQUFLVCxlQUFMLENBQXFCc0MsRUFBckIsc0JBQTJDN0IsRUFBM0MsUUFBa0Q4QixNQUFsRDs7QUFGWSwrQkFHVSxLQUFLdEMsbUJBQUwsRUFIVjs7QUFBQTs7QUFBQSxPQUdQRyxNQUhPO0FBQUEsT0FHQ0MsT0FIRDs7QUFJWixRQUFLWixHQUFMLENBQVNnQyxPQUFULENBQWlCcEIsT0FBakIsRUFBMEJkLFVBQTFCLENBQXFDLElBQXJDO0FBQ0E7QUFoRTJCLEVBQTdCO0FBa0VBLENBbkVELEVBbUVHSixXQUFXcUQsUUFBUSxRQUFNLEtBQWQsRUFBcUJuRCxhQUFoQyxHQUFnREEsYUFuRW5EIiwiZmlsZSI6InBhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFydCBmcm9tIFwiZG9jeDRqcy9saWIvb3BlbnhtbC9wYXJ0XCJcclxuXHJcbmZ1bmN0aW9uIGlzTm9kZSgpe1xyXG5cdHJldHVybiAhISFkb2N1bWVudFxyXG59XHJcblxyXG4oZnVuY3Rpb24oWE1MU2VyaWFsaXplcil7XHJcblx0T2JqZWN0LmFzc2lnbihQYXJ0LnByb3RvdHlwZSx7XHJcblx0XHRzZXRDaGFuZ2VkKGEpe1xyXG5cdFx0XHR2YXIge19jaGFuZ2VkUGFydHM9bmV3IFNldCgpfT10aGlzLmRvY1xyXG5cdFx0XHR0aGlzLmRvYy5fY2hhbmdlZFBhcnRzPV9jaGFuZ2VkUGFydHNcclxuXHJcblx0XHRcdF9jaGFuZ2VkUGFydHNbYSA/ICdhZGQnIDogJ3JlbW92ZSddKHRoaXMpXHJcblx0XHR9LFxyXG5cclxuXHRcdF9zZXJpYWxpemUoKXtcclxuXHRcdFx0dGhpcy5kb2MucmF3LmZpbGUodGhpcy5uYW1lLCBgPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwiVVRGLThcIiBzdGFuZGFsb25lPVwieWVzXCI/PlxcclxcbiR7KG5ldyBYTUxTZXJpYWxpemVyKCkpLnNlcmlhbGl6ZVRvU3RyaW5nKHRoaXMuZG9jdW1lbnRFbGVtZW50KX1gKVxyXG5cdFx0fSxcclxuXHJcblx0XHRnZXRGb2xkZXJBbmRSZWxOYW1lKCl7XHJcblx0XHRcdHZhciBuYW1lPXRoaXMubmFtZVxyXG5cdFx0XHR2YXIgaT1uYW1lLmxhc3RJbmRleE9mKCcvJyksZm9sZGVyLHJlbE5hbWVcclxuXHRcdFx0aWYoaSE9PS0xKXtcclxuXHRcdFx0XHRmb2xkZXI9bmFtZS5zdWJzdHJpbmcoMCxpKVxyXG5cdFx0XHRcdHJlbE5hbWU9Zm9sZGVyK1wiL19yZWxzL1wiK25hbWUuc3Vic3RyaW5nKGkrMSkrXCIucmVsc1wiO1xyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRmb2xkZXI9XCJcIlxyXG5cdFx0XHRcdHJlbE5hbWU9XCJfcmVscy9cIituYW1lK1wiLnJlbHNcIlxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBbZm9sZGVyLCByZWxOYW1lXVxyXG5cdFx0fSxcclxuXHJcblx0XHRhZGRSZWwocmVsKXtcclxuXHRcdFx0dmFyIFtmb2xkZXIsIHJlbE5hbWVdPXRoaXMuZ2V0Rm9sZGVyQW5kUmVsTmFtZSgpXHJcblx0XHRcdHZhciBpZD1gcklkJHtNYXRoLm1heCguLi5PYmplY3Qua2V5cyh0aGlzLnJlbHMpLm1hcChhPT5wYXJzZUludChhLnN1YnN0cmluZygzKSkpKSsxfWBcclxuXHRcdFx0dGhpcy5yZWxzW2lkXT1yZWxcclxuXHRcdFx0dmFyIHt0eXBlLCB0YXJnZXR9PXJlbFxyXG5cdFx0XHRpZih0eXBlb2YodGFyZ2V0KT09J3N0cmluZycpXHJcblx0XHRcdFx0cmVsLnRhcmdldE1vZGU9XCJFeHRlcm5hbFwiXHJcblx0XHRcdGVsc2UgaWYodHlwZS5lbmRzV2l0aChcIi9pbWFnZVwiKSl7XHJcblx0XHRcdFx0bGV0IHRhcmdldE5hbWU9XCJtZWRpYS9pbWFnZVwiKyhNYXRoLm1heCguLi5PYmplY3Qua2V5cyh0aGlzLnJlbHMpLm1hcChhPT57XHJcblx0XHRcdFx0XHRcdGxldCB0PXRoaXMucmVsc1thXVxyXG5cdFx0XHRcdFx0XHRpZih0LnR5cGU9PSdpbWFnZScmJiF0LnRhcmdldE1vZGUpXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHBhcnNlSW50KHQudGFyZ2V0Lm1hdGNoKC9cXGQrLylbMF18fFwiMFwiKVxyXG5cclxuXHRcdFx0XHRcdFx0cmV0dXJuIDBcclxuXHRcdFx0XHRcdH0pKSsxKStcIi5qcGdcIjtcclxuXHRcdFx0XHRsZXQgcGFydE5hbWU9YCR7Zm9sZGVyfS8ke3RhcmdldE5hbWV9YFxyXG5cdFx0XHRcdHRoaXMuZG9jLnJhdy5maWxlKHBhcnROYW1lLCB0YXJnZXQpXHJcblx0XHRcdFx0dGhpcy5kb2MucGFydHNbcGFydE5hbWVdPXRoaXMuZG9jLnJhdy5maWxlKHBhcnROYW1lKVxyXG5cdFx0XHRcdHJlbC50YXJnZXQ9cGFydE5hbWVcclxuXHRcdFx0XHR0eXBlPVwiaW1hZ2VcIlxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgcmVsUGFydD10aGlzLmRvYy5nZXRQYXJ0KHJlbE5hbWUpXHJcblx0XHRcdHZhciByb290PXJlbFBhcnQuZG9jdW1lbnRFbGVtZW50LFxyXG5cdFx0XHRcdGVsPXJvb3Qub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdSZWxhdGlvbnNoaXAnKVxyXG5cdFx0XHRlbC5zZXRBdHRyaWJ1dGUoXCJJZFwiLGlkKVxyXG5cdFx0XHR2YXIgbmFtaW5nPShhKT0+YS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSthLnN1YnN0cigxKVxyXG5cdFx0XHRPYmplY3Qua2V5cyhyZWwpLmZvckVhY2goYT0+ZWwuc2V0QXR0cmlidXRlKG5hbWluZyhhKSxyZWxbYV0pKVxyXG5cdFx0XHRyb290LmFwcGVuZENoaWxkKGVsKVxyXG5cdFx0XHRyZWwudHlwZT10eXBlXHJcblx0XHRcdHJlbFBhcnQuc2V0Q2hhbmdlZCh0cnVlKVxyXG5cdFx0XHRyZXR1cm4gaWRcclxuXHRcdH0sXHJcblxyXG5cdFx0cmVtb3ZlUmVsKGlkKXtcclxuXHRcdFx0ZGVsZXRlIHRoaXMucmVsc1tpZF1cclxuXHRcdFx0dGhpcy5kb2N1bWVudEVsZW1lbnQuJDEoYFJlbGF0aW9uc2hpcFtJZD0ke2lkfV1gKS5yZW1vdmUoKVxyXG5cdFx0XHR2YXIgW2ZvbGRlciwgcmVsTmFtZV09dGhpcy5nZXRGb2xkZXJBbmRSZWxOYW1lKClcclxuXHRcdFx0dGhpcy5kb2MuZ2V0UGFydChyZWxOYW1lKS5zZXRDaGFuZ2VkKHRydWUpXHJcblx0XHR9XHJcblx0fSlcclxufSkoaXNOb2RlKCkgPyByZXF1aXJlKFwieG1sXCIrXCJkb21cIikuWE1MU2VyaWFsaXplciA6IFhNTFNlcmlhbGl6ZXIpXHJcbiJdfQ==