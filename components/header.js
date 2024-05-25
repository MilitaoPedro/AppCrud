import { Colors } from "@/constants/Colors";

import React from "react";
import { View, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const images = '@/assets/images';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
let headerFixed = false;

export default function Header(){
    return(
        <View style={styles.header}>
            <View style={styles.imageContainer}>
                <Image 
                    source={require(`${images}/compLogoHorizontalBlue.png`)}
                    style = {styles.imageStyle}
                />
            </View>
            <TouchableOpacity>
                <MaterialCommunityIcons name="account" style={styles.icon} size={55} />
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