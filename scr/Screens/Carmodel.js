import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
function Carmodel() {
    const [name, setName] = useState('');
  const [Detailsofuser, setDetailsofuser] = useState('');
  const navigation = useNavigation();
  const Getdetails = async () => {
    const ip = await AsyncStorage.getItem('@Data_Ip')
    const ip_add = JSON.parse(ip)
    const jsonValue = await AsyncStorage.getItem('@Data_Key')
    const val = JSON.parse(jsonValue)

    fetch('http://' + ip_add['ip'] + '/api/Customer/' + val['id'], {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setDetailsofuser(responseJson)
        console.log(responseJson)



      })
      .catch((error) => {
        console.error(error);
      });


  }
  const Change = async () => {
    const ip = await AsyncStorage.getItem('@Data_Ip')
    const ip_add = JSON.parse(ip)
    const jsonValue = await AsyncStorage.getItem('@Data_Key')
    const val = JSON.parse(jsonValue)

    console.log(name)
    if (name.length != 0) {


      fetch('http://' + ip_add['ip'] + '/api/ChangeUsercarmodel/' + val['id']+'/'+name, {
        method: 'GET'
      })
        .then((response) => response.json())
        .then((responseJson) => {

          Alert.alert("Number Plate Is Changed")
          navigation.navigate("Redeem")
        })
        .catch((error) => {
          console.error(error);
        });








    }
    else {
      Alert.alert("Please Enter Plate Number")
    }
  }

  useEffect(() => {
    Getdetails();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.pexels.com/photos/1580112/pexels-photo-1580112.jpeg?auto=compress&cs=tinysrgb&w=600' }}
        style={styles.background}
      />
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: Detailsofuser.Profile }}
          style={styles.logo}
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Change Car Model</Text>
        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Change Car Model</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder={Detailsofuser.carmodel}
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={() => Change()}>
            <Text style={styles.buttonText}>Change Car Model</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 120,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'contain',
  },

  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    marginTop: 20,
  },
  card: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 20,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
    paddingLeft: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
};

export default Carmodel;