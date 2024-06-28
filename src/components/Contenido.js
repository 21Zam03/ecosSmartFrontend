import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Contenido_Card from './Contenido-card';// Asegúrate de importar correctamente el componente

const Contenido = () => {
    const articulos = [
        {
            id: 1,
            title: 'Cómo reducir el consumo de energía en tu hogar',
            imageSource: require('../../assets/new1.jpg'),
            content: 'Consejos prácticos para disminuir el uso de energía y ahorrar dinero.',
        },
        {
            id: 2,
            title: 'Tecnologías eficientes para el ahorro energético',
            imageSource: require('../../assets/new2.jpg'),
            content: 'Descubre nuevas tecnologías que te ayudarán a ser más eficiente energéticamente.',
        },
        {
            id: 3,
            title: 'Tecnologías eficientes para el ahorro energético',
            imageSource: require('../../assets/new3.png'),
            content: 'Descubre nuevas tecnologías que te ayudarán a ser más eficiente energéticamente.',
        },
        {
            id: 4,
            title: 'Tecnologías eficientes para el ahorro energético',
            imageSource: require('../../assets/new2.jpg'),
            content: 'Descubre nuevas tecnologías que te ayudarán a ser más eficiente energéticamente.',
        },
        {
            id: 5,
            title: 'Tecnologías eficientes para el ahorro energético',
            imageSource: require('../../assets/new2.jpg'),
            content: 'Descubre nuevas tecnologías que te ayudarán a ser más eficiente energéticamente.',
        },
        {
            id: 6,
            title: 'Tecnologías eficientes para el ahorro energético',
            imageSource: require('../../assets/new2.jpg'),
            content: 'Descubre nuevas tecnologías que te ayudarán a ser más eficiente energéticamente.',
        },
        // Agrega más artículos según sea necesario
    ];

    const handleArticlePress = (article) => {
        // Implementa la lógica para navegar a la página del artículo completo
        console.log(`Artículo seleccionado: ${article.title}`);
    };

    return (
        <ScrollView style={styles.container}>
            {articulos.map((articulo) => (
                <Contenido_Card
                    key={articulo.id}
                    title={articulo.title}
                    imageSource={articulo.imageSource}
                    content={articulo.content}
                    onPress={() => handleArticlePress(articulo)}
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 16,
    },
});

export default Contenido;