import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";



export default function NearbyBlogCard({ item }) {
    return (
        <TouchableOpacity style={styles.container}>
            <TouchableOpacity style={styles.logoContainer}>
                <Image
                    source={item.image}
                    resizeMode='contain'
                    style={styles.logoImage}
                />
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.blogName} numberOfLines={1}>
                    {item?.blogTitle}
                </Text>

                <Text style={styles.blogType}>{item?.blogCity}</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    logoImage: {
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    companyName: {
        fontSize: 16,
        // fontFamily: FONT.regular,
        color: "#B3AEC6",
        marginTop: 10 / 1.5,
    },
    infoContainer: {
        marginTop: 20,
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
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: 16,
        borderRadius: 10,
        backgroundColor: "#FFF",
        // ...SHADOWS.medium,
        shadowColor: 'white',
    },
    logoContainer: {
        width: 130,
        height: 100,
        backgroundColor: 'white',
        // borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        flex: 1,
        marginHorizontal: 16,
    },
    blogName: {
        fontSize: 16,
        // fontFamily: "DMBold",
        color: '#444262',
    },
    blogType: {
        fontSize: 10 + 2,
        // fontFamily: "DMRegular",
        color: 'gray',
        marginTop: 3,
        textTransform: "capitalize",
    }
})