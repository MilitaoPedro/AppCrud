import { Colors } from "@/constants/Colors";

import React from "react";
import { ImageBackground, View, Text, Dimensions, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { TextInput, Button, IconButton } from "react-native-paper";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useForm, Controller } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import Header from '@/components/header';
import MemberBox from '@/components/memberBox';

const images = '@/assets/images';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

let memberName = 'Bruna';
let memberMatricula = '202310533';

export default function Members( {navigation} ){
    return(
        <>
            <StatusBar translucent backgroundColor={'#A2ADB2'}/>
            <ImageBackground style = {styles.backgroundImg} source={require(`${images}/lightBackgroundComp.png`)}>
                <View style = {styles.screenView}>
                    <Header />
                    <ScrollView contentContainerStyle = {styles.membrosContainer}>
                        <Text style = {styles.title}>
                            MEMBROS
                        </Text>
                        <MemberBox name = 'Bruna' numMatricula={111111111}/>
                        <MemberBox name = 'Gabriela' numMatricula={111111111}/>
                        <MemberBox name = 'Pedro' numMatricula={111111111}/>
                        <MemberBox name = 'João' numMatricula={111111111}/>
                        <MemberBox />
                        <MemberBox />
                    </ScrollView>
                </View>
            </ImageBackground>
        </>
    );
}

const styles = StyleSheet.create({
    backgroundImg:{
        flex: 1,
    },
    screenView: {
        flex: 1,
    },
    membrosContainer: {
        flexGrow: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }, 
    title: {
        color: Colors.darkBlue,
        fontSize: deviceWidth*0.08,
        fontWeight: '600',
        padding: '5%',
    },
    memberBoxContainer: {
        height: deviceHeight/6,
        width: deviceWidth*0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    memberBox: {
        flexDirection: 'row',
        width: '100%',
        height: '100%'
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
        aspectRatio: 1
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
    chevronIcon: {
        marginRight: '10%',
        marginTop: '13.4%',
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