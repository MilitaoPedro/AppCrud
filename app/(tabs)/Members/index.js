import { Colors } from "@/constants/Colors";

import React, { useEffect, useState } from 'react';
import { 
    ImageBackground, 
    View, 
    Text, 
    Dimensions, 
    StyleSheet, 
    ScrollView, 
    BackHandler, 
    Alert,
    Image,
    Button,
    FlatList
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { StatusBar } from 'expo-status-bar';

import Header from '@/components/header';
import MemberBox from '@/components/memberBox';
import ModalAdd from '@/components/modalAdd';

import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { FIREBASE_DB } from '@/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { signOut } from "firebase/auth";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TouchableOpacity} from 'react-native-gesture-handler'

const images = '@/assets/images';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default function Members( {navigation} ){
    
    const auth = FIREBASE_AUTH;
    const currentUser = auth.currentUser;

    const [isModalVisible, setIsModalVisible] = useState(false);

    if(!(currentUser != null)){
        alert('É necessário estar logado no sistema para acessar esse recurso');
        navigation.navigate('Login');
    }

    function logout(){
        signOut(auth)
            .then(() => {
                alert('Você foi deslogado');
                navigation.navigate('Login');
            })
            .catch((error) => {
                const errorMessage = error.errorMessage;
                alert(errorMessage);
            });
    }

    function handleBackPress() {
        Alert.alert(
            'Sair',
            'Deseja sair do aplicativo?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                        console.log('Cancel Pressed');
                    },
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => logout(),
                },
            ],
            {
                cancelable: false,
            },
        )
        return true;
    }

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(FIREBASE_DB, 'membros'));
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push({ id: doc.id, ...doc.data() });
                });
                setData(items);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAdd = (updatedMembers) => {
        setData(updatedMembers);
        setIsModalVisible(false);
    };

    const handleDelete = (updatedMembers) => {
        setData(updatedMembers);
    };

    if (loading) {
        return (
            <View style={styles.container}>
            <Text>Loading...</Text>
            </View>
        );
    }
    return(
        <View style={styles.mainContainer}>

            <ModalAdd setIsModalVisible={setIsModalVisible} isOpen={isModalVisible} onAdd={handleAdd}/>

            <StatusBar translucent backgroundColor={'#A2ADB2'}/>
            <ImageBackground style = {styles.backgroundImg} source={require(`${images}/lightBackgroundComp.png`)}>
                <View style={styles.screenContainer}>
                    <Header navigation={navigation}/>
                    <View style = {styles.screenView}>
                        <View style = {styles.membrosContainer}>
                            <View style={styles.memberTextIconView}>
                                <Text style = {styles.title}>
                                    MEMBROS
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setIsModalVisible(true)}> 
                                    <MaterialCommunityIcons 
                                        name="plus-circle" 
                                        style={styles.addButton} 
                                        size={deviceWidth*0.1}
                                        
                                    />
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={data}
                                contentContainerStyle = {styles.flatList}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <MemberBox
                                        onDelete={handleDelete}
                                        memberId={item.id}
                                        name={item.nome}
                                        email={item.email}
                                        imageURL={item.image}
                                        idade={item.idade}
                                        numMatricula={item.numMatricula}    
                                    />
                                )}
                            />
                        </View> 
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'transparent',
        flex: 1,
    },
    backgroundImg:{
        flex: 1,
    },
    viewContainer: {
        flex: 1,
        backgroundColor: 'red',
        padding: 60
    },
    screenContainer: {
        
    },
    addButton: {
        color: Colors.darkBlue,
        opacity: 1,
        backgroundColor: 'transparent',
        borderRadius: 100,
    },
    screenView: {
        height: deviceHeight - (deviceHeight/9),
        width: deviceWidth
    },
    memberTextIconView: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    membrosContainer: {
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    flatList: {
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    title: {
        color: Colors.darkBlue,
        fontSize: deviceWidth*0.08,
        fontWeight: '600',
        padding: '5%'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
});