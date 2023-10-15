import React, { useState } from 'react'

import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    StyleSheet
} from "react-native";

import places from '../../consts/blogConstants/place';
import ActiveBloggerCard from './ActiveBloggerCard';

export default function ActiveBlogger() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, set] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Active Bloggers</Text>
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
                        data={places}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <ActiveBloggerCard
                                item={item}
                            />
                        )}
                        contentContainerStyle={{ columnGap: 16 }}
                        horizontal
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
        marginTop: 20
    }
})