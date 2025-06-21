import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="mx-auto text-gray-500 text-sm mb-4 mt-8">
			Made with ❤  by{" "}
			<Link
				target="_blank"
				to="https://www.lorrran.com"
				className="text-blue-600 hover:text-blue-700 transition-colors"
			>
				Lorran Soares
			</Link>
		</div>
	);
};

export default Footer;
