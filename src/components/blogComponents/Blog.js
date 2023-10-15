import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
// import { checkImageURL } from "../utils";
import COLORS from '../../consts/colors';
import blogs from '../../consts/blogConstants/blog';



export default function Blog({ blog }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          // source={blogs[1].image}
          source={{
            uri: blog.image == ''
              ? blog.image
              : "https://static.saltinourhair.com/wp-content/uploads/2016/11/23155637/Things-to-do-Ella-Sri-Lanka-Nine-arch-bridge-view-2.jpg"
          }}
          style={styles.logoImage}
        />
      </View>
      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{blog.blogTitle}</Text>
      </View>

      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>{blog.blogCity} / </Text>
        <View style={styles.locationBox}>
          {/* <Image
            source={icons.location}
            resizeMode='contain'
            style={styles.locationImage}
          /> */}
          <Text style={styles.locationName}>{blog.blogRating} rating</Text>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    // marginVertical: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  logoBox: {
    width: '100%',
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
  },
  logoImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  jobTitleBox: {
    marginTop: 16,
  },
  jobTitle: {
    fontSize: 20,
    color: COLORS.tertiary,
    // fontFamily: FONT.bold,
    textAlign: "center",
  },
  companyInfoBox: {
    marginTop: 16 / 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  companyName: {
    fontSize: 16 - 2,
    color: COLORS.tertiary,
    // fontFamily: FONT.medium,
  },
  locationBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  locationImage: {
    width: 14,
    height: 14,
    tintColor: COLORS.grey,
  },
  locationName: {
    fontSize: 16 - 2,
    color: COLORS.grey,
    // fontFamily: FONT.regular,
    marginLeft: 2,
  },
})
