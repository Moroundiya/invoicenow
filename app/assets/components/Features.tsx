"use client";

import { features } from "@/data/featuresData";

export default function Features() {
	return (
		<div className='w-full px-3 pt-3 pb-4 bg-[url("/background-mobile.png")] lg:bg-[url("/background.png")] bg-cover bg-center bg-no-repeat lg:px-6 xl:px-10'>
			<div className="max-w-7xl mx-auto h-full">
				<p
					className="text-[#00B7FF] text-5xl font-italianno text-center lg:text-6xl"
					style={{
						textShadow: "1px 1px 0 #fff",
					}}>
					Features
				</p>
				<p className="text-white text-center font-regular leading-none lg:text-lg">
					Everything You Need to Get Paid Faster
				</p>
				<div className="mt-12 grid md:grid-cols-2 xl:grid-cols-3 gap-6 ">
					{features.map((feature) => (
						<div
							key={feature.title}
							className="w-full lg:h-33 rounded-2xl bg-[#041f5049] border-2 border-[#041E50] p-3 justify-center items-center flex space-x-3">
							<div className="w-1/5 h-full flex justify-center">
								<div className="relative w-11 h-11 lg:w-12 lg:h-12">
									<div className="absolute inset-0 translate-y-px translate-x-px rounded-full bg-[#00B7FF]" />
									<div className="relative w-full h-full rounded-full  flex justify-center items-center bg-linear-to-br from-[#00B7FF] via-[#0066FF] to-[#041E50]">
										{feature.icon}
									</div>
								</div>
							</div>
							<div className="w-4/5 h-full">
								<p className="text-3xl text-white font-italianno font-regular lg:text-4xl">
									{feature.title}
								</p>
								<p className="text-[#eeeeee9e] text-sm mt-0 w-full leading-snug font-light">
									{feature.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
