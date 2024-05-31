import { Colors } from "@/constants/Colors";

import React, { useState } from "react";
import { 
    View, 
    Text, 
    Dimensions, 
    StyleSheet, 
    Image, 
    TouchableOpacity 
} from 'react-native';

import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";


import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const images = '@/assets/images';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

const defaultName = 'Anônimo';
const defaultMatricula = '000000000'

export default function MemberBox( { name, numMatricula} ){

    name != null ? memberName = name : memberName = defaultName;
    numMatricula != null ? memberMatricula = numMatricula : memberMatricula = defaultMatricula;

    const [expanded, setExpanded] = useState(false);

    const onItemPress = () => {
        setExpanded(!expanded);
    };

    const animatedStyleRotation = useAnimatedStyle(() => {
        const rotation = expanded ? withTiming('90deg') : withTiming('0deg');
        return {
            transform:[
                {
                    rotate: rotation
                }
            ]
        }
    })

    const animatedStyle = useAnimatedStyle(() => {
        const animatedHeight = expanded ? withTiming(deviceHeight/6) : withTiming(0);
        return {
            height: animatedHeight,
        }
    })


    return (
        <View style={styles.wrap}>
            <View style={styles.container}>
                <Image 
                    source={require(`${images}/react-logo.png`)} 
                    style={styles.image}/>
                <Text style = {styles.mBoxName} numberOfLines={1}>
                    {memberName}
                </Text>
                <TouchableOpacity onPress={onItemPress}>
                    <Animated.View style = {animatedStyleRotation}>
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
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: {
        width: '85%',
        flexDirection: 'collumn',
        justifyContent: 'center',
        marginVertical: deviceHeight/50,
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
        fontSize: deviceWidth*0.07,
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
        fontSize: deviceWidth*0.04
    },
    editIcon: {
        color: Colors.darkBlue,
    },
    collapsedFullName: {
        color: Colors.darkBlue,
        fontSize: deviceWidth*0.04,
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
        fontSize: deviceWidth*0.0375,
        fontWeight: '500',
        paddingHorizontal: '5%',
        paddingVertical: '0.5%',
    }
  });