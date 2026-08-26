import { ClientDetailsProps } from "../../types/invoice";
import FormField from "./FormField";

export default function ClientDetails({ value, onChange }: ClientDetailsProps) {
	return (
		<section className="rounded-xl border border-white/[0.07] bg-[#061329]/70 p-5">
			<div className="mb-5">
				<h3 className="text-sm font-semibold text-white">Client Details</h3>

				<p className="mt-1 text-xs leading-5 text-slate-500">
					Add the client or customer who will receive this invoice.
				</p>
			</div>

			<div className="grid gap-4 sm:grid-cols-2">
				<FormField
					label="Client name"
					placeholder="e.g. Acme Corporation"
					value={value.name}
					onChange={(e) => onChange("name", e.target.value)}
					required
				/>

				<FormField
					label="Email"
					type="email"
					placeholder="client@example.com"
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
					placeholder="Client address"
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
