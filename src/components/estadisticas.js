import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const initialData = [30, 45, 28, 80, 99, 43, 50, 75, 62, 87, 52, 68];

const Estadisticas = () => {
    const [kwhData, setKwhData] = useState(initialData);

    const handleInputChange = (value, index) => {
        const newData = [...kwhData];
        newData[index] = parseFloat(value) || 0;
        setKwhData(newData);
    };

    const data = {
        labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        datasets: [
            {
                data: kwhData,
                strokeWidth: 2,
            }
        ]
    };

    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#61FF7B",
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Consumo Anual</Text>
            <Text style={{fontSize: 14}}>Grafica lineal de tu consumo energetico anual</Text>
            <LineChart
                data={data}
                width={screenWidth - 32}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.graphStyle}
            />
            {data.labels.map((label, index) => (
                <View key={index} style={styles.inputContainer}>
                    <Text style={styles.label}>{label}</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={kwhData[index].toString()}
                        onChangeText={(value) => handleInputChange(value, index)}
                    />
                    <Text>Kwh</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    graphStyle: {
        marginVertical: 8,
        borderRadius: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        gap: 10
    },
    label: {
        flex: 1,
        fontSize: 16,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
});

export default Estadisticas;