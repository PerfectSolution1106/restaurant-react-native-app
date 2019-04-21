import React, { Component } from 'react';
import {View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Icon, CheckBox, Input, Button } from 'react-native-elements';
import { SecureStore, Permissions, ImagePicker, Asset, ImageManipulator } from 'expo';
import { createBottomTabNavigator } from 'react-navigation';
import { baseURL } from '../shared/baseURL';

class LoginTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernname: '',
            password: '',
            remember: false,
        }
    }

    componentDidMount() {
        // get items from SecureStore => returns a promise
        SecureStore.getItemAsync('userinfo') // userinfo is the key
            .then((userdata) => {
                let userinfo = JSON.parse(userdata)
                if (userinfo) {
                    this.setState({ username: userinfo.username, password: userinfo.password, remember: true})
                }
            })
    }

    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name='sign-in'
                type='font-awesome'
                size={24}
                iconStyle={{ color: tintColor }}
                />
        )
    };

    handleLogin() {
        console.log(JSON.stringify(this.state));
        // Save data into the SecureStore
        if(this.state.remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({ username: this.state.username, password: this.state.password })
            )
            .catch((error) => console.log('Could not save user data', error))
        } else {
            SecureStore.deleteItemAsync('userinfo')
                .catch((error) => console.log('Could not delete user data', error))
        }
    }
    render() {
        return(
            <View style={styles.container}>
                <Input
                    placeholder='Username'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput} /* Input styling */
                    />
                <Input
                    placeholder='Password'
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput} /* Input styling */
                    />
                <CheckBox 
                        title='Remeber Me'
                        center
                        checked={this.state.remember}
                        onPress={() => this.setState({remember: !this.state.remember })}
                    />
                <View style={styles.formButton}>
                    <Button 
                        onPress={() => this.handleLogin()}
                        title='Login'
                        icon={<Icon name='sign-in' type='font-awesome' color='#fff' szize={24} />}
                        buttonStyle={{ backgroundColor:'#512A8' }} // background color
                        />
                </View>
                <View style={styles.formButton}>
                    <Button 
                        onPress={() => this.props.navigation.navigate('Register')}
                        title='Register'
                        clear
                        icon={<Icon name='user-plus' type='font-awesome' color='blue' szize={24} />}
                        titleStyle={{ color: 'blue' }}
                        />
                </View>
            </View>
        );
    }

}

class RegisterTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernname: '',
            password: '',
            fistname: '',
            lastname: '',
            email: '',
            imageURL: baseURL + 'images/logo.png',
            remember: false,
        }
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA)
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)

        if(cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });

            if (!capturedImage.cancelled) {
                this.processImage(capturedImage.uri)
            }
        }
    };

    getImageFromGallery = async () => {
        const cameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(cameraRoll.status === 'granted') {
            let libImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });

            if(!libImage.cancelled) {
                this.processImage(libImage.uri)
            }
        }    
    };

    handleRegister() {
        console.log(JSON.stringify(this.state));
        if(this.state.remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({ username: this.state.username, password: this.state.password })
            )
            .catch((error) => console.log('Could not save user data', error))
        }
    }

    processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulate(
            imageUri,
            [
                {
                    resize: { width: 400 }
                }
            ],
            {
                format: 'png'
            }
        );

        this.setState({ imageURL: processedImage.uri })
    }

    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name='user-plus'
                type='font-awesome'
                size={24}
                iconStyle={{ color: tintColor }}
                />
        )
    };

    render() {
        return(
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{ uri:  this.state.imageURL }}
                        loadingIndicatorSource={require('./images/logo.png')}
                        style={styles.image}
                        />
                    <Button 
                        title='Camera'
                        onPress={this.getImageFromCamera}
                        />
                     <Button 
                        title='Gallery'
                        onPress={this.getImageFromGallery}
                        />
                </View>
                <Input
                    placeholder='Username'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput} /* Input styling */
                    />
                <Input
                    placeholder='Password'
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput} /* Input styling */
                    />
                <Input
                    placeholder='Firstname'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(firstname) => this.setState({fistname})}
                    value={this.state.firstname}
                    containerStyle={styles.formInput} /* Input styling */
                    />
                <Input
                    placeholder='Last Name'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(lastname) => this.setState({lastname})}
                    value={this.state.lastname}
                    containerStyle={styles.formInput} /* Input styling */
                    />
                <Input
                    placeholder='Email'
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    containerStyle={styles.formInput} /* Input styling */
                    />     
                <CheckBox 
                        title='Remeber Me'
                        center
                        checked={this.state.remember}
                        onPress={() => this.setState({remember: !this.state.remember })}
                    />
                <View style={styles.formButton}>
                    <Button 
                        onPress={() => this.handleRegister()}
                        title='Register'
                        icon={<Icon name='user-plus' type='font-awesome' color='#fff' szize={24} />}
                        buttonStyle={{ backgrounColor:'#512A8' }} // background color
                        />
                </View>
            </View>
            </ScrollView>
        );
    }

}

const Login = createBottomTabNavigator({
    Login: LoginTab,
    Register: RegisterTab
}, {
    tabBarOptions: {
        activeBackgroundColor: '#9575CD',
        inactiveBackgroundColor: '#D1C4E9',
        activeTintColor: 'white',
        inactiveTintColor: 'gray'

    }
})

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    image: {
        margin: 10,
        width: 80,
        height: 60
    },
    formInput: {
        margin: 20
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }    
})
export default Login;