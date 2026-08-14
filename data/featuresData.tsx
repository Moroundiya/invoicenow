import SharpFlashOnIcon from "@iconify-react/ic/sharp-flash-on";
import TemplateFilledIcon from "@iconify-react/tabler/template-filled";
import AllCurrencyIcon from "@iconify-react/fluent-mdl2/all-currency";
import DownloadIcon from "@iconify-react/material-symbols/download";
import SecuredFilledIcon from "@iconify-react/tdesign/secured-filled";

export const features = [
	{
		icon: <SharpFlashOnIcon className="text-white h-8" />,
		title: "Create in seconds",
		description:
			"Create professional invoices in seconds. No complicated setup, no sign-up, and no credit card required.",
	},
	{
		icon: <TemplateFilledIcon className="text-white h-8" />,
		title: "Custom Templates",
		description:
			"Choose from beautiful templates and customize them to match your taste.",
	},
	{
		icon: <AllCurrencyIcon className="text-white h-8" />,
		title: "Multiple Currencies",
		description:
			"Bill your international clients with support for multiple currencies.",
	},
	{
		icon: <DownloadIcon className="text-white h-8" />,
		title: "Download & Share",
		description:
			"Download as PDF/PNG or share directly with your clients via email.",
	},
	{
		icon: <SecuredFilledIcon className="text-white h-7.5" />,
		title: "Reliable & Secure",
		description:
			"Your clients’ information and payment details are secure and protected, only you can access them.",
	},
];
