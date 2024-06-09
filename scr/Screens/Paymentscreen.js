import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { CustomCard } from './CustomCard';
import bus from '../assets/images/bus.png';
import mrt from '../assets/images/mrt.jpg';
import { FromTo } from './FromTo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CreditCardInput, LiteCreditCardInput } from 'react-native-credit-card-input';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

PRIMARYCOLOR = "#3A9EC2"
PRIMARYBORDERADIUS = "#3A9EC2"

function Paymentscreen() {
    const [code, setCode] = useState();
    const navigation =useNavigation();
    const [Detialsofbalance, setDetailsofbalance] = useState(null);
    const [Detialsoftrip, setDetailsoftrip] = useState(null);
    const [Detialsofimage, setDetailsofimage] = useState(null);
    const [Profileofuser, setProfileofuser] = useState("")
    const [Detialsofuser2, setDetailsofuser2] = useState(null);
    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState([]);
    const [expiration, setExpiration] = useState('');
    const [cvv, setCvv] = useState('');
    const Getdetails2 = async () => {
        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)
        const jsonValue = await AsyncStorage.getItem('@Data_Key')
        const val = JSON.parse(jsonValue)

        fetch('http://' + ip_add['ip'] + '/api/Customer/' + val['id'], {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setDetailsoftrip(responseJson["trips_as_captain"])
                setDetailsofbalance(responseJson["balance"])
                setDetailsofimage(responseJson['Profile'])
                setDetailsofuser2(responseJson["username"])
                console.log(Detialsoftrip)

            })
            .catch((error) => {
                console.error(error);
            });


    }
    useEffect(() => {
        Getdetails2();
    }, []);
    const _onChange = (form) => {
        setCardNumber(form);

    };
    const balanceuser = async(ebiw) => {
        if (cardNumber.status.cvc == "invalid") {

        }
        else if (cardNumber.status.expiry == "invalid") {
            Alert.alert("Sorry Check Your Details")
        }
        else if (cardNumber.status.expiry == "invalid") {
            Alert.alert("Sorry Check Your Details")
        }
        else if (code.length == 0) {
            Alert.alert("Please Enter Balance ")
        }
        else {
            const ip = await AsyncStorage.getItem('@Data_Ip')
            const ip_add = JSON.parse(ip)
            const jsonValue = await AsyncStorage.getItem('@Data_Key')
            const val = JSON.parse(jsonValue)
           
            fetch('http://' + ip_add['ip'] + '/api/Add/' + val['id']+'/'+code, {
                method: 'GET'
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    Alert.alert("Top up Successfully")
                    navigation.navigate("Mainscreen")

                })
                .catch((error) => {
                    console.error(error);
                });








        }

    }
    return (
        <View style={[styles.container, { backgroundColor: "#2921c4" }]}>

            <View style={styles.topview}>
                <View style={styles.welcomecontainer}>
                    <Text style={styles.welcomemessage}>{"Hello," + "<br/>".split("<br/>").join("\n") + Detialsofuser2}</Text>

                    <Image source={{ uri: Detialsofimage }} style={styles.circle} />

                </View>

            </View>
            <View style={[styles.topview, { backgroundColor: "#2921c4", marginBottom: 20 }]}>

            </View>

            <CustomCard elevated={true} style={{ backgroundColor: "#fff", marginHorizontal: 24, marginTop: -40, padding: 10, borderRadius: 10, flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ alignItems: "center", marginLeft: 40 }}>
                    <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Balance</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>RM {Detialsofbalance}</Text>
                </View>
                <View style={{ position: "absolute", left: 150, height: 48, borderWidth: 1, top: 10, width: 0, borderColor: "#494746" }}></View>

                <View style={{ alignItems: "center", marginRight: 40 }}>
                    <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Total Trips</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>{Detialsoftrip}</Text>
                </View>
            </CustomCard>

            <View style={styles.bottomview}>
                <ScrollView>
                    <Text style={{ fontWeight: "bold", marginTop: 40, marginLeft: 50, marginBottom: -40, fontWeight: 'bold', fontSize: 30, marginBottom: 10 }}>
                        Credit Card Details
                    </Text>
                    <CreditCardInput onChange={_onChange} />

                    {/* <View style={styles.buttons}>
                <TouchableOpacity style={styles.loginButton} onPress={() => balanceuser()} >
                    <Text style={styles.loginButtonText}>{"    "}Add Balanace {"    "}</Text>
                </TouchableOpacity>


                
            </View> */}
                    <View style={styles.card12}>
                        <TextInput
                            style={styles.input12}
                            placeholder="Enter Balance "
                            keyboardType="number-pad"
                            value={code}
                            onChangeText={setCode}
                            maxLength={6}
                        />
                        <TouchableOpacity style={styles.loginButton} onPress={() => balanceuser(code)}>
                            <Text style={styles.loginButtonText}>Add Balance</Text>
                        </TouchableOpacity>
                    </View>















                </ScrollView>
            </View >

        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DCDCDC',
    },
    welcomemessage: {
        color: "#fff",
        fontSize: 35,
        fontWeight: "bold"
    },
    searchbar: {
        flexDirection: "row",
        backgroundColor: "#fff",
        alignItems: "center",
        width: "100%",
        height: 40,
        borderRadius: 10,
        marginBottom: 65
    },
    circle: {
        borderRadius: 25,
        height: 50,
        width: 50,
        backgroundColor: "#fff"
    },
    welcomecontainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    eventList: {
        marginTop: 10,
    },
    eventBox: {
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
    },
    bottomview: {
        flex: 2,
        backgroundColor: "#fff",
        borderTopLeftRadius: 50,
        marginTop: 20,
        borderTopRightRadius: 50,
    },
    container: {
        flex: 1,
        backgroundColor: "#3A9EC2",
    },
    topview: {

        marginTop: 60,
        marginHorizontal: 24,
        backgroundColor: "#2921c4",
        justifyContent: "space-between"

    },
    eventDate: {
        flexDirection: 'column',
    },
    eventDay: {
        fontSize: 50,
        color: '#0099FF',
        fontWeight: '600',
    },
    eventMonth: {
        fontSize: 16,
        color: '#0099FF',
        fontWeight: '600',
    },
    buttonsContainer: {
        flex: 2,
        flexDirection: 'row',
        marginHorizontal: 30,
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 20,
        padding: 10,
        justifyContent: 'space-around'
    },
    button: {
        width: '48%',
        height: 50,
        padding: 10,
        marginLeft: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    Accept: {
        backgroundColor: '#000000'
    },
    Reject: {
        backgroundColor: '#DB4437'
    },
    eventContent: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 10,
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10,
    },
    description: {
        fontSize: 15,
        color: '#646464',
        marginTop: 10,
        marginBottom: 10
    },
    eventTime: {
        fontSize: 18,
        color: '#000000',
        fontFamily: 'SourceSansProRegular',
        marginTop: 10,
        marginBottom: 10
    },
    userName: {
        fontSize: 16,
        color: '#151515',
        fontFamily: 'SourceSansProRegular',
        marginBottom: 10
    },


    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 20,
        color: '#fff',
        marginHorizontal: 20,
    },
    card: {
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    card12: {
        width: '80%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        shadowColor: '#00CED1',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginTop: 30,
        marginLeft: 40
    },
    input12: {
        flex: 1,
        fontSize: 18,
    },
    button12: {
        backgroundColor: '#00CED1',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText12: {
        color: '#fff',
        fontSize: 18,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        // marginRight: 20,
        marginLeft: 75,
        marginBottom: 10
    },
    itemContent: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 16,
        color: '#999',
    },
    buttons: {
        flexDirection: 'row',
    },
    buttonq: {
        backgroundColor: '#50AB04',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginLeft: 30
    },
    buttonqw: {
        backgroundColor: '#DB4437',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginButton: {
        backgroundColor: '#000000',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',

    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
})
export default Paymentscreen;