"use client";
import Image from "next/image";
import FlashIcon from "@iconify-react/fontisto/flash";
import DotFilledIcon from "@iconify-react/radix-icons/dot-filled";
import Link from "next/link";
import invoice from "@/app/assets/images/invoice.png";
import { RoughNotation } from "react-rough-notation";


export default function HeroSection() {
	return (
		<div className="px-3 pt-20 lg:px-12 w-full h-dvh flex justify-center items-center">
			<div className="w-full h-full grid lg:grid-cols-2">
				<div className="flex flex-col justify-center items-start">
					<div className="bg-[#00B7FF] py-1 px-3 rounded-full flex flex-row items-center justify-center mb-4 space-x-2 text-[#041636] font-semibold text-sm">
						<FlashIcon className="text-[#041636] h-3.5" />
						<div className="flex flex-row space-x-0.5 items-center justify-center">
							<p>Create</p>
							<DotFilledIcon className="h-4" />
							<p>Send</p>
							<DotFilledIcon className="h-4" />
							<p>Get paid</p>
						</div>
					</div>
					<p
						className="text-7xl font-bold leading-[1.1] text-white"
						style={{
							textShadow: "1.5px 1.5px 0 #00B7FF",
						}}>
						Create Professional Invoices in
						<span
							className="text-[#00B7FF] text-6xl ms-4"
							style={{
								textShadow: "1.5px 1.5px 0 #fff",
							}}>
							<RoughNotation
								type="circle"
								animationDelay={100}
								color="#00B7FF"
								strokeWidth={2}
								padding={12}
								animate
								show>
								Seconds
							</RoughNotation>
						</span>
					</p>
					<p className="text-lg text-[#eeeeee9e] mt-6 w-10/12 leading-tight font-light">
						InvoiceNow helps freelancers and businesses create, customize,
						download professional invoices effortlessly and get paid faster,
						without the stress or hassle.
					</p>
					<div className="flex flex-row space-x-4 mt-10">
						<Link
							href="/create"
							className="text-white bg-linear-to-br from-[#00B7FF] via-[#0066FF] to-[#041E50]   py-2 px-4 rounded-sm transition duration-300">
							Create your first invoice
						</Link>
					</div>
				</div>
				<div className="flex justify-center items-center">
					<Image
						src={invoice}
						alt="Invoice"
						className="w-10/12 h-10/12 object-contain"
					/>
				</div>
			</div>
		</div>
	);
}
