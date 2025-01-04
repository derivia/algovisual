import { atom } from "jotai";

export const arrayAtom = atom<number[]>([]);
export const speedAtom = atom(100);
export const isRunningAtom = atom(false);
export const algorithmAtom = atom<
	"bubbleSort" | "insertionSort" | "quickSort" | "mergeSort"
>("bubbleSort");
export const barColorAtom = atom("#527852");
