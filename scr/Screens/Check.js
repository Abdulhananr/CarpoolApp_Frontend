import React, { useState, useEffect, Component, useRef } from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
function Check() {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('window');
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@Data_Key', jsonValue)
    } catch (e) {
      // console.log(e)
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@Data_Key')

      const val = JSON.parse(jsonValue)
      const ip = await AsyncStorage.getItem('@Data_Ip')
      const ip_add = JSON.parse(ip)
      // console.log(ip_add['ip'])
      fetch('http://' + ip_add['ip'] + '/api/Login/' + val["email"] + '/' + val["password"], {
        method: 'GET'
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson['statusCode'] == 200) {
            setTimeout(() => {
              navigation.navigate("Mainscreen");
            }, 2000)
          }
          else {
            setTimeout(() => {
              navigation.navigate("Home");
            }, 2000)
          }
        })
        .catch((error) => {
          setTimeout(() => {
            navigation.navigate("Home");
          }, 2000)

        });

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      navigation.navigate("Ipsaver");

    }
  }
  useEffect(() => {
    // navigation.navigate("Ipsaver");
    getData()
  });
  return (
    <View style={{ flex: 1 }}>
      <LottieView style={{ position: 'absolute', alignItems: 'center', marginBottom: 0.3 }} source={require('../assets/97952-loading-animation-blue')} autoPlay />
    </View>

  )
}

export default Check