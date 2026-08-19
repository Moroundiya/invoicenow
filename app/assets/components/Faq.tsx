import Questions from "../layouts/Question";

export default function Faq() {
	return (
		<div className='w-full px-3 py-5 bg-[url("/background-mobile.png")] lg:bg-[url("/background.png")] bg-cover bg-center bg-no-repeat'>
			<div className="max-w-6xl mx-auto h-full">
				<p
					className="text-[#00B7FF] text-5xl font-italianno text-center lg:text-6xl"
					style={{
						textShadow: "1px 1px 0 #fff",
					}}>
					FAQ
				</p>
				<p className="text-white text-center font-regular leading-none lg:text-lg ">
					Frequently asked questions
				</p>
				<section className="w-full h-135 md:h-90 lg:px-6 mt-7 lg:mt-12">
					<Questions />
				</section>
			</div>
		</div>
	);
}
