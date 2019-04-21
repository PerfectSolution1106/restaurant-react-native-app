import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import DatePicker  from 'react-native-datepicker';
import * as  Animatable from 'react-native-animatable';
import { Permissions, Notifications, Calendar } from 'expo';

class Reservation extends Component {

    constructor(props){
        super(props);
        this.state={
            guests: 1,
            smoking: false,
            date: '',
           /*  showModal: false, */
        }
    }

    static navigationOptions = {
        title: 'Reverse Table'
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        //this.toggleModal();
        Alert.alert(
            'Your Reservation',
            `Number of Guests: ` + this.state.guests + 
            `\nSmoking: ` + this.state.smoking +
            `\nDate and Time:` + this.state.date,
            [
                {
                    text:'Cancel',
                    onPress: () => this.resetForm(),
                    style: 'cancel'
                },
                {
                    text:'OK',
                    onPress: () => {
                        this.addReservationToCalendar(this.state.date);
                        this.resetForm()
                    }
                }
            ],
            { cancelable: false}
        )
    }

   async addReservationToCalendar(date){
        await this.obtainCalendarPermission();
        Calendar.createEventAsync(Calendar.DEFAULT, {
            title: "Reservation",
            startDate: new Date(Date.parse(date)),
            endDate: new Date(Date.parse(date) + 2 * 60 * 60 * 1000),
            timeZone: "GMT-7",
            location: "Something"
        })
        .then(
            this.presentLocalNotification(date)
        )
        .catch((err) => {
            console.log(err)
        })
    }

    async obtainCalendarPermission() {
        let permission = await Permissions.getAsync(Permissions.CALENDAR)
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.CALENDAR)
            if(permission.status !== 'granted') {
                Alert.alert('Permission was rejected!')
            }
        }
        return permission;
    }
    
    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: ''
        })
    }

    async obtainNotificationPermisson() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permisson.USER_FACING_NOTIFICATIONS)
            if(permisson.status !== 'granted') {
                Alert.alert('Permission was rejected!')
            }
        }
        return permission;
    }

    
    async presentLocalNotification(date) {
        // first, must get permission
        await this.obtainNotificationPermisson();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for ' + date + 'requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color:'#512DA8'
            }
        })

    }

    render() {
        return(
          <ScrollView>
            <Animatable.View animation="zoomIn" duration={2000}>
             <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Guests</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={this.state.guests}
                    onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}
                    >
                    <Picker.Item label='1' value='1' />
                    <Picker.Item label='2' value='2' />
                    <Picker.Item label='3' value='3' />
                    <Picker.Item label='4' value='4' />
                    <Picker.Item label='5' value='5' />
                    <Picker.Item label='6' value='6' />
                </Picker>
            </View> 
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Smoking</Text>
                <Switch
                    style={styles.formItem}
                    value={this.state.smoking}
                    trackColor='#512DA8' // background color
                    onValueChange={(value) => this.setState({smoking: value})} // returns boolean
                    >
                </Switch>
                </View> 
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date and Time</Text>
                <DatePicker
                    style={{ flex: 2, marginRight: 20 }}
                    date={this.state.date}
                    format=''
                    mode='datetime'
                    placeholder='Select date and time'
                    minDate='2019-01-01'
                    confirmBtnText='Confirm'
                    cancelBtnText='Cancel'
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput : {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={(date) => {this.setState({ date: date })}}
                    />
            </View>
            <View style={styles.formRow}>
                <Button 
                    title='Reserve'
                    color='#512DA8'
                    onPress= {() => this.handleReservation()}
                    accessibilityLabel='Confirm Reservation'
                />
            </View>
            </Animatable.View>
          </ScrollView>
                
        )
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 10
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
})

export default Reservation;