import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

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

    return (
        <View style={styles.contenedorPadre}>
            <ScrollView>
                <View style={styles.contenedor1}>
                    <Image
                        source={require('../../assets/portada.jpg')}
                        style={styles.imagen}
                    />
                    <Text style={{ position: "absolute", bottom: 65, left: 12, fontWeight: "bold", fontSize: 18 }}>Hola, {usuario ? usuario.nombre+" "+usuario.apellido : ".........."}</Text>
                </View>
                <View style={styles.contenedor2}>
                    <View style={styles.contenedorSecond}>
                        <View style={styles.child}>
                            <TouchableOpacity style={{ gap: 5 }} onPress={calcularConsumo}>
                                <Text>Calcular Consumo</Text>
                                <Text style={{ fontSize: 12, color: "gray" }}>Calcula el consumo energia de tu hogar</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.child}>
                            <TouchableOpacity style={{ gap: 5 }}>
                                <Text>Interpretar recibo luz</Text>
                                <Text style={{ fontSize: 12, color: "gray" }}>Envia una foto de tu recibo y sera interpretado</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.child}>
                            <TouchableOpacity style={{ gap: 5 }}>
                                <Text>Conectar un Smart</Text>
                                <Text style={{ fontSize: 12, color: "gray" }}>Conecta un dispositivo Smart Plug</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.child}>
                            <TouchableOpacity style={{ gap: 5 }} onPress={handlePress1}>

                                <Text>Mi cuenta</Text>
                                <Text style={{ fontSize: 12, color: "gray" }}>Visualiza los datos de tu cuenta</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.contenedor3}>
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
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedorPadre: {
        flex: 1,
        backgroundColor: "white",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        gap: 10,
        marginTop: 0
    },

    contenedor1: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative"
    },

    lupita: {
        backgroundColor: "#D3DCDA",
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 7,
        paddingRight: 7,
        borderRadius: 20
    },

    contenedor2: {
        padding: 10,
        gap: 20
    },

    contenedor3: {
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
        borderRadius: 5,
        gap: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-between", // Opcional: Espacio entre los contenedores
        alignItems: 'center',
    },

    child: {
        padding: 15,
        borderRadius: 5,
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