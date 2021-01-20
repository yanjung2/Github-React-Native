import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { PieChart } from 'react-native-svg-charts'
import axios from 'axios';

// Generate random color for each slice of pie chart
const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

export default class Visualization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,    
        }
    }
    render() { // visualize using pie chart
        if (!this.state.loading) {
            return (              
                <PieChart
                    style={{ height: 300 }}
                    outerRadius={'80%'}
                    innerRadius={30}
                    data={this.state.data}
                />       
            )
        } else {
            return (
                <View/>
            )
        }
    }
    async getData(){ // use axios for Github API
        this.setState({loading: true});
        username = this.props.navigation.getParam('user', 'yanjung2');
        repoName = this.props.navigation.getParam('repo', 'code');
        axios({
            method: 'get',
            url: 'https://api.github.com/repos/'+username+'/'+repoName+'/stats/contributors',
        })
        .then((res) => {
            let tempData = res.data;
            let data = [];
            for (let i = 0; i < tempData.length; i++) { // get count of commits of each user
                data.push({ key: tempData[i]['author']['login'], value: tempData[i]['total'], 
                svg: { fill: randomColor() }})
            }
            this.setState({
                data: data,
                loading: false,
            })
        })
        .catch((err) => {
            alert('Failed!');
            this.setState({loading: false});
        })
    }
    componentDidMount(){
        this.getData();
    }
}