import React from "react";
import { Link } from "react-router-dom";

class NotFound extends React.Component {
	render() {
		return (
			<div>
				<h1>Oops! Can't find that page</h1>
				<ul>
					<li>
						<Link to="/">Go to Marketing page</Link>
					</li>
					<li>
						<Link to="/retro/">Go to retro board</Link>
					</li>
				</ul>
			</div>
		);
	}
}

export default NotFound;
