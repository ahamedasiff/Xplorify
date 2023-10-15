import React from 'react'
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActiveBlogger from '../components/blogComponents/ActiveBlogger'; 

export default function BlogExplore({navigation}) {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={style.header}>
          <View style={{ paddingBottom: 15 }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Explore Place</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 30, fontWeight: 'bold' }}>to blog in</Text>
              <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'red' }}> Sri Lanka</Text>
            </View>
          </View>
          <Icon name='person-outline' size={38} color={'gray'} />
        </View>
        <ActiveBlogger />

      </ScrollView>
    </SafeAreaView>

  )
}

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
})
