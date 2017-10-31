import Rebase from "re-base";
import firebase from "firebase";

var app = firebase.initializeApp({
	apiKey: "AIzaSyBA0zz5vMcQcTlAvd2X-wn41rUxcI90txY",
	authDomain: "practice-todo-4ff26.firebaseapp.com",
	databaseURL: "https://practice-todo-4ff26.firebaseio.com",
	projectId: "practice-todo-4ff26",
	storageBucket: "practice-todo-4ff26.appspot.com",
});
var base = Rebase.createClass(app.database());

export default base;
