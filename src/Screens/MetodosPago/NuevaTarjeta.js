import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";
import {Button} from 'react-native-elements';

//Context
import {DataContext} from "../../context/DataContext";

const NuevaTarjeta = () => {
  
  const [cardData, setCardData] = useState(null);
  
  //Data form Data Context
  const {userData} = useContext(DataContext);

  const createTarjetaCredito = async (dataTarjeta) => {
    console.log('Llegué a createTarjetaCredito NuevaTarjeta');
    try {
      let tarjetaDatos = await fetch('http:localhost:3000/api/metodo-de-pago/new/tarjeta', {
        method: 'POST',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataTarjeta)
      });
      return tarjetaDatos.status;
    } catch (e) {
      console.log('Estoy en el catch de createTarjetaCredito NuevaTarjeta');
      console.log(e);
    }
  }

  const createTarjeta = async () => {
    let cardData2 = JSON.parse(cardData);
    let dataTarjeta = {
      nombreTitular: cardData2['values']['name'],
      entidad: cardData2['values']['type'],
      numero: cardData2['values']['number'],
      vencimiento: cardData2['values']['expiry'],
      // idCliente: userData.idCliente,
      idCliente: 2,
      codigo: cardData2['values']['cvc']
    }
    console.log(dataTarjeta);
    const status = await createTarjetaCredito(dataTarjeta);
    if (status = 201) {
      console.log('Tarjeta de crédito/débito cargada con éxito');
    }
  };

  return (
    <View>
      <View style={styles.containerCard}>
        <CreditCardInput
          autoFocus

          requiresName
          requiresCVC

          labelStyle={styles.label}
          inputStyle={styles.input}
          validColor={"black"}
          invalidColor={"red"}
          placeholderColor={"darkgray"}

          // onFocus={_onFocus}
          onChange={(formData) => setCardData(JSON.stringify(formData))}
        />
      </View>
      <View style={styles.containerButton}>
        <Button 
          title='Aceptar'
          type='solid'
          buttonStyle={{
            backgroundColor: '#FC9905',
            borderRadius: 5,
            height: 45,
            width: 250,
            borderWidth: 1.7,
            borderColor: '#FC9905',
            marginHorizontal: 5
          }}
          onPress={createTarjeta}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    containerCard: {
      backgroundColor: "#F5F5F5",
      marginTop: 60,
      marginVertical:60
    },
    containerButton: {
      backgroundColor: "#F5F5F5",
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      color: "black",
      fontSize: 12,
    },
    input: {
      fontSize: 16,
      color: "black",
    },
  });

  export default NuevaTarjeta