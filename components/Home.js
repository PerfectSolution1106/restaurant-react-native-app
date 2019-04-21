import React, { Component } from 'react';
import {View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseURL } from '../shared/baseURL';
import { Loading } from './Loading';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}


function RenderItem(props) {
    const item = props.item;

    if(props.isLoading) {
        return(
            <Loading />
        )
    } else if (props.errMess) {
        return(
            <View>
                <Text>{props.errMess}</Text>
            </View>
        )
    } else {

    if(item) {
        return (
            <Card
                featuredTitle={item.name}
                featuredSubtitle={item.designation}
                image={{ uri: baseURL + item.image }}
                >
                <Text style={{margin: 10}}>
                    {item.description}
                </Text>
            </Card>
        );
    } else {
        return(<View></View>)
    }
}
}

class Home extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Home'
    };

  render() {
        return(
            <View stlye={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                <ScrollView>
                    <RenderItem 
                        item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                        isLoading={this.props.dishes.isLoading}
                        errMess={this.props.dishes.errMess}
                        />
                    <RenderItem 
                        item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                        isLoading={this.props.promotions.isLoading}
                        errMess={this.props.promotions.errMess}
                        />
                    <RenderItem 
                        item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                        isLoading={this.props.leaders.isLoading}
                        errMess={this.props.leaders.errMess}
                        />
                </ScrollView>
            </View>
        );
    }
}

export default connect(mapStateToProps)(Home);