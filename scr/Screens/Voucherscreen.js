import React, { useState } from 'react';
import { StyleSheet, View, Alert, ImageBackground, Image, TextInput, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';

function Voucherscreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async (price) => {
        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)
        const jsonValue = await AsyncStorage.getItem('@Data_Key')
        const val = JSON.parse(jsonValue)
        fetch('http://' + ip_add['ip'] + '/api/CreateVoucher/' + price + '/' + val['id'], {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson['status'] == 200) {
                    Alert.alert("Your Voucher Number is Please Remember This " +
                        `${responseJson["Voucher Number"]}`
                    )
                    console.log(responseJson)
                }
                else {
                    Alert.alert(responseJson["Messege"] + " Points is to Low")
                }

            })
            .catch((error) => {
                console.error(error);
            });


    };
    
    return (
        <View style={styles.container}>
            <Text onPress={() => navigation.navigate("Redeemitem")} style={{ marginLeft: 120,marginTop:30, fontSize: 18, fontWeight: 'bold', top:10 }}>
                Redeem Voucher</Text>

            <TouchableOpacity
                style={{ marginTop: 10, marginRight: 8 }}
                onPress={() => navigation.navigate("Redeemitem")}
            >
                <Text style={{left:350}}>History</Text>
                
            </TouchableOpacity>
            <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZvb2QlMjB2b3VjaGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60' }} style={styles.backgroundImage}>

                <View style={styles.formContainer}>
                    <TouchableOpacity style={styles.loginButton} onPress={() => handleLogin(10)}>
                        <Text style={styles.loginButtonText}>RM 10 Food Voucher (100 Points)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginButton} onPress={() => handleLogin(5)}>
                        <Text style={styles.loginButtonText}>RM 5 Food Voucher (50 Points)</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 160,
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    formContainer: {
        marginHorizontal: 20,
        marginTop: 250,
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.3)'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 20,
        padding: 10,
    },
    input: {
        height: 40,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#B0C4DE'
    },
    loginButton: {
        backgroundColor: '#7B68EE',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
export default Voucherscreen;