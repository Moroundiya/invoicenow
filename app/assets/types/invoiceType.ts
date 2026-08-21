export type InvoiceTemplate = "simple" | "modern" | "classic";

export interface BusinessDetails {
	name: string;
	email: string;
	phone: string;
	address: string;
	city: string;
	country: string;
}

export interface ClientDetails {
	name: string;
	email: string;
	phone: string;
	address: string;
	city: string;
	country: string;
}

export interface InvoiceItem {
	id: string;
	description: string;
	details: string;
	quantity: number;
	rate: number;
}

export interface PaymentDetails {
	swiftCode: string;
	method: string;
	accountName: string;
	bankName: string;
	accountNumber: string;
	sortCode: string;
}

export interface SignatureDetails {
	name: string;
	title: string;
	image: string;
}

export interface BrandingDetails {
	logo: string;
	primaryColor: string;
}

export interface InvoiceData {
	template: InvoiceTemplate;

	invoiceNumber: string;
	issueDate: string;
	dueDate: string;
	sortCode: string;
	currency: string;

	from: BusinessDetails;
	billTo: ClientDetails;

	items: InvoiceItem[];

	discount: number;
	tax: number;

	payment: PaymentDetails;

	notes: string;
	terms: string;

	signature: SignatureDetails;

	branding: BrandingDetails;
}
