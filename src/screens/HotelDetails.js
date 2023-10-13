import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { height } = Dimensions.get('screen');

const Detail = ({navigation, route}) => {
  const item = route.params;

  const handleBookNow = () => {
    navigation.navigate('HotelBooking', {hotel: item})
  }

  const handleRoomType = () => {
    navigation.navigate("Rooms", {hotel: item})
  }

  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: COLORS.white,
        paddingBottom: 20,
      }}> 
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />
      <ImageBackground style={style.headerImage} source={item.image}>
        <View style={style.header}>
        <Icon
            name="arrow-back-ios"
            size={28}
            color={COLORS.white}
            onPress={navigation.goBack}
          />
        </View>
      </ImageBackground>
      <View>
        <View style={{marginTop:20, paddingHorizontal: 20}}>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>{item.name}</Text>
          <Text style={{fontSize: 18, fontWeight: '400', color: COLORS.grey, marginTop: 5}}>{item.location}</Text>
          {/* <View style={{marginTop: 10, flexDirection:"row", justifyContent:"space-between"}}>
            <View style={{flexDirection:'row'}}>
              <View style={{flexDirection:"row"}}>
              <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.grey} />
              </View>
              <Text style={{fontWeight: 'bold', fontSize:18, marginLeft: 5}}>4.0</Text>
            </View>
            <Text style={{fontSize: 13, color: COLORS.grey}}>365 reviews</Text>
          </View> */}
          <View style={style.roomTypesContainer}>
            <TouchableOpacity
              onPress={handleRoomType}
              style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={style.viewRoomTypesText}>View Room Types</Text>
              <Icon
                name="arrow-forward-ios"
                size={28}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 20}}>
          <Text style={{lineHeight: 20, color: COLORS.grey, fontSize: 16}}>
              {item.details}
            </Text>
          </View>
        </View>
        <View style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            alignItems: 'center',
            marginBottom: 20
          }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Price Starts From
          </Text>
          <View style={style.priceTag}>
          <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: COLORS.grey,
                marginLeft: 5,
              }}>
              ${item.standardSuite}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: COLORS.grey,
                marginLeft: 5,
              }}>
              - Per Room
            </Text>
          </View>
          </View>
          <TouchableOpacity onPress={handleBookNow} style={style.btn}>
          <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>Book Now</Text>
          </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

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
    marginTop: 'auto'
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

export default Detail;