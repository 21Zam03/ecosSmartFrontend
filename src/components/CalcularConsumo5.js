import { View, TextInput, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioGroup from 'react-native-radio-buttons-group';
import { ScrollView } from "react-native-gesture-handler";

export default function CalcularConsumo5() {

    const [num, setNum] = useState("");
    const navigation = useNavigation();
    const redirectToEmail = async () => {
        const selectedRadio = radioButtons.find(radio => radio.id === selectedId);
        if (selectedRadio) {
            await AsyncStorage.setItem('refrigeradoraCantidad', num);
            await AsyncStorage.setItem('refrigeradoraTamaño', selectedRadio.value);
            navigation.navigate('CalcularFinal')
        }
       
    }
    const handleChange = (text) => {
        // Filtrar los caracteres no numéricos
        const numericValue = text.replace(/[^0-9]/g, '');
        setNum(numericValue);
    };

    const [selectedId, setSelectedId] = useState();
    const radioButtons = useMemo(() => ([
        {
            id: '1', // identificador único
            label: 'Grande',
            value: 'Grande',
            selected: true, // Seleccionado por defecto
        },
        {
            id: '2', // identificador único
            label: 'Mediano',
            value: 'Mediano',
        },
        {
            id: '3', // identificador único
            label: 'Pequeño',
            value: 'Pequeño',
        }
    ]), []);

    return (
        <ScrollView>
            <View style={styles.contenedor}>
                <View style={{ gap: 15 }}>
                    <View style={styles.contenedorQuestion}>
                        <Text style={styles.textQuestionName}>¿Cuantas refrigeradoras tiene en casa?</Text>
                        <Text>Digita el numero estimado de cantidad de refrigeradoras que tiene en su hogar</Text>
                    </View>
                    <View style={styles.contenedorInputs}>
                        <TextInput style={styles.inputs} value={num} onChangeText={handleChange} placeholder="0" keyboardType="numeric" autoFocus={true}></TextInput>
                        <Text>Refrigeradoras</Text>
                    </View>
                </View>
                <View style={{ gap: 15 }}>
                    <View style={styles.contenedorQuestion}>
                        <Text style={styles.textQuestionName}>¿Que tamaño son?</Text>
                        <Text>Seleccione el tamaño de las refrigeradoras que usa en su hogar</Text>
                    </View>
                    <View style={styles.contenedorRadioButton}>
                        <RadioGroup
                            radioButtons={radioButtons}
                            onPress={setSelectedId}
                            containerStyle={styles.radioGroup}
                            selectedId={selectedId}
                        />
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={[!num? styles.botonDisabled : styles.botonEnabled]} onPress={redirectToEmail} disabled={!num}><Text style={styles.textBoton}>Siguiente</Text></TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: "white",
        paddingRight: 14,
        paddingLeft: 14,
        gap: 30,
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
    },

    contenedorRadioButton: {
        alignItems: "center",
        flexDirection: "row",
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "black"
    },

    radioGroup: {
        justifyContent: "center",
        alignItems: "start",
    },
});
