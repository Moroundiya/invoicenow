"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/faqs";

export default function Questions() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleFAQ = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="grid grid-cols-1 items-start gap-3 md:grid-cols-2 md:gap-x-8">
			{faqs.map((faq, index) => {
				const isOpen = openIndex === index;
				return (
					<div
						key={faq.question}
						className="overflow-hidden rounded-2xl border-2 border-[#041E50] bg-[#041f5049]">
						<button
							type="button"
							onClick={() => toggleFAQ(index)}
							className="flex w-full items-center justify-between px-4 py-4 text-left cursor-pointer"
							aria-expanded={isOpen}>
							<span className="font-inter text-sm text-white/90">
								{faq.question}
							</span>

							<ChevronDown
								className={`h-4 w-4 shrink-0 text-white/70 transition-transform duration-300 ${
									isOpen ? "rotate-180" : ""
								}`}
							/>
						</button>

						<div
							className={`grid transition-all duration-300 ease-in-out ${
								isOpen
									? "grid-rows-[1fr] opacity-100"
									: "grid-rows-[0fr] opacity-0"
							}`}>
							<div className="overflow-hidden">
								<p className="px-4 pb-4 text-sm leading-6 text-white/50">
									{faq.answer}
								</p>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
