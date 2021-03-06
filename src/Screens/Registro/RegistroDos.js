import {StatusBar} from 'expo-status-bar';
import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Button} from "react-native-elements";
import { apiUrl } from "../../api";
import {ModalLogin} from "../../Components/Login/ModalLogin";

const RegistroDos = ({navigation}) => {

  const [registroInfo, setRegistroInfo] = useState({
    email: '',
    password: '',
  });

  const [userPassword, setUserPassword] = useState('');

  const [showModal, setShowModal] = useState({
    visible: false,
    title: '¡Ups!',
    msg: 'Hubo un error. Por favor, compruebe sus datos y vuelva a intentarlo.',
    icon: 'wrongCredentials'
  });

  const registro = async () => {
    if (userPassword === registroInfo.password) {
      try {
        let loginDatos = await fetch(`${apiUrl}/api/user/change-password`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(registroInfo)
        });
        if (loginDatos.status === 201) {
          navigation.push('Login')
        }
        if (loginDatos.status === 500) {
          setShowModal({...showModal, msg: 'Ha ocurrido un error. Vuelva a intentarlo.', visible: true});
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      setShowModal({...showModal, msg: 'Las contraseñas no coinciden. Vuelva a intentarlo.', visible: true});
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Formulario de Registro</Text>
      <Text style={styles.subtitulo}>SEGUNDA ETAPA</Text>
      <Text style={styles.textoAbajo}>¡Su cuenta fue confirmada con éxito!</Text>
      <Text style={styles.textoAbajo}>Ahora es momento de que ingrese la{"\n"}contraseña que se asociará a tu
        cuenta</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        onChangeText={(text) => setRegistroInfo({...registroInfo, email: text})}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese su nueva contraseña"
        secureTextEntry={true}
        onChangeText={(text) => setRegistroInfo({...registroInfo, password: text})}
      />
      <TextInput
        style={styles.input}
        placeholder="Re-ingrese su nueva contraseña"
        secureTextEntry={true}
        onChangeText={setUserPassword}
      />
      <Button
        buttonStyle={{
          width: 250,
          backgroundColor: '#FD9419',
          borderRadius: 5,
        }}
        containerStyle={{margin: 20}}
        onPress={registro}
        title="Finalizar"
      />
      <Text style={styles.textoAbajo}>Gracias por registrarse en Subastalo</Text>

      {showModal.visible ? (
          <ModalLogin modalData={showModal} setShowModal={setShowModal} navigation={navigation}/>)
        : null
      }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10,
  },
  subtitulo: {
    fontFamily: 'Roboto',
    fontSize: 30,
    marginBottom: 30,
  },
  input: {
    height: 40,
    width: 250,
    margin: 6,
    borderWidth: 2,
    borderRadius: 9,
    borderColor: '#F3F2F2',
    paddingLeft: 10
  },
  textoAbajo: {
    color: '#7E7E7E',
    fontFamily: 'Roboto',
    fontSize: 15,
    marginBottom: 10,
  },
});

export default RegistroDos