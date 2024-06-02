import { Colors } from "@/constants/Colors";

import React, { useState, useEffect } from "react";
import { 
    View, 
    Text, 
    Dimensions, 
    StyleSheet, 
    Image, 
    TouchableOpacity
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { TextInput } from "react-native-paper";

import { useForm, Controller } from 'react-hook-form';

import Dialog from 'react-native-dialog';

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

const images = '@/assets/images';

const schema = yup.object({
    email: yup.string()
        .email("Email invalido")
        .required("Informe seu email"),
});

export default function ForgetPass( { navigation } ){

    const auth = FIREBASE_AUTH;

    const [dialogLogoutVisible, setDialogLogoutVisible] = useState(false);
    const [emailEnvio, setEmailEnvio] = useState('');

    useEffect(() => {}, [dialogLogoutVisible]);

    const { control, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    function handleSignIn(data){
        sendPasswordResetEmail(auth, data.email)
        .then(() => {
            setEmailEnvio(data.email);
            setDialogLogoutVisible(true);
        })
        .catch((error) => {
            const errorMessage = error.message;
            Alert.alert("Opss", `Alguma coisa não ocorreu como esperado. ${errorMessage}. Tente novamente ou volte a página de Login`);
        });
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
                <TouchableOpacity 
                    style={styles.iconContainer}>
                    <MaterialCommunityIcons
                            name="lock-reset" 
                            style={styles.lockIcon} 
                            size={deviceHeight*0.18} 
                    />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.title} numberOfLines={2}>
                        Esqueci minha senha
                    </Text>
                    <Text style={styles.subTitle}>
                        Digite seu e-mail e enviaremos um link para que você possa redefinir sua senha
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
                                    label="Digite o e-mail cadastrado" 
                                />
                            )}
                        />
                        {errors.email && <Text style = {styles.errorMsg}>{errors.email?.message}</Text>}
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btn} onPress={handleSubmit(handleSignIn)}>
                        <Text style={styles.btnText}>
                            Enviar
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

            {/* Dialog de logout*/}

            <Dialog.Container visible={dialogLogoutVisible} contentStyle = {styles.dialogContainer}>
                <Dialog.Title> 
                    <Text style={{color: Colors.darkBlue}}>E-mail enviado</Text>
                </Dialog.Title>
                <Dialog.Description>
                    Foi enviado um email para {emailEnvio}. Verifique sua caixa e-mail
                </Dialog.Description>
                <Dialog.Button label="Ok" onPress={() => {
                    setDialogLogoutVisible(false);
                    setEmailEnvio('');
                    navigation.navigate('Login');
                    }} />
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
        height: deviceHeight/2,
        borderRadius: 15,
        flexDirection:'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    iconContainer: {
        backgroundColor: 'transparent'
    },
    lockIcon: {
        color: Colors.darkBlue
    },
    titleContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '80%'
    },
    title: {
        color: Colors.darkBlue,
        fontSize: deviceWidth*0.07,
        fontWeight: '400',
        textAlign: 'center',
    },
    subTitle: {
        marginTop: '3%',
        textAlign: 'center',
        color: Colors.gray,
        fontWeight: '500',
    },
    inputsContainers: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%'
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
        paddingVertical: deviceWidth*0.03,
    },
    btnContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%'
    },
    errorMsg: {
        marginTop: '1%',
        width: '90%',
        alignSelf: 'center',
        color: '#f25a4e',
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