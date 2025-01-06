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

const CodeArea = () => {
	const [array, setArray] = useAtom(arrayAtom);
	const [speed, setSpeed] = useAtom(speedAtom);
	const [isRunning, setIsRunning] = useAtom(isRunningAtom);
	const [algorithm, setAlgorithm] = useAtom(algorithmAtom);
	const [arraySize, setArraySize] = useState(20);

	/*
	 * Handle algorithm parsing based on execution status
	 */
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
		<div className="w-[35%] text-lg boxShadow-l-md p-4">
			<div className="flex flex-col gap-6">
				<div className="flex flex-col">
					<label className="text-gray">Bars</label>
					<Slider
						tabIndex={1}
						onChangeFunction={setArraySize}
						value={arraySize}
					/>
				</div>
				<label className="text-gray">Speed</label>
				<select
					value={speed}
					onChange={(e) => setSpeed(Number(e.target.value))}
					className="p-2 bg-gray-300 text-gray rounded hover:cursor-pointer hover:bg-gray-400"
				>
					<option value="500">Slow</option>
					<option value="100">Medium</option>
					<option value="10">Fast</option>
				</select>
				<label className="text-gray">Algorithm</label>
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
					className="p-2 bg-gray-300 text-gray rounded hover:cursor-pointer hover:bg-gray-400"
				>
					<option value="bubbleSort">Bubble Sort</option>
					<option value="insertionSort">Insertion Sort</option>
					<option value="quickSort">Quick Sort</option>
					<option value="mergeSort">Merge Sort</option>
				</select>
				<div className="flex gap-4">
					<button
						onClick={generateArray}
						disabled={isRunning}
						className="bg-gray-300 grow text-gray px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
					>
						Generate
					</button>
					<button
						onClick={handleExecute}
						disabled={isRunning}
						className="bg-gray-300 grow text-gray px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
					>
						Execute
					</button>
				</div>
			</div>
		</div>
	);
};

export default CodeArea;
