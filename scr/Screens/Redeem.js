import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
import SendIntentAndroid from 'react-native-send-intent';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Redeem() {
  const navigation = useNavigation();
  const data = [
    { id: 1, title: "Car Plate", color: "#FF4500", members: 8, image: "https://cdn-icons-png.flaticon.com/512/290/290163.png" },
    { id: 1, title: "Car Model", color: "#87CEEB", members: 6, image: "https://cdn.iconscout.com/icon/free/png-256/free-car-location-find-navigate-gps-location-29571.png?f=webp" },
    { id: 2, title: "Car Images", color: "#4682B4", members: 12, image: "https://cdn.iconscout.com/icon/free/png-256/free-car-1086-449866.png?f=webp" },
    { id: 3, title: "Profile Picture", color: "#6A5ACD", members: 5, image: "https://cdn-icons-png.flaticon.com/512/5247/5247351.png" },
    { id: 4, title: "Change Username", color: "#6A5ACD", members: 5, image: "https://cdn-icons-png.flaticon.com/512/72/72619.png" },
    { id: 5, title: "Change Password", color: "#6A5ACD", members: 5, image: "https://cdn-icons-png.flaticon.com/512/6146/6146587.png" },

  ]
  const clickEventListener = (item) => {
    //     console.log(item)
    if (item.title == "Car Plate") {
      navigation.navigate("Carplate")
    }
    else if (item.title == "Car Model") {
      navigation.navigate("Carmodel")
    }
    else if (item.title == "Change Username") {
      navigation.navigate("Username")
    }
    else if (item.title == "Change Password") {
      navigation.navigate("Password")
    }
    else if (item.title == "Profile Picture") {
      navigation.navigate("Profilepic")
    }
    else if (item.title == "Car Images") {
      navigation.navigate("Carimage")
    }




  }
  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 30, marginLeft: 110, fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}> Edit Your Details </Text>
      <FlatList style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={data}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({ item }) => {
          return (

            <TouchableOpacity style={[styles.card, { backgroundColor: item.color }]} onPress={() => { clickEventListener(item) }}>

              <View style={styles.cardHeader}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
              <Image style={styles.cardImage} source={{ uri: item.image }} />
              <View style={styles.cardFooter}>
                <Text style={styles.subTitle}>  </Text>
              </View>
            </TouchableOpacity>
          )
        }} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    //paddingHorizontal: 5,
    backgroundColor: "#E6E6E6",
  },
  listContainer: {
    alignItems: 'center'
  },
  /******** card **************/
  card: {
    marginHorizontal: 2,
    marginVertical: 2,
    flexBasis: '48%',
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 70,
    width: 70,
    alignSelf: 'center'
  },
  title: {
    fontSize: 16,
    flex: 1,
    color: "#FFFFFF",
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 12,
    flex: 1,
    color: "#FFFFFF",
  },
  icon: {
    height: 20,
    width: 20,
  }
})

export default Redeem;