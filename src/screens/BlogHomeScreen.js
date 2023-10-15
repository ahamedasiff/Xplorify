import React, { useState} from 'react'
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, useColorScheme, Image, Pressable, SafeAreaView } from 'react-native'
import blogs from '../consts/blogConstants/blog'
import Popularjobs from '../components/blogComponents/Popularjobs';
import NearbyBlogs from '../components/blogComponents/NearbyBlogs';


function BlogHomeScreen({navigation}) {

    const [searchTerm, setSearchTerm] = useState('');

  return (
    <ScrollView style={styles.container}>
            <View style={styles.innercontainer}>
                <Text style={styles.userName}>Hello Travellers</Text>
                <Text style={styles.welcomeMessage}>Find your perfect blogs</Text>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        value={searchTerm}
                        onChangeText={(text) => setSearchTerm(text)}
                        placeholder='What are you looking for?'
                    />
                </View>

                <TouchableOpacity style={styles.searchBtn}>
                    <Image
                        source={require('../consts/blogConstants/assets/icons/search.png')}
                        resizeMode='contain'
                        style={styles.searchBtnImage}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.tabcontainer}>
                <TouchableOpacity style={styles.tabButton} onPress={()=> navigation.navigate('BlogFeed')}>
                    <Text style={styles.tabText}>Blog Feed</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton} onPress={()=> navigation.navigate('BlogExplore')}>
                    <Text style={styles.tabText} >Welcome Page</Text>
                </TouchableOpacity>
            </View>
            <Popularjobs navigation={navigation} />
            <NearbyBlogs />
        </ScrollView>
  )
}

export default BlogHomeScreen



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innercontainer: {
        margin: 20
    },
    userName: {
        fontSize: 20,
        color: '#444262'
    },
    welcomeMessage: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    searchContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 8,
        marginRight: 8,
        marginLeft: 8,
        height: 50,
    },
    searchWrapper: {
        flex: 1,
        backgroundColor: "white",
        marginRight: 10,
        marginLeft: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        height: "100%"
    },
    searchInput: {
        // fontFamily: 'DMRegular',
        width: "100%",
        height: "100%",
        paddingHorizontal: 16,
    },
    searchBtn: {
        width: 50,
        height: "100%",
        backgroundColor: "#FF7754",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    searchBtnImage: {
        width: "50%",
        height: "50%",
        tintColor: "white",
    },
    tabcontainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
        // marginLeft: 20,
        // marginRight: 20,
    },
    tabButton: {
        backgroundColor: '#444262',
        margin: 10,
        padding: 10,
        width: '45%',
        borderRadius: 10
    },
    tabText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    }
})