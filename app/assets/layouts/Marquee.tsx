"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import sample from "@/app/assets/images/send.png";

const testimonials = [
	{
		id: 1,
		name: "Sarah Johnson",
		role: "Founder, Lumora",
		message:
			"InvoiceNow made invoicing so much easier. I can create and send professional invoices in seconds.",
		image: sample,
	},
	{
		id: 2,
		name: "Michael Chen",
		role: "Freelance Designer",
		message:
			"I stopped wasting time creating invoices manually. Everything is simple, clean, and incredibly fast.",
		image: sample,
	},
	{
		id: 3,
		name: "Daniel Williams",
		role: "CEO, Craftline",
		message:
			"The easiest invoicing tool I've used. My clients love how professional the invoices look.",
		image: sample,
	},
	{
		id: 4,
		name: "Emily Carter",
		role: "Creative Director, Nova",
		message:
			"InvoiceNow gives me exactly what I need without all the unnecessary complexity.",
		image: sample,
	},
	{
		id: 5,
		name: "James Anderson",
		role: "Consultant, Axis",
		message:
			"I can create an invoice, send it to a client, and move on with my work in less than a minute.",
		image: sample,
	},
	{
		id: 6,
		name: "Olivia Martin",
		role: "Founder, Studio M",
		message:
			"Simple, beautiful, and actually enjoyable to use. InvoiceNow has completely changed my workflow.",
		image: sample,
	},
	{
		id: 7,
		name: "Alex Thompson",
		role: "Developer, Freelance",
		message:
			"No complicated setup and no learning curve. I was creating invoices immediately.",
		image: sample,
	},
	{
		id: 8,
		name: "Sophia Wilson",
		role: "Marketing Lead, Bloom",
		message:
			"Our invoicing process is now faster and much more organized. I highly recommend it.",
		image: sample,
	},
];

function TestimonialCard({
	testimonial,
}: {
	testimonial: (typeof testimonials)[number];
}) {
	return (
		<div className="mx-2 flex h-34 w-[280px] shrink-0 flex-col justify-center rounded-2xl border-2 border-[#041E50] bg-[#041f5049] px-4 shadow-sm sm:mx-3 sm:h-40 sm:w-[360px] sm:px-5">
			<div className="flex items-center gap-2 sm:gap-3">
				<Image
					src={testimonial.image}
					alt={testimonial.name}
					width={40}
					height={40}
					className="h-8 w-8 rounded-full object-cover"
				/>

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
			{/* Testimonial */}
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
			{/* First row */}
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

			{/* Second row */}
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
