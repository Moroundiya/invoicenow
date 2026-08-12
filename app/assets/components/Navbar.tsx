import Image from "next/image";
import logo from "@/app/assets/images/logo.png";
import Link from "next/link";

export default function Navbar() {
	return (
		<div className="fixed top-5 left-0 w-full">
			<div className="text-white px-3 flex items-center justify-between lg:px-12">
				<Image
					src={logo}
					alt="InvoiceNow Logo"
					className="h-12 w-fit object-contain"
				/>

				<div className="hidden md:flex space-x-8 text-lg">
					<Link
						href="/"
						className="group relative inline-block px-2 py-2 font-medium text-[#0047D9]">
						Home
						<span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#0047D9] transition-transform duration-300 ease-out group-hover:scale-x-100" />
					</Link>

					<Link
						href="/"
						className="group relative inline-block px-4 py-2 font-medium text-[#0047D9]">
						Features
						<span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#0047D9] transition-transform duration-300 ease-out group-hover:scale-x-100" />
					</Link>

					<Link
						href="/"
						className="group relative inline-block px-4 py-2 font-medium text-[#0047D9]">
						How it works
						<span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#0047D9] transition-transform duration-300 ease-out group-hover:scale-x-100" />
					</Link>

					<Link
						href="/"
						className="group relative inline-block px-4 py-2 font-medium text-[#0047D9]">
						About
						<span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#0047D9] transition-transform duration-300 ease-out group-hover:scale-x-100" />
					</Link>
				</div>
				<Link
					href="/create"
					className="bg-linear-to-br from-[#00B7FF] via-[#0066FF] to-[#0047D9] text-white font-medium uppercase py-2 px-4 rounded-sm transition duration-300">
					Create Invoice
				</Link>
			</div>
		</div>
	);
}
