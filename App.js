import React, { useContext } from 'react';

// Navigator
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import { Dashboard } from "./src/Screens/Dashboard/Dashboard";
import { Perfil } from "./src/Screens/Perfil/Perfil";

const AuthStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name='Dashboard' component={Dashboard} options={{ title: '', headerTransparent: true }}/>
        <AuthStack.Screen name='Perfil' component={Perfil} options={{ title: 'Perfil', headerTransparent: true }}/>
        {/* <AuthStack.Screen name='Historial' component={} options={{ title: '', headerTransparent: true }}/>
        <AuthStack.Screen name='MisProductos' component={} options={{ title: '', headerTransparent: true }}/>
        <AuthStack.Screen name='MetodosDePago' component={} options={{ title: '', headerTransparent: true }}/>
        <AuthStack.Screen name='Subasta' component={} options={{ title: '', headerTransparent: true }}/>
        <AuthStack.Screen name='Catalogo' component={} options={{ title: '', headerTransparent: true }}/> */}
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
