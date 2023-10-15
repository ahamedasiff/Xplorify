import React from 'react'
import { View, Text, StyleSheet } from "react-native";
import COLORS from '../../consts/colors';

export default function BlogAbout({ info }) {
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>About the job:</Text>
      <View style={styles.pointsContainer}>
        <View style={styles.pointDot}>
          <Text style={styles.contextText}>{info.blogTitle}</Text>
        </View>
        <View style={styles.pointDot}>
          <Text style={styles.contextText}>{info.blogCity}</Text>
        </View>
        <View style={styles.pointDot}>
          <Text style={styles.contextText}>{info.blogCountry}</Text>
        </View>
        <View style={styles.pointDot}>
          <Text style={styles.contextText}>{info.blogRating}</Text>
        </View>
        <View style={styles.pointDot}>
          <Text style={styles.contextText}>{info.numDays}</Text>
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
  pointsContainer: {
    marginVertical: 10,
  },
  headText: {
    fontSize: 20,
    color: COLORS.primary,
    //   fontFamily: FONT.bold,
  },
  contentBox: {
    marginVertical: 10,
  },
  contextText: {
    fontSize: 16 - 2,
    color: COLORS.grey,
    //   fontFamily: FONT.regular,
    marginVertical: 10 / 1.25,
  },
});


