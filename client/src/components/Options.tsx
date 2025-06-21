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
		<div className="w-[25%] rounded-lg bg-white border border-gray-200 p-6 flex flex-col gap-6">
			<div className="flex flex-col gap-4">
				<div className="flex flex-col">
					<label className="text-gray-700 text-base font-medium mb-1">
						Bars: <span className="font-normal">{arraySize}</span>
					</label>
					<Slider
						tabIndex={1}
						onChangeFunction={setArraySize}
						value={arraySize}
					/>
				</div>
				<div className="flex flex-col">
					<label className="text-gray-700 text-base font-medium mb-1">
						Speed
					</label>
					<select
						value={speed}
						onChange={(e) => setSpeed(Number(e.target.value))}
						className="p-2 bg-gray-100 text-gray-700 rounded-md border border-gray-300 hover:bg-gray-200 cursor-pointer text-base"
					>
						<option value="500">Slow</option>
						<option value="100">Medium</option>
						<option value="10">Fast</option>
					</select>
				</div>
				<div className="flex flex-col">
					<label className="text-gray-700 text-base font-medium mb-1">
						Algorithm
					</label>
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
						className="p-2 bg-gray-100 text-gray-700 rounded-md border border-gray-300 hover:bg-gray-200 cursor-pointer text-base"
					>
						<option value="bubbleSort">Bubble Sort</option>
						<option value="insertionSort">Insertion Sort</option>
						<option value="quickSort">Quick Sort</option>
						<option value="mergeSort">Merge Sort</option>
					</select>
				</div>
			</div>
			<div className="flex flex-col gap-4 mt-2">
				<button
					onClick={generateArray}
					disabled={isRunning}
					className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base font-medium"
				>
					Generate
				</button>
				<button
					onClick={handleExecute}
					disabled={isRunning}
					className="bg-indigo-400 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base font-medium"
				>
					Execute
				</button>
			</div>
		</div>
	);
};

export default Options;
