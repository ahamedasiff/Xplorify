import React, { useState, useCallback } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import COLORS from '../consts/colors';
import Blog from '../components/blogComponents/Blog';
import BlogTabs from '../components/blogComponents/BlogTabs';
import Specifics from '../components/blogComponents/Specifics';
import BlogAbout from '../components/blogComponents/BlogAbout';                                        
import BlogWeb from '../components/blogComponents/BlogWeb';
import SpecificsDetails from '../components/blogComponents/SpecificsDetails';




const tabs = ["About", "Blogger", "Details"];

export default function BlogPopular({ navigation, route }) {

  const data = route.params;
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch()
    setRefreshing(false)
  }, []);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Blogger":
        return (
          <Specifics
            title='Blogger'
            data={data ?? "No data provided"}
          // points={data.price ?? "No data provided"}
          />
        );

      case "About":
        return (
          <BlogAbout
            info={data ?? "No data provided"}
          />
        );

      case "Details":
        return (
          <SpecificsDetails
            title='Details'
            data={data}
          />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <>
        <ScrollView showsVerticalScrollIndicator={false}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {isLoading ? (
            <ActivityIndicator size='large' color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data available</Text>
          ) : (
            <View style={{ padding: 16, paddingBottom: 100 }}>
              <Blog
                blog={data}
              />

              <BlogTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {displayTabContent()}
            </View>
          )}

          <BlogWeb 
            url={'https://visitslk-online.com/?gclid=CjwKCAjw-KipBhBtEiwAWjgwrBqU7aHEEIwq_BNo2l3bSyg8MRMLe44qyeHOo9KR_e4TgUWVdz92fBoC5usQAvD_BwE'} 
            data={data}
            />
        </ScrollView>

      </>

    </SafeAreaView>

  )
}
