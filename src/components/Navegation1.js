import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './inicio';
import React, { useState, useEffect } from 'react';
import { useAuth } from "./AuthContext";
import Account from './Account';

const Looktab = createStackNavigator();

export default function Navegacion1() {

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
        <Looktab.Navigator>
            <Looktab.Screen name='Inicio' component={Inicio} options={{ headerShown: false }}></Looktab.Screen>
            <Looktab.Screen name='Account' component={Account} options={{ headerShown: false }}></Looktab.Screen>
        </Looktab.Navigator>
    );
}