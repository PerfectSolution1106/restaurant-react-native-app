import React, { Component } from 'react';
import Home from './Home';
import Menu from './Menu';
import About from './About';
import Contact from './Contact';
import DishDetail from './DishDetails';
import Reservation from './Reservation';
import Favorites from './Favorites';
import Login from './Login';
import { View, Platform, Image, StyleSheet, ScrollView, Text, NetInfo, ToastAndroid } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView} from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders, postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()), 
    fetchLeaders: () => dispatch(fetchLeaders()),
    postComment: () => dispatch(postComment())
})

// Stack Navigator
const MenuNavigator = createStackNavigator({
    // Screens
    Menu: { screen: Menu,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name='menu' size={24}
                    color='white'
                    onPress={() => navigation.toggleDrawer()} // provided method by default
                    />
        }) },
    DishDetail: { screen: DishDetail}
}, {
    // Navigation Options
    initialRouteName: 'Menu',
    navigationOptions: { // common configuration to all the screens
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }

});

const HomeNavigator = createStackNavigator({
    // Screens
    Home: { screen: Home },
    DishDetail: { screen: DishDetail}
}, {
    navigationOptions:  ({ navigation }) => ( {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />
    })

});

const ContactNavigator = createStackNavigator({
    // Screens
    Contact: { screen: Contact},

}, {
    navigationOptions: ({ navigation }) => ( {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />
    })

});

const AboutNavigator = createStackNavigator({
    // Screens
    About: { screen: About}
}, {
    navigationOptions:  ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />
    })

});

const ReservationNavigator = createStackNavigator({
    Reservation: { screen: Reservation},
}, {
    navigationOptions: ({ navigation }) => ( {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />
    })

});

const FavoritesNavigator = createStackNavigator({
    Favorites: { screen: Favorites},
}, {
    navigationOptions: ({ navigation }) => ( {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />
    })

});

const LoginNavigator = createStackNavigator({
    Login: { screen: Login },
}, {
    navigationOptions: ({ navigation }) => ( {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />
    })

});

const CustomDrawerContent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}>
            {/* HEADER */}
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image source={require('./images/logo.png')}
                        style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                <Text style={styles.drawerHeaderText}>Confusion</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

// Drawer Navigator
const MainNavigator = createDrawerNavigator({
    Login: {
        screen: LoginNavigator,
        navigationOptions: {
            title: 'Login',
            drawerLabel: 'Login',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='sign-in'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
            )
        }
    },
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='home'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
            )
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='list'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
            )
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About',
            drawerLabel: 'About',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='address-card'
                    type='font-awesome'
                    size={22}
                    color={tintColor}
                    />
            )
        }
    },
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact',
            drawerLabel: 'Contact',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='home'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
            )
        }
    },
    Reservation: {
        screen: ReservationNavigator,
        navigationOptions: {
            title: 'Reserve a Table',
            drawerLabel: 'Reserve a Table',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='cutlery'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
            )
        }
    },
    Favorites: {
        screen: FavoritesNavigator,
        navigationOptions: {
            title: 'My Favorites',
            drawerLabel: 'My Favorites',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='heart'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
            )
        }
    }

}, {
    initialRouteName: 'Home',
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerContent // call the customized layout 
});

class Main extends Component {

    componentDidMount() {
        /* Fetch all data  from the json-server*/
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
        this.props.postComment();

        NetInfo.getConnectionInfo() // returns a promise
            .then((connectionInfo) => {
                ToastAndroid.show('Connection type: ' + connectionInfo.type + 'Effectiive Type: ' + connectionInfo.effectiveType,
                ToastAndroid.LONG)
            });
            NetInfo.addEventListener('connectionChange', this.handleConnectivity)
    }
    
    componentWillUnmount() {
        NetInfo.removeEventListener('connectionChange', this.handleConnectivity)   
        }

    handleConnectivity = (connectionInfo) => {
        switch(connectionInfo.type) {
            case 'none':
                ToastAndroid.show('You are now offline!', ToastAndroid.LONG)
                break;
            case 'wifi':
                ToastAndroid.show('You are now connnected to WiFi', ToastAndroid.LONG)
                break;
            case 'cellular':
                ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG)
                break;
            case 'unknown':
                ToastAndroid.show('You now have an unknown connection', ToastAndroid.LONG)
                break;
            default:
                break;
        }
    }
    render() {
        return(
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            <MainNavigator />
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);