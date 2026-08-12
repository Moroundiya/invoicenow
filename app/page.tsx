import Image from "next/image";
import Navbar from "./assets/components/Navbar";
import HeroSection from "./assets/components/HeroSection";

export default function Home() {
	return (
		<div className="w-full min-h-dvh bg-[#E7EDF6]">
			<Navbar />
			<HeroSection />
			<p>Hello World</p>
		</div>
	);
}
