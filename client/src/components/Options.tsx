import { useState } from "react";
import { useAtom } from "jotai";
import {
	arrayAtom,
	speedAtom,
	isRunningAtom,
	algorithmAtom,
} from "../utils/store";
import {
	bubbleSort,
	insertionSort,
	quickSort,
	mergeSort,
} from "../utils/algorithms";
import Slider from "./Slider";

const Options = () => {
	const [array, setArray] = useAtom(arrayAtom);
	const [speed, setSpeed] = useAtom(speedAtom);
	const [isRunning, setIsRunning] = useAtom(isRunningAtom);
	const [algorithm, setAlgorithm] = useAtom(algorithmAtom);
	const [arraySize, setArraySize] = useState(20);

	const handleExecute = async () => {
		setIsRunning(true);
		const sortingAlgorithm =
			algorithm === "bubbleSort"
				? bubbleSort
				: algorithm === "insertionSort"
					? insertionSort
					: algorithm === "quickSort"
						? quickSort
						: mergeSort;
		await sortingAlgorithm(array, setArray, speed);
		setIsRunning(false);
	};

	const generateArray = () => {
		setArray(
			Array.from(
				{ length: arraySize },
				() => Math.floor(Math.random() * 100) + 5,
			),
		);
	};

	return (
		<div className="w-[25%] rounded-lg shadow-lg bg-gray-800 border border-gray-700 text-lg p-4">
			<div className="flex w-full flex-col gap-5">
				<div className="flex flex-col">
					<label className="text-gray-300">
						Bars: <span>{arraySize}</span>
					</label>
					<Slider
						tabIndex={1}
						onChangeFunction={setArraySize}
						value={arraySize}
					/>
				</div>
				<label className="text-gray-300">Speed</label>
				<select
					value={speed}
					onChange={(e) => setSpeed(Number(e.target.value))}
					className="p-2 bg-gray-700 text-gray-300 rounded hover:cursor-pointer hover:bg-gray-600 border border-gray-600"
				>
					<option value="500">Slow</option>
					<option value="100">Medium</option>
					<option value="10">Fast</option>
				</select>
				<label className="text-gray-300">Algorithm</label>
				<select
					value={algorithm}
					onChange={(e) =>
						setAlgorithm(
							e.target.value as
								| "bubbleSort"
								| "insertionSort"
								| "quickSort"
								| "mergeSort",
						)
					}
					className="p-2 bg-gray-700 text-gray-300 rounded hover:cursor-pointer hover:bg-gray-600 border border-gray-600"
				>
					<option value="bubbleSort">Bubble Sort</option>
					<option value="insertionSort">Insertion Sort</option>
					<option value="quickSort">Quick Sort</option>
					<option value="mergeSort">Merge Sort</option>
				</select>
				<div className="flex flex-col mx-4 gap-4 mt-4">
					<button
						onClick={generateArray}
						disabled={isRunning}
						className="bg-sky-500 shadow-md grow text-white px-4 py-2 rounded hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						Generate
					</button>
					<button
						onClick={handleExecute}
						disabled={isRunning}
						className="bg-green-500 shadow-md grow text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						Execute
					</button>
				</div>
			</div>
		</div>
	);
};

export default Options;
