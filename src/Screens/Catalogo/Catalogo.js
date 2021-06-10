import React, {useEffect, useContext, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, AsyncStorage, TouchableOpacity} from 'react-native';
import apiUrl from "../../api";
import {Chip, Icon} from "react-native-elements";
import Carousel from 'react-native-snap-carousel';
import CatalogoCarousel from "../../Components/Catalogo/CatalogoCarousel";

const Catalogo = ({route, navigation}) => {

  const [catalogo, setCatalogo] = useState();

  useEffect(() => {
    const getCatalogo = async () => {
      try {
        let catalogo = await fetch(`${apiUrl}/api/subastas/catalogo/${route.params.idSubasta}/`);
        catalogo = await catalogo.json();
        console.log(catalogo)
        setCatalogo(catalogo)
      } catch (e) {
      }

    }
    getCatalogo();

  }, [])


  if (catalogo) {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
          <TouchableOpacity
            style={{
              justifyContent: 'flex-start',
              marginTop: '15%',
              paddingLeft: 20,
              paddingBottom: 10,
              paddingTop: 10
            }}
            onPress={() => navigation.goBack()}>
            <Icon
              name='arrow-back-outline'
              type='ionicon'
              color='#000'
              size={25}
            />
          </TouchableOpacity>
        </View>
        <ScrollView vertical showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
          <View>
            <Text style={{marginLeft: 22, fontSize: 20, fontWeight: 'bold'}}>Catálogo</Text>
            <View style={styles.descriptionCatalogo}>
              <Text style={{textAlign: 'center', fontSize: 18}}>
                {catalogo[0].descripcion}
              </Text>
            </View>
          </View>

          <View style={{marginVertical: 30, marginBottom: 50}}>
            {
              catalogo.map((item, idx) => {

                return (
                  <View style={styles.itemCatalogo} key={idx}>

                    <CatalogoCarousel images={catalogo} fotos={item.fotos}/>
                    <Text style={{fontSize: 28, paddingLeft: 15}}>${item.precioBase} - <Text style={{fontSize:22}}>{item.disponible === 'si' ? 'Item disponible' : 'Item no disponible'}</Text>  </Text>
                    <Text style={{fontSize: 18, paddingLeft: 15, paddingTop: 10}}>{item.descripcionCatalogo}</Text>
                    <Text style={{fontSize: 15, paddingLeft: 15, paddingTop: 10}}>Dueño/a: {item.duenioProducto}</Text>
                    <Text style={{fontSize: 15, paddingLeft: 15, paddingTop: 10}}>Categoria: {item.categoriaProducto}</Text>
                  </View>
                )
              })
            }

          </View>
        </ScrollView>
      </View>

    )
  } else return null


};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },

  descriptionCatalogo: {
    backgroundColor: '#fafafa',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 8,
    height: 150,
    justifyContent: 'center',
  },

  itemCatalogo: {
    marginVertical: 10,
    marginBottom: 20,
    backgroundColor: '#fafafa',
    height: 500,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    elevation: 8,
  },

})

export default Catalogo