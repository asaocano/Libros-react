import React, {useState, useEffect, useRef} from "react";
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
//import { TextInput } from "react-native-gesture-handler";
import Input from '../components/Input';
import axios from 'axios';
import DropdownAlert from "react-native-dropdownalert";

export default function ModificarLibro(props) {
    const [nombre, setNombre] = useState('');
    const [edicion, setEdicion] = useState('');
    const [id, setId] = useState('');
    let dropDownAlertRef = useRef();

    const getLibro = async() =>{
        //const id = props.id;
        const id = props.route.params.id;;
        const respuesta = await axios.get('http://192.168.100.5/apilibro/?id='+id);
        
        setId(respuesta.data.id);
        setNombre(respuesta.data.nombre);
        setEdicion(respuesta.data.edicion);

    }
    const updateLibro = async()=>{
        const obj = {id,nombre,edicion};
        try {
            const respuesta = await axios.put('http://192.168.100.5/apilibro/', obj);
            dropDownAlertRef.alertWithType('success', 'Éxito', respuesta.data.msg); 
        } catch (error) {
            dropDownAlertRef.alertWithType('error', 'Error', 'El libro no pudo ser modificado');
        }
        setTimeout(() => {
        regresar();
            
        }, 3000);        
    }
    const deleteLibro = async() =>{
        const id = props.route.params.id;
        try {
            const respuesta = await axios.delete('http://192.168.100.5/apilibro/?id='+id);
            dropDownAlertRef.alertWithType('success', 'Éxito' , respuesta.data.msg);
        } catch (error) {
            dropDownAlertRef.alertWithType('error', 'Error', 'El libro no pudo ser modificado');
        }
        setTimeout(() => {
            regresar();
        }, 3000);
        
        //getLibros()
      }
      const regresar = () =>{
        props.navigation.navigate('LibrosList')
      }

    useEffect(() => {
        getLibro();
    }, []);

    return(
        <View style={styles.container}>
            <Input texto={"Nombre"} campo={(e) => setNombre(e)} valor={nombre} contra={false} />
            <Input texto={"Edicion"} valor={edicion} campo={(e) => setEdicion(e)} contra={false} />
            <View style={styles.buttons} >
            <TouchableOpacity 
                style={styles.button}
                onPress={updateLibro}
                >
                <Text style={styles.text}>Editar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.button, styles.eliminar}
                onPress={deleteLibro}
                >
                <Text style={styles.text}>Eliminar</Text>
            </TouchableOpacity>
            </View>
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
    buttons:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor:'#0E69E5',
        padding: 15,
        width: 150,
        borderRadius: 60,
        
    },
    text:{
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17
    }, 
    eliminar:{
        backgroundColor: 'red',
        padding: 15,
        width: 150,
        borderRadius: 60,
    },
    input:{
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        marginBottom: 15
    }
});