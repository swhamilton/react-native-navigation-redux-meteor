import React, {Component, PropTypes} from 'react';
import {
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import Meteor, { createContainer } from 'react-native-meteor';
import * as counterActions from '../reducers/counter/actions';
import * as meteorActions from '../reducers/meteor/actions';
import * as appActions from '../reducers/app/actions';
import { Navigation } from 'react-native-navigation';
import { main } from './TabData';

// this is a traditional React component connected to the redux store
class LoginScreen extends Component {

	static propTypes = {
		str: PropTypes.string.isRequired,
		obj: PropTypes.object.isRequired,
		num: PropTypes.number.isRequired
	};

	constructor(props) {
		super(props);
	}

	componentWillUnmount() {
		console.log('Component-Lifecycle', 'componentWillUnmount', 'LoginScreen');
	}
	componentWillMount() {
		this.updateReduxStore(this.props);
		console.log('Mounted');
	}

	updateReduxStore(props) {
		this.props.dispatch(meteorActions.updateMeteorData(props.user, props.status, props.loggingIn));
	}

	render() {
		console.log(this.props.user);
		console.log(this.props.status.status);
		console.log(this.props.loggingIn);
		// debugger;
		// {this.props.meteor.status.connected}

		return (
			<View style={{flex: 1, padding: 20}}>

				<Text style={styles.text}>
					<Text style={{fontWeight: '500'}}>Counter:</Text>
					{this.props.counter.count}
				</Text>

				<Text style={styles.text}>
					<Text style={{fontWeight: '500'}}>Meteor Status:</Text>
					{this.props.status.status}
				</Text>

				<TouchableOpacity onPress={ this.onLoginPress.bind(this) }>
					<Text style={styles.button}>Login</Text>
				</TouchableOpacity>



				<TouchableOpacity onPress={ this.onInAppNotificationPress.bind(this) }>
					<Text style={styles.button}>Show In-App Notification</Text>
				</TouchableOpacity>

				<Text style={{fontWeight: '500'}}>user prop: {JSON.stringify(this.props.user, null, 4)}</Text>
				<Text style={{fontWeight: '500'}}>status prop: {JSON.stringify(this.props.status, null, 4)}</Text>
				<Text style={{fontWeight: '500'}}>loggingIn prop: {this.props.loggingIn.toString()}</Text>


			</View>
		);
	}
	/*
	<TouchableOpacity onPress={ this.onIncrementPress.bind(this) }>
	<Text style={styles.button}>Increment Counter</Text>
	</TouchableOpacity>
	<TouchableOpacity onPress={ this.onShowModalPress.bind(this) }>
	<Text style={styles.button}>Show another login as modal</Text>
	</TouchableOpacity>
	// <Text style={{fontWeight: '500'}}>String prop: {this.props.str}</Text>
	// <Text style={{fontWeight: '500'}}>Number prop: {this.props.num}</Text>
	// <Text style={{fontWeight: '500'}}>Object prop: {this.props.obj.str}</Text>
	// <Text style={{fontWeight: '500'}}>Array prop: {this.props.obj.arr[0].str}</Text>
	// <Text style={{fontWeight: '500'}}>Array of arrays prop: {JSON.stringify(this.props.obj.arr2)}</Text>
	//
	*/
	onIncrementPress() {
		this.props.dispatch(counterActions.increment());
	}

	onInAppNotificationPress() {
		this.props.navigator.showInAppNotification({
			screen: "example.NotificationScreen"
		});
	}

	onLoginPress() {
		this.props.dispatch(appActions.login());
	}

	onShowModalPress() {
		this.props.navigator.showModal({
			screen: 'example.LoginScreen',
			title: 'Login',
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
	}
}

const styles = StyleSheet.create({
	text: {
		textAlign: 'center',
		fontSize: 18,
		marginBottom: 10,
		marginTop: 10,
	},
	button: {
		textAlign: 'center',
		fontSize: 18,
		marginBottom: 10,
		marginTop: 10,
		color: 'blue'
	}
});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
	return {
		counter: state.counter
	};
}

const MeteorContainer = createContainer((mapStateToProps) => {
	return {
		user: Meteor.user(),
		status: Meteor.status(),
		loggingIn: Meteor.loggingIn()
	}
}, LoginScreen);

export default connect((mapStateToProps) => (mapStateToProps))(MeteorContainer)

// export default connect(mapStateToProps)(LoginScreen);
