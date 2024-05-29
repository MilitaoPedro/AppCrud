import { Colors } from "@/constants/Colors";

import React from "react";
import { ImageBackground, View, Text, Dimensions, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { TextInput, Button, IconButton } from "react-native-paper";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useForm, Controller } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import Collapsible from 'react-native-collapsible';
import Header from '@/components/header';
import MemberBox1 from '@/components/memberBox';
import TesteMembers from './testeMembers';

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
                <Header />
                <View style = {styles.screenView}>
                    <ScrollView contentContainerStyle = {styles.membrosContainer}>
                        <Text style = {styles.title}>
                            MEMBROS
                        </Text>
                        <TesteMembers/>
                        <TesteMembers name = "Gabrielaaaaaaaaaaaaaa"/>
                        <TesteMembers name = "Gabrielaaaaaaaaaaaaaa"/>
                        <TesteMembers name = "Gabrielaaaaaaaaaaaaaa"/>
                        <TesteMembers name = "Gabrielaaaaaaaaaaaaaa"/>
                        <TesteMembers name = "Gabrielaaaaaaaaaaaaaa"/>
                        <TesteMembers name = "Gabrielaaaaaaaaaaaaaa"/>
                        <TesteMembers name = "Gabrielaaaaaaaaaaaaaa"/>
                        <TesteMembers name = "Gabrielaaaaaaaaaaaaaa"/>
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
        height: deviceHeight - (deviceHeight/9)
    },
    membrosContainer: {
        justifyContent: 'space-around',
        alignItems: 'center',
    }, 
    title: {
        color: Colors.darkBlue,
        fontSize: deviceWidth*0.08,
        fontWeight: '600',
        padding: '5%'
    },
});