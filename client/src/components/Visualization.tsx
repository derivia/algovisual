import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { arrayAtom, barColorAtom } from "../utils/store";
import { getContrastColor } from "../utils/colors";

const VisualizationArea = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const array = useAtomValue(arrayAtom);
	const barColor = useAtomValue(barColorAtom);

	/**
	 * Render canvas on startup array or barColor change
	 *
	 * Uses array atom with default value 20
	 * Which can be changed on the Options area
	 */
	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;

		const { width, height } = canvas;
		const barWidth = width / array.length;
		const maxValue = Math.max(...array);

		ctx.clearRect(0, 0, width, height);
		ctx.font = "10px Consolas";
		ctx.textAlign = "center";

		array.forEach((value, index) => {
			const barHeight = (value / maxValue) * height;
			const x = index * barWidth;
			const y = height - barHeight;

			ctx.fillStyle = barColor;
			ctx.fillRect(x, y, barWidth - 2, barHeight);

			// @TODO: Some problems with this:
			// ctx.fillStyle = getContrastColor(barColor);
			// ctx.fillText(value.toString(), x + barWidth / 2 - 1, y + barHeight - 5);
		});
	}, [array, barColor]);

	return (
		<div className="w-[65%] bg-neutral-500 p-4">
			<canvas
				ref={canvasRef}
				className="w-full h-[90%] px-3 py-4 bg-neutral-400 rounded-lg mb-12"
				width={800}
				height={400}
			/>
		</div>
	);
};

export default VisualizationArea;
