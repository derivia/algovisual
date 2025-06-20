import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="flex flex-col items-center justify-center h-full text-2xl text-gray-300">
			<p className="text-4xl font-bold">404 - Not Found</p>
			<p className="mt-2">The page you are looking for does not exist.</p>
			<Link
				className="mt-8 px-4 py-2 rounded shadow bg-sky-500 text-white hover:bg-sky-600 transition-colors"
				to="/"
			>
				🏠 Go Home
			</Link>
		</div>
	);
};

export default NotFound;
