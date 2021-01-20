import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from '../screens/Profile';
import Repositories from '../screens/Repositories';
import Followers from '../screens/Followers';
import Following from '../screens/Following';
import Login from '../screens/Login'
import Notifications from '../screens/Notifications'
import Visualization from '../screens/Visualization';

const repoStack = createStackNavigator({
    repositories: {
        screen: Repositories,
        navigationOptions: ({ navigation }) => {
            return{
                headerTitle: 'Repositories',
                headerStyle: {
                    backgroundColor: '#F6F6F6'
                },
                headerRight: (
                    <Ionicons 
                    name='ios-notifications' 
                    size={24} 
                    style={{
                        paddingRight: 15
                    }}
                    onPress={() => {
                        navigation.push('notifications')
                    }}/>
                )
            };
        }
    },
    notifications: { // add notification and visualization part to original navigator.
        screen: Notifications,
        navigationOptions: ({ navigation }) => {
            return{
                headerTitle: 'Notifications',
                headerStyle: {
                    backgroundColor: '#F6F6F6'
                },
            };
        }
    },
    visualization: {
        screen: Visualization,
        navigationOptions: ({ navigation }) => {
            return{
                headerTitle: 'Distribution of Commits',
                headerStyle: {
                    backgroundColor: '#F6F6F6'
                },
            };
        }
    },
    
});

// Use stack navigator to handle moving to other user's pages
const followingStack = createStackNavigator({
    following: {
        screen: Following,
        navigationOptions: ({ navigation }) => {
            return{
                headerTitle: 'Following',
                headerStyle: {
                    backgroundColor: '#F6F6F6'
                },
            };
        },
    },
    profile: {
        screen: Profile,
        navigationOptions: ({ navigation }) => {
            return{
                headerTitle: 'Profile',
                headerStyle: {
                    backgroundColor: '#F6F6F6'
                },
            };
        }
    },
    repositories: {
        screen: Repositories,
        navigationOptions: ({ navigation }) => {
            return{
                headerTitle: 'Repositories',
                headerStyle: {
                    backgroundColor: '#F6F6F6'
                },
            };
        }
    },
    followers: {
        screen: Followers,
        navigationOptions: ({ navigation }) => {
            return{
                headerTitle: 'Followers',
                headerStyle: {
                    backgroundColor: '#F6F6F6'
                },
            };
        }
    },
    visualization: {
        screen: Visualization,
        navigationOptions: ({ navigation }) => {
            return{
                headerTitle: 'Distribution of Commits',
                headerStyle: {
                    backgroundColor: '#F6F6F6'
                },
            };
        }
    },
    
});

const followerStack = createStackNavigator({ // exactly the same as above, except for order of screens
    followers: {
        screen: Followers,
        navigationOptions: ({ navigation }) => {
            return{
                headerTitle: 'Followers',
                headerStyle: {
                    backgroundColor: '#F6F6F6'
                },
            };
        }
    },
    profile: {
        screen: Profile,
        navigationOptions: ({ navigation }) => {
            return{
                headerTitle: 'Profile',
                headerStyle: {
                    backgroundColor: '#F6F6F6'
                },
            };
        }
    },
    repositories: {
        screen: Repositories,
        navigationOptions: ({ navigation }) => {
            return{
                headerTitle: 'Repositories',
                headerStyle: {
                    backgroundColor: '#F6F6F6'
                },
            };
        }
    },
    following: {
        screen: Following,
        navigationOptions: ({ navigation }) => {
            return{
                headerTitle: 'Following',
                headerStyle: {
                    backgroundColor: '#F6F6F6'
                },
            };
        },
    },
    visualization: {
        screen: Visualization,
        navigationOptions: ({ navigation }) => {
            return{
                headerTitle: 'Distribution of Commits',
                headerStyle: {
                    backgroundColor: '#F6F6F6'
                },
            };
        }
    },
});

const profileStack = createStackNavigator({ // exactly the same as above, except for order of screens
    profile: {
        screen: Profile,
        navigationOptions: ({ navigation }) => {
            return{
                headerTitle: 'Profile',
                headerStyle: {
                    backgroundColor: '#F6F6F6'
                },
            };
        }
    },
    repositories: {
        screen: Repositories,
        navigationOptions: ({ navigation }) => {
            return{
                headerTitle: 'Repositories',
                headerStyle: {
                    backgroundColor: '#F6F6F6'
                },
            };
        }
    },
    followers: {
        screen: Followers,
        navigationOptions: ({ navigation }) => {
            return{
                headerTitle: 'Followers',
                headerStyle: {
                    backgroundColor: '#F6F6F6'
                },
            };
        }
    },
    following: {
        screen: Following,
        navigationOptions: ({ navigation }) => {
            return{
                headerTitle: 'Following',
                headerStyle: {
                    backgroundColor: '#F6F6F6'
                },
            };
        },
    },
    visualization: {
        screen: Visualization,
        navigationOptions: ({ navigation }) => {
            return{
                headerTitle: 'Distribution of Commits',
                headerStyle: {
                    backgroundColor: '#F6F6F6'
                },
            };
        }
    },
});

// Use Tabs to switch between screens
const TabNavigator = createBottomTabNavigator( 
    {
        Repositories: repoStack,
        Following: followingStack,
        Followers: followerStack,
        Profile: profileStack
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName == 'Repositories') { // setup icons for tabs
                    iconName = 'ios-list';
                } else if (routeName == 'Profile') {
                    iconName = 'ios-person';
                } else if (routeName == 'Following') {
                    iconName = 'logo-github';
                } else if (routeName == 'Followers') {
                    iconName = 'ios-people';
                }
                return <IconComponent name={iconName} size={24} color={tintColor} />;
            },
    }),
    tabBarOptions: {
        activeTintColor: 'cornflowerblue',
        inactiveTintColor: 'gray',
        style: {
            backgroundColor: '#F8F8F8',
        }
    },
});

const SwitchNavigator = createSwitchNavigator({ // Switch between Login Screen and App Screen
    Login: {screen: Login},
    Main: {screen: TabNavigator},
})

export default createAppContainer(SwitchNavigator);