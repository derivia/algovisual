interface SliderProps {
	value: number;
	onChangeFunction: Function;
	tabIndex?: number;
}

const Slider = ({ tabIndex, value, onChangeFunction }: SliderProps) => {
	return (
		<input
			type="range"
			min="5"
			max="100"
			step="1"
			tabIndex={tabIndex}
			value={value}
			onChange={(e) => onChangeFunction(Number(e.target.value))}
			className="p-2 bg-gray-700 accent-sky-400 w-full h-2 rounded-lg appearance-none cursor-pointer"
		/>
	);
};

export default Slider;
