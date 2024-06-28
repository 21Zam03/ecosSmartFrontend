import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";
import Record from "./record";
import axios from "axios";
import { useRoute } from '@react-navigation/native';
import { ScrollView } from "react-native-gesture-handler";

export default function Registros() {
    const route = useRoute();
    const { id } = route.params;
    const [listRecords, setListRecords] = useState([]);
    const [record, setRecord] = useState(null);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://192.168.1.39:9000/api/records/client/${id}`);
                setListRecords(response.data);
            } catch (error) {
                console.error('Error al obtener la lista de records:', error);
            }
        };
        fetchPosts();
    }, [record]);
    const handleRecordChange = (newRecord) => {
        setRecord(newRecord);
    };
    return (
        <View style={styles.contenedor}>
            <ScrollView>
                {
                    listRecords.length != 0 ? (
                        <View style={{ gap: 20, padding: 5 }}>
                            {
                                listRecords.map((record, index) => (
                                    <Record key={index} recordId={record.recordId} clientId={record.clientId} kwh={record.kwh} cost={record.cost} info={record.info} onChange={handleRecordChange}/>
                                ))
                            }
                        </View>
                    ) : (
                        <View style={{ padding: 20 }}>
                            <Text style={{ textAlign: "center" }}>No hay registros</Text>
                        </View>
                    )
                }
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: "white",
        padding: 10,
    },

});