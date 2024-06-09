import React from 'react';

function Sam(props) {

    // const TimeDifference = () => {
    //     const time1 = '10:30'; // First time
    //     const time2 = '15:45'; // Second time

        const getTimeDifference = (time1, time2) => {
            const [hours1, minutes1] = time1.split(':');
            const [hours2, minutes2] = time2.split(':');

            const date1 = new Date();
            date1.setHours(hours1);
            date1.setMinutes(minutes1);

            const date2 = new Date();
            date2.setHours(hours2);
            date2.setMinutes(minutes2);

            const diffInMilliseconds = date2 - date1;
            const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
            const diffInHours = Math.floor(diffInMinutes / 60);

            return {
                hours: diffInHours,
                minutes: diffInMinutes % 60
            };
        };

    //     const timeDifference = getTimeDifference(time1, time2);




        return (
            <View style={styles.container}>
                <FlatList
                    enableEmptySections={true}
                    style={styles.eventList}
                    data={eventList}
                    refreshControl={
                        <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
                    }
                    keyExtractor={item => {
                        return item.id
                    }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity>
                                <View style={styles.eventBox}>
                                    <View style={styles.eventDate}>
                                        <Text style={styles.eventDay}>{item.day}</Text>
                                    </View>
                                    <View style={styles.eventContent}>
                                        <Text style={styles.eventTime}>Name:{item.Name}</Text>
                                        <Text style={styles.userName}>Date: {item.date}</Text>
                                        <Text style={styles.userName}>time: {item.time}</Text>

                                        <Text style={styles.description}>
                                            Please Remember The carpool Have A Safe Journey
                                        </Text>
                                        <Text style={styles.userName}>
                                            From :{placeName}


                                        </Text>
                                        <Text>{"\n"}</Text>
                                        <Text style={styles.userName}>
                                            To :{placeNameto}
                                        </Text>
                                        {/* <Button onPress={() => mybuttonclick(item.id)} title="hello"/> */}


                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        );
    }

    export default Sam;
//     import React, { useEffect, useState, Component } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View, Alert, Image, FlatList } from 'react-native'
// import { Button, Icon } from 'react-native-elements';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation, useIsFocused } from '@react-navigation/native';

// function DriverCreatedcarpools() {

//     const back1 = require("../assets/Mainicon.png");


//     const [eventList, setEventList] = useState([

//     ])
//     showAlert = viewId => {
//         Alert.alert('alert', 'event clicked ' + viewId)
//     }
//     const [placeName, setPlaceName] = useState(null);
//     const [placeNameto, setPlaceNameto] = useState(null);
//     const fetchPlaceName = async (latitude, longitude) => {
//         try {
//             // Make a request to the Google Maps Geocoding API
//             console.log(latitude,longitude)
//             const formattedPlaceName = "";
//             const apiKey = 'AIzaSyAIK7Latdow_7V9Arlcy5RtG9gj0hMn0qw'; // Replace with your Google Maps API key
//             const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
//             const response = await fetch(url);
//             const responseJson = await response.json();
//             // Parse the response to extract the place name
//             const results = responseJson.results;
//             if (results.length > 0) {
//                 const firstResult = results[0];
//                 const formattedPlaceName = firstResult.formatted_address;
//                 setPlaceName(formattedPlaceName);
//                 console.log(placeName);
//             }
//         } catch (error) {
//             console.error('Error fetching place name:', error);
//         }
//         return ;

//     };
//     const fetchPlaceNameto = async (latitude, longitude) => {
//         try {
//             // Make a request to the Google Maps Geocoding API
//             console.log(latitude,longitude)
//             const formattedPlaceName = "";
//             const apiKey = 'AIzaSyAIK7Latdow_7V9Arlcy5RtG9gj0hMn0qw'; // Replace with your Google Maps API key
//             const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
//             const response = await fetch(url);
//             const responseJson = await response.json();
//             // Parse the response to extract the place name
//             const results = responseJson.results;
//             if (results.length > 0) {
//                 const firstResult = results[0];
//                 const formattedPlaceName = firstResult.formatted_address;
//                 setPlaceNameto(formattedPlaceName);
//                 console.log(placeNameto);
//             }
//         } catch (error) {
//             console.error('Error fetching place name:', error);
//         }
//         return ;
//     };

//     const [Detialsofuser, setDetailsofuser] = useState();

//     const Getdetails1 = async (ip, id) => {
//         console

//         // console.log('http://192.168.1.13/api/Check/'+route.params.result+'/'+seq)
//         fetch('http://' + ip + '/api/Customer/' + id, {
//             method: 'GET'
//         })
//             .then((response) => response.json())
//             .then((responseJson) => {
//                 return responseJson["username"];


//             })
//             .catch((error) => {
//                 console.error(error);
//             });


//     }








//     const Getdetails = async () => {
//         const ip = await AsyncStorage.getItem('@Data_Ip')
//         const ip_add = JSON.parse(ip)
//         const jsonValue = await AsyncStorage.getItem('@Data_Key')
//         const val = JSON.parse(jsonValue)
//         var i = 0
//         const dataof = []

//         fetch('http://' + ip_add['ip'] + '/api/DCarpoolre/', {
//             method: 'GET'
//         })
//             .then((response) => response.json())
//             .then((responseJson) => {
//                 responseJson.map(item => {

//                     if (item["assien_driver"] == val['id']) {

//                         i++;
//                         fetchPlaceName(item["lat"], item["long"])
//                         fetchPlaceNameto(item["des_lat"], item["des_long"])
//                         console.log(i)
//                         dataof.push({
//                             day: i,

//                             time: item['time'],
//                             date: item["date"],
//                             from: placeName,
//                             to: placeNameto,
//                             seat:item['seat']
//                         })
//                         // console.log( Detialsofuser)
//                         // console.log(item)





//                     }
//                     else {

//                     }

//                 });
//                 console.log(dataof)
//                 setEventList(dataof)

//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }
//     useEffect(() => {
//         Getdetails();
//         // console.log(fetchPlaceName(33.6912109,72.8290659))
//     }, []);
//     return (
//         <View style={styles.container}>
//             <FlatList
//                 enableEmptySections={true}
//                 style={styles.eventList}
//                 data={eventList}
//                 keyExtractor={item => {
//                     return item.id
//                 }}
//                 renderItem={({ item }) => {
//                     return (
//                         <TouchableOpacity onPress={() => showAlert('row')}>
//                             <View style={styles.eventBox}>
//                                 <View style={styles.eventDate}>
//                                     <Text style={styles.eventDay}>{item.day}</Text>
//                                 </View>
//                                 <View style={styles.eventContent}>
//                                     <Text style={styles.userName}>Date: {item.date}</Text>
//                                     <Text style={styles.userName}>time: {item.time}</Text>
//                                     <Text style={styles.userName}>
//                                         From :{placeName}

//                                         {/* {{"<----->"}{fetchPlaceName(33.6992161,72.9744022)} */}

//                                     </Text>
//                                     <Text>{"\n"}</Text>
//                                     <Text style={styles.userName}>
//                                         To :{placeNameto}

//                                         {/* {fetchPlaceName(33.6912109,72.8290659)}{"<----->"}{fetchPlaceName(33.6992161,72.9744022)} */}

//                                     </Text>

//                                 </View>
//                             </View>
//                         </TouchableOpacity>
//                     )
//                 }}
//             />
//         </View>
//     );
// }
// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#DCDCDC',
//     },
//     eventList: {
//         marginTop: 20,
//     },
//     eventBox: {
//         padding: 10,
//         marginTop: 5,
//         marginBottom: 5,
//         flexDirection: 'row',
//     },
//     eventDate: {
//         flexDirection: 'column',
//     },
//     eventDay: {
//         fontSize: 50,
//         color: '#0099FF',
//         fontWeight: '600',
//     },
//     eventMonth: {
//         fontSize: 16,
//         color: '#0099FF',
//         fontWeight: '600',
//     },
//     eventContent: {
//         flex: 1,
//         flexDirection: 'column',
//         alignItems: 'flex-start',
//         marginLeft: 10,
//         backgroundColor: '#FFFFFF',
//         padding: 10,
//         borderRadius: 10,
//     },
//     description: {
//         fontSize: 15,
//         color: '#646464',
//     },
//     eventTime: {
//         fontSize: 18,
//         color: '#151515',
//     },
//     userName: {
//         fontSize: 16,
//         color: '#151515',
//     },
// })
// export default DriverCreatedcarpools;
{/* <View style={styles.container}>
<FlatList
    enableEmptySections={true}
    style={styles.eventList}
    data={eventList}
    refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
      }
    keyExtractor={item => {
        return item.id
    }}
    renderItem={({ item }) => {
        return (
            <TouchableOpacity>
                <View style={styles.eventBox}>
                    <View style={styles.eventDate}>
                        <Text style={styles.eventDay}>{item.day}</Text>
                    </View>
                    <View style={styles.eventContent}>
                        <Text style={styles.eventTime}>Name:{item.Name}</Text>
                        <Text style={styles.userName}>Date: {item.date}</Text>
                        <Text style={styles.userName}>time: {item.time}</Text>

                        <Text style={styles.description}>
                           Please Remember The carpool Have A Safe Journey
                        </Text>
                        <Text style={styles.userName}>
                            From :{placeName}


                        </Text>
                        <Text>{"\n"}</Text>
                        <Text style={styles.userName}>
                            To :{placeNameto}
                        </Text>
                        {/* <Button onPress={() => mybuttonclick(item.id)} title="hello"/> */}
                        

                    </View>
                </View>
            </TouchableOpacity>
        )
    }}
/>
</View> */}
<View style={styles.container}>
            <FlatList
                enableEmptySections={true}
                style={styles.eventList}
                data={eventList}
                keyExtractor={item => {
                    return item.id
                }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity>
                            <View style={styles.eventBox}>
                                <View style={styles.eventDate}>
                                    <Text style={styles.eventDay}>{item.day}</Text>
                                </View>
                                <View style={styles.eventContent}>
                                    <Text style={styles.eventTime}>Name:{item.Name}</Text>
                                    <Text style={styles.userName}>Date: {item.date}</Text>
                                    <Text style={styles.userName}>time: {item.time}</Text>

                                    <Text style={styles.description}>
                                        The Request is in panding we are waiting for the Captain Approval
                                    </Text>
                                    <Text style={styles.userName}>
                                        From :{placeName}

                                        {/* {{"<----->"}{fetchPlaceName(33.6992161,72.9744022)} */}

                                    </Text>
                                    <Text>{"\n"}</Text>
                                    <Text style={styles.userName}>
                                        To :{placeNameto}

                                        {/* {fetchPlaceName(33.6912109,72.8290659)}{"<----->"}{fetchPlaceName(33.6992161,72.9744022)} */}

                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>