import React, {useContext} from 'react';

// Navigator
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

// Screens
import Dashboard from "./src/Screens/Dashboard/Dashboard";
import Perfil from "./src/Screens/Perfil/Perfil";
import MetodosPago from "./src/Screens/MetodosPago/MetodosPago"
import NewTarjeta from "./src/Screens/MetodosPago/NewTarjeta"
import NewTransferencia from "./src/Screens/MetodosPago/NewTransferencia"

// Providers
import { DataProvider } from "./src/context/DataContext";

const AuthStack = createStackNavigator();

export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <AuthStack.Navigator>
          <AuthStack.Screen name='Dashboard' component={Dashboard} options={{title: '', headerTransparent: true}}/>
          <AuthStack.Screen name='Perfil' component={Perfil} options={{title: 'Perfil', headerTransparent: true}}/>
          <AuthStack.Screen name='NewTransferencia' component={NewTransferencia} options={{ title: 'NewTransferencia', headerTransparent: true }}/>
          <AuthStack.Screen name='MetodosPago' component={MetodosPago} options={{ title: 'Metodos de Pago', headerTransparent: true }}/>
          <AuthStack.Screen name='NewTarjeta' component={NewTarjeta} options={{ title: 'NewTarjeta', headerTransparent: true }}/>
          {/* <AuthStack.Screen name='Historial' component={} options={{ title: '', headerTransparent: true }}/>
        <AuthStack.Screen name='MisProductos' component={} options={{ title: '', headerTransparent: true }}/>
        <AuthStack.Screen name='Subasta' component={} options={{ title: '', headerTransparent: true }}/>
        <AuthStack.Screen name='Catalogo' component={} options={{ title: '', headerTransparent: true }}/> */}
        </AuthStack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}
