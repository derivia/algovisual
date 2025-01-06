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
				<div className="flex gap-4">
					<button
						onClick={generateArray}
						disabled={isRunning}
						className="bg-neutral-200 grow text-gray px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
					>
						Generate
					</button>
					<button
						onClick={handleExecute}
						disabled={isRunning}
						className="bg-neutral-200 grow text-gray px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
					>
						Execute
					</button>
				</div>
			</div>
		</div>
	);
};

export default CodeArea;
