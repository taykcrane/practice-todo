import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import firebase from "firebase";
import firebaseui from "firebaseui";
import base from "./base";
import "./index.css";
import Marketing from "./components/Marketing";
import App from "./components/App";
import PrivateRoute from "./components/PrivateRoute";
import Auth from "./components/Auth";
import NotFound from "./components/NotFound";
import registerServiceWorker from "./registerServiceWorker";
import "../node_modules/font-awesome/css/font-awesome.min.css";

// Initialize the FirebaseUI Widget using Firebase.
window.firebaseUI = new firebaseui.auth.AuthUI(firebase.auth(base.initializedApp));

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Marketing} />
			<PrivateRoute path="/retro" privateComponent={App} />
			<Route path="/auth" component={Auth} />
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>,
	document.getElementById("root")
);
registerServiceWorker();
