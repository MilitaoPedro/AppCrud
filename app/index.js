import { View, Text, StatusBar } from "react-native";
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from './(tabs)/welcome';
import Login from './(tabs)/Login';
import SignUp from './(tabs)/SignUp';
import FormCad2 from './(tabs)/SignUp/formCad2';
import Members from './(tabs)/Members';
import MembersTeste from './(tabs)/Members/testeMembers';

const Stack = createStackNavigator();

export default function HomeScreen() {
  return (
    <>
      <StatusBar translucent = {true} backgroundColor='transparent'/>
      <Stack.Navigator initialRouteName="Members">
        <Stack.Screen name = "Welcome" component = {Welcome} options={{headerShown: false}}/>
        <Stack.Screen name = "Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name = "SignUp" component={SignUp} options={{headerShown: false}} />
        <Stack.Screen name = "FormCad2" component={FormCad2} options={{headerShown: false}} />
        <Stack.Screen name = "Members" component={Members} options={{headerShown: false}} />
        <Stack.Screen name = "Members2" component={MembersTeste} options={{headerShown: false}} />
      </Stack.Navigator>
    </>
  );
}
