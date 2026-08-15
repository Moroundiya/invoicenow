import { FilePlus2, Send, WalletCards, ArrowRight } from "lucide-react";
import create from "@/app/assets/images/create.png";
import paid from "@/app/assets/images/paid.png";
import send from "@/app/assets/images/send.png";
import Image, { type StaticImageData } from "next/image";

const steps: Array<{
	number: string;
	image: StaticImageData;
	title: string;
	description: string;
}> = [
	{
		number: "1",
		image: create,
		title: "Create Invoice",
		description:
			"Add your client details, items, and amount. Customize it your way.",
	},
	{
		number: "2",
		image: send,
		title: "Send to Client",
		description:
			"Send your invoice via email or share a secure link with your client.",
	},
	{
		number: "3",
		image: paid,
		title: "Get Paid Faster",
		description:
			"Get paid faster with multiple payment options and automatic reminders.",
	},
];

export default function HowItWorks() {
	return (
		<div className='w-full px-3 py-5 lg:py-10 bg-[url("/background-mobile.png")] lg:bg-[url("/background.png")] bg-cover bg-center bg-no-repeat'>
			<div className="lg:w-10/12 mx-auto h-full">
				<p
					className="text-[#00B7FF] text-6xl font-italianno text-center"
					style={{
						textShadow: "1px 1px 0 #fff",
					}}>
					How It Works
				</p>
				<p className="text-xl text-white text-center font-regular leading-none">
					3 simple steps to get paid
				</p>
				<section className="w-full px-6 py-20">
					<div className="mx-auto flex max-w-6xl flex-col md:flex-row">
						{steps.map((step, index) => {
							const image = step.image;

							return (
								<div
									key={step.number}
									className="relative flex flex-1 flex-col items-center">
									{/* Step */}
									<div className="flex flex-col items-center">
										{/* Icon */}
										<div className="relative">
											<div className="flex h-36 w-36 items-center justify-center rounded-full bg-[#041f5049] border-2 border-[#041E50]">
												{/* <Icon
													size={58}
													strokeWidth={1.5}
													className="text-white"
                                                /> */}
												<Image
													src={image}
													alt="Image"
													className="w-3/5 h-3/5 object-contain"
												/>
											</div>

											{/* Number */}
											<div className="absolute bottom-0 right-3 flex h-8 w-8 items-center justify-center">
												<div className="w-full h-full">
													<div className="absolute inset-0 translate-y-px translate-x-px rounded-full bg-[#00B7FF]" />

													<div className="relative flex h-full w-full items-center justify-center rounded-full bg-linear-to-br from-[#00B7FF] via-[#0066FF] to-[#041E50] text-lg font-bold text-white">
														{step.number}
													</div>
												</div>
											</div>
										</div>

										{/* Text */}
										<div className="mt-7 max-w-[280px] text-center">
											<h3 className="text-4xl text-white font-italianno">
												{step.title}
											</h3>

											<p className="mt-1 font-jakarta text-sm leading-snug text-white/60">
												{step.description}
											</p>
										</div>
									</div>

									{/* Desktop Arrow */}
									{index < steps.length - 1 && (
										<div className="absolute left-[calc(50%+135px)] top-[55px] hidden w-[100px] items-center md:flex">
											<div className="w-full border-t-4 border-dotted border-[#00B7FF]" />
											<ArrowRight
												size={22}
												strokeWidth={2}
												className="ml-1 shrink-0 text-[#00B7FF]"
											/>
										</div>
									)}

									{/* Mobile Arrow */}
									{index < steps.length - 1 && (
										<div className="my-5 flex h-20 flex-col items-center md:hidden">
											<div className="h-14 border-l-4 border-dotted border-[#00B7FF]" />
											<ArrowRight
												size={22}
												strokeWidth={2}
												className="rotate-90 text-[#00B7FF]"
											/>
										</div>
									)}
								</div>
							);
						})}
					</div>
				</section>
			</div>
		</div>
	);
}
