import { useEffect } from "react";
import { useAtom } from "jotai";
import { arrayAtom } from "../utils/store";
import Header from "../components/Header";
import Visualization from "../components/Visualization";
import Options from "../components/Options";
import Footer from "../components/Footer";

const Home = () => {
	const [_array, setArray] = useAtom(arrayAtom);

	useEffect(() => {
		setArray(
			Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1),
		);
	}, [setArray]);

	return (
		<div className="flex flex-col gap-4 h-screen w-full">
			<Header />
			<div className="flex flex-grow h-[75%] w-[95%] gap-4 justify-center self-center">
				<Visualization />
				<Options />
			</div>
			<Footer />
		</div>
	);
};

export default Home;
