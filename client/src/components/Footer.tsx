import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="mx-auto text-blue-400">
			Made with ♥ by{" "}
			<Link target="_blank" to="https://github.com/derivia">
				derivia
			</Link>
		</div>
	);
};

export default Footer;
