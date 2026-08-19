import Carousel from "../layouts/Carousel";

export default function Templates() {
	return (
		<div className='w-full pt-1 px-3 lg:pb-5 bg-[url("/background-mobile.png")] lg:bg-[url("/background.png")] bg-cover bg-center bg-no-repeat'>
			<div className="max-w-7xl mx-auto h-full">
				<p
					className="text-[#00B7FF] text-5xl font-italianno text-center lg:text-6xl "
					style={{
						textShadow: "1px 1px 0 #fff",
					}}>
					Custom Templates
				</p>
				<p className="text-white text-center mt-1 mb-4 font-regular leading-none lg:text-lg md:w-2/5 mx-auto">
					Choose from our collections of professional invoice templates.
				</p>
				<section className="w-full h-auto mt-7 xl:py-10">
					<Carousel />
				</section>
			</div>
		</div>
	);
}
