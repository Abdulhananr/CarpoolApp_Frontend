import React, { useEffect, useState, Component } from 'react';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  Linking,
  Alert,
  Button,
  SafeAreaView
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useFonts } from 'expo-font';
import LottieView from 'lottie-react-native';
import NunitoLight from '../assets/fonts/NunitoSans-Light.ttf';
import NunitoBold from '../assets/fonts/NunitoSans-Bold.ttf';
import NunitoExtraBold from '../assets/fonts/NunitoSans-ExtraBold.ttf';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CELL_COUNT = 4;
const RESEND_OTP_TIME_LIMIT = 30;

var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
function Ver_pen({ route }) {
  const back_arrow_icon = require("../assets/back_arrow_icon.png");
  const navigation = useNavigation();
  let resendOtpTimerInterval: any;

  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT,
  );
  const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {

        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  };

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onResendOtpButtonPress = () => {
    //clear input field
    setValue('')
    setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
    startResendOtpTimer();
    seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1)
    send_otp();

  };
  

  useEffect(() => {
    startResendOtpTimer();
    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  }, [resendButtonDisabledTime]);


  const [Userdata, setSearch] = useState([]);

  const handleChange = (otp) => console.log(otp);
  const send_otp = async () => {
    const ip = await AsyncStorage.getItem('@Data_Ip')
    const ip_add = JSON.parse(ip)
    // console.log('http://192.168.1.13/api/Check/'+route.params.result+'/'+seq)
    fetch('http://' + ip_add['ip'] + '/api/Otp/' + route.params.obj.Phone + '/' + seq, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setSearch(responseJson)
        if (responseJson['statusCode'] == 200) {
          //  console.log(route.params.obj)
          Alert.alert("Please Check Otp Send Into Your Number" + route.params.obj.Phone)
        }
        else {
          //  console.log(seq)
          // Alert.alert("There is No Number in Over record")
        }
      })
      .catch((error) => {
        console.error(error);
      });

  };
  useEffect(() => {
    send_otp();
  }, []);


  const Check_otp = () => {
    // console.log(seq);
    if (value.length <= 3) {
      console.log(seq)
      Alert.alert("Please Check Enter Pin Correct")
    }
    else if (value == seq) {
      const obj = { username: route.params.obj.username, password: route.params.obj.password, email: route.params.obj.email, carnumber: route.params.obj.carnumber, carplate: route.params.obj.carplate, phone: route.params.obj.Phone };
      navigation.navigate("Uploadimg", { obj })
    }
    else {
      Alert.alert("Please Check Pin Again Re-Enter")
    }
    console.log(Userdata)
  }

  return (
    <View style={{ flex: 1 }}>

      <View style={{ flexDirection: 'row', height: 80, alignItems: 'flex-end' }}>
        <TouchableOpacity
          style={{ marginLeft: 8 }}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={back_arrow_icon}
            resizeMode="contain"
            style={{
              width: 30,
              height: 25,
            }}
          />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: "NunitoBold", fontSize: 18, lineHeight: 24, marginLeft: 0 }}>Verification Code</Text>
        </View>

      </View>

      <LottieView style={{ height: 200, marginLeft: 40, marginTop: 10 }} source={require('../assets/75250-sms-animation.json')} autoPlay />
      <SafeAreaView style={styles.root}>
        <Text
          style={{
            marginLeft: 50,
            marginTop: 40,
            color: 'black',
            fontSize: 30,
            fontFamily: 'NunitoExtraBold',
          }}
        >
          CarPool Mobile!
        </Text>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}>
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>

            </View>
          )}
        />
        <TouchableOpacity
          onPress={onResendOtpButtonPress}>
          <View style={styles.resendCodeContainer}>
            <Text style={styles.resendCode} > Resend </Text>
            <Text style={{ marginTop: 40 }}> in {resendButtonDisabledTime} sec</Text>
          </View>
        </TouchableOpacity >
      </SafeAreaView>

      <View style={{ flex: 1, marginLeft: 60, marginRight: 70 }}>
        <TouchableOpacity
          style={styles.buttonWithIcon}
          onPress={() => Check_otp()}
        >

          <Text style={styles.buttonText}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  root: { padding: 20, minHeight: 300 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: {
    marginTop: 80,
    width: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#007AFF',
    borderBottomWidth: 2,
  },
  buttonWithIcon: {
    paddingHorizontal: 10,
    marginTop: 15,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FC140B',
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,

  },
  buttonText: {
    fontSize: 20,
    marginLeft: 78,
    fontFamily: 'NunitoExtraBold',
    marginHorizontal: 12,
    color: '#fff',
    fontWeight: '400',

  },
  button: {
    marginTop: 20
  },
  resendCode: {
    color: 'blue',
    marginStart: 20,
    marginTop: 40,
    fontSize: 17,
    fontFamily: 'NunitoExtraBold'
  },
  resendCodeText: {
    marginStart: 20,
    marginTop: 40,
  },
  resendCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 85
  }
})
export default Ver_pen;
