import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, TextInput, TouchableOpacity, Alert, LogBox, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
const Carimage2 = ({route}) => {
    const [name, setName] = useState('');
    const [Detailsofuser, setDetailsofuser] = useState('');
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [result1, setresult1] = useState(null);
    const [ID, setId] = useState(null);
    const [Detialsofimage, setDetailsofimage] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const postToServer = async (img) => {
        console.log(1)
        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)
        const formData = new FormData();
        let profile_name = "Testing" + ".jpg"
        formData.append()
        formData.append(
            'pic', {
            uri: img.uri,
            type: 'pic/${img.type}',
            name: profile_name
        }
        )
        const options = {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        };

        fetch('http://' + ip_add['ip'] + '/api/Carrypic/', options)
            .then((response) => response.json())
            .then((responseJson) => {
                setId(responseJson['id'])
            })
            .catch((error) => {
                // setisLoading(false)
                console.error(error);
            });
    }
    const pickImage = async () => {
        setisLoading(true)
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
            postToServer(result)
            setisLoading(false)

        }
    };
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
                setDetailsofimage(responseJson[route.params.id])
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
        if (image === null) {
            Alert.alert("Please Select Image")

        }
        else {
            console.log(route.params.id)

            if (route.params.id=="image1"){
                
                fetch('http://' + ip_add['ip'] + '/api/Changepicture1/' + val['id'] + '/' + ID, {
                method: 'GET'
            })
                .then((response) => response.json())
                .then((responseJson) => {

                    Alert.alert("Car Image Changed Successfully")
                    navigation.navigate("Redeem")
                })
                .catch((error) => {
                    console.error(error);
                });
            }
            else if (route.params.id=="image2"){
                fetch('http://' + ip_add['ip'] + '/api/Changepicture2/' + val['id'] + '/' + ID, {
                method: 'GET'
            })
                .then((response) => response.json())
                .then((responseJson) => {

                    Alert.alert("Car Image Changed Successfully")
                    navigation.navigate("Redeem")
                })
                .catch((error) => {
                    console.error(error);
                });
            }
            else if (route.params.id=="image3"){
                fetch('http://' + ip_add['ip'] + '/api/Changepicture3/' + val['id'] + '/' + ID, {
                method: 'GET'
            })
                .then((response) => response.json())
                .then((responseJson) => {

                    Alert.alert("Car Image Changed Successfully")
                    navigation.navigate("Redeem")
                })
                .catch((error) => {
                    console.error(error);
                });
            }
        
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
                    source={{ uri: Detialsofimage }}
                    style={styles.logo}
                />
            </View>

            <View style={styles.formContainer}>

                <Text style={styles.title}>Change Car Image</Text>
                <View style={styles.card}>

                    {image && <View><Image source={{ uri: image }} style={styles.logo1} /></View>}

                    <TouchableOpacity style={styles.button} onPress={pickImage}>
                        {isLoading == false ? <Text style={styles.buttonText}>Select Image</Text> : <ActivityIndicator size="small" color="#000000" />}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button1} onPress={() => Change()}>
                        <Text style={styles.buttonText}>Change Image</Text>
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
    logo1: {
        width: 120,
        height: 120,
        borderRadius: 60,
        resizeMode: 'contain',
        marginLeft: 80,
        marginBottom: 20
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
    button1: {
        width: '100%',
        height: 40,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginTop: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
};

export default Carimage2
