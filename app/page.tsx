import Image from "next/image";
import Navbar from "./assets/components/Navbar";
import HeroSection from "./assets/components/HeroSection";
import logo from "./assets/images/logo.png";

export default function Home() {
	return (
		<div className="relative w-full min-h-dvh bg-[#041636]">
			<Navbar />
			<HeroSection />
			<p>Hello World</p>
		</div>
	);
}
