import FormField from "./FormField";
import type { BusinessDetails as BusinessDetailsType } from "@/app/assets/types/invoiceType";

interface BusinessDetailsProps {
	value: BusinessDetailsType;
	onChange: (field: keyof BusinessDetailsType, value: string) => void;
}

export default function BusinessDetails({
	value,
	onChange,
}: BusinessDetailsProps) {
	return (
		<section className="rounded-xl border border-white/[0.07] bg-[#061329]/70 p-5">
			<div className="mb-5">
				<h3 className="text-sm font-semibold text-white">Your Business</h3>

				<p className="mt-1 text-xs leading-5 text-slate-500">
					Enter the business information that will appear on your invoice.
				</p>
			</div>

			<div className="grid gap-4 sm:grid-cols-2">
				<FormField
					label="Business name"
					placeholder="e.g. InvoiceNow Studio"
					value={value.name}
					onChange={(e) => onChange("name", e.target.value)}
					required
				/>

				<FormField
					label="Email"
					type="email"
					placeholder="hello@example.com"
					value={value.email}
					onChange={(e) => onChange("email", e.target.value)}
				/>

				<FormField
					label="Phone"
					placeholder="+234 800 000 0000"
					value={value.phone}
					onChange={(e) => onChange("phone", e.target.value)}
				/>

				<FormField
					label="Address"
					placeholder="123 Business Street"
					value={value.address}
					onChange={(e) => onChange("address", e.target.value)}
				/>

				<FormField
					label="City"
					placeholder="Lagos"
					value={value.city}
					onChange={(e) => onChange("city", e.target.value)}
				/>

				<FormField
					label="Country"
					placeholder="Nigeria"
					value={value.country}
					onChange={(e) => onChange("country", e.target.value)}
				/>
			</div>
		</section>
	);
}
