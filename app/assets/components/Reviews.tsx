import React from "react";
import Testimonials from "../layouts/Marquee";

export default function Reviews() {
	return (
		<div className='w-full py-5 bg-[url("/background-mobile.png")] lg:bg-[url("/background.png")] bg-cover bg-center bg-no-repeat'>
			<div className="w-full mx-auto h-full">
				<p
					className="text-[#00B7FF] text-6xl font-italianno text-center"
					style={{
						textShadow: "1px 1px 0 #fff",
					}}>
					Reviews
				</p>
				<p className="text-lg text-white text-center font-regular leading-none">
					Loved by thousands of freelancers and professionals
				</p>
				<section className="w-full py-5 mt-7">
					<Testimonials />
				</section>
			</div>
		</div>
	);
}
