import Image from "next/image";
import Navbar from "./assets/components/Navbar";
import HeroSection from "./assets/components/HeroSection";
import logo from "./assets/images/logo.png";
import Features from "./assets/components/Features";
import HowItWorks from "./assets/components/HowItWorks";
import Templates from "./assets/components/Templates";

export default function Home() {
	return (
		<div className="relative w-full min-h-dvh">
			<Navbar />
			<HeroSection />
			<Features />
			<HowItWorks />
			<Templates />
		</div>
	);
}
