import Image from "next/image";
import logo from "@/app/assets/images/logo.png";
import Link from "next/link";

export default function Navbar() {
	return (
		<div className="fixed top-5 left-0 w-full">
			<div className=" px-3 flex items-center justify-between lg:px-12">
				<Image
					src={logo}
					alt="InvoiceNow Logo"
					className="h-12 w-fit object-contain"
				/>

				<div className="hidden md:flex space-x-8">
					<Link
						href="/"
						className="group relative inline-block px-2 py-2 font-semibold text-[#041E50]">
						Home
						<span className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-[#041E50] transition-[width] duration-300 ease-out group-hover:w-full" />
					</Link>

					<Link
						href="/"
						className="group relative inline-block px-2 py-2 font-semibold text-[#041E50]">
						Features
						<span className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-[#041E50] transition-[width] duration-300 ease-out group-hover:w-full" />
					</Link>

					<Link
						href="/"
						className="group relative inline-block px-2 py-2 font-semibold text-[#041E50]">
						How it works
						<span className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-[#041E50] transition-[width] duration-300 ease-out group-hover:w-full" />
					</Link>

					<Link
						href="/"
						className="group relative inline-block px-2 py-2 font-semibold text-[#041E50]">
						About
						<span className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-[#041E50] transition-[width] duration-300 ease-out group-hover:w-full" />
					</Link>
				</div>
				<Link
					href="/create"
					className="text-white bg-linear-to-br from-[#00B7FF] via-[#0066FF] to-[#041E50]  font-semibold py-2 px-4 rounded-sm transition duration-300">
					Create Invoice
				</Link>
			</div>
		</div>
	);
}
