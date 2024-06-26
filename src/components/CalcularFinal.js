import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import { useAuth } from "./AuthContext";
import axios from 'axios';

const calculateEnergyConsumption = (televisionHoras, lavadoraHoras, bombillasCantidad, bombillasTipo, bombillasHoras, computadoraHoras, refrigeradoraCantidad, refrigeradoraTamaño) => {
    // Potencia promedio de los dispositivos (en vatios)
    const potencias = {
        television: 100,
        lavadora: 500,
        bombillaLED: 10,
        bombillaIncandescente: 60,
        computadora: 200,
        refrigeradoraPequena: 100,
        refrigeradoraMediana: 150,
        refrigeradoraGrande: 200,
    };

    // Calcular el consumo de cada dispositivo
    const consumoTelevision = (potencias.television * televisionHoras) / 1000;
    const consumoLavadora = (potencias.lavadora * lavadoraHoras) / 1000;
    const potenciaBombilla = bombillasTipo === 'LED' ? potencias.bombillaLED : potencias.bombillaIncandescente;
    const consumoBombillas = (potenciaBombilla * bombillasCantidad * bombillasHoras) / 1000;
    const consumoComputadora = (potencias.computadora * computadoraHoras) / 1000;
    let potenciaRefrigeradora;
    switch (refrigeradoraTamaño) {
        case 'pequena':
            potenciaRefrigeradora = potencias.refrigeradoraPequena;
            break;
        case 'mediana':
            potenciaRefrigeradora = potencias.refrigeradoraMediana;
            break;
        case 'grande':
            potenciaRefrigeradora = potencias.refrigeradoraGrande;
            break;
        default:
            potenciaRefrigeradora = 0;
    }
    const consumoRefrigeradora = (potenciaRefrigeradora * 24 * refrigeradoraCantidad) / 1000;

    // Calcular el consumo total diario
    const consumoTotal = consumoTelevision + consumoLavadora + consumoBombillas + consumoComputadora + consumoRefrigeradora;

    return consumoTotal;
};

const getRecommendations = (consumo) => {
    if (consumo < 5) {
        return (
            <View>
                <Text>Tu consumo energético es bajo. Aquí hay algunas recomendaciones para mantenerlo así:</Text>
                <Text> - Continúa usando bombillas LED en lugar de incandescentes.</Text>
                <Text> - Apaga los electrodomésticos y dispositivos electrónicos cuando no estén en uso.</Text>
                <Text> - Usa regletas con interruptor para apagar múltiples dispositivos a la vez.</Text>
            </View>
        );
    } else if (consumo >= 5 && consumo <= 10) {
        return (
            <View>
                <Text>Tu consumo es moderado. Aquí hay algunas formas de reducir aún más tu consumo:</Text>
                <Text> - Optimiza el uso de tus electrodomésticos: usa la lavadora y el lavavajillas con carga completa.</Text>
                <Text> - Ajusta la temperatura de tu refrigerador: mantén la temperatura entre 3-5°C para el refrigerador y -15°C para el congelador.</Text>
                <Text> - Aprovecha la luz natural durante el día y apaga las luces cuando no las necesites.</Text>
            </View>
        );
    } else {
        return (
            <View>
                <Text>Tu consumo energético es alto. Considera estas recomendaciones para reducirlo:</Text>
                <Text> - Revisa el uso del aire acondicionado y calefacción: ajusta el termostato unos grados más alto en verano y más bajo en invierno.</Text>
                <Text> - Sustituye electrodomésticos antiguos por modelos más eficientes con clasificación energética A++ o superior.</Text>
                <Text> - Realiza una auditoría energética en tu hogar para identificar posibles áreas de mejora.</Text>
            </View>
        );
    }
};

const getRecommendationType = (consumo) => {
    if (consumo < 5) {
        return (
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text>¡Buen trabajo! Tu consumo energético es bajo </Text>
                <Icon2 name="check-circle" size={25} color="#8DEA51" />
            </View>
        );
    } else if (consumo >= 5 && consumo <= 10) {
        return (
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 5 }}>
                <Text>Tu consumo es moderado</Text>
                <Icon3 name="balance-scale" size={25} color="#8DEA51" />
            </View>
        );
    } else {
        return (
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text>Tu consumo energético es alto</Text>
                <Icon2 name="warning" size={25} color="#8DEA51" />
            </View>
        );
    }
};

export default function CalcularFinal() {
    const [usuario, setUsuario] = useState(null);
    const { obtenerDatosUsuario } = useAuth();

    useEffect(() => {
        // Función para cargar los datos del usuario
        const cargarDatosUsuario = async () => {
            try {
                const usuario = await obtenerDatosUsuario();
                setUsuario(usuario);
            } catch (error) {
                console.error('Error al cargar los datos del usuario:', error);
            }
        };
        // Llamar a la función para cargar los datos del usuario cuando el componente se monte
        cargarDatosUsuario();
    }, []);

    const navigation = useNavigation();

    const redirectToInicio = async () => {
        const record = {
            clientId: usuario.idClient,
            kwh: consumo.toFixed(2),
            cost: (consumo * 0.60).toFixed(2),
        }
        try {
            const response = await axios.post(`http://192.168.1.39:9000/api/records`, record);
            console.log(response.data);
        } catch (error) {
            console.error('Error al publicar el record:', error);
        }
        navigation.navigate('Inicio');
    }

    const [consumo, setConsumo] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const televisionHoras = parseFloat(await AsyncStorage.getItem('televisionHoras')) || 0;
            const lavadoraHoras = parseFloat(await AsyncStorage.getItem('lavadoraHoras')) || 0;
            const bombillasCantidad = parseInt(await AsyncStorage.getItem('bombillasCantidad'), 10) || 0;
            const bombillasTipo = await AsyncStorage.getItem('bombillasTipo') || 'LED';
            const bombillasHoras = parseFloat(await AsyncStorage.getItem('bombillasHoras')) || 0;
            const computadoraHoras = parseFloat(await AsyncStorage.getItem('computadoraHoras')) || 0;
            const refrigeradoraCantidad = parseInt(await AsyncStorage.getItem('refrigeradoraCantidad'), 10) || 0;
            const refrigeradoraTamaño = await AsyncStorage.getItem('refrigeradoraTamaño') || 'mediana';

            const consumoTotal = calculateEnergyConsumption(televisionHoras, lavadoraHoras, bombillasCantidad, bombillasTipo, bombillasHoras, computadoraHoras, refrigeradoraCantidad, refrigeradoraTamaño);
            setConsumo(consumoTotal);
        };

        fetchData();
    }, []);

    return (
        <ScrollView>
            <View style={styles.contenedor}>
                <View style={{ backgroundColor: "white", height: 300, width: 300, borderRadius: 300, justifyContent: "center", alignItems: "center", gap: 10, elevation: 40 }}>
                    <Icon name="bolt" size={200} color="#8DEA51" />
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ color: "gray", fontSize: 30 }}>{consumo.toFixed(2)} kWh</Text>
                        <Text style={{ color: "gray", fontSize: 15 }}>al dia</Text>
                    </View>
                </View>
                <View style={styles.contenedorQuestion}>
                    {getRecommendationType(consumo)}
                </View>
                <View style={styles.contenedorQuestion}>
                    <Text style={styles.textQuestionName}>Según la información proporcionada, tu consumo estimado diario de energía eléctrica es de: {consumo.toFixed(2)} kWh lo que seria en total unos {consumo.toFixed(2) * 0.60} soles</Text>
                    {getRecommendations(consumo)}
                </View>
                <View>
                    {
                        usuario ? (
                            <TouchableOpacity style={styles.botonEnabled} onPress={redirectToInicio}><Text style={styles.textBoton}>Volver al inicio</Text></TouchableOpacity>
                        ) : (
                            <></>
                        )
                    }
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        padding: 10,
        flex: 1,
        backgroundColor: "white",
        paddingRight: 14,
        paddingLeft: 14,
        gap: 20,
        position: "relative",
        alignItems: "center"
    },

    contenedorQuestion: {
        gap: 10,
        borderRadius: 10,
        padding: 20,
        // shadowColor: '#000', // Color de la sombra
        // shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
        // shadowOpacity: 0.25, // Opacidad de la sombra
        // shadowRadius: 3.84, // Radio de la sombra
        elevation: 10, // Elevación para Android
        backgroundColor: "white"
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
        fontSize: 16,
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