export const getContrastColor = (hexColor: string): string => {
	const sanitizedHex = hexColor.replace(/^#/, "");
	const r = parseInt(sanitizedHex.substring(0, 2), 16) / 255;
	const g = parseInt(sanitizedHex.substring(2, 4), 16) / 255;
	const b = parseInt(sanitizedHex.substring(4, 6), 16) / 255;
	const luminance = (value: number) =>
		value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);

	// https://en.wikipedia.org/wiki/Luma_(video)
	const relLuminance =
		0.2126 * luminance(r) + 0.7152 * luminance(g) + 0.0722 * luminance(b);

	// return black or white based on the luminance threshold
	return relLuminance > 0.179 ? "black" : "white";
};
