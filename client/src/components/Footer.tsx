import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="mx-auto text-gray-400 mb-4">
			Made with ♥ by{" "}
			<Link
				target="_blank"
				to="https://github.com/derivia"
				className="text-sky-400 hunderlined"
			>
				derivia
			</Link>
		</div>
	);
};

export default Footer;
