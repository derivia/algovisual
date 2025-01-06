import { useEffect } from "react";
import { useAtom } from "jotai";
import { arrayAtom } from "../utils/store";
import Footer from "../components/Footer";
import Visualization from "../components/Visualization";
import Options from "../components/Options";

const Home = () => {
	const [_array, setArray] = useAtom(arrayAtom);

	useEffect(() => {
		setArray(
			Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1),
		);
	}, [setArray]);

	return (
		<div className="flex flex-col w-full h-screen">
			<div className="flex flex-1 mt-12 self-center w-[95%]">
				<Visualization />
				<Options />
			</div>
			<Footer />
		</div>
	);
};

export default Home;
