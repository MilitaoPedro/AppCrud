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

import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import Dialog from 'react-native-dialog';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { deleteMember, updateMember } from "./memberService";

import * as ImagePicker from 'expo-image-picker';

const images = '@/assets/images';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const defaultName = 'Anônimo';

export default function MemberBox({ onDelete, memberId, name, email, numMatricula, idade, imageURL }) {
    const memberName = name ? name : defaultName;

    const [editField, setEditField] = useState(null);
    const [newFieldValue, setNewFieldValue] = useState('');

    const [deleteMemberBox, setDeleteMemberBox] = useState(false);

    const [expanded, setExpanded] = useState(false);

    const onItemPress = () => {
        setExpanded(!expanded);
    };

    const animatedStyleRotation = useAnimatedStyle(() => {
        const rotation = expanded ? withTiming('90deg') : withTiming('0deg');
        return {
            transform: [
                {
                    rotate: rotation
                }
            ]
        };
    });

    const animatedStyle = useAnimatedStyle(() => {
        const animatedHeight = expanded ? withTiming(deviceHeight/6) : withTiming(0);
        return {
            height: animatedHeight,
        };
    });

    useEffect(() => {}, [editField]);
    useEffect(() => {}, [deleteMemberBox]);

    const handleDelete = async () => {
        try {
            const updatedMembers = await deleteMember(memberId);
            setDeleteMemberBox(false);
            onDelete(updatedMembers);
        } catch (e) {
            console.error("Error deleting member: ", e);
        }
    };

    const handleUpdate = async () => {
        try {
            const updatedFields = { [editField]: newFieldValue };
            const updatedMembers = await updateMember(memberId, updatedFields);
            setNewFieldValue('');
            setEditField(null);
            onDelete(updatedMembers);
        } catch (e) {
            console.error("Error updating member: ", e);
        }
    };

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result);
            const updatedFields = { image :  result.assets[0].uri};
            const updatedMembers = await updateMember(memberId, updatedFields);
            setNewFieldValue('');
            setEditField(null);
            onDelete(updatedMembers);
        }
    };

    return (
        <View style={styles.wrap}>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={pickImageAsync}>
                    <Image
                        source={{ uri: imageURL }}
                        style={styles.image} />
                </TouchableOpacity> 
                <Text style={styles.mBoxName} numberOfLines={1}>
                    {memberName}
                </Text>
                <TouchableOpacity onPress={onItemPress}>
                    <Animated.View style={animatedStyleRotation}>
                        <MaterialCommunityIcons
                            name="chevron-right"
                            color={Colors.darkBlue}
                            size={50}
                        />
                    </Animated.View>
                </TouchableOpacity>
            </View>
            <Animated.View style={animatedStyle}>
                <View>
                    <Animated.View style={styles.collapsedContainer}>
                        <View style={styles.collapsedRow}>
                            <Text style={styles.collapsedAtributte}>
                                Nome:
                            </Text>
                            <Text style={styles.collapsedFullName}>
                                {name}
                            </Text>
                            <TouchableOpacity
                                style={styles.editContainerTouchable}
                                onPress={() => {
                                    setEditField('nome');
                                    setNewFieldValue(name);
                                }}>
                                <MaterialCommunityIcons
                                    name="pencil-outline"
                                    style={styles.editIcon}
                                    size={deviceWidth * 0.05}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.collapsedEmailRow}>
                            <View style={styles.collapsedRow}>
                                <Text style={styles.collapsedAtributte}>
                                    Email:
                                </Text>
                                <Text style={styles.collapsedFullName}>
                                    {email}
                                </Text>
                                <TouchableOpacity
                                    style={styles.editContainerTouchable}
                                    onPress={() => {
                                        setEditField('email');
                                        setNewFieldValue(email);
                                    }}>
                                    <MaterialCommunityIcons
                                        name="pencil-outline"
                                        style={styles.editIcon}
                                        size={deviceWidth * 0.05}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.collapsedLastRow}>
                            <View style={styles.collapsedRow}>
                                <View style={styles.collapsedAgeRow}>
                                    <Text style={styles.collapsedAtributte}>
                                        Idade:
                                    </Text>
                                    <Text style={styles.collapsedFullName} marginLeft='10%'>
                                        {idade}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.editContainerTouchable}
                                        onPress={() => {
                                            setEditField('idade');
                                            setNewFieldValue(idade);
                                        }}>
                                        <MaterialCommunityIcons
                                            name="pencil-outline"
                                            style={styles.editIcon}
                                            size={deviceWidth * 0.05}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.collapsedAgeRow}>
                                    <Text style={styles.collapsedAtributte}>
                                        Matrícula:
                                    </Text>
                                    <Text style={styles.collapsedFullName} marginLeft='8%'>
                                        {numMatricula}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.editContainerTouchable}
                                        onPress={() => {
                                            setEditField('numMatricula');
                                            setNewFieldValue(numMatricula);
                                        }}>
                                        <MaterialCommunityIcons
                                            name="pencil-outline"
                                            style={styles.editIcon}
                                            size={deviceWidth * 0.05}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.btnDelete}
                            onPress={() => setDeleteMemberBox(true)}>
                            <Text style={styles.btnText}>
                                Excluir Perfil
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </Animated.View>

            {/* Dialogs de edição e exclusão de membros */}

            <Dialog.Container visible={editField !== null} contentStyle = {styles.dialogContainer}>
                <Dialog.Title>
                    <Text style={{color: Colors.darkBlue}}>Edição de membro</Text>
                </Dialog.Title>
                <Dialog.Description>
                    Digite o(a) novo(a) {editField} do membro:
                </Dialog.Description>
                <Dialog.Input
                    color = {Colors.darkBlue}
                    placeholder={`Novo ${editField}`}
                    value={newFieldValue}
                    onChangeText={setNewFieldValue}
                />
                <Dialog.Button label="Cancel" onPress={() => setEditField(null)} />
                <Dialog.Button label="Save" onPress={handleUpdate} />
            </Dialog.Container>


            <Dialog.Container visible={deleteMemberBox} contentStyle = {styles.dialogContainer}>
                <Dialog.Title> 
                    <Text style={{color: Colors.darkBlue}}>Excluir Membro?</Text>
                </Dialog.Title>
                <Dialog.Description>
                    Você tem certeza que deseja deletar esse membro?
                </Dialog.Description>
                <Dialog.Button label="Cancelar" onPress={() => setDeleteMemberBox(false)} />
                <Dialog.Button label="Deletar" color='red' onPress={handleDelete} />
            </Dialog.Container>
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: {
        width: deviceWidth * 0.85,
        flexDirection: 'column',
        justifyContent: 'center',
        marginVertical: deviceHeight / 50,
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: Colors.darkBlue,
        borderRadius: 20,
        padding: '2%'
    },
    container: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 20,
        resizeMode: 'contain',
        aspectRatio: 1
    },
    mBoxName: {
        color: Colors.darkBlue,
        fontSize: deviceWidth * 0.07,
        fontWeight: '600',
        maxWidth: '55%',
        marginRight: 'auto',
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
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    collapsedAtributte: {
        color: Colors.darkBlue,
        fontWeight: 'bold',
        fontSize: deviceWidth * 0.04
    },
    editIcon: {
        color: Colors.darkBlue,
    },
    collapsedFullName: {
        color: Colors.darkBlue,
        fontSize: deviceWidth * 0.04,
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
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 'auto'
    },
    btnText: {
        color: Colors.darkBlue,
        fontSize: deviceWidth * 0.0375,
        fontWeight: '500',
        paddingHorizontal: '5%',
        paddingVertical: '0.5%',
    },
    dialogContainer: {
        borderRadius: 20,
        borderWidth: 3,
        borderColor: Colors.darkBlue
    }
});