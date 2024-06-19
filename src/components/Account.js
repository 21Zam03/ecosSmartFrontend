import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useAuth } from "./AuthContext";
import { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome';

export default function Account() {
    const { handleLogout } = useAuth();

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

    return (
        <View style={styles.contenedorPadre}>
            <View style={styles.contenedorFirst}>
                {usuario && usuario.photo ? (
                    <Image
                        source={{ uri: `data:image/png;base64,${usuario.photo}` }}
                        style={styles.imagen}
                    />
                ) : (
                    <Image
                        source={require('../../assets/photo-perfil.png')}
                        style={styles.imagen}
                    />
                )}
                <View>
                    <Text style={styles.texto}>{usuario ? usuario.nombre+" "+usuario.apellido : ".........."}</Text>
                    <Text style={{color: "gray"}}>{usuario ? usuario.userDto.email : ".........."}</Text>
                </View>
            </View>
            <View style={styles.contenedorSecond}>
                <View style={styles.child}>
                    <TouchableOpacity style={{ gap: 5 }}>
                        <Icon2 name="bookmark" size={25} color="#FF9F43" />
                        <Text>Guardados</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.child}>
                    <TouchableOpacity style={{ gap: 5 }}>
                        <Icon name="envelope" size={25} color="#FF9F43" />
                        <Text>Correo</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.child}>
                    <TouchableOpacity style={{ gap: 5 }}>
                        <Icon name="key" size={25} color="#FF9F43" />
                        <Text>Contraseña</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.child}>
                    <TouchableOpacity style={{ gap: 5 }}>
                        <Icon name="cog" size={25} color="#FF9F43" />
                        <Text>Configuracion</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{padding: 15, backgroundColor: "#E3E3DF", borderRadius: 5}}>
                <TouchableOpacity onPress={handleLogout}><Text style={{textAlign: "center", fontWeight: "black"}}>Cerrar Sesion</Text></TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedorPadre: {
        flex: 1,
        padding: 10,
        gap: 20,
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
        width: "100%",
        backgroundColor: "white",
        shadowColor: '#000', // Color de la sombra
        shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
        shadowOpacity: 0.25, // Opacidad de la sombra
        shadowRadius: 3.84, // Radio de la sombra
        elevation: 5, // Elevación para Android
    },

    imagen: {
        width: 45, // Ancho del contenedor
        height: 45, // Alto del contenedor
        borderRadius: 50
    },

    texto: {
        fontWeight: "bold",
        fontSize: 18
    }
});