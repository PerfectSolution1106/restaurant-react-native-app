import React, { Component } from 'react';
import { View, FlatList, Text, Alert} from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseURL } from '../shared/baseURL';
import { Loading } from './Loading';
import Swipeout from 'react-native-swipeout';
import { deleteFavorite } from '../redux/ActionCreators';
import * as  Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
});

class Favorites extends Component {
    static navigationOptions = {
        title: 'My Favorites'
    }

    render() {
        const { navigate } = this.props.navigation;

        const renderMenuItem = ({ item, index}) => {
            // Swipe out button options
            const rightButton = [
                {
                    text: 'Delete',
                    type: 'delete',
                    /* directly deleting: onPress: () => this.props.deleteFavorite(item.id) */
                    onPress: () => {
                        Alert.alert(
                            'Delete Favorite',
                            'Are you sure wish to delete the favorite dish ' + item.name + '?',
                            // Alert Buttons
                            [
                                { 
                                    text: 'Cancel', 
                                    onPress: () => console.log("Not deleted.."),
                                    style: 'cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () => this.props.deleteFavorite(item.id)
                                }
                            ],
                            { cancelable: false } // Must press OK or Cancel
                        )
                    }
                }
            ]
            return(
                <Swipeout right={rightButton} autoClose={true}>
                <Animatable.View animation="fadeInRightBig" duration={2000}>
                    <ListItem
                        key={index}
                        title={item.name}
                        subtitle={item.description}
                        hideChevron={true}
                        onPress={() => navigate('Dishdetail', {dishId: item.id })}
                        leftAvatar={{ source: {uri: baseURL + item.image}}}
                        />
                </Animatable.View>
                </Swipeout>
            );
        }

        if (this.props.dishes.isLoading) {
            return(
                <Loading />
            );
        } else if(this.props.dishes.errMess) {
            return(
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            )
        } else {
            return(
                <FlatList
                    data={this.props.dishes.dishes.filter((dish) => this.props.favorites.some(el => el === dish.id))}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                    />
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);