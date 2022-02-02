import React, {useState, useRef} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Input from '../components/Input';
import axios from 'axios';
import DropdownAlert from "react-native-dropdownalert";
export default function CrearLibro(props){
    const [nombre, setNombre] = useState('');
    const [edicion, setEdicion] = useState('');
    let dropDownAlertRef = useRef();
    const addLibro = async() => {
        const obj = {nombre, edicion};
        try {
            const respuesta = await axios.post('http://192.168.100.5/apilibro/', obj);
            dropDownAlertRef.alertWithType('success', 'Éxito', respuesta.data.msg);
            setNombre('');
            setEdicion('');
        } catch (error) {
            dropDownAlertRef.alertWithType('error', 'Error', 'El libro no pudo ser agregado')
        }
        setTimeout(() => {
            props.navigation.navigate('LibrosList');
        }, 3000);
        
      }
    return(
        <View style={styles.container}>
            <Input texto={"Nombre"} valor={nombre} campo={e=>setNombre(e)} contra={false} />
            <Input texto={"Edición"} valor={edicion} campo={e=>setEdicion(e)} contra={false} />
            <TouchableOpacity
                style={styles.button}
                onPress={addLibro}
                >
            <Text style={styles.text}>Agregar</Text> 
            </TouchableOpacity>
            <DropdownAlert 
                ref={(ref) => {
                    if (ref) {
                        dropDownAlertRef = ref;
                    }
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        alignContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor:'#0E69E5',
        padding: 15,
        width: 200,
        borderRadius: 60,
        
    },
    text:{
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17
    }
});