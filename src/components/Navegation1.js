import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './inicio';
import React, { useState, useEffect } from 'react';
import { useAuth } from "./AuthContext";
import Account from './Account';
import CalcularConsumo from './CalcularConsumo';
import CalcularConsumo2 from './CalcularConsumo2';
import CalcularConsumo3 from './CalcularConsumo3';
import CalcularConsumo4 from './CalcularConsumo4';
import CalcularConsumo5 from './CalcularConsumo5';
import CalcularFinal from './CalcularFinal';

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
            <Looktab.Screen name='Account' component={Account} options={{headerTitle: "Cuenta"}}></Looktab.Screen>
            <Looktab.Screen name='CalcularConsumo' component={CalcularConsumo} options={{headerTitle: "Calcular consumo"}}></Looktab.Screen>
            <Looktab.Screen name='CalcularConsumo2' component={CalcularConsumo2} options={{headerTitle: "Calcular consumo"}}></Looktab.Screen>
            <Looktab.Screen name='CalcularConsumo3' component={CalcularConsumo3} options={{headerTitle: "Calcular consumo"}}></Looktab.Screen>
            <Looktab.Screen name='CalcularConsumo4' component={CalcularConsumo4} options={{headerTitle: "Calcular consumo"}}></Looktab.Screen>
            <Looktab.Screen name='CalcularConsumo5' component={CalcularConsumo5} options={{headerTitle: "Calcular consumo"}}></Looktab.Screen>
            <Looktab.Screen name='CalcularFinal' component={CalcularFinal} options={{headerTitle: "Resultado"}}></Looktab.Screen>
        </Looktab.Navigator>
    );
}