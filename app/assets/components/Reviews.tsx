import Testimonials from "../layouts/Marquee";

export default function Reviews() {
	return (
		<div className='w-full pt-7 pb-5 bg-[url("/background-mobile.png")] lg:bg-[url("/background.png")] bg-cover bg-center bg-no-repeat lg:pb-3 lg:pt-0'>
			<div className="w-full mx-auto h-full sm:py-5">
				<p
					className="text-[#00B7FF] text-5xl font-italianno text-center lg:text-6xl"
					style={{
						textShadow: "1px 1px 0 #fff",
					}}>
					Reviews
				</p>
				<p className="text-white text-center font-regular leading-none w-10/12 mx-auto lg:w-full lg:text-lg">
					Loved by thousands of freelancers and professionals
				</p>
				<section className="w-full py-3 mt-5 lg:mt-7">
					<Testimonials />
				</section>
			</div>
		</div>
	);
}
