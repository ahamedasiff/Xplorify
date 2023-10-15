import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function ActiveBloggerCard({ item }) {
    return (
        <TouchableOpacity
            style={styles.container(item)}
        >
            <TouchableOpacity style={styles.logoContainer(item)}>
                <Image
                    source={item.image}
                    resizeMode='contain'
                    style={styles.logoImage}
                />
                {/* <Text>{item.placeLocation}</Text> */}
            </TouchableOpacity>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    logoImage: {
        width: 70,
        height: 70,
        borderRadius: 50,
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
    container: (item) => ({
        // width: 100,
        padding: 15,
        backgroundColor: "#FFF",
        borderRadius: 40,
        justifyContent: "space-between",
        // ...SHADOWS.medium,
        shadowColor: 'white',
    }),
    logoContainer: (item) => ({
        width: 50,
        height: 50,
        // backgroundColor: selectedJob === item.job_id ? "#FFF" : COLORS.white,
        backgroundColor: 'white',
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    }),
})
