import React from 'react'
import { View, Text, StyleSheet } from "react-native";
import COLORS from '../../consts/colors';


export default function SpecificsDetails({ title, data}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}:</Text>

      <View style={styles.pointsContainer}>
          <View style={styles.pointWrapper}>
            <View style={styles.pointDot} />
            <Text style={styles.pointText}>{data.blogDetails}</Text>
          </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      height: 360,
      marginTop: 20,
      backgroundColor: "#FFF",
      borderRadius: 16,
      padding: 16,
    },
    title: {
      fontSize: 20,
      color: COLORS.primary,
    //   fontFamily: FONT.bold,
    },
    pointsContainer: {
      marginVertical: 10,
    },
    pointWrapper: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      marginVertical: 10 / 1.25,
    },
    pointDot: {
      width: 6,
      height: 6,
      borderRadius: 6,
      backgroundColor: COLORS.grey,
      marginTop: 6,
    },
    pointText: {
      fontSize: 16 - 2,
      color: COLORS.grey,
    //   fontFamily: FONT.regular,
      marginLeft: 10,
    },
  });
