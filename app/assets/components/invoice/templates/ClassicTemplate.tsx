import type { InvoiceData } from "@/app/assets/types/invoiceType";

interface ClassicTemplateProps {
	invoice: InvoiceData;
}

export default function ClassicTemplate({ invoice }: ClassicTemplateProps) {
	/* -------------------------------------------------------
	 * CALCULATIONS
	 * ----------------------------------------------------- */

	const subtotal = invoice.items.reduce(
		(total, item) => total + item.quantity * item.rate,
		0,
	);

	const discountAmount = subtotal * ((invoice.discount || 0) / 100);

	const taxBase = subtotal - discountAmount;

	const taxAmount = taxBase * ((invoice.tax || 0) / 100);

	const total = taxBase + taxAmount;

	/* -------------------------------------------------------
	 * FORMATTING
	 * ----------------------------------------------------- */

	const formatMoney = (amount: number) =>
		new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: invoice.currency || "USD",
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(amount);

	/*
	 * Keep the template connected to the user's selected
	 * branding color.
	 *
	 * The reference uses yellow, but using the branding color
	 * means the template still works with InvoiceNow's
	 * customization system.
	 */
	const primary = invoice.branding.primaryColor || "#FBC400";

	const dark = "#292A34";

	const muted = "#666666";

	/* -------------------------------------------------------
	 * HELPER
	 * ----------------------------------------------------- */

	const joinLocation = (city?: string, country?: string) => {
		return [city, country].filter(Boolean).join(", ");
	};

	const fromLocation = joinLocation(invoice.from.city, invoice.from.country);

	const clientLocation = joinLocation(
		invoice.billTo.city,
		invoice.billTo.country,
	);

	return (
		<div
			className="w-full bg-white text-[#171717]"
			style={{
				fontFamily: "Arial, Helvetica, sans-serif",
			}}>
			<div className="mx-auto w-full bg-white px-[42px] pb-[24px] pt-[30px]">
				{/* =====================================================
				    HEADER
				===================================================== */}

				<div className="relative">
					{/* Logo */}

					<div className="flex h-[48px] items-center">
						{invoice.branding.logo ? (
							<img
								src={invoice.branding.logo}
								alt={invoice.from.name || "Business logo"}
								className="h-[42px] max-w-[155px] object-contain object-left"
							/>
						) : (
							<div className="flex flex-col">
								<div className="text-[17px] font-bold tracking-[0.08em] text-[#202020]">
									{invoice.from.name || "Brand Name"}
								</div>

								<div className="mt-[1px] text-[5px] font-medium uppercase tracking-[0.22em] text-[#777]">
									YOUR BRAND SLOGAN HERE
								</div>
							</div>
						)}
					</div>

					{/* =================================================
					    TITLE BAR
					================================================= */}

					<div className="relative mt-[20px] h-[27px]">
						{/* Left yellow bar */}

						<div
							className="absolute left-[-42px] top-0 h-[27px] w-[245px]"
							style={{
								backgroundColor: primary,
							}}
						/>

						{/* Right yellow bar */}

						<div
							className="absolute right-[-42px] top-0 h-[27px] w-[44px]"
							style={{
								backgroundColor: primary,
							}}
						/>

						{/* Invoice title */}

						<div className="absolute inset-0 flex items-center justify-end">
							<div
								className="bg-white px-[13px] text-[31px] font-light leading-none tracking-[-0.04em] text-[#202020]"
								style={{
									fontFamily: "Arial, Helvetica, sans-serif",
								}}>
								INVOICE
							</div>
						</div>
					</div>
				</div>

				{/* =====================================================
				    INVOICE / CLIENT INFORMATION
				===================================================== */}

				<div className="mt-[13px] grid grid-cols-[1fr_1fr] gap-[45px]">
					{/* BILL TO */}

					<div>
						<div className="text-[11px] font-bold uppercase tracking-[0.04em] text-[#222]">
							Invoice to:
						</div>

						<div className="mt-[2px] text-[12px] font-bold text-[#222]">
							{invoice.billTo.name || "Client Name"}
						</div>

						<div className="mt-[2px] max-w-[220px] text-[8px] leading-[1.45] text-[#555]">
							{invoice.billTo.address && <div>{invoice.billTo.address}</div>}

							{clientLocation && <div>{clientLocation}</div>}

							{invoice.billTo.email && <div>{invoice.billTo.email}</div>}

							{invoice.billTo.phone && <div>{invoice.billTo.phone}</div>}
						</div>
					</div>

					{/* INVOICE DETAILS */}

					<div className="flex justify-end">
						<div className="w-[145px]">
							<div className="grid grid-cols-[1fr_auto] gap-x-[18px] text-[8px] leading-[1.8] text-[#333]">
								<span className="font-bold">Invoice#</span>

								<span className="text-right">
									{invoice.invoiceNumber || "—"}
								</span>

								<span className="font-bold">Date</span>

								<span className="text-right">{invoice.issueDate || "—"}</span>

								<span className="font-bold">Due Date</span>

								<span className="text-right">{invoice.dueDate || "—"}</span>
							</div>
						</div>
					</div>
				</div>

				{/* =====================================================
				    ITEMS TABLE
				===================================================== */}

				<div className="mt-[20px] overflow-hidden border border-[#bfc1c5]">
					{/* TABLE HEADER */}

					<div
						className="grid grid-cols-[40px_minmax(0,1fr)_80px_55px_75px] items-center px-[9px] py-[7px] text-[7.5px] font-bold uppercase tracking-[0.02em] text-white"
						style={{
							backgroundColor: dark,
						}}>
						<span>SL.</span>

						<span>Item Description</span>

						<span className="text-right">Price</span>

						<span className="text-right">Qty.</span>

						<span className="text-right">Total</span>
					</div>

					{/* TABLE BODY */}

					<div
						className="min-h-[220px]"
						style={{
							backgroundColor: "#ffffff",
						}}>
						{invoice.items.length > 0 ? (
							invoice.items.map((item, index) => (
								<div
									key={item.id || index}
									className="grid min-h-[35px] grid-cols-[40px_minmax(0,1fr)_80px_55px_75px] items-center px-[9px] text-[8px] text-[#222]"
									style={{
										backgroundColor: index % 2 === 1 ? "#f1f1f1" : "#ffffff",
										borderBottom: "1px solid #dedede",
									}}>
									<span>{String(index + 1).padStart(2, "0")}</span>

									<div className="min-w-0 pr-3">
										<div className="truncate font-medium">
											{item.description || "Item description"}
										</div>

										{item.details && (
											<div className="mt-[1px] truncate text-[6.5px] text-[#777]">
												{item.details}
											</div>
										)}
									</div>

									<span className="text-right">{formatMoney(item.rate)}</span>

									<span className="text-right">{item.quantity}</span>

									<span className="text-right font-medium">
										{formatMoney(item.quantity * item.rate)}
									</span>
								</div>
							))
						) : (
							<div className="flex min-h-[220px] items-start justify-center pt-[18px] text-[8px] text-[#999]">
								No invoice items
							</div>
						)}
					</div>
				</div>

				{/* =====================================================
				    LOWER CONTENT
				===================================================== */}

				<div className="mt-[11px] grid grid-cols-[1fr_172px] gap-[35px]">
					{/* LEFT SIDE */}

					<div>
						{/* Thank you */}

						<div className="text-[8px] font-medium text-[#222]">
							{invoice.notes || "Thank you for your business!"}
						</div>

						{/* Terms */}

						<div className="mt-[12px]">
							<div className="text-[8px] font-bold uppercase tracking-[0.03em] text-[#222]">
								Terms & Conditions
							</div>

							<div className="mt-[3px] max-w-[225px] text-[6.5px] leading-[1.45] text-[#555]">
								{invoice.terms ||
									"Payment is due according to the terms stated on this invoice. Thank you for your business."}
							</div>
						</div>

						{/* Payment */}

						<div className="mt-[12px]">
							<div className="text-[8px] font-bold text-[#222]">
								Payment Info:
							</div>

							<div className="mt-[3px] text-[6.5px] leading-[1.5] text-[#555]">
								{invoice.payment.accountNumber && (
									<div>Account #: {invoice.payment.accountNumber}</div>
								)}

								{invoice.payment.accountName && (
									<div>A/C Name: {invoice.payment.accountName}</div>
								)}

								{invoice.payment.bankName && (
									<div>Bank Details: {invoice.payment.bankName}</div>
								)}

								{invoice.payment.method && (
									<div>Method: {invoice.payment.method}</div>
								)}
							</div>
						</div>
					</div>

					{/* RIGHT SIDE - TOTALS */}

					<div>
						<div className="space-y-[3px] text-[8px] text-[#222]">
							<div className="flex justify-between">
								<span>Sub Total:</span>

								<span>{formatMoney(subtotal)}</span>
							</div>

							{invoice.discount > 0 && (
								<div className="flex justify-between">
									<span>Discount:</span>

									<span>-{formatMoney(discountAmount)}</span>
								</div>
							)}

							<div className="flex justify-between">
								<span>Tax:</span>

								<span>{invoice.tax || 0}%</span>
							</div>

							{invoice.tax > 0 && (
								<div className="flex justify-between">
									<span>Tax Amount:</span>

									<span>{formatMoney(taxAmount)}</span>
								</div>
							)}
						</div>

						{/* TOTAL BAR */}

						<div
							className="mt-[7px] flex h-[24px] items-center justify-between px-[18px] text-[10px] font-medium"
							style={{
								backgroundColor: primary,
								color: "#171717",
							}}>
							<span>Total:</span>

							<span>{formatMoney(total)}</span>
						</div>

						{/* SIGNATURE */}

						{invoice.signature.name && (
							<div className="mt-[24px] flex justify-end">
								<div className="w-[95px] text-center">
									{invoice.signature.image && (
										<img
											src={invoice.signature.image}
											alt="Signature"
											className="mx-auto mb-[3px] h-[28px] max-w-[90px] object-contain"
										/>
									)}

									<div className="border-b border-[#777]" />

									<div className="mt-[4px] text-[7px] font-bold text-[#222]">
										{invoice.signature.name}
									</div>

									{invoice.signature.title && (
										<div className="mt-[1px] text-[6px] text-[#666]">
											{invoice.signature.title}
										</div>
									)}
								</div>
							</div>
						)}
					</div>
				</div>

				{/* =====================================================
				    FOOTER
				===================================================== */}

				<div className="mt-[22px]">
					{/* Footer yellow line */}

					<div className="relative h-[2px] w-full">
						<div
							className="absolute left-0 top-0 h-[2px] w-[67%]"
							style={{
								backgroundColor: primary,
							}}
						/>

						<div
							className="absolute right-0 top-0 h-[2px] w-[10%]"
							style={{
								backgroundColor: primary,
							}}
						/>
					</div>

					{/* Footer contact */}

					<div className="mt-[7px] flex items-center justify-center gap-[13px] text-[7px] font-medium text-[#222]">
						<span>{invoice.from.phone || "Phone #"}</span>

						<span className="text-[#555]">|</span>

						<span>{invoice.from.address || "Address"}</span>

						<span className="text-[#555]">|</span>

						<span>{invoice.from.email || "Website"}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
