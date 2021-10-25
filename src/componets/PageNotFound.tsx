import FOF from "../assets/images/404.png";

function PageNotFound(): JSX.Element {
	return (
		<div className="container-column">
			<img
				src={FOF}
				alt="not_found"
				style={{ height: "50vh", width: "auto" }}
			/>
			<h2>Page Not Found</h2>
		</div>
	);
}

export default PageNotFound;
