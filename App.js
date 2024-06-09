import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './scr/Screens/Home';
import DriverList from './scr/Screens/DriverList';
import Startcar from './scr/Screens/Startcar';
import CheckEvent from './scr/Screens/CheckEvent';
import Acceptcarpool from './scr/Screens/Acceptcarpool';
import Signup from './scr/Screens/Signup';
import Ver_pen from './scr/Screens/Ver_pen'
import Check from './scr/Screens/Check'
import Phone from './scr/Screens/Phone'
import Ipsaver from './scr/Screens/Ipsaver'
import Mainscreen from './scr/Screens/Mainscreen';
import Sample from './scr/Screens/Sample';
import Uploadimg from './scr/Screens/Uploadimg';
import DriverScreen from './scr/Screens/DriverScreen';
import ChooseLocation from './scr/Screens/ChooseLocation';
import Paymentscreen from './scr/Screens/Paymentscreen';
import Passenger from './scr/Screens/Passenger';
import Mappscreen from './scr/Screens/Mappscreen';
import Redeem from './scr/Screens/Redeem';
import Redeemitem from './scr/Screens/Redeemitem';
import Voucherscreen from './scr/Screens/Voucherscreen'
import Password from './scr/Screens/Password'
import Username from './scr/Screens/Username'
import Carmodel from './scr/Screens/Carmodel'
import Carplate from './scr/Screens/Carplate'
import Profilepic from './scr/Screens/Profilepic';
import Carimage from './scr/Screens/Carimage';
import Carimage2 from './scr/Screens/Carimage2';
import ClientMap from './scr/Screens/ClientMap'
import PrivateRoom from './scr/Screens/PrivateRoom'
import History from './scr/Screens/History';
import Notfication from './scr/Screens/Notfication';
import NotficationDriver from './scr/Screens/NotficationDriver';
const Stack = createStackNavigator()
function Mystack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Check" component={Check} options={{ headerShown: false }} />

      {/* <Stack.Screen name="Contact" component={Contact} options={{ headerShown: false }} /> */}

      <Stack.Screen name="Mainscreen" component={Mainscreen} options={{ headerShown: false }} />
      <Stack.Screen name="Ipsaver" component={Ipsaver} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
      <Stack.Screen name="Phone" component={Phone} options={{ headerShown: false }} />
      <Stack.Screen name="Ver_pen" component={Ver_pen} options={{ headerShown: false }} />
      <Stack.Screen name="Sample" component={Sample} options={{ headerShown: false }} />
      <Stack.Screen name="Uploadimg" component={Uploadimg} options={{ headerShown: false }} />
      <Stack.Screen name="Acceptcarpool" component={Acceptcarpool} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Startcar" component={Startcar} options={{ headerShown: false }} />
      <Stack.Screen name="DriverList" component={DriverList} options={{ headerShown: false }} />
      <Stack.Screen name="CheckEvent" component={CheckEvent} options={{ headerShown: false }} />
      <Stack.Screen name="DriverScreen" component={DriverScreen} options={{ headerShown: false }} />
      <Stack.Screen name="chooseLocation" component={ChooseLocation} options={{ headerShown: false }} />
      <Stack.Screen name="Paymentscreen" component={Paymentscreen} options={{ headerShown: false }} />
      <Stack.Screen name="Passenger" component={Passenger} options={{ headerShown: false }} />
      <Stack.Screen name="Mappscreen" component={Mappscreen} options={{ headerShown: false }} />
      <Stack.Screen name="Redeem" component={Redeem} options={{ headerShown: false }} />
      <Stack.Screen name="Voucherscreen" component={Voucherscreen} options={{ headerShown: false }} />
      <Stack.Screen name="Redeemitem" component={Redeemitem} options={{ headerShown: false }} />
      <Stack.Screen name="Carmodel" component={Carmodel} options={{ headerShown: false }} />
      <Stack.Screen name="Carplate" component={Carplate} options={{ headerShown: false }} />
      <Stack.Screen name="Username" component={Username} options={{ headerShown: false }} />
      <Stack.Screen name="Password" component={Password} options={{ headerShown: false }} />
      <Stack.Screen name="Profilepic" component={Profilepic} options={{ headerShown: false }} />
      <Stack.Screen name="Carimage" component={Carimage} options={{ headerShown: false }} />

      <Stack.Screen name="Carimage2" component={Carimage2} options={{ headerShown: false }} />
      <Stack.Screen name="ClientMap" component={ClientMap} options={{ headerShown: false }} />
      <Stack.Screen name="PrivateRoom" component={PrivateRoom} options={{ headerShown: false }} />

      <Stack.Screen name="History" component={History} options={{ headerShown: false }} />
      <Stack.Screen name="Notfication" component={Notfication} options={{ headerShown: false }} />
      <Stack.Screen name="NotficationDriver" component={NotficationDriver} options={{ headerShown: false }} />








    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Mystack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
