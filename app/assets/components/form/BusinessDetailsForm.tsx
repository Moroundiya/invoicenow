"use client";

import type { BusinessDetails } from "@/app/assets/types/invoiceType";

interface BusinessDetailsFormProps {
	value: BusinessDetails;
	onChange: (value: BusinessDetails) => void;
}

export default function BusinessDetailsForm({
	value,
	onChange,
}: BusinessDetailsFormProps) {
	const update = (field: keyof BusinessDetails, fieldValue: string) => {
		onChange({
			...value,
			[field]: fieldValue,
		});
	};

	return (
		<section className="rounded-2xl border border-white/[0.06] bg-[#030c1c]/60 p-5">
			<div className="mb-5 flex items-start gap-3">
				<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/[0.08] text-blue-400">
					<svg
						width="17"
						height="17"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.8">
						<path d="M3 21h18" />
						<path d="M5 21V5l7-2 7 2v16" />
						<path d="M9 9h1" />
						<path d="M14 9h1" />
						<path d="M9 13h1" />
						<path d="M14 13h1" />
					</svg>
				</div>

				<div>
					<h3 className="text-sm font-semibold text-white">Your Business</h3>

					<p className="mt-0.5 text-xs text-slate-500">
						Information that appears on your invoice.
					</p>
				</div>
			</div>

			<div className="space-y-4">
				<Field
					label="Business Name"
					placeholder="e.g. InvoiceNow Studio"
					value={value.name}
					onChange={(value) => update("name", value)}
				/>

				<div className="grid gap-4 sm:grid-cols-2">
					<Field
						label="Email"
						type="email"
						placeholder="hello@example.com"
						value={value.email}
						onChange={(value) => update("email", value)}
					/>

					<Field
						label="Phone"
						placeholder="+234 800 000 0000"
						value={value.phone}
						onChange={(value) => update("phone", value)}
					/>
				</div>

				<Field
					label="Address"
					placeholder="123 Business Street"
					value={value.address}
					onChange={(value) => update("address", value)}
				/>

				<div className="grid gap-4 sm:grid-cols-2">
					<Field
						label="City"
						placeholder="Lagos"
						value={value.city}
						onChange={(value) => update("city", value)}
					/>

					<Field
						label="Country"
						placeholder="Nigeria"
						value={value.country}
						onChange={(value) => update("country", value)}
					/>
				</div>
			</div>
		</section>
	);
}

interface FieldProps {
	label: string;
	value: string;
	placeholder?: string;
	type?: string;
	onChange: (value: string) => void;
}

function Field({
	label,
	value,
	placeholder,
	type = "text",
	onChange,
}: FieldProps) {
	return (
		<label className="block">
			<span className="mb-1.5 block text-xs font-medium text-slate-400">
				{label}
			</span>

			<input
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={(event) => onChange(event.target.value)}
				className="h-11 w-full rounded-xl border border-white/[0.07] bg-[#061329] px-3.5 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
			/>
		</label>
	);
}
