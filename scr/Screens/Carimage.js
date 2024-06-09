import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, TextInput, TouchableOpacity, Alert, LogBox, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

function Carimage() {
    const [name, setName] = useState('');
    const [Detailsofuser, setDetailsofuser] = useState('');
    const navigation = useNavigation();
    const Getdetails = async () => {
        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)
        const jsonValue = await AsyncStorage.getItem('@Data_Key')
        const val = JSON.parse(jsonValue)

        fetch('http://' + ip_add['ip'] + '/api/Customer/' + val['id'], {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setDetailsofuser(responseJson)
                console.log(responseJson)



            })
            .catch((error) => {
                console.error(error);
            });


    }
    const Change =async(num)=>{
        if (num==1){
            navigation.navigate("Carimage2",{"id":"image1"})
        }
        else if (num==2){
            navigation.navigate("Carimage2",{"id":"image2"})
        }
        else if (num==3){
            navigation.navigate("Carimage2",{"id":"image3"})
        }
    }



    useEffect(() => {
        Getdetails();
    }, []);
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://images.pexels.com/photos/1580112/pexels-photo-1580112.jpeg?auto=compress&cs=tinysrgb&w=600' }}
                style={styles.background}
            />
            

            <View style={styles.formContainer}>

                <Text style={styles.title}>Change Carimages</Text>
                <View style={styles.card}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={{ uri: Detailsofuser.image1 }}
                            style={styles.logo1}
                        />
                    </View>


                    <TouchableOpacity style={styles.button} onPress={() => Change(1)} >
                        <Text style={styles.buttonText}>Change Car image 1</Text>
                    </TouchableOpacity>
                    <View style={styles.logoContainer}>
                        <Image
                            source={{ uri: Detailsofuser.image2 }}
                            style={styles.logo1}
                        />
                    </View>
                    <TouchableOpacity style={styles.button1} onPress={() => Change(2)}>
                        <Text style={styles.buttonText}>Change Car image 2</Text>
                    </TouchableOpacity>
                    <View style={styles.logoContainer}>
                        <Image
                            source={{ uri: Detailsofuser.image3 }}
                            style={styles.logo1}
                        />
                    </View>
                    <TouchableOpacity style={styles.button1} onPress={() => Change(3)}>
                        <Text style={styles.buttonText}>Change Car image 3</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
    },
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 120,
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 60,
        resizeMode: 'contain',
    },
    logo1: {
        width: 120,
        height: 120,
        borderRadius: 60,
        resizeMode: 'contain',
        marginBottom: 10,
        marginTop:-100
    },
    logo2: {
        width: 120,
        height: 120,
        borderRadius: 60,
        resizeMode: 'contain',
        marginBottom: 10,
        marginTop:-100
    },

    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
        marginTop: 20,
    },
    card: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        padding: 20,
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
    input: {
        height: 40,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ddd',
        color: '#333',
        paddingLeft: 10,
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    button1: {
        width: '100%',
        height: 40,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginTop: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
};

export default Carimage;