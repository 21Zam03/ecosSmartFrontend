import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, StatusBar } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Estadisticas from "./estadisticas";

export default function Inicio() {
    const navigation = useNavigation();
    
    const handlePress1 = () => {
        navigation.navigate('Account')
    };

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

    const calcularConsumo = () => {
        navigation.navigate('CalcularConsumo')
    };

    const handlePress2 = () => {
        navigation.navigate('Registros', {
            id: usuario.idClient,
        })
    };

    const handlePress3 = () => {
        navigation.navigate('Estadisticas')
    };

    const handlePress4 = () => {
        navigation.navigate('ChatBot', {
            usuario: usuario,
        })
    };

    const handlePress5 = () => {
        navigation.navigate('Contenido')
    };

    return (
        <View style={styles.contenedorPadre}>
            <ScrollView>
                <View style={styles.contenedor1}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{color: "white", fontSize: 22 }}>Hola, </Text>
                            <Text style={{color: "white", fontSize: 22, fontWeight: "bold"}}>{usuario ? usuario.nombre : ".........."}!</Text>
                        </View>
                        <View style={{}}>
                            <Icon name="notifications-none" size={30} color="white" />
                        </View>
                    </View>
                    <View style={{flexDirection: "row", backgroundColor: "#88FF94", padding: 10, gap: 10, alignItems: "center", borderRadius: 10}}>
                        <View style={{backgroundColor: "#D2FFD6", borderRadius: 10, padding: 8}}>
                            <Icon2 name="home" size={30} color="#F6FCF7" />
                        </View>
                        <View>
                            <Text style={{color: "white"}}>5 miembros en el hogar</Text>
                            <Text style={{color: "white"}}>4.5kwh x dia</Text>
                            <Text style={{color: "white"}}>S/4.50 x dia</Text>
                        </View>
                    </View>
                    <View style={{justifyContent: "center", alignItems: "center"}}>
                        <Text style={{color: "white"}}>Ahorra tu energica electrica en tu hogar</Text>
                    </View>
                </View>
                <View style={styles.contenedor2}>
                    <View style={styles.contenedorSecond}>
                        <View style={styles.child}>
                            <TouchableOpacity style={{ gap: 5, justifyContent: "center", alignItems: "center" }} onPress={calcularConsumo}>
                                <Icon3 name="calculator-outline" size={50} color="#8DEA51" />
                                <Text style={{color: "#8DEA51"}}>Calcular Consumo</Text>
                                <Text style={{ fontSize: 12, color: "gray" }}>Calcula el consumo energia de tu hogar</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.child}>
                            <TouchableOpacity style={{ gap: 5, justifyContent: "center", alignItems: "center" }} onPress={handlePress4}>
                                <Icon3 name="chatbubbles-outline" size={50} color="#8DEA51" />
                                <Text style={{color: "#8DEA51"}}>Chat bot</Text>
                                <Text style={{ fontSize: 12, color: "gray" }}>Interctua con nuestro chat bot acerca de tus dudas</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.child}>
                            <TouchableOpacity style={{ gap: 5, justifyContent: "center", alignItems: "center"}} onPress={handlePress2}>
                                <Icon3 name="document-text-outline" size={50} color="#8DEA51" />
                                <Text style={{color: "#8DEA51"}}>Ver registros</Text>
                                <Text style={{ fontSize: 12, color: "gray" }}>Visualiza tus registros de calculos de consumo</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.child}>
                            <TouchableOpacity style={{ gap: 5, justifyContent: "center", alignItems: "center" }} onPress={handlePress5}>
                                <Icon3 name="newspaper-outline" size={50} color="#8DEA51" />
                                <Text style={{color: "#8DEA51"}}>Contenido</Text>
                                <Text style={{ fontSize: 12, color: "gray" }}>Artículos sobre cómo ahorrar energía</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.child}>
                            <TouchableOpacity style={{ gap: 5, justifyContent: "center", alignItems: "center" }} onPress={handlePress3}>
                                <Icon3 name="stats-chart-outline" size={50} color="#8DEA51" />
                                <Text style={{color: "#8DEA51"}}>Estadisticas</Text>
                                <Text style={{ fontSize: 12, color: "gray" }}>Visualiza dashboards de tus consumos</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.child}>
                            <TouchableOpacity style={{ gap: 5, justifyContent: "center", alignItems: "center" }} onPress={handlePress1}>
                                <Icon3 name="person-outline" size={50} color="#8DEA51" />
                                <Text style={{color: "#8DEA51"}}>Mi cuenta</Text>
                                <Text style={{ fontSize: 12, color: "gray" }}>Visualiza los datos de tu cuenta</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* <View style={styles.contenedor3}>
                    <View>
                        <View>
                            <Image
                                source={require('../../assets/new1.jpg')}
                                style={{ width: "100%", height: 300, borderRadius: 10 }}
                            />
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text>
                                Controla los dispositivos conectados al Smart Plug siempre que tengas Internet a través de la aplicación EcoSmart en tu teléfono inteligente.
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Image
                            source={require('../../assets/new2.jpg')}
                            style={{ width: "100%", height: 300, borderRadius: 10 }}
                        />
                        <Text style={{ padding: 10 }}>
                            Aprende sobre prácticas ecológicas y tecnologías emergentes que te ayudarán a conservar energía. Mantente informado con nuestras actualizaciones y artículos educativos.
                        </Text>
                    </View>
                    <View>
                        <Image
                            source={require('../../assets/new3.png')}
                            style={{ width: "100%", height: 300, borderRadius: 10 }}
                        />
                        <Text style={{ padding: 10 }}>
                            Consulta informes detallados sobre tu eficiencia energética y compara tu desempeño con el de otros usuarios. Descubre nuevas formas de ser más eficiente y sostenible.
                        </Text>
                    </View>
                </View> */}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedorPadre: {
        backgroundColor: "#8DEA51",
        justifyContent: "start",
        alignItems: "start",
        gap: 10,
    },

    contenedor1: {
        backgroundColor: "#8DEA51",
        marginTop: StatusBar.currentHeight,
        padding: 20,
        gap: 20,
        marginBottom: 80
    },

    contenedor2: {
        backgroundColor: "white",
        padding: 10,
        gap: 20,
        height: 500
    },

    contenedor3: {
        backgroundColor: "white",
        padding: 10,
        gap: 20
    },

    contenedorFirst: {
        padding: 15,
        borderRadius: 5,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        backgroundColor: "white",
        shadowColor: '#000', // Color de la sombra
        shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
        shadowOpacity: 0.25, // Opacidad de la sombra
        shadowRadius: 3.84, // Radio de la sombra
        elevation: 5, // Elevación para Android
    },

    contenedorSecond: {
        position: "absolute",
        top: -60,
        left: 10,
        backgroundColor: "transparent",
        borderRadius: 5,
        gap: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-between", // Opcional: Espacio entre los contenedores
        alignItems: 'center',
    },

    child: {
        padding: 15,
        borderRadius: 20,
        width: "48%",
        backgroundColor: "white",
        shadowColor: '#000', // Color de la sombra
        shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
        shadowOpacity: 0.25, // Opacidad de la sombra
        shadowRadius: 3.84, // Radio de la sombra
        elevation: 5, // Elevación para Android
    },

    imagen: {
        width: "100%", // Ancho del contenedor
        height: 200, // Alto del contenedor
    },

    texto: {
        fontWeight: "bold",
        fontSize: 18
    }
});