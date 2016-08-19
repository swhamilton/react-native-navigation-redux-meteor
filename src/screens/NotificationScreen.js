import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions
} from 'react-native';

export default class NotificationScreen extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>
					connecting to Meteor...
				</Text>
			</View>
		);
	}
	// <TouchableOpacity onPress={ this.onDismissPress.bind(this) }>
	// 	<Text style={styles.button}>Dismiss</Text>
	// </TouchableOpacity>
	onDismissPress() {
		this.props.navigator.dismissInAppNotification();
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		width: Dimensions.get('window').width,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#888'
	},
	text: {
		fontSize: 12,
		textAlign: 'center',
		margin: 2,
		color: 'white',
		paddingTop: 10
	},
	button: {
		textAlign: 'center',
		fontSize: 18,
		marginBottom: 1,
		marginTop:10,
		color: 'white'
	}
});
