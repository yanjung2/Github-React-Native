import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, AsyncStorage } from 'react-native';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }
    render() { // use AsyncStorage to store global variables
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor = 'lightgrey'
                        style = {styles.input}
                        value={this.state.userText}
                        onChangeText={(text) => this.setState({username: text})}
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor = 'lightgrey'
                        secureTextEntry
                        style = {styles.input}
                        value={this.state.password}
                        onChangeText={(text) => this.setState({password: text})}
                    />
                    <Button
                        title='Login' 
                        onPress={() => {
                            axios.get('http://api.github.com/user',{
                                auth: {
                                    username: this.state.username,
                                    password: this.state.password
                                }
                            })
                            .then(() => {
                                AsyncStorage.setItem('@MySuperStore:username', this.state.username);
                                AsyncStorage.setItem('@MySuperStore:password', this.state.password);
                                AsyncStorage.setItem('@MySuperStore:current', this.state.username); // Store global variable
                                this.props.navigation.navigate('Main') 
                            })
                            .catch((err) => {                               
                                alert("Invalid username/password!")
                            })               
                        }}/>
                </View>
                
            </View>
        );
    }
}

// Setup Background Color and center elements
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    header: {
        flex: 1,
        // backgroundColor: '#F8F8F8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        backgroundColor:'white',
        height: 40, 
        width: 150,
        borderColor: 'lightgray', 
        borderWidth: 1 
    }
});