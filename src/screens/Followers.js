import React, { Component } from 'react';
import { FlatList, TouchableWithoutFeedback, AsyncStorage, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { SearchBar } from 'react-native-elements';

const axios = require('axios');

export default class Followers extends Component {
    constructor(props){ // constructor
        super(props);
        this.fullData = []; // fullData saves all data, state.data saves the filtered data.
        this.state = {
            loading: false,
            data: [],
            search: '',
        }
    }
    updateSearch = text => { // Make comparison by using toLowerCase, and filter/update data
        this.setState({search: text});
        const newData = this.fullData.filter(item => {      
            const itemData = `${item.username.toLowerCase()}`;
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
    renderSeperator = () => { // Seperator between items in flatlist 
        return(
            <View
                style={{
                    height:1,
                    width: '86%',
                    marginLeft: '14%',
                    backgroundColor: '#CED0CE',
                }}
            />
        );
    };
    render() {
        if (!this.state.loading) { 
            return ( // use FlatList to produce layout 
                <FlatList 
                    data={this.state.data}
                    renderItem={({item}) => (
                        <TouchableWithoutFeedback onPress={() => { 
                            AsyncStorage.setItem('@MySuperStore:current', item.username);
                            this.props.navigation.push('profile')
                        }}>
                            <ListItem 
                                roundAvatar
                                title={item.username}
                                leftAvatar={{ source: { uri: item.avatar } }}
                            />               
                        </TouchableWithoutFeedback>
                    )}
                    keyExtractor = {item => item.username}
                    ItemSeparatorComponent={this.renderSeperator}
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
        axios.get('http://api.github.com/users/'+username+'/followers')
        .then((res) => {
            let tempData = res.data;
            let data = [];
            for (let i = 0; i < tempData.length; i++) { // push information of each follower to data
                data.push({username: tempData[i]['login'], 
                avatar: tempData[i]['avatar_url']});
            }
            this.fullData = data,
            this.setState({
                loading: false,
                data: data,         
            })
            if (username == mastername) {
                AsyncStorage.setItem('@MySuperStore:followers', JSON.stringify(data));
                
            } 
        })
        // Uncomment the following lines to test Storage

        // followers = await AsyncStorage.getItem('@MySuperStore:followers');
        // console.log(followers);
    }
    componentDidMount(){
        this.getData();
    }
}