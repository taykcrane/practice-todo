import React from "react";
import { Link } from "react-router-dom";

class Marketing extends React.Component {
	render() {
		return (
			<div>
				<h1>Welcome to Outro!</h1>
				<ul>
					<li>
						<Link to="/retro/">Go to Retro board</Link>
					</li>
					<li>
						<Link to="/gibberish/">Go to random 404 page</Link>
					</li>
				</ul>
			</div>
		);
	}
}

export default Marketing;
