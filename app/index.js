import { StatusBar } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from './(tabs)/welcome';
import Login from './(tabs)/Login';
import SignUp from './(tabs)/SignUp';
import Members from './(tabs)/Members';
import ForgotPass from './(tabs)/ForgotPass'
import Header from '../components/header'

const Stack = createStackNavigator();

export default function HomeScreen() {
  
  return (
    <>
      <StatusBar translucent = {true} backgroundColor='transparent'/>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name = "Welcome" component = {Welcome} options={{headerShown: false}}/>
        <Stack.Screen name = "Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name = "SignUp" component={SignUp} options={{headerShown: false}} />
        <Stack.Screen name = "Members" component={Members} options={{headerShown: false}} />
        <Stack.Screen name = "ForgotPass" component={ForgotPass} options={{headerShown: false}} />
        <Stack.Screen name = "Header" component={Header}/>
      </Stack.Navigator>
    </>
  );
}
