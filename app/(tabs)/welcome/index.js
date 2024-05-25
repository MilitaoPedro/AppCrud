import React, {useRef, useEffect} from "react";
import { Animated, View, Text, StyleSheet, ImageBackground, Image, Dimensions, StatusBar, Easing } from 'react-native';

const images = '../../../assets/images';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default function Welcome(){

    const scaleAnimate = useRef(new Animated.Value(-50)).current;

    const animateElement = () => {
        Animated.timing(scaleAnimate, {
          toValue: 200,
          duration: 2000,
          useNativeDriver: false,
        }).start();
    };
    const animationStyle = {
        width: scaleAnimate,
        height: scaleAnimate,
    };

    return(
        <View>
            <StatusBar backgroundColor={'#0E2B49'}/>
            <ImageBackground style = {styles.backgroundImg} source={require(`${images}/welcome.png`)}>
                <View style = {styles.container}>
                    <Animated.View style = {styles.imgContainer}>
                        <Image 
                            source={require(`${images}/compLogo.png`)}
                            style = {styles.imageStyle}
                        />
                    </Animated.View>
                </View>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    backgroundImg:{
        flex: 1,
        width: deviceWidth,
        height: deviceHeight,
    },
    container: {
        width: deviceWidth,
        height: deviceHeight,
        justifyContent: "center", 
        alignItems: "center", 
    },
    imgContainer: {
        
    }
});