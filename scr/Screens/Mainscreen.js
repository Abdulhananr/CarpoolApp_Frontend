import React, { useState, useEffect, Component, useRef } from 'react';
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
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Addlocaton from './Addlocaton';
import Acceptcarpool from './Acceptcarpool';
import Profile from './Profile';
import Clientlist from './Clientlist';
import Start from './Start';
import HomeScreen from './HomeScreen';
import PrivateRoom from './PrivateRoom';
import Failed from './Failed';
function Mainscreen() {
  const screen = Dimensions.get('window');
  
  const ASPECT_RATIO = screen.width / screen.height;
  const Tab = createBottomTabNavigator();
  const removeData = async () => {
    await AsyncStorage.removeItem('@Data_Key');
    navigation.navigate("Home")

  }
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Create Carpool') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            }
            else if (route.name === 'Carpool Accepted') {
              iconName = focused ? 'car-sport-outline' : 'car-sport-outline';
            }
            else if (route.name === 'Pending Request') {
              iconName = focused ? 'list' : 'list-outline';
            }
            else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }
          



            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          swipeEnabled: true,
          animationEnabled: true,
          gesturesEnabled: true,
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray', 
        })}
      >
        
        <Tab.Screen name="Create Carpool" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Carpool Accepted" component={Start} options={{ headerShown: false }} />
        <Tab.Screen name="Pending Request" component={Clientlist} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
 


      </Tab.Navigator>
      {/* </NavigationContainer> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonWithIcon: {
    paddingHorizontal: 10,
    marginTop: 405,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FC140B',
    paddingVertical: 10,
    marginLeft: 20,
    marginRight: 20,
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
    marginLeft: 118,

    fontFamily: 'NunitoExtraBold',
    marginHorizontal: 12,
    color: '#fff',
    fontWeight: '400',

  },
  bottomCard: {
    backgroundColor: 'white',
    width: '100%',
    padding: 30,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24
  },
  inpuStyle: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginTop: 16
  }
});

export default Mainscreen;