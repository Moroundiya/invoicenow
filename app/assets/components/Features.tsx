"use client";

import { features } from "@/data/featuresData";

export default function Features() {
	return (
		<div className='w-full min-h-dvh bg-[url("/background-mobile.png")] lg:bg-[url("/background.png")] bg-cover bg-center bg-no-repeat'>
			<div className="lg:w-10/12 mx-auto h-full">
				<p
					className="text-[#00B7FF] text-6xl font-italianno text-center"
					style={{
						textShadow: "1px 1px 0 #fff",
					}}>
					Features
				</p>
				<p className="text-xl text-white text-center font-regular leading-none">
					Everything You Need to Get Paid Faster
				</p>
				<div className="mt-12 grid grid-cols-3 gap-6 ">
					{features.map((feature) => (
						<div
							key={feature.title}
							className="w-full h-33 rounded-2xl bg-[#041f5049] border-2 border-[#041E50] p-3 justify-center items-center flex space-x-3">
							<div className="w-1/5 h-full flex justify-center">
								<div className="relative w-12 h-12">
									<div className="absolute inset-0 translate-y-[1.5px] translate-x-[1.5px] rounded-full bg-[#00B7FF]" />
									<div className="relative w-full h-full rounded-full bg-[#0066FF] flex justify-center items-center">
										{feature.icon}
									</div>
								</div>
							</div>
							<div className="w-4/5 h-full">
								<p className="text-4xl text-white font-italianno font-regular">
									{feature.title}
								</p>
								<p className="text-[#eeeeee9e] text-sm mt-0 w-full leading-tight font-light">
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
