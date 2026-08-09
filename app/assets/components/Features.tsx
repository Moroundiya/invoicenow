"use client";

import SharpFlashOnIcon from "@iconify-react/ic/sharp-flash-on";
import TemplateFilledIcon from "@iconify-react/tabler/template-filled";

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
							<div className="relative w-12 h-12">
								<div className="absolute inset-0 translate-y-[1.5px] translate-x-[1.5px] rounded-full bg-[#00B7FF]" />
								<div className="relative w-full h-full rounded-full bg-[#0066FF] flex justify-center items-center">
									<SharpFlashOnIcon className="text-white h-8" />
								</div>
							</div>
						</div>
						<div className="w-4/5">
							<p className="text-3xl text-white font-allura font-regular">
								Create in seconds
							</p>
							<p className="text-[#eeeeee9e] mt-0 w-10/12 leading-[1.1] font-light">
								Create professional invoices in seconds with out easy-to-use
								invoice builder.
							</p>
						</div>
					</div>
					<div className="w-full h-[120px] rounded-2xl bg-[#041f5049] border-2 border-[#041E50] p-3 flex space-x-3">
						<div className="w-1/5 h-full flex justify-center">
							<div className="relative w-12 h-12">
								<div className="absolute inset-0 translate-y-[1.5px] translate-x-[1.5px] rounded-full bg-[#00B7FF]" />
								<div className="relative w-full h-full rounded-full bg-[#0066FF] flex justify-center items-center">
									<TemplateFilledIcon className="text-white h-8" />
								</div>
							</div>
						</div>
						<div className="w-4/5">
							<p className="text-3xl text-white font-allura font-regular">
								Custom Templates
							</p>
							<p className="text-[#eeeeee9e] mt-0 w-10/12 leading-[1.1] font-light">
								Choose from beautiful template and customize them to match your
								taste.
							</p>
						</div>
					</div>
					<div className="w-full h-[120px] rounded-2xl bg-[#041f5049] border-2 border-[#041E50] p-3 flex space-x-3">
						<div className="w-1/5 h-full flex justify-center">
							<div className="relative w-12 h-12">
								<div className="absolute inset-0 translate-y-[1.5px] translate-x-[1.5px] rounded-full bg-[#00B7FF]" />
								<div className="relative w-full h-full rounded-full bg-[#0066FF] flex justify-center items-center">
									<TemplateFilledIcon className="text-white h-8" />
								</div>
							</div>
						</div>
						<div className="w-4/5">
							<p className="text-3xl text-white font-allura font-regular">
								Multiple Currencies
							</p>
							<p className="text-[#eeeeee9e] mt-0 w-10/12 leading-[1.1] font-light">
								Bill your international clients with support for multiple currencies
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
