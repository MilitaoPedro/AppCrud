import { Colors } from "@/constants/Colors";

import React, { useState }  from "react";
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { TextInput } from "react-native-paper";

import { useForm, Controller } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

const images = '@/assets/images';

const schema = yup.object({
    nome: yup.string().required("Informe seu nome"),
    idade: yup.string().required("Informe sua idade"),
    numMatricula: yup.string().required("Informe seu número de matrícula")
})

export default function FormCad2( {navigation} ){

    const [userNome, setUserNome] = useState('');
    const [userIdade, setUserIdade] = useState('');
    const [userNumMatricula, setUserNumMatricula] = useState('');

    const { control, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    function handleSignUp(data){
        console.log(data);
        navigation.navigate('FormCad2');
    }

    return(
        <View style={styles.backgroundContainer}>
            <StatusBar backgroundColor={Colors.darkBlue} />
            <View style={styles.imageContainer}>
                <Image 
                    source={require(`${images}/compLogo.png`)}
                    style = {styles.imageStyle}
                />
            </View>
            <View style={styles.formContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Cadastre-se
                    </Text>
                </View>
                <View style={styles.inputsContainers}>
                    <View style = {styles.controllerView}>
                        <Controller
                            control={control}
                            name="nome"
                            render={({field:{onChange, value}}) => (
                                <TextInput
                                    onChangeText={onChange}
                                    value={value}
                                    style = {styles.textInput} 
                                    theme={{colors: { onSurfaceVariant: errors.nome? '#faa6a0' : Colors.gray}}} 
                                    activeUnderlineColor = {
                                        errors.nome ? 'red' : Colors.lightBlue
                                    } 
                                    underlineColor = {
                                        errors.nome ? 'red' : Colors.gray
                                    }  
                                    label="Nome" 
                                />
                            )}
                        />
                        {errors.nome && <Text style = {styles.errorMsg}>{errors.nome?.message}</Text>}
                    </View>
                    <View style = {styles.controllerView}>
                        <Controller
                            control={control}
                            name="idade"
                            render={({field:{onChange, value}}) => (
                                <TextInput
                                    keyboardType="numeric"
                                    autoCapitalize="false"
                                    onChangeText={onChange}
                                    value={value}
                                    style = {styles.textInput} 
                                    theme={{colors: { onSurfaceVariant: errors.idade? '#faa6a0' : Colors.gray}}}  
                                    activeUnderlineColor = {
                                        errors.idade ? 'red' : Colors.lightBlue
                                    } 
                                    underlineColor = {
                                        errors.idade ? 'red' : Colors.gray
                                    }  
                                    label="Idade" 
                                />
                            )}
                        />
                        {errors.idade && <Text style = {styles.errorMsg}>{errors.idade?.message}</Text>}
                    </View>
                    <View style = {styles.controllerView}>
                        <Controller
                            control={control}
                            name="numMatricula"
                            render={({field:{onChange, value}}) => (
                                <TextInput
                                    keyboardType="numeric"
                                    onChangeText={onChange}
                                    value={value}
                                    style = {styles.textInput} 
                                    theme={{colors: { onSurfaceVariant: errors.numMatricula? '#faa6a0' : Colors.gray}}} 
                                    activeUnderlineColor = {
                                        errors.numMatricula ? 'red' : Colors.lightBlue
                                    } 
                                    underlineColor = {
                                        errors.numMatricula ? 'red' : Colors.gray
                                    }  
                                    label="Nº de matrícula" 
                                />
                            )}
                        />
                        {errors.numMatricula && <Text style = {styles.errorMsg}>{errors.numMatricula?.message}</Text>}
                    </View>
                    <View style = {styles.controllerView}>
                        <Controller
                            control={control}
                            name="img"
                            render={({field:{onChange, value}}) => (
                                <TextInput 
                                    mode="outlined"
                                    backgroundColor = {Colors.darkBlue}
                                    onChangeText={onChange}
                                    value={value}
                                    style = {styles.textInput} 
                                    theme={{colors: { onSurfaceVariant: errors.email? '#faa6a0' : Colors.gray}}} 
                                    label="imagem" 
                                />
                            )}
                        />
                        {errors.email && <Text style = {styles.errorMsg}>{errors.email?.message}</Text>}
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btn} onPress={handleSubmit(handleSignUp)}>
                        <Text style={styles.btnText}>
                            Próximo
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {styles.imgContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Image 
                        source={require(`${images}/backArrow.png`)}
                        style = {styles.arrowStyle}
                    />
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        color: 'black',
    },
    backgroundContainer:{
        flex: 1,
        backgroundColor: Colors.darkBlue
    },
    imageContainer: {
        height: deviceHeight/4,
        width: deviceWidth/2,
        marginHorizontal: deviceWidth/4,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    imageStyle: {
        aspectRatio: 0.5,
        resizeMode: 'contain'
    },
    formContainer: {
        backgroundColor: Colors.white,
        marginHorizontal: deviceWidth/8,
        height: deviceHeight/1.7,
        borderRadius: 15
    },
    titleContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '19%'
    },
    title: {
        color: Colors.darkBlue,
        fontSize: deviceWidth*0.08,
        fontWeight: '400',
    },
    inputsContainers: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '60%'
    },
    controllerView: {
        width: '80%',
    },
    textInput: {
        width: '100%',
        activeUnderlineColor: Colors.lightBlue,
        underlineColor: Colors.gray,
        backgroundColor: 'transparent',
        color: Colors.gray,
    },
    btn: {
        width: '80%',
        backgroundColor: Colors.lightBlue,
        borderRadius: 16,
        alignItems: 'center'
    },
    btnText: {
        color: Colors.white,
        fontSize: deviceWidth*0.07,
        fontWeight: '400',
        paddingVertical: deviceWidth*0.03
    },
    btnContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '16%'
    },
    errorMsg: {
        marginTop: '1%',
        width: '90%',
        alignSelf: 'center',
        color: '#f25a4e',
    },
    arrowContainer: {
        backgroundColor: 'red',
    },
    imgContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        marginVertical: deviceHeight/14,
        marginHorizontal: deviceWidth/7,
    },
    textCad: {
        color: Colors.white,
        fontSize: deviceWidth*0.035
    },
});