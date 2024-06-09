import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer, useIsFocused, useNavigation, ActivityIndicator } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, Button, Platform, View, Image, TouchableOpacity, Alert } from 'react-native'
import SourceSansProLight from '../assets/Font/SourceSansPro-Light.ttf';
import SourceSansProRegular from '../assets/Font/SourceSansPro-Regular.ttf';
import SourceSansProBold from '../assets/Font/SourceSansPro-Bold.ttf';
import { useFonts } from 'expo-font';
import LottieView from 'lottie-react-native';


function Profile() {
  const navigation = useNavigation();
  const [Detialsofuser, setDetailsofuser] = useState(null);
  const [Detialsofbalance, setDetailsofbalance] = useState(null);
  const [Detialsoftrip, setDetailsoftrip] = useState(null);
  const [Detialsofimage, setDetailsofimage] = useState(null);
  const [Profileofuser, setProfileofuser] = useState(null)
  const [Detialsofuser2, setDetailsofuser2] = useState(null);
  const [loaded] = useFonts({
    SourceSansProLight,
    SourceSansProRegular,
    SourceSansProBold,
  });
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
        setDetailsoftrip(val['id'])
        setDetailsofbalance(responseJson["balance"])
        setDetailsofimage(responseJson['Profile'])
        setDetailsofuser(responseJson['email'])
        setDetailsofuser2(responseJson["username"])
        setProfileofuser(responseJson)

      })
      .catch((error) => {
        console.error(error);
      });


  }
  const [isLoading2, setIsLoading2] = useState(false);
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

      })
      .catch((error) => {
        console.error(error);
      });
    //Sheduler Pickup
    fetch('http://' + ip_add['ip'] + '/api/Shedulder', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {

      })
      .catch((error) => {
        console.error(error);
      });
    //Sheduler of Dropoff
    fetch('http://' + ip_add['ip'] + 'api/Sheduldedrop', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        Alert.alert("The GARUN")

      })
      .catch((error) => {
        console.error(error);
      });



  }

  const removeData = async () => {
    await AsyncStorage.removeItem('@Data_Key');


    setIsLoading2(true);

    setTimeout(() => {
      setIsLoading2(false);
      navigation.navigate("Home")
    }, 1000);
  }
  const Check = () => {

    try{
      if (Profileofuser['carplate'] == null) {
        Alert.alert("Please Enter Your Car Plate Details")
      }
      else if (Profileofuser['carmodel']==null) {
        Alert.alert("Please Enter Your Car Model Details")
      }
  
      else if (Profileofuser['image1']==null) {
        if (Profileofuser['image2'] != null) {
          Alert.alert("Please Enter Your Car Plate Details")
        }
        else if (Profileofuser['image3'] != null) {
          navigation.navigate("DriverScreen")
        }
        else {
          Alert.alert("Please Enter Atleast One Image")
        }
      }
      else {
        navigation.navigate("DriverScreen")
  
  
      }

    }
    catch(err){

    }







  }


  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      Getdetails2();
    }
  }, [isFocused]);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={{ uri: Detialsofimage }}
          />

          <Text style={styles.name}>{Detialsofuser2}</Text>
          <Text style={styles.userInfo}>{Detialsofuser}</Text>
          {/* <Text style={styles.userInfo}> </Text> */}
        </View>
      </View>

      <View style={styles.body}>
        {/* <View style={styles.item}>

          <View style={styles.infoContent}>
            <Text onPress={() => navigation.navigate("Paymentscreen")} style={styles.info}>Add Balance</Text>
          </View>
        </View> */}


        <View style={styles.item}>

          <View style={styles.infoContent1} >
            <Text onPress={() => navigation.navigate("Sample")} style={styles.info}>{""}Customer Support</Text>
          </View>
        </View>
        <View style={styles.item}>

          <View style={styles.infoContent}>
            <Text onPress={() => Check()} style={styles.info}>{'  '}Driver Mode</Text>
          </View>
        </View>


        <View style={styles.item}>

          <View style={styles.infoContent1} >
            <Text onPress={() => navigation.navigate("Redeem")} style={styles.info}>{'      '}Edit Profile</Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.infoContent} >
            <Text onPress={() => removeData()} style={styles.info}>{"      "}Logout</Text>

          </View>

        </View>

      </View>
      {isLoading2 && (
        <LottieView style={{ position: 'absolute', alignItems: 'center', marginBottom: 0.3 }} source={require('../assets/97952-loading-animation-blue')} autoPlay />

      )}
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2921c4",
  },
  loaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  loaderText: {
    marginLeft: 10,
    fontSize: 16,
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: '600',

  },
  userInfo: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
  },
  body: {
    backgroundColor: '#FFF',
    height: 500,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContent: {
    flex: 1,

    alignItems: 'flex-start',
    paddingLeft: 5,
    fontFamily: "SourceSansProBold"
  },
  infoContent1: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 10,
    marginLeft: -20,
    fontFamily: "SourceSansProBold"
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 40,
    marginLeft: 130,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold'
  },


})


export default Profile;