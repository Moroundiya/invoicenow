"use client";

import type { ClientDetails } from "@/app/assets/types/invoiceType";

interface ClientDetailsFormProps {
	value: ClientDetails;
	onChange: (value: ClientDetails) => void;
}

export default function ClientDetailsForm({
	value,
	onChange,
}: ClientDetailsFormProps) {
	const update = (field: keyof ClientDetails, fieldValue: string) => {
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
						<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
						<circle
							cx="9"
							cy="7"
							r="4"
						/>
						<path d="M22 21v-2a4 4 0 0 0-3-3.87" />
						<path d="M16 3.13a4 4 0 0 1 0 7.75" />
					</svg>
				</div>

				<div>
					<h3 className="text-sm font-semibold text-white">Client Details</h3>

					<p className="mt-0.5 text-xs text-slate-500">
						Who is this invoice being sent to?
					</p>
				</div>
			</div>

			<div className="space-y-4">
				<Field
					label="Client Name"
					placeholder="e.g. Acme Corporation"
					value={value.name}
					onChange={(value) => update("name", value)}
				/>

				<div className="grid gap-4 sm:grid-cols-2">
					<Field
						label="Email"
						type="email"
						placeholder="client@example.com"
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
					placeholder="Client address"
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
