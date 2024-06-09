import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, View, ImageBackground, Image, ScrollView, Dimensions, TextInput, Linking, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');
import { Icon } from 'react-native-elements';
import { CustomCard } from './CustomCard';

function CheckEvent({ route }) {
  const [items, setItems] = useState([]);
  const back1 = require("../assets/Mainicon.png");
  const back2 = require("../assets/Man.jpg");
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [Detialsofuser, setDetailsofuser] = useState(0);
  const [Detialsofuser1, setDetailsofuser1] = useState(null);
  const [Detialsofbalance, setDetailsofbalance] = useState(null);
  const [Detialsoftrip, setDetailsoftrip] = useState(null);
  const [Detialsofimage, setDetailsofimage] = useState(null);
  const openwhatsapp = (phoneNumber) => {
    const url = `whatsapp://send?phone=${phoneNumber}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log('WhatsApp is not installed.');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error('An error occurred', err));

  }

  const Getdetails = async () => {

    const ip = await AsyncStorage.getItem('@Data_Ip')
    const ip_add = JSON.parse(ip)

    // console.log('http://192.168.1.13/api/Check/'+route.params.result+'/'+seq)
    fetch('http://' + ip_add['ip'] + '/api/Customer/' + route.params.id, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setDetailsofuser(responseJson)
        // console.log(responseJson)
        setItems(
          [
            {
              title: 'Picture 1',
              image: responseJson["image1"],
            },
            {
              title: 'Picture 2',
              image: responseJson["image2"],
            },
            {
              title: 'Picture 3',
              image: responseJson["image1"],
            },
          ]
        )
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    Getdetails();
  }, []);



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={{ uri: Detialsofuser.Profile }}
          />

          <Text style={styles.name}>{Detialsofuser.username}</Text>
          <Text style={styles.userInfo}>{Detialsofuser.email}</Text>
          <Text style={styles.userInfo}>Total Points: {Detialsofuser.point}</Text>
        </View>
      </View>

      <View style={styles.carouselContainer}>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            const x = event.nativeEvent.contentOffset.x;
            const index = Math.floor(x / (width - 60));
            if (index !== activeIndex) {
              setActiveIndex(index);
            }
          }}
          scrollEventThrottle={16}
        >
          {items.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.dotContainer}>
          {items.map((_, index) => (
            <TouchableOpacity key={index} onPress={() => setActiveIndex(index)}>
              <View
                style={[
                  styles.dot,
                  { backgroundColor: index === activeIndex ? 'white' : 'gray' },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>

      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.loginButton} onPress={() => openwhatsapp(Detialsofuser.phone)}  >
          <Text style={styles.loginButtonText}>{"         "}Contact On WhatsApp{"        "}</Text>

        </TouchableOpacity>

      </View>


    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2921c4",
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
},
buttonq: {
    backgroundColor: '#50AB04',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginLeft: 30
},
buttonqw: {
    backgroundColor: '#DB4437',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
},
buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
},
loginButton: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: -30,
    marginLeft: 80
},
loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
},
  button: {
        width: '48%',
        height: 50,
        padding: 10,
        marginLeft: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: '600',

  },
  userInfo: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
  },
  body: {
    backgroundColor: '#FFF',
    height: 500,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContent: {
    flex: 1,

    alignItems: 'flex-start',
    paddingLeft: 5,
    fontFamily: "SourceSansProBold"
  },
  infoContent1: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 10,
    marginLeft: -20,
    fontFamily: "SourceSansProBold"
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 40,
    marginLeft: 130,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold'
  },
  dotContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: 150,
    position: 'absolute',

    bottom: 10,

  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    margin: 5,
    borderWidth: 1,

  },
  carouselContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    marginTop: 20
  },
  itemContainer: {
    width: width - 60,
    height: height / 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  image: {
    width: '100%',
    height: '80%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  textContainer: {
    width: '50%',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
    position: 'absolute',
    bottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
    textAlign: 'center',
  },






})

export default CheckEvent;