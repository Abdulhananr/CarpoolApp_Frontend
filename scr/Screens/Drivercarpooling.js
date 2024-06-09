import React, { useState, useRef, useEffect, Component } from 'react';
import { StyleSheet, Alert, ActivityIndicator, View, Platform, LogBox, FlatList, ImageBackground, Button, Image, ScrollView, Dimensions, PlatformTextInput, TouchableOpacity, Text, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { CustomCard } from './CustomCard';
import bus from '../assets/images/bus.png';
import mrt from '../assets/images/mrt.jpg';
import { Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

function Drivercarpooling(props) {
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [Detialsofuser, setDetailsofuser] = useState(null);
  const [Detialsofbalance, setDetailsofbalance] = useState(null);
  const [Detialsoftrip, setDetailsoftrip] = useState(null);
  const [Detialsofimage, setDetailsofimage] = useState(null);
  const [Carpoolnumber, setCarpoolnumber] = useState(1);
  const [products, setProducts] = useState(1);
  const onIncrement = () => {
    setProducts(products + 1)
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

  const [addressof, setAddressof] = useState("Your Location..?")
  const [addressof2, setAddressof2] = useState("Where Do You Want to go..?")

  const { destinationCords, pickupCords } = state
  const fetchValue2 = (data) => {
    setAddressof2(data.destinationCords.address)
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

    if (modifier === 'pm') {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}:00`;
  };
  const convertDateFormat = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  };
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
    const jsonValue = await AsyncStorage.getItem('@Data_Key')
    const val = JSON.parse(jsonValue)

    console.log("The Driver id is ----->", parseInt(val["id"]))
    console.log("time is --->", typeof convertTimeTo24HourFormat(time.toLocaleTimeString()))
    console.log("Pickup location--->", pickupCords.latitude, pickupCords.longitude)
    console.log("Destination location--->", destinationCords.latitude, destinationCords.longitude)
    // DCarpoolre
    const ip = await AsyncStorage.getItem('@Data_Ip')
    const ip_add = JSON.parse(ip)
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
    console.log(Carpoolnumber)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        "lat": pickupCords.latitude,
        "long": pickupCords.longitude,
        "des_lat": destinationCords.latitude,
        "des_long": destinationCords.longitude,
        "client_id": 0,
        "assien_driver": val["id"],
        "date": getCurrentDate(),
        "time": convertTimeTo24HourFormat(time.toLocaleTimeString()),
        "price": distance.toFixed(2),
        "seat": products,
        "distance": distance,
        "status": "Pending",
        "client_request_number": 0,
        "driver_request_number": Carpoolnumber,
        "range": parseInt(selectedValue)



      })
    };

    setCarpoolnumber(Carpoolnumber + 1)

    fetch('http://' + ip_add['ip'] + '/api/DCarpoolre/', requestOptions)
      .then((response) => response.json())
      .catch((error) => { Alert.alert("Please Check Details ") })
    Alert.alert("Carpool Activity Created Successfully!")


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
        setDetailsoftrip(responseJson["trips_as_captain"])
        setDetailsofbalance(responseJson["point"])
        setDetailsofimage(responseJson['Profile'])


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
  const isFocused = useIsFocused();
  const [selectedValue, setSelectedValue] = useState('Medium');

  useEffect(() => {
    if (isFocused) {
      Getdetails3();
      Getdetails1();
    }
  }, [isFocused]);
  return (
    <View style={[styles.container, { backgroundColor: "#2921c4" }]}>

      <View style={styles.topview}>
        <View style={styles.welcomecontainer}>
          <Text style={styles.welcomemessage}>{"Hello," + "<br/>".split("<br/>").join("\n") + Detialsofuser}</Text>
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
                <Text style={{ opacity: 0.6, fontSize: 15, marginTop: 10 }}>Date</Text>
                <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10, left: 20 }}>{GetDateofcarpool()}</Text>
              </View>

              <View style={{ position: "absolute", left: 12, height: 48, borderWidth: 1, top: 52, width: 0, borderColor: "#EBE7E6" }}></View>

            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon style={styles.inputIcon} name='wifi' type='ionicons' />
              <View style={{ marginLeft: 20 }}>
                <Text style={{ opacity: 0.6, fontSize: 15, marginTop: 30 }}>Willingness to Travel (Fetch Further Passenger) </Text>
                <Picker
                  selectedValue={selectedValue}
                  onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                  style={styles.dropdown}
                  itemStyle={styles.dropdownItem}
                >
                  <Picker.Item label="Low" value="5" />
                  <Picker.Item label="Medium" value="7" />
                  <Picker.Item label="High" value="10" />
                </Picker>
              </View>

              <View style={{ position: "absolute", left: 12, height: 48, borderWidth: 1, top: 70, width: 0, borderColor: "#EBE7E6" }}></View>

            </View>



            <View style={{ flexDirection: "row", marginBottom: 15, marginTop: 10, alignItems: "center" }}>
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
                <Text style={{ opacity: 0.6, fontSize: 15 }}>Seat Available</Text>
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

        <TouchableOpacity style={styles.loginButton} onPress={() => Posttoserver()}>
          {isLoading == false ? <Text style={styles.loginButtonText}>CREATE Carpool</Text> : <ActivityIndicator size="small" color="#FFFFFF" />}

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
  dropdown: {
    height: 40,
    width: '100%',
    paddingHorizontal: 5,
  },
  dropdownItem: {
    fontSize: 16,
    fontFamily: 'Arial',
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
  productAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -80,
    marginTop: 30
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
export default Drivercarpooling;