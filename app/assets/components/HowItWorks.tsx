"use client";

import Image from "next/image";
import ArrowRightIcon from "@iconify-react/vadivam/arrow-right";
import { steps } from "@/app/assets/data/steps";

export default function HowItWorks() {
	return (
		<div
			className='w-full px-3 pt-5 md:py-10 lg:pt-14 lg:pb-0 bg-[url("/background-mobile.png")] lg:bg-[url("/background.png")] bg-cover bg-center bg-no-repeat'
			id="how-it-works">
			<div className="lg:w-10/12 mx-auto h-full">
				<p
					className="text-[#00B7FF] text-5xl font-italianno text-center lg:text-6xl"
					style={{
						textShadow: "1px 1px 0 #fff",
					}}>
					How It Works
				</p>

				<p className="text-white text-center font-regular leading-none lg:text-lg">
					3 simple steps to get paid
				</p>

				<section className="w-full px-6 py-10 lg:py-20">
					<div className="mx-auto flex max-w-6xl flex-col md:flex-row md:space-x-5">
						{steps.map((step, index) => (
							<div
								key={step.number}
								className="relative flex min-w-0 flex-1 flex-col items-center">
								<div className="flex flex-col items-center">
									<div className="relative">
										<div className="flex h-36 w-36 items-center justify-center rounded-full border-2 border-[#041E50] bg-[#041f5049]">
											<Image
												src={step.image}
												alt={step.title}
												className="h-3/5 w-3/5 object-contain"
											/>
										</div>

										<div className="absolute bottom-0 right-3 flex h-8 w-8 items-center justify-center">
											<div className="h-full w-full">
												<div className="absolute inset-0 translate-x-px translate-y-px rounded-full bg-[#00B7FF]" />

												<div className="relative flex h-full w-full items-center justify-center rounded-full bg-linear-to-br from-[#00B7FF] via-[#0066FF] to-[#041E50] text-lg font-bold text-white">
													{step.number}
												</div>
											</div>
										</div>
									</div>

									<div className="mt-5 max-w-70 text-center lg:mt-7">
										<h3 className="text-4xl text-white font-italianno">
											{step.title}
										</h3>

										<p className="text-sm leading-snug text-white/60">
											{step.description}
										</p>
									</div>
								</div>

								{index < steps.length - 1 && (
									<div
										className="absolute top-18 hidden -translate-y-1/2 items-center md:flex"
										style={{
											left: "calc(50% + 72px + (100% - 144px) / 4)",
											width: "calc((100% - 144px) / 2)",
										}}>
										<div className="w-full border-t-4 border-dotted border-[#00B7FF]" />
										<ArrowRightIcon className="h-7 w-7 shrink-0 text-[#00B7FF]" />
									</div>
								)}

								{index < steps.length - 1 && (
									<div className="my-5 flex h-20 flex-col items-center md:hidden">
										<div className="h-14 border-l-4 border-dotted border-[#00B7FF]" />
										<ArrowRightIcon className="mt-1 h-7 rotate-90 text-[#00B7FF]" />
									</div>
								)}
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}
