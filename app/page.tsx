import Image from "next/image";
import Navbar from "./assets/components/Navbar";
import HeroSection from "./assets/components/HeroSection";
import logo from "./assets/images/logo.png";
import Features from "./assets/components/Features";
import HowItWorks from "./assets/components/HowItWorks";
import Templates from "./assets/components/Templates";
import Reviews from "./assets/components/Reviews";
import Faq from "./assets/components/Faq";
import Footer from "./assets/components/Footer";

export default function Home() {
	return (
		<div className="relative w-full min-h-dvh">
			<HeroSection />
			<Features />
			<HowItWorks />
			<Templates />
			<Reviews />
			<Faq />
			<Footer />
		</div>
	);
}
