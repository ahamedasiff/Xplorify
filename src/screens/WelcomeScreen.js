import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import searchFood from '../consts/searchFood';
import HomeCompo from '../components/FoodHomeCompo';
import HotelHomeCompo from '../components/HotelHomeCompo';
import DestinationHomeCompo from '../components/DestinationHomeCompo';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import blogs from '../consts/blogConstants/blog';


const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;

const WelcomeScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (text) => {
        setSearchQuery(text);
        if (text.trim() === '') {
            setSearchResults([]);
        } else {
            const filteredResults = searchFood.filter(
                (food) =>
                    food.name.toLowerCase().includes(text.toLowerCase()) ||
                    food.type.toLowerCase().includes(text.toLowerCase())
            );
            setSearchResults(filteredResults);
        }
    };

    const Card = ({ searchFood }) => (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('FoodDetails', searchFood)}>
            <View style={style.card}>
                <Image source={searchFood.image} style={style.cardImage} />
                <View style={style.cardDetails}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{searchFood.name}</Text>
                    <Text style={{ color: COLORS.grey, fontSize: 12 }}>{searchFood.type}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={style.header}>
                <View style={{ paddingBottom: 15 }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Xplorify</Text>

                </View>
                {/* <Icon name='person-outline' size={38} color={COLORS.grey} /> */}
            </View>
            <View style={style.searchInputContainer}>
                <Icon name='search' size={25} style={{ marginLeft: 20 }} />
                <TextInput
                    placeholder='Search'
                    style={{ fontSize: 18, paddingLeft: 10, }}
                    value={searchQuery}
                    onChangeText={(text) => handleSearch(text)}
                />
            </View>
            {/* ----------------------- Blog page => Started ---------------------------------  */}

            <View style={style.blogButtonCOntainer} >
                <TouchableOpacity style={style.blogButton} onPress={() => navigation.navigate('BlogHome')}>
                    <Text style={style.blogBtn}>Visit Blog Page</Text>
                </TouchableOpacity>
            </View>

            {/* ----------------------- Blog page Closed ---------------------------------  */}
            {searchQuery.trim() ? (
                <FlatList
                    data={searchResults}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (<Card searchFood={item} />)}
                    contentContainerStyle={style.flatListContainer}
                />
            ) : (
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <DestinationHomeCompo navigation={navigation} />
                    <HotelHomeCompo navigation={navigation} />
                    <HomeCompo navigation={navigation} />
                </ScrollView>
            )
            }
        </SafeAreaView >
    );

}

const style = StyleSheet.create({
    header: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    searchInputContainer: {
        height: 40,
        backgroundColor: COLORS.light,
        marginTop: 15,
        marginHorizontal: 20,
        borderRadius: 30,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
        borderWidth: 1,

    },
    card: {
        elevation: 5,
        margin: 10,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        marginHorizontal: 30,
        height: 230
    },
    cardImage: {
        height: 150,
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    priceTag: {
        height: 60,
        width: 80,
        backgroundColor: COLORS.primary,
        position: 'absolute',
        zIndex: 1,
        right: 0,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardDetails: {
        padding: 20,
    },
    cardOverLay: {
        height: 280,
        backgroundColor: COLORS.white,
        position: 'absolute',
        zIndex: 100,
        width: cardWidth,
        borderRadius: 15,
    },
    topFoodCard: {
        height: 160,
        width: 220,
        backgroundColor: COLORS.white,
        elevation: 15,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    topFoodCardImage: {
        height: 100,
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    flatListContainer: {
        paddingBottom: 20,
    },
    blogButtonCOntainer: {
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    blogButton: {
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 15,
        alignItems: 'center'
    },
    blogBtn: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
})
export default WelcomeScreen;