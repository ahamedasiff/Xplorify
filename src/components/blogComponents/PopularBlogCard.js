import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import blogs from '../../consts/blogConstants/blog';


export default function PopularBlogCard({ item, navigation }) {

    return (
        <TouchableOpacity
            style={styles.container(item)}
            onPress={() => navigation.navigate('BlogPopular', item)}
        >
            <TouchableOpacity style={styles.logoContainer(item)}>
                <Image
                    // source={blogs[1].image}
                    source={{
                        uri: item.image == ''
                        ? item.image
                        : "https://static.saltinourhair.com/wp-content/uploads/2016/11/23155637/Things-to-do-Ella-Sri-Lanka-Nine-arch-bridge-view-2.jpg"
                    }}
                    resizeMode='contain'
                    style={styles.logoImage}
                />
            </TouchableOpacity>
            <Text style={styles.companyName} numberOfLines={1}>{item.blogTitle}</Text>
            <View style={styles.infoContainer}>
                <Text numberOfLines={1}>
                    {item.blogCity}
                </Text>
                <View style={styles.infoWrapper}>
                    <Text >
                        {item?.blogCountry} -
                    </Text>
                    <Text style={styles.location}> {item.bloggerName}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    logoImage: {
        width: "100%",
        height: "100%",
        borderRadius: 20
    },
    companyName: {
        fontSize: 16,
        // fontFamily: FONT.regular,
        color: "#B3AEC6",
        marginTop: 10 / 1.5,
    },
    infoContainer: {
        marginTop: 10,
    },
    infoWrapper: {
        flexDirection: "row",
        marginTop: 5,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    location: {
        fontSize: 16 - 2,
        // fontFamily: FONT.regular,
        color: "#B3AEC6",
    },
    container: (item) => ({
        width: 250,
        padding: 25,
        backgroundColor: "#FFF",
        borderRadius: 16,
        justifyContent: "space-between",
        // ...SHADOWS.medium,
        shadowColor: 'white',
    }),
    logoContainer: (item) => ({
        width: 200,
        height: 100,
        // backgroundColor: selectedJob === item.job_id ? "#FFF" : COLORS.white,
        backgroundColor: 'white',
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    }),
})