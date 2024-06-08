import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function Inicio() {
    const navigation = useNavigation();

    const handlePress1 = () => {
        navigation.navigate('Account')
    };

    return (
        <View style={styles.contenedorPadre}>
            <View style={styles.contenedor1}>
                <Image
                    source={require('../../assets/portada.jpg')}
                    style={styles.imagen}
                />
                <Text style={{position: "absolute", bottom: 65, left: 12, fontWeight: "bold", fontSize: 18}}>Hola, Jose Zambrano</Text>
            </View>
            <View style={styles.contenedorInicio}>
                <View style={styles.contenedorSecond}>
                    <View style={styles.child}>
                        <TouchableOpacity style={{ gap: 5 }}>
                            <Text>Calcular Consumo</Text>
                            <Text style={{fontSize: 12, color: "gray"}}>Calcula el consumo energia de tu hogar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.child}>
                        <TouchableOpacity style={{ gap: 5 }}>
                            <Text>Interpretar recibo luz</Text>
                            <Text style={{fontSize: 12, color: "gray"}}>Envia una foto de tu recibo y sera interpretado</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.child}>
                        <TouchableOpacity style={{ gap: 5 }}>
                            <Text>Conectar un Smart</Text>
                            <Text style={{fontSize: 12, color: "gray"}}>Conecta un dispositivo Smart Plug</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.child}>
                        <TouchableOpacity style={{ gap: 5 }} onPress={handlePress1}>

                            <Text>Mi cuenta</Text>
                            <Text style={{fontSize: 12, color: "gray"}}>Visualiza los datos de tu cuenta</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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

    contenedor2: {
        flex: 1,
    },

    lupita: {
        backgroundColor: "#D3DCDA",
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 7,
        paddingRight: 7,
        borderRadius: 20
    },

    contenedorInicio: {
        flex: 1,
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