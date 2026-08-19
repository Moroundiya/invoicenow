import { InvoiceTemplate } from "../types/invoiceType";

export interface InvoiceTemplateInfo {
	id: InvoiceTemplate;
	name: string;
	description: string;
}

export const invoiceTemplates: InvoiceTemplateInfo[] = [
	{
		id: "simple",
		name: "Simple",
		description: "Clean, professional and easy to read.",
	},
	{
		id: "modern",
		name: "Modern",
		description: "Bold, branded and contemporary.",
	},
	{
		id: "classic",
		name: "Classic",
		description: "Traditional and professional.",
	},
];
