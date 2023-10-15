import React from 'react';
import { View, Text, Image,  StyleSheet,Alert , Pressable,  } from 'react-native';
import axios from 'axios';
import { shareAsync } from 'expo-sharing';
import * as Print from 'expo-print';
import { useNavigation } from '@react-navigation/native';
import searchFoods from '../consts/searchFood';
import COLORS from '../consts/colors';

const OrderedCard = ({ item, getData }) => {
    let url;
    const key = item._id;
    const navigation = useNavigation();

    searchFoods.map((item1) => {
        if (item.name === item1.name) {
            url = item1.image;
        }
    });

    const deleteData = async (id) => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this order?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        await axios.delete(`http://172.28.19.152:3000/restaurant/${id}`)
                            .then(() => {
                                Alert.alert("Package Details Deleted Successfully");
                                getData();
                                console.log("Package Details Deleted");
                            })
                            .catch((err) => {
                                Alert.alert("Error occurred while deleting the details");
                                console.error('Error:Error occurred while deleting the details', err);
                            });
                    },
                },
            ]
        );
    };

    const html = `
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
            <style>
                table {
                    border-collapse: collapse;
                    width: 100%;
                }
                th, td {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 8px;
                }
                tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body style="text-align: center;">
            <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
                Food Order Receipt
                <br>
                <span style="color:red; font-size: 30px">ID : ${key}</span>
            </h1>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Contact No</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Order Note</th>
                </tr>
                <tr>
                    <td>${item.name}</td>
                    <td>${item.contact}</td>
                    <td>${item.quantity}</td>
                    <td>${item.total}</td>
                    <td>${item.note}</td>
                </tr>
            </table>
        </body>
        </html>
    `;

    const print = async () => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        await Print.printAsync({
            html,
            // iOS only
        });
    };

    const share = async () => {
        const { uri } = await Print.printToFileAsync({ html });
        console.log('File has been saved to:', uri);
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    };

    return (
        <View style={styles.container}>
             <View style={styles.topFoodCard}>
                    <Image style={styles.topFoodCardImage} source={url && url.uri ? { uri: url.uri } : null} />
                    <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' , alignSelf:'center'}}>{item.name}</Text>
                        <Text style={{ fontSize: 12, fontWeight: 'normal', color: COLORS.grey }}> </Text>
                        <View style ={{flexDirection:'row', justifyContent:'space-around'}}>
                            <Pressable style={styles.btn} onPress={()=>print()} >
                                <Text style={{ color: COLORS.white, fontSize: 15, fontWeight: 'bold', textAlign:'center', paddingTop:5, }}>View</Text>
                            </Pressable>
                            <Pressable style={styles.btn} onPress={()=>share()} >
                                <Text style={{ color: COLORS.white, fontSize: 15, fontWeight: 'bold', textAlign:'center', paddingTop:5, }}>Share</Text>
                            </Pressable>
                            <Pressable style={styles.btn} onPress={()=>navigation.navigate('UpdateOrder',{...item})} >
                                <Text style={{ color: COLORS.white, fontSize: 15, fontWeight: 'bold', textAlign:'center', paddingTop:5, }}>Update</Text>
                            </Pressable>
                            <Pressable style={styles.btn} onPress={()=>deleteData(key)} >
                                <Text style={{ color: COLORS.white, fontSize: 15, fontWeight: 'bold', textAlign:'center', paddingTop:5, }}>Delete</Text>
                            </Pressable>
                        </View>
                        
                    </View>
            </View>    
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignSelf:'center',
        width:'200'
    },
    topFoodCard: {
        height: 230,
        width: 300,
        backgroundColor: COLORS.white,
        elevation: 15,
        marginHorizontal: 10,
        marginVertical:10,
        borderRadius: 10,
    },
    topFoodCardImage: {
        height: 130,
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    btn:{
        height: 30,
        width:60,
        // align:Items:'center',
        // marginTop: 0,
        backgroundColor: COLORS.primary,
        // marginHorizontal: 20,
        borderRadius: 7,
        // marginBottom: 20,
    }
});

export default OrderedCard;
