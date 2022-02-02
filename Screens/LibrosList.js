import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Button, TouchableOpacity, Text, View } from "react-native";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { ListItem } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import DropdownAlert from "react-native-dropdownalert";

const LibrosList = (props) => {
  const [listaLibros, setListaLibros] = useState([]);
  const isFocused = useIsFocused();
  let dropDownAlertRef = useRef();
  useEffect(() => {
    getLibros();
  }, [isFocused]);

  const getLibros = async () => {
    const respuesta = await axios.get("http://192.168.100.5/apilibro/");
    setListaLibros(respuesta.data);
  };
  const cerrarSesion = () =>{
    AsyncStorageLib.removeItem('user');
    props.navigation.navigate('Login');
  }

  const modificarLiibro = async(indice) =>{
    try {
      const datos = await AsyncStorageLib.getItem('user');
      const info = JSON.parse(datos);

      
      if (info !== null && info.tipo === '1') {
        props.navigation.navigate("ModificarLibro", { id: indice });
      }else{
        dropDownAlertRef.alertWithType(
          "error",
          "Error",
          "No tienes permitido realizar esta acción"
        );
      }
    } catch (e) {
      
    }
  }
  return (
    <View style={styles.container}>
    <ScrollView style={styles.scroll}>
      <Button
        title="Agregar libro"
        onPress={() => props.navigation.navigate("CrearLibro")}
      />

      {listaLibros.map((libro) => (
        <ListItem
          key={libro.id}
          bottomDivider
          onPress={()=>modificarLiibro(libro.id)}
        >
          <ListItem.Content>
            <ListItem.Title>{libro.nombre}</ListItem.Title>
            <ListItem.Subtitle>{libro.edicion}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </ScrollView>
    <StatusBar style="auto" />
      
        <TouchableOpacity style={styles.buttonClose} onPress={cerrarSesion}>
          <Text style={styles.text}>Cerrar sesión</Text>
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
};
export default LibrosList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    width: '100%'
  },
  buttonClose:{
    marginVertical: 15,
    backgroundColor: '#CC0000',
    padding: 15
  
  },
  text:{
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
  }
});
