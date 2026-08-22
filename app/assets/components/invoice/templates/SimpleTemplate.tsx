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
				{/* =====================================================
				    HEADER
				===================================================== */}

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
					{/* Empty left side */}

					<div
						style={{
							flex: "1 1 0%",
							minWidth: 0,
						}}
					/>

					{/* Invoice Information */}

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

				{/* =====================================================
				    BILL FROM / BILL TO
				===================================================== */}

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
					{/* Bill From */}

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

					{/* Bill To */}

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

				{/* =====================================================
				    ITEMS TABLE
				===================================================== */}

				<div
					style={{
						width: "100%",
						maxWidth: "100%",
						marginTop: "21px",
						border: "1px solid #dbe3f0",
						borderRadius: "5px",
						overflow: "hidden",
						boxSizing: "border-box",
					}}>
					{/* Table Header */}

					<div
						style={{
							width: "100%",
							display: "grid",
							gridTemplateColumns: "minmax(0, 1fr) 45px 75px 80px",
							columnGap: 0,
							alignItems: "stretch",
							backgroundColor: primaryColor,
							color: "#ffffff",
							fontSize: "10px",
							fontWeight: 700,
							textTransform: "uppercase",
							letterSpacing: "0.2px",
							boxSizing: "border-box",
						}}>
						<div
							style={{
								minWidth: 0,
								padding: "5px 8px",
								display: "flex",
								alignItems: "center",
								boxSizing: "border-box",
								borderRight: "1px solid rgba(255,255,255,0.3)",
							}}>
							Description
						</div>

						<div
							style={{
								minWidth: 0,
								padding: "5px 5px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								textAlign: "center",
								boxSizing: "border-box",
								borderRight: "1px solid rgba(255,255,255,0.3)",
							}}>
							Qty
						</div>

						<div
							style={{
								minWidth: 0,
								padding: "5px 7px",
								display: "flex",
								alignItems: "center",
								justifyContent: "flex-end",
								textAlign: "right",
								boxSizing: "border-box",
								borderRight: "1px solid rgba(255,255,255,0.3)",
							}}>
							Rate
						</div>

						<div
							style={{
								minWidth: 0,
								padding: "5px 7px",
								display: "flex",
								alignItems: "center",
								justifyContent: "flex-end",
								textAlign: "right",
								boxSizing: "border-box",
							}}>
							Amount
						</div>
					</div>

					{/* Table Rows */}

					{invoice.items.map((item, index) => (
						<div
							key={item.id}
							style={{
								width: "100%",
								display: "grid",
								gridTemplateColumns: "minmax(0, 1fr) 45px 75px 80px",
								columnGap: 0,
								alignItems: "stretch",
								fontSize: "11px",
								borderTop:
									index === 0 ? "1px solid #dbe3f0" : "1px solid #dbe3f0",
								boxSizing: "border-box",
							}}>
							{/* Description */}

							<div
								style={{
									minWidth: 0,
									padding: "7px 8px",
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									boxSizing: "border-box",
									borderRight: "1px solid #dbe3f0",
									overflow: "hidden",
								}}>
								<div
									style={{
										fontSize: "11.5px",
										fontWeight: 600,
										color: "#172033",
										lineHeight: 1.35,
										overflowWrap: "anywhere",
									}}>
									{item.description || "Item description"}
								</div>

								{item.details && (
									<div
										style={{
											marginTop: "2px",
											fontSize: "10px",
											color: "#7a879c",
											lineHeight: 1.35,
											overflowWrap: "anywhere",
										}}>
										{item.details}
									</div>
								)}
							</div>

							{/* Quantity */}

							<div
								style={{
									minWidth: 0,
									padding: "7px 5px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									textAlign: "center",
									boxSizing: "border-box",
									borderRight: "1px solid #dbe3f0",
								}}>
								{item.quantity}
							</div>

							{/* Rate */}

							<div
								style={{
									minWidth: 0,
									padding: "7px 7px",
									display: "flex",
									alignItems: "center",
									justifyContent: "flex-end",
									textAlign: "right",
									boxSizing: "border-box",
									borderRight: "1px solid #dbe3f0",
									whiteSpace: "nowrap",
								}}>
								{formatMoney(item.rate)}
							</div>

							{/* Amount */}

							<div
								style={{
									minWidth: 0,
									padding: "7px 7px",
									display: "flex",
									alignItems: "center",
									justifyContent: "flex-end",
									textAlign: "right",
									fontWeight: 600,
									boxSizing: "border-box",
									whiteSpace: "nowrap",
								}}>
								{formatMoney(item.quantity * item.rate)}
							</div>
						</div>
					))}

					{invoice.items.length === 0 && (
						<div
							style={{
								padding: "18px 10px",
								textAlign: "center",
								fontSize: "10.5px",
								color: "#94a3b8",
								borderTop: "1px solid #dbe3f0",
							}}>
							No invoice items
						</div>
					)}
				</div>

				{/* =====================================================
				    TOTALS
				===================================================== */}

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

				{/* =====================================================
				    FOOTER
				===================================================== */}

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
					{/* Payment Information */}

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

					{/* Notes */}

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
