
import React, { useState, useRef, useEffect, Component } from 'react';
import { StyleSheet, Alert, ActivityIndicator, View, Platform, LogBox, FlatList, ImageBackground, Button, Image, ScrollView, Dimensions, PlatformTextInput, TouchableOpacity, Text, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

import { CustomCard } from './CustomCard';

import { Icon } from 'react-native-elements';
function HomeScreen(props) {
    const navigation = useNavigation();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [Detialsofuser, setDetailsofuser] = useState(null);
    const [Detialsofbalance, setDetailsofbalance] = useState(null);
    const [Detialsoftrip, setDetailsoftrip] = useState(null);
    const [Detialsofimage, setDetailsofimage] = useState(null);
    const [products, setProducts] = useState(1);
    const [Carpoolnumber, setCarpoolnumber] = useState(1);
    const onIncrement = () => {
        if (products == 3) {
            Alert.alert("Your Max limit of Seat is Full")
        }
        else {
            setProducts(products + 1)
        }


    }
    const onDecrement = () => {
        if (products == 1) {

        }

        else {
            setProducts(products - 1)
        }

    }

    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) {
            setTime(selectedTime);
        }

    };

    const [state, setState] = useState({

        pickupCords: {},
        destinationCords: {},

    })
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const [addressof, setAddressof] = useState("Choose Your Pick-up location")
    const [addressof2, setAddressof2] = useState("Choose Your Drop Off location ")

    const { destinationCords, pickupCords } = state
    const fetchValue2 = (data) => {
        setAddressof2(data.destinationCords.address)
        console.log(
            data.destinationCords.latitude,
            data.destinationCords.longitude,
            data.destinationCords.address,)
        updateState({
            destinationCords: {
                latitude: data.destinationCords.latitude,
                longitude: data.destinationCords.longitude,
                address: data.destinationCords.address,
            }
        })
    }
    const fetchValue = (data) => {
        setAddressof(data.destinationCords.address)
        console.log(
            data.destinationCords.latitude,
            data.destinationCords.longitude,
            data.destinationCords.address,)
        updateState({
            pickupCords: {
                latitude: data.destinationCords.latitude,
                longitude: data.destinationCords.longitude,
                address: data.destinationCords.address,
            }
        })
    }
    const showPicker = () => {
        setShowTimePicker(true);
    };

    const handleDateChange = (event, date) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (date) {
            setSelectedDate(date);
            console.log(date)
        }
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
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
    const convertTo24Hour = (time12) => {
        const [time, modifier] = time12.split(' ');

        let [hours, minutes] = time.split(':');

        if (hours === '12') {
            hours = '00';
        }

        if (modifier === 'pm') {
            hours = parseInt(hours, 10) + 12;
        }

        return `${hours}:${minutes}:00`;
    }
    const convertDateFormat = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based 
        const year = date.getFullYear();

        return `${year}-${month}-${day}`;
    };
    const Getserver = (ip, id, id2) => {
        console.log(id, ip)
        fetch('http://' + ip + '/api/CheckGa/' + id, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson['statusCode'] == 200) {

                    // console.log(responseJson)
                    navigation.navigate("DriverList", { "obj": responseJson["Selected_driver"], "id2": id2, "To": addressof2, "From": addressof })
                }
                else {
                    // onToggleSnackBar()
                    Alert.alert(responseJson["Message"])
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return parseFloat(distance.toFixed(2)); // Distance in kilometers
    };

    const toRadians = (value) => {
        return (value * Math.PI) / 180;
    };
    const getCurrentDate = () => {
        const currentDate = new Date().toISOString().split('T')[0];
        return currentDate;
    };

    const Posttoserver = async () => {
        setLoading(true)
        const jsonValue = await AsyncStorage.getItem('@Data_Key')
        const val = JSON.parse(jsonValue)
        console.log("The Driver id is ----->", parseInt(val["id"]))
        console.log("time is --->", typeof convertTimeTo24HourFormat(time.toLocaleTimeString()))
        console.log("date is ---->", typeof (convertDateFormat(selectedDate.toDateString())))
        console.log("Pickup location--->", pickupCords.latitude, pickupCords.longitude)
        console.log("Destination location--->", destinationCords.latitude, destinationCords.longitude)
        // DCarpoolre
        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)

        console.log(time.toLocaleTimeString())
        const distance = calculateDistance(pickupCords.latitude, pickupCords.longitude, destinationCords.latitude, destinationCords.longitude)
        const currentDate = new Date();

        // Calculate the next day's date
        const nextDay = new Date();
        nextDay.setDate(currentDate.getDate() + 1);

        // Format the next day's date as 'YYYY-MM-DD'
        const year = nextDay.getFullYear();
        const month = String(nextDay.getMonth() + 1).padStart(2, '0');
        const day = String(nextDay.getDate()).padStart(2, '0');
        const nextDayFormatted = `${year}-${month}-${day}`;
        let carpool_price;
        if (distance <= 3) {
            carpool_price = 1
        } else if (distance > 3 && distance <= 10) {
            carpool_price = 2
        } else {
            carpool_price = 3
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                "lat": pickupCords.latitude,
                "long": pickupCords.longitude,
                "des_lat": destinationCords.latitude,
                "des_long": destinationCords.longitude,
                "client_id": val["id"],
                "assien_driver": null,
                "date": getCurrentDate(),
                "time": convertTo24Hour(time.toLocaleTimeString()),
                "price": carpool_price,
                "seat": products,
                "distance": distance,
                "status": "Pending",
                "client_request_number": Carpoolnumber,
                "driver_request_number": 0



            })
        };
        setCarpoolnumber(Carpoolnumber + 1)
        try {
            const response = await fetch('http://' + ip_add['ip'] + '/api/Carpoolre/', requestOptions, {
                method: 'POST'
            });

            if (response.ok) {
                const responseJson = await response.json();



                // Return the data if needed
                setLoading(false)
                Alert.alert("Carpool Request Created Successfully!")
            } else {
                setLoading(false)
                Alert.alert("Please Make Sure All Details are Inserted Properly.")
                setLoading(false)
                // console.error('Response error:', response.status);
            }
        } catch (error) {
            setLoading(false)
            "Please Check Details "
        }


    }
    const onPressLocation = () => {
        navigation.navigate('chooseLocation', { getCordinates: fetchValue })
    }


    const onPressLocation2 = () => {
        navigation.navigate('chooseLocation', { getCordinates: fetchValue2 })
    }
    const Getdetails1 = async () => {
        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)
        const jsonValue = await AsyncStorage.getItem('@Data_Key')
        const val = JSON.parse(jsonValue)

        fetch('http://' + ip_add['ip'] + '/api/Customer/' + val['id'], {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setDetailsofuser(responseJson["username"])
                setDetailsoftrip(responseJson["trips_as_client"])
                setDetailsofbalance(responseJson["balance"])
                setDetailsofimage(responseJson['Profile'])


            })
            .catch((error) => {
                console.error(error);
            });


    }
    const GetDateofcarpool = () => {
        const currentDate = new Date();

        // Calculate the next day's date
        const nextDay = new Date();
        nextDay.setDate(currentDate.getDate() + 1);

        // Format the next day's date as 'YYYY-MM-DD'
        const year = nextDay.getFullYear();
        const month = String(nextDay.getMonth() + 1).padStart(2, '0');
        const day = String(nextDay.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
    const Getdetails3 = async () => {
        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)
        const jsonValue = await AsyncStorage.getItem('@Data_Key')
        const val = JSON.parse(jsonValue)

        fetch('http://' + ip_add['ip'] + '/api/Drivernum/' + val['id'], {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setCarpoolnumber(responseJson['Client'])



            })
            .catch((error) => {
                console.error(error);
            });


    }
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            Getdetails3();
            Getdetails1();
        }
    }, [isFocused]);
    const [pressedButton, setPressedButton] = useState(null);

    const handleButtonPressIn = (buttonName) => {
        setPressedButton(buttonName);
        console.log("in")
    };

    const handleButtonPressOut = () => {
        setPressedButton(null);
        console.log("out")
    };

    const isPressed = (buttonName) => {
        return buttonName === pressedButton;
    };
    return (
        <View style={[styles.container, { backgroundColor: "#2921c4" }]}>

            <View style={styles.topview}>
                <View style={styles.welcomecontainer}>
                    <Text style={styles.welcomemessage}>{"Hello," + "<br/>".split("<br/>").join("\n") + Detialsofuser}</Text>

                    {/* <Image source={{ uri: Detialsofimage }} style={styles.circle} /> */}
                    <View>
                    <TouchableOpacity style={{marginBottom:20,marginLeft:15}} onPress={()=>navigation.navigate("Notfication")} >
                            <Ionicons name="notifications" size={24} color="white" />
                        </TouchableOpacity>
                        <Image source={{ uri: Detialsofimage }} style={styles.circle} />
                        
                    </View>

                </View>

            </View>
            <View style={[styles.topview, { backgroundColor: "#3A9EC2", marginBottom: 20 }]}>

            </View>

            <CustomCard elevated={true} style={{ backgroundColor: "#fff", marginHorizontal: 24, marginTop: -40, padding: 10, borderRadius: 10, flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ alignItems: "center", marginLeft: 40 }}>
                    <Text style={{ fontWeight: "bold", marginBottom: 10 }} onPress={() => navigation.navigate("Paymentscreen")}>Balance</Text>
                    <Text onPress={() => navigation.navigate("Paymentscreen")} style={{ fontWeight: "bold", fontSize: 18 }}>RM {Detialsofbalance}</Text>
                </View>
                <View style={{ position: "absolute", left: 150, height: 48, borderWidth: 1, top: 10, width: 0, borderColor: "#494746" }}></View>

                <View style={{ alignItems: "center", marginRight: 40 }}>
                    <Text onPress={() => navigation.navigate("PrivateRoom")} style={{ fontWeight: "bold", marginBottom: 10 }}>Total Trips</Text>
                    <Text onPress={() => navigation.navigate("PrivateRoom")} style={{ fontWeight: "bold", fontSize: 18 }}>{Detialsoftrip}</Text>
                </View>
            </CustomCard>
            <ScrollView style={styles.bottomview}>

                <CustomCard elevated={true} style={{ backgroundColor: "#fff", marginHorizontal: 24, marginTop: 30, padding: 10, borderRadius: 10, flexDirection: "row", justifyContent: "space-between" }}>

                    <View style={{ width: "100%" }}>
                        <View style={{ flexDirection: "row", marginBottom: 15, alignItems: "center" }}>
                            <Icon style={styles.inputIcon} name='my-location' type='ionicons' />
                            <View style={{ marginLeft: 20 }}>
                                <Text style={{ opacity: 0.6, fontSize: 15 }}>From</Text>
                                <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}> </Text>
                            </View>
                            {/* <Text></Text> */}

                            <TouchableOpacity
                                onPress={onPressLocation}
                            >
                                <Text style={{ opacity: 0.6, fontSize: 15, marginLeft: -20, marginTop: 30 }}>{addressof}</Text>
                            </TouchableOpacity>
                            <View style={{ position: "absolute", left: 12, height: 42, borderWidth: 1, top: 40, width: 0, borderColor: "#EBE7E6" }}></View>


                        </View>
                        {/* <View style={{ position: "absolute", left: 12, height: 48, borderWidth: 1, top: 52, width: 0, borderColor: "#EBE7E6" }}></View> */}
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Icon style={styles.inputIcon} name='location-pin' type='ionicons' />
                            <View style={{ marginLeft: 20 }}>
                                <Text style={{ opacity: 0.6, fontSize: 15, marginTop: 10 }}>To</Text>
                                <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}></Text>
                            </View>
                            <TouchableOpacity
                                onPress={onPressLocation2}
                            >
                                <Text style={{ opacity: 0.6, fontSize: 15, marginLeft: -1, marginTop: 40 }}>{addressof2}</Text>
                            </TouchableOpacity>
                            <View style={{ position: "absolute", left: 12, height: 48, borderWidth: 1, top: 52, width: 0, borderColor: "#EBE7E6" }}></View>

                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Icon style={styles.inputIcon} name='date-range' type='ionicons' />
                            <View style={{ marginLeft: 20 }}>
                                <Text style={{ opacity: 0.6, fontSize: 15, marginTop: 30 }}>Date</Text>
                                <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10, left: 18 }}>{GetDateofcarpool()}</Text>
                            </View>

                            <View style={{ position: "absolute", left: 12, height: 48, borderWidth: 1, top: 52, width: 0, borderColor: "#EBE7E6" }}></View>

                        </View>

                        <View style={{ flexDirection: "row", marginBottom: 15, marginTop: 30, alignItems: "center" }}>
                            <Icon style={styles.inputIcon} name='timer' type='ionicons' />
                            <View style={{ marginLeft: 20 }}>
                                <Text style={{ opacity: 0.6, fontSize: 15 }}>Time</Text>
                                <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}> </Text>
                            </View>
                            {/* <Text></Text> */}

                            <TouchableOpacity style={{ marginTop: 5 }} onPress={showPicker}>
                                <Text style={{ opacity: 0.6, fontSize: 15, marginLeft: -20, marginTop: 30 }} >{time.toLocaleTimeString()}</Text>
                            </TouchableOpacity>
                            {showTimePicker && (
                                <DateTimePicker
                                    value={time}
                                    mode="time"
                                    is24Hour={true}
                                    display="default"
                                    onChange={handleTimeChange}
                                />
                            )}
                            <View style={{ position: "absolute", left: 155, height: 48, borderWidth: 1, top: 12, width: 0, borderColor: "#494746" }}></View>
                            <View style={{ marginLeft: 40 }}>
                                <Text style={{ opacity: 0.6, fontSize: 15 }}>Seat Needed</Text>
                                <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}> </Text>
                            </View>
                            <View style={styles.productAmount}>
                                <TouchableOpacity style={styles.amountButton} onPress={onDecrement}>
                                    <Text style={styles.amountButtonText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.amountText}>{products}</Text>
                                <TouchableOpacity style={styles.amountButton} onPress={onIncrement}>
                                    <Text style={styles.amountButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>

                        </View>


                    </View>


                </CustomCard>
                {/* <TouchableOpacity style={styles.loginButton} onPress={() => Posttoserver()}>
                    {isLoading == false ? <Text style={styles.loginButtonText}>Find Driver</Text> : <ActivityIndicator size="small" color="#FFFFFF" />}

                </TouchableOpacity> */}
                {/* <TouchableOpacity
                    style={[
                        styles.button,
                        styles.infoButton,
                        isPressed('info') && styles.buttonPressed,
                    ]}
                    onPressIn={() => handleButtonPressIn('info')}
                    onPressOut={handleButtonPressOut}
                    onPress={() => Posttoserver()}
                >
                    {isLoading == false ? <Text style={styles.buttonText}>Find Driver</Text> : <ActivityIndicator size="small" color="#FFFFFF" />}

                </TouchableOpacity> */}
                <TouchableOpacity style={styles.loginButton} onPress={() => Posttoserver()}>
                    {isLoading == false ? <Text style={styles.loginButtonText}>Find Driver</Text> : <ActivityIndicator size="small" color="#FFFFFF" />}

                </TouchableOpacity>


            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    // topview: {
    //     marginTop: 60,
    //     marginHorizontal: 24,
    //     backgroundColor: "#3A9EC2",
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center"
    // },
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



    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 60,
        borderRadius: 30,
        borderWidth: 0.2,
        borderColor: '#eee',
        borderBottomWidth: 8,
        marginVertical: 10,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
        marginLeft: 80
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',

    },
    infoButton: {
        backgroundColor: '#2196f3',
        borderColor: '#0e3860',
        shadowColor: '#1c5da6',
    },
    buttonPressed: {
        transform: [{ translateY: 2 }],
        shadowOffset: { width: 0, height: 0 },
        borderBottomWidth: 0,
    },
    productAmount: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -70,
        marginTop: 30,

    },
    amountButton: {
        width: 30,
        height: 30,
        backgroundColor: '#ffa726',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    amountButtonText: {
        color: '#fff',
        fontSize: 18,

    },
    amountText: {
        // fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 16,
        opacity: 0.6, fontSize: 15

    },

});
export default HomeScreen;