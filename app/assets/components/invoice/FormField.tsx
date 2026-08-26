import { FormFieldProps } from "../../types/invoice";

export default function FormField({
	label,
	placeholder,
	value,
	onChange,
	type = "text",
	required = false,
}: FormFieldProps) {
	return (
		<div className="space-y-2">
			<label className="block text-xs font-medium text-slate-300">
				{label}

				{required && <span className="ml-1 text-blue-400">*</span>}
			</label>

			<input
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className="h-11 w-full rounded-lg border border-white/[0.08] bg-[#07162d] px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/50 focus:bg-[#081a35] focus:ring-2 focus:ring-blue-500/10"
			/>
		</div>
	);
}
