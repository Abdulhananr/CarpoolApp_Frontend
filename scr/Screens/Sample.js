import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    KeyboardAvoidingView,
    FlatList,
    Dimensions,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Icon } from 'react-native-elements';
function Sample() {
    const [IPaddress, setIPaddress] = useState("");
    const [Username, setUsername] = useState("");
    const [Profilepic, setPic] = useState("");
    const [Username1, setUsername1] = useState("");
    const [Profilepic1, setPic1] = useState("");
    const [chatUser] = useState({
        name: 'Abdul Hanan',
        user:2
    });

    const [currentUser] = useState({
        name: 'Testing',
        user:4
    });
    let t = getTime(new Date());


    const [inputMessage, setInputMessage] = useState('');

    function getTime(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    const [messages, setMessages] = useState([
        { sender: 'Customer Support', message: 'Hello Sir how can i help You!', time: t },
    ]
    );

    function sendMessage() {

        if (inputMessage === '') {
            return setInputMessage('');
        }
        let t = getTime(new Date());
        let reply = ''
        fetch('http://' + IPaddress + '/api/ChatCheck/' + inputMessage, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setMessages([
                    ...messages,
                    {
                        sender: currentUser.name,
                        message: inputMessage,
                        time: t,
                    },
                    

                    {
                        sender: 'Customer Support',
                        message: responseJson['Replay'],
                        time: t,
                    }
                    

                ]);
            })
            
            .catch((error) => {
                console.error(error);
            });



        setInputMessage('');
    }

    useEffect(async () => {
        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)
        setIPaddress(ip_add['ip'])
    }, []);
    return (

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

            <View style={styles.container}>
                <FlatList
                    style={{ backgroundColor: '#f2f2ff' }}
                    inverted={true}
                    data={JSON.parse(JSON.stringify(messages)).reverse()}
                    renderItem={({ item }) => (

                        <TouchableWithoutFeedback>


                            <View style={{ marginTop: 6 }}>

                                
                                


                                <View
                                    style={{
                                        maxWidth: Dimensions.get('screen').width * 0.8,

                                        backgroundColor: item.sender === currentUser.name ? '#3fa1f9' : '#E8E8E8',
                                        alignSelf:
                                            item.sender === currentUser.name
                                                ? 'flex-end'
                                                : 'flex-start',
                                        marginHorizontal: 10,
                                        padding: 10,
                                        borderRadius: 8,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 2,
                                        borderBottomLeftRadius:
                                            item.sender === currentUser.name ? 8 : 0,
                                        borderBottomRightRadius:
                                            item.sender === currentUser.name ? 0 : 8,
                                        
                                    }}
                                >
                                    <Text style={{color: '#424447',fontSize:10}} > {item.sender === currentUser.name? chatUser.name :item.sender}</Text>

                                    <Text
                                        style={{
                                            color: 'black',
                                            fontSize: 16,
                                        }}
                                    >
                                        {item.message}
                                    </Text>
                                    <Text
                                        style={{
                                           
                                            color: item.sender === currentUser.name ? '#fff' : 'black',
                                            fontSize: 14,
                                            alignSelf: 'flex-end',
                                        }}
                                    >
                                        {item.time}
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                />

                <View style={{ paddingVertical: 10 }}>
                    <View style={styles.messageInputView}>
                        <TextInput
                            defaultValue={inputMessage}
                            style={styles.messageInput}
                            placeholder='Message'
                            onChangeText={(text) => setInputMessage(text)}
                            onSubmitEditing={() => {
                                sendMessage();
                            }}
                        />
                        <TouchableOpacity
                            style={styles.messageSendView}
                            onPress={() => {
                                sendMessage();
                            }}
                        >
                            <Icon name='send' type='material' />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
    headerLeft: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    userProfileImage: { height: '100%', aspectRatio: 1, borderRadius: 100 },
    container: {
        flex: 1,
        backgroundColor: '#f2f2ff',
    },
    messageInputView: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 14,
        backgroundColor: '#fff',
        borderRadius: 4,
    },
    messageInput: {
        height: 40,
        flex: 1,
        paddingHorizontal: 10,
    },


    messageOutput: {
        height: 40,
        flex: 1,
        paddingHorizontal: 10,
        borderBottomRightRadius: (0, 8)
    },
    messageSendView: {
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
});
export default Sample;