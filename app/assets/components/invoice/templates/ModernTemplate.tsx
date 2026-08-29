import type { InvoiceData } from "@/app/assets/types/invoiceType";

interface ModernTemplateProps {
	invoice: InvoiceData;
}

export default function ModernTemplate({ invoice }: ModernTemplateProps) {
	const primaryColor = invoice.branding.primaryColor || "#2563eb";

	const payment = invoice.payment as InvoiceData["payment"] & {
		swiftCode?: string;
		swift?: string;
		swift_code?: string;
	};

	const swiftCode =
		payment.swiftCode || payment.swift || payment.swift_code || "";

	const subtotal = invoice.items.reduce(
		(total, item) => total + item.quantity * item.rate,
		0,
	);

	const discountAmount = subtotal * ((invoice.discount || 0) / 100);

	const taxBase = subtotal - discountAmount;

	const taxAmount = taxBase * ((invoice.tax || 0) / 100);

	const total = taxBase + taxAmount;

	const formatMoney = (amount: number) =>
		new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: invoice.currency || "USD",
		}).format(amount);

	const fromLocation = [
		invoice.from.address,
		invoice.from.city,
		invoice.from.country,
	]
		.filter(Boolean)
		.join(", ");

	const clientLocation = [
		invoice.billTo.address,
		invoice.billTo.city,
		invoice.billTo.country,
	]
		.filter(Boolean)
		.join(", ");

	const hasPaymentInformation =
		!!payment.accountNumber ||
		!!payment.accountName ||
		!!payment.bankName ||
		!!swiftCode ||
		!!payment.method;

	const hasSignature = !!invoice.signature?.image;

	return (
		<div
			id="modern-invoice"
			className="relative m-0 w-[700px] max-w-full overflow-hidden bg-white p-0 text-[#172033]"
			style={{
				width: "700px",
				maxWidth: "100%",
				margin: 0,
				padding: 0,
				boxSizing: "border-box",
				fontFamily: "var(--font-jakarta)",
			}}>
			<div
				className="relative overflow-hidden px-7 py-7"
				style={{
					background:
						"linear-gradient(135deg, #101827 0%, #17243a 55%, #0d1422 100%)",
					color: "#ffffff",
				}}>
				<div
					className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full opacity-20"
					style={{
						backgroundColor: primaryColor,
					}}
				/>

				<div
					className="pointer-events-none absolute -bottom-28 -left-24 h-56 w-56 rounded-full opacity-10"
					style={{
						backgroundColor: primaryColor,
					}}
				/>

				<div className="relative z-10 flex items-start justify-between gap-8">
					<div className="min-w-0 flex-1">
						<h1 className="text-[32px] font-bold leading-none tracking-tight">
							INVOICE
						</h1>

						<div
							className="mt-3 h-[2px] w-24 rounded-full"
							style={{
								backgroundColor: primaryColor,
							}}
						/>

						<div className="mt-4 grid grid-cols-[108px_10px_minmax(0,1fr)] gap-x-2 gap-y-1.5 text-[12px] leading-tight">
							<span className="font-medium text-white/65">Invoice Number</span>

							<span className="text-white/35">:</span>

							<span className="font-semibold">
								{invoice.invoiceNumber || "—"}
							</span>

							<span className="font-medium text-white/65">Invoice Date</span>

							<span className="text-white/35">:</span>

							<span>{invoice.issueDate || "—"}</span>

							<span className="font-medium text-white/65">Due Date</span>

							<span className="text-white/35">:</span>

							<span>{invoice.dueDate || "—"}</span>

							{/* <span className="font-medium text-white/65">Payment Terms</span>

							<span className="text-white/35">:</span>

							<span>{payment.method || "—"}</span> */}

							<span className="font-medium text-white/65">Currency</span>

							<span className="text-white/35">:</span>

							<span>{invoice.currency || "USD"}</span>
						</div>
					</div>

					<div className="flex w-[175px] shrink-0 flex-col items-end text-right">
						{invoice.branding.logo ? (
							<img
								src={invoice.branding.logo}
								alt={invoice.from.name || "Company logo"}
								className="max-h-14 max-w-[155px] object-contain object-right"
							/>
						) : (
							<>
								<div
									className="flex h-12 w-12 items-center justify-center rounded-xl text-[20px] font-bold text-white"
									style={{
										backgroundColor: primaryColor,
									}}>
									{invoice.from.name
										? invoice.from.name.charAt(0).toUpperCase()
										: "I"}
								</div>
							</>
						)}
						<p className="mt-2 max-w-[175px] break-words text-[20px] font-bold leading-tight">
							{invoice.from.name || "Your Business"}
						</p>
					</div>
				</div>
			</div>

			<div className="px-7 py-6">
				<div className="grid grid-cols-[1fr_1fr] gap-8">
					<div className="min-w-0">
						<div className="mb-3 flex items-center gap-2">
							<div
								className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
								style={{
									backgroundColor: primaryColor,
								}}>
								<svg
									width="13"
									height="13"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2">
									<path d="M20 21a8 8 0 0 0-16 0" />
									<circle
										cx="12"
										cy="7"
										r="4"
									/>
								</svg>
							</div>

							<span
								className="text-[11px] font-bold uppercase tracking-wider"
								style={{
									color: primaryColor,
								}}>
								Bill To
							</span>
						</div>

						<h2 className="break-words text-[16px] font-bold leading-tight">
							{invoice.billTo.name || "Client Name"}
						</h2>

						<div className="mt-2 space-y-0.5 text-[11px] leading-[1.5] text-slate-500">
							{invoice.billTo.address && (
								<p className="break-words">{invoice.billTo.address}</p>
							)}

							{invoice.billTo.city && (
								<p className="break-words">
									{invoice.billTo.city}
									{invoice.billTo.country ? `, ${invoice.billTo.country}` : ""}
								</p>
							)}

							{invoice.billTo.email && (
								<p className="break-words pt-0.5">{invoice.billTo.email}</p>
							)}

							{invoice.billTo.phone && (
								<p className="break-words">{invoice.billTo.phone}</p>
							)}

							{!clientLocation &&
								!invoice.billTo.email &&
								!invoice.billTo.phone && (
									<p className="text-slate-400">Client address</p>
								)}
						</div>
					</div>

					<div
						className="min-w-0 rounded-xl border px-4 py-3.5"
						style={{
							borderColor: "#dfe5ed",
							backgroundColor: "#fafbfc",
						}}>
						<div className="mb-3 flex items-center gap-2">
							<div
								className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
								style={{
									backgroundColor: primaryColor,
								}}>
								<svg
									width="13"
									height="13"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2">
									<rect
										x="3"
										y="5"
										width="18"
										height="14"
										rx="2"
									/>

									<path d="M3 10h18" />
								</svg>
							</div>

							<span
								className="text-[11px] font-bold uppercase tracking-wider"
								style={{
									color: primaryColor,
								}}>
								Payment Info
							</span>
						</div>

						{hasPaymentInformation ? (
							<div className="space-y-1 text-[11px]">
								{payment.method && (
									<div className="grid grid-cols-[72px_8px_minmax(0,1fr)] gap-1">
										<span className="text-slate-500">Method</span>

										<span>:</span>

										<span className="break-words font-medium">
											{payment.method}
										</span>
									</div>
								)}
								{payment.accountNumber && (
									<div className="grid grid-cols-[72px_8px_minmax(0,1fr)] gap-1">
										<span className="text-slate-500">Account</span>

										<span>:</span>

										<span className="break-words font-medium">
											{payment.accountNumber}
										</span>
									</div>
								)}

								{payment.accountName && (
									<div className="grid grid-cols-[72px_8px_minmax(0,1fr)] gap-1">
										<span className="text-slate-500">Account Name</span>

										<span>:</span>

										<span className="break-words font-medium">
											{payment.accountName}
										</span>
									</div>
								)}

								{payment.bankName && (
									<div className="grid grid-cols-[72px_8px_minmax(0,1fr)] gap-1">
										<span className="text-slate-500">Bank Name</span>

										<span>:</span>

										<span className="break-words font-medium">
											{payment.bankName}
										</span>
									</div>
								)}

								{payment.sortCode && (
									<div className="grid grid-cols-[72px_8px_minmax(0,1fr)] gap-1">
										<span className="text-slate-500">SWIFT Code</span>
										<span>:</span>

										<span className="break-words font-medium">
											{payment.sortCode}
										</span>
									</div>
								)}
							</div>
						) : (
							<p className="text-[11px] text-slate-400">Payment information</p>
						)}
					</div>
				</div>
			</div>

			<div className="px-7">
				<div className="overflow-hidden rounded-lg border border-slate-300">
					<div
						className="grid grid-cols-[42px_minmax(0,1fr)_minmax(75px,108px)_55px_minmax(75px,108px)] text-center items-center text-[10px] font-bold uppercase tracking-wide text-white"
						style={{
							backgroundColor: "#172033",
						}}>
						<div className="border-r border-white/20 px-2 py-2 text-center">
							No
						</div>

						<div className="min-w-0 border-r border-white/20 px-3 py-2">
							Description
						</div>

						<div className="min-w-0 border-r border-white/20 px-2 py-2">
							Unit Price
						</div>

						<div className="border-r border-white/20 px-2 py-2 text-center">
							Qty
						</div>

						<div className="min-w-0 px-2 py-2">Total</div>
					</div>

					{invoice.items.length > 0 ? (
						invoice.items.map((item, index) => (
							<div
								key={item.id}
								className="grid grid-cols-[42px_minmax(0,1fr)_minmax(75px,108px)_55px_minmax(75px,108px)] items-stretch border-t border-slate-200 text-[11px]">
								<div className="flex min-w-0 items-center justify-center border-r border-slate-200 px-2 py-3">
									{String(index + 1).padStart(2, "0")}
								</div>

								<div className="min-w-0 border-r border-slate-200 px-3 py-3">
									<p className="break-words font-semibold">
										{item.description || "Item description"}
									</p>

									{item.details && (
										<p className="mt-0.5 break-words text-[10px] leading-3 text-slate-500">
											{item.details}
										</p>
									)}
								</div>

								<div className="flex min-w-0 items-center justify-center border-r border-slate-200 px-2 py-3 text-center">
									<span className="min-w-0 max-w-full break-all text-[10px] leading-tight">
										{formatMoney(item.rate)}
									</span>
								</div>

								<div className="flex min-w-0 items-center justify-center border-r border-slate-200 px-2 py-3">
									<span className="whitespace-nowrap">{item.quantity}</span>
								</div>

								<div className="flex min-w-0 items-center justify-center text-center px-2 py-3 text-right font-medium">
									<span className="min-w-0 max-w-full break-all text-[10px] leading-tight">
										{formatMoney(item.quantity * item.rate)}
									</span>
								</div>
							</div>
						))
					) : (
						<div className="px-4 py-7 text-center text-[11px] text-slate-400">
							No invoice items
						</div>
					)}
				</div>
			</div>

			<div className="px-7 py-6">
				<div className="grid grid-cols-[1fr_1fr] gap-4">
					<div className="min-w-0">
						<h3
							className="text-[12px] font-bold uppercase tracking-wide"
							style={{
								color: primaryColor,
							}}>
							Note:
						</h3>

						<div className="mt-2 space-y-1 text-[11px] leading-[1.55] text-slate-600">
							{invoice.notes ? (
								<p className="whitespace-pre-line break-words">
									{invoice.notes}
								</p>
							) : (
								<>
									<p>
										Thank you for choosing {invoice.from.name || "our business"}
										.
									</p>

									<p>We appreciate your business.</p>

									<p>Payment is due within the terms specified above.</p>

									<p>For any questions, please contact us.</p>
								</>
							)}
						</div>

						<div
							className="mt-4 h-px w-full"
							style={{
								backgroundColor: primaryColor,
								opacity: 0.45,
							}}
						/>

						<div className="mt-4 flex gap-3">
							<div
								className="flex w-7 shrink-0 flex-col items-center justify-center gap-2 rounded-lg py-2 text-white"
								style={{
									backgroundColor: "#172033",
								}}>
								<svg
									width="11"
									height="11"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2">
									<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
								</svg>

								<svg
									width="11"
									height="11"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2">
									<rect
										x="3"
										y="5"
										width="18"
										height="14"
										rx="2"
									/>

									<path d="m3 7 9 6 9-6" />
								</svg>

								<svg
									width="11"
									height="11"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round">
									<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
									<circle
										cx="12"
										cy="10"
										r="2.5"
									/>
								</svg>
							</div>

							<div className="min-w-0 space-y-1 mt-1 text-[11px] leading-[1.5] text-slate-600">
								{invoice.from.phone && (
									<p className="break-words">{invoice.from.phone}</p>
								)}

								{invoice.from.email && (
									<p className="break-words">{invoice.from.email}</p>
								)}

								{fromLocation && <p className="break-words">{fromLocation}</p>}
							</div>
						</div>
					</div>

					<div className="min-w-0">
						<div
							className="rounded-lg border px-2 py-3.5"
							style={{
								borderColor: "#dbe2ea",
								backgroundColor: "#fafbfc",
							}}>
							<div className="space-y-2 text-[11px]">
								<div className="flex min-w-0 items-center justify-between gap-4">
									<span className="min-w-0 text-slate-600">Subtotal</span>

									<span className="shrink-0 text-right font-semibold">
										{formatMoney(subtotal)}
									</span>
								</div>

								{invoice.discount > 0 && (
									<div className="flex min-w-0 items-center justify-between gap-4">
										<span className="min-w-0 text-slate-600">
											Discount ({invoice.discount}%)
										</span>

										<span className="shrink-0 text-right">
											-{formatMoney(discountAmount)}
										</span>
									</div>
								)}

								{invoice.tax > 0 && (
									<div className="flex min-w-0 items-center justify-between gap-4">
										<span className="min-w-0 text-slate-600">
											Tax ({invoice.tax}%)
										</span>

										<span className="shrink-0 text-right">
											{formatMoney(taxAmount)}
										</span>
									</div>
								)}
							</div>

							<div
								className="my-3 h-px w-full"
								style={{
									backgroundColor: primaryColor,
								}}
							/>

							<div className="flex min-w-0 items-start justify-between gap-3">
								<span
									className="min-w-0 shrink text-[14px] font-bold uppercase"
									style={{
										color: primaryColor,
									}}>
									Grand Total
								</span>

								<span
									className="min-w-0 max-w-[65%] break-words text-right text-[15px] font-bold leading-tight"
									style={{
										color: primaryColor,
									}}>
									{formatMoney(total)}
								</span>
							</div>
						</div>
						{hasSignature && (
							<div className="mt-8 ml-auto w-full max-w-[220px] text-center">
								<div className="flex h-20 items-end justify-center">
									<img
										src={invoice.signature.image}
										alt="Authorized signature"
										className="mx-auto h-full w-full object-cover"
									/>
								</div>

								<div className="h-px w-full bg-slate-300" />

								<p className="mt-2 text-[12px] font-medium text-slate-700">
									{invoice.signature.name || "Authorized Signature"}
								</p>

								{invoice.signature.title && (
									<p className="mt-0.5 text-[10px] text-slate-400">
										{invoice.signature.title}
									</p>
								)}
							</div>
						)}
					</div>
				</div>
			</div>

			<div
				className="px-7 py-3"
				style={{
					backgroundColor: "#172033",
				}}>
				<div className="flex items-center justify-center gap-3">
					<div
						className="h-px w-8"
						style={{
							backgroundColor: primaryColor,
						}}
					/>

					<p className="text-[9px] font-medium uppercase tracking-[0.28em] text-white/80">
						Thank You!
					</p>

					<div
						className="h-px w-8"
						style={{
							backgroundColor: primaryColor,
						}}
					/>
				</div>
			</div>
		</div>
	);
}
