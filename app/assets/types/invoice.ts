import type {
	BusinessDetails as BusinessDetailsType,
	InvoiceItem,
	InvoiceTemplate,
} from "@/app/assets/types/invoiceType";
import type { ClientDetails as ClientDetailsType } from "@/app/assets/types/invoiceType";
import type { InvoiceData } from "@/app/assets/types/invoiceType";
import { InvoiceStep } from "../layouts/invoice/CreateInvoiceLayout";

export interface BusinessDetailsProps {
	value: BusinessDetailsType;
	onChange: (field: keyof BusinessDetailsType, value: string) => void;
}

export interface ClientDetailsProps {
	value: ClientDetailsType;
	onChange: (field: keyof ClientDetailsType, value: string) => void;
}

export interface InvoiceDetailsFormProps {
	invoice: InvoiceData;
	onInvoiceChange: (updates: Partial<InvoiceData>) => void;
}

export interface InvoiceDownloadProps {
	invoice: InvoiceData;
	fileName?: string;
}

export interface InvoicePreviewProps {
	invoice: InvoiceData;
}

export interface InvoiceStepperProps {
	currentStep: InvoiceStep;
}

export interface TemplateSelectorProps {
	selectedTemplate: InvoiceTemplate;
	onTemplateChange: (template: InvoiceTemplate) => void;
}

export interface TemplateCardProps {
	id: InvoiceTemplate;
	name: string;
	description: string;
	selected: boolean;
	onSelect: (template: InvoiceTemplate) => void;
}

export interface InvoiceTotalsProps {
	subtotal: number;
	discount: number;
	tax: number;
	currency: string;
	onDiscountChange: (value: number) => void;
	onTaxChange: (value: number) => void;
}

export interface InvoiceWorkspaceProps {
	currentStep: InvoiceStep;
	invoice: InvoiceData;
	onTemplateChange: (template: InvoiceTemplate) => void;
	onInvoiceChange: (updates: Partial<InvoiceData>) => void;
	onNext: () => void;
	onBack: () => void;
	onCreateAnother: () => void;
}

export interface InvoiceItemsProps {
	items: InvoiceItem[];

	currency: string;

	onAdd: () => void;

	onRemove: (id: string) => void;

	onChange: (
		id: string,
		field: keyof InvoiceItem,
		value: string | number,
	) => void;
}

export interface InvoiceMetaProps {
	invoiceNumber: string;
	issueDate: string;
	dueDate: string;
	currency: string;

	onChange: (
		field: "invoiceNumber" | "issueDate" | "dueDate" | "currency",
		value: string,
	) => void;
}

export interface FormFieldProps {
	label: string;
	placeholder?: string;
	value: string | number;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	type?: string;
	required?: boolean;
}

export interface TextareaFieldProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

export interface InvoiceCustomizeFormProps {
	invoice: InvoiceData;
	onInvoiceChange: (updates: Partial<InvoiceData>) => void;
}
