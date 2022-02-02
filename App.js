import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import React,{useEffect, useState}  from 'react';
import CrearLibro from './Screens/CrearLibro';
import ModificarLibro from './Screens/ModificarLibro';
import LibrosList from './Screens/LibrosList'
import Login from './Screens/Login';
import AsyncStorageLib from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default function App() {
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    IsSigned();
  }, []);

 async function IsSigned(){
   
    try {
      const datos = await AsyncStorageLib.getItem('user');
    console.log(datos);
    if (datos != null) {
      setFlag(true);
    }
    console.log(flag);
    } catch (error) {
      
    }
  }
    
  
  function MyStack(){
  
    return(
      <Stack.Navigator
      initialRouteName={(flag == true) ? 'LibrosList' : 'Login'}
      >
        <Stack.Screen component={Login} name='Login' options={{headerLeft: (props) => null}}/>
        <Stack.Screen component={LibrosList} name='LibrosList' options={{title: 'Lista de libros', headerLeft: (props) => null}}/>
        <Stack.Screen component={ModificarLibro} name='ModificarLibro' options={{title: 'Modificar un libro'}}/>
        <Stack.Screen component={CrearLibro} name='CrearLibro' options={{title: 'Agregar libro'}}/>
      </Stack.Navigator>
    )
  }
  
  return(
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );

 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
