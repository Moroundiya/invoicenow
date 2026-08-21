import type { InvoiceData } from "@/app/assets/types/invoiceType";

export const defaultInvoice: InvoiceData = {
	template: "simple",

	invoiceNumber: "INV-001",

	issueDate: new Date().toISOString().split("T")[0],

	dueDate: "",

	currency: "USD",

	from: {
		name: "",
		email: "",
		phone: "",
		address: "",
		city: "",
		country: "",
	},

	billTo: {
		name: "",
		email: "",
		phone: "",
		address: "",
		city: "",
		country: "",
	},

	items: [],

	discount: 0,

	tax: 0,

	payment: {
		method: "",
		accountName: "",
		bankName: "",
		accountNumber: "",
		swiftCode: "",
		sortCode: "",
	},

	notes: "",

	terms: "",

	signature: {
		name: "",
		title: "",
		image: "",
	},

	branding: {
		logo: "",
		primaryColor: "#2563EB",
	},
	sortCode: "",
};
