import Image from "next/image";
import React from "react";

export default function HeroSection() {
	return (
		<div className="px-3 lg:px-12 w-full h-dvh flex justify-center items-center">
			<div className="w-full h-10/12 lg:h-9/12 grid lg:grid-cols-2">
				<div className="flex flex-col justify-center items-start">
					<p className="text-4xl font-bold text-[#041636]">
						Create Professional Invoices in Seconds
					</p>
					<p className="text-lg text-[#0047D9] mt-4">
						Simple, fast, and free invoice generator for your business needs.
					</p>
					<button className="bg-linear-to-br from-[#00B7FF] via-[#0066FF] to-[#0047D9] text-white font-medium uppercase py-2 px-4 rounded-sm transition duration-300 mt-6">
						Get Started
					</button>
				</div>
				<div className="flex flex-col justify-center items-start">
					<p>Hello, World!</p>
				</div>
			</div>
		</div>
	);
}
