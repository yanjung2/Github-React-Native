import React, { Component } from 'react';
import { FlatList, TouchableWithoutFeedback, View, StyleSheet, Linking, Text, AsyncStorage } from 'react-native';
import { Card } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SearchBar } from 'react-native-elements';

const axios = require('axios');

export default class Repositories extends Component {
    // constructor
    constructor(props){
        super(props);
        this.fullData = []; // fullData saves all data, state.data saves the filtered data.
        this.state = {
            mastername: '',
            password: '',
            loading: false,
            data: [],
            search: '',
        }
    }
    updateSearch = text => { // Make comparison by using toLowerCase, and filter/update data
        this.setState({search: text});
        const newData = this.fullData.filter(item => {      
            const itemData = `${item.repoName.toLowerCase()}`;
            const textData = text.toLowerCase();
            return itemData.includes(textData);;    
        });
        this.setState({ data: newData }); 
    };
    renderSearchBar = () => { // search bar updates on change
        return (
            <SearchBar
                lightTheme        
                round
                placeholder="Search" 
                containerStyle={{backgroundColor: 'white'}}
                inputContainerStyle={{width: '90%', height: 30, backgroundColor: '#e0e0e0', marginLeft: '5%'}}
                onChangeText={text => this.updateSearch(text)} 
                value={this.state.search}
            />
        )
    }
    render() {
        if (!this.state.loading) {
            return ( // use FlatList along with Card element to produce layout 
                <FlatList 
                    data={this.state.data}
                    renderItem={({item}) => (
                        <TouchableWithoutFeedback onPress={() => { 
                            Linking.openURL(item.link)
                        }}>
                            <Card title={item.repoName}>
                                <View style={{flexDirection: 'row',}}> 
                                    <Ionicons 
                                    name='ios-eye'
                                    size={24} 
                                    style={{
                                        marginLeft: '83%'
                                    }}
                                    onPress={() => {
                                        this.props.navigation.push('visualization', {
                                            user: item.username,
                                            repo: item.repoName,
                                        })
                                    }}/>
                                    <Ionicons 
                                    name='ios-star-outline' 
                                    size={24} 
                                    style={{
                                        marginLeft: '5%'
                                    }}
                                    onPress={() => { // Check whether the repo is starred
                                        username = this.state.mastername;
                                        password = this.state.password;
                                        axios({
                                            method: 'get',
                                            url: 'http://api.github.com/user/starred/'+item.username+'/'+item.repoName,
                                            auth: {
                                                username: username,
                                                password: password
                                            }
                                        })
                                        .then((res) => { // already starred, will unstar it.
                                            console.log(res.status);
                                            axios({
                                                method: 'delete',
                                                url: 'http://api.github.com/user/starred/'+item.username+'/'+item.repoName,
                                                auth: {
                                                    username: username,
                                                    password: password
                                                }
                                            })
                                            .then(() => {                                     
                                                alert('Unstarring Successful!');
                                            })
                                            .catch((err) => {
                                                console.log(err)
                                                alert('Unstarring Failed!')
                                            })
                                        })
                                        .catch((err) => { // not starred, will star the repo
                                            console.log(err.status);
                                            axios({
                                                method: 'put',
                                                url: 'http://api.github.com/user/starred/'+item.username+'/'+item.repoName,
                                                auth: {
                                                    username: username,
                                                    password: password
                                                }
                                            })
                                            .then(() => {
                                                alert('Starring Successful!');
                                            })
                                            .catch(() => {                                       
                                                alert('Starring Failed!')
                                            })
                                        })           
                                    }}/>
                                    
                                </View>
                                <Text style={styles.author}>Owner: {item.username}</Text>
                                <Text style={styles.card}>{item.description}</Text>
                            </Card>
                        </TouchableWithoutFeedback>
                    )}
                    keyExtractor = {item => item.repoName+item.username}
                    ListHeaderComponent={this.renderSearchBar}
                />
            );
        } else {
            return (
                <FlatList 
                keyExtractor = {item => item.username}
                ItemSeparatorComponent={this.renderSeperator}
                ListHeaderComponent={this.renderSearchBar}/>
            );
        }
    }
    async getData(){ // use axios for Github API
        this.setState({loading: true});
        username = await AsyncStorage.getItem('@MySuperStore:current'); 
        mastername = await AsyncStorage.getItem('@MySuperStore:username');
        password = await AsyncStorage.getItem('@MySuperStore:password');
        axios.get('http://api.github.com/users/'+username+'/repos')
        .then((res) => {
            let tempData = res.data;
            let data = [];
            for (let i = 0; i < tempData.length; i++) { // push information of each repo to data
                data.push({repoName: tempData[i]['name'], username: tempData[i]['owner']['login'], 
                description: tempData[i]['description'], link: tempData[i]['html_url']});
            }
            this.fullData = data;
            this.setState({
                mastername: mastername,
                password: password,
                data: data,
                loading: false,
            })
            if (username == mastername) {
                AsyncStorage.setItem('@MySuperStore:repositories', JSON.stringify(data));
                
            } 
        })
        // Uncomment the following lines to test Storage
        
        // repo = await AsyncStorage.getItem('@MySuperStore:repositories');
        // console.log(repo);
    }
    componentDidMount(){
        this.getData();
    }
}

const styles = StyleSheet.create({ // collection of styles
    card: {
        marginBottom: 10,
        fontSize: 14,
    },
    author: {
        marginBottom: 10,
        fontSize: 14,
        fontStyle: 'italic',
        color: 'dimgray',
    }
});