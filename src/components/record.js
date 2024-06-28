import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios";

export default function Record({recordId, clientId, kwh, cost, info}) {

    const navigation = useNavigation();
    
    const handlePress1 = () => {
        navigation.navigate('RegistroInfo', {
            kwh: kwh,
            cost: cost,
        })
    };

    const handlePress2 = async (recordId) => {
        try {
            const response = await axios.delete(`http://192.168.1.39:9000/api/records/${recordId}`);
        } catch (error) {
            console.error('Error al publicar el record:', error);
        }
    };

    return (
        <View style={styles.contenedor}>
            <View style={{width: "20%", alignItems: "center"}}>
                <Icon name="bolt" size={100} color="#8DEA51" />
            </View>
            <View style={{justifyContent: "center", width: "40%"}}>
                <Text>Kwh: {kwh}</Text>
                <Text>Costo: {cost}</Text>
            </View>
            <View style={{justifyContent: "center"}}>
                <TouchableOpacity onPress={handlePress1}>
                    <Icon name="eye" size={20} color="red" />
                </TouchableOpacity>
            </View>
            <View style={{justifyContent: "center"}}>
                <TouchableOpacity onPress={() => handlePress2(recordId)}>
                    <Icon name="trash" size={20} color="red" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: "white",
        flexDirection: "row",
        padding: 10,
        borderRadius: 10,
        gap: 20,
        elevation: 10,
    },

});