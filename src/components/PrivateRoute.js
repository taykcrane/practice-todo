import React from "react";
import { Route, Redirect } from "react-router-dom";
import firebase from "firebase";

class PrivateRoute extends React.Component {
    constructor() {
        super();

        this.state = {
            user: null,
            userReceived: false,
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({
                user: user,
                userReceived: true,
            });
        });
    }

    displayRouteOrRedirect = (props, Component) => {
        if (!this.state.userReceived) return <div />;
        return this.state.user ? (
            <Component {...props} />
        ) : (
            <Redirect
                to={{
                    pathname: "/",
                }}
            />
        );
    };

    render() {
        return <Route {...this.props} render={props => this.displayRouteOrRedirect(props, this.props.privateComponent)} />;
    }
}

export default PrivateRoute;
