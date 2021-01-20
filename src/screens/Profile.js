import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableWithoutFeedback, AsyncStorage, Button } from 'react-native';

const axios = require('axios');

export default class Profile extends Component {
    // default constructor
    constructor(props) {
        super(props);
        this.state = {
            mastername: null,
            password: null,
            name: null,
            username: null,
            avatar: 'https://avatars2.githubusercontent.com/u/48237435?v=4', // Avoid Warnings, set a default value
            bio: null,
            date: null,
            website: null,
            email: null,
            followers: 0,
            following: 0,
            date: null,
            repos: 0,
        }
    }
    // Outer view for background, then use ScrollView to enable scrolling.
    // After putting information, use bottom bars to show repo/following/follower information
    // TouchableWithoutFeedback has the same function as a button
    render() { 
        return (
            <View style={styles.container}> 
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <Button 
                title='Follow!' 
                async onPress={() => {
                    username = this.state.mastername;
                    password = this.state.password;
                    current = this.state.username;
                    axios({
                        method: 'put',
                        url: 'http://api.github.com/user/following/' + current,
                        auth: {
                            username: username,
                            password: password
                        }
                    })
                    .then(() => {
                        alert('Follow Successful!')
                    })
                    .catch((err) => {
                        alert('Follow Failed!')
                    })               
                }}/>
                <Button 
                title='Unfollow!' 
                async onPress={() => {
                    username = this.state.mastername;
                    password = this.state.password;
                    current = this.state.username;
                    axios({
                        method: 'delete',
                        url: 'http://api.github.com/user/following/' + current,
                        auth: {
                            username: username,
                            password: password
                        }
                    })
                    .then(() => {
                        alert('Unfollow Successful!')
                    })
                    .catch((err) => {
                        alert('Unfollow Failed!')
                    })               
                }}/>
                    <View style={styles.header}> 
                        <View style={styles.border}> 
                            <Image style={styles.avatar} source={{uri: this.state.avatar}}/>           
                        </View>
                        <Text style={styles.name}>{this.state.name}</Text> 
                        <Text style={styles.email}>{this.state.username}</Text>
                        <Text style={styles.email}>{this.state.date}</Text>
                        <Text style={styles.bio}>{this.state.bio}</Text> 
                        <Text style={styles.website}>{this.state.website}</Text>
                        <Text style={styles.email}>{this.state.email}</Text>        
                    </View> 
                </ScrollView> 
                <View style={styles.bar}> 
                    <TouchableWithoutFeedback onPress={() => { 
                        AsyncStorage.setItem('@MySuperStore:current', this.state.username);
                        this.props.navigation.push('repositories')
                    }}>
                        <View style={styles.item}>
                            <Text style={styles.num}>{this.state.repos}</Text>  
                            <Text style={styles.txt}>Repos</Text>              
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.seperator}/>
                    <TouchableWithoutFeedback onPress={() => { 
                        AsyncStorage.setItem('@MySuperStore:current', this.state.username);
                        this.props.navigation.push('following')
                    }}>
                        <View style={styles.item} >
                            <Text style={styles.num}>{this.state.following}</Text>  
                            <Text style={styles.txt}>Following</Text>              
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.seperator}/>
                    <TouchableWithoutFeedback onPress={() => { 
                        AsyncStorage.setItem('@MySuperStore:current', this.state.username);
                        this.props.navigation.push('followers')
                    }}>
                        <View style={styles.item}>
                            <Text style={styles.num}>{this.state.followers}</Text>  
                            <Text style={styles.txt}>Followers</Text>              
                        </View>  
                    </TouchableWithoutFeedback>     
                </View>
            </View>
        );
    }
    async getData() { // get data with axios API before loading
        username = await AsyncStorage.getItem('@MySuperStore:current');
        mastername = await AsyncStorage.getItem('@MySuperStore:username');
        password = await AsyncStorage.getItem('@MySuperStore:password');
        axios.get('http://api.github.com/users/' + username)
        .then((res) => {
            let name= res.data.name;
            let username = res.data.login;
            let avatar = res.data.avatar_url;
            let bio = res.data.bio;
            let website = res.data.blog;
            let email = res.data.email;
            let followers = res.data.followers;
            let following = res.data.following;
            let repos = res.data.public_repos;
            let [days, time] = res.data.created_at.split('T');
    
            this.setState({ // save data to state
                mastername: mastername,
                password: password,
                username: username,
                avatar: avatar,
                bio: bio,
                name: name,
                date: days,
                website: website,
                email: email,
                followers: followers,
                following: following,
                repos: repos
            })
            if (username == mastername) {
                data = {username: username, avatar: avatar, bio: bio, name: name, date: days, website: website,
                    email: email, followers: followers, following: following, repos: repos}
                AsyncStorage.setItem('@MySuperStore:profile', JSON.stringify(data));
                
            } 
        })
        // Uncomment the following lines to test Storage
        
        // username = await AsyncStorage.getItem('@MySuperStore:username');
        // console.log(username);
        // profile = await AsyncStorage.getItem('@MySuperStore:profile');
        // console.log(profile);
    }
    componentDidMount() { 
        this.getData();
    }
}

const styles = StyleSheet.create({ // collection of styles
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    border: {
        width: 100,
        height: 100,
        borderColor: 'lightblue',
        borderWidth: 5,
    },
    avatar: {
        flex: 1,
        alignSelf: 'stretch',
    },
    name: {
        marginTop: 1,
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    email: {
        marginTop: 1,
        fontSize: 16,
        color: 'black',
        fontStyle: 'italic',
    },
    website: {
        marginTop: 15,
        fontSize: 16,
        color: 'black',
        fontStyle: 'italic',
    } ,
    bio: {
        marginTop: 15,
        fontSize: 16,
        color: 'black',
        textAlign: 'auto',
    },
    bar: {
        borderTopColor: 'black',
        borderTopWidth: 1,
        flexDirection: 'row',
        backgroundColor: 'snow',
    },
    item: {
        flex: 1,
        padding: 30,
        alignItems: 'center',
    },
    seperator: {
        borderRightWidth: 1,
    },
    num: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    txt: {
        fontSize: 14,
        color: 'black',
        fontStyle: 'italic',
    }
});
