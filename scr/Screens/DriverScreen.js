import React from 'react';
import { StyleSheet, Text, View ,Dimensions} from 'react-native';
import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Drivercarpooling from './Drivercarpooling';
import Acceptcarpool from './Acceptcarpool';
import ListofCarpools from './ListofCarpools';
import DriverCreatedcarpools from './DriverCreatedcarpools';
function Back(){
  const navigation = useNavigation();
  return(
    navigation.navigate("Mainscreen")
  );
}
function DriverScreen(props) {
    const screen = Dimensions.get('window');
    const navigation = useNavigation();
    const ASPECT_RATIO = screen.width / screen.height;
    const Tab = createBottomTabNavigator();
    
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
              else if (route.name === 'Request Carpools') {
                iconName = focused ? 'list' : 'list-outline';
              }
              else if (route.name === 'Start Carpool') {
                iconName = focused ? 'car-sport-outline' : 'car-sport-outline';
              }
              else if (route.name === 'Carpool Created') {
                iconName = focused ? 'bookmarks' : 'bookmarks-outline';
              }
              else if (route.name === 'Back') {
                iconName = focused ? 'arrow-back' : 'arrow-back';
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
           
          <Tab.Screen name="Create Carpool" component={Drivercarpooling} options={{ headerShown: false }} />
          <Tab.Screen name="Start Carpool" component={ListofCarpools} options={{ headerShown: false }} />
          <Tab.Screen name="Carpool Created" component={DriverCreatedcarpools} options={{ headerShown: false }} />
          <Tab.Screen name="Back" component={Back} options={{ headerShown: false }} />
  
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

export default DriverScreen;