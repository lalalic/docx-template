'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _part = require('docx4js/lib/openxml/part');

var _part2 = _interopRequireDefault(_part);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function isNode() {
	return !!!document;
}

(function (XMLSerializer) {
	Object.assign(_part2.default.prototype, {
		setChanged: function setChanged(a) {
			var _doc$_changedParts = this.doc._changedParts,
			    _changedParts = _doc$_changedParts === undefined ? new Set() : _doc$_changedParts;

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

			var _getFolderAndRelName = this.getFolderAndRelName(),
			    _getFolderAndRelName2 = _slicedToArray(_getFolderAndRelName, 2),
			    folder = _getFolderAndRelName2[0],
			    relName = _getFolderAndRelName2[1];

			var id = 'rId' + (Math.max.apply(Math, _toConsumableArray(Object.keys(this.rels).map(function (a) {
				return parseInt(a.substring(3));
			}))) + 1);
			this.rels[id] = rel;
			var type = rel.type,
			    target = rel.target;

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

			var _getFolderAndRelName3 = this.getFolderAndRelName(),
			    _getFolderAndRelName4 = _slicedToArray(_getFolderAndRelName3, 2),
			    folder = _getFolderAndRelName4[0],
			    relName = _getFolderAndRelName4[1];

			this.doc.getPart(relName).setChanged(true);
		}
	});
})(isNode() ? require("xml" + "dom").XMLSerializer : XMLSerializer);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYXJ0LmpzIl0sIm5hbWVzIjpbImlzTm9kZSIsImRvY3VtZW50IiwiWE1MU2VyaWFsaXplciIsIk9iamVjdCIsImFzc2lnbiIsInByb3RvdHlwZSIsInNldENoYW5nZWQiLCJhIiwiZG9jIiwiX2NoYW5nZWRQYXJ0cyIsIlNldCIsIl9zZXJpYWxpemUiLCJyYXciLCJmaWxlIiwibmFtZSIsInNlcmlhbGl6ZVRvU3RyaW5nIiwiZG9jdW1lbnRFbGVtZW50IiwiZ2V0Rm9sZGVyQW5kUmVsTmFtZSIsImkiLCJsYXN0SW5kZXhPZiIsImZvbGRlciIsInJlbE5hbWUiLCJzdWJzdHJpbmciLCJhZGRSZWwiLCJyZWwiLCJpZCIsIk1hdGgiLCJtYXgiLCJrZXlzIiwicmVscyIsIm1hcCIsInBhcnNlSW50IiwidHlwZSIsInRhcmdldCIsInRhcmdldE1vZGUiLCJlbmRzV2l0aCIsInRhcmdldE5hbWUiLCJ0IiwibWF0Y2giLCJwYXJ0TmFtZSIsInBhcnRzIiwicmVsUGFydCIsImdldFBhcnQiLCJyb290IiwiZWwiLCJvd25lckRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsIm5hbWluZyIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic3Vic3RyIiwiZm9yRWFjaCIsImFwcGVuZENoaWxkIiwicmVtb3ZlUmVsIiwiJDEiLCJyZW1vdmUiLCJyZXF1aXJlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7Ozs7O0FBRUEsU0FBU0EsTUFBVCxHQUFpQjtBQUNoQixRQUFPLENBQUMsQ0FBQyxDQUFDQyxRQUFWO0FBQ0E7O0FBRUQsQ0FBQyxVQUFTQyxhQUFULEVBQXVCO0FBQ3ZCQyxRQUFPQyxNQUFQLENBQWMsZUFBS0MsU0FBbkIsRUFBNkI7QUFDNUJDLFlBRDRCLHNCQUNqQkMsQ0FEaUIsRUFDZjtBQUFBLDRCQUNrQixLQUFLQyxHQUR2QixDQUNQQyxhQURPO0FBQUEsT0FDUEEsYUFETyxzQ0FDTyxJQUFJQyxHQUFKLEVBRFA7O0FBRVos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aW1wb3J0IFBhcnQgZnJvbSBcImRvY3g0anMvbGliL29wZW54bWwvcGFydFwiXHJcblxyXG5mdW5jdGlvbiBpc05vZGUoKXtcclxuXHRyZXR1cm4gISEhZG9jdW1lbnRcclxufVxyXG5cclxuKGZ1bmN0aW9uKFhNTFNlcmlhbGl6ZXIpe1xyXG5cdE9iamVjdC5hc3NpZ24oUGFydC5wcm90b3R5cGUse1xyXG5cdFx0c2V0Q2hhbmdlZChhKXtcclxuXHRcdFx0dmFyIHtfY2hhbmdlZFBhcnRzPW5ldyBTZXQoKX09dGhpcy5kb2NcclxuXHRcdFx0dGhpcy5kb2MuX2NoYW5nZWRQYXJ0cz1fY2hhbmdlZFBhcnRzXHJcblxyXG5cdFx0XHRfY2hhbmdlZFBhcnRzW2EgPyAnYWRkJyA6ICdyZW1vdmUnXSh0aGlzKVxyXG5cdFx0fSxcclxuXHJcblx0XHRfc2VyaWFsaXplKCl7XHJcblx0XHRcdHRoaXMuZG9jLnJhdy5maWxlKHRoaXMubmFtZSwgYDw/eG1sIHZlcnNpb249XCIxLjBcIiBlbmNvZGluZz1cIlVURi04XCIgc3RhbmRhbG9uZT1cInllc1wiPz5cXHJcXG4keyhuZXcgWE1MU2VyaWFsaXplcigpKS5zZXJpYWxpemVUb1N0cmluZyh0aGlzLmRvY3VtZW50RWxlbWVudCl9YClcclxuXHRcdH0sXHJcblxyXG5cdFx0Z2V0Rm9sZGVyQW5kUmVsTmFtZSgpe1xyXG5cdFx0XHR2YXIgbmFtZT10aGlzLm5hbWVcclxuXHRcdFx0dmFyIGk9bmFtZS5sYXN0SW5kZXhPZignLycpLGZvbGRlcixyZWxOYW1lXHJcblx0XHRcdGlmKGkhPT0tMSl7XHJcblx0XHRcdFx0Zm9sZGVyPW5hbWUuc3Vic3RyaW5nKDAsaSlcclxuXHRcdFx0XHRyZWxOYW1lPWZvbGRlcitcIi9fcmVscy9cIituYW1lLnN1YnN0cmluZyhpKzEpK1wiLnJlbHNcIjtcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0Zm9sZGVyPVwiXCJcclxuXHRcdFx0XHRyZWxOYW1lPVwiX3JlbHMvXCIrbmFtZStcIi5yZWxzXCJcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gW2ZvbGRlciwgcmVsTmFtZV1cclxuXHRcdH0sXHJcblxyXG5cdFx0YWRkUmVsKHJlbCl7XHJcblx0XHRcdHZhciBbZm9sZGVyLCByZWxOYW1lXT10aGlzLmdldEZvbGRlckFuZFJlbE5hbWUoKVxyXG5cdFx0XHR2YXIgaWQ9YHJJZCR7TWF0aC5tYXgoLi4uT2JqZWN0LmtleXModGhpcy5yZWxzKS5tYXAoYT0+cGFyc2VJbnQoYS5zdWJzdHJpbmcoMykpKSkrMX1gXHJcblx0XHRcdHRoaXMucmVsc1tpZF09cmVsXHJcblx0XHRcdHZhciB7dHlwZSwgdGFyZ2V0fT1yZWxcclxuXHRcdFx0aWYodHlwZW9mKHRhcmdldCk9PSdzdHJpbmcnKVxyXG5cdFx0XHRcdHJlbC50YXJnZXRNb2RlPVwiRXh0ZXJuYWxcIlxyXG5cdFx0XHRlbHNlIGlmKHR5cGUuZW5kc1dpdGgoXCIvaW1hZ2VcIikpe1xyXG5cdFx0XHRcdGxldCB0YXJnZXROYW1lPVwibWVkaWEvaW1hZ2VcIisoTWF0aC5tYXgoLi4uT2JqZWN0LmtleXModGhpcy5yZWxzKS5tYXAoYT0+e1xyXG5cdFx0XHRcdFx0XHRsZXQgdD10aGlzLnJlbHNbYV1cclxuXHRcdFx0XHRcdFx0aWYodC50eXBlPT0naW1hZ2UnJiYhdC50YXJnZXRNb2RlKVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBwYXJzZUludCh0LnRhcmdldC5tYXRjaCgvXFxkKy8pWzBdfHxcIjBcIilcclxuXHJcblx0XHRcdFx0XHRcdHJldHVybiAwXHJcblx0XHRcdFx0XHR9KSkrMSkrXCIuanBnXCI7XHJcblx0XHRcdFx0bGV0IHBhcnROYW1lPWAke2ZvbGRlcn0vJHt0YXJnZXROYW1lfWBcclxuXHRcdFx0XHR0aGlzLmRvYy5yYXcuZmlsZShwYXJ0TmFtZSwgdGFyZ2V0KVxyXG5cdFx0XHRcdHRoaXMuZG9jLnBhcnRzW3BhcnROYW1lXT10aGlzLmRvYy5yYXcuZmlsZShwYXJ0TmFtZSlcclxuXHRcdFx0XHRyZWwudGFyZ2V0PXBhcnROYW1lXHJcblx0XHRcdFx0dHlwZT1cImltYWdlXCJcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHJlbFBhcnQ9dGhpcy5kb2MuZ2V0UGFydChyZWxOYW1lKVxyXG5cdFx0XHR2YXIgcm9vdD1yZWxQYXJ0LmRvY3VtZW50RWxlbWVudCxcclxuXHRcdFx0XHRlbD1yb290Lm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnUmVsYXRpb25zaGlwJylcclxuXHRcdFx0ZWwuc2V0QXR0cmlidXRlKFwiSWRcIixpZClcclxuXHRcdFx0dmFyIG5hbWluZz0oYSk9PmEuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkrYS5zdWJzdHIoMSlcclxuXHRcdFx0T2JqZWN0LmtleXMocmVsKS5mb3JFYWNoKGE9PmVsLnNldEF0dHJpYnV0ZShuYW1pbmcoYSkscmVsW2FdKSlcclxuXHRcdFx0cm9vdC5hcHBlbmRDaGlsZChlbClcclxuXHRcdFx0cmVsLnR5cGU9dHlwZVxyXG5cdFx0XHRyZWxQYXJ0LnNldENoYW5nZWQodHJ1ZSlcclxuXHRcdFx0cmV0dXJuIGlkXHJcblx0XHR9LFxyXG5cclxuXHRcdHJlbW92ZVJlbChpZCl7XHJcblx0XHRcdGRlbGV0ZSB0aGlzLnJlbHNbaWRdXHJcblx0XHRcdHRoaXMuZG9jdW1lbnRFbGVtZW50LiQxKGBSZWxhdGlvbnNoaXBbSWQ9JHtpZH1dYCkucmVtb3ZlKClcclxuXHRcdFx0dmFyIFtmb2xkZXIsIHJlbE5hbWVdPXRoaXMuZ2V0Rm9sZGVyQW5kUmVsTmFtZSgpXHJcblx0XHRcdHRoaXMuZG9jLmdldFBhcnQocmVsTmFtZSkuc2V0Q2hhbmdlZCh0cnVlKVxyXG5cdFx0fVxyXG5cdH0pXHJcbn0pKGlzTm9kZSgpID8gcmVxdWlyZShcInhtbFwiK1wiZG9tXCIpLlhNTFNlcmlhbGl6ZXIgOiBYTUxTZXJpYWxpemVyKVxyXG4iXX0=