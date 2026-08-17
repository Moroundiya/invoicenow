"use client";

import Image from "next/image";
import FlashIcon from "@iconify-react/fontisto/flash";
import DotFilledIcon from "@iconify-react/radix-icons/dot-filled";
import Link from "next/link";
import invoice from "@/app/assets/images/invoice.png";
import { RoughNotation } from "react-rough-notation";
import ArrowRightLineIcon from "@iconify-react/majesticons/arrow-right-line";
import { Check } from "lucide-react";
import Navbar from "../layouts/Navbar";

export default function HeroSection() {
	return (
		<div className="min-h-dvh w-full overflow-hidden bg-[url('/background-mobile.png')] bg-cover bg-center bg-no-repeat px-3 py-5 lg:py-7 lg:px-6 lg:bg-[url('/background.png')] xl:px-10">
			<Navbar />

			<div className="mx-auto mt-18 grid grid-cols-1 items-center gap-10 lg:mt-12 lg:grid-cols-2 lg:gap-0">
				<div className="flex w-full flex-col items-start justify-center">
					<div className="mb-3 flex items-center justify-center space-x-1 rounded-full bg-[#00B7FF] px-2 py-1 text-sm font-semibold text-[#041636] sm:mb-6 lg:px-3">
						<FlashIcon className="h-3.5 text-[#041636]" />
						<div className="flex items-center justify-center space-x-0.5 text-xs lg:text-sm">
							<p>Create</p>
							<DotFilledIcon className="h-3.5 lg:h-4" />
							<p>Send</p>
							<DotFilledIcon className="h-3.5 lg:h-4" />
							<p>Get paid</p>
						</div>
					</div>

					<p
						className="max-w-3xl text-[2.8rem] font-bold leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[0.95]"
						style={{
							textShadow: "1.5px 1.5px 0 #00B7FF",
						}}>
						Create Professional Invoices in
						<span
							className="ms-2 text-[2.8rem] text-[#00B7FF] font-italianno sm:text-5xl md:text-6xl lg:ms-4 lg:text-7xl"
							style={{
								textShadow: "1.5px 1.5px 0 #fff",
							}}>
							<RoughNotation
								type="circle"
								animationDelay={100}
								color="#00B7FF"
								strokeWidth={2}
								padding={5}
								animate
								show>
								Seconds
							</RoughNotation>
						</span>
					</p>
					<p className="mt-5 w-full max-w-2xl text-sm font-light text-white/70 sm:text-base lg:w-10/12 lg:leading-6">
						InvoiceNow helps freelancers and businesses create, customize,
						download professional invoices effortlessly and get paid faster,
						without the stress or hassle.
					</p>
					<div className="mt-5 flex w-full flex-col gap-x-3 gap-y-2 text-sm text-white/70 lg:flex-row lg:items-center">
						<div className="flex items-center gap-2">
							<div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#009EFF]">
								<Check
									className="h-3 w-3 text-[#041636]"
									strokeWidth={3}
								/>
							</div>
							<span>No complicated setup</span>
						</div>

						<div className="hidden h-4 w-px bg-white/20 lg:block" />

						<div className="flex items-center gap-2">
							<div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#009EFF]">
								<Check
									className="h-3 w-3 text-[#041636]"
									strokeWidth={3}
								/>
							</div>
							<span>No sign up</span>
						</div>

						<div className="hidden h-4 w-px bg-white/20 lg:block" />

						<div className="flex items-center gap-2">
							<div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#009EFF]">
								<Check
									className="h-3 w-3 text-[#041636]"
									strokeWidth={3}
								/>
							</div>
							<span>No credit card required</span>
						</div>
					</div>

					<div className="mt-8 flex w-full flex-row items-center gap-5 sm:mt-10 sm:items-center sm:gap-8">
						<Link
							href="/create"
							className="flex items-center justify-center space-x-1 rounded-xl bg-linear-to-br from-[#00B7FF] via-[#0066FF] to-[#041E50] px-3 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#0066FF] sm:w-auto lg:text-base lg:space-x-2 lg:px-5">
							<span>Create your first invoice</span>
							<ArrowRightLineIcon className="h-5 text-white" />
						</Link>
						<Link
							href="#features"
							className="text-sm font-semibold text-[#00B7FF] transition hover:text-white lg:text-base">
							Explore Features
						</Link>
					</div>
				</div>

				<div className="flex w-full items-center justify-center">
					<Image
						src={invoice}
						alt="Invoice"
						priority
						className="h-auto w-[85%] max-w-105 object-contain sm:w-[70%] lg:w-[530px] lg:max-w-none"
					/>
				</div>
			</div>
		</div>
	);
}
