import type { InvoiceData } from "@/app/assets/types/invoiceType";

interface ClassicTemplateProps {
	invoice: InvoiceData;
}

/* =========================================================
   TYPES
========================================================= */

type FooterIconType = "email" | "website" | "location";

/* =========================================================
   FOOTER ICON
========================================================= */

function FooterIcon({ type }: { type: FooterIconType }) {
	if (type === "email") {
		return (
			<svg
				width="15"
				height="15"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true">
				<circle
					cx="12"
					cy="12"
					r="8"
					stroke="currentColor"
					strokeWidth="2.2"
				/>

				<path
					d="M8.5 10.5L12 13L15.5 10.5"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>

				<path
					d="M8.5 10.5V15H15.5V10.5"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		);
	}

	if (type === "website") {
		return (
			<svg
				width="15"
				height="15"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true">
				<circle
					cx="12"
					cy="12"
					r="8"
					stroke="currentColor"
					strokeWidth="2.2"
				/>

				<path
					d="M4 12H20"
					stroke="currentColor"
					strokeWidth="2"
				/>

				<path
					d="M12 4C14.2 6.2 15.2 8.8 15.2 12C15.2 15.2 14.2 17.8 12 20"
					stroke="currentColor"
					strokeWidth="2"
				/>

				<path
					d="M12 4C9.8 6.2 8.8 8.8 8.8 12C8.8 15.2 9.8 17.8 12 20"
					stroke="currentColor"
					strokeWidth="2"
				/>
			</svg>
		);
	}

	return (
		<svg
			width="15"
			height="15"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true">
			<path
				d="M12 21C12 21 18 15.2 18 10.5C18 7.46 15.31 5 12 5C8.69 5 6 7.46 6 10.5C6 15.2 12 21 12 21Z"
				stroke="currentColor"
				strokeWidth="2.2"
			/>

			<circle
				cx="12"
				cy="10.5"
				r="2"
				stroke="currentColor"
				strokeWidth="2"
			/>
		</svg>
	);
}

/* =========================================================
   BRAND MARK
========================================================= */

function BrandMark({
	logo,
	businessName,
	primaryColor,
}: {
	logo?: string;
	businessName?: string;
	primaryColor: string;
}) {
	const brandName = businessName?.trim() || "Brand Name";

	const firstCharacter = brandName.charAt(0).toUpperCase() || "B";

	/* -------------------------------------------------------
	   UPLOADED LOGO
	------------------------------------------------------- */

	if (logo) {
		return (
			<div className="flex flex-col items-end">
				<img
					src={logo}
					alt={`${brandName} logo`}
					className="h-[54px] max-w-[155px] object-contain object-right"
				/>

				<div className="mt-[5px] text-right">
					<div className="text-[20px] font-medium uppercase leading-none tracking-[0.01em] text-[#222]">
						{brandName}
					</div>
				</div>
			</div>
		);
	}

	/* -------------------------------------------------------
	   DEFAULT LETTER LOGO
	------------------------------------------------------- */

	return (
		<div className="flex flex-col items-end">
			<div
				className="flex h-[42px] w-[42px] items-center justify-center text-[25px] font-bold uppercase leading-none text-white"
				style={{
					backgroundColor: primaryColor,
				}}>
				{firstCharacter}
			</div>

			<div className="mt-[5px] text-right">
				<div className="text-[20px] font-medium uppercase leading-none tracking-[0.01em] text-[#222]">
					{brandName}
				</div>

				
			</div>
		</div>
	);
}

/* =========================================================
   CLASSIC TEMPLATE
========================================================= */

export default function ClassicTemplate({ invoice }: ClassicTemplateProps) {
	/* -------------------------------------------------------
	 * CALCULATIONS
	 * ----------------------------------------------------- */

	const subtotal = invoice.items.reduce(
		(total, item) => total + Number(item.quantity) * Number(item.rate),
		0,
	);

	const discountRate = Number(invoice.discount || 0);

	const discountAmount = subtotal * (discountRate / 100);

	const taxBase = Math.max(subtotal - discountAmount, 0);

	const taxRate = Number(invoice.tax || 0);

	const taxAmount = taxBase * (taxRate / 100);

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

	/* -------------------------------------------------------
	 * COLORS
	 * ----------------------------------------------------- */

	const primary = invoice.branding.primaryColor || "#FBC400";

	const rowGray = "#E5E5E5";
	const lightBorder = "#BDBDBD";
	const muted = "#555555";

	/* -------------------------------------------------------
	 * HELPERS
	 * ----------------------------------------------------- */

	const joinLocation = (city?: string, country?: string) => {
		return [city, country].filter(Boolean).join(", ");
	};

	const clientLocation = joinLocation(
		invoice.billTo.city,
		invoice.billTo.country,
	);

	const fromLocation = joinLocation(invoice.from.city, invoice.from.country);

	const fromWithWebsite = invoice.from as typeof invoice.from & {
		website?: string;
	};

	const footerWebsite = fromWithWebsite.website || "www.yourdomain.com";

	const businessName = invoice.from.name?.trim() || "Brand Name";

	/* -------------------------------------------------------
	 * MANUAL SIGNATURE
	 * ----------------------------------------------------- */

	const hasSignature = !!invoice.signature?.image;

	/* -------------------------------------------------------
	 * RENDER
	 * ----------------------------------------------------- */

	return (
		<div className="w-full bg-white text-[#171717]">
			<div
				id="classic-invoice"
				className="
					relative
					mx-auto
					box-border
					w-full
					overflow-hidden
					bg-white
					border-l-[5px]
					pb-[22px]
					pt-[48px]
				"
				style={{
					borderLeftColor: primary,
				}}>
				<div className="px-[50px]">
					{/* =============================================
					    HEADER
					============================================= */}

					<div className="relative">
						<div className="grid grid-cols-[1fr_1fr] gap-[35px]">
							{/* -----------------------------------------
							    LEFT HEADER
							----------------------------------------- */}

							<div>
								<h1
									className="
										m-0
										text-[36px]
										font-bold
										leading-none
										tracking-[-1.2px]
										text-[#111]
									">
									INVOICE
								</h1>

								{/* INVOICE DETAILS */}

								<div className="mt-[11px]">
									<div className="grid grid-cols-[55px_8px_1fr] text-[9px] leading-[1.8] text-[#222]">
										<span className="font-bold">Invoice No</span>
										<span>:</span>
										<span>{invoice.invoiceNumber || "123 45698"}</span>
									</div>

									<div className="grid grid-cols-[55px_8px_1fr] text-[9px] leading-[1.8] text-[#222]">
										<span className="font-bold">Date</span>
										<span>:</span>
										<span>{invoice.issueDate || "01 / 10 / 2020"}</span>
									</div>

									<div className="grid grid-cols-[55px_8px_1fr] text-[9px] leading-[1.8] text-[#222]">
										<span className="font-bold">Due Date</span>
										<span>:</span>
										<span>{invoice.dueDate || "25 / 05 / 2021"}</span>
									</div>

									{/* <div className="grid grid-cols-[55px_8px_1fr] text-[9px] leading-[1.8] text-[#222]">
										<span className="font-bold">Account No</span>
										<span>:</span>
										<span>{invoice.payment.accountNumber || "242548 85"}</span>
									</div> */}
								</div>

								{/* BILL TO */}

								<div className="mt-[24px]">
									<div className="text-[9px] font-bold uppercase leading-none text-[#222]">
										BILL TO:
									</div>

									<div className="mt-[3px] text-[9.5px] font-bold uppercase leading-[1.15] text-[#222]">
										{invoice.billTo.name || "COMPANY NAME"}
									</div>

									<div className="mt-[2px] max-w-[180px] text-[9px] leading-[1.45] text-[#333]">
										{invoice.billTo.address && (
											<div>{invoice.billTo.address}</div>
										)}

										{clientLocation && <div>{clientLocation}</div>}

										{invoice.billTo.email && <div>{invoice.billTo.email}</div>}

										{invoice.billTo.phone && <div>{invoice.billTo.phone}</div>}
									</div>
								</div>
							</div>

							{/* -----------------------------------------
							    RIGHT HEADER
							----------------------------------------- */}

							<div className="flex flex-col items-end">
								<BrandMark
									logo={invoice.branding.logo}
									businessName={businessName}
									primaryColor={primary}
								/>

								{/* PAYMENT INFO */}

								<div className="mt-[18px] w-[150px] self-end">
									<div className="text-[10px] font-bold uppercase leading-[1] text-[#222]">
										PAYMENT INFO
									</div>

									<div className="mt-[6px] text-[9px] leading-[1.7] text-[#333]">
										{invoice.payment.accountNumber && (
											<div className="grid grid-cols-[45px_8px_1fr]">
												<span>Account</span>
												<span>:</span>
												<span>{invoice.payment.accountNumber}</span>
											</div>
										)}

										{invoice.payment.accountName && (
											<div className="grid grid-cols-[45px_8px_1fr]">
												<span>A/C Name</span>
												<span>:</span>
												<span>{invoice.payment.accountName}</span>
											</div>
										)}

										{invoice.payment.bankName && (
											<div className="mt-[1px]">
												Bank Details : {invoice.payment.bankName}
											</div>
										)}

										{invoice.payment.method && (
											<div>Method : {invoice.payment.method}</div>
										)}

										{invoice.payment.sortCode && (
											<div>SWIFT Code : {invoice.payment.sortCode}</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* =============================================
					    ITEMS TABLE
					============================================= */}

					<div className="mt-[25px] w-full overflow-hidden">
						{/* TABLE HEADER */}
						<div
							className="
			grid
			w-full
			grid-cols-[43px_minmax(0,1fr)_90px_55px_90px]
			items-center
			border
			px-[10px]
			py-[9px]
			text-[9.5px]
			font-bold
			uppercase
			leading-none
			text-white
			box-border
		"
							style={{
								backgroundColor: primary,
								borderColor: primary,
							}}>
							{/* NO */}
							<span className="min-w-0 border-r border-white/30 text-center">
								NO
							</span>

							{/* DESCRIPTION */}
							<span className="min-w-0 border-r border-white/30 pl-[10px] text-left">
								PRODUCT DESCRIPTION
							</span>

							{/* UNIT PRICE */}
							<span className="min-w-0 border-r border-white/30 px-[3px] text-center">
								UNIT PRICE
							</span>

							{/* QTY */}
							<span className="min-w-0 border-r border-white/30 text-center">
								QTY
							</span>

							{/* TOTAL */}
							<span className="min-w-0 px-[3px] text-center">TOTAL</span>
						</div>

						{/* TABLE BODY */}
						<div className="w-full">
							{invoice.items.length > 0 ? (
								invoice.items.map((item, index) => {
									const lineTotal = Number(item.quantity) * Number(item.rate);

									return (
										<div
											key={item.id || index}
											className="
							grid
							w-full
							grid-cols-[43px_minmax(0,1fr)_90px_55px_90px]
							min-h-[35px]
							items-stretch
							border-x
							border-b
							px-[10px]
							text-[10px]
							text-[#222]
							box-border
						"
											style={{
												backgroundColor: index % 2 === 1 ? rowGray : "#ffffff",
												borderColor: lightBorder,
											}}>
											{/* NO */}
											<div className="flex min-w-0 items-center justify-center border-r border-[#BDBDBD] py-[10px]">
												<span className="min-w-0">
													{String(index + 1).padStart(2, "0")}
												</span>
											</div>

											{/* DESCRIPTION */}
											<div className="min-w-0 overflow-hidden border-r border-[#BDBDBD] py-[10px] pl-[10px] pr-[8px]">
												<div className="min-w-0 break-words">
													{item.description || "Item description"}
												</div>

												{item.details && (
													<div className="mt-[1px] min-w-0 break-words text-[8px] leading-tight text-[#777]">
														{item.details}
													</div>
												)}
											</div>

											{/* UNIT PRICE */}
											<div
												className="
								flex
								min-w-0
								max-w-full
								items-center
								justify-center
								overflow-hidden
								border-r
								border-[#BDBDBD]
								px-[4px]
								py-[10px]
								box-border
							">
												<span
													className="
									block
									w-full
									min-w-0
									max-w-full
									break-all
									text-center
									text-[9px]
									leading-tight
								">
													{formatMoney(Number(item.rate))}
												</span>
											</div>

											{/* QTY */}
											<div className="flex min-w-0 items-center justify-center border-r border-[#BDBDBD] px-[2px] py-[10px]">
												<span className="min-w-0 max-w-full text-center">
													{item.quantity}
												</span>
											</div>

											{/* TOTAL */}
											<div
												className="
								flex
								min-w-0
								max-w-full
								items-center
								justify-center
								overflow-hidden
								px-[4px]
								py-[10px]
								box-border
							">
												<span
													className="
									block
									w-full
									min-w-0
									max-w-full
									break-all
									text-center
									text-[9px]
									font-medium
									leading-tight
								">
													{formatMoney(lineTotal)}
												</span>
											</div>
										</div>
									);
								})
							) : (
								<div
									className="
					flex
					min-h-[120px]
					items-start
					justify-center
					border-x
					border-b
					pt-[15px]
					text-[10px]
					text-[#999]
				"
									style={{
										borderColor: lightBorder,
									}}>
									No invoice items
								</div>
							)}
						</div>
					</div>
					{/* =============================================
					    LOWER CONTENT
					============================================= */}

					<div className="grid grid-cols-[1fr_170px] gap-[38px]">
						{/* LEFT LOWER SECTION */}

						<div className="relative min-h-[160px] pt-[30px]">
							{/* TERMS */}

							<div>
								<div className="text-[10px] font-bold uppercase leading-none text-[#222]">
									NOTE:
								</div>

								<div className="mt-[6px] max-w-[225px] text-[8.5px] leading-[1.7] text-[#444] wrap-break-word">
									{invoice.notes ||
										"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt."}
								</div>
							</div>
						</div>

						{/* RIGHT LOWER SECTION */}

						<div className="relative min-h-[160px] mt-5 mb-8">
							{/* TOTALS */}
							<div
								className="
			mt-[4px]
			w-full
			max-w-full
			overflow-hidden
			border
			border-[#D0D0D0]
			bg-[#E5E5E5]
			px-[13px]
			py-[8px]
			box-border
			
		">
								<div className="w-full min-w-0 space-y-0.5">
									{/* SUB TOTAL */}
									<div className="flex min-w-0 items-start justify-between gap-[12px] text-[9px] leading-[1.65] text-[#222]">
										<span className="min-w-0 shrink-0">Sub Total</span>

										<span className="min-w-0 max-w-[65%] break-all text-right">
											{formatMoney(subtotal)}
										</span>
									</div>

									{/* DISCOUNT */}
									{discountRate > 0 && (
										<div className="flex min-w-0 items-start justify-between gap-[12px] text-[9px] leading-[1.65] text-[#222]">
											<span className="min-w-0 shrink-0">
												Discount {discountRate}%
											</span>

											<span className="min-w-0 max-w-[65%] break-all text-right">
												-{formatMoney(discountAmount)}
											</span>
										</div>
									)}

									{/* TAX */}
									<div className="flex min-w-0 items-start justify-between gap-[12px] text-[9px] leading-[1.65] text-[#222]">
										<span className="min-w-0 shrink-0">Tax {taxRate}%</span>

										<span className="min-w-0 max-w-[65%] break-all text-right">
											{formatMoney(taxAmount)}
										</span>
									</div>

									{/* GRAND TOTAL */}
									<div className="mt-3 flex min-w-0 items-start justify-between gap-[12px] text-[9.5px] font-bold leading-[1.65] text-[#222]">
										<span className="min-w-0 shrink-0">Grand Total</span>

										<span className="min-w-0 max-w-[65%] break-all text-right">
											{formatMoney(total)}
										</span>
									</div>
								</div>
							</div>

							{/* MANUAL SIGNATURE */}
							{hasSignature ? (
								<div className="absolute bottom-[11px] right-[2px] w-[96px] text-center">
									{/* Signature image */}
									<div className="flex h-[34px] items-end justify-center overflow-hidden">
										<img
											src={invoice.signature!.image}
											alt="Authorized signature"
											className="mx-auto mb-[2px] h-full w-full object-cover"
											style={{
												filter: "brightness(0)",
											}}
										/>
									</div>

									{/* Signature line */}
									<div
										className="h-px w-full"
										style={{
											backgroundColor: muted,
										}}
									/>

									{/* Signatory name */}
									<p className="mt-[5px] text-[10px] font-normal text-[#222]">
										{invoice.signature?.name || "Authorized Signature"}
									</p>

									{/* Signatory title */}
									{invoice.signature?.title && (
										<p className="mt-[1px] text-[8px] text-[#666]">
											{invoice.signature.title}
										</p>
									)}
								</div>
							) : (
								<div className="absolute -bottom-4 right-[2px] w-[96px] text-center">
									<div
										className="h-px w-full"
										style={{
											backgroundColor: muted,
										}}
									/>

									<div className="mt-[5px] text-[10px] text-[#222]">
										Signature
									</div>
								</div>
							)}
						</div>
					</div>

					{/* =============================================
					    FOOTER
					============================================= */}

					<div className="mt-[4px]">
						{/* TOP FOOTER LINE */}

						<div
							className="h-[2px] w-full"
							style={{
								backgroundColor: primary,
							}}
						/>

						{/* CONTACT INFORMATION */}

						<div className="grid grid-cols-3 items-start pt-[10px]">
							{/* EMAIL */}

							<div className="flex flex-col items-center text-center">
								<div className="text-[#111]">
									<FooterIcon type="email" />
								</div>

								<div className="mt-[4px] max-w-[135px] break-words text-[8px] leading-[1.2] text-[#222]">
									{invoice.from.email || "yourcompanyemail.com"}
								</div>
							</div>

							{/* WEBSITE */}

							<div className="flex flex-col items-center text-center">
								<div className="text-[#111]">
									<FooterIcon type="website" />
								</div>

								<div className="mt-[4px] max-w-[135px] break-words text-[8px] leading-[1.2] text-[#222]">
									{footerWebsite}
								</div>
							</div>

							{/* ADDRESS */}

							<div className="flex flex-col items-center text-center">
								<div className="text-[#111]">
									<FooterIcon type="location" />
								</div>

								<div className="mt-[4px] max-w-[145px] break-words text-[8px] leading-[1.25] text-[#222]">
									{invoice.from.address ||
										fromLocation ||
										"123, Lorem Ipsum, Business Address"}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
