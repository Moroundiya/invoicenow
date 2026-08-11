import Image from "next/image";
import Navbar from "./assets/components/Navbar";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center min-h-dvh py-2 bg-[#AFC9ED]">
			<Navbar />
		</div>
	);
}
