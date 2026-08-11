import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
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
			url: "https://linkedin.com/in/moroundiya",
		},
	],

	openGraph: {
		type: "website",
		url: "https://invoicenow.vercel.app",
		title: "InvoiceNow — Free Invoice Generator",
		description:
			"Create professional invoices in seconds. Simple, fast, and free.",
		siteName: "InvoiceNow",
		images: [
			{
				url: "@/",
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
		images: ["/logo.png"],
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

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
			<body className="min-h-full flex flex-col">{children}</body>
		</html>
	);
}
