import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, Linking,Image, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import { Icon } from 'react-native-elements';
import { CustomCard } from './CustomCard';
import SourceSansProLight from '../assets/Font/SourceSansPro-Light.ttf';
import SourceSansProRegular from '../assets/Font/SourceSansPro-Regular.ttf';
import SourceSansProBold from '../assets/Font/SourceSansPro-Bold.ttf';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import SendIntentAndroid from 'react-native-send-intent';

function Passenger({ route }) {
    const [items, setItems] = useState([]);
    const back1 = require("../assets/Mainicon.png");
    const back2 = require("../assets/Man.jpg");
    const [eventList, setEventList] = useState([])
    const [isLoading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [activeIndex, setActiveIndex] = useState(0);
    const [Detialsofuser, setDetailsofuser] = useState([]);
    const [Detialsofuser1, setDetailsofuser1] = useState(null);
    const [Detialsofbalance, setDetailsofbalance] = useState(null);
    const [Detialsoftrip, setDetailsoftrip] = useState(null);
    const [Detialsofimage, setDetailsofimage] = useState(null);
    const [Profileofuser, setProfileofuser] = useState("")
    const [Detialsofuser2, setDetailsofuser2] = useState([]);
    const [placeName, setPlaceName] = useState(null);
    const [placeNameto, setPlaceNameto] = useState(null);



    const fetchPlaceName = async (latitude, longitude) => {
        try {
            // Make a request to the Google Maps Geocoding API
            console.log(latitude, longitude)
            const formattedPlaceName = "";
            const apiKey = 'AIzaSyAIK7Latdow_7V9Arlcy5RtG9gj0hMn0qw'; // Replace with your Google Maps API key
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
            const response = await fetch(url);
            const responseJson = await response.json();
            // Parse the response to extract the place name
            const results = responseJson.results;
            if (results.length > 0) {
                const firstResult = results[0];
                const formattedPlaceName = firstResult.formatted_address;
                setPlaceName(formattedPlaceName);
            }
        } catch (error) {
            console.error('Error fetching place name:', error);
        }
        return;

    };
    const fetchPlaceNameto = async (latitude, longitude) => {
        try {
            // Make a request to the Google Maps Geocoding API
            console.log(latitude, longitude)
            const formattedPlaceName = "";
            const apiKey = 'AIzaSyAIK7Latdow_7V9Arlcy5RtG9gj0hMn0qw'; // Replace with your Google Maps API key
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
            const response = await fetch(url);
            const responseJson = await response.json();
            // Parse the response to extract the place name
            const results = responseJson.results;
            if (results.length > 0) {
                const firstResult = results[0];
                const formattedPlaceName = firstResult.formatted_address;
                setPlaceNameto(formattedPlaceName);
            }
        } catch (error) {
            console.error('Error fetching place name:', error);
        }
        return;
    };


    const Getdetails = async () => {

        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)
        const dataof = []
        route.params.id.forEach(item => {

            fetch('http://' + ip_add['ip'] + '/api/FinalCarpool/' + item, {
                method: 'GET'
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    
                    fetchPlaceName(responseJson["lat"], responseJson["long"])
                    fetchPlaceNameto(responseJson["des_lat"], responseJson["des_long"])
                    fetch('http://' + ip_add['ip'] + '/api/Customer/' + responseJson['client_id'], {
                        method: 'GET'
                    })
                        .then((response) => response.json())
                        .then((responseJson1) => {
                            dataof.push({
                                id: responseJson["id"],
                                cid: responseJson['client_id'],
                                time: responseJson['time'],
                                date: responseJson["date"],
                                from: placeName,
                                to: placeNameto,
                                dist: responseJson['distance'],
                                price: responseJson['price'],
                                seat: responseJson['seat'],
                                name:responseJson1['username'],
                                Phone:responseJson1['phone'],
                                email:responseJson1['email'],
                                image:responseJson1['Profile']

                                
        
        
                            })
                            


                        })
                        .catch((error) => {
                            console.error(error);
                        });





                    

                })
                .catch((error) => {
                    console.error(error);
                });
            setEventList(dataof)




        });
        console.log(Detialsofuser)
    }
    const B = (props) => <Text style={{ fontWeight: 'bold', fontFamily: 'SourceSansProBold' }}>{props.children}</Text>

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
                setDetailsofbalance(responseJson["point"])
                setDetailsofimage(responseJson['Profile'])
                setProfileofuser(responseJson['username'])


            })
            .catch((error) => {
                console.error(error);
            });


    }
    const openwhatsapp = (phoneNumber)=>{
        const url = `whatsapp://send?phone=${phoneNumber}`;
    
        Linking.canOpenURL(url)
        .then(supported => {
            if (!supported) {
            console.log('WhatsApp is not installed.');
            } else {
            return Linking.openURL(url);
            }
        })
        .catch(err => console.error('An error occurred', err));

    }

    useEffect(() => {
        // console.log(route.params.id)
        Getdetails();
        Getdetails2();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: "#2921c4" }]}>

            <View style={styles.topview}>
                <View style={styles.welcomecontainer}>
                    <Text style={styles.welcomemessage}>{"Hello," + "<br/>".split("<br/>").join("\n") + Profileofuser}</Text>

                    <Image source={{ uri: Detialsofimage }} style={styles.circle} />

                </View>

            </View>
            <View style={[styles.topview, { backgroundColor: "#2921c4", marginBottom: 20 }]}>

            </View>

            <CustomCard elevated={true} style={{ backgroundColor: "#fff", marginHorizontal: 24, marginTop: -40, padding: 10, borderRadius: 10, flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ alignItems: "center", marginLeft: 40 }}>
                    <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Points</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>{Detialsofbalance}</Text>
                </View>
                <View style={{ position: "absolute", left: 150, height: 48, borderWidth: 1, top: 10, width: 0, borderColor: "#494746" }}></View>

                <View style={{ alignItems: "center", marginRight: 40 }}>
                    <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Total Trips</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>{Detialsoftrip}</Text>
                </View>
            </CustomCard>
            <View style={styles.bottomview}>
                <CustomCard elevated={true} style={{ backgroundColor: "#fff", marginHorizontal: 24, marginLeft:20,marginTop: 40, padding: 10, borderRadius: 10, flexDirection: "row", justifyContent: "space-between" }}>

                    <View style={{ width: "100%" }}>
                        {/* <View style={styles.container}> */}

                        {/* </View> */}

                        <FlatList
                            data={eventList}
                            renderItem={({ item }) => (
                                <View style={styles.card}>

                                    <View style={styles.item}>
                                        <View style={styles.itemContent}>
                                        <Image source={{ uri: item.image }} style={styles.circle} />
                                            <Text style={styles.userName}><B>Name: </B>{item.name}</Text>
                                            <Text style={styles.userName}><B>Phone: </B>{item.Phone}</Text>
                                            <Text style={styles.userName}><B>Email: </B>{item.email}</Text>

                                            <Text style={styles.userName}><B>Date: </B>{item.date}</Text>
                                            <Text style={styles.userName}><B>Time: </B>{item.time}</Text>

                                           
                                            <Text style={styles.userName}>
                                                <B>From :</B>{placeName}

                                            </Text>
                                            <Text>{"\n"}</Text>
                                            <Text style={styles.userName}>
                                                <B>To :</B>{placeNameto}
                                            </Text>
                                            <Text>{"\n"}</Text>

                                            <Text style={styles.userName}>
                                                
                                                <B>Distance :</B>  {item.dist} KM

                                            </Text>
                                            <Text>{"\n"}<B>Seat:</B>{item.seat}{"        "}{"\n"}</Text>
                                            <Text style={styles.userName}>
                                                <B>Per Seat:</B> Seat{"("}{item.seat}{")"} X {(item.dist)} Points
                                            </Text>
                                            <Text style={styles.userName}>
                                                
                                                <B>Points Get:</B>{item.dist * item.seat.toFixed(2)} Points

                                            </Text>



                                        </View>
                                    </View>
                                    
                                    <View style={styles.buttons}>
                                        <TouchableOpacity style={styles.loginButton} onPress={() => openwhatsapp(item.Phone)} >
                                            <Text style={styles.loginButtonText}>{"           "}Whatsapp{"           "}</Text>

                                        </TouchableOpacity>

                                    </View>


                                </View>
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>











                </CustomCard>



            </View>
        </View>
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
        marginLeft: 50,
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
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#CCCCCC'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
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
        marginTop: 4,
        marginLeft: 30
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
})
export default Passenger;