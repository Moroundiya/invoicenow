"use client";

import Marquee from "react-fast-marquee";
import MaleIcon from "@iconify-react/fontisto/male";
import FamaleIcon from "@iconify-react/fontisto/famale";
import { testimonials } from "../data/testimonials";

function TestimonialCard({
	testimonial,
}: {
	testimonial: (typeof testimonials)[number];
}) {
	const AvatarIcon = testimonial.gender === "female" ? FamaleIcon : MaleIcon;

	return (
		<div className="mx-2 flex h-34 w-70 shrink-0 flex-col justify-center rounded-2xl border-2 border-[#041E50] bg-[#041f5049] px-4 shadow-sm sm:mx-3 sm:h-40 sm:w-[360px] sm:px-5">
			<div className="flex items-center gap-2 sm:gap-3">
				<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#062764] text-white">
					<AvatarIcon className="h-4.5 text-[#00B7FF]" />
				</div>
				<div>
					<h3 className="font-italianno text-xl leading-[1] text-white sm:text-xl">
						{testimonial.name}
					</h3>
					<p className="font-inter text-xs text-gray-500 sm:text-xs">
						{testimonial.role}
					</p>
				</div>
			</div>
			<div className="my-3 h-px bg-[#062764]" />
			<p className="line-clamp-2 text-sm text-[#eeeeee9e]">
				“{testimonial.message}”
			</p>
		</div>
	);
}

export default function Testimonials() {
	const firstRow = testimonials.slice(0, 4);
	const secondRow = testimonials.slice(4);

	return (
		<>
			<div className="mb-4 sm:mb-5">
				<Marquee
					direction="left"
					speed={80}
					gradient
					gradientColor="#041636"
					gradientWidth={30}
					pauseOnHover>
					{firstRow.map((testimonial) => (
						<TestimonialCard
							key={testimonial.id}
							testimonial={testimonial}
						/>
					))}
				</Marquee>
			</div>

			<div>
				<Marquee
					direction="right"
					speed={80}
					gradient
					gradientColor="#041636"
					gradientWidth={30}
					pauseOnHover>
					{secondRow.map((testimonial) => (
						<TestimonialCard
							key={testimonial.id}
							testimonial={testimonial}
						/>
					))}
				</Marquee>
			</div>
		</>
	);
}
