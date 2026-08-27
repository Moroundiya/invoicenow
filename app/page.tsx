import HeroSection from "./assets/components/HeroSection";
import Features from "./assets/components/Features";
import HowItWorks from "./assets/components/HowItWorks";
import Templates from "./assets/components/Templates";
import Reviews from "./assets/components/Reviews";
import Faq from "./assets/components/Faq";
import Footer from "./assets/components/Footer";

export default function Home() {
	return (
		<div
			className="relative w-full min-h-dvh"
			id="homepage">
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
