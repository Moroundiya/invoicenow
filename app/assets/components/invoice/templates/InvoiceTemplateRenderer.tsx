import type { InvoiceData } from "@/app/assets/types/invoiceType";

import SimpleTemplate from "./SimpleTemplate";
import ModernTemplate from "./ModernTemplate";
import ClassicTemplate from "./ClassicTemplate";

interface InvoiceTemplateRendererProps {
	invoice: InvoiceData;
}

export default function InvoiceTemplateRenderer({
	invoice,
}: InvoiceTemplateRendererProps) {
	switch (invoice.template) {
		case "modern":
			return <ModernTemplate invoice={invoice} />;

		case "classic":
			return <ClassicTemplate invoice={invoice} />;

		case "simple":
		default:
			return <SimpleTemplate invoice={invoice} />;
	}
}
