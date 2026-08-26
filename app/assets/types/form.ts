import { BusinessDetails } from "./invoiceType";

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