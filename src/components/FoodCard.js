import React from 'react';
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
import foods from '../consts/foods';


const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;

const FoodCard = ({ navigation }) => {
    
    const [activeCardIndex, setActiveCardIndex] = React.useState(0)
    const scrollX = React.useRef(new Animated.Value(0)).current


    const Card = ({ food, index }) => {
        const inputRange = [
            (index - 1) * cardWidth,
            index * cardWidth,
            (index + 1) * cardWidth,
        ];
        const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 0, 0.7],
        });
        const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
        });
        return (
            <TouchableOpacity
                disabled={activeCardIndex != index}
                activeOpacity={1}
                onPress={()=>navigation.navigate('FoodDetails',food)}
              >
                <Animated.View style={{ ...style.card, transform: [{ scale }] }}>
                    <Animated.View style={{ ...style.cardOverLay, opacity }} />
                    <View style={style.priceTag}>
                        <Text
                            style={{ color: COLORS.white, fontSize: 20, fontWeight: 'bold' }}>
                            ${food.price}
                        </Text>
                    </View>
                    <Image source={food.image} style={style.cardImage} />
                    <View style={style.cardDetails}>
                        <View
                            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                                    {food.name}
                                </Text>
                                <Text style={{ color: COLORS.grey, fontSize: 12 }}>
                                    {food.type}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 10,
                            }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="star" size={15} color={COLORS.orange} />
                                <Icon name="star" size={15} color={COLORS.orange} />
                                <Icon name="star" size={15} color={COLORS.orange} />
                                <Icon name="star" size={15} color={COLORS.orange} />
                                <Icon name="star" size={15} color={COLORS.grey} />
                            </View>
                            <Text style={{ fontSize: 10, color: COLORS.grey }}>365reviews</Text>
                        </View>
                    </View>
                </Animated.View>
            </TouchableOpacity>

        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View>
                    <Animated.FlatList
                        onMomentumScrollEnd={(e) => {
                            setActiveCardIndex(
                                Math.round(e.nativeEvent.contentOffset.x / cardWidth),
                            );
                        }}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: true },
                        )}
                        horizontal
                        data={foods}
                        contentContainerStyle={{
                            paddingVertical: 30, paddingLeft: 20,
                            paddingRight: cardWidth / 2 - 40
                        }}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => <Card food={item} index={index} />}
                        snapToInterval={cardWidth}
                    />

                </View>


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
})
export default FoodCard;