import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';


export default function Autenticacion() {
    const navigation = useNavigation();

    const handleLoginPress = () => {
        navigation.navigate('Login')
    }

    const handleSignUpPress = () => {
        navigation.navigate('SignUpIntro')
    }

    return (
        <View style={autenticacion_styles.contenedor}>
            <View style={autenticacion_styles.subContenedor1}>
                <View style={{flexDirection: "row", justifyContent:"center", alignItems:"center"}}>
                    <Image
                        source={require('../../assets/logo.png')}
                        style={{ width: 50, height: 40 }}
                    />
                    <Image
                        source={require('../../assets/titulo.png')}
                        style={autenticacion_styles.logo}
                    />
                </View>
                <View style={autenticacion_styles.curve} />
                <Text style={{color: "white", fontStyle: "italic"}}>EcoSmart tu mejor opción</Text>
            </View>
            <View style={autenticacion_styles.subContenedor2}>
                <View>
                    <TouchableOpacity style={autenticacion_styles.botonRegistrate} onPress={handleSignUpPress}>
                        <Text style={{ color: '#000000', textAlign: 'center' }}>UNETE</Text>
                    </TouchableOpacity>
                </View>
                <View style={autenticacion_styles.iniciarSesion}>
                    <Text style={{ textAlign: 'center' }}>¿Ya eres usuario?</Text>
                    <TouchableOpacity style={autenticacion_styles.botonIniciarSesion} onPress={handleLoginPress}>
                        <Text style={{ color: '#ffffff', textAlign: 'center' }}>INICIAR SESIÓN</Text>
                    </TouchableOpacity>
                    <Text style={{ textAlign: "center" }}>Aplicación para evaluar el consumo y reserva de energía electrica</Text>
                </View>
            </View>
        </View>
    );
}

const autenticacion_styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: "#8DEA51",
    },

    subContenedor1: {
        flex: 0.7,
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 70,
        gap: 15,
        overflow: 'hidden', // Oculta el contenido que se desborda del contenedor
    },

    curve: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 40, // Altura de la curva
        backgroundColor: '#ffffff', // Color de fondo de la curva (coincide con el color de fondo del contenedor)
        borderTopLeftRadius: 40, // Radio de curvatura de la esquina superior izquierda
        borderTopRightRadius: 40, // Radio de curvatura de la esquina superior derecha
    },

    logo: {
        width: 230,
        height: 40,
        marginBottom: 0,
    },

    subContenedor2: {
        flex: 0.35  ,
        gap: 30,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: '#ffffff',
    },

    botonRegistrate: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 20,
        paddingLeft: 20,
        borderWidth: 1
    },

    botonIniciarSesion: {
        backgroundColor: "#8DEA51",
        borderRadius: 20,
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 20,
        paddingLeft: 20,
    },

    iniciarSesion: {
        gap: 10
    }

});