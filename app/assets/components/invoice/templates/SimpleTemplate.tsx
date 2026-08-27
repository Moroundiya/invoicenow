import type { InvoiceData } from "@/app/assets/types/invoiceType";

interface SimpleTemplateProps {
	invoice: InvoiceData;
}

export default function SimpleTemplate({ invoice }: SimpleTemplateProps) {
	const subtotal = invoice.items.reduce(
		(total, item) => total + item.quantity * item.rate,
		0,
	);

	const discountAmount = subtotal * ((invoice.discount || 0) / 100);

	const taxBase = subtotal - discountAmount;

	const taxAmount = taxBase * ((invoice.tax || 0) / 100);

	const total = taxBase + taxAmount;

	const primaryColor = invoice.branding.primaryColor || "#2563eb";

	const formatMoney = (amount: number) =>
		new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: invoice.currency || "USD",
		}).format(amount);

	const fromLocation = [invoice.from.city, invoice.from.country]
		.filter(Boolean)
		.join(", ");

	const billToLocation = [invoice.billTo.city, invoice.billTo.country]
		.filter(Boolean)
		.join(", ");

	return (
		<div
			id="simple-invoice"
			className="relative m-0 w-[700px] max-w-full overflow-hidden bg-white p-0 text-[#172033]"
			style={{
				width: "700px",
				maxWidth: "100%",
				minWidth: "0",
				margin: 0,
				padding: 0,
				boxSizing: "border-box",
				overflow: "hidden",
				fontFamily: "var(--font-jakarta)",
			}}>
			<div
				style={{
					width: "700px",
					maxWidth: "100%",
					margin: 0,
					padding: "34px 40px 28px",
					boxSizing: "border-box",
					overflow: "hidden",
				}}>
				<div
					style={{
						width: "100%",
						maxWidth: "100%",
						display: "flex",
						alignItems: "flex-start",
						justifyContent: "space-between",
						gap: "28px",
						boxSizing: "border-box",
					}}>
					<div
						style={{
							flex: "1 1 0%",
							minWidth: 0,
						}}
					/>

					<div
						style={{
							flex: "0 0 210px",
							width: "210px",
							maxWidth: "210px",
							minWidth: 0,
							textAlign: "right",
							boxSizing: "border-box",
						}}>
						<div
							style={{
								fontSize: "30px",
								lineHeight: 1,
								fontWeight: 700,
								letterSpacing: "-0.6px",
								color: primaryColor,
								whiteSpace: "nowrap",
							}}>
							INVOICE
						</div>

						<div
							style={{
								marginTop: "14px",
								fontSize: "11.5px",
								lineHeight: 1.75,
								color: "#172033",
								overflowWrap: "anywhere",
							}}>
							<div>
								<strong>Invoice No:</strong> {invoice.invoiceNumber || "—"}
							</div>

							<div>
								<strong>Issue Date:</strong> {invoice.issueDate || "—"}
							</div>

							<div>
								<strong>Due Date:</strong> {invoice.dueDate || "—"}
							</div>
						</div>
					</div>
				</div>

				<div
					style={{
						width: "100%",
						maxWidth: "100%",
						display: "grid",
						gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
						marginTop: "24px",
						border: `1px solid ${primaryColor}35`,
						borderRadius: "6px",
						overflow: "hidden",
						boxSizing: "border-box",
					}}>
					<div
						style={{
							minWidth: 0,
							padding: "13px 15px",
							borderRight: `1px solid ${primaryColor}25`,
							boxSizing: "border-box",
							overflow: "hidden",
						}}>
						<div
							style={{
								fontSize: "10px",
								fontWeight: 700,
								letterSpacing: "0.45px",
								textTransform: "uppercase",
								color: primaryColor,
							}}>
							Bill From
						</div>

						<div
							style={{
								marginTop: "6px",
								fontSize: "13px",
								fontWeight: 700,
								color: "#172033",
								overflowWrap: "anywhere",
							}}>
							{invoice.from.name || "Your Business"}
						</div>

						<div
							style={{
								marginTop: "3px",
								fontSize: "10.5px",
								lineHeight: 1.55,
								color: "#66758f",
								overflowWrap: "anywhere",
							}}>
							{invoice.from.address || "Business address"}

							{fromLocation && (
								<>
									<br />
									{fromLocation}
								</>
							)}

							{invoice.from.email && (
								<>
									<br />
									{invoice.from.email}
								</>
							)}

							{invoice.from.phone && (
								<>
									<br />
									{invoice.from.phone}
								</>
							)}
						</div>
					</div>

					<div
						style={{
							minWidth: 0,
							padding: "13px 15px",
							boxSizing: "border-box",
							overflow: "hidden",
						}}>
						<div
							style={{
								fontSize: "10px",
								fontWeight: 700,
								letterSpacing: "0.45px",
								textTransform: "uppercase",
								color: primaryColor,
							}}>
							Bill To
						</div>

						<div
							style={{
								marginTop: "6px",
								fontSize: "13px",
								fontWeight: 700,
								color: "#172033",
								overflowWrap: "anywhere",
							}}>
							{invoice.billTo.name || "Client Name"}
						</div>

						<div
							style={{
								marginTop: "3px",
								fontSize: "10.5px",
								lineHeight: 1.55,
								color: "#66758f",
								overflowWrap: "anywhere",
							}}>
							{invoice.billTo.address || "Client address"}

							{billToLocation && (
								<>
									<br />
									{billToLocation}
								</>
							)}

							{invoice.billTo.email && (
								<>
									<br />
									{invoice.billTo.email}
								</>
							)}

							{invoice.billTo.phone && (
								<>
									<br />
									{invoice.billTo.phone}
								</>
							)}
						</div>
					</div>
				</div>

				<div className="mt-[21px] w-full max-w-full overflow-hidden rounded-[5px] border border-[#dbe3f0] box-border">
					<div
						className="grid w-full grid-cols-[minmax(0,1fr)_45px_minmax(0,75px)_minmax(0,80px)] items-stretch gap-0 bg-[var(--primary-color)] text-[10px] font-bold uppercase tracking-[0.2px] text-white"
						style={
							{
								"--primary-color": primaryColor,
							} as React.CSSProperties
						}>
						<div className="flex min-w-0 items-center border-r border-white/30 px-2 py-[5px] box-border">
							Description
						</div>

						<div className="flex min-w-0 items-center justify-center border-r border-white/30 px-[5px] py-[5px] text-center box-border">
							Qty
						</div>

						<div className="flex min-w-0 items-center justify-end border-r border-white/30 px-[7px] py-[5px] text-right box-border">
							Rate
						</div>

						<div className="flex min-w-0 items-center justify-end px-[7px] py-[5px] text-right box-border">
							Amount
						</div>
					</div>

					{invoice.items.map((item, index) => (
						<div
							key={item.id}
							className="grid w-full grid-cols-[minmax(0,1fr)_45px_minmax(0,75px)_minmax(0,80px)] items-stretch gap-0 border-t border-[#dbe3f0] text-[11px] box-border">
							<div className="flex min-w-0 flex-col justify-center overflow-hidden border-r border-[#dbe3f0] px-2 py-[7px] box-border">
								<div className="break-words text-[11.5px] font-semibold leading-[1.35] text-[#172033]">
									{item.description || "Item description"}
								</div>

								{item.details && (
									<div className="mt-[2px] break-words text-[10px] leading-[1.35] text-[#7a879c]">
										{item.details}
									</div>
								)}
							</div>

							<div className="flex min-w-0 items-center justify-center border-r border-[#dbe3f0] px-[5px] py-[7px] text-center box-border">
								{item.quantity}
							</div>

							<div className="flex min-w-0 max-w-full items-center justify-end overflow-hidden border-r border-[#dbe3f0] px-[7px] py-[7px] text-right leading-[1.2] box-border whitespace-normal break-all">
								{formatMoney(item.rate)}
							</div>

							<div className="flex min-w-0 max-w-full items-center justify-end overflow-hidden px-[7px] py-[7px] text-right font-semibold leading-[1.2] box-border whitespace-normal break-all">
								{formatMoney(item.quantity * item.rate)}
							</div>
						</div>
					))}

					{invoice.items.length === 0 && (
						<div className="border-t border-[#dbe3f0] px-[10px] py-[18px] text-center text-[10.5px] text-[#94a3b8]">
							No invoice items
						</div>
					)}
				</div>

				<div
					style={{
						width: "100%",
						maxWidth: "100%",
						display: "flex",
						justifyContent: "flex-end",
						marginTop: "15px",
						boxSizing: "border-box",
					}}>
					<div
						style={{
							width: "225px",
							maxWidth: "100%",
							minWidth: 0,
						}}>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								gap: "12px",
								padding: "3px 0",
								fontSize: "11px",
							}}>
							<span style={{ color: "#66758f" }}>Subtotal</span>

							<span
								style={{
									fontWeight: 600,
									whiteSpace: "nowrap",
								}}>
								{formatMoney(subtotal)}
							</span>
						</div>

						{invoice.discount > 0 && (
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									gap: "12px",
									padding: "3px 0",
									fontSize: "11px",
								}}>
								<span
									style={{
										color: "#66758f",
									}}>
									Discount ({invoice.discount}%)
								</span>

								<span style={{ whiteSpace: "nowrap" }}>
									-{formatMoney(discountAmount)}
								</span>
							</div>
						)}

						{invoice.tax > 0 && (
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									gap: "12px",
									padding: "3px 0",
									fontSize: "11px",
								}}>
								<span
									style={{
										color: "#66758f",
									}}>
									Tax ({invoice.tax}%)
								</span>

								<span style={{ whiteSpace: "nowrap" }}>
									{formatMoney(taxAmount)}
								</span>
							</div>
						)}

						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								gap: "12px",
								marginTop: "4px",
								padding: "6px 9px",
								borderRadius: "5px",
								backgroundColor: primaryColor,
								color: "#ffffff",
								fontSize: "13px",
								fontWeight: 700,
								boxSizing: "border-box",
							}}>
							<span>Total</span>

							<span style={{ whiteSpace: "nowrap" }}>{formatMoney(total)}</span>
						</div>
					</div>
				</div>

				<div
					style={{
						width: "100%",
						maxWidth: "100%",
						display: "grid",
						gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
						gap: "30px",
						marginTop: "22px",
						paddingTop: "14px",
						borderTop: "1px solid #dbe3f0",
						boxSizing: "border-box",
					}}>
					<div
						style={{
							minWidth: 0,
							overflow: "hidden",
						}}>
						<div
							style={{
								fontSize: "10px",
								fontWeight: 700,
								letterSpacing: "0.45px",
								textTransform: "uppercase",
								color: primaryColor,
							}}>
							Payment Information
						</div>

						<div
							style={{
								marginTop: "5px",
								fontSize: "10px",
								lineHeight: 1.6,
								color: "#66758f",
								overflowWrap: "anywhere",
							}}>
							{invoice.payment.method && (
								<div>Method: {invoice.payment.method}</div>
							)}

							{invoice.payment.accountName && (
								<div>Account: {invoice.payment.accountName}</div>
							)}

							{invoice.payment.bankName && (
								<div>Bank: {invoice.payment.bankName}</div>
							)}

							{invoice.payment.accountNumber && (
								<div>Account No: {invoice.payment.accountNumber}</div>
							)}
						</div>
					</div>

					<div
						style={{
							minWidth: 0,
							textAlign: "right",
							overflow: "hidden",
						}}>
						<div
							style={{
								fontSize: "10px",
								fontWeight: 700,
								letterSpacing: "0.45px",
								textTransform: "uppercase",
								color: primaryColor,
							}}>
							Notes
						</div>

						<div
							style={{
								marginTop: "5px",
								fontSize: "10px",
								lineHeight: 1.55,
								color: "#66758f",
								overflowWrap: "anywhere",
							}}>
							{invoice.notes || "Thank you for your business."}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
