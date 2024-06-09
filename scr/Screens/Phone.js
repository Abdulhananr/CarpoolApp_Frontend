import React, { useState, useEffect, Component, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import NunitoLight from '../assets/fonts/NunitoSans-Light.ttf';
import NunitoBold from '../assets/fonts/NunitoSans-Bold.ttf';
import NunitoExtraBold from '../assets/fonts/NunitoSans-ExtraBold.ttf';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ImagePicker from 'expo-image-picker';
import { useFonts } from 'expo-font';

import { ScrollView } from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

function Phone({ route }) {
  const [loaded] = useFonts({
    NunitoLight,
    NunitoBold,
    NunitoExtraBold,
  });
  const [search, setSearch] = useState();
  const phoneInput = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  const getPhoneNumber = () => {
    Alert.alert(phoneNumber);
  };
  const [text, onChangeText] = useState("");


  const back1 = require("../assets/Mainicon.png");
  const [image, setImage] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image2, setImage2] = useState(null);

  const [image4, setImage4] = useState(null);

  const [result1, setresult1] = useState(null);
  const [result2, setresult3] = useState(null);
  const [result3, setresult2] = useState(null);
  const [result4, setresult4] = useState(null);

  const [ID, setId] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [isLoading1, setisLoading1] = useState(false);
  const [isLoading2, setisLoading2] = useState(false);
  const [isLoading4, setisLoading4] = useState(false);
  const [BucketNumber, setBucketNumber] = useState(null);




  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const removeData = async () => {
    await AsyncStorage.removeItem('@Data_Key');
    navigation.navigate("Home")

  }
  
  const postToServer = async () => {
    var carmodel = route.params.obj.carnumber

    const ip = await AsyncStorage.getItem('@Data_Ip')
    const ip_add = JSON.parse(ip)
    const formData = new FormData();
    let name_pic = "Testing" + ".jpg"
    let name_pic2 = "Testing1" + ".jpg"
    let name_pic3 = "Testing2" + ".jpg"
    let profile_name = "Profile" + ".jpg"
    console.log(BucketNumber)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        "username": route.params.obj.username,
        "email": route.params.obj.email,
        "password": route.params.obj.password,
        "phone": phoneNumber,
        "carplate": route.params.obj.carplate,
        "carmodel": route.params.obj.carnumber,
        "image1": null,
        "image2": null,
        "image3": null,
        "balance": 0,
        "trips_as_client": 0,
        "trips_as_captain": 0,
        "Profile": null,
        "expo_token":null,
        "point": 0,
        "as_client_buket": BucketNumber,
        "as_driver_bucket": BucketNumber




      })
    };
    try {
      const response = await fetch('http://' + ip_add['ip'] + '/api/Customer/', requestOptions, {
        method: 'POST'
      });

      if (response.ok) {
        const responseJson = await response.json();
        Alert.alert("Account Is  Created Successfully!")
        // navigation.navigate("Home")

      } else {
        Alert.alert("Please Make Sure All Details are Inserted Properly.")
      }
    } catch (error) {
      "Please Check Details "
    }


  }


  const Bucketnumbercode = async () => {
    const ip = await AsyncStorage.getItem('@Data_Ip')
    const ip_add = JSON.parse(ip)
    const jsonValue = await AsyncStorage.getItem('@Data_Key')
    const val = JSON.parse(jsonValue)

    fetch('http://' + ip_add['ip'] + '/api/Dlocation/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "did": 0,
        "lat": 0.0,
        "long": 0.0
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data

        setBucketNumber(data['id'])
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  }
  useEffect(() => {
    Bucketnumbercode()
    console.log("Hello")
  }, [])
  const Check_data = async () => {

    // navigation.navigate("Ver_pen",{"Phone":phoneNumber})
    const obj = { username: route.params.obj.username, password: route.params.obj.password, email: route.params.obj.email, carnumber: route.params.obj.carnumber, carplate: route.params.obj.carplate, "Phone": phoneNumber };
    console.log(obj)
    const ip = await AsyncStorage.getItem('@Data_Ip')
    const ip_add = JSON.parse(ip)
    fetch('http://' + ip_add['ip'] + '/api/Check/' + phoneNumber, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setSearch(responseJson)
        if (responseJson['statusCode'] == 200) {
          // navigation.navigate("Ver_pen", { obj })
          // const obj = { username: route.params.obj.username, password: route.params.obj.password, email: route.params.obj.email, carnumber: route.params.obj.carnumber, carplate: route.params.obj.carplate, phone: route.params.obj.Phone };
          // navigation.navigate("Uploadimg", { obj })
          postToServer()
        }
        else {
          Alert.alert("This Number is Also Registered record")
        }
      })
      .catch((error) => {
      });
  }



  if (!loaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  var data = ''
  return (


    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>


      <LinearGradient style={styles.container} colors={['#333', '#303030']}>
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 30,
              fontFamily: 'NunitoExtraBold',
            }}
          >
            CarPool Mobile!
          </Text>
          <LottieView style={{ height: 200, marginLeft: 25 }} source={require('../assets/104743-yellow-car-loading')} autoPlay />

        </View>
        <Text
          style={{
            color: '#fff',
            fontSize: 24,
            marginTop: 14,
            fontFamily: 'NunitoBold',
          }}
        >
          Enter Your New Number
        </Text>
        {/* Number Input */}
        <View style={styles.inputTopMorph}>
          <View style={styles.inputBottomMorph}>
            <PhoneInput
              ref={phoneInput}
              defaultValue={phoneNumber}
              defaultCode="PK"
              layout="first"
              withShadow
              autoFocus
              containerStyle={styles.input}
              textContainerStyle={{ paddingVertical: 0 }}
              onChangeFormattedText={text => {
                setPhoneNumber(text);
              }}
            />

          </View>
        </View>
        {/* Continue Button */}
        <TouchableOpacity style={styles.buttonOpacity} onPress={() => Check_data()}>
          <View style={styles.buttonView}>
            <Text style={styles.buttonText}>continue</Text>
          </View>
        </TouchableOpacity>
        {/* New User */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}
        >


        </View>

      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  inputTopMorph: {
    width: '100%',
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#333',
    elevation: 5,
    shadowOffset: {
      width: -12,
      height: -12,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowColor: '#252525',
  },
  inputBottomMorph: {
    backgroundColor: '#333',
    borderRadius: 10,
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowColor: '#414141',
  },
  input: {
    width: '100%',
    height: 50,
    fontSize: 18,
    paddingHorizontal: 10,
    fontFamily: 'NunitoLight',
    color: '#f1f3f6',
  },
  buttonOpacity: {
    width: '100%',
    height: 50,
    marginTop: 22,
    borderRadius: 10,
    backgroundColor: '#2e2e2e',
    elevation: 5,
    shadowOffset: {
      width: -6,
      height: -6,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowColor: '#1d1d1d',
  },
  buttonView: {
    backgroundColor: '#2e2e2e',
    borderRadius: 10,
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowColor: '#3f3f3f',
  },
  buttonText: {
    fontFamily: 'NunitoBold',
    fontSize: 20,
    color: '#fafafa',
    marginVertical: 10,
    textAlign: 'center',
  },
  iconTouchable: {
    borderRadius: 10,
    backgroundColor: '#2e2e2e',
    elevation: 5,
    shadowOffset: {
      width: -6,
      height: -6,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowColor: '#1d1d1d',
    marginHorizontal: 10,
  },
  iconView: {
    backgroundColor: '#2e2e2e',
    borderRadius: 10,
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowColor: '#3f3f3f',
    padding: 14,
  },
});

export default Phone;
