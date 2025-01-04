const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isSorted = (arr: number[]): boolean => {
	for (let i = 1; i < arr.length; i++) {
		if (arr[i - 1] > arr[i]) {
			return false;
		}
	}
	return true;
};

export const bubbleSort = async (
	array: number[],
	setArray: (update: number[]) => void,
	speed: number,
) => {
	let arr = [...array];
	let n = arr.length;
	for (let i = 0; i < n - 1; i++) {
		for (let j = 0; j < n - i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
				setArray([...arr]);
				await sleep(speed);
			}
		}
		if (isSorted(arr)) {
			break;
		}
	}
};

export const insertionSort = async (
	array: number[],
	setArray: (update: number[]) => void,
	speed: number,
) => {
	let arr = [...array];
	let n = arr.length;
	for (let i = 1; i < n; i++) {
		let key = arr[i];
		let j = i - 1;
		while (j >= 0 && arr[j] > key) {
			arr[j + 1] = arr[j];
			j--;
			setArray([...arr]);
			await sleep(speed);
		}
		arr[j + 1] = key;
		setArray([...arr]);
		await sleep(speed);
		if (isSorted(arr)) {
			break;
		}
	}
};

export const quickSort = async (
	array: number[],
	setArray: (update: number[]) => void,
	speed: number,
) => {
	const partition = async (arr: number[], low: number, high: number) => {
		let pivot = arr[high];
		let i = low - 1;
		for (let j = low; j < high; j++) {
			if (arr[j] < pivot) {
				i++;
				[arr[i], arr[j]] = [arr[j], arr[i]];
				setArray([...arr]);
				await sleep(speed);
			}
		}
		[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
		setArray([...arr]);
		await sleep(speed);
		return i + 1;
	};

	const sort = async (arr: number[], low: number, high: number) => {
		if (low < high) {
			let pi = await partition(arr, low, high);
			await sort(arr, low, pi - 1);
			await sort(arr, pi + 1, high);
		}
	};

	let arr = [...array];
	await sort(arr, 0, arr.length - 1);
	if (isSorted(arr)) {
		setArray([...arr]);
	}
};

export const mergeSort = async (
	array: number[],
	setArray: (update: number[]) => void,
	speed: number,
) => {
	const merge = async (arr: number[], l: number, m: number, r: number) => {
		let n1 = m - l + 1;
		let n2 = r - m;
		let L = new Array(n1);
		let R = new Array(n2);

		for (let i = 0; i < n1; i++) L[i] = arr[l + i];
		for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

		let i = 0,
			j = 0,
			k = l;
		while (i < n1 && j < n2) {
			if (L[i] <= R[j]) {
				arr[k] = L[i];
				i++;
			} else {
				arr[k] = R[j];
				j++;
			}
			k++;
			setArray([...arr]);
			await sleep(speed);
		}

		while (i < n1) {
			arr[k] = L[i];
			i++;
			k++;
			setArray([...arr]);
			await sleep(speed);
		}

		while (j < n2) {
			arr[k] = R[j];
			j++;
			k++;
			setArray([...arr]);
		}
	};

	const sort = async (arr: number[], l: number, r: number) => {
		if (l < r) {
			let m = Math.floor((l + r) / 2);
			await sort(arr, l, m);
			await sort(arr, m + 1, r);
			await merge(arr, l, m, r);
		}
	};

	let arr = [...array];
	await sort(arr, 0, arr.length - 1);
	if (isSorted(arr)) {
		setArray([...arr]);
	}
};
