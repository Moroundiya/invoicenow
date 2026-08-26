import { InvoiceStep } from "../layouts/invoice/CreateInvoiceLayout";

export const content: Record<
	InvoiceStep,
	{
		label: string;
		title: string;
		description: string;
	}
> = {
	1: {
		label: "Step 1",
		title: "Choose Template",
		description: "Select a professional invoice template.",
	},
	2: {
		label: "Step 2",
		title: "Invoice Details",
		description: "Add your company, client, and invoice information.",
	},
	3: {
		label: "Step 3",
		title: "Customize",
		description: "Make the invoice match your brand.",
	},
	4: {
		label: "Step 4",
		title: "Preview",
		description: "Review your completed invoice.",
	},
	5: {
		label: "Step 5",
		title: "Download",
		description: "Download your finished invoice.",
	},
};
