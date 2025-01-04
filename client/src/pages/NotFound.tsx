import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="self-center text-[2rem] flex flex-col items-center">
			<div>404 - Not found</div>
			<span className="rounded bg-slate-400 p-2">
				🏠 Go <Link to="/">Home</Link>
			</span>
		</div>
	);
};

export default NotFound;
