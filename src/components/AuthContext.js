import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Crear el contexto
const AuthContext = createContext();

// Crear un proveedor
export const AuthProvider = ({ children }) => {

    const [autenticado, setAutenticado] = useState(false);

    const handleLogin = async (email, password) => {
        const credenciales = {
            email: email,
            password: password,
        };

        try {
            const response = await axios.post('http://80.80.87.137:9000/api/users/login', credenciales, {
                withCredentials: true,
            });

            if (response.data) {
                guardarDatosUsuario(response.data);
                console.log("Logueo con exito")
            }
        } catch (error) {
            console.error('Error al enviar datos:', error);
        }
    };

    const handleLogout = () => {
        eliminarDatosUsuario();
        eliminarToken();
    };

    const value = {
        autenticado,
        handleLogin,
        handleLogout,
        obtenerDatosUsuario
    };

    // Datos Usuario
    const guardarDatosUsuario = async (usuario) => {
        try {
            await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
            setAutenticado(true);
        } catch (error) {
            console.error('Error al guardar los datos del usuario:', error);
        }
    };
    
    const obtenerDatosUsuario = async () => {
        try {
            const usuario = await AsyncStorage.getItem('usuario');
            return usuario != null ? JSON.parse(usuario) : null;
        } catch (error) {
            console.error('Error al obtener los datos del usuario:', error);
            return null;
        }
    };

    const eliminarDatosUsuario = async () => {
        try {
            await AsyncStorage.removeItem('usuario');
            setAutenticado(false);
            console.log('Datos del usuario eliminados correctamente');
        } catch (error) {
            console.error('Error al eliminar los datos del usuario:', error);
        }
    }

    //Token
    const guardarToken = async (token) => {
        try {
            await AsyncStorage.setItem('token', JSON.stringify(token));
        } catch (error) {
            console.error('Error al guardar el token de acceso del usuario:', error);
        }
    };

    const obtenerToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            return token != null ? JSON.parse(token) : null;
        } catch (error) {
            console.error('Error al obtener los datos del usuario:', error);
            return null;
        }
    };

    const eliminarToken = async () => {
        try {
            await AsyncStorage.removeItem('token');
            console.log('Token eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar el token del usuario:', error);
        }
    }

    return (
        <AuthContext.Provider value={{autenticado, handleLogin, handleLogout, obtenerDatosUsuario, eliminarDatosUsuario, guardarDatosUsuario}}>
            {children}
        </AuthContext.Provider>
    );
};

// Crear un hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);