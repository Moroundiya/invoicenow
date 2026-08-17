"use client";

import Marquee from "react-fast-marquee";
import { UserRound, UserRoundCheck } from "lucide-react";
import MaleIcon from "@iconify-react/fontisto/male";
import FamaleIcon from "@iconify-react/fontisto/famale";

const testimonials = [
	{
		id: 1,
		name: "Sarah Johnson",
		role: "Founder, Lumora",
		gender: "female",
		message:
			"InvoiceNow made invoicing so much easier. I can create and send professional invoices in seconds.",
	},
	{
		id: 2,
		name: "Michael Chen",
		role: "Freelance Designer",
		gender: "male",
		message:
			"I stopped wasting time creating invoices manually. Everything is simple, clean, and incredibly fast.",
	},
	{
		id: 3,
		name: "Daniel Williams",
		role: "CEO, Craftline",
		gender: "male",
		message:
			"The easiest invoicing tool I've used. My clients love how professional the invoices look.",
	},
	{
		id: 4,
		name: "Emily Carter",
		role: "Creative Director, Nova",
		gender: "female",
		message:
			"InvoiceNow gives me exactly what I need without all the unnecessary complexity.",
	},
	{
		id: 5,
		name: "James Anderson",
		role: "Consultant, Axis",
		gender: "male",
		message:
			"I can create an invoice, send it to a client, and move on with my work in less than a minute.",
	},
	{
		id: 6,
		name: "Olivia Martin",
		role: "Founder, Studio M",
		gender: "female",
		message:
			"Simple, beautiful, and actually enjoyable to use. InvoiceNow has completely changed my workflow.",
	},
	{
		id: 7,
		name: "Alex Thompson",
		role: "Developer, Freelance",
		gender: "male",
		message:
			"No complicated setup and no learning curve. I was creating invoices immediately.",
	},
	{
		id: 8,
		name: "Sophia Wilson",
		role: "Marketing Lead, Bloom",
		gender: "female",
		message:
			"Our invoicing process is now faster and much more organized. I highly recommend it.",
	},
];

function TestimonialCard({
	testimonial,
}: {
	testimonial: (typeof testimonials)[number];
}) {
	const AvatarIcon = testimonial.gender === "female" ? FamaleIcon : MaleIcon;

	return (
		<div className="mx-2 flex h-34 w-[280px] shrink-0 flex-col justify-center rounded-2xl border-2 border-[#041E50] bg-[#041f5049] px-4 shadow-sm sm:mx-3 sm:h-40 sm:w-[360px] sm:px-5">
			<div className="flex items-center gap-2 sm:gap-3">
				<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#062764] text-white">
					<AvatarIcon className="h-4.5 text-[#00B7FF]" />
				</div>

				<div>
					<h3 className="font-italianno text-xl leading-[1] text-white sm:text-xl">
						{testimonial.name}
					</h3>

					<p className="font-inter text-[10px] text-gray-500 sm:text-xs">
						{testimonial.role}
					</p>
				</div>
			</div>

			<div className="my-3 h-px bg-[#062764]" />

			<p className="line-clamp-2 text-xs text-[#eeeeee9e] sm:text-sm">
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
