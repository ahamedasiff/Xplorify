import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import COLORS from './src/consts/colors';
import FoodDetails from './src/screens/FoodDetails';
import BookingScreen from './src/screens/FoodBooking.js';

import FoodHome from './src/screens/FoodHome.js'
import WelcomeScreen from './src/screens/WelcomeScreen';
import HotelHome from './src/screens/HotelHome';
import DetailsScreen from './src/screens/HotelDetails';
import Rooms from './src/screens/Rooms';
import HotelBooking from './src/screens/HotelBooking';
import HotelBookingList from './src/screens/HotelBookingList';
import OrederedPage from './src/screens/OrderedPage';
import UpdateOrder from './src/screens/UpdateOrder';
import BlogHomeScreen from './src/screens/BlogHomeScreen';
import BlogPopular from './src/screens/BlogPopular';
import BlogExplore from './src/screens/BlogExplore';
import BlogFeedScreen from './src/screens/BlogFeedScreen';
import BlogFeedDetailsScreen from './src/screens/BlogFeedDetailsScreen';
import BlogFeedbackScreen from './src/screens/BlogFeedbackScreen';
import BlogAddScreen from './src/screens/BlogAddScreen';
import BlogUpdateScreen from './src/screens/BlogUpdateScreen';
// import BlogHomeScreem from './src/screens/blogScreen/BlogHomeScreem';
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
        <Stack.Screen name="FoodHome" component={FoodHome} />
        <Stack.Screen name="FoodDetails" component={FoodDetails} />
        <Stack.Screen name="BookingScreen" component={BookingScreen} />
        <Stack.Screen name='OrderedPage' component={OrederedPage} />
        <Stack.Screen name='UpdateOrder' component={UpdateOrder} />
        <Stack.Screen name="HotelHome" component={HotelHome} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="Rooms" component={Rooms} />
        <Stack.Screen name="HotelBooking" component={HotelBooking} />
        <Stack.Screen name="HotelBookingList" component={HotelBookingList} />

        {/* -------------------------- For Blog Page - Started ------------------------------*/}

        <Stack.Screen name='BlogHome' component={BlogHomeScreen} />
        <Stack.Screen name='BlogPopular' component={BlogPopular} />
        <Stack.Screen name='BlogExplore' component={BlogExplore} />
        <Stack.Screen name='BlogFeed' component={BlogFeedScreen} />
        <Stack.Screen name='BlogFeedDetails' component={BlogFeedDetailsScreen} />
        <Stack.Screen name='BlogFeedback' component={BlogFeedbackScreen} />
        <Stack.Screen name='BlogAdd' component={BlogAddScreen} />
        <Stack.Screen name='BlogUpdate' component={BlogUpdateScreen} />

        {/* -------------------------- For Blog Page - Closed ------------------------------*/}

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
//  and upon confirming the form i need you to give me the codes to generate a report which will include all the booking details and 