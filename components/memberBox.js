import { Colors } from "@/constants/Colors";

import React, { useState } from "react";
import { ImageBackground, View, Text, Dimensions, StyleSheet, Animated,  Image } from 'react-native';


import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { TouchableOpacity } from "react-native-gesture-handler";

import Collapsible from 'react-native-collapsible';

const images = '@/assets/images';

let deviceWidth = (Dimensions.get('window').width);
let deviceHeight = (Dimensions.get('window').height);
let rotateIcon = true;

const defaultName = 'Anônimo';
const defaultMatricula = '000000000'

export default function MemberBox({name, numMatricula}){

    name != null ? memberName = name : memberName = defaultName;
    numMatricula != null ? memberMatricula = numMatricula : memberMatricula = defaultMatricula;

    const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));
    const [rotated, setRotated] = useState(false);

    const iconPressed = () => {

        Animated.timing(rotateAnimation, {
            toValue: !rotated ? 1 : 0,
            duration: 500,
            useNativeDriver: true,
        }).start();

        setRotated(!rotated);
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
        <Animated.View style = {styles.memberBox}>
            <View style = {styles.nonCollapsedContainer}>
                <Image 
                    source={require(`${images}/react-logo.png`)}
                    style = {styles.mBoxImg}
                />
                <Text style = {styles.mBoxName} numberOfLines={1}>
                    {memberName}
                </Text>
                <TouchableOpacity 
                    onPress={async () => iconPressed()} 
                    style = {styles.chevronContainerTouchable} >
                    <Animated.View style = {animatedStyle}>
                        <MaterialCommunityIcons
                            name="chevron-right" 
                            style={styles.chevronIcon} 
                            size={deviceWidth*0.12} 
                        />
                    </Animated.View>
                </TouchableOpacity>
            </View>
            <Animated.View style = {styles.collapsedContainer}>
                <View style = {styles.collapsedRow}>
                    <Text style = {styles.collapsedAtributte}>
                        Nome:
                    </Text>
                    <Text style = {styles.collapsedFullName}>
                        Bruna Ferreira Mello Reis
                    </Text>
                    <TouchableOpacity 
                        style={styles.editContainerTouchable}>
                        <MaterialCommunityIcons
                                name="pencil-outline" 
                                style={styles.editIcon} 
                                size={deviceWidth*0.05} 
                        />
                    </TouchableOpacity>
                </View>
                <View style = {styles.collapsedEmailRow}>
                    <View style = {styles.collapsedRow}>
                        <Text style = {styles.collapsedAtributte}>
                            Email:
                        </Text>
                        <Text style = {styles.collapsedFullName}>
                            bruninhalinda07@gmail.com
                        </Text>
                        <TouchableOpacity 
                            style={styles.editContainerTouchable}>
                            <MaterialCommunityIcons
                                    name="pencil-outline" 
                                    style={styles.editIcon} 
                                    size={deviceWidth*0.05} 
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style = {styles.collapsedLastRow}>
                    <View style = {styles.collapsedRow}>
                        <View style = {styles.collapsedAgeRow}>
                            <Text style = {styles.collapsedAtributte}>
                                Idade:
                            </Text>
                            <Text style = {styles.collapsedFullName} marginLeft = '10%'>
                                28
                            </Text>
                            <TouchableOpacity 
                                style={styles.editContainerTouchable}>
                                <MaterialCommunityIcons
                                        name="pencil-outline" 
                                        style={styles.editIcon} 
                                        size={deviceWidth*0.05} 
                                />
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.collapsedAgeRow}>
                            <Text style = {styles.collapsedAtributte}>
                                Matrícula:
                            </Text>
                            <Text style = {styles.collapsedFullName} marginLeft = '8%'>
                                202310623
                            </Text>
                            <TouchableOpacity 
                                style={styles.editContainerTouchable}>
                                <MaterialCommunityIcons
                                        name="pencil-outline" 
                                        style={styles.editIcon} 
                                        size={deviceWidth*0.05} 
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableOpacity 
                    style={styles.btnDelete}>
                    <Text style = {styles.btnText}>
                        Excluir Perfil
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    memberBox: {
        flex: 0,
        width: deviceWidth*0.8,
        flexDirection: 'collumn',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: deviceHeight/50,
        backgroundColor: Colors.white,
        borderWidth: 3,
        borderColor: Colors.darkBlue,
        borderRadius: 20,
        padding: '2%'
    },
    nonCollapsedContainer: {
        height: '100%', // Tenq ser animado 100% -> 40%
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    mBoxImgContainer: {
        borderRadius: 20,
        marginHorizontal: '1%'
    },
    mBoxImg: {
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    mBoxName: {
        color: Colors.darkBlue,
        fontSize: deviceWidth*0.07,
        fontWeight: '600',
        width: '45%',
    },
    chevronIcon: {
        aspectRatio: 1,
        color: Colors.darkBlue,
    },
    collapsedContainer: {
        height: '60%', // Animar 0% -> 60%
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    collapsedRow: {
        width: '100%',
        paddingHorizontal: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    collapsedAtributte: {
        color: Colors.darkBlue,
        fontWeight: 'bold',
        fontSize: deviceWidth*0.0375
    },
    editIcon: {
        aspectRatio: 1,
        color: Colors.darkBlue,
    },
    collapsedFullName: {
        color: Colors.darkBlue,
        fontSize: deviceWidth*0.0375,
        marginRight: 'auto',
        marginLeft: '4%'
    },
    collapsedAgeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnDelete: {
        backgroundColor: '#FAAAAA',
        borderRadius: 40,
        paddingHorizontal: '5%',
        paddingVertical: '0.5%',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 'auto'
    },
    btnText: {
        color: Colors.darkBlue,
        fontSize: deviceWidth*0.0375,
        fontWeight: '500'
    }
});