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
		description: "Clean, minimal, and perfect for everyday invoices.",
	},
	{
		id: "modern",
		name: "Modern",
		description:
			"Bold, polished, and make your brand stand out.",
	},
	{
		id: "classic",
		name: "Classic",
		description: "Professional, timeless, and built for a traditional look.",
	},
];
