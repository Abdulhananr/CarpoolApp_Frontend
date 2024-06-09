import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Alert, Text, View, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Keyboard, } from 'react-native';
import { Card, FAB, Button, Snackbar } from 'react-native-paper';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from '../assets/Hello.jpg';
import SourceSansProLight from '../assets/Font/SourceSansPro-Light.ttf';
import SourceSansProRegular from '../assets/Font/SourceSansPro-Regular.ttf';
import SourceSansProBold from '../assets/Font/SourceSansPro-Bold.ttf';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

function Home() {
  const [visible, setVisible] = React.useState(false);


  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [Userdata, setSearch] = useState([]);
  const navigation = useNavigation();
  const [isLoading2, setIsLoading2] = useState(false);
  const [loading, setLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [loaded] = useFonts({
    SourceSansProLight,
    SourceSansProRegular,
    SourceSansProBold,
  });
  if (!loaded || !BackgroundImage) {
    return <Text>Loading...</Text>;
  }
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@Data_Key', jsonValue)
    } catch (e) {
      // console.log(e)
    }
  }

  const Check_data = async () => {
    const ip = await AsyncStorage.getItem('@Data_Ip')
    const ip_add = JSON.parse(ip)

    if (username.length != 0) {
      // abdulhanan2090@gmail.com/password@123
      fetch('http://' + ip_add['ip'] + '/api/Login/' + username + '/' + password, {
        method: 'GET'
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setSearch(responseJson)
          if (responseJson['statusCode'] == 200) {
            setIsLoading2(true);
            storeData({ id: responseJson["data"], email: username, password: password,username:responseJson['username'],image:responseJson['Profile'] })
            setTimeout(() => {
              setIsLoading2(false);
              navigation.navigate("Mainscreen")
            }, 1000);
            
            // console.log(Userdata)
          }
          else {
            onToggleSnackBar()
          }
        })
        .catch((error) => {
          //  console.error(error);
        });

    }
    else {
      Alert.alert("Please Enter Your Phone Number")
    }

  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>

        <View style={{ flex: 1 }}>
          <Image
            style={{ flex: 1, width: null, marginTop: -260 }}
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
          <Text style={styles.loginText}>Login</Text>
          <View style={styles.inputView}>
            <Icon
              style={styles.inputIcon}
              name='person'
              type='ionicons'
              color='#5352ed'
            />
            <TextInput
              style={styles.input}
              placeholder='Email'
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
          <TouchableOpacity style={styles.loginButton} onPress={() => Check_data()}>

            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity >
          <Text style={styles.registerText}>
            Don't have an account?
            <Text style={{ color: '#5352ed', fontFamily: 'SourceSansProBold' }} onPress={() => navigation.navigate("Signup")}>
              {' Register'}
            </Text>
          </Text>
        </View>
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Undo',
            onPress: () => {
              // Do something
            },
          }}>
          Invalid Username And  Password
        </Snackbar>
        {isLoading2 && (
        <LottieView style={{ position: 'absolute', alignItems: 'center', marginBottom: 0.3 }} source={require('../assets/97952-loading-animation-blue')} autoPlay />

      )}
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

    top: Dimensions.get('screen').height * 0.2,
    alignSelf: 'center',
    color: '#FFF',
    fontFamily: 'SourceSansProBold',
    fontSize: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    // shadowOpacity: 0.90,
    // shadowRadius: 10.32,
    // elevation: 16,
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
export default Home
