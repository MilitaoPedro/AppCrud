import { Colors } from "@/constants/Colors";

import React, { useState } from "react";
import { 
    ImageBackground, 
    View, 
    Text, 
    Dimensions, 
    StyleSheet, 
    ScrollView, 
    BackHandler, 
    Alert,
    Modal,
    Button,
    Image,
} from 'react-native';

import { TextInput } from "react-native-paper";

import { StatusBar } from 'expo-status-bar';

import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from '@/FirebaseConfig';

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TouchableOpacity} from 'react-native-gesture-handler'
import { ZoomInDown } from "react-native-reanimated";

import { useForm, Controller } from 'react-hook-form';

import MemberBox from '@/components/memberBox';

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import { addMember } from './memberService'

const images = '@/assets/images';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

const schema = yup.object({
    nome: yup.string().required("Informe seu nome"),
    email: yup.string().email("Email invalido").required("Informe seu email"),
    idade: yup.string().required("Informe sua idade"),
    numMatricula: yup.string().required("Informe sua matrícula"),
})

export default function ModalAdd( { setIsModalVisible, isOpen, onAdd } ){

    const [showSenha, setShowSenha] = useState(false);
    // const secureTextEntryBool = true;

    const { control, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const handleSignIn = async (data) => {
        try {
            const updatedMembers = await addMember(data);
            onAdd(updatedMembers);
        } catch (e) {
            console.error("Error adding member: ", e);
        }
    }

    if(isOpen){
        return (
            <View style={styles.viewContainer}>
                <View style={styles.wrap}>
                    <View style={styles.container}>
                        <Image 
                            source={require(`${images}/userImage.png`)} 
                            style={styles.image}/>
                        <TouchableOpacity
                            style = {styles.closeIconTouchable}
                            onPress={() => setIsModalVisible(false)}>
                            <View style = {{marginRight: '5%'}}>
                                <MaterialCommunityIcons
                                    name="close"
                                    color={Colors.darkBlue}
                                    size={50} 
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewStyle} height = {deviceHeight/3}>
                        <View>
                            <View style = {styles.collapsedContainer}>
                                <View style = {styles.collapsedRow}>
                                    <Text style = {styles.collapsedAtributte}>
                                        Nome:
                                    </Text>
                                    <View style = {{
                                        ...styles.inputAndErroContainer,
                                        width: '70%'
                                        }}>
                                        <Controller
                                            control={control}
                                            name="nome"
                                            render={({field:{onChange, value}}) => (
                                                <TextInput 
                                                    mode="outlined"
                                                    onChangeText={onChange}
                                                    value={value}
                                                    numberOfLines={1}
                                                    style = {styles.mBoxName}
                                                    theme={{colors: 
                                                        { 
                                                            onSurfaceVariant: errors.nome? '#faa6a0' : Colors.gray
                                                        }}} 
                                                    activeOutlineColor = {
                                                        errors.nome ? 'red' : Colors.lightBlue
                                                    } 
                                                    outlineColor = {
                                                        errors.nome ? 'red' : Colors.gray
                                                    }  
                                                    label="Nome" 
                                                />
                                            )}
                                        />
                                        {errors.nome && <Text style = {styles.errorMsg}>{errors.nome?.message}</Text>}
                                    </View>
                                </View>
                                <View style = {styles.collapsedEmailRow}>
                                    <View style = {styles.collapsedRow}>
                                        <Text style = {styles.collapsedAtributte}>
                                            Email:
                                        </Text>
                                        <View style = {{
                                            ...styles.inputAndErroContainer,
                                            width: '70%'
                                            }}>
                                            <Controller
                                                control={control}
                                                name="email"
                                                render={({field:{onChange, value}}) => (
                                                    <TextInput 
                                                        mode="outlined"
                                                        keyboardType="email-address"
                                                        autoCapitalize="none"
                                                        autoComplete="email"
                                                        onChangeText={onChange}
                                                        value={value}
                                                        numberOfLines={1}
                                                        style = {styles.mBoxName}
                                                        theme={{colors: 
                                                            { 
                                                                onSurfaceVariant: errors.email? '#faa6a0' : Colors.gray
                                                            }}} 
                                                        activeOutlineColor = {
                                                            errors.email ? 'red' : Colors.lightBlue
                                                        } 
                                                        outlineColor = {
                                                            errors.email ? 'red' : Colors.gray
                                                        }  
                                                        label="Email" 
                                                    />
                                                )}
                                            />
                                            {errors.email && <Text style = {styles.errorMsg}>{errors.email?.message}</Text>}
                                        </View>
                                    </View>
                                </View>
                                <View style = {styles.collapsedLastRow}>
                                    <View style = {styles.collapsedRow}>
                                        <View style = {styles.collapsedAgeRow}>
                                            <Text style = {styles.collapsedAtributte}>
                                                Idade:
                                            </Text>
                                            <View style = {{
                                                ...styles.inputAndErroContainer,
                                                width: '50%'
                                                }}>
                                                <Controller
                                                    control={control}
                                                    name="idade"
                                                    render={({field:{onChange, value}}) => (
                                                        <TextInput 
                                                            mode="outlined"
                                                            keyboardType="numeric"
                                                            onChangeText={onChange}
                                                            value={value}
                                                            numberOfLines={1}
                                                            style = {styles.mBoxName}
                                                            theme={{colors: 
                                                                { 
                                                                    onSurfaceVariant: errors.idade? '#faa6a0' : Colors.gray
                                                                }}} 
                                                            activeOutlineColor = {
                                                                errors.idade ? 'red' : Colors.lightBlue
                                                            } 
                                                            outlineColor = {
                                                                errors.idade ? 'red' : Colors.gray
                                                            }  
                                                            label="Idade" 
                                                        />
                                                    )}
                                                />
                                                {errors.idade && <Text style = {styles.errorMsg}>{errors.idade?.message}</Text>}
                                            </View>
                                        </View>
                                        <View style = {styles.collapsedMatriculaRow}>
                                            <Text style = {styles.collapsedAtributte}>
                                                Matrícula:
                                            </Text>
                                            <View style = {{
                                                ...styles.inputAndErroContainer,
                                                width: '50%'
                                                }}>
                                                <Controller
                                                    control={control}
                                                    name="numMatricula"
                                                    render={({field:{onChange, value}}) => (
                                                        <TextInput 
                                                            mode="outlined"
                                                            keyboardType="numeric"
                                                            onChangeText={onChange}
                                                            value={value}
                                                            numberOfLines={1}
                                                            style = {styles.mBoxName}
                                                            theme={{colors: 
                                                                { 
                                                                    onSurfaceVariant: errors.numMatricula? '#faa6a0' : Colors.gray
                                                                }}} 
                                                            activeOutlineColor = {
                                                                errors.numMatricula ? 'red' : Colors.lightBlue
                                                            } 
                                                            outlineColor = {
                                                                errors.numMatricula ? 'red' : Colors.gray
                                                            }  
                                                            label="Matrícula" 
                                                        />
                                                    )}
                                                />
                                                {errors.numMatricula && <Text style = {styles.errorMsg}>{errors.numMatricula?.message}</Text>}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity 
                                    style={styles.btnAdicionar}
                                    onPress={handleSubmit(handleSignIn)}>
                                    <Text style = {styles.btnText}>
                                        Adicionar
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: deviceWidth,
        height: deviceHeight,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1000,
    },
    wrap: {
        paddingTop: '5%',
        width: '85%',
        flexDirection: 'collumn',
        justifyContent: 'center',
        marginVertical: deviceHeight/50,
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: Colors.darkBlue,
        borderRadius: 20,
        padding: '2%',
    },
    container: { 
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '5%'
    },
    image: { 
        width: deviceWidth/4, 
        height: deviceWidth/4, 
        borderRadius: 60,
        resizeMode: 'contain',
        aspectRatio: 1,
        marginRight: 'auto',
        marginLeft: deviceWidth*0.28,
        backgroundColor: Colors.white
    },
    collapsedContainer: {
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    collapsedRow: {
        width: '100%',
        paddingHorizontal: '5%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    collapsedAtributte: {
        color: Colors.darkBlue,
        fontWeight: 'bold',
        fontSize: deviceWidth*0.04
    },
    inputAndErroContainer: {
        flexDirection: 'collumn',
    },
    mBoxName: {
        color: Colors.gray,
        backgroundColor: 'transparent',
        height: 50
    },
    errorMsg: {
        width: '90%',
        alignSelf: 'center',
        color: '#f25a4e',
    },
    collapsedFullName: {
        color: Colors.darkBlue,
        fontSize: deviceWidth*0.04,
        marginRight: 'auto',
        marginLeft: '4%'
    },
    collapsedAgeRow: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '40%',
        alignItems: 'center',
    },
    collapsedMatriculaRow: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
        alignItems: 'center',
    },
    btnAdicionar: {
        backgroundColor: Colors.lightBlue,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 'auto',
    },
    btnText: {
        color: 'white',
        fontSize: deviceWidth*0.06,
        fontWeight: '500',
        paddingHorizontal: '10%',
        paddingVertical: '2%',
    }
})