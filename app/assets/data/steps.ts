import { StaticImageData } from "next/image";
import create from "@/app/assets/images/create.png";
import send from "@/app/assets/images/send.png";
import paid from "@/app/assets/images/paid.png";

export const steps: Array<{
	number: string;
	image: StaticImageData;
	title: string;
	description: string;
}> = [
	{
		number: "1",
		image: create,
		title: "Create Invoice",
		description:
			"Add your client details, items, and pricing, then customize your invoice.",
	},
	{
		number: "2",
		image: send,
		title: "Send to Client",
		description:
			"Download as PNG or PDF and share your invoice with your client.",
	},
	{
		number: "3",
		image: paid,
		title: "Get Paid Faster",
		description:
			"Make it easy for clients to view your invoice and pay on time.",
	},
];
