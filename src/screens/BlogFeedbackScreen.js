import React from 'react'
import { View, Text, TextInput, Button, StyleSheet, StatusBar, Pressable, TouchableOpacity, Platform } from 'react-native';
import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
// const { width } = Dimensions.get('screen');

// import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export default function BlogFeedbackScreen({ route, navigation }) {

    const blog = route.params.blog;

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent={false}
            />
            {/* <View style={styles.headingContainer}>
                <Icon
                    name="arrow-back-ios"
                    size={28}
                    color={COLORS.dark}
                    onPress={navigation.goBack}
                />
                <Text style={styles.heading}>Booking Details</Text>
            </View> */}
            <Text style={styles.hotelDetails}>Blogger Name: {blog.bloggerName}</Text>
            <Text style={styles.hotelDetails}>Price: {blog.blogCity}</Text>
            <View>
                <Text style={styles.label}>Enter Opinion Title</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Your Opinion Title"
                // value={idNumber}
                // onChangeText={handleIdNumberChange}
                />

                <Text style={styles.label}>Enter Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="example@gmail.com"
                // value={idNumber}
                // onChangeText={handleIdNumberChange}
                />

                <Text style={styles.label}>Enter Contact-No</Text>
                <TextInput
                    style={styles.input}
                    placeholder="+xx xx xxxx xxxxx"
                // value={idNumber}
                // onChangeText={handleIdNumberChange}
                />

                <TouchableOpacity style={styles.btn}>
                    <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>Book Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    btn: {
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: COLORS.primary,
        marginHorizontal: 20,
        borderRadius: 10,
        bottom: 0,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        textAlign: 'center'
    },
    label: {
        marginTop: 10,
        marginBottom: 10
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginTop: 15,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
        // paddingBottom: 5,
        borderWidth: 1,
        borderColor: COLORS.dark
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
    hotelDetails: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    }
});
