import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import * as  Animatable from 'react-native-animatable';
import { MailComposer } from 'expo';

class Contact extends Component {

    sendMail(){
        MailComposer.composeAsync({
            recipients: ['gunayanilemre@gmail.com'],
            subject: 'Enquiry',
            body: 'Hello, '
        })
    }

    render(){
    return(
        <View>
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card
                    title='Contact Information'
                    >
                    <Text style={{margin: 10 }}>
                    Our Address
                    121, Clear Water Bay Road
                    Clear Water Bay, Kowloon
                    HONG KONG
                    Tel: +852 1234 5678
                    Fax: +852 8765 4321
                    Email:confusion@food.net
                    </Text>
                    <Button 
                        title='Send Email'
                        buttonStyle={{backgroundColor: '#512DA8'}}
                        icon={<Icon name='envelope-o' type='font-awesome' color='#fff' />}
                        onPress={this.sendMail}
                        />
                </Card>
        </Animatable.View>
        </View>
    )
}
}

export default Contact