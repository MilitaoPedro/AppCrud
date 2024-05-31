import { Colors } from "@/constants/Colors";

import React, { useState } from "react";
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { TextInput } from "react-native-paper";

import { useForm, Controller } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

const images = '@/assets/images';

const schema = yup.object({
    email: yup.string().email("Email invalido").required("Informe seu email"),
    senha: yup.string().required("Informe sua senha")
})

export default function Login( {navigation} ){

    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const [showSenha, setShowSenha] = useState(false);
    // const secureTextEntryBool = true;

    const { control, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const handleSignIn = async(data) => {
        signInWithEmailAndPassword(auth, data.email, data.senha)
        .then((userCredential) => {
            const user = userCredential.user;
            navigation.navigate('Members')
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        })
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
                        Login
                    </Text>
                </View>
                <View style={styles.inputsContainers}>
                    <View style = {styles.controllerView}>
                        <Controller
                            control={control}
                            name="email"
                            render={({field:{onChange, value}}) => (
                                <TextInput 
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    onChangeText={onChange}
                                    value={value}
                                    style = {styles.textInput} 
                                    theme={{colors: 
                                        { 
                                            onSurfaceVariant: errors.email? '#faa6a0' : Colors.gray
                                        }}} 
                                    activeUnderlineColor = {
                                        errors.email ? 'red' : Colors.lightBlue
                                    } 
                                    underlineColor = {
                                        errors.email ? 'red' : Colors.gray
                                    }  
                                    label="Email" 
                                />
                            )}
                        />
                        {errors.email && <Text style = {styles.errorMsg}>{errors.email?.message}</Text>}
                    </View>
                    <View style = {styles.controllerView}>
                        <Controller
                            control={control}
                            name="senha"
                            render={({field:{onChange, value}}) => (
                                <TextInput 
                                    autoCapitalize="none"
                                    onChangeText={onChange}
                                    value={value}
                                    secureTextEntry = {true}
                                    style = {styles.textInput}
                                    theme={{colors: 
                                        { 
                                            onSurfaceVariant: errors.senha? '#faa6a0' : Colors.gray
                                        }}}  
                                    activeUnderlineColor = {
                                        errors.senha ? 'red' : Colors.lightBlue
                                    } 
                                    underlineColor = {
                                        errors.senha ? 'red' : Colors.gray
                                    }  
                                    label="Senha" 
                                />
                            )}
                        />
                        {errors.senha && <Text style = {styles.errorMsg}>{errors.senha?.message}</Text>}
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPass')}>
                        <Text style={styles.textForgot}>
                            Esqueci minha senha
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={handleSubmit(handleSignIn)}>
                        <Text style={styles.btnText}>
                            Entrar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {styles.cadContainer}>
                <Text style = {styles.textCad}>
                    Não tem uma conta?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style = {[styles.textCad, {fontWeight: '600'}]}>
                        Cadastre-se
                    </Text>
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
        shadowColor: Colors.white,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 10, 
        backgroundColor: Colors.white,
        marginHorizontal: deviceWidth/8,
        height: deviceHeight/2,
        borderRadius: 15
    },
    titleContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '22%'
    },
    title: {
        color: Colors.darkBlue,
        fontSize: deviceWidth*0.08,
        fontWeight: '400',
    },
    inputsContainers: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '78%'
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
    textForgot: {
        fontWeight: 'bold',
        fontSize: deviceWidth*0.03,
        color: Colors.lightBlue
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
    cadContainer: {
        marginTop: deviceHeight/30,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginHorizontal: deviceWidth/7,
    },
    textCad: {
        color: Colors.white,
        fontSize: deviceWidth*0.035
    },
    errorMsg: {
        marginTop: '1%',
        width: '90%',
        alignSelf: 'center',
        color: '#f25a4e',
    }
});