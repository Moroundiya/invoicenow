import React from "react";

export default function Features() {
	return (
		<div className='w-full min-h-dvh bg-[url("/background-mobile.png")] lg:bg-[url("/background.png")] bg-cover bg-center bg-no-repeat'>
			<div className="lg:w-10/12 mx-auto h-full">
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

				<div className="mt-12 grid grid-cols-3 gap-16">
					<div className="w-full h-[120px] rounded-2xl bg-[#041f5049] border-2 border-[#041E50] p-3 flex space-x-3">
						<div className="w-1/5 h-full flex justify-center">
							<div className="w-12 h-12 rounded-full bg-[#00B7FF]"></div>
						</div>
						<div className="w-4/5">
							<p className="text-xl text-white">Create in Seconds</p>
							<p className="text-[#eeeeee9e] mt-2 w-10/12 leading-[1.1] font-light">
								Create professional invoices in seconds with out easy-to-use
								invoice builder
							</p>
						</div>
					</div>
					<div className="w-full h-[120px] rounded-2xl bg-[#041f5049] border-2 border-[#041E50] p-3 flex space-x-3">
						<div className="w-1/5 h-full flex justify-center">
							<div className="w-12 h-12 rounded-full bg-[#00B7FF]"></div>
						</div>
						<div className="w-4/5">
							<p className="text-xl text-white">Create in Seconds</p>
							<p className="text-[#eeeeee9e] mt-2 w-10/12 leading-[1.1] font-light">
								Create professional invoices in seconds with out easy-to-use
								invoice builder
							</p>
						</div>
					</div>
					<div className="w-full h-[120px] rounded-2xl bg-[#041f5049] border-2 border-[#041E50] p-3 flex space-x-3">
						<div className="w-1/5 h-full flex justify-center">
							<div className="w-12 h-12 rounded-full bg-[#00B7FF]"></div>
						</div>
						<div className="w-4/5">
							<p className="text-xl text-white">Create in Seconds</p>
							<p className="text-[#eeeeee9e] mt-2 w-10/12 leading-[1.1] font-light">
								Create professional invoices in seconds with out easy-to-use
								invoice builder
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
