import React from 'react'
import { TouchableOpacity, FlatList, Text, View, StyleSheet } from "react-native";
import COLORS from '../../consts/colors';

function BlogButton({ name, activeTab, onHandleSearchType }) {
    return (
      <TouchableOpacity
        style={styles.btn(name, activeTab)}
        onPress={onHandleSearchType}
      >
        <Text style={styles.btnText(name, activeTab)}>{name}</Text>
      </TouchableOpacity>
    );
  }

export default function BlogTabs({ tabs, activeTab, setActiveTab }) {
    return (
        <View style={styles.container}>
            <FlatList
                data={tabs}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <BlogButton
                        name={item}
                        activeTab={activeTab}
                        onHandleSearchType={() => setActiveTab(item)}
                    />
                )}
                contentContainerStyle={{ columnGap: 10 / 2 }}
                keyExtractor={(item) => item}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 0.5,
      marginTop: 10,
      marginBottom: 10 / 2,
    },
    btn: (name, activeTab) => ({
      paddingVertical: 16,
      paddingHorizontal: 26,
      backgroundColor: name === activeTab ? COLORS.tertiary : "#F3F4F8",
      borderRadius: 16,
      marginLeft: 2,
    //   ...SHADOWS.medium,
      shadowColor: COLORS.white,
    }),
    btnText: (name, activeTab) => ({
    //   fontFamily: "DMMedium",
      fontSize: 10,
      color: name === activeTab ? "#C3BFCC" : "#AAA9B8",
    }),
  });
  