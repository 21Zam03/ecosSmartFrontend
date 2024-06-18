import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { useAuth } from "./AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";


export default function SignUpPassword() {
    const navigation = useNavigation();

    const [isValid, setIsValid] = useState(true);
    const [isEqual, setIsEqual] = useState(true);
    const [input, setInput] = useState('');
    const [input2, setInput2] = useState('');
    const { guardarDatosUsuario } = useAuth();

    const handleButtonPress = async () => {
        
        const clientDocument = {
            nombre: await AsyncStorage.getItem('name'),
            apellido: await AsyncStorage.getItem('lastName'),
        };

        const userDocument = {
            email: await AsyncStorage.getItem('email'),
            password: input,
            rol: "User", 
        }
        
        const SignInDto = {
            clientDocument: clientDocument,
            userDocument: userDocument
        };

        try {
            const response = await axios.post('http://80.80.87.137:9000/api/users/signUp', SignInDto);
            if (response.data) {
                guardarDatosUsuario(response.data);
                console.log(response.data);
            }
        } catch (e) {
            console.error('Error retrieving data', e);
        }
    };

    const handleInputChange = (text) => {
        setInput(text);
        setIsValid(text.length >= 7);
    };

    const handleInputChange2 = (text) => {
        setInput2(text);
        setIsEqual(text === input);
    };

    return (
        <View style={styles.contenedor}>
            <View style={styles.contenedorQuestion}>
                <Text style={styles.textQuestionName}>Crear una contraseña</Text>
                <Text>Cree una contraseña que contenga almenos 6 caracteres de longitud. Una contraseña segura es una combinación de letras, numeros y tildes.</Text>
            </View>
            <View style={styles.contenedorInputs}>
                <TextInput style={styles.inputs} onChangeText={handleInputChange} value={input} placeholder="Contraseña" secureTextEntry={true}></TextInput>
                {!isValid ? (
                    <View>
                        <Text style={styles.errorText}>Ingresa al menos 7 caracteres</Text>
                    </View>
                ) : (
                    <Text style={styles.validText}>Contraseña válida</Text>
                )}
            </View>
            <View style={styles.contenedorInputs}>
                <TextInput style={styles.inputs} onChangeText={handleInputChange2} value={input2} placeholder="Repetir caontraseña" secureTextEntry={true}></TextInput>
                {!isEqual ? (
                    <Text style={styles.errorText}>La contraseñas deben coincidir</Text>
                ) : (
                    <Text style={styles.validText}>Contraseñas coinciden</Text>
                )}
            </View>
            <View>
                <TouchableOpacity style={[!isValid || !isEqual ? styles.botonDisabled : styles.botonEnabled]} onPress={handleButtonPress} disabled={!isValid || !isEqual}><Text style={styles.textBoton}>Siguiente</Text></TouchableOpacity>
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
        gap: 10,
    },

    textQuestionName: {
        fontSize: 25,
        fontWeight: "bold"
    },

    contenedorInputs: {
        gap: 5,
    },

    inputs: {
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1,
        padding: 13,
        fontSize: 17
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
        textAlign: "center",
        fontSize: 16
    },

    textCuenta: {
        textAlign: "center",
        color: "#FF9F43",
        fontWeight: "bold",
    },

    errorText: {
        color: "#FF9F43",
        paddingLeft: 15
    },

    validText: {
        color: "green",
        paddingLeft: 15
    },

});