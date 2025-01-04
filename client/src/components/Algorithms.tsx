import { useState } from "react";
import { useAtom } from "jotai";
import {
	arrayAtom,
	speedAtom,
	isRunningAtom,
	algorithmAtom,
	barColorAtom,
} from "../utils/store";
import {
	bubbleSort,
	insertionSort,
	quickSort,
	mergeSort,
} from "../utils/algorithms";

const CodeArea = () => {
	const [array, setArray] = useAtom(arrayAtom);
	const [speed, setSpeed] = useAtom(speedAtom);
	const [isRunning, setIsRunning] = useAtom(isRunningAtom);
	const [algorithm, setAlgorithm] = useAtom(algorithmAtom);
	const [barColor, setBarColor] = useAtom(barColorAtom);
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
		<div className="w-[35%] bg-neutral-400 p-4">
			<h2 className="text-xl font-semibold text-gray mb-4">Options</h2>
			<div className="flex flex-col gap-4">
				<div>
					<label className="text-gray">Number of Bars </label>
					<input
						type="number"
						min="5"
						max="100"
						value={arraySize}
						onChange={(e) => setArraySize(Number(e.target.value))}
						className="p-2 bg-neutral-200 text-gray rounded"
					/>
					<button
						onClick={generateArray}
						className="ml-2 bg-neutral-200 text-gray px-4 py-2 rounded hover:bg-gray-900"
					>
						Generate
					</button>
				</div>
				<div className="flex flex-row gap-2 items-center">
					<label className="text-gray">Bar Color </label>
					<input
						type="color"
						value={barColor}
						onChange={(e) => setBarColor(e.target.value)}
						className="p-1 bg-neutral-200 rounded"
					/>
				</div>
				<div>
					<label className="text-gray">Speed </label>
					<select
						value={speed}
						onChange={(e) => setSpeed(Number(e.target.value))}
						className="p-2 bg-neutral-200 text-gray rounded"
					>
						<option value="500">Slow</option>
						<option value="100">Medium</option>
						<option value="10">Fast</option>
					</select>
				</div>
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
					className="p-2 bg-neutral-200 text-gray rounded"
				>
					<option value="bubbleSort">Bubble Sort</option>
					<option value="insertionSort">Insertion Sort</option>
					<option value="quickSort">Quick Sort</option>
					<option value="mergeSort">Merge Sort</option>
				</select>
				<button
					onClick={handleExecute}
					disabled={isRunning}
					className="bg-neutral-200 text-gray px-4 py-2 rounded hover:bg-gray-900 disabled:opacity-50"
				>
					Execute
				</button>
			</div>
		</div>
	);
};

export default CodeArea;
