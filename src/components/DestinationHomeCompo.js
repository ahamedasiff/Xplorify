import React from 'react';
import {
    Dimensions,
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import destinationDatas  from '../consts/destinationDatas';
import foods from '../consts/foods';


const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;

const DestinationHomeCompo = ({ navigation }) => {

    const Topdestination = ({ destinationData }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('FoodDetails', destinationData)}>
                <View style={style.topdestinationCard}>
                    <Image style={style.topdestinationCardImage} source={destinationData.image} />
                    <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{destinationData.title}</Text>
                        <Text style={{ fontSize: 12, fontWeight: 'normal', color: COLORS.grey }}>
                            {destinationData.duration}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                    <Text style={{ fontWeight: 'bold', color: COLORS.grey, }}>Destination</Text>
                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: COLORS.grey, paddingRight: 10 }}>See All</Text>
                            <Icon name="arrow-forward-ios" size={15} color="#908e8c" />
                        </View>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={destinationDatas.slice(0,2)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingLeft: 20,
                        marginTop: 20,
                        paddingBottom: 30,
                    }}
                    renderItem={({ item }) => <Topdestination destinationData={item} />}
                />



            </ScrollView>
        </SafeAreaView>
    );
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
        marginHorizontal: 20,
        borderRadius: 30,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: COLORS.primary,
        borderWidth: 1,

    },
    card: {
        height: 280,
        width: cardWidth,
        elevation: 15,
        marginRight: 20,
        borderRadius: 15,
        backgroundColor: COLORS.white,
    },
    cardImage: {
        height: 200,
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
        height: 110,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        position: 'absolute',
        bottom: 0,
        padding: 20,
        width: '100%',
    },
    cardOverLay: {
        height: 280,
        backgroundColor: COLORS.white,
        position: 'absolute',
        zIndex: 100,
        width: cardWidth,
        borderRadius: 15,
    },
    topdestinationCard: {
        height: 160,
        width: 220,
        backgroundColor: COLORS.white,
        elevation: 15,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    topdestinationCardImage: {
        height: 100,
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
})

export default DestinationHomeCompo;

