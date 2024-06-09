import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, Alert, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Button, Icon, ButtonGroup } from 'react-native-elements';
import { CustomCard } from './CustomCard';
import SourceSansProLight from '../assets/Font/SourceSansPro-Light.ttf';
import SourceSansProRegular from '../assets/Font/SourceSansPro-Regular.ttf';
import SourceSansProBold from '../assets/Font/SourceSansPro-Bold.ttf';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';


function DriverCreatedcarpools() {
    const [isLoading11, setisLoading11] = useState(true)
    const [isLoading12, setisLoading12] = useState(false)

    const [eventList, setEventList] = useState([

    ])
    const [eventList2, setEventList2] = useState([

    ])
    const navigation = useNavigation();
    const buttons = ['Pending', 'Seat Left'];
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleButtonGroupPress = (index) => {
        setSelectedIndex(index);

        if (index === 0) {
            setisLoading12(false)
            setisLoading11(true)

        } else if (index === 1) {
            setisLoading12(true)
            setisLoading11(false)
        }
    };
    showAlert = viewId => {
        Alert.alert('alert', 'event clicked ' + viewId)
    }
    const [placeName, setPlaceName] = useState(null);
    const [placeNameto, setPlaceNameto] = useState(null);
    const [Detialsofbalance, setDetailsofbalance] = useState(null);
    const [Detialsoftrip, setDetailsoftrip] = useState(null);
    const [Detialsofimage, setDetailsofimage] = useState(null);
    const [Profileofuser, setProfileofuser] = useState("")

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
    const deleterequest = async (id) => {
        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)
        const requestOptions = {
            method: 'DELETE'
        };
        fetch('http://' + ip_add['ip'] + '/api/DCarpoolre/' + id + '/', requestOptions).then((response) => {
        }).then((result) => {
            Alert.alert("Done ! Your Request Is deleted")

        });
        Getdetails();

    }
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

    const runGa = async () => {
        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)
        const jsonValue = await AsyncStorage.getItem('@Data_Key')
        const val = JSON.parse(jsonValue)
        //RunGa
        fetch('http://' + ip_add['ip'] + '/api/CheckGa', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //Sheduler Pickup
                Getdetails()
                fetch('http://' + ip_add['ip'] + '/api/Shedulder', {
                    method: 'GET'
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        //Sheduler of Dropoff
                        fetch('http://' + ip_add['ip'] + '/api/Sheduldedrop', {
                            method: 'GET'
                        })
                            .then((response) => response.json())
                            .then((responseJson) => {

                                Alert.alert("The GARUN")

                            })
                            .catch((error) => {
                                console.error(error);
                            });

                    })
                    .catch((error) => {
                        console.error(error);
                    });


            })
            .catch((error) => {
                console.error(error);
            });

        




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
        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)
        const jsonValue = await AsyncStorage.getItem('@Data_Key')
        const val = JSON.parse(jsonValue)
        var i = 0
        const dataof = []
        const dataof2 = []
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const current = `${year}-${month}-${day}`;

        const currentDate = new Date();
        const nextDay = new Date();
        nextDay.setDate(currentDate.getDate() + 1);

        // Format the next day's date as 'YYYY-MM-DD'
        const year1 = nextDay.getFullYear();
        const month1 = String(nextDay.getMonth() + 1).padStart(2, '0');
        const day1 = String(nextDay.getDate()).padStart(2, '0');
        const nextDayFormatted = `${year1}-${month1}-${day1}`;

        fetch('http://' + ip_add['ip'] + '/api/DCarpoolre/', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                responseJson.map(item => {
                    if (item["assien_driver"] == val['id'] && (item['status'] == 'Fail' || item['status'] == 'Match') && (item['date'] == nextDayFormatted || item['date'] == current)) {
                        i++;
                        fetchPlaceName(item["lat"], item["long"])
                        fetchPlaceNameto(item["des_lat"], item["des_long"])
                        dataof.push({
                            day: i,
                            id: item['id'],
                            time: item['time'],
                            date: dateofnext(item["date"]),
                            from: placeName,
                            to: placeNameto,
                            seat: item['seat']
                        })
                        // console.log( Detialsofuser)
                        // console.log(item)





                    }
                    else if (item["assien_driver"] == val['id'] && item['status'] == 'Pending' && (item['date'] == nextDayFormatted || item['date'] == current)) {
                        i++;
                        fetchPlaceName(item["lat"], item["long"])
                        fetchPlaceNameto(item["des_lat"], item["des_long"])
                        dataof2.push({
                            day: i,
                            id: item['id'],
                            time: item['time'],
                            date: dateofnext(item["date"]),
                            from: placeName,
                            to: placeNameto,
                            seat: item['seat']
                        })
                        // console.log( Detialsofuser)
                        // console.log(item)





                    }
                    else {
                        console.log("OKAY")
                    }

                });
                console.log(dataof)
                setEventList(dataof)
                setEventList2(dataof2)

            })
            .catch((error) => {
                console.error(error);
            });
    }

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            Getdetails();
            Getdetails2();
        }
    }, [isFocused]);
    return (
        <View style={[styles.container, { backgroundColor: "#2921c4" }]}>

            <View style={styles.topview}>
                <View style={styles.welcomecontainer}>
                    <Text style={styles.welcomemessage}>{"Hello," + "<br/>".split("<br/>").join("\n") + Profileofuser}</Text>
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
                <ScrollView>
                    <ButtonGroup
                        onPress={handleButtonGroupPress}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        containerStyle={{ height: 40, marginTop: 40, borderRadius: 10 }}
                        selectedButtonStyle={{ backgroundColor: '#5352ed' }}
                        selectedTextStyle={{ color: '#fff' }}
                    />
                    {isLoading12 == false ?
                        <CustomCard elevated={true} style={{ backgroundColor: "#fff", marginHorizontal: 24, marginTop: 30, padding: 10, borderRadius: 10, flexDirection: "row", justifyContent: "space-between" }}>

                            <View style={{ width: "100%" }}>
                                {/* <View style={styles.container}> */}

                                {/* </View> */}


                                <TouchableOpacity style={styles.loginButton} onPress={() => runGa()}>
                                    <Text style={styles.loginButtonText}>Apply Automatching</Text>

                                </TouchableOpacity>

                                <FlatList
                                    data={eventList2}
                                    renderItem={({ item }) => (
                                        <View style={styles.card}>
                                            <View style={styles.item}>
                                                <View style={styles.itemContent}>

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
                                                        <B>Seat :</B>{item.seat}{"  "}
                                                    </Text>

                                                </View>

                                            </View>
                                            <Icon style={styles.inputIcon} name='delete' type='ionicons' onPress={() => deleterequest(item.id)} />
                                        </View>
                                    )}
                                    keyExtractor={item => item.id}
                                />
                            </View>

                        </CustomCard>






                        : <CustomCard elevated={true} style={{ backgroundColor: "#fff", marginHorizontal: 24, marginTop: 30, padding: 10, borderRadius: 10, flexDirection: "row", justifyContent: "space-between" }}>

                            <View style={{ width: "100%" }}>
                                {/* <View style={styles.container}> */}

                                {/* </View> */}

                                <FlatList
                                    data={eventList}
                                    renderItem={({ item }) => (
                                        <View style={styles.card}>
                                            <View style={styles.item}>
                                                <View style={styles.itemContent}>

                                                    <Text style={styles.userName}><B>Date: </B>{item.date}</Text>
                                                    <Text style={styles.userName}><B>Time: </B>{item.time}</Text>

                                                    <Text style={styles.description}>
                                                        We Do over Best Use our Algo
                                                    </Text>
                                                    <Text style={styles.userName}>
                                                        <B>From :</B>{placeName}

                                                    </Text>
                                                    <Text>{"\n"}</Text>
                                                    <Text style={styles.userName}>
                                                        <B>To :</B>{placeNameto}
                                                    </Text>
                                                    <Text>{"\n"}</Text>

                                                    <Text style={styles.userName}>
                                                        <B>Seat :</B>{item.seat}{"  "}
                                                    </Text>

                                                </View>

                                            </View>
                                            <Icon style={styles.inputIcon} name='delete' type='ionicons' onPress={() => deleterequest(item.id)} />
                                        </View>
                                    )}
                                    keyExtractor={item => item.id}
                                />
                            </View>

                        </CustomCard>
                    }










                </ScrollView>



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
        marginTop: 0,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 15
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
})
export default DriverCreatedcarpools;