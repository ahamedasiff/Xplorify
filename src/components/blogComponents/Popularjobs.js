import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Dimensions
} from "react-native";
import PopularBlogCard from './PopularBlogCard';
import axios from 'axios';

import blog from '../../consts/blogConstants/blog';

// const { width } = Dimensions.get('screen');
// const cardWidth = width / 2.2;

export default function Popularjobs({ navigation }) {

    const [isLoading, setIsLoading] = useState(false);
    const [error, set] = useState(false);

    const [fetchBlog, setFetchBlog] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await axios.get("http://172.28.19.239:3000/blog")
            .then((res) => {
                setFetchBlog(res.data);
            })
            .catch((err) => {
                Alert.alert("Error occurred while retrieving data")
                console.error('Error:', err);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Popular Blogs</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('BlogAdd', blog)}
                >
                    <Text style={styles.headerBtn}>Add Blogs</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size='large' color={'FF7754'} />
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : (
                    <FlatList
                        data={fetchBlog}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <PopularBlogCard
                                item={item}
                                navigation={navigation}
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
        marginTop: 10
    }
})