"use strict";

Object.defineProperty(exports, "__esModule", {
				value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = newDocx;

var _jszip = require("jszip");

var _jszip2 = _interopRequireDefault(_jszip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function newDocx() {
				var content = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

				if (typeof content == 'string') content = { "word/document.xml": content };
				var zip = new _jszip2.default();

				content = content || {};

				for (var key in DOCX) {
								var defaultValue = DOCX[key],
								    defaultType = typeof defaultValue === "undefined" ? "undefined" : _typeof(defaultValue);

								var value = content[key];
								var finalValue = "<a/>";
								if (value) {
												if (defaultType == 'function') finalValue = defaultValue(value);else finalValue = value;
								} else if (defaultType == 'function') finalValue = defaultValue();else if (defaultType == 'string') finalValue = defaultValue;

								zip.file(key, finalValue);
				}

				var blob = zip.generate({ type: "blob", mimeType: "application/docx", compression: "DEFLATE" });
				blob.name = "a.docx";
				return blob;
}

var DOCX = {
				"[Content_Types].xml": "<Types xmlns=\"http://schemas.openxmlformats.org/package/2006/content-types\">\n\t<Default Extension=\"rels\" ContentType=\"application/vnd.openxmlformats-package.relationships+xml\"/>\n\t<Default Extension=\"xml\" ContentType=\"application/xml\"/>\n\t<Default Extension=\"jpg\" ContentType=\"image/jpeg\"/>\n\t<Override PartName=\"/word/document.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml\"/>\n\t<Override PartName=\"/word/styles.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml\"/>\n\t<Override PartName=\"/word/stylesWithEffects.xml\" ContentType=\"application/vnd.ms-word.stylesWithEffects+xml\"/>\n\t<Override PartName=\"/word/settings.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml\"/>\n\t<Override PartName=\"/word/webSettings.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.wordprocessingml.webSettings+xml\"/>\n\t<Override PartName=\"/word/fontTable.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml\"/>\n\t<Override PartName=\"/word/theme/theme1.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.theme+xml\"/>\n\t<Override PartName=\"/docProps/core.xml\" ContentType=\"application/vnd.openxmlformats-package.core-properties+xml\"/>\n\t<Override PartName=\"/docProps/app.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.extended-properties+xml\"/>\n</Types>",

				"_rels/.rels": "<Relationships xmlns=\"http://schemas.openxmlformats.org/package/2006/relationships\">\n\t<Relationship Id=\"rId3\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties\" Target=\"docProps/app.xml\"/>\n\t<Relationship Id=\"rId2\" Type=\"http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties\" Target=\"docProps/core.xml\"/>\n\t<Relationship Id=\"rId1\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument\" Target=\"word/document.xml\"/>\n</Relationships>",

				"word/_rels/document.xml.rels": function word_relsDocumentXmlRels() {
								var a = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
								return "<Relationships xmlns=\"http://schemas.openxmlformats.org/package/2006/relationships\">\n\t<Relationship Id=\"rId8\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable\" Target=\"fontTable.xml\"/>\n\t<Relationship Id=\"rId3\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings\" Target=\"settings.xml\"/>\n\t<Relationship Id=\"rId7\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/image\" Target=\"media/image1.jpg\"/>\n\t<Relationship Id=\"rId2\" Type=\"http://schemas.microsoft.com/office/2007/relationships/stylesWithEffects\" Target=\"stylesWithEffects.xml\"/>\n\t<Relationship Id=\"rId1\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles\" Target=\"styles.xml\"/>\n\t<Relationship Id=\"rId6\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink\" Target=\"http://news.sina.com.cn/\" TargetMode=\"External\"/>\n\t<Relationship Id=\"rId5\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink\" Target=\"http://jd.com/\" TargetMode=\"External\"/>\n\t<Relationship Id=\"rId4\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/webSettings\" Target=\"webSettings.xml\"/>\n\t<Relationship Id=\"rId9\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme\" Target=\"theme/theme1.xml\"/>\n    " + a + "\n</Relationships>";
				},

				"word/document.xml": function wordDocumentXml(a) {
								return "<w:document\nxmlns:wpc=\"http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas\"\nxmlns:mc=\"http://schemas.openxmlformats.org/markup-compatibility/2006\"\nxmlns:o=\"urn:schemas-microsoft-com:office:office\"\nxmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\"\nxmlns:m=\"http://schemas.openxmlformats.org/officeDocument/2006/math\"\nxmlns:v=\"urn:schemas-microsoft-com:vml\"\nxmlns:wp14=\"http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing\"\nxmlns:wp=\"http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing\"\nxmlns:w10=\"urn:schemas-microsoft-com:office:word\"\nxmlns:w=\"http://schemas.openxmlformats.org/wordprocessingml/2006/main\"\nxmlns:w14=\"http://schemas.microsoft.com/office/word/2010/wordml\"\nxmlns:wpg=\"http://schemas.microsoft.com/office/word/2010/wordprocessingGroup\"\nxmlns:wpi=\"http://schemas.microsoft.com/office/word/2010/wordprocessingInk\"\nxmlns:wne=\"http://schemas.microsoft.com/office/word/2006/wordml\"\nxmlns:wps=\"http://schemas.microsoft.com/office/word/2010/wordprocessingShape\"\nmc:Ignorable=\"w14 wp14\">\n<w:body>\n" + (a || "<w:p w:rsidR=\"00F755B0\" w:rsidRDefault=\"00F755B0\" w:rsidP=\"008F2DD4\">\n    <w:r>\n\t\t<w:t>On the Insert tab, the galleries include items that are designed to coordinate with the overall look of your document.</w:t>\n\t</w:r>\n</w:p>") + "\n<w:sectPr w:rsidR=\"005F49AF\">\n    <w:pgSz w:w=\"12240\" w:h=\"15840\"/>\n    <w:pgMar w:top=\"1440\" w:right=\"1800\" w:bottom=\"1440\" w:left=\"1800\" w:header=\"708\" w:footer=\"708\" w:gutter=\"0\"/>\n    <w:cols w:space=\"708\"/>\n    <w:docGrid w:linePitch=\"360\"/>\n</w:sectPr>\n</w:body></w:document>";
				},

				"word/theme/theme1.xml": false,
				"word/settings.xml": false,
				"word/webSettings.xml": false,
				"word/stylesWithEffects.xml": false,
				"docProps/core.xml": false,
				"word/styles.xml": function wordStylesXml(a) {
								return "<w:styles>\n    <w:docDefaults>\n\t\t<w:rPrDefault>\n\t\t\t<w:rPr>\n\t\t\t\t<w:rFonts w:asciiTheme=\"minorHAnsi\" w:eastAsiaTheme=\"minorEastAsia\" w:hAnsiTheme=\"minorHAnsi\" w:cstheme=\"minorBidi\"/>\n\t\t\t\t<w:sz w:val=\"22\"/>\n\t\t\t\t<w:szCs w:val=\"22\"/>\n\t\t\t\t<w:lang w:val=\"en-US\" w:eastAsia=\"zh-CN\" w:bidi=\"ar-SA\"/>\n\t\t\t</w:rPr>\n\t\t</w:rPrDefault>\n\t\t<w:pPrDefault>\n\t\t\t<w:pPr>\n\t\t\t\t<w:spacing w:after=\"200\" w:line=\"276\" w:lineRule=\"auto\"/>\n\t\t\t</w:pPr>\n\t\t</w:pPrDefault>\n\t</w:docDefaults>\n\n" + (a || "<w:style w:type=\"paragraph\" w:default=\"1\" w:styleId=\"Normal\">\n    <w:name w:val=\"Normal\"/>\n    <w:qFormat/>\n</w:style>") + "\n\n</w:styles>\n";
				},
				"word/fontTable.xml": false,
				"docProps/app.xml": false
};
//# sourceMappingURL=C:\work\workspace\docx-hub\spec\fixture\newDocx.js.map