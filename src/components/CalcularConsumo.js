import { View, TextInput, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CalcularConsumo() {

    const [num, setNum] = useState("");

    const navigation = useNavigation();
    const redirectToLogin = () => {
        navigation.navigate('Login')
    }

    const redirectToEmail = async () => {
        try {
            await AsyncStorage.setItem('televisionHoras', num);
            navigation.navigate('CalcularConsumo2')
        } catch (e) {
            console.error('Error guardando los datos', e);
        }
    }
    const handleChange = (text) => {
        // Filtrar los caracteres no numéricos
        const numericValue = text.replace(/[^0-9]/g, '');
        setNum(numericValue);
    };

    return (
        <View style={styles.contenedor}>
            <View style={styles.contenedorQuestion}>
                <Text style={styles.textQuestionName}>¿Cuantas horas al dia usas la television?</Text>
                <Text>Digita el numero estimado de horas al dia que utilizas dicho dispositivo</Text>
            </View>
            <View style={styles.contenedorInputs}>
                <TextInput style={styles.inputs} value={num} onChangeText={handleChange} placeholder="0" keyboardType="numeric" autoFocus={true}></TextInput>
                <Text>horas</Text>
            </View>
            <View>
                <TouchableOpacity style={[!num ? styles.botonDisabled : styles.botonEnabled]} onPress={redirectToEmail} disabled={!num}><Text style={styles.textBoton}>Siguiente</Text></TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: "white",
        paddingRight: 14,
        paddingLeft: 14,
        gap: 20,
        position: "relative"
    },

    contenedorQuestion: {
        gap: 10
    },

    contenedorInputs: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1,
        padding: 20
    },

    textQuestionName: {
        fontSize: 20,
        fontWeight: "bold",
    },

    inputs: {
        borderRadius: 10,
        borderColor: "gray",
        borderWidth: 1,
        padding: 10,
        width: 50,
        textAlign: "center"
    },

    botonEnabled: {
        backgroundColor: "#8DEA51",
        padding: 15,
        borderRadius: 30
    },

    botonDisabled: {
        backgroundColor: "#BBFA92",
        padding: 15,
        borderRadius: 30
    },

    textBoton: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },

    textCuenta: {
        textAlign: "center",
        color: "#8DEA51",
        fontWeight: "bold",
    }
});
