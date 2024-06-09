import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View, Text, Image, TouchableOpacity, Linking, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';

function Redeemitem() {

    const [email, setEmail] = useState();
    const navigation = useNavigation();
    const back_arrow_icon = require("../assets/back_arrow_icon.png");
    const B = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>
    const [products, setProducts] = useState([])
    const handleLogin = async () => {
        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)
        const jsonValue = await AsyncStorage.getItem('@Data_Key')
        const val = JSON.parse(jsonValue)

        fetch('http://' + ip_add['ip'] + '/api/Voucher/', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                
                setProducts(responseJson)
                console.log(responseJson)
                
                




            })
            .catch((error) => {
                console.error(error);
            });






    };
    const Check =async()=>{
        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)
        const jsonValue = await AsyncStorage.getItem('@Data_Key')
        const val = JSON.parse(jsonValue)
        const dataof=[]
        fetch('http://' + ip_add['ip'] + '/api/Voucher/', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                responseJson.map(item => {
                    if (item['driver_id']==val['id'])
                    {
                        dataof.push({
                            Qr_code:item['Qr_code'],
                            price:item['price'],
                            voucher:item['voucher']


                        
                        })


                    }
                    



                })
                setProducts(dataof)

            })
            .catch((error) => {
                console.error(error);
            });




    }
    useEffect(() => {
        Check()

    }, []);
    return (
        <View style={styles.container}>
            <TouchableOpacity
            style={{ marginTop: 7, marginRight: 8 }}
            onPress={() => navigation.navigate("Voucherscreen")}
          >
            <Image
              source={back_arrow_icon}
              resizeMode="contain"
              style={{
                width: 30,
                height: 25,
                backgroundColor: '#ffffff'
              }}
            />
          </TouchableOpacity>  
            <Text style={{ marginLeft: 135,marginBottom:10, fontSize: 18, fontWeight: 'bold' }}>Redeemed Item</Text>
            <FlatList
                data={products}
                style={styles.productList}
                renderItem={({ item }) => (
                    <View style={styles.productCard}>
                        <Image source={{ uri: item.Qr_code }} style={styles.productImage} />
                        <View style={styles.productInfo}>

                            <Text style={styles.productPrice}>Voucher {item.price.toFixed(2)} <Text style={styles.productPriceText}>RM</Text></Text>
                            <Text style={styles.productName}>NO#{item.voucher} <Text style={styles.productPriceText}></Text></Text>


                        </View>

                    </View>

                )}

                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
            />

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
    },
    productList: {
        flex: 1,
        paddingTop: 16,
    },
    productCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        padding: 16,
        marginBottom: 16,
    },
    productImage: {
        width: 70,
        height: 70,
        marginRight: 16,
    },
    productInfo: {
        flex: 1,
        marginRight: 16,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    productDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4caf50',
    },
    productPriceText: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#666',
    },
    productAmount: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    amountButton: {
        width: 30,
        height: 30,
        backgroundColor: '#ffa726',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    amountButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    amountText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 16,
    },
    continueButton: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
        backgroundColor: '#4caf50',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttons: {
        flexDirection: 'row',
    },
    buttonq: {
        backgroundColor: '#50AB04',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginLeft: 30
    },
    buttonqw: {
        backgroundColor: '#DB4437',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginButton: {
        backgroundColor: '#000000',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 10
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Redeemitem;