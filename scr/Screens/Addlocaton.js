import React, { useState, useRef, useEffect, Component } from 'react';
import { StyleSheet, Alert, ActivityIndicator, View, Platform, LogBox, ImageBackground, Button, Image, ScrollView, Dimensions, PlatformTextInput, TouchableOpacity, Text, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';


LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function Addlocaton() {
  const back1 = require("../assets/Mainicon.png");
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isLoading, setLoading] = useState(false);

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

  const [addressof, setAddressof] = useState("Your Pickup Location..?")
  const [addressof2, setAddressof2] = useState("Where Do You Want to go..?")

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
          navigation.navigate("DriverList", { "obj": responseJson["Selected_driver"], "id2": id2 })
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
        "date": convertDateFormat(selectedDate.toDateString()),
        "time": convertTimeTo24HourFormat(time.toLocaleTimeString())

      })
    };

    fetch('http://' + ip_add['ip'] + '/api/Carpoolre/', requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {

        Getserver(ip_add['ip'], responseJson["client_id"], responseJson["id"])
        setLoading(false)
      })
      .catch((error) => { Alert.alert("Please Check Detials ") })
    Alert.alert("Congraulation ! Your Carpool is Done We can find Driver")









    // setTimeout(() => {
    //   setLoading(false)
    //   // navigation.navigate("Driverlist")

    // }, 4000)


  }
  const onPressLocation = () => {
    navigation.navigate('chooseLocation', { getCordinates: fetchValue })
  }


  const onPressLocation2 = () => {
    navigation.navigate('chooseLocation', { getCordinates: fetchValue2 })
  }

  return (
    <ScrollView>
      <View style={styles.container}>
      <Image source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar1.png' }}  />

        <View style={styles.CircleShape} />


        <View style={styles.formContainer}>
          <View style={styles.card}>

            <View style={{ flexDirection: 'row' }}>
              <Icon
                style={styles.inputIcon}
                name='my-location'
                type='ionicons'

              />
              <View style={styles.bottomCard}>
                <Text>{addressof}</Text>
                <TouchableOpacity
                  onPress={onPressLocation}
                  style={styles.inpuStyle}
                >
                  <Text>Choose Your Location</Text>
                </TouchableOpacity>
                {/* </View> */}

              </View>
            </View>




          </View>
          <View style={styles.card}>
            <View style={{ flexDirection: 'row' }}>



              <View style={{ flexDirection: 'row' }}>
                <Icon
                  style={styles.inputIcon}
                  name='location-pin'
                  type='ionicons'

                />
                <View style={styles.bottomCard}>
                  <Text>{addressof2}</Text>
                  <TouchableOpacity
                    onPress={onPressLocation2}
                    style={styles.inpuStyle}
                  >
                    <Text>Choose Your Location</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </View>

          <View style={styles.card} >

            <View style={{ flexDirection: 'row' }}>
              <Icon
                style={styles.inputIcon}
                name='watch'
                type='ionicons'

              />

              <TouchableOpacity onPress={showPicker}>
                <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 15, marginTop: 5 }} >Select Time</Text>
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
              {time && <Text style={{ marginTop: 5, marginLeft: 10 }}>{time.toLocaleTimeString()}</Text>}


            </View>

          </View>
          <View style={styles.card} >


            <View style={{ flexDirection: 'row' }}>
              <Icon
                style={styles.inputIcon}
                name='date-range'
                type='ionicons'

              />
              <TouchableOpacity style={{ marginTop: 5 }} onPress={showDatepicker}>
                <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 15 }} >Select Date</Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
              {selectedDate && <Text style={{ marginTop: 5, marginLeft: 10 }}>{selectedDate.toDateString()}</Text>}

            </View>
            {/* isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker} */}

          </View>
          {/* () => navigation.navigate("DriverList") */}
          <TouchableOpacity style={styles.loginButton} onPress={() => Posttoserver()}>
            {isLoading == false ? <Text style={styles.loginButtonText}>Find Driver</Text> : <ActivityIndicator size="small" color="#FFFFFF" />}


          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  formContainer: {
    marginHorizontal: 20,
    marginTop: 350,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#2596be'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    datePickerStyle: {
      width: 200,
      marginTop: 20,


    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 30,
    padding: 5,
  },
  input: {
    height: 40,
    paddingHorizontal: 50,
    borderBottomWidth: 1,
    // backgroundColor: '#f1f3f6',

    borderBottomColor: '#FFF',
    // color:'#333'



  },
  inputIcon: {
    // marginTop:3,
    marginLeft: 10,
    marginTop: 6,
    // alignContent: 'center',
    paddingHorizontal: 5,

  },
  loginButton: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  Iconstyle: {
    width: 200,
    height: 200,
    marginLeft: 90,
    alignItems: 'center',
    position: 'absolute',

    height: 250,
    marginTop: 60,
    resizeMode: 'contain'
  },
  CircleShape: {
    width: 500,
    height: 500,
    marginLeft: -60,
    marginTop: -170,
    borderRadius: 500 / 2,
    position: 'absolute',
    backgroundColor: '#2596be',
  },

});
export default Addlocaton;