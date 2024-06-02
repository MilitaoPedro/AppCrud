import { Colors } from "@/constants/Colors";

import React, {useRef, useEffect} from "react";
import { View, StyleSheet, ImageBackground, Image, Dimensions, StatusBar, Text } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

const images = '../../../assets/images';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default function Welcome( { navigation } ){

    return(
        <View style={styles.mainContainer}>
            <StatusBar hidden backgroundColor={'#0E2B49'}/>
            <ImageBackground style = {styles.backgroundImg} source={require(`${images}/welcome.png`)}>
                <View style = {styles.containerStyle}>
                    <Image 
                        source={require(`${images}/compLogo.png`)}
                        style = {styles.imageStyle}
                    />
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Login')}
                        style={styles.btn}>
                        <Text style = {[styles.textBtn, {fontWeight: '600'}]}>
                            Entrar
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'transparent',
        flex: 1,
    },
    backgroundImg:{
        flex: 1,
    },
    containerStyle: {
        flex: 1,
        height: deviceHeight,
        width: deviceWidth,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    imageStyle: {
        width: 200,
        height: 400, 
        resizeMode: 'contain'
    },
    btn: {
        backgroundColor: 'white',
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: deviceHeight*0.1
    },
    textBtn: {
        fontSize: deviceWidth*0.07,
        fontWeight: '800',
        color: Colors.darkBlue,
        paddingHorizontal: 35,
        paddingVertical: 10
    }
});