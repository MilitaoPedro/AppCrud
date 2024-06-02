import React, { useEffect } from "react";
import {
    View,
    StyleSheet,
    Animated,
    ImageBackground,
    Image
} from 'react-native';

export default function LoadingPage(){

    const animations = {
        one: new Animated.Value(0),
        two: new Animated.Value(0),
        three: new Animated.Value(0),
    }

    function onAnimate(animation, nextAnimation) {
        Animated.sequence([
            Animated.timing(animation, {
                toValue: -10,
                duration: 400,
                useNativeDriver: true
            }), 
            Animated.timing(animation, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true
            }),  
        ]).start();

        setTimeout(nextAnimation, 200);
    }

    function onStartAnimate(){
        function onThreeAnimation(){
            onAnimate(animations.three, () => {
                setTimeout(onStartAnimate, 800);
            });
        }
        function onTwoAnimation(){
            onAnimate(animations.two, onThreeAnimation);
        }
        onAnimate(animations.one, onTwoAnimation);
    }

    useEffect(() => {
        onStartAnimate();
    }, []);

    return (
        <View style = {styles.screenContainer}>
            <ImageBackground style = {styles.backgroundImg} source={require('@/assets/images/welcome.png')}>
                <View style={styles.logoBallsContainer}>
                    <Image 
                        source={require('@/assets/images/compLogo.png')}
                        style = {styles.imageStyle}
                    />
                    <View style={styles.ballsContainer}>
                        <Animated.View style = {{
                            ...styles.loadingBall,
                            transform: [{ translateY: animations.one }]
                            }}/>         
                        <Animated.View style = {{
                            ...styles.loadingBall,
                            transform: [{ translateY: animations.two }]
                            }}/>          
                        <Animated.View style = {{
                            ...styles.loadingBall,
                            transform: [{ translateY: animations.three }]
                            }}/> 
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    backgroundImg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoBallsContainer: {
        flexDirection: 'collumn',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        width: 200,
        height: 400, 
        resizeMode: 'contain'
    },

    ballsContainer: {
        width: 80,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    loadingBall: {
        width: 14,
        height: 14,
        borderRadius: 20,
        backgroundColor: 'white'
    }
});