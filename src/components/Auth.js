import React from "react";
import firebase from "firebase";
import firebaseui from "firebaseui";
import base from "../base";
import "./Auth.css";
import "../../node_modules/firebaseui/dist/firebaseui.css";

class Auth extends React.Component {
    constructor() {
        super();

        this.state = {
            user: null,
        };
    }

    componentDidMount() {
        // FirebaseUI config.
        console.log("authentication started");
        const uiConfig = {
            signInSuccessUrl: "/retro/",
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
            // Terms of service url.
            tosUrl: "/tos/",
        };

        // Initialize the FirebaseUI Widget using Firebase.
        const ui = new firebaseui.auth.AuthUI(firebase.auth(base.initializedApp));
        // The start method will wait until the DOM is loaded.
        ui.start("#firebaseui-auth-container", uiConfig);

        var currentUid = null;
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ user });
            } else {
                console.log("no user account found!");
            }
        });
    }

    logout = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                this.setState({
                    user: null,
                });
            });
    };

    render() {
        return <div id="firebaseui-auth-container" className="auth-container" />;
    }
}

export default Auth;
