import React, { useState, useEffect} from 'react';
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
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import hotels from '../consts/hotels';
// import rooms from '../consts/rooms';

const { width } = Dimensions.get('screen');
const cardWidth = width / 2.2;

const HotelHome = ({ navigation }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHotels, setFilteredHotels] = useState(hotels);

  useEffect(() => {
    // When the search query changes, update the filtered list of hotels
    const filteredList = hotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredHotels(filteredList);
  }, [searchQuery]);

  const Card = ({ hotel}) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate('DetailsScreen', hotel)}>
      <View style={style.card}>
        <Image source={hotel.image} style={style.cardImage} />
        <View style={style.cardDetails}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{hotel.name}</Text>
          <Text style={{ color: COLORS.grey, fontSize: 16 }}>{hotel.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <View style={style.header}>
          <View style={{ paddingBottom: 15 }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Find Your Hotel</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 30, fontWeight: 'bold' }}>in </Text>
              <Text style={{ fontSize: 30, fontWeight: 'bold', color: COLORS.primary }}>
                Sri Lanka
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("HotelBookingList")}>
            <Icon name="person-outline"  size={38} color={COLORS.grey} />
          </TouchableOpacity>
        </View>
        <View style={style.searchInputContainer}>
          <Icon name="search" size={30} style={{ marginLeft: 20 }} />
          <TextInput
            placeholder="Search"
            style={{ fontSize: 20, paddingLeft: 10 }}
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
        </View>
        <View style={style.cardContainer}>
        <FlatList
          data={filteredHotels} // Use the filtered list of hotels
          numColumns={1}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Card hotel={item} />}
          contentContainerStyle={style.flatListContainer}
        />
        </View>
    </SafeAreaView>
  );
};

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

export default HotelHome;
