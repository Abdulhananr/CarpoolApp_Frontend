import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, View, Alert, Image, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import { Button, Icon, ButtonGroup } from 'react-native-elements';
import { CustomCard } from './CustomCard';
import SourceSansProLight from '../assets/Font/SourceSansPro-Light.ttf';
import SourceSansProRegular from '../assets/Font/SourceSansPro-Regular.ttf';
import SourceSansProBold from '../assets/Font/SourceSansPro-Bold.ttf';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
function Notfication(props) {
    const back1 = require("../assets/Mainicon.png");
    const [loaded] = useFonts({
        SourceSansProLight,
        SourceSansProRegular,
        SourceSansProBold,
    });
    const navigation = useNavigation();
  
    const [eventList, setEventList] = useState([])
    const [eventList2, setEventList2] = useState([])
    showAlert = viewId => {
        Alert.alert('alert', 'event clicked ' + viewId)
    }
    
    const [Detialsofuser, setDetailsofuser] = useState(null);
    const [Detialsofbalance, setDetailsofbalance] = useState(null);
    const [Detialsoftrip, setDetailsoftrip] = useState(null);
    const [Detialsofimage, setDetailsofimage] = useState(null);
    const [Profileofuser, setProfileofuser] = useState("")
    const [Detialsofuser2, setDetailsofuser2] = useState(null);
    const [isLoading11, setisLoading11] = useState(true)
    const [isLoading12, setisLoading12] = useState(false)
    


    const B = (props) => <Text style={{ fontWeight: 'bold', fontFamily: 'SourceSansProBold' }}>{props.children}</Text>

    const Getdetails2 = async () => {
        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)
        const jsonValue = await AsyncStorage.getItem('@Data_Key')
        const val = JSON.parse(jsonValue)
        console.log(val['id'])

        fetch('http://' + ip_add['ip'] + '/api/Customer/' + val['id'], {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setDetailsoftrip(responseJson["trips_as_client"])
                setDetailsofbalance(responseJson["balance"])
                setDetailsofimage(responseJson['Profile'])
                setDetailsofuser2(responseJson["username"])



            })
            .catch((error) => {
                console.error(error);
            });


    }
    const Getdetails1 = async (ip, id) => {

        fetch('http://' + ip + '/api/Customer/' + id, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setDetailsofuser(responseJson["username"])
                setProfileofuser((responseJson["Profile"]))


            })
            .catch((error) => {
                console.error(error);
            });


    }


    const [placeName, setPlaceName] = useState(null);
    const [placeNameto, setPlaceNameto] = useState(null);
    const buttons = ['Pending', 'Failed'];
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleButtonGroupPress = (index) => {
        setSelectedIndex(index);

        if (index === 0) {
            setisLoading12(false)
            setisLoading11(true)

        } else if (index === 1) {
            setisLoading12(true)
            setisLoading11(false)
            console.log("OK")
        }
    };
    const fetchPlaceName = async (latitude, longitude) => {
        try {
            // Make a request to the Google Maps Geocoding API
            console.log(latitude, longitude)
            const formattedPlaceName = "";
            const apiKey = 'AIzaSyAIK7Latdow_7V9Arlcy5RtG9gj0hMn0qw'; // Replace with your Google Maps API key
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
            const response = await fetch(url);
            const responseJson = await response.json();
            // Parse the response to extract the place name
            const results = responseJson.results;
            if (results.length > 0) {
                const firstResult = results[0];
                const formattedPlaceName = firstResult.formatted_address;
                setPlaceName(formattedPlaceName);
            }
        } catch (error) {
            console.error('Error fetching place name:', error);
        }
        return;

    };
    const fetchPlaceNameto = async (latitude, longitude) => {
        try {
            // Make a request to the Google Maps Geocoding API
            console.log(latitude, longitude)
            const formattedPlaceName = "";
            const apiKey = 'AIzaSyAIK7Latdow_7V9Arlcy5RtG9gj0hMn0qw'; // Replace with your Google Maps API key
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
            const response = await fetch(url);
            const responseJson = await response.json();
            // Parse the response to extract the place name
            const results = responseJson.results;
            if (results.length > 0) {
                const firstResult = results[0];
                const formattedPlaceName = firstResult.formatted_address;
                setPlaceNameto(formattedPlaceName);
            }
        } catch (error) {
            console.error('Error fetching place name:', error);
        }
        return;
    };
   


    const getCurrentDate = () => {
        const currentDate = new Date().toISOString().split('T')[0];
        return currentDate;
    };
    const dateofnext = (givenDate ) => {

        // Convert the given date to a Date object
        var dateObj = new Date(givenDate);

        // Increment the date by 1 day
        dateObj.setDate(dateObj.getDate() + 1);

        // Get the year, month, and day components of the new date
        var year = dateObj.getFullYear();
        var month = dateObj.getMonth() + 1; // Adding 1 because months are zero-based
        var day = dateObj.getDate();

        // Format the new date as "YYYY-MM-DD"
        var formattedDate = year + "-" + month.toString().padStart(2, '0') + "-" + day.toString().padStart(2, '0');
        return formattedDate;
    }

    const Getdetails = async () => {
        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)
        const jsonValue = await AsyncStorage.getItem('@Data_Key')
        const val = JSON.parse(jsonValue)
        var i = 0
        const dataof = []
        

        fetch('http://' + ip_add['ip'] + '/api/Notfication/', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                responseJson.map(item => {

                    if (item["customer_ID"] == val['id'] && item['person'] == "Client" ) {

                        i++;
                        fetchPlaceName(item["lat"], item["long"])
                        fetchPlaceNameto(item["des_lat"], item["des_long"])

                        dataof.push({
                            day: i,
                            id: item["id"],
                            from: placeName,
                            to: placeNameto,
                            msg:item['status']
                        })
                    }
                    

                    else {
                    }

                });

                setEventList(dataof)

            })
            .catch((error) => {
                console.error(error);
            });
    }
    useEffect(() => {
        
            Getdetails()
        
    }, []);
    return (
        <View style={styles.container}>
            <Text style={{fontWeight:'bold',fontSize:30,marginLeft:80,marginTop:20}}> Notfication</Text>
        <FlatList
          style={styles.list}
          data={eventList}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text><B>Your Carpool Request From : </B>  {item.from} <B>The Destination Location TO:</B> {item.to}  <B>Is {item.msg}</B></Text>
              
            </View>
          )}
        />
      </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f1f8ff',
    },
    input: {
      height: 40,
      marginBottom: 10,
      marginTop: 40,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    button: {
      backgroundColor: '#ddd',
      padding: 10,
      alignItems: 'center',
    },
    buttonText: {
      fontWeight: 'bold',
    },
    list: {
      marginTop: 10,
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      marginVertical: 5,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ddd',
    },
  });
export default Notfication;