import React, { Component } from 'react';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';
import Meteor, { createContainer } from 'react-native-meteor';
import { Navigation } from 'react-native-navigation';
import thunk from 'redux-thunk';
import * as reducers from './reducers';
import * as appActions from './reducers/app/actions';

// redux related book keeping
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

// screen related book keeping
import { registerScreens } from './screens';
registerScreens(store, Provider);

// Not sure best place to connect, this works though.
Meteor.connect('http://localhost:3000/websocket');


/**
 * Goal:  Connect Meteor so that redux store always has
 *        Meteor.user(), Meteor.status, and Meteor.loggingIn state.
 		  I want to hook the switch below into the redux state so it automatically
 *		  manages loggedIn, loggedOut state
 *
 * Problem: I can't figure out how to setup the store to include Meteor.
 *          The following example is what I'm accomplish in this file.
 * https://gist.github.com/spencercarli/8a0eea08a218cc16a35938fd3a95fc45#file-meteorconnect-js
 *
 */

// notice that this is just a simple class, it's not a React component
 export default class App {
	constructor() {
		// super(props) // don't need to init super because it's not a component
		// since react-redux only works on components, we need to subscribe this class manually
		store.subscribe(this.onStoreUpdate.bind(this));
		store.dispatch(appActions.appInitialized());
	}

	// These don't work because it's a regular class, not component
	// componentWillMount() {
	// 	console.log('will mount');
	// }
	// componentDidMount() {
	// 	console.log('did mount');
	// }

	onStoreUpdate() {
		console.log('onStoreUpdate');
		const { root } = store.getState().app;

		// handle a root change
		// I want this to update if the Meteor.user() status changes
		if (this.currentRoot != root) {
			this.currentRoot = root;
			this.startApp(root);
		}
	}

	startApp(root) {
		switch (root) {
			case 'login':
			Navigation.startSingleScreenApp({
				screen: {
					screen: 'example.LoginScreen',
					title: 'Login',
					navigatorStyle: {}
				},
				passProps: {
					str: 'This is a prop passed in \'startSingleScreenApp()\'!',
					obj: {
						str: 'This is a prop passed in an object!',
						arr: [
							{
								str: 'This is a prop in an object in an array in an object!'
							}
						],
						arr2: [
							[
								'array of strings',
								'with two strings'
							],
							[
								1, 2, 3
							]
						]
					},
					num: 1234
				}
			});
			return;
			case 'after-login':
			Navigation.startTabBasedApp({
				tabs: [
					{
						label: 'One',
						screen: 'example.FirstTabScreen',
						icon: require('../img/one.png'),
						selectedIcon: require('../img/one_selected.png'),
						title: 'Screen One',
						navigatorStyle: {},
					},
					{
						label: 'Two',
						screen: 'example.SecondTabScreen',
						icon: require('../img/two.png'),
						selectedIcon: require('../img/two_selected.png'),
						title: 'Screen Two',
						navigatorStyle: {},
					}
				],
				passProps: {
					str: 'This is a prop passed in \'startTabBasedApp\'!',
					obj: {
						str: 'This is a prop passed in an object!',
						arr: [
							{
								str: 'This is a prop in an object in an array in an object!'
							}
						]
					},
					num: 1234
				},
				animationType: 'slide-down',
				title: 'Redux Example'
			});
			return;
			default:
			console.error('Unknown app root');
		}
	}

	render(){
		return null
	}
}
// I don't think I can use createContainer because this file is a regular class.
//
// export default createContainer(params=>{
//   return {
//     users: Meteor.user(),
//     status: Meteor.status(),
//     loggingIn: Meteor.loggingIn(),
//   };
// }, App);
