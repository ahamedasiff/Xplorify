import React from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity, 
  StatusBar
} from 'react-native';

import COLORS from '../consts/colors';
import rooms from '../consts/rooms'; 
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('screen');

const Rooms = ({ navigation }) => {
  const RoomCard = ({ room }) => (
    <View style={style.card}>
      <Image source={room.image} style={style.cardImage} />
      <View style={style.cardDetails}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{room.suiteType}</Text>
        <Text style={{ color: COLORS.dark, fontSize: 15, textAlign: 'justify' }}>{room.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white}}>
        <StatusBar 
        barStyle="dark-content" 
        backgroundColor="transparent" 
        translucent={false}
        />
      <View style={style.header}>
        <TouchableOpacity 
          style={style.headerIcon}
          onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color={COLORS.dark}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Rooms</Text>
      </View>
      <View style={style.cardContainer}>
        <FlatList
          data={rooms} 
          numColumns={1}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <RoomCard room={item} />} 
          contentContainerStyle={style.flatListContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center', // Center the items vertically
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  headerIcon: {
    marginRight: 20, // Add margin to separate the icon from the text
  },
  cardContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  card: {
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
});

export default Rooms;

