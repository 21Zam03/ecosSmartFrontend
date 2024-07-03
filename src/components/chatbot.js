import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ChatBot = () => {
    const route = useRoute();
    const { usuario } = route.params;

    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const messageIndexRef = useRef(0); // Referencia mutable para el ID único de los mensajes

    useEffect(() => {
        // Al cargar el componente, el bot envía un mensaje inicial
        handleReceive(`Hola ${usuario.nombre}, ¿en qué puedo ayudarte?`, true); // El segundo parámetro indica si es mensaje del bot
    }, []);

    const handleSend = () => {
        if (inputText.trim() === '') return;

        const newMessage = {
            id: messageIndexRef.current,
            text: inputText,
            fromUser: true,
        };

        // Actualiza el estado de los mensajes agregando el nuevo mensaje del usuario
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setInputText('');
        messageIndexRef.current += 1; // Incrementa el ID único del mensaje

        // Luego maneja la respuesta automática del bot
        handleAutomaticResponses(inputText);
    };

    const handleReceive = (text, isBotMessage = true) => {
        const newMessage = {
            id: messageIndexRef.current,
            text,
            fromUser: !isBotMessage,
        };

        // Actualiza el estado con el nuevo mensaje
        setMessages(prevMessages => [...prevMessages, newMessage]);
        messageIndexRef.current += 1; // Incrementa el ID único del mensaje

        if (isBotMessage) {
            handleReceiveWithEffect(newMessage); // Si es mensaje del bot, aplica el efecto de aparición
        }
    };

    const handleAutomaticResponses = (text) => {
        // Define aquí las respuestas automáticas del bot
        const automaticResponses = {
            'hola': '¡Hola! ¿Cómo puedo ayudarte?',
            'adios': '¡Hasta luego!',
            'como estas': '¡Bien! ¿Cómo puedo ayudarte?',
            'algunas recomendaciones': '¡Claro! Aquí tienes algunas recomendaciones para ahorrar energía\n '+ '\n'+
            '1. Iluminación: Usa bombillas LED y apaga las luces cuando no las necesites\n'+'\n'+
            '2. Electrodomésticos: Prefiere los de alta eficiencia energética y desconéctalos cuando no estén en uso\n'+'\n'+
            '3. Aislamiento: Mejora ventanas y puertas para conservar calor en invierno y fresco en verano.\n'+'\n'+
            '4. Termostato: Ajusta la temperatura según la temporada y considera termostatos programables.\n'+'\n'+
            '5. Electrónica: Desconecta cargadores y equipos electrónicos cuando no los uses.\n'+'\n'+
            '6. Agua caliente: Ajusta la temperatura del calentador y usa dispositivos de bajo consumo.\n'+'\n'+
            '7. Renovables: Considera paneles solares u otras energías renovables si es posible.\n'+'\n'+
            '8. Hábitos: Usa electrodomésticos eficientemente y promueve el consumo responsable.',
            'como mejorar la eficiencia energetica en mi hogar': 'Aquí hay algunas recomendaciones para mejorar la eficiencia energética en tu hogar o negocio:\n'+'\n'+
            '1. Instalar aislamiento térmico: Mejorar el aislamiento de los muros, techos y ventanas ayuda a mantener la temperatura interior de forma más eficiente.\n'+'\n'+
            '2. Utilizar iluminación LED: Las bombillas LED consumen mucha menos energía que las incandescentes o fluorescentes tradicionales.\n'+'\n'+
            '3. Aprovechar la luz natural: Mantener las cortinas y persianas abiertas durante el día para aprovechar la luz solar y reducir el uso de iluminación artificial.',
            'Como puedo monitorear en detalle el consumo de energia y recursos en mi hogar': 'Para poder monitorear y analizar en detalle el consumo de energía y recursos en tu hogar o negocio, te recomiendo seguir estos pasos\n '+ '\n'+
            '1. Instalar medidores inteligentes: Procura que tu proveedor de servicios públicos (electricidad, gas, agua) instale medidores inteligentes que puedan proporcionar datos detallados sobre tu consumo en tiempo real\n '+ '\n'+
            '2. Utilizar aplicaciones de monitoreo: Existen aplicaciones y plataformas que te permiten conectar tus medidores inteligentes y hacer un seguimiento exhaustivo de tu consumo de energía, agua y otros recursos\n '+ '\n'+
            '3. Analizar los datos: Revisa periódicamente los informes y gráficas que generen estas aplicaciones. Identifica patrones, picos y tendencias en tu consumo. Esto te permitirá detectar oportunidades de ahorro\n '+ '\n'+
            '4. Desagregar el consumo: Trata de determinar qué equipos, áreas o actividades consumen más energía en tu hogar o negocio. Puedes hacer esto mediante mediciones individuales o mediante estimaciones basadas en los datos generales.',
            'como puedo implementar una estrategia de gestion integral para optimizar el consumo de energia' : 'Para implementar una estrategia de gestión integral que te permita optimizar el uso de energía y recursos de manera sostenible en tu hogar o negocio, te recomiendo seguir estos pasos clave\n '+ '\n'+
            '1. Diagnóstico inicial: Realizar un análisis exhaustivo de tu consumo actual de energía, agua y otros recursos\n '+ '\n'+
            '2. Planificación estratégica: Definir objetivos claros de reducción de consumo y mejora de la eficiencia\n '+ '\n'+
            '3. Implementación de mejoras: Invertir en tecnologías y equipos más eficientes (iluminación LED, electrodomésticos ENERGY STAR, etc.).'
        };

        // Verifica si el mensaje del usuario activa una respuesta automática
        const response = automaticResponses[text.toLowerCase()];
        if (response) {
            setTimeout(() => {
                handleReceive(response, true); // Envía la respuesta del bot con efecto de aparición
            }, 500);
        }
    };

    const handleReceiveWithEffect = (message) => {
        const characters = message.text.split(''); // Divide el mensaje en caracteres
        let charIndex = 0;

        const interval = setInterval(() => {
            if (charIndex < characters.length) {
                const partialText = characters.slice(0, charIndex + 1).join('');
                const updatedMessage = {
                    ...message,
                    text: partialText,
                };
                setMessages(prevMessages =>
                    prevMessages.map(msg =>
                        msg.id === message.id ? updatedMessage : msg
                    )
                );
                charIndex += 1;
            } else {
                clearInterval(interval);
            }
        }, 20); // Intervalo de 100ms entre cada carácter
    };

    return (
        <View style={styles.container}>
            <ScrollView
                ref={(scrollView) => { scrollView?.scrollToEnd({ animated: true }) }}
                contentContainerStyle={styles.messagesContainer}>
                {messages.map((message) => (
                    <View
                        key={message.id}
                        style={[
                            styles.messageBubble,
                            message.fromUser ? styles.userMessage : styles.botMessage,
                        ]}
                    >
                        <Text style={styles.messageText}>{message.text}</Text>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={(text) => setInputText(text)}
                    placeholder="Escribe un mensaje..."
                    onSubmitEditing={handleSend}
                    autoFocus={true}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Text style={styles.sendButtonText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    messagesContainer: {
        flexGrow: 1,
        padding: 16,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 8,
        borderRadius: 8,
        marginBottom: 8,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#65F77D',
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#575D58',
    },
    messageText: {
        fontSize: 16,
        color: 'white',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: '#fff',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
    },
    sendButton: {
        marginLeft: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#8DEA51',
        borderRadius: 20,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ChatBot;