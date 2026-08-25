import type { Metadata } from "next";
import { Italianno, Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
	variable: "--font-jakarta",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

const italianno = Italianno({
	subsets: ["latin"],
	variable: "--font-italianno",
	weight: "400",
});

export const metadata: Metadata = {
	title: "InvoiceNow — Free Invoice Generator",
	description:
		"Create professional invoices in seconds with InvoiceNow. Generate, customize, and download invoices quickly and easily—no sign-up required.",
	keywords: [
		"invoice generator",
		"free invoice generator",
		"online invoice generator",
		"create invoices",
		"professional invoices",
		"invoice maker",
		"invoice template",
		"free invoice maker",
	],
	authors: [
		{
			name: "Adewunmi Quadri Ayodele",
			url: "https://createinvoicenow.vercel.app",
		},
	],

	openGraph: {
		type: "website",
		url: "https://createinvoicenow.vercel.app",
		title: "InvoiceNow — Free Invoice Generator",
		description:
			"Create professional invoices in seconds. Simple, fast, and free.",
		siteName: "InvoiceNow",
		images: [
			{
				url: "/logoblue.png",
				width: 1200,
				height: 630,
				alt: "InvoiceNow — Free Invoice Generator",
			},
		],
	},

	twitter: {
		card: "summary_large_image",
		title: "InvoiceNow — Free Invoice Generator",
		description:
			"Create professional invoices in seconds. Simple, fast, and free.",
		images: ["/logoblue.png"],
		creator: "@moroundiya08",
	},

	robots: {
		index: true,
		follow: true,
	},

	icons: {
		icon: "/icon.png",
		shortcut: "/icon.png",
		apple: "/icon.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link
					rel="preload"
					as="image"
					href="/background.webp"
					type="image/webp"
					fetchPriority="high"
				/>
				<link
					rel="preload"
					as="image"
					href="/background-mobile.webp"
					type="image/webp"
					fetchPriority="high"
				/>
			</head>
			<body
				className={`${italianno.variable} ${jakarta.variable} antialiased bg-[#081632]`}>
				{children}
			</body>
		</html>
	);
}
