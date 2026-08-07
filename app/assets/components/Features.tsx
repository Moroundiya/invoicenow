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
			<p className="text-2xl text-white text-center font-regular leading-none">
				Everything You Need to Get Paid Faster
			</p>

			<div className="mt-12 grid grid-cols-3">
                <div className="w-full h-[250px] rounded-2xl bg-[#041f5049] border-2 border-[#041E50]">
                    <div className='w-1/3'>
                    <div></div>
                    </div>
                    <div></div>
                </div>
			</div>
		</div>
	);
}
