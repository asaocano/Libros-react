import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Input from "../components/Input";
import axios from "axios";
import DropdownAlert from "react-native-dropdownalert";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

const Login = (props) => {
  const [user, setUser] = useState("");
  const [contra, setContra] = useState("");
  let dropDownAlertRef = useRef();

  //useEffect(() => {
  //  isSigned();
  //},[])

  const iniciarSesion = async () => {
    const obj = { user: user, pass: contra };

    try {
      
      const respuesta = await axios({
        method: "get",
        url: "http://direccion_api/apilibro/",
        params: obj,
      });
      
      if (respuesta.data.id) {
        setUser("");
        setContra("");
        dropDownAlertRef.alertWithType("success", "Éxito", "¡Bienvenido!");
        const jsonValue = JSON.stringify(respuesta.data); //Usando este método, se puede guardar un JSON de manera local
        await AsyncStorageLib.setItem('user', jsonValue);

        setTimeout(() => {
          props.navigation.navigate("LibrosList");
        }, 2000);
      } else {
        dropDownAlertRef.alertWithType(
          "error",
          "Error",
          "Usuario o contraseña incorrectos"
        );
      }
      /**/
    } catch (e) {
      dropDownAlertRef.alertWithType("error", "Error", "Ha ocurrido un error");
    }
  };
  const isSigned = async() =>{
    const respuesta = await AsyncStorageLib.getItem('user');
    if (respuesta != null) {
      props.navigation.navigate('LibrosList');
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi biblioteca online</Text>
      <View style={styles.content}>
        <Image style={styles.img} source={require("../assets/librero.png")} />
        <Input
          texto={"Usuario"}
          valor={user}
          campo={(e) => {
            setUser(e);
          }}
          contra={false}
        />
        <Input
          texto={"Contraseña"}
          valor={contra}
          campo={(e) => {
            setContra(e);
          }}
          contra={true}
        />
        <TouchableOpacity style={styles.button} onPress={iniciarSesion}>
          <Text style={styles.buttonText}>Entrar</Text>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 15,
    textAlign: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  img: {
    marginVertical: 30,
  },
  button: {
    backgroundColor: "#00C851",
    padding: 15,
    width: 200,
    borderRadius: 60,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
  },
});

export default Login;
