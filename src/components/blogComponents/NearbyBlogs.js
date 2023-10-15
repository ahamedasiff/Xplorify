import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, FlatList, SafeAreaView, ScrollView } from "react-native";
import NearbyBlogCard from './NearbyBlogCard';
import blogs from '../../consts/blogConstants/blog';


export default function NearbyBlogs() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, set] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Recent Blogs</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>Show all</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size='large' color={'FF7754'} />
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : (
                    <FlatList
                        data={blogs}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <NearbyBlogCard
                                item={item}
                            />
                        )}
                        contentContainerStyle={{ columnGap: 16 }}
                    />
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        marginLeft: 10,
        marginRight: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerTitle: {
        color: '#312651',
        fontSize: 20
    },
    headerBtn: {
        color: '#FF7754',
        fontSize: 16
    },
    cardsContainer: {
        marginTop: 16,
        gap: 10,
    }
})