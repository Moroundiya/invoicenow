"use client";

import { useState } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { createRoot, type Root } from "react-dom/client";

import type { InvoiceData } from "@/app/assets/types/invoiceType";
import InvoiceTemplateRenderer from "./templates/InvoiceTemplateRenderer";

interface InvoiceDownloadProps {
	invoice: InvoiceData;
	fileName?: string;
}

export default function InvoiceDownload({
	invoice,
	fileName = "invoice",
}: InvoiceDownloadProps) {
	const [isDownloading, setIsDownloading] = useState<"pdf" | "png" | null>(
		null,
	);

	/*
	 * =========================================================
	 * EXPORT SETTINGS
	 * =========================================================
	 *
	 * All invoice templates use 700px as their base width.
	 *
	 * 3.25x gives slightly better quality than 3x while
	 * keeping the output reasonably sized.
	 */
	const EXPORT_WIDTH = 700;

	const EXPORT_SCALE = 3.25;

	/*
	 * Maximum canvas area.
	 *
	 * This prevents very long invoices from creating an
	 * unnecessarily massive canvas and huge download files.
	 */
	const MAX_CANVAS_PIXELS = 8_000_000;

	/**
	 * Wait until all images inside the invoice have loaded.
	 */
	const waitForImages = async (element: HTMLElement) => {
		const images = Array.from(element.querySelectorAll("img"));

		await Promise.all(
			images.map(
				(img) =>
					new Promise<void>((resolve) => {
						if (img.complete) {
							resolve();
							return;
						}

						img.onload = () => resolve();
						img.onerror = () => resolve();
					}),
			),
		);
	};

	/**
	 * Wait for browser rendering/layout.
	 */
	const waitForRender = async () => {
		await new Promise<void>((resolve) => {
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					resolve();
				});
			});
		});
	};

	/**
	 * Convert unsupported modern CSS colors into RGB/RGBA.
	 */
	const convertColorToRGB = (value: string, doc: Document): string | null => {
		if (!value) {
			return null;
		}

		const unsupportedColor =
			value.includes("lab(") ||
			value.includes("lch(") ||
			value.includes("oklab(") ||
			value.includes("oklch(");

		if (!unsupportedColor) {
			return value;
		}

		const testElement = doc.createElement("div");

		Object.assign(testElement.style, {
			position: "absolute",
			left: "-99999px",
			top: "-99999px",
			width: "1px",
			height: "1px",
			pointerEvents: "none",
		});

		doc.body.appendChild(testElement);

		/*
		 * Background color test.
		 */
		testElement.style.backgroundColor = value;

		let converted =
			doc.defaultView?.getComputedStyle(testElement).backgroundColor || "";

		/*
		 * Text color fallback.
		 */
		if (
			!converted ||
			converted === "rgba(0, 0, 0, 0)" ||
			converted.includes("lab(") ||
			converted.includes("lch(") ||
			converted.includes("oklab(") ||
			converted.includes("oklch(")
		) {
			testElement.style.backgroundColor = "";
			testElement.style.color = value;

			converted = doc.defaultView?.getComputedStyle(testElement).color || "";
		}

		testElement.remove();

		if (
			!converted ||
			converted.includes("lab(") ||
			converted.includes("lch(") ||
			converted.includes("oklab(") ||
			converted.includes("oklch(")
		) {
			return null;
		}

		return converted;
	};

	/**
	 * Fix unsupported CSS colors inside cloned document.
	 */
	const fixUnsupportedColors = (clonedDocument: Document) => {
		const root = clonedDocument.querySelector(
			"[data-invoice-export]",
		) as HTMLElement | null;

		if (!root) {
			return;
		}

		const elements = [
			root,
			...Array.from(root.querySelectorAll<HTMLElement>("*")),
		];

		const colorProperties = [
			"color",
			"backgroundColor",
			"borderTopColor",
			"borderRightColor",
			"borderBottomColor",
			"borderLeftColor",
			"outlineColor",
			"textDecorationColor",
			"columnRuleColor",
			"caretColor",
			"fill",
			"stroke",
		];

		const unsupportedFunctions = ["lab(", "lch(", "oklab(", "oklch("];

		const containsUnsupportedColor = (value: string) =>
			unsupportedFunctions.some((fn) => value.includes(fn));

		elements.forEach((element) => {
			const computedStyle =
				clonedDocument.defaultView?.getComputedStyle(element);

			if (!computedStyle) {
				return;
			}

			colorProperties.forEach((property) => {
				const value = computedStyle.getPropertyValue(property);

				if (!value || !containsUnsupportedColor(value)) {
					return;
				}

				const converted = convertColorToRGB(value, clonedDocument);

				if (converted) {
					element.style.setProperty(property, converted, "important");
				}
			});

			/*
			 * Remove problematic shadows.
			 */
			const boxShadow = computedStyle.boxShadow;

			if (boxShadow && containsUnsupportedColor(boxShadow)) {
				element.style.setProperty("box-shadow", "none", "important");
			}

			const textShadow = computedStyle.textShadow;

			if (textShadow && containsUnsupportedColor(textShadow)) {
				element.style.setProperty("text-shadow", "none", "important");
			}
		});
	};

	/**
	 * Create a temporary invoice for exporting.
	 *
	 * Width is fixed at 700px.
	 * Height is completely dynamic.
	 */
	const createExportElement = async () => {
		const wrapper = document.createElement("div");

		Object.assign(wrapper.style, {
			position: "absolute",
			left: "-10000px",
			top: "0",
			width: `${EXPORT_WIDTH}px`,
			minWidth: `${EXPORT_WIDTH}px`,
			maxWidth: `${EXPORT_WIDTH}px`,
			margin: "0",
			padding: "0",
			backgroundColor: "#ffffff",
			overflow: "hidden",
			zIndex: "-1",
		});

		const rootElement = document.createElement("div");

		Object.assign(rootElement.style, {
			width: `${EXPORT_WIDTH}px`,
			minWidth: `${EXPORT_WIDTH}px`,
			maxWidth: `${EXPORT_WIDTH}px`,
			margin: "0",
			padding: "0",
			backgroundColor: "#ffffff",
			overflow: "hidden",
			boxSizing: "border-box",
		});

		wrapper.appendChild(rootElement);
		document.body.appendChild(wrapper);

		const reactRoot: Root = createRoot(rootElement);

		reactRoot.render(
			<div
				data-invoice-export
				style={{
					width: `${EXPORT_WIDTH}px`,
					minWidth: `${EXPORT_WIDTH}px`,
					maxWidth: `${EXPORT_WIDTH}px`,
					margin: 0,
					padding: 0,
					backgroundColor: "#ffffff",
					boxSizing: "border-box",
					overflow: "hidden",
				}}>
				<InvoiceTemplateRenderer invoice={invoice} />
			</div>,
		);

		await waitForRender();

		/*
		 * Give fonts, images and layout time to settle.
		 */
		await new Promise((resolve) => setTimeout(resolve, 200));

		await waitForImages(rootElement);

		await waitForRender();

		return {
			wrapper,
			rootElement,
			reactRoot,
		};
	};

	/**
	 * Calculate an appropriate render scale.
	 *
	 * Normal invoices use 3.25x.
	 *
	 * Very long invoices automatically reduce the scale
	 * slightly to prevent massive files.
	 */
	const getRenderScale = (height: number) => {
		if (!height) {
			return EXPORT_SCALE;
		}

		const requestedPixels = EXPORT_WIDTH * height * EXPORT_SCALE * EXPORT_SCALE;

		if (requestedPixels <= MAX_CANVAS_PIXELS) {
			return EXPORT_SCALE;
		}

		const safeScale = Math.sqrt(MAX_CANVAS_PIXELS / (EXPORT_WIDTH * height));

		/*
		 * Never go below 2x.
		 *
		 * Even very long invoices should remain reasonably sharp.
		 */
		return Math.max(2, Math.min(EXPORT_SCALE, safeScale));
	};

	/**
	 * Create high-resolution canvas.
	 *
	 * Width remains exactly 700px.
	 * Height comes from the actual invoice.
	 */
	const createCanvas = async () => {
		const { wrapper, rootElement, reactRoot } = await createExportElement();

		try {
			const width = EXPORT_WIDTH;

			/*
			 * Get the actual rendered invoice height.
			 */
			const height = Math.ceil(
				Math.max(
					rootElement.scrollHeight,
					rootElement.getBoundingClientRect().height,
				),
			);

			console.log("Invoice export dimensions:", {
				width,
				height,
			});

			if (!width || !height) {
				throw new Error("Invoice export element has no dimensions.");
			}

			/*
			 * Dynamic quality.
			 */
			const scale = getRenderScale(height);

			console.log("Invoice render scale:", scale);

			const canvas = await html2canvas(rootElement, {
				scale,

				backgroundColor: "#ffffff",

				useCORS: true,

				allowTaint: false,

				logging: false,

				scrollX: 0,

				scrollY: 0,

				width,

				height,

				windowWidth: width,

				windowHeight: height,

				onclone: (clonedDocument) => {
					fixUnsupportedColors(clonedDocument);

					/*
					 * Force the cloned export root to remain
					 * exactly 700px wide.
					 */
					const clonedRoot = clonedDocument.querySelector(
						"[data-invoice-export]",
					) as HTMLElement | null;

					if (clonedRoot) {
						clonedRoot.style.width = `${EXPORT_WIDTH}px`;
						clonedRoot.style.minWidth = `${EXPORT_WIDTH}px`;
						clonedRoot.style.maxWidth = `${EXPORT_WIDTH}px`;
						clonedRoot.style.overflow = "hidden";
					}
				},
			});

			return canvas;
		} finally {
			reactRoot.unmount();
			wrapper.remove();
		}
	};

	/**
	 * Download PNG.
	 *
	 * PNG remains lossless and therefore gives the sharpest
	 * possible image output.
	 */
	const downloadPNG = async () => {
		if (isDownloading) return;

		try {
			setIsDownloading("png");

			const canvas = await createCanvas();

			canvas.toBlob((blob) => {
				if (!blob) {
					throw new Error("Failed to create PNG.");
				}

				const url = URL.createObjectURL(blob);

				const link = document.createElement("a");

				link.href = url;
				link.download = `${fileName}.png`;

				document.body.appendChild(link);

				link.click();

				link.remove();

				URL.revokeObjectURL(url);
			}, "image/png");
		} catch (error) {
			console.error("Failed to download PNG:", error);

			alert("Something went wrong while creating the PNG. Please try again.");
		} finally {
			setIsDownloading(null);
		}
	};

	/**
	 * Download PDF.
	 *
	 * The PDF page size is calculated directly from
	 * the invoice canvas.
	 *
	 * No A4.
	 * No fixed landscape page.
	 * No cropping.
	 */
	const downloadPDF = async () => {
		if (isDownloading) return;

		try {
			setIsDownloading("pdf");

			const canvas = await createCanvas();

			/*
			 * -----------------------------------------------------
			 * PDF SIZE
			 * -----------------------------------------------------
			 *
			 * 1 CSS pixel ≈ 0.264583mm.
			 *
			 * We use the original 700px invoice width rather
			 * than the high-resolution canvas width.
			 */
			const MM_PER_PX = 25.4 / 96;

			const pdfWidth = EXPORT_WIDTH * MM_PER_PX;

			/*
			 * Preserve the exact invoice aspect ratio.
			 */
			const imageRatio = canvas.width / canvas.height;

			const pdfHeight = pdfWidth / imageRatio;

			console.log("PDF dimensions:", {
				width: pdfWidth,
				height: pdfHeight,
				canvasWidth: canvas.width,
				canvasHeight: canvas.height,
			});

			/*
			 * -----------------------------------------------------
			 * JPEG FOR PDF
			 * -----------------------------------------------------
			 *
			 * PNG is lossless but can make the PDF unnecessarily
			 * large.
			 *
			 * JPEG quality 0.90 gives a good balance between:
			 *
			 * - sharp text
			 * - clean borders
			 * - small PDF size
			 */
			const image = canvas.toDataURL("image/jpeg", 0.9);

			/*
			 * Determine orientation automatically.
			 */
			const orientation = pdfWidth >= pdfHeight ? "landscape" : "portrait";

			const pdf = new jsPDF({
				orientation,
				unit: "mm",

				/*
				 * Dynamic custom page size.
				 *
				 * The page exactly matches the invoice.
				 */
				format: [pdfWidth, pdfHeight],

				compress: true,

				precision: 12,
			});

			/*
			 * Image fills the entire PDF.
			 *
			 * No margins.
			 * No A4.
			 * No cropping.
			 * No stretching.
			 */
			pdf.addImage(image, "JPEG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");

			pdf.save(`${fileName}.pdf`);
		} catch (error) {
			console.error("Failed to download PDF:", error);

			alert("Something went wrong while creating the PDF. Please try again.");
		} finally {
			setIsDownloading(null);
		}
	};

	const downloading = isDownloading !== null;

	return (
		<div className="flex w-full flex-col gap-3">
			<div className="flex w-full flex-col gap-3 sm:flex-row">
				{/* =================================================
				    PDF
				================================================= */}

				<button
					type="button"
					onClick={downloadPDF}
					disabled={downloading}
					className="inline-flex h-11 py-4 flex-1 items-center justify-center gap-2 rounded-xl cursor-pointer bg-gradient-to-r from-blue-600 to-blue-500 px-5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(0,119,255,0.18)] transition hover:from-blue-500 hover:to-cyan-500 disabled:pointer-events-none disabled:opacity-50">
					{isDownloading === "pdf" ? (
						<>
							<span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
							Preparing...
						</>
					) : (
						<>
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round">
								<path d="M12 3v12" />
								<path d="m7 10 5 5 5-5" />
								<path d="M5 21h14" />
							</svg>
							Download PDF
						</>
					)}
				</button>

				{/* =================================================
				    PNG
				================================================= */}

				<button
					type="button"
					onClick={downloadPNG}
					disabled={downloading}
					className="inline-flex h-11 py-4 flex-1 items-center justify-center cursor-pointer gap-2 rounded-xl border border-blue-400/15 bg-blue-500/[0.05] px-5 text-sm font-semibold text-blue-400 transition hover:border-blue-400/25 hover:bg-blue-500/10 disabled:pointer-events-none disabled:opacity-50">
					{isDownloading === "png" ? (
						<>
							<span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-400/30 border-t-blue-400" />
							Preparing...
						</>
					) : (
						<>
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round">
								<rect
									x="3"
									y="3"
									width="18"
									height="18"
									rx="2"
								/>

								<circle
									cx="8.5"
									cy="8.5"
									r="1.5"
								/>

								<path d="m21 15-5-5L5 21" />
							</svg>
							Download PNG
						</>
					)}
				</button>
			</div>
		</div>
	);
}
