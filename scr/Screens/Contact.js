import React ,{useState,useEffect,Component} from 'react'
import { StyleSheet, Text, Image,View ,FlatList,TextInput,Alert,TouchableOpacity,SafeAreaView,TouchableWithoutFeedback,Dimensions,Keyboard} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import SourceSansProLight from '../assets/Font/SourceSansPro-Light.ttf';
import SourceSansProRegular from '../assets/Font/SourceSansPro-Regular.ttf';
import SourceSansProBold from '../assets/Font/SourceSansPro-Bold.ttf';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Searchbar,Button,Card,IconButton } from 'react-native-paper';
import BackgroundImage from '../assets/Hello.jpg';
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Animatable from 'react-native-animatable';
function Contact() {
    const [Name, setname] = useState('');
    const [Address, setaddress] = useState('');
    const [contact, setcontact] = useState('');
    const [email, setemail] = useState('');
    const navigation = useNavigation();
    const [loaded] = useFonts({
      SourceSansProLight,
      SourceSansProRegular,
      SourceSansProBold,
    }); 
    if (!loaded || !BackgroundImage) {
      return <Text>Loading...</Text>;
    }
    const  componentDidMount = async ()=>{
      if (Name.length==0){
        Alert.alert("Name is Empty !!!")}
      else if(email.length==0){
        Alert.alert("Email is Empty !!!")
      }
      else if(contact.length==0){
        Alert.alert("Phone is Empty !!!")
      }
      else if(Address.length==0){
        Alert.alert("Description is Empty!!!")
      }
      else{
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json','Accept': 'application/json'},
          body:JSON.stringify({
            name: Name,
            email: email,
            phone: contact,
            desc: Address
          })
      };
        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add=JSON.parse(ip)
        // '+ip_add['ip']+'
        fetch('http://'+ip_add['ip']+'/api/Contact/', requestOptions)
        .then((response) => response.json())
        .then(data => {Alert.alert("Message Send Done Thank You To Contect Us!"),setaddress(''),setname(''),setcontact(''),setemail('')})
        .catch((error)=> {Alert.alert("Please Check Details ")})
        
      }
    }
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          
          <View style={{ flex: 1 }}>
            <Image
              style={{ flex: 1, width: null, marginTop: -380 }}
              source={BackgroundImage}
            />
          </View>
          <Animatable.Text
            style={styles.titleText}
            animation='fadeInUp'
            delay={1200}
            
          >
            Contact Us
          </Animatable.Text>
          <View style={styles.bottomView}>
            <Text style={styles.loginText}>Contact Us</Text>
            <View style={styles.inputView}>
              <Icon
                style={styles.inputIcon}
                name='person'
                type='ionicons'
                color='#5352ed'
              />
              <TextInput
                style={styles.input}
                placeholder='Name'
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                onChangeText={Name => setname(Name)}
                defaultValue={Name}
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
                name='phone'
                type='ionicons'
                color='#5352ed'
              />
              <TextInput
                style={styles.input}
                placeholder='Phone'
                onChangeText={contact => setcontact(contact)}
                autoCapitalize='none'
                keyboardType='number-pad'
                textContentType='emailAddress'
                defaultValue={contact}
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
                multiline={true}
                numberOfLines={4}
                placeholder='Description'
                onChangeText={Address => setaddress(Address)}
                defaultValue={Address}
              />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress=  {()=> componentDidMount()}>
            
              <Text style={styles.loginButtonText}>Send Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 5
        },
        itemStyle: {
          padding: 10,
        },
        textInputStyle: {
          borderWidth: 1,
          paddingLeft: 20,
          margin: 25,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          height: 48,
          borderRadius: 20,
          paddingHorizontal: 16,
          shadowOffset: { width: 0, height: 1 },
          shadowRadius: 2,
          elevation: 2,
          shadowOpacity: 0.4
        },
        titleText: {
          position: 'absolute',
          top: Dimensions.get('screen').height * 0.05,
          alignSelf: 'center',
          color: '#000',
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
        red: {
          height: 40,
          flex: 1,
          fontFamily: 'SourceSansProRegular',
          fontSize: 16,
          color: '#331',
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

export default Contact