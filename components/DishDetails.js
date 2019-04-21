import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Modal, Button, StyleSheet, Alert, PanResponder, Share } from 'react-native';
import { Card, Icon, Rating , Input} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseURL } from '../shared/baseURL';
import { postFavorite, postComment} from '../redux/ActionCreators';
import * as  Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});

function RenderDish(props) {
    const dish = props.dish;

    handleViewRef = ref => this.view = ref;

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        // right to left
        if(dx < - 200) { 
            return true;
        } else {
            return false;
        }
    };

    const recognizeComment = ({ moveX, moveY, dx, dy }) => {
        if(dx > 0) {
            return true;
        } else {
            return false;
        }
    }

    const panResponder = PanResponder.create({
        // can be implemented various callbacks
        // when the user's gesture begins on the screen
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            this.view.rubberBand(1000)
                .then(endState => console.log(endState.finised ? 'finished' : 'cancelled'))
        },
        onPanResponderEnd: (e, gestureState) => {
            if(recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add to favorites?',
                    'Are you sure wish to add ' + dish.name + ' to your favorites?',
                    [
                        {
                            text:'Cancel',
                            onPress: () => console.log("Cancelled"),
                            style: 'cancel'
                        },
                        {
                            text:'OK',
                            onPress: () => props.favorite ? console.log('Already favorite') : props.onPress()
                        }
                    ],
                    { cancelable: false}
                )
            } else if(recognizeComment(gestureState)) {
                console.log("Deneme: ", gestureState.dx),
               props.makeComment();
            }
            return true;
        }
    })

    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: message,
            url: url
        }, {
            dialogTitle: 'Share ' + title
        });
    }

    if(dish != null) {
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                ref={this.handleViewRef}
                {...panResponder.panHandlers}>
                <Card
                    featuredTitle={dish.name}
                    image={{ uri: baseURL + dish.image }}
                    >
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    {/* Favorite button */}
                    <View style={styles.icons}>
                    <Icon 
                        raised  /* Looks like a rounded button  */
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o' }
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        />
                    <Icon
                        raised
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color='purple'
                        onPress={() => props.makeComment()}
                        />
                    <Icon 
                        raised
                        reverse
                        name='share'
                        type='font-awesome'
                        color='#512DA8'
                        onPress={() => shareDish(dish.name, dish.description, baseURL + dish.image) }
                        />
                    </View>
                </Card>
            </Animatable.View>
        );
    } else {
        return(<View></View>)
    }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({ item, index}) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'--' + item.author + ', ' + item.date}</Text>
            </View>
        );
    }

    return(
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                    />
            </Card>
        </Animatable.View>
    );  

}

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShownModal: false,
            rating: 1,
            author: '',
            comment: '',
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }

    handleComment(dishId, rating, author, comment) {
        console.log(dishId, rating, author, comment);
        this.props.postComment(dishId, rating, author, comment);
        this.toggleModal();
    }
    toggleModal() {
        this.setState({ isShownModal: !this.state.isShownModal })
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId)
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    
    render() {
        /* console.log(this.state.rating) */
        /* console.log("Author: ", this.state.author)
        console.log("Commnet: ", this.state.comment) */
        // get the paramater from navigator
        const dishId = this.props.navigation.getParam('dishId', '')
        // + will return the string into a number
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                    favorite={this.props.favorites.some(el => el === dishId)} /* Returns true or false */
                    onPress={() => this.markFavorite(dishId)}
                    makeComment={() => this.toggleModal()}
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal
                animationType={'slide'}
                transparent={false}
                visible={this.state.isShownModal}
                onDismiss={() => this.toggleModal() }
                onRequestClose={() => this.toggleModal()}
                >
                <View>
                    <Rating
                        showRating
                        type='star'
                        fractions={1}
                        startingValue={1}
                        imageSize={42}
                        style={{paddingHorizontal: 10}}
                        onFinishRating={(value) => this.setState({ rating: value})}
                        />
                     <Input 
                        placeholder='Author'
                        leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                        onChangeText={(value) => this.setState({author: value})}
                        />
                    <Input 
                        placeholder='Comment'
                        leftIcon={{type: 'font-awesome', name: 'comment-o'}}
                        onChangeText={(value) => this.setState({comment: value})}
                        />
                    <Button
                        title='SUBMIT'
                        color='#512DA8'
                        onPress={() => this.handleComment(dishId, this.state.rating, this.state.author, this.state.comment)}
                        accessibilityLabel='Submit Comment'
                        />
                    <Button
                        title='CANCEL'
                        color='#2b2f32'
                        onPress={() => this.toggleModal()}
                        accessibilityLabel='Cancel'
                        />

                </View>
               
            </Modal>
            </ScrollView>
            )
    }

}

const styles = StyleSheet.create({
    icons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);