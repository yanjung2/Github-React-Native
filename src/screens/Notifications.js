import React, { Component } from 'react';
import { FlatList, TouchableWithoutFeedback, AsyncStorage, View } from 'react-native';
import { ListItem } from 'react-native-elements';

const axios = require('axios');

export default class Notifications extends Component {
    constructor(props){ // constructor
        super(props);
        this.state = {
            data: [],
        }
    }
    renderSeperator = () => { // Seperator between items in flatlist 
        return(
            <View
                style={{
                    height:1,
                    backgroundColor: '#CED0CE',
                }}
            />
        );
    };

    render() {
        return ( // use FlatList to produce layout 
            <FlatList 
                data={this.state.data}
                renderItem={({item}) => (                
                    <ListItem 
                        title={item.reason}
                        subtitle={item.detail}          
                    />                
                )}
                keyExtractor = {item => item.id}
                ItemSeparatorComponent={this.renderSeperator}
            />   
        );
    }
    async getData(){ // use axios for Github API
        username = await AsyncStorage.getItem('@MySuperStore:username');
        password = await AsyncStorage.getItem('@MySuperStore:password');
        axios({
            method: 'get',
            url: 'https://api.github.com/notifications',
            auth: {
                username: username,
                password: password
            }
        })
        .then((res) => {
            let tempData = res.data;
            let data = [];
            for (let i = 0; i < tempData.length; i++) { // push reason and subject of notification to data
                data.push({id: tempData[i]['id'], reason: tempData[i]['reason'], 
                detail: tempData[i]['subject']['title']});
            }
            this.setState({
                data: data,
            })
        })
        .catch((err) => {
            alert('Failed!')
        })
    }
    componentDidMount(){
        this.getData();
    }
}