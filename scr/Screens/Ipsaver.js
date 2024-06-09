import React,{useState,useEffect,Component,useRef } from 'react';
import { StyleSheet, Image,TouchableOpacity,Text, TextInput,View,Button,Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from '../assets/Hello.jpg';
import SourceSansProLight from '../assets/Font/SourceSansPro-Light.ttf';
import SourceSansProRegular from '../assets/Font/SourceSansPro-Regular.ttf';
import SourceSansProBold from '../assets/Font/SourceSansPro-Bold.ttf';
import { useFonts } from 'expo-font';
import { Icon } from 'react-native-elements';

function Ipsaver() {
    const [ip, setip] = useState('');
    const navigation = useNavigation();
    const back_arrow_icon = require("../assets/back_arrow_icon.png")
    const storeData = async (value) => {
        const ip_={ip:value}
        // console.log(ip_)
        try {
          const jsonValue = JSON.stringify(ip_)
          await AsyncStorage.setItem('@Data_Ip', jsonValue)
          navigation.navigate("Home");
        } catch (e) {
          // console.log(e)
        }
      }
      
      const [loaded] = useFonts({
        SourceSansProLight,
        SourceSansProRegular,
        SourceSansProBold,
      });
      if (!loaded || !BackgroundImage) {
        return <Text>Loading...</Text>;
      }
    
    return (
    <View style={styles.container}>
      <TouchableOpacity
          style={{ marginLeft: 10, marginTop: 35 }}
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
           <View style={styles.inputView}>
            <Icon
              style={styles.inputIcon}
              name='person'
              type='ionicons'
              color='#fff'
            />
            <TextInput
              style={styles.input}
              placeholder='Username'
              autoCapitalize='none'
              keyboardType='email-address'
              textContentType='emailAddress'
              onChangeText={username => setip(username)}
              defaultValue={'192.168.1.1'}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={()=>storeData(ip)}>
          <Text style={styles.buttonText}>Change</Text>
        </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
      backgroundColor:'#40b3d2'
    },
    inputIcon: {
      paddingHorizontal: 8,
      color: '#fff',
    },
    welcomeText: {
      alignSelf: 'center',
      fontSize: 40,
      fontFamily: 'SourceSansProLight',
      marginTop: 10,
      color: '#fff',
    },
    switchTabsView: {
      display: 'flex',
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginTop: 20,
    },
    switchText: {
      padding: 2,
      fontSize: 20,
      color: '#fff',
      fontFamily: 'SourceSansProBold ',
    },
    inputView: {
      height: 40,
      borderBottomWidth: 1,
      borderBottomColor: '#fff',
      marginTop: 10,
      marginHorizontal: 20,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      height: 40,
      fontSize: 16,
      fontFamily: 'SourceSansProLight',
      paddingHorizontal: 4,
      color: '#fff',
    },
    button: {
      marginHorizontal: 20,
      backgroundColor: '#fafafa',
      marginTop: 12,
      paddingVertical: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    // fontFamily: 'SourceSansProBold'
    buttonText: { fontSize: 16, color: '#E44D26' ,fontFamily: 'SourceSansProBold'},
    forgotPasswordText: {
      marginHorizontal: 20,
      marginTop: 20,
      alignSelf: 'flex-end',
      color: '#fff',
      fontSize: 18,
      fontFamily: 'SourceSansProBold',
    },
    socialLoginView: {
      marginTop: 40,
      marginHorizontal: 20,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    socialLoginTouchable: {
      backgroundColor: '#fff',
      width: 40,
      height: 40,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 8,
    },
  });
export default Ipsaver;