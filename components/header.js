import { Colors } from "@/constants/Colors";

import React from "react";
import { View, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { signOut } from "firebase/auth";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const images = '@/assets/images';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
let headerFixed = false;


export default function Header( {navigation} ){
    const auth = FIREBASE_AUTH;

    function logout(){
        signOut(auth)
            .then(() => {
                alert('Você foi deslogado');
                navigation.navigate('Login');
            })
            .catch((error) => {
                const errorMessage = error.errorMessage;
                alert(errorMessage);
            });
    }

    return(
        <View style={styles.header}>
            <View style={styles.imageContainer}>
                <Image 
                    source={require(`${images}/compLogoHorizontalBlue.png`)}
                    style = {styles.imageStyle}
                />
            </View>
            <TouchableOpacity onPress={logout} title = "Sign Out">
                <MaterialCommunityIcons name="logout" style={styles.icon} size={55} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: deviceWidth*0.08,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: deviceWidth,
        height: deviceHeight/9,
        borderBottomColor: headerFixed ? Colors.gray : 'transparent',
        borderBottomWidth: 1
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        alignSelf: 'center'
    }
});