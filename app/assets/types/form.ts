import {
	BusinessDetails,
	ClientDetails,
	InvoiceData,
	InvoiceItem,
} from "./invoiceType";

export interface FieldProps {
	label: string;
	value: string;
	placeholder?: string;
	type?: string;
	onChange: (value: string) => void;
}

export interface BusinessDetailsFormProps {
	value: BusinessDetails;
	onChange: (value: BusinessDetails) => void;
}

export interface ClientDetailsFormProps {
	value: ClientDetails;
	onChange: (value: ClientDetails) => void;
}

export interface InvoiceItemsFormProps {
	items: InvoiceItem[];
	currency: string;
	discount: number;
	tax: number;
	onItemsChange: (items: InvoiceItem[]) => void;
	onDiscountChange: (discount: number) => void;
	onTaxChange: (tax: number) => void;
}

export interface NumberFieldProps {
	label: string;
	value: number;
	min?: number;
	max?: number;
	step?: number;
	onChange: (value: number) => void;
}

export interface InvoiceMetaFormProps {
	invoice: InvoiceData;
	onChange: (updates: Partial<InvoiceData>) => void;
}
