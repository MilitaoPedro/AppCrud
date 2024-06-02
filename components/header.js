import { Colors } from "@/constants/Colors";

import React, { useState, useEffect } from "react";
import { View, Dimensions, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { signOut } from "firebase/auth";

import Dialog from 'react-native-dialog';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const images = '@/assets/images';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
let headerFixed = false;


export default function Header( {navigation} ){
    const auth = FIREBASE_AUTH;

    const [dialogLogoutVisible, setDialogLogoutVisible] = useState(false);

    function logout(){
        signOut(auth)
            .then(() => {
                navigation.navigate('Login');
            })
            .catch((error) => {
                const errorMessage = error.errorMessage;
                console.log(errorMessage);
            });
    }

    useEffect(() => {}, [dialogLogoutVisible]);

    return(
        <View style={styles.header}>
            <View style={styles.imageContainer}>
                <Image 
                    source={require(`${images}/compLogoHorizontalBlue.png`)}
                    style = {styles.imageStyle}
                />
            </View>
            <TouchableOpacity onPress={() => setDialogLogoutVisible(true)} title = "Sign Out">
                <MaterialCommunityIcons name="logout" style={styles.icon} size={55} />
            </TouchableOpacity>

            {/* Dialog de logout*/}

            <Dialog.Container visible={dialogLogoutVisible} contentStyle = {styles.dialogContainer}>
                <Dialog.Title> 
                    <Text style={{color: Colors.darkBlue}}>Deseja sair?</Text>
                </Dialog.Title>
                <Dialog.Description>
                    Você será deslogado do aplicativo.
                </Dialog.Description>
                <Dialog.Button label="Cancelar" onPress={() => setDialogLogoutVisible(false)} />
                <Dialog.Button label="Sair" color='red' onPress={logout} />
            </Dialog.Container>
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
    },
    dialogContainer: {
        borderRadius: 20,
        borderWidth: 3,
        borderColor: Colors.darkBlue
    }
});