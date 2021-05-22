import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { Button, Badge } from 'react-native-elements';
import Moment from 'moment';

const AuctionCard = ({ idSubasta, fechaSubasta, horaSubasta, categoriaSubasta, nombreSubastador, estadoSubasta, navigation }) => {
    const Strong = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>
    const AuctionState = () => {
        let color;
        if (estadoSubasta === 'abierta') {
            estadoSubasta = 'En vivo'
            color = '#51BE35'
        } else {
            estadoSubasta = 'Próximo'
            color = '#FF5C5C'
        }
        return color;
    }

    return (

        <View style={styles.auctionCard}>

            <View style={{ flex: 0.8, flexDirection: 'row', alignItems: 'flex-start' }}>
                <View style={{ flex: 2, flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20 }}>Categoría </Text>
                        <Badge containerStyle={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} status="warning" />
                        <Text style={{ fontSize: 20 }}> {categoriaSubasta}</Text>
                    </View>
                </View>

                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text style={{
                        color: AuctionState(),
                        textAlign: 'right',
                        fontWeight: 'bold',
                        fontSize: 14,
                        paddingRight: 15,
                        textTransform: 'capitalize'
                    }}>{estadoSubasta}</Text>
                </View>
            </View>

            <View style={{ flex: 1.5, flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text style={{ fontSize: 13, marginBottom: 1, }}><Strong>Fecha:</Strong> {Moment(fechaSubasta).format('DD/MM/YYYY')} </Text>
                    <Text style={{ fontSize: 13, marginBottom: 1, }}><Strong>Hora:</Strong> {Moment(horaSubasta).format('HH:MM')} </Text>
                    <Text style={{ fontSize: 13, marginBottom: 1, }}><Strong>Rematador:</Strong> {nombreSubastador}</Text>
                </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', }}>
                    <Button
                        disabled={estadoSubasta === 'En vivo' ? false : true}
                        disabledStyle={{ borderColor: '#C4C4C4' }}
                        title='Ingresar'
                        type='solid'
                        titleStyle={{ fontWeight: '100' }}
                        buttonStyle={{
                            backgroundColor: '#FC9905',
                            borderRadius: 5,
                            height: 35,
                            borderWidth: 1.7,
                            borderColor: '#FC9905'
                        }}
                        containerStyle={{ width: 165, alignSelf: 'flex-start' }}
                        onPress={() => navigation.navigate('Subasta', {
                            idSubasta: idSubasta
                        })}
                    />
                </View>

                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <Button
                        title='Catálogo'
                        type='outline'
                        buttonStyle={{ borderRadius: 5, borderWidth: 1.7, borderColor: '#FC9905', height: 35 }}
                        titleStyle={{ color: '#FC9905' }}
                        containerStyle={{ width: 165, alignSelf: 'flex-end' }}
                    />
                </View>
            </View>
        </View>

    )
};

const styles = StyleSheet.create({
    auctionsContainer: {
        flex: 1,
        width: '95%',
        marginTop: 10,
    },

    auctionCard: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 7,

        backgroundColor: '#FAFAFA',
        borderRadius: 10,
        height: 165,
        padding: 13,
        marginBottom: 15
    },

});


export default AuctionCard