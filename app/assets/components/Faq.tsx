import Questions from "../layouts/Question";

export default function Faq() {
	return (
		<div className='w-full px-3 py-5 bg-[url("/background-mobile.png")] lg:bg-[url("/background.png")] bg-cover bg-center bg-no-repeat'>
			<div className="max-w-6xl mx-auto h-full">
				<p
					className="text-[#00B7FF] text-6xl font-italianno text-center"
					style={{
						textShadow: "1px 1px 0 #fff",
					}}>
					FAQ
				</p>
				<p className="text-lg text-white text-center font-regular leading-none">
					Frequently asked questions
				</p>
				<section className="w-full h-auto lg:px-6 pt-12 pb-5">
					<Questions />
				</section>
			</div>
		</div>
	);
}
