import React from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity, // Import TouchableOpacity
  StatusBar
} from 'react-native';

import COLORS from '../consts/colors';
import rooms from '../consts/rooms'; // Import the rooms array
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('screen');

const Rooms = ({ navigation }) => {
  // Create a RoomCard component to display individual room details
  const RoomCard = ({ room }) => (
    <View style={style.card}>
      <Image source={room.image} style={style.cardImage} />
      <View style={style.cardDetails}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{room.suiteType}</Text>
        <Text style={{ color: COLORS.dark, fontSize: 15 }}>{room.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white}}>
        <StatusBar // Add StatusBar component
        barStyle="dark-content" // You can customize the status bar style here
        backgroundColor="transparent" // Set the background color
        translucent={false}
        />
      <View style={style.header}>
        <TouchableOpacity // Wrap the icon with TouchableOpacity to enable navigation
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
          data={rooms} // Use the imported rooms array as the data source
          numColumns={1}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <RoomCard room={item} />} // Pass the room object to the RoomCard component
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


// import React from 'react';
// import {
//   Dimensions,
//   FlatList,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   Image,
// } from 'react-native';

// import COLORS from '../consts/colors';
// import rooms from '../consts/rooms'; // Import the rooms array
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const { width } = Dimensions.get('screen');

// const Rooms = ({navigation}) => {
//   // Create a RoomCard component to display individual room details
//   const RoomCard = ({ room }) => (
//     <View style={style.card}>
//       <Image source={room.image} style={style.cardImage} />
//       <View style={style.cardDetails}>
//         <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{room.Name}</Text>
//         <Text style={{ color: COLORS.dark, fontSize: 15 }}>{room.description}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
//       <View style={style.header}>
//         <View>
//             <View style={style.header}>
//             <Icon
//                 name="arrow-back-ios"
//                 size={28}
//                 color={COLORS.dark}
//                 onPress={navigation.goBack}
//             />
//             </View>
//           <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Rooms</Text>
//         </View>
//       </View>
//       <View style={style.cardContainer}>
//         <FlatList
//           data={rooms} // Use the imported rooms array as the data source
//           numColumns={1}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => <RoomCard room={item} />} // Pass the room object to the RoomCard component
//           contentContainerStyle={style.flatListContainer}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const style = StyleSheet.create({
//   header: {
//     marginTop: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingBottom: 15
//   },
//   cardContainer: {
//     flex: 1,
//     paddingVertical: 30,
//     paddingHorizontal: 20,
//   },
//   card: {
//     elevation: 5,
//     margin: 10,
//     borderRadius: 15,
//     backgroundColor: COLORS.white,
//   },
//   cardImage: {
//     height: 200,
//     width: '100%',
//     borderTopLeftRadius: 15,
//     borderTopRightRadius: 15,
//   },
//   cardDetails: {
//     padding: 20,
//   },
// });

// export default Rooms;
