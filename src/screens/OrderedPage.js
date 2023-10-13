import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import OrderedCard from '../components/OrderedCard'


const OrederedPage = () => {
    // const [packages, setPackages] = useState([]);
    const [orderFood, setOrderFood] = useState([]);
    const getData = async () => {
        await axios.get("http://192.168.205.78:3000/restaurant")
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
                <Text style={styles.heading}>Ordered Food</Text>
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
       
        justifyContent:'space-evenly',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 20,
        textAlign: 'center',
        
    },
    scrollView: {
        height: hp(100),
    },
});
export default OrederedPage;