"use client";

import { InvoiceItemsProps } from "../../types/invoice";

export default function InvoiceItems({
	items,
	currency,
	onAdd,
	onRemove,
	onChange,
}: InvoiceItemsProps) {
	const formatMoney = (amount: number) =>
		new Intl.NumberFormat("en-US", {
			style: "currency",
			currency,
		}).format(amount);

	return (
		<section className="rounded-xl border border-white/[0.07] bg-[#061329]/70 p-5">
			<div className="mb-5 flex items-start justify-between gap-4">
				<div>
					<h3 className="text-sm font-semibold text-white">Invoice Items</h3>

					<p className="mt-1 text-xs leading-5 text-slate-500">
						Add the products or services included in this invoice.
					</p>
				</div>

				<button
					type="button"
					onClick={onAdd}
					className="shrink-0 rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-xs font-semibold text-blue-400 transition hover:bg-blue-500/15">
					+ Add item
				</button>
			</div>

			<div className="space-y-4">
				{items.map((item, index) => {
					const lineTotal = item.quantity * item.rate;

					return (
						<div
							key={item.id}
							className="rounded-lg border border-white/[0.06] bg-[#07162d] p-4">
							<div className="mb-4 flex items-center justify-between">
								<p className="text-xs font-semibold text-slate-300">
									Item {index + 1}
								</p>

								{items.length > 1 && (
									<button
										type="button"
										onClick={() => onRemove(item.id)}
										className="text-xs text-red-400 transition hover:text-red-300">
										Remove
									</button>
								)}
							</div>

							<div className="grid gap-4 sm:grid-cols-2">
								<div className="space-y-2 sm:col-span-2">
									<label className="block text-xs font-medium text-slate-300">
										Description
									</label>

									<input
										value={item.description}
										onChange={(e) =>
											onChange(item.id, "description", e.target.value)
										}
										placeholder="e.g. Website development"
										className="h-11 w-full rounded-lg border border-white/[0.08] bg-[#061329] px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
									/>
								</div>

								<div className="space-y-2 sm:col-span-2">
									<label className="block text-xs font-medium text-slate-300">
										Additional details{" "}
										<span className="text-slate-600">(Optional)</span>
									</label>

									<input
										value={item.details}
										onChange={(e) =>
											onChange(item.id, "details", e.target.value)
										}
										placeholder="Short description of this item"
										className="h-11 w-full rounded-lg border border-white/[0.08] bg-[#061329] px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
									/>
								</div>

								<div className="space-y-2">
									<label className="block text-xs font-medium text-slate-300">
										Quantity
									</label>

									<input
										type="number"
										min="0"
										step="1"
										value={item.quantity}
										onChange={(e) =>
											onChange(item.id, "quantity", Number(e.target.value))
										}
										className="h-11 w-full rounded-lg border border-white/[0.08] bg-[#061329] px-3.5 text-sm text-white outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
									/>
								</div>

								<div className="space-y-2">
									<label className="block text-xs font-medium text-slate-300">
										Rate
									</label>

									<input
										type="number"
										min="0"
										step="0.01"
										value={item.rate}
										onChange={(e) =>
											onChange(item.id, "rate", Number(e.target.value))
										}
										className="h-11 w-full rounded-lg border border-white/[0.08] bg-[#061329] px-3.5 text-sm text-white outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
									/>
								</div>
							</div>

							<div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
								<span className="text-xs text-slate-500">Item total</span>

								<span className="text-sm font-semibold text-white">
									{formatMoney(lineTotal)}
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
