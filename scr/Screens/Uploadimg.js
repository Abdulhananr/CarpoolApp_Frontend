import React, { useState, useEffect, useRef, Component } from 'react';
import { StyleSheet, Platform, ActivityIndicator, RefreshControl, Button, Image, Text, LogBox, View, Alert, TouchableOpacity, TextInput } from 'react-native';
// import {Card,FAB,Button, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from '../assets/icon.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ImagePicker from 'expo-image-picker';
import { useFonts } from 'expo-font';
import SourceSansProLight from '../assets/Font/SourceSansPro-Light.ttf';
import SourceSansProRegular from '../assets/Font/SourceSansPro-Regular.ttf';
import SourceSansProBold from '../assets/Font/SourceSansPro-Bold.ttf';
import { ScrollView } from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
function Uploadimg({ route }) {
    const [text, onChangeText] = useState("");

    const back1 = require("../assets/Mainicon.png");
    const [image, setImage] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image2, setImage2] = useState(null);

    const [image4, setImage4] = useState(null);

    const [result1, setresult1] = useState(null);
    const [result2, setresult3] = useState(null);
    const [result3, setresult2] = useState(null);
    const [result4, setresult4] = useState(null);

    const [ID, setId] = useState(null);
    const navigation = useNavigation();
    const [isLoading, setisLoading] = useState(false);
    const [isLoading1, setisLoading1] = useState(false);
    const [isLoading2, setisLoading2] = useState(false);
    const [isLoading4, setisLoading4] = useState(false);




    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const removeData = async () => {
        await AsyncStorage.removeItem('@Data_Key');
        navigation.navigate("Home")

    }
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            // console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);
    const postToServer = async (img, img1, img2, img4) => {
        var carmodel = route.params.obj.carnumber
        carmodel = parseInt(carmodel)
        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)
        const formData = new FormData();
        let name_pic = "Testing" + ".jpg"
        let name_pic2 = "Testing1" + ".jpg"
        let name_pic3 = "Testing2" + ".jpg"
        let profile_name = "Profile" + ".jpg"



        formData.append()
        formData.append('username', route.params.obj.username)
        formData.append('email', route.params.obj.email)
        formData.append('password', route.params.obj.password)
        formData.append('phone', route.params.obj.phone)
        formData.append('carplate', route.params.obj.carplate)
        formData.append('carmodel', route.params.obj.carnumber)
        formData.append('balance', 0)
        formData.append('trips_as_client', 0)
        formData.append('trips_as_captain', 0)
        formData.append('expo_token', expoPushToken)
        formData.append("as_client_buket",BucketNumber)
        formData.append("as_driver_bucket",BucketNumber)
        formData.append("point",0)
        // formData.append(
        //     'Profile', {
        //     uri: img4.uri,
        //     type: 'Profile/${img4.type}',
        //     name: profile_name
        // }
        // )
        // formData.append(
        //     'image1', {
        //     uri: img.uri,
        //     type: 'image1/${img.type}',
        //     name: name_pic
        // }
        // )
        // formData.append(
        //     'image2', {
        //     uri: img1.uri,
        //     type: 'image2/${img2.type}',
        //     name: name_pic2
        // }
        // )
        // formData.append(
        //     'image3', {
        //     uri: img2.uri,
        //     type: 'image3/${img3.type}',
        //     name: name_pic3
        // }

        // )

        if (image4 === null) {
            // formData.append('Profile', null)
        } else {
            formData.append(
                'Profile', {
                uri: img4.uri,
                type: 'Profile/${img4.type}',
                name: profile_name
            }
            )

        }



        if (image === null) {
            console.log('State is null');
            // formData.append('image1', null)
        } else {
            formData.append(
                'image1', {
                uri: img.uri,
                type: 'image1/${img.type}',
                name: name_pic
            }
            )

        }
        if (image2 === null) {
            // formData.append('image2', null)
        } else {
            formData.append(
                'image2', {
                uri: img1.uri,
                type: 'image2/${img2.type}',
                name: name_pic2
            }
            )
        }
        if (image3 === null) {
            // formData.append('image3', null)
        } else {
            formData.append(
                'image3', {
                uri: img2.uri,
                type: 'image3/${img3.type}',
                name: name_pic3
            }

            )
        }



        const options = {
            method: 'POST',
            body: formData,
            // If you add this, upload won't work
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        };

        fetch('http://' + ip_add['ip'] + '/api/Customer/', options)
            .then((response) => response.json())
            .then((responseJson) => {
                // navigation.navigate("Processing", { "ID": responseJson["id"] })
                Alert.alert("Account Is Created")
                navigation.navigate("Home")
                // console.log(responseJson)

            })
            .catch((error) => {
                // setisLoading(false)
                console.error(error);
            });


    }
    const pickImage = async () => {
        setisLoading1(true)
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
        if (!result.canceled) {
            setImage(null)
            setImage(result.assets[0].uri);
            setresult1(result)
            // postToServer(result)            
            setisLoading1(false)

        }
    };
    const pickImage2 = async () => {
        setisLoading(true)
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
        if (!result.canceled) {
            setImage2(null)
            setImage2(result.assets[0].uri);
            // postToServer(result)
            setresult2(result)
            console.log(route.params.obj)
            setisLoading(false)

        }
    };
    const pickImage3 = async () => {
        setisLoading2(true)
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
        if (!result.canceled) {
            setImage3(null)
            setImage3(result.assets[0].uri);
            setresult3(result)
            // postToServer(result)            
            setisLoading2(false)

        }
    };
    const pickImage4 = async () => {
        setisLoading4(true)
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
        if (!result.canceled) {
            setImage4(null)
            setImage4(result.assets[0].uri);
            setresult4(result)
            // postToServer(result)            
            setisLoading4(false)

        }
    };
    const [BucketNumber, setBucketNumber] = useState(null);
    const Bucketnumbercode = async () => {
        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)
        const jsonValue = await AsyncStorage.getItem('@Data_Key')
        const val = JSON.parse(jsonValue)

        fetch('http://' + ip_add['ip'] + '/api/Dlocation/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "did": val['id'],
                "lat": 0.0,
                "long": 0.0
            }),
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response data
                setBucketNumber(data['id'])
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    }
    useEffect(()=>{
        Bucketnumbercode()
    },[]) 

    const [loaded] = useFonts({
        SourceSansProLight,
        SourceSansProRegular,
        SourceSansProBold,
    });
    if (!loaded || !BackgroundImage) {
        return <Text>Loading...</Text>;
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <Image
                    style={{
                        width: 150,
                        height: 150,
                        // marginLeft:20,
                        alignItems: 'center',
                        position: 'absolute',
                        height: 250,
                        marginTop: 20, marginLeft: 110,
                        resizeMode: 'contain'
                    }}
                    source={back1}
                />
                <Text style={{ fontFamily: 'SourceSansProBold', fontSize: 25, marginTop: 240, color: '#6b4eff', marginLeft: 70 }}  >
                    {'Carpooling Mobile App'}
                </Text>
                <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={0.5}
                    onPress={pickImage4}
                >
                    {isLoading4 == false ? <Text style={styles.buttonTextStyle}>Profile Picture</Text> : <ActivityIndicator size="small" color="#000000" />}

                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={0.5}
                    onPress={pickImage}
                >
                    {isLoading1 == false ? <Text style={styles.buttonTextStyle}>Car Image</Text> : <ActivityIndicator size="small" color="#000000" />}


                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={pickImage2}
                >
                    {isLoading == false ? <Text style={{ color: '#6b4eff', fontFamily: 'SourceSansProBold', fontSize: 17 }}>Car Image</Text> : <ActivityIndicator size="small" color="#000000" />}

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={pickImage3}
                >
                    {isLoading2 == false ? <Text style={{ color: '#6b4eff', fontFamily: 'SourceSansProBold', fontSize: 17 }}>Car Image</Text> : <ActivityIndicator size="small" color="#000000" />}
                </TouchableOpacity>
                {image4 && <View><Text style={{ fontFamily: 'SourceSansProBold', fontSize: 17, marginLeft: 150 }}>Profile</Text><Image source={{ uri: image4 }} style={{ width: 200, height: 200, marginLeft: 80, marginTop: 9 }} /></View>}

                {image && <View><Text style={{ fontFamily: 'SourceSansProBold', fontSize: 17, marginLeft: 150 }}>Image  1</Text><Image source={{ uri: image }} style={{ width: 200, height: 200, marginLeft: 80, marginTop: 9 }} /></View>}
                {image2 && <View><Text style={{ fontFamily: 'SourceSansProBold', fontSize: 17, marginLeft: 150 }}>Image 2</Text><Image source={{ uri: image2 }} style={{ width: 200, height: 200, marginLeft: 80, marginTop: 9 }} /></View>}
                {image3 && <View><Text style={{ fontFamily: 'SourceSansProBold', fontSize: 17, marginLeft: 150 }}>Image 3</Text><Image source={{ uri: image3 }} style={{ width: 200, height: 200, marginLeft: 80, marginTop: 9 }} /></View>}
                <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={0.5}
                    onPress={() => postToServer(result1, result2, result3, result4)}
                >
                    <Text style={styles.buttonTextStyle}>Submit</Text>


                </TouchableOpacity>
            </View>



        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 12,
        fontSize: 16,
        fontFamily: 'SourceSansProBold',
    },
    input: {
        width: 300,
        height: 40,
        margin: 12,
        borderWidth: 2,
        padding: 10,
        marginTop: 10,
        marginLeft: 40
    },
    btn: {
        backgroundColor: '#6b4eff',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 50,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 55,

    },
    btn2: {
        backgroundColor: '#6b4eff',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,

    },
    Anistyle: {

        position: 'absolute',
        alignSelf: 'center',
        height: 200,
        marginBottom: 12,
        marginTop: 50,


    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: 30,
        padding: 5,
        borderWidth: 1,

        height: 50,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 30,

        borderColor: '#6b4eff',
    },
});
async function registerForPushNotificationsAsync() {
    let token = 'NeHsVgOS-Fl3K2pGPaG867qh4hZbmXbsqoN-FJC2';
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        // console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}
export default Uploadimg;