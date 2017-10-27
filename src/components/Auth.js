import React from "react";
import firebase from "firebase";
import firebaseui from "firebaseui";
import base from "../base";
import "./Auth.css";
import "../../node_modules/firebaseui/dist/firebaseui.css";

class Auth extends React.Component {
    componentDidMount() {
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
        console.log(this.props);
        window.firebaseUI.start("#firebaseui-auth-container", uiConfig);
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
