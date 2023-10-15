import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import OrderedCard from '../components/OrderedCard'
import COLORS from '../consts/colors';


const OrederedPage = () => {
    // const [packages, setPackages] = useState([]);
    const [orderFood, setOrderFood] = useState([]);
    const getData = async () => {
        await axios.get("http://172.28.19.152:3000/restaurant")
            .then((res) => {
                setOrderFood(res.data);
            })
            .catch((err) => {
                // Alert.alert("Error occurred while retrieving data")
                console.error('Error:', err);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.container]}>
                <View >
                    <Text style={styles.heading}>Ordered Items</Text>
                </View>

                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {orderFood.map((item, index) => (
                        <OrderedCard key={index} item={item} getData={getData} />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

        justifyContent: 'space-evenly',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 0,
        textAlign: 'center',
        backgroundColor: COLORS.primary,
        color: COLORS.light,
        height: 50,
        paddingTop:10


    },
    scrollView: {
        height: hp(100),
    },
});
export default OrederedPage;