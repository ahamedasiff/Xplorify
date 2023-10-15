import React from 'react'
import {
    ImageBackground,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    // Dimensions
} from 'react-native';
import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

// const { height } = Dimensions.get('screen');

export default function BlogFeedDetailsScreen({ navigation, route }) {

    const item = route.params;

    const handleSendFeedback = () => {
        navigation.navigate('BlogFeedback', { blog: item })
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                flexGrow: 1,
                backgroundColor: COLORS.white,
                paddingBottom: 20,
            }}
        >
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="rgba(0,0,0,0)"
            />
            <ImageBackground style={style.headerImage} source={item.image}>
                {/* <View style={style.header}>
                    <Icon
                        name="arrow-back-ios"
                        size={28}
                        color={COLORS.white}
                        onPress={navigation.goBack}
                    />
                </View> */}
            </ImageBackground>
            <View>
                <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{item.bloggerName}</Text>
                    <Text style={{ fontSize: 18, fontWeight: '400', color: COLORS.grey, marginTop: 5 }}>{item.blogCity}</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ lineHeight: 20, color: COLORS.grey, fontSize: 16 }}>
                        {item.blogDetails}
                    </Text>
                </View>

                <View>
                    <Text>Hello</Text>
                </View>

                <TouchableOpacity onPress={handleSendFeedback} style={style.btn}>
                    <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>Send Feedback</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}



const style = StyleSheet.create({
    btn: {
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        backgroundColor: COLORS.primary,
        marginHorizontal: 20,
        borderRadius: 10,
        bottom: 0,
        marginTop: 20
    },

    priceTag: {
        height: 40,
        alignItems: 'center',
        marginLeft: 40,
        paddingLeft: 20,
        flex: 1,
        backgroundColor: COLORS.secondary,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        flexDirection: 'row',
    },
    iconContainer: {
        position: 'absolute',
        height: 60,
        width: 60,
        backgroundColor: COLORS.secondary,
        top: -30,
        right: 20,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerImage: {
        height: 400,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        overflow: 'hidden',
    },
    header: {
        marginTop: 60,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        justifyContent: 'space-between',
    },
    roomTypesContainer: {
        marginTop: 15,
        padding: 5,
        borderWidth: 1,             // Add border width
        borderColor: COLORS.primary, // Add border color
        borderRadius: 10,
        textAlign: 'center',
        shadowOffset: { width: 0, height: 2 },
    },
    viewRoomTypesText: {
        fontSize: 16,
        marginLeft: 5,
        color: COLORS.primary,
        fontWeight: 'bold',
    },
});