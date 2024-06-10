import { Colors } from "@/constants/Colors";

import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { TextInput } from "react-native-paper";

import { useForm, Controller } from 'react-hook-form';

import Dialog from 'react-native-dialog';

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

const images = '@/assets/images';

const schema = yup.object({
    email: yup.string()
        .email("Email invalido")
        .required("Informe seu email"),
    senha: yup.string()
        .test('len', "A senha deve ter mais de 6 caracteres", val => val.length > 6)
        .required("Informe sua senha"),
    confirmSenha: yup.string()
        .oneOf([yup.ref('senha'), null], "As senhas não são iguais")
        .required("Confirme sua senha")
});

export default function SignUp( {navigation} ){

    const auth = FIREBASE_AUTH;

    const { control, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            senha: '',
            confirmSenha: ''
        }
    });

    function handleSignIn(data){
        createUserWithEmailAndPassword(auth, data.email, data.senha, data.confirmSenha)
        .then((UserCredential) => {
            const user = UserCredential.user;
            setDialogLogoutVisible(true);
            reset();
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        })
    }

    const [dialogLogoutVisible, setDialogLogoutVisible] = useState(false);
    const [showSenha, setShowSenha] = useState(false);
    const [showConfirmSenha, setShowConfirmSenha] = useState(false);

    useEffect(() => {}, [dialogLogoutVisible]);

    return(
        <View style={styles.backgroundContainer}>
            <StatusBar translucent = {true} backgroundColor={Colors.darkBlue} />
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
                            name="email"
                            render={({field:{onChange, value}}) => (
                                <TextInput
                                    onChangeText={onChange}
                                    autoCapitalize="none"
                                    value={value}
                                    style = {styles.textInput} 
                                    theme={{colors: { onSurfaceVariant: errors.email? '#faa6a0' : Colors.gray}}} 
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
                                    secureTextEntry = {!(showSenha)}
                                    style = {styles.textInput} 
                                    theme={{colors: { onSurfaceVariant: errors.senha? '#faa6a0' : Colors.gray}}} 
                                    right = {
                                        <TextInput.Icon 
                                            size={17}
                                            style={{opacity: 0.5}}
                                            icon = {showSenha ? 'eye' : 'eye-off'} 
                                            color={Colors.darkBlue}
                                            onPress={() => setShowSenha(!showSenha)}
                                        />
                                    }
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
                    <View style = {styles.controllerView}>
                        <Controller
                            control={control}
                            name="confirmSenha"
                            render={({field:{onChange, value}}) => (
                                <TextInput
                                    autoCapitalize="none"
                                    onChangeText={onChange}
                                    secureTextEntry = {!(showConfirmSenha)}
                                    value={value}
                                    style = {styles.textInput}
                                    right = {
                                        <TextInput.Icon 
                                            size={17}
                                            style={{opacity: 0.5}}
                                            icon = {showConfirmSenha ? 'eye' : 'eye-off'} 
                                            color={Colors.darkBlue}
                                            onPress={() => setShowConfirmSenha(!showConfirmSenha)}
                                        />
                                    }  
                                    theme={{colors: { onSurfaceVariant: errors.confirmSenha? '#faa6a0' : Colors.gray}}} 
                                    activeUnderlineColor = {
                                        errors.confirmSenha ? 'red' : Colors.lightBlue
                                    } 
                                    underlineColor = {
                                        errors.confirmSenha ? 'red' : Colors.gray
                                    }  
                                    label="Confirmar senha" 
                                />
                            )}
                        />
                        {errors.confirmSenha && <Text style = {styles.errorMsg}>{errors.confirmSenha?.message}</Text>}
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btn} onPress={handleSubmit(handleSignIn)}>
                        <Text style={styles.btnText}>
                            Cadastrar
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

            {/* Dialog de usuário criado com sucesso*/}

            <Dialog.Container visible={dialogLogoutVisible} contentStyle = {styles.dialogContainer}>
                <Dialog.Title> 
                    <Text style={{color: Colors.darkBlue}}>Sucesso</Text>
                </Dialog.Title>
                <Dialog.Description>
                    O novo usuário foi cadastrado com sucesso
                </Dialog.Description>
                <Dialog.Button label="Ok" onPress={() => navigation.navigate('Login')} />
            </Dialog.Container>

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
    dialogContainer: {
        borderRadius: 20,
        borderWidth: 3,
        borderColor: Colors.darkBlue
    }
});