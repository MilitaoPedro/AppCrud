import { Colors } from "@/constants/Colors";

import React, { useState } from "react";
import { ImageBackground, View, Text, Dimensions, StyleSheet, Animated,  Image } from 'react-native';


import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { TouchableOpacity } from "react-native-gesture-handler";

const images = '@/assets/images';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
let rotateIcon = true;

const defaultName = 'Anônimo';
const defaultMatricula = '000000000'

export default function MemberBox({name, numMatricula}){

    name != null ? memberName = name : memberName = defaultName;
    numMatricula != null ? memberMatricula = numMatricula : memberMatricula = defaultMatricula;

    const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));

    let rotated = false;

    const iconPressed = () => {

        Animated.timing(rotateAnimation, {
            toValue: !rotated ? 1 : 0,
            duration: 500,
            useNativeDriver: true,
        }).start();

        rotated = !rotated;
    };

    const interpolateRotating = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "90deg"],
    });

    const animatedStyle = {
        transform: [
          {
            rotate: interpolateRotating,
          },
        ],
    };

    return(
        <View style = {styles.memberBoxContainer}>
            <ImageBackground style = {styles.memberBox} imageStyle={{resizeMode: 'contain'}} source={require(`${images}/memberBox.png`)}>
                <View style = {styles.mBoxImgContainer}>
                    <Image 
                        source={require(`${images}/react-logo.png`)}
                        style = {styles.mBoxImg}
                    />
                </View>
                <Text style = {styles.mBoxName}>
                    {memberName}
                </Text>
                <TouchableOpacity 
                    onPress={async () => iconPressed()} 
                    style = {styles.chevronContainerTouchable} >
                    <Animated.View style = {animatedStyle}>
                        <MaterialCommunityIcons
                            name="chevron-right" 
                            style={styles.chevronIcon} 
                            size={50} 
                        />
                    </Animated.View>

                </TouchableOpacity>
                
            </ImageBackground>
            <Text style = {styles.mBoxMatricula}>
                {memberMatricula}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    memberBoxContainer: {
        height: deviceHeight/6,
        width: deviceWidth*0.8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
    },
    memberBox: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
    },
    mBoxImgContainer: {
        height: '58.50%',
        width: '25.55%',
        marginLeft: '4%',
        marginTop: '7%',
        borderRadius: 20
    },
    mBoxImg: {
        resizeMode: 'contain',
    },
    mBoxName: {
        marginVertical: '14.6%',
        width: '45%',
        height: '20%',
        color: Colors.darkBlue,
        fontSize: deviceWidth*0.07,
        fontWeight: '600',
        marginLeft: '5%',
    },
    chevronContainerTouchable: {
        height: '31%',
        marginTop: '100%',
    },
    chevronIcon: {
        color: Colors.darkBlue,
    },
    mBoxMatricula: {
        width: '20.5%',
        marginTop: '-10%',
        marginRight: '7.6%',
        alignSelf: 'flex-end',
        color: Colors.darkBlue,
        fontWeight: '600',
        fontSize: deviceWidth*0.035,
    }
});