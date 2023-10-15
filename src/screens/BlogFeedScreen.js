import React from 'react'
import { ScrollView, StyleSheet, Text, View, useColorScheme, TextInput, Animated, FlatList,
    //  Dimensions, 
     TouchableOpacity, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import blogs from '../consts/blogConstants/blog';


// const { width } = `Dimensions`.get('screen');
// const cardWidth = width / 2.2;


export default function BlogFeedScreen({ navigation }) {
    const colorScheme = useColorScheme();
    const [activeCardIndex, setActiveCardIndex] = React.useState(0)
    const scrollX = React.useRef(new Animated.Value(0)).current

    const Card = ({ blogs }) => (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('BlogFeedDetails', blogs)}>
            <View style={style.card}>
                <Image source={blogs.image} style={style.cardImage} />
                <View style={style.cardDetails}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{blogs.bloggerName}</Text>
                    <Text style={{ color: COLORS.grey, fontSize: 16 }}>{blogs.bloggerName}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={style.header}>
                <View style={{ paddingBottom: 15 }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Find Your Related Blogs</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>in </Text>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'red' }}>Sri Lanka</Text>
                    </View>
                </View>
                <Icon name='person-outline' size={38} color={'gray'} />
            </View>
            <View style={style.searchInputContainer}>
                <Icon name="search" size={30} style={{ marginLeft: 20 }} />
                <TextInput placeholder="Search" style={{ fontSize: 20, paddingLeft: 10 }} />
            </View>
            <View style={style.cardContainer}>
                <FlatList
                    data={blogs}
                    numColumns={1}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Card blogs={item} />}
                    contentContainerStyle={style.flatListContainer}
                />
            </View>
        </SafeAreaView>
    )
}


const style = StyleSheet.create({
    header: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    searchInputContainer: {
        height: 50,
        backgroundColor: COLORS.light,
        marginTop: 15,
        marginLeft: 20,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardContainer: {
        flex: 1,
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    card: {
        // flex: 1,
        elevation: 5,
        margin: 10,
        borderRadius: 15,
        backgroundColor: COLORS.white,
    },
    cardImage: {
        height: 200,
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    cardDetails: {
        padding: 20,
    },
    flatListContainer: {
        paddingBottom: 20,
    },
});