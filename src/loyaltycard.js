/* jshint multistr: true */
/* global History, Holder, jsPDF */
// TODO: Add G+, FB, etc. buttons.
// TODO: Google ads
// TODO: Google metrics
(function($) {
	"use strict";

	function getBarcodeDataFromForm(form) {
		var jForm = $(form);
		return {
			"name": jForm.find(".barcode-name").val(),
			"type": jForm.find(".barcode-type").val(),
			"data": jForm.find(".barcode-data").val()
		};
	}

	function setBarcodeDataInForm(form, data) {
		var jForm = $(form);
		jForm.find(".barcode-name").val(data.name);
		jForm.find(".barcode-type").val(data.type);
		jForm.find(".barcode-data").val(data.data);
		immediatePreviewUpdate(jForm);
	}

	function serializeData(data) {
		var toEncode = [];
		for (var i = 0; i < data.length; i++) {
			toEncode.push([data[i].name, data[i].type, data[i].data]);
		}
		return JSON.stringify(toEncode);
	}

	function immediatePreviewUpdate(form) {
		var data = getBarcodeDataFromForm(form),
			img = form.find(".barcode-preview"),
			btn = $("#downloadButton");

		if (!data.data) {
			img.attr("src", "holder.js/140x70?text=Enter Data to Preview");
			Holder.run();
		} else {
			var url = "http://www.microscan.com/Barcode/idalin.asp?BARCODE=" + encodeURIComponent(data.data) + "&BAR_HEIGHT=1.25&CODE_TYPE=" + encodeURIComponent(data.type) + "&CHECK_CHAR=N&ROTATE=0&ST=Y&IMAGE_TYPE=1&DPI=38",
				alt = data.data;

			if (data.name) {
				alt = data.name + ": " + alt;
			}

			img.attr("src", url).attr("alt", alt).removeAttr("style").removeAttr("data-src").removeAttr("data-holder-rendered");
		}

		var allData = $(".form-container").getBarcodeData();
		if (allData.length > 0) {
			btn.removeAttr("disabled");
		} else {
			btn.attr("disabled", true);
		}

		History.pushState(allData, null, "?" + encodeURIComponent(serializeData(allData)));
	}

	function throttledPreviewUpdate(form) {
		window.clearTimeout(form.data("timeout"));
		form.data("timeout", setTimeout(function() {
			immediatePreviewUpdate(form);
		}, 1000));
	}

	$.fn.appendBarcodeForm = function() {
		return this.each(function() {
			var parent = $(this),
				id = parent.find(".barcode-form").length + 1;

			var form = $("<div class=\"row barcode-form\">\
	<div class=\"col-xs-12 col-sm-6 col-md-3\">\
		<div class=\"panel panel-default\">\
			<div class=\"panel-body\">\
				<div class=\"form-group\">\
					<label for=\"name_" + id + "\">Name</label>\
					<input type=\"text\" class=\"form-control barcode-name\" id=\"name_" + id + "\" placeholder=\"My Loyalty Card\">\
				</div>\
				<div class=\"form-group\">\
					<label for=\"barcodeType_" + id + "\">Barcode Type</label>\
					<select class=\"form-control barcode-type\" id=\"barcodeType_" + id + "\">\
						<option value=\"0\">Code 39</option>\
						<option value=\"1\">Code 39 Extended</option>\
						<option value=\"2\">Interleaved 2 of 5</option>\
						<option value=\"3\">Code 11</option>\
						<option value=\"4\">Codabar</option>\
						<option value=\"5\">MSI</option>\
						<option value=\"6\">UPC-A</option>\
						<option value=\"7\">Industrial 2 of 5</option>\
						<option value=\"8\">Matrix 2 of 5</option>\
						<option value=\"9\">Code 93</option>\
						<option value=\"10\">EAN-13</option>\
						<option value=\"11\">EAN-8</option>\
						<option value=\"13\">Code 128</option>\
						<option value=\"14\">PLANET</option>\
						<option value=\"15\">POSTNET</option>\
						<option value=\"16\">GSI-128</option>\
						<option value=\"17\">PDF417</option>\
						<option value=\"18\">Data Matrix</option>\
						<option value=\"19\">MaxiCode</option>\
					</select>\
				</div>\
				<div class=\"form-group\">\
					<label for=\"barcodeData_" + id + "\">Number/Data</label>\
					<input type=\"text\" class=\"form-control barcode-data\" id=\"barcodeData_" + id + "\" placeholder=\"ABC-1234\">\
				</div>\
			</div>\
		</div>\
	</div>\
	<div class=\"col-xs-12 col-sm-6 col-md-3\">\
		<img class=\"barcode-preview\" id=\"preview_" + id + "\" data-src=\"holder.js/140x70?text=Enter Data to Preview\" />\
	</div>\
</div>");

			form.appendTo(parent);
			form.find(".barcode-type").change(function() {
				immediatePreviewUpdate($(this).closest(".barcode-form"));
			});
			form.find(".barcode-data").on('input', function() {
				throttledPreviewUpdate($(this).closest(".barcode-form"));
			});
			form.find(".barcode-name").on('input', function() {
				throttledPreviewUpdate($(this).closest(".barcode-form"));
			});
		});
	};

	$.fn.getBarcodeData = function() {
		var barcodeData = [],
			changed = false;

		this.each(function() {
			$(this).find(".barcode-form").each(function() {
				barcodeData.push(getBarcodeDataFromForm(this));
			});
		});

		do {
			var indexToRemove = -1;
			changed = false;

			for (var i = 0; i < barcodeData.length; i++) {
				if (!barcodeData[i].data) {
					changed = true;
					indexToRemove = i;
					break;
				}
			}

			if (indexToRemove > -1) {
				barcodeData.splice(indexToRemove, 1);
			}
		} while (changed);

		return barcodeData;
	};

	$.fn.setBarcodeData = function(barcodeData) {
		var barcodeForms = $(this).find(".barcode-form");
		for (var i = 0; i < barcodeData.length; i++) {
			var form = barcodeForms[i],
				data = barcodeData[i];
			setBarcodeDataInForm(form, data);
		}
	};
})(jQuery);

$(function() {
	"use strict";

	// 1pt = 0.352777778mm
	var pointsToMM = 0.352777778,
		// 1inch = 25.4mm
		inchesToMM = 25.4,

		// Card measurements in mm for the PDF.
		cardWidth = 50,
		cardHeight = 80,
		cardTop = 75,
		cardLeft = 35,
		codesPerCard = 4,
		cardMargin = 4,
		codeNameTextSizePoints = 6,
		codeNameTextSizeMM = pointsToMM * codeNameTextSizePoints,
		marginBetweenTextAndCode = 1;

	function downloadPdf() {
		var data = $(".form-container").getBarcodeData();
		if (data.length < 1) {
			return;
		}

		// The document is measured in mm, but font size is pt.
		var doc = new jsPDF();
		doc.setFontSize(20);
		doc.text(35, 50, "LoyaltyCard");
		doc.setFontSize(10);
		doc.text(35, 60, "Cut along the outer line and fold in half to make a two-sided card. Laminate if desired.");
		doc.setLineWidth(0.1);

		// roundedRect(x, y, w, h, rx, ry, style)
		doc.roundedRect(cardLeft, cardTop, cardWidth, cardHeight, 4, 4, 'S');
		doc.roundedRect(cardLeft + cardWidth, cardTop, cardWidth, cardHeight, 4, 4, 'S');

		// Using makeCounter here will "block" so the save operation
		// only gets called after the LAST image finishes loading.
		var callSave = makeCounter(data.length, function() {
			doc.save("card.pdf");
		});

		for (var i = 0; i < data.length; i++) {
			var cardFace = Math.floor(i / codesPerCard),
				xOffset = cardLeft + cardMargin + (cardFace * cardWidth),
				yOffset = cardTop + cardMargin + ((i % codesPerCard) * calculateItemHeight()),
				url = "BarcodeHandler.ashx?data=" + encodeURIComponent(data[i].data) + "&type=" + encodeURIComponent(data[i].type),
				img = new Image();

			doc.setFontSize(codeNameTextSizePoints);
			doc.text(xOffset, yOffset, data[i].name);
			img.onload = addImageAndCallSave(img, xOffset, yOffset + marginBetweenTextAndCode, doc, callSave);
			img.src = url;
		}
	}

	function calculateItemHeight() {
		// One "item" is descriptive text + barcode + margin
		return ((cardHeight - cardMargin) / codesPerCard);
	}

	function calculateItemWidth() {
		return cardWidth - (2 * cardMargin);
	}

	function calculateMaxBarcodeHeight() {
		return calculateItemHeight() - codeNameTextSizeMM - marginBetweenTextAndCode;
	}

	function addImageAndCallSave(image, x, y, pdf, callSave) {
		return function() {
			var canvas = document.createElement("canvas"),
				ctx = canvas.getContext("2d"),
				maxHeight = calculateMaxBarcodeHeight(),
				maxWidth = calculateItemWidth();
			canvas.width = image.width;
			canvas.height = image.height;
			ctx.drawImage(image, 0, 0);
			var dataURL = canvas.toDataURL("image/jpeg");

			// Images from the barcode generator via the BarcodeHandler.ashx
			// are 300dpi. The PDF uses mm for units, so we need to convert
			// from pixels to inches to mm, the scale up/down to fit in the
			// width of the card and maintain aspect ratio.
			var width = (image.width / 300) * inchesToMM,
				height = (image.height / 300) * inchesToMM;

			if (width > maxWidth) {
				height = height * (maxWidth / width);
				width = maxWidth;
			}

			if (height > maxHeight) {
				width = width * (maxHeight / height);
				height = maxHeight;
			}

			// addImage(image, format, x, y, w, h)
			var centeredX = x + ((calculateItemWidth() - width) / 2);
			pdf.addImage(dataURL, 'JPEG', centeredX, y, width, height);
			callSave();
		};
	}

	function makeCounter(limit, callback) {
		return function() {
			if (--limit === 0) {
				callback();
			}
		};
	}

	for (var i = 0; i < 8; i++) {
		$(".form-container").appendBarcodeForm();
	}
	$("#downloadButton").click(downloadPdf);
	if (location.search) {
		var toParse = decodeURIComponent(location.search.substr(1));
		if (toParse) {
			$(".form-container").setBarcodeData(deserializeData(toParse));
		}
	}

	function deserializeData(jsonStr) {
		var toDecode = JSON.parse(jsonStr),
			data = [];
		for (var i = 0; i < toDecode.length; i++) {
			data.push({
				"name": toDecode[i][0],
				"type": toDecode[i][1],
				"data": toDecode[i][2]
			});
		}
		return data;
	}
});