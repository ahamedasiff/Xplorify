import React from 'react'
import { View, Text, TouchableOpacity, Image, Linking, StyleSheet, Alert } from "react-native";
import COLORS from '../../consts/colors';
// import icon from '../constants/icons'
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


export default function BlogWeb({ url, data }) {

  const key = data._id;
  const navigation = useNavigation();

  const deleteData = async (id) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this package?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await axios.delete(`http://172.28.19.239:3000/blog/${id}`)
              .then(() => {
                // Alert.alert("Package Details Deleted Successfully");
                // getData();
                console.log("Package Details Deleted");
              })
              .catch((err) => {
                // Alert.alert("Error occurred while deleting the details");
                console.error('Error:Error occurred while deleting the details', err);
              });
          },
        },
      ]
    );
  };

  const handleDelete = () => {
    deleteData(key);
    navigation.navigate('WelcomeScreen');

  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeBtn} onPress={() => handleDelete()}>
        <Icon name='delete' size={28} color={COLORS.primary} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => Linking.openURL(url)}
      >
        <Text style={styles.applyBtnText}>Go to website</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.likeBtn} onPress={() => navigation.navigate('BlogUpdate', {...data})}>
        <Icon name='system-update' size={28} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "#FFF",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  likeBtn: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  likeBtnImage: {
    width: "40%",
    height: "40%",
    tintColor: COLORS.primary,
  },
  applyBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 16,
  },
  applyBtnText: {
    fontSize: 16,
    color: COLORS.white,
    //   fontFamily: FONT.bold,
  },
});