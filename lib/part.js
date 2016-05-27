'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _part = require('docx4js/lib/openxml/part');

var _part2 = _interopRequireDefault(_part);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function (XMLSerializer) {
	Object.assign(_part2.default.prototype, {
		setChanged: function setChanged(a) {
			var _doc$_changedParts = this.doc._changedParts;

			var _changedParts = _doc$_changedParts === undefined ? new Set() : _doc$_changedParts;

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

			var _getFolderAndRelName2 = _slicedToArray(_getFolderAndRelName, 2);

			var folder = _getFolderAndRelName2[0];
			var relName = _getFolderAndRelName2[1];

			var id = 'rId' + (Math.max.apply(Math, _toConsumableArray(Object.keys(this.rels).map(function (a) {
				return parseInt(a.substring(3));
			}))) + 1);
			this.rels[id] = rel;
			var type = rel.type;
			var target = rel.target;

			if (typeof target == 'string') rel.targetMode = "External";else if (type.endsWith("/image")) {
				var targetName = "media/image" + (Math.max.apply(Math, _toConsumableArray(Object.keys(this.rels).map(function (a) {
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
			Object.keys(rel).forEach(function (a) {
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

			var _getFolderAndRelName4 = _slicedToArray(_getFolderAndRelName3, 2);

			var folder = _getFolderAndRelName4[0];
			var relName = _getFolderAndRelName4[1];

			this.doc.getPart(relName).setChanged(true);
		}
	});
})($.isNode ? require("xml" + "dom").XMLSerializer : XMLSerializer);
//# sourceMappingURL=data:application/json;base64,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aEQsQ0FuRUgiLCJmaWxlIjoicGFydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJ0IGZyb20gXCJkb2N4NGpzL2xpYi9vcGVueG1sL3BhcnRcIlxyXG5cclxuKGZ1bmN0aW9uKFhNTFNlcmlhbGl6ZXIpe1xyXG5cdE9iamVjdC5hc3NpZ24oUGFydC5wcm90b3R5cGUse1xyXG5cdFx0c2V0Q2hhbmdlZChhKXtcclxuXHRcdFx0dmFyIHtfY2hhbmdlZFBhcnRzPW5ldyBTZXQoKX09dGhpcy5kb2NcclxuXHRcdFx0dGhpcy5kb2MuX2NoYW5nZWRQYXJ0cz1fY2hhbmdlZFBhcnRzXHJcblxyXG5cdFx0XHRfY2hhbmdlZFBhcnRzW2EgPyAnYWRkJyA6ICdyZW1vdmUnXSh0aGlzKVxyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0X3NlcmlhbGl6ZSgpe1xyXG5cdFx0XHR0aGlzLmRvYy5yYXcuZmlsZSh0aGlzLm5hbWUsIGA8P3htbCB2ZXJzaW9uPVwiMS4wXCIgZW5jb2Rpbmc9XCJVVEYtOFwiIHN0YW5kYWxvbmU9XCJ5ZXNcIj8+XFxyXFxuJHsobmV3IFhNTFNlcmlhbGl6ZXIoKSkuc2VyaWFsaXplVG9TdHJpbmcodGhpcy5kb2N1bWVudEVsZW1lbnQpfWApXHJcblx0XHR9LFxyXG5cclxuXHRcdGdldEZvbGRlckFuZFJlbE5hbWUoKXtcclxuXHRcdFx0dmFyIG5hbWU9dGhpcy5uYW1lXHJcblx0XHRcdHZhciBpPW5hbWUubGFzdEluZGV4T2YoJy8nKSxmb2xkZXIscmVsTmFtZVxyXG5cdFx0XHRpZihpIT09LTEpe1xyXG5cdFx0XHRcdGZvbGRlcj1uYW1lLnN1YnN0cmluZygwLGkpXHJcblx0XHRcdFx0cmVsTmFtZT1mb2xkZXIrXCIvX3JlbHMvXCIrbmFtZS5zdWJzdHJpbmcoaSsxKStcIi5yZWxzXCI7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGZvbGRlcj1cIlwiXHJcblx0XHRcdFx0cmVsTmFtZT1cIl9yZWxzL1wiK25hbWUrXCIucmVsc1wiXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIFtmb2xkZXIsIHJlbE5hbWVdXHJcblx0XHR9LFxyXG5cclxuXHRcdGFkZFJlbChyZWwpe1xyXG5cdFx0XHR2YXIgW2ZvbGRlciwgcmVsTmFtZV09dGhpcy5nZXRGb2xkZXJBbmRSZWxOYW1lKClcclxuXHRcdFx0dmFyIGlkPWBySWQke01hdGgubWF4KC4uLk9iamVjdC5rZXlzKHRoaXMucmVscykubWFwKGE9PnBhcnNlSW50KGEuc3Vic3RyaW5nKDMpKSkpKzF9YFxyXG5cdFx0XHR0aGlzLnJlbHNbaWRdPXJlbFxyXG5cdFx0XHR2YXIge3R5cGUsIHRhcmdldH09cmVsXHJcblx0XHRcdGlmKHR5cGVvZih0YXJnZXQpPT0nc3RyaW5nJylcclxuXHRcdFx0XHRyZWwudGFyZ2V0TW9kZT1cIkV4dGVybmFsXCJcclxuXHRcdFx0ZWxzZSBpZih0eXBlLmVuZHNXaXRoKFwiL2ltYWdlXCIpKXtcclxuXHRcdFx0XHRsZXQgdGFyZ2V0TmFtZT1cIm1lZGlhL2ltYWdlXCIrKE1hdGgubWF4KC4uLk9iamVjdC5rZXlzKHRoaXMucmVscykubWFwKGE9PntcclxuXHRcdFx0XHRcdFx0bGV0IHQ9dGhpcy5yZWxzW2FdXHJcblx0XHRcdFx0XHRcdGlmKHQudHlwZT09J2ltYWdlJyYmIXQudGFyZ2V0TW9kZSlcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcGFyc2VJbnQodC50YXJnZXQubWF0Y2goL1xcZCsvKVswXXx8XCIwXCIpXHJcblxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gMFxyXG5cdFx0XHRcdFx0fSkpKzEpK1wiLmpwZ1wiO1xyXG5cdFx0XHRcdGxldCBwYXJ0TmFtZT1gJHtmb2xkZXJ9LyR7dGFyZ2V0TmFtZX1gXHJcblx0XHRcdFx0dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUsIHRhcmdldClcclxuXHRcdFx0XHR0aGlzLmRvYy5wYXJ0c1twYXJ0TmFtZV09dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUpXHJcblx0XHRcdFx0cmVsLnRhcmdldD1wYXJ0TmFtZVxyXG5cdFx0XHRcdHR5cGU9XCJpbWFnZVwiXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciByZWxQYXJ0PXRoaXMuZG9jLmdldFBhcnQocmVsTmFtZSlcclxuXHRcdFx0dmFyIHJvb3Q9cmVsUGFydC5kb2N1bWVudEVsZW1lbnQsXHJcblx0XHRcdFx0ZWw9cm9vdC5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1JlbGF0aW9uc2hpcCcpXHJcblx0XHRcdGVsLnNldEF0dHJpYnV0ZShcIklkXCIsaWQpXHJcblx0XHRcdHZhciBuYW1pbmc9KGEpPT5hLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK2Euc3Vic3RyKDEpXHJcblx0XHRcdE9iamVjdC5rZXlzKHJlbCkuZm9yRWFjaChhPT5lbC5zZXRBdHRyaWJ1dGUobmFtaW5nKGEpLHJlbFthXSkpXHJcblx0XHRcdHJvb3QuYXBwZW5kQ2hpbGQoZWwpXHJcblx0XHRcdHJlbC50eXBlPXR5cGVcclxuXHRcdFx0cmVsUGFydC5zZXRDaGFuZ2VkKHRydWUpXHJcblx0XHRcdHJldHVybiBpZFxyXG5cdFx0fSxcclxuXHJcblx0XHRyZW1vdmVSZWwoaWQpe1xyXG5cdFx0XHRkZWxldGUgdGhpcy5yZWxzW2lkXVxyXG5cdFx0XHR0aGlzLmRvY3VtZW50RWxlbWVudC4kMShgUmVsYXRpb25zaGlwW0lkPSR7aWR9XWApLnJlbW92ZSgpXHJcblx0XHRcdHZhciBbZm9sZGVyLCByZWxOYW1lXT10aGlzLmdldEZvbGRlckFuZFJlbE5hbWUoKVxyXG5cdFx0XHR0aGlzLmRvYy5nZXRQYXJ0KHJlbE5hbWUpLnNldENoYW5nZWQodHJ1ZSlcclxuXHRcdH1cclxuXHR9KVxyXG59KSgkLmlzTm9kZSA/IHJlcXVpcmUoXCJ4bWxcIitcImRvbVwiKS5YTUxTZXJpYWxpemVyIDogWE1MU2VyaWFsaXplcikiXX0=