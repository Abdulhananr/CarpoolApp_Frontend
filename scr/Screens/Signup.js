import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Alert, Text, ScrollView, View, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Keyboard, } from 'react-native';
import { Card, FAB, Checkbox } from 'react-native-paper';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
// import {Icon} from 'react-native-vector-icons/FontAwesome';

import BackgroundImage from '../assets/Hello.jpg';
import SourceSansProLight from '../assets/Font/SourceSansPro-Light.ttf';
import SourceSansProRegular from '../assets/Font/SourceSansPro-Regular.ttf';
import SourceSansProBold from '../assets/Font/SourceSansPro-Bold.ttf';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Signup() {
  const [username, setusername] = useState('');
  const [carplate, setcarplate] = useState('');
  const [carnumber, setcarnumber] = useState('');
  const [password, setpassword] = useState('');
  const [c_password, setcpassword] = useState('');
  const [email, setemail] = useState('');
  const navigation = useNavigation();
  const [checked, setChecked] = React.useState(false);
  const [loaded] = useFonts({
    SourceSansProLight,
    SourceSansProRegular,
    SourceSansProBold,
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  if (!loaded || !BackgroundImage) {
    return <Text>Loading...</Text>;
  }
  const obj = { username: username, password: password, email: email, carnumber: carnumber, carplate: carplate };

  console.log(obj)
  const componentDidMount = async () => {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (username.length == 0) {
      Alert.alert("UserName is Empty !!!")
    }

    else if (email.length == 0) {

      Alert.alert("Email is Empty !!!")
    }
    else if (password.length == 0) {
      Alert.alert("Password is Empty !!!")
    }
    // else if (carnumber.length == 0) {
    //   Alert.alert("Car Model is Empty !!!")
    // }
    // else if (carplate.length == 0) {
    //   Alert.alert("Password is less than 8-digit!!!")
    // }

    else if (c_password != password) {
      Alert.alert("Re-Cofrome password is Empty!!!")
    }
    else if (c_password.length == 0) {
      Alert.alert("Password is Empty !!!")
    }
    else if (c_password.length < 8) {
      Alert.alert("Password is less than 8-digit!!!")
    }
    else if (pattern.test(email) == false) {
      Alert.alert("Email Is Not Valid")
    }


    else {

      if (username.length != 0) {
        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)
        fetch('http://' + ip_add['ip'] + '/api/Checkusername/' + username, {
          method: 'GET'
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson['statusCode'] == 200) {
              // navigation.navigate("Ver_pen", { obj })
              if (email.length != 0) {
                fetch('http://' + ip_add['ip'] + '/api/Checkemail/' + email, {
                  method: 'GET'
                })
                  .then((response) => response.json())
                  .then((responseJson) => {
                    if (responseJson['statusCode'] == 200) {
                      navigation.navigate("Phone", { obj })
                      // console.log(obj)


                    }
                    else {
                      Alert.alert("This Email is Also Registered record")
                    }
                  })
                  .catch((error) => {
                    console.log(error)
                  });
              }
            }
            else {
              Alert.alert("This Username is Also Registered record")
            }
          })
          .catch((error) => {
            console.log(error)
          });

      }
    }

  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Image
            style={{ flex: 1, width: null, marginTop: -280 }}
            source={BackgroundImage}
          />
        </View>
        <Animatable.Text
          style={styles.titleText}
          animation='fadeInUp'
          delay={1200}

        >
          CarPool Mobile
        </Animatable.Text>
        <View style={styles.bottomView}>
          <Text style={styles.loginText}>Sign Up</Text>
          <View style={styles.inputView}>
            <Icon
              style={styles.inputIcon}
              name='person'
              type='ionicons'
              color='#5352ed'
            />
            <TextInput
              style={styles.input}
              placeholder='Username'
              autoCapitalize='none'
              keyboardType='email-address'
              textContentType='emailAddress'
              onChangeText={username => setusername(username)}
              defaultValue={username}
            />
          </View>
          <View style={styles.inputView}>
            <Icon
              style={styles.inputIcon}
              name='email'
              type='ionicons'
              color='#5352ed'
            />
            <TextInput
              style={styles.input}
              placeholder='Email'
              autoCapitalize='none'
              keyboardType='email-address'
              textContentType='emailAddress'
              onChangeText={email => setemail(email)}
              defaultValue={email}
            />
          </View>
          <View style={styles.inputView}>
            <Icon
              style={styles.inputIcon}
              name='credit-card'
              type='ionicons'
              color='#5352ed'
            />
            <TextInput
              style={styles.input}
              placeholder='Car Model'
              autoCapitalize='none'
              keyboardType='email-address'
              textContentType='emailAddress'
              onChangeText={carnumber => setcarnumber(carnumber)}
              defaultValue={carnumber}
            />
          </View>
          <View style={styles.inputView}>
            <Icon
              style={styles.inputIcon}
              name='credit-card'
              type='ionicons'
              color='#5352ed'
            />
            <TextInput
              style={styles.input}
              placeholder='Car plate'
              autoCapitalize='none'
              keyboardType='email-address'
              textContentType='emailAddress'
              onChangeText={carplate => setcarplate(carplate)}
              defaultValue={carplate}
            />
          </View>

          <View style={styles.inputView}>
            <Icon
              style={styles.inputIcon}
              name='lock'
              type='ionicons'
              color='#5352ed'
            />
            <TextInput
              style={styles.input}
              placeholder='Password'
              secureTextEntry={!showPassword}
              onChangeText={password => setpassword(password)}
              autoCapitalize='none'
              defaultValue={password}
            />
             <Text color='#5352ed'
              onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'}

            </Text>
          </View>
          <View style={styles.inputView}>
            <Icon
              style={styles.inputIcon}
              name='lock'
              type='ionicons'
              color='#5352ed'
            />
            <TextInput
              style={styles.input}
              placeholder='Conform Password'
              secureTextEntry={!showPassword}
              onChangeText={c_password => setcpassword(c_password)}
              autoCapitalize='none'
              defaultValue={c_password}
            />
            
            <Text color='#5352ed'
              onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'}

            </Text>
          </View >




          <TouchableOpacity style={styles.loginButton} onPress={() => componentDidMount()}>

            <Text style={styles.loginButtonText}>Next</Text>
          </TouchableOpacity>
          <Text style={styles.registerText}>
            Don You have already account?
            <Text style={{ color: '#5352ed', fontFamily: 'SourceSansProBold' }} onPress={() => navigation.navigate("Home")}>
              {' Login'}
            </Text>
          </Text>
        </View>

      </View>

    </TouchableWithoutFeedback>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    position: 'absolute',
    top: Dimensions.get('screen').height * 0.1,
    alignSelf: 'center',
    color: '#FFF',
    fontFamily: 'SourceSansProBold',
    fontSize: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  bottomView: {
    backgroundColor: '#fff',
    opacity: 0.95,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  loginText: {
    fontFamily: 'SourceSansProBold',
    fontSize: 24,
    marginTop: 12,
    marginBottom: 4,
  },
  inputView: {
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f1f3f6',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    paddingHorizontal: 8,
  },
  input: {
    height: 40,
    flex: 1,
    fontFamily: 'SourceSansProRegular',
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#5352ed',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontFamily: 'SourceSansProBold',
    alignSelf: 'center',
    fontSize: 18,
  },
  registerText: {
    alignSelf: 'center',
    marginTop: 12,
    fontFamily: 'SourceSansProRegular',
    fontSize: 16,
  },
  fpText: {
    marginTop: 10,
    alignSelf: 'flex-end',
    fontFamily: 'SourceSansProBold',
    fontSize: 16,
    color: '#5352ed',
  },
});

export default Signup
