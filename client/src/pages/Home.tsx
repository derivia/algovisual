import { useEffect } from "react";
import { useAtom } from "jotai";
import { arrayAtom } from "../utils/store";
import Header from "../components/Header";
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
			<Header />
			<div className="flex flex-1">
				<Visualization />
				<Options />
			</div>
		</div>
	);
};

export default Home;
