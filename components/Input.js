import React from "react";
import { StyleSheet, TextInput } from "react-native";

const Input = (props) => 
    <TextInput
        placeholder={props.texto}
        style={styles.input}
        onChangeText={props.campo}
        value={props.valor}
        secureTextEntry={props.contra}
        >
    </TextInput>

const styles = StyleSheet.create({
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

export default Input;