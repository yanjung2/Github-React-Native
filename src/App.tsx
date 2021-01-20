import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import SwitchNavigator from './navigator/Navigator';

export default class App extends Component {
    render() {
        return (
            <SwitchNavigator/> // call TabNavigator to launch all components
        );
    }
}
// Simply Setup Background Color
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
});