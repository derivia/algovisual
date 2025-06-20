import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { arrayAtom } from "../utils/store";

const VisualizationArea = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const array = useAtomValue(arrayAtom);
	const barColor = "#38bdf8";

	useEffect(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		const ctx = canvas?.getContext("2d");

		if (!canvas || !ctx || !container) return;

		const resizeCanvas = () => {
			canvas.width = container.clientWidth;
			canvas.height = container.clientHeight;

			const { width, height } = canvas;
			const barWidth = width / array.length;
			const maxValue = Math.max(...array);

			ctx.clearRect(0, 0, width, height);

			array.forEach((value, index) => {
				const barHeight = (value / maxValue) * height;
				const x = index * barWidth;
				const y = height - barHeight;

				ctx.fillStyle = barColor;
				ctx.fillRect(x, y, barWidth - 2, barHeight);
			});
		};

		resizeCanvas();

		window.addEventListener("resize", resizeCanvas);

		return () => {
			window.removeEventListener("resize", resizeCanvas);
		};
	}, [array, barColor]);

	return (
		<div ref={containerRef} className="w-[65%] h-full relative">
			<canvas
				ref={canvasRef}
				className="w-full h-full bg-gray-800 shadow-lg p-2 rounded-lg border border-gray-700"
				style={{ display: "block" }}
			/>
		</div>
	);
};

export default VisualizationArea;
