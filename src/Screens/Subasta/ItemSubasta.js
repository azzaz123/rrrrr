import React, {useEffect, useContext, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Button, Icon} from 'react-native-elements'

//Context
import {PujasContext} from "../../context/PujasContext";

// Components
import SubastaCarousel from '../../Components/Subasta/SubastaCarousel';
import {ModalSubasta} from "../../Components/Subasta/ModalSubasta";

const ItemSubasta = ({route, navigation}) => {

  const [showModal, setShowModal] = useState({
    visible: true,
    title: '¡Ups!',
    msg: 'Ha ocurrido un error al encontrar el ítem. Vuelva a intentarlo mas tarde',
    icon: 'subastaError'
  });

  // Pujas Context
  const {getItemSubastandose, getPujas, item} = useContext(PujasContext);


  useEffect(() => {
    getItemSubastandose(route.params.idSubasta);
    if (item !== null) {
      let interval = setInterval(() => getPujas(), 8000)
      //destroy interval on unmount
      return () => clearInterval(interval)
    }

  }, [])

  if (item) {
    return (
      <View style={styles.container}>
        <View style={styles.imagesContainer}>
          <SubastaCarousel navigation={navigation}/>
        </View>
        <View style={styles.itemDescriptionContainer}>
          <Text style={styles.itemTitle}>
            Descripción Item
          </Text>
          <View style={styles.itemCardDescription}>
            <View style={styles.itemTextContainer}>
              <Text style={{fontSize: 12}} numberOfLines={5}>
                {item.descripcionCompleta}
              </Text>
            </View>
            <View style={styles.verticleLine}/>
            <View style={styles.itemTextPriceContainer}>
              <Text style={{fontSize: 12}}>
                Precio Base
              </Text>
              <Text>
                ${item.precioBase}
              </Text>
              <Text style={{fontSize: 12}}>
                Tiempo restante
              </Text>
              <Text>
                00:00:00
              </Text>
            </View>
          </View>

        </View>

        <View style={styles.pujasListContainer}>
          <ScrollView vertical showsVerticalScrollIndicator={false}>
            {
              item.pujas.map((item, idx) => {

                const numFormatter = (importe) => {
                  if (importe > 999 && importe < 1000000) return item.importe = (importe / 1000).toFixed(1) + 'K';
                  else if (importe > 1000000) return item.importe = (importe / 1000000).toFixed(1) + 'M';
                  else if (importe < 900) return importe;
                }

                numFormatter(item.importe);

                return (
                  <View style={styles.itemPuja} key={idx}>
                    <Icon
                      name='sc-telegram'
                      type='evilicon'
                      color='#517fa4'
                      reverse
                      size={18}
                    />
                    <Text style={{fontSize: 15,}}>Realizó una oferta</Text>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>${item.importe}</Text>
                  </View>
                )
              })
            }
          </ScrollView>
          <View style={{marginBottom: 8}}>
            <Button
              onPress={() => {
                navigation.navigate('NuevaPuja')
              }}
              title='Nueva Oferta'
              type='solid'
              titleStyle={{fontWeight: '100', color: '#fafafa', paddingLeft: 8}}
              buttonStyle={{
                backgroundColor: '#FC9905',
                borderRadius: 5,
                width: 350,
                borderWidth: 1.7,
                borderColor: '#FC9905',
                marginHorizontal: 5
              }}
            />
          </View>
        </View>
      </View>
    )
  } else {
    return (<ModalSubasta modalData={showModal} setShowModal={setShowModal} navigation={navigation}/>)
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
  },

  catalogoIcono: {
    marginTop: 40,
  },

  imagesContainer: {
    marginTop: 40,
    marginBottom: 390
  },

  itemDescriptionContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#000',
    minWidth: '100%',
    height: '54%',
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32
  },

  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 25,
    marginTop: 10,
    marginBottom: 10
  },

  itemCardDescription: {
    backgroundColor: '#FAFAFA',
    padding: 8,
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 10,
    flexDirection: 'row'
  },

  itemTextContainer: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemTextPriceContainer: {
    paddingLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#000',
  },

  pujasListContainer: {
    minWidth: '100%',
    height: '35%',
    backgroundColor: '#FAFAFA',
    position: 'absolute',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    bottom: 0,
    paddingRight: 20,
    paddingLeft: 20,
  },

  itemPuja: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: 8
  },
  btnPuja: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FC9905',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 3,
  },
  btnPujaText: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    color: '#FAFAFA',
  },
})

export default ItemSubasta