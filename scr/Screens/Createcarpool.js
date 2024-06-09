import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Alert, Text, ScrollView, View, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Keyboard, } from 'react-native';
import { Card, FAB, Checkbox } from 'react-native-paper';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from '../assets/Hello.jpg';
import SourceSansProLight from '../assets/Font/SourceSansPro-Light.ttf';
import SourceSansProRegular from '../assetsnt/SourceSansPro-Bold.ttf';
import { Icon } from 'react-native-elements/Font/SourceSansPro-Regular.ttf';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Createcarpool(props) {
  const [username, setusername] = useState('');
  const [carplate, setcarplate] = useState('');
  const [carnumber, setcarnumber] = useState('');
  const [email, setemail] = useState('');



  const navigation = useNavigation();
  const [checked, setChecked] = React.useState(false);
  const [loaded] = useFonts({
    SourceSansProLight,
    SourceSansProRegular,
    SourceSansProBold,
  });
  if (!loaded || !BackgroundImage) {
    return <Text>Loading...</Text>;
  }
  console.log(obj)


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







          <TouchableOpacity style={styles.loginButton} >

            <Text style={styles.loginButtonText}>Next</Text>
          </TouchableOpacity>

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
export default Createcarpool;