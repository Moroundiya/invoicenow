import React from "react";

export default function Features() {
	return (
		<div className='w-full min-h-dvh bg-[url("/background-mobile.png")] lg:bg-[url("/background.png")] bg-cover bg-center bg-no-repeat px-3 py-10 lg:px-12'>
			<p
				className="text-[#00B7FF] text-5xl font-allura text-center"
				style={{
					textShadow: "1px 1px 0 #fff",
				}}>
				Features
			</p>

			<p className="text-lg text-white mt-2 w-10/12 leading-tight font-light text-center">
				Everything You Need to Get Paid Faster
			</p>
		</div>
	);
}
