import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import Marketing from "./components/Marketing";
import App from "./components/App";
import Auth from "./components/Auth";
import NotFound from "./components/NotFound";
import registerServiceWorker from "./registerServiceWorker";
import "../node_modules/font-awesome/css/font-awesome.min.css";

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Marketing} />
			<Route path="/retro" component={App} />
			<Route path="/auth" component={Auth} />
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>,
	document.getElementById("root")
);
registerServiceWorker();
