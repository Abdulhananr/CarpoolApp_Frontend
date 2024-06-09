import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, View, ImageBackground, Image, ScrollView, Dimensions, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');
import { Icon } from 'react-native-elements';
import { CustomCard } from './CustomCard';


function DriverList({ route }) {

    const [items, setItems] = useState([]);
    const back1 = require("../assets/Mainicon.png");
    const back2 = require("../assets/Man.jpg");
    const [isLoading, setLoading] = useState(false);

    const navigation = useNavigation();
    const [activeIndex, setActiveIndex] = useState(0);
    const [Detialsofuser, setDetailsofuser] = useState(0);
    const [Detialsofuser1, setDetailsofuser1] = useState(null);
    const [Detialsofbalance, setDetailsofbalance] = useState(null);
    const [Detialsoftrip, setDetailsoftrip] = useState(null);
    const [Detialsofimage, setDetailsofimage] = useState(null);
    const [placeName, setPlaceName] = useState(null);
    const [placeNameto, setPlaceNameto] = useState(null);
    const fetchPlaceName = async (latitude, longitude) => {
        try {
            // Make a request to the Google Maps Geocoding  API
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
                console.log(placeName);
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
                console.log(placeNameto);
            }
        } catch (error) {
            console.error('Error fetching place name:', error);
        }
        return;
    };
    const Finaldriver = async () => {

        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)
        const requestOptions = {
            method: 'DELETE'
        };
        fetch('http://' + ip_add['ip'] + '/api/Carpoolre/' + route.params.id2 + '/', requestOptions).then((response) => {
        }).then((result) => {
        });

        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                "lat": route.params.obj.lat,
                "long": route.params.obj.long,
                "des_lat": route.params.obj.des_lat,
                "des_long": route.params.obj.des_long,
                "client_id": route.params.obj.client_id,
                "assien_driver": route.params.obj.assien_driver,
                "date": route.params.obj.date,
                "time": route.params.obj.time,
                "price": route.params.obj.price,
                "seat": route.params.obj.Seat,
                "distance": route.params.obj.Distance

            })
        };

        fetch('http://' + ip_add['ip'] + '/api/Carpool/', requestOptions1)
            .then((response) => response.json())
            .catch((error) => { Alert.alert("Please Check Details ") })
        Alert.alert("Please Wait For Acceptence of the Driver")
        navigation.navigate("Mainscreen")

    }
    const Getdetails = async () => {

        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)

        // console.log('http://192.168.1.13/api/Check/'+route.params.result+'/'+seq)
        fetch('http://' + ip_add['ip'] + '/api/Customer/' + route.params.obj.assien_driver, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setDetailsofuser(responseJson)
                // console.log(responseJson)
                setItems(
                    [
                        {
                            title: 'Picture 1',
                            image: responseJson["image1"],
                        },
                        {
                            title: 'Picture 2',
                            image: responseJson["image2"],
                        },
                        {
                            title: 'Picture 3',
                            image: responseJson["image1"],
                        },
                    ]
                )
            })
            .catch((error) => {
                console.error(error);
            });
    }
    const Getdetails3 = async () => {
        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)
        const jsonValue = await AsyncStorage.getItem('@Data_Key')
        const val = JSON.parse(jsonValue)

        fetch('http://' + ip_add['ip'] + '/api/Customer/' + val['id'], {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setDetailsofuser1(responseJson["username"])
                // setDetailsoftrip(responseJson["trips_as_client"])
                setDetailsofbalance(responseJson["phone"])
                setDetailsofimage(responseJson['Profile'])


            })
            .catch((error) => {
                console.error(error);
            });




    }

    useEffect(() => {
        fetchPlaceName(route.params.obj.lat, route.params.obj.long)
        fetchPlaceNameto(route.params.obj.des_lat, route.params.obj.des_long)
        Getdetails();
        Getdetails3();
    }, []);


    return (
        <View style={[styles.container, { backgroundColor: "#2e25da" }]}>

            <View style={styles.topview}>
                <View style={styles.welcomecontainer}>
                    <Text style={styles.welcomemessage}>{"Hello," + "<br/>".split("<br/>").join("\n") + Detialsofuser1}</Text>

                    <Image source={{ uri: Detialsofimage }} style={styles.circle} />

                </View>

            </View>
            <View style={[styles.topview, { backgroundColor: "#3A9EC2", marginBottom: 20 }]}>

            </View>

            <CustomCard elevated={true} style={{ backgroundColor: "#fff", marginHorizontal: 24, marginTop: -40, padding: 10, borderRadius: 10, flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ alignItems: "center", marginLeft: 30 }}>
                    <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Charges</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 12 }}>seat({route.params.obj.Seat}) X $ {Math.round(route.params.obj.price)}</Text>
                </View>
                <View style={{ position: "absolute", left: 150, height: 48, borderWidth: 1, top: 10, width: 0, borderColor: "#494746" }}></View>

                <View style={{ alignItems: "center", marginRight: 40 }}>
                    <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Distance</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>{Math.round(route.params.obj.Distance)} Km</Text>
                </View>

            </CustomCard>
            <ScrollView style={styles.bottomview}>
                {/* <View > */}
                <Image source={{ uri: Detialsofuser.Profile }}
                    style={{
                        borderRadius: 50,
                        height: 80,
                        width: 80,
                        backgroundColor: "#fff",
                        marginLeft: 140,
                        marginTop: 40
                    }
                    } />
                <Text style={{
                    fontWeight: "bold",
                    fontSize: 25,
                    marginLeft: 100,
                    marginTop: 20
                }}
                >
                    {Detialsofuser.username}
                </Text>



                <CustomCard elevated={true} style={{ backgroundColor: "#fff", marginHorizontal: 24, marginTop: 30, padding: 10, borderRadius: 10, flexDirection: "row", justifyContent: "space-between" }}>


                    <View style={{ width: "100%" }}>
                        <View style={{ flexDirection: "row", marginBottom: 15, alignItems: "center" }}>
                            <Icon style={styles.inputIcon} name='my-location' type='ionicons' />
                            <View style={{ marginLeft: 20 }}>
                                <Text style={{ opacity: 0.6, fontSize: 15 }}>From</Text>
                                <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}>{route.params.From}</Text>
                            </View>
                            {/* <Text></Text> */}


                            <View style={{ position: "absolute", left: 12, height: 18, borderWidth: 1, top: 50, width: 0, borderColor: "#EBE7E6" }}></View>


                        </View>
                        {/* <View style={{ position: "absolute", left: 12, height: 48, borderWidth: 1, top: 52, width: 0, borderColor: "#EBE7E6" }}></View> */}
                        <View style={{ flexDirection: "row", alignItems: "center", borderTopStartRadius: 60, borderTopEndRadius: 20, borderColor: "#EBE7E6", borderTopWidth: 2 }}>
                            <Icon style={styles.inputIcon} name='location-pin' type='ionicons' />
                            <View style={{ marginLeft: 20 }}>
                                <Text style={{ opacity: 0.6, fontSize: 15, marginTop: 10 }}>To</Text>
                                <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}>{route.params.To}</Text>
                            </View>

                            <View style={{ position: "absolute", left: 12, height: 18, borderWidth: 1, top: 52, width: 0, borderColor: "#EBE7E6" }}></View>

                        </View>


                        <View style={{ flexDirection: "row", alignItems: "center", borderTopStartRadius: 60, borderTopEndRadius: 20, borderColor: "#EBE7E6", borderTopWidth: 2 }}>
                            <Icon style={styles.inputIcon} name='phone' type='ionicons' />
                            <View style={{ marginLeft: 20 }}>
                                <Text style={{ opacity: 0.6, fontSize: 15, marginTop: 10 }}>Phone No </Text>
                                <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}>{Detialsofuser.phone}</Text>
                            </View>


                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", borderTopStartRadius: 60, borderTopEndRadius: 20, borderColor: "#EBE7E6", borderTopWidth: 2 }}>
                            <Icon style={styles.inputIcon} name='credit-card' type='ionicons' />
                            <View style={{ marginLeft: 20 }}>
                                <Text style={{ opacity: 0.6, fontSize: 15, marginTop: 10 }}>Car Details</Text>

                                <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}> {Detialsofuser.carmodel}   {Detialsofuser.carplate}</Text>
                            </View>


                        </View>




                    </View>
                    


                        <View style={styles.carouselContainer}>
                            <ScrollView
                                horizontal={true}
                                pagingEnabled={true}
                                showsHorizontalScrollIndicator={false}
                                onScroll={(event) => {
                                    const x = event.nativeEvent.contentOffset.x;
                                    const index = Math.floor(x / (width - 60));
                                    if (index !== activeIndex) {
                                        setActiveIndex(index);
                                    }
                                }}
                                scrollEventThrottle={16}
                            >
                                {items.map((item, index) => (
                                    <View key={index} style={styles.itemContainer}>
                                        <Image source={{ uri: item.image }} style={styles.image} />
                                        <View style={styles.textContainer}>
                                            <Text style={styles.title}>{item.title}</Text>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                            <View style={styles.dotContainer}>
                                {items.map((_, index) => (
                                    <TouchableOpacity key={index} onPress={() => setActiveIndex(index)}>
                                        <View
                                            style={[
                                                styles.dot,
                                                { backgroundColor: index === activeIndex ? 'white' : 'gray' },
                                            ]}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                        







                </CustomCard>
                {/* <TouchableOpacity style={styles.loginButton} onPress={() => Finaldriver()}>
                        <Text style={styles.loginButtonText}> {"-->"}</Text>
                    </TouchableOpacity> */}
                <TouchableOpacity
                    onPress={() => Finaldriver()}
                    style={styles.roundButton1}>

                    <Text style={styles.loginButtonText}>{"Next"}</Text>
                </TouchableOpacity>
                {/* </View> */}
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    dotContainer: {
        width: '100%',
        flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'center',
        left:130,
        position: 'absolute',

        bottom: 10,

    },
    dot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        margin: 5,
        borderWidth: 1,

    },
    carouselContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 400,
        left: -280,
        marginTop: 250
    },
    itemContainer: {
        width: width - 60,
        height: height / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    image: {
        width: '100%',
        height: '80%',
        // resizeMode: 'cover',
        borderRadius: 10,
    },
    textContainer: {
        width: '50%',
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 10,
        position: 'absolute',
        bottom: 100,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    content: {
        fontSize: 14,
        textAlign: 'center',
    },







    loginButtonText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold'
    },
    roundButton1: {
        backgroundColor: '#000000',
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        marginLeft: 270,
        marginTop: 20
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
        backgroundColor: "#2e25da",
        justifyContent: "space-between"

    },
    loginButton: {
        backgroundColor: '#000000',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 60,

        marginRight: 60
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
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
});
export default DriverList;