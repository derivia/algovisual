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
			max="250"
			tabIndex={tabIndex}
			value={value}
			onChange={(e) => onChangeFunction(Number(e.target.value))}
			className="p-2 bg-gray-300 accent-blue-300"
		/>
	);
};

export default Slider;
