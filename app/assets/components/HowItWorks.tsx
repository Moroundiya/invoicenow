import React from "react";

export default function HowItWorks() {
	return (
		<div className='w-full px-3 py-10 bg-[url("/background-mobile.png")] lg:bg-[url("/background.png")] bg-cover bg-center bg-no-repeat'>
			<div className="lg:w-10/12 mx-auto h-full">
				<p
					className="text-[#00B7FF] text-6xl font-italianno text-center"
					style={{
						textShadow: "1px 1px 0 #fff",
					}}>
					How It Works
				</p>
				<p className="text-xl text-white text-center font-regular leading-none">
					3 simple steps to get paid
				</p>
				<div className="mt-12 grid lg:grid-cols-3 gap-6 "></div>
			</div>
		</div>
	);
}
