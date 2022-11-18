const fs = require("fs");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path) {
	let doc = new PDFDocument({ size: "A4", margin: 50 });

	generateHeader(doc);
	generateCustomerInformation(doc, invoice);
	generateInvoiceTable(doc, invoice);
	generateFooter(doc);

	doc.end();
	doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
	doc
		// .image("/Users/marialuiza/Documents/nodejs-amigo-project/pdf/logo.png", 50, 45, { width: 50 })
		.fillColor("#444444")
		.fontSize(20)
		.text("WHEN AND WHERE Inc.", 50, 50)
		.fontSize(10)
		.text("WHEN AND WHERE", 200, 50, { align: "right" })
		.text("Amigo Full Street", 200, 65, { align: "right" })
		.text("Recife, PE", 200, 80, { align: "right" })
		.moveDown();
}

function generateCustomerInformation(doc, invoice) {
	const shipping = invoice.shipping;

	doc.text(`Invoice Number: ${invoice.invoice_nr}`, 50, 200)
		.text(`Invoice Date: ${new Date()}`, 50, 215)
		.text(`Balance Due: ${invoice.subtotal - invoice.paid}`, 50, 130)

		.text(shipping.name, 300, 200)
		.text(shipping.address, 300, 215)
		.text(
			`${shipping.city}, ${shipping.state}, ${shipping.country}`,
			300,
			130,
		)
		.moveDown();


	const customerInformationTop = 200;

	doc
		.fontSize(10)
		.text("Invoice Number:", 50, customerInformationTop)
		.font("Helvetica-Bold")
		.text(invoice.invoice_nr, 150, customerInformationTop)
		.font("Helvetica")
		.text("Invoice Date:", 50, customerInformationTop + 15)
		.text(formatDate(new Date()), 150, customerInformationTop + 15)
		.text("Balance Due:", 50, customerInformationTop + 30)
		.text(
			formatCurrency(invoice.subtotal - invoice.paid),
			150,
			customerInformationTop + 30
		)

		.font("Helvetica-Bold")
		.text(invoice.shipping.name, 300, customerInformationTop)
		.font("Helvetica")
		.text(invoice.shipping.address, 300, customerInformationTop + 15)
		.text(
			invoice.shipping.city +
			", " +
			invoice.shipping.state +
			", " +
			invoice.shipping.country,
			300,
			customerInformationTop + 30
		)
		.moveDown();

	generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
	let i;
	const invoiceTableTop = 330;

	doc.font("Helvetica-Bold");
	generateTableRow(
		doc,
		invoiceTableTop,
		"Item",
		"Description",
		"Unit Cost",
		"Quantity",
		"Line Total"
	);
	generateHr(doc, invoiceTableTop + 20);
	doc.font("Helvetica");

	for (i = 0; i < invoice.items.length; i++) {
		const item = invoice.items[i];
		const position = invoiceTableTop + (i + 1) * 30;
		generateTableRow(
			doc,
			position,
			item.item,
			item.description,
			formatCurrency(item.amount / item.quantity),
			item.quantity,
			formatCurrency(item.amount)
		);

		generateHr(doc, position + 20);
	}

	const subtotalPosition = invoiceTableTop + (i + 1) * 30;
	function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
		doc.fontSize(10)
			.text(c1, 50, y)
			.text(c2, 150, y)
			.text(c3, 280, y, { width: 90, align: 'right' })
			.text(c4, 370, y, { width: 90, align: 'right' })
			.text(c5, 0, y, { align: 'right' });
	}
}

	function generateFooter(doc) {
		doc
			.fontSize(10)
			.text(
				"Payment is due within 15 days. Thank you for your business.",
				50,
				780,
				{ align: "center", width: 500 }
			)};

	function generateTableRow(
		doc,
		y,
		item,
		description,
		unitCost,
		quantity,
		lineTotal
	) {
		doc
			.fontSize(10)
			.text(item, 50, y)
			.text(description, 150, y)
			.text(unitCost, 280, y, { width: 90, align: "right" })
			.text(quantity, 370, y, { width: 90, align: "right" })
			.text(lineTotal, 0, y, { align: "right" });
	}

	function generateHr(doc, y) {
		doc
			.strokeColor("#aaaaaa")
			.lineWidth(1)
			.moveTo(50, y)
			.lineTo(550, y)
			.stroke();
	}

	function formatCurrency(cents) {
		return "$" + (cents / 100).toFixed(2);
	}

	function formatDate(date) {
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();

		return year + "/" + month + "/" + day;
	}

	module.exports = {
		createInvoice
	};
