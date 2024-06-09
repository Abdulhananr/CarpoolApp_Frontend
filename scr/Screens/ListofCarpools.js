import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, Image, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import { Button, Icon } from 'react-native-elements';
import { CustomCard } from './CustomCard';
import { Snackbar } from 'react-native-paper';

import SourceSansProLight from '../assets/Font/SourceSansPro-Light.ttf';
import SourceSansProRegular from '../assets/Font/SourceSansPro-Regular.ttf';
import SourceSansProBold from '../assets/Font/SourceSansPro-Bold.ttf';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

function ListofCarpools(props) {
    const back1 = require("../assets/Mainicon.png");
    const [eventList, setEventList] = useState([])
    const [placeName, setPlaceName] = useState(null);
    const [placeNameto, setPlaceNameto] = useState(null);
    const [Detialsofuser, setDetailsofuser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [Detialsofbalance, setDetailsofbalance] = useState(null);
    const [Detialsoftrip, setDetailsoftrip] = useState(null);
    const [Detialsofimage, setDetailsofimage] = useState(null);
    const navigation = useNavigation();

    const [Profileofuser, setProfileofuser] = useState("")
    const [Detialsofuser2, setDetailsofuser2] = useState(null);


    const [Profileofclient, setProfileofclient] = useState(null)
    const [Nameofclient, setNameofclient] = useState("");

    const [visible, setVisible] = React.useState(false);



    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);
    const [visible1, setVisible1] = React.useState(false);


    const onToggleSnackBar1 = () => setVisible1(!visible);

    const onDismissSnackBar1 = () => setVisible1(false);


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
                setDetailsofuser2(responseJson["username"])



            })
            .catch((error) => {
                console.error(error);
            });


    }

    const Getdetails1 = async (ip, id) => {
        // console.log('http://192.168.1.13/api/Check/'+route.params.result+'/'+seq)
        fetch('http://' + ip + '/api/Customer/' + id, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setNameofclient(responseJson["username"])
                setProfileofclient(responseJson['Profile'])


            })
            .catch((error) => {
                console.error(error);
            });


    }
    // const Getdetails1 = async (ip, id) => {
    //     try {
    //         const response = await fetch('http://' + ip + '/api/Customer/' + id, {
    //             method: 'GET'
    //         });

    //         if (response.ok) {
    //             const responseJson = await response.json();
    //             const nameofclient = responseJson["username"];
    //             const profileofclient = responseJson['Profile'];

    //             // Do something with the data
    //             console.log(nameofclient);
    //             console.log(profileofclient);

    //             // Return the data if needed
    //             return { nameofclient, profileofclient };
    //         } else {
    //             console.error('Response error:', response.status);
    //         }
    //     } catch (error) {
    //         console.error('Fetch error:', error);
    //     }
    // };



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
    const postdata = async (ip, id, responseJson) => {
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                "lat": responseJson.lat,
                "long": responseJson.long,
                "des_lat": responseJson.des_lat,
                "des_long": responseJson.des_long,
                "client_id": responseJson.client_id,
                "assien_driver": responseJson.assien_driver,
                "date": responseJson.date,
                "time": responseJson.time,
                "price": responseJson.price,
                "seat": responseJson.seat,
                "distance": responseJson.distance



            })
        };

        fetch('http://' + ip + '/api/FinalCarpool/', requestOptions1)
            .then((response) => response.json())
            .catch((error) => { Alert.alert("Please Check Detials ") })
        const requestOptions = {
            method: 'DELETE'
        };
        fetch('http://' + ip + '/api/Carpool/' + id + '/', requestOptions).then((response) => {
        }).then((result) => {
        });
        Getdetails();

    }
    const mybuttonclick = async (id) => {

        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)
        fetch('http://' + ip_add['ip'] + '/api/Carpool/' + id, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                postdata(ip_add['ip'], id, responseJson)
                console.log("dend")
            })
            .catch((error) => {
                console.error(error);
            });


        Alert.alert("Please See The Carpool Start At Its Time ")
        Getdetails();
    }
    const Rejectcarpool = async (id) => {

        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)

        const requestOptions = {
            method: 'DELETE'
        };
        fetch('http://' + ip_add['ip'] + '/api/Carpool/' + id + '/', requestOptions).then((response) => {
        }).then((result) => {
        });
        Alert.alert("Please See The Carpool Start At Its Time ")

    }
    const dateofnext = (givenDate) => {

        // Convert the given date to a Date object
        var dateObj = new Date(givenDate);

        // Increment the date by 1 day
        dateObj.setDate(dateObj.getDate() + 1);

        // Get the year, month, and day components of the new date
        var year = dateObj.getFullYear();
        var month = dateObj.getMonth() + 1; // Adding 1 because months are zero-based
        var day = dateObj.getDate();

        // Format the new date as "YYYY-MM-DD"
        var formattedDate = year + "-" + month.toString().padStart(2, '0') + "-" + day.toString().padStart(2, '0');
        return formattedDate;
    }


    const Getdetails = async () => {
        setIsLoading(true);
        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)
        const jsonValue = await AsyncStorage.getItem('@Data_Key')
        const val = JSON.parse(jsonValue)
        var i = 0
        const dataof = []

        fetch('http://' + ip_add['ip'] + '/api/Fetchdata/' + val['id'], {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                responseJson['Final'].map(item => {


                    // const [key, value] = Object.Keys(item);
                    const key = Object.keys(item)[0];
                    const value = item[key];
                    fetchPlaceName(item["Data"]["lat"], item["Data"]["long"])
                    fetchPlaceNameto(item["Data"]["des_lat"], item["Data"]["des_long"])
                    dataof.push({
                        Passenger: item['Lenth'],
                        ids: value,
                        Key: key,
                        Data: item["Data"],
                        time: item["Data"]['time'],
                        date: dateofnext(item["Data"]["date"]),
                        from: placeName,
                        to: placeNameto,
                        seat: item["Data"]['seat']

                    })
                });
                setEventList(dataof)
                console.log(dataof)


            })
            .catch((error) => {
                console.error(error);
            });
        setIsLoading(false);
    }
    //   useEffect(() => {
    //       Getdetails();
    //   }, []);
    const handleRefresh = () => {
        Getdetails();
    };
    const convertTimeTo24HourFormat = (timeString) => {
        const [time, modifier] = timeString.split(' ');

        let [hours, minutes] = time.split(':');

        if (hours === '12') {
            hours = '00';
        }

        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }

        return `${hours}:${minutes}:00`;
    };
    const CheckStartornot = (Key) => {
        navigation.navigate("Mappscreen", { Obj: parseInt(Key) })
    };














    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            Getdetails();
            Getdetails();
            Getdetails2();
        }
    }, [isFocused]);
    return (
        <View style={[styles.container, { backgroundColor: "#2921c4" }]}>

            <View style={styles.topview}>
                <View style={styles.welcomecontainer}>
                    <Text style={styles.welcomemessage}>{"Hello," + "<br/>".split("<br/>").join("\n") + Detialsofuser2}</Text>

                    <View>
                        <TouchableOpacity style={{ marginBottom: 20, marginLeft: 15 }}
                            onPress={() => navigation.navigate("NotficationDriver")} >
                            <Ionicons name="notifications" size={24} color="white" />
                        </TouchableOpacity>
                        <Image source={{ uri: Detialsofimage }} style={styles.circle} />

                    </View>

                </View>

            </View>
            <View style={[styles.topview, { backgroundColor: "#2921c4", marginBottom: 20 }]}>

            </View>

            <CustomCard elevated={true} style={{ backgroundColor: "#fff", marginHorizontal: 24, marginTop: -40, padding: 10, borderRadius: 10, flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ alignItems: "center", marginLeft: 40 }}>
                    <Text onPress={() => navigation.navigate("Voucherscreen")} style={{ fontWeight: "bold", marginBottom: 10 }}>Points</Text>
                    <Text onPress={() => navigation.navigate("Voucherscreen")} style={{ fontWeight: "bold", fontSize: 18 }}>10{Detialsofbalance}</Text>
                </View>
                <View style={{ position: "absolute", left: 150, height: 48, borderWidth: 1, top: 10, width: 0, borderColor: "#494746" }}></View>

                <View style={{ alignItems: "center", marginRight: 40 }}>
                    <Text onPress={() => navigation.navigate("History")} style={{ fontWeight: "bold", marginBottom: 10 }}>Total Trips</Text>
                    <Text onPress={() => navigation.navigate("History")} style={{ fontWeight: "bold", fontSize: 18 }}>{Detialsoftrip}</Text>
                </View>
            </CustomCard>
            <View style={styles.bottomview}>

                <CustomCard elevated={true} style={{ backgroundColor: "#fff", marginHorizontal: 24, marginTop: 40, padding: 10, borderRadius: 10, flexDirection: "row", justifyContent: "space-between" }}>

                    <View style={{ width: "100%" }}>
                        {/* <View style={styles.container}> */}

                        {/* </View> */}

                        <FlatList
                            data={eventList}
                            renderItem={({ item }) => (
                                <View style={styles.card}>

                                    <View style={styles.item}>
                                        <View style={styles.itemContent}>
                                            <Text style={styles.userName}><B>Passenger(s): {item.Passenger}</B> </Text>

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
                                                <B>Seat Left:</B>{item.seat}{"        "}

                                            </Text>
                                            <Text style={styles.description}>
                                                **Carpool can only starts 15mins before the carpool time
                                            </Text>


                                        </View>
                                    </View>
                                    <View style={styles.buttons}>
                                        <TouchableOpacity style={styles.loginButton} onPress={() => CheckStartornot(item.Key)} >
                                            <Text style={styles.loginButtonText}>{"          "}Start Ride {"        "}</Text>

                                        </TouchableOpacity>

                                    </View>
                                    <View style={styles.buttons}>
                                        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Passenger", { "id": item.ids })} >
                                            <Text style={styles.loginButtonText}>{"  "}Passenger Details{"  "}</Text>

                                        </TouchableOpacity>

                                    </View>


                                </View>
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>











                </CustomCard>
                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: 'Undo',
                        onPress: () => {
                            // Do something
                        },
                    }}>
                    You Cannot Start Ride Right Know
                </Snackbar>
                <Snackbar
                    visible={visible1}
                    onDismiss={onDismissSnackBar1}
                    action={{
                        label: 'Undo',
                        onPress: () => {
                            // Do something
                        },
                    }}>
                    Your Can Start Right Know
                </Snackbar>

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
        fontSize: 12,
        color: '#646464',
        marginTop: 10,
        marginBottom: -10
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
        marginLeft: 12
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
export default ListofCarpools;