import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, StyleSheet, Alert, Modal, StatusBar, Pressable, TouchableOpacity, SafeAreaView } from 'react-native';
import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
// Import DateTimePicker instead of DateTimePickerAndroid
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import { shareAsync } from 'expo-sharing';
import { printToFileAsync } from 'expo-print';
import { Picker } from '@react-native-picker/picker';


export default function BlogUpdateScreen({ route }) {
  
  const navigation = useNavigation();

  const blog = route.params;
  const key = blog._id

  const [blogTitle, setBlogTitle] = useState(blog.blogTitle);
  const [bloggerName, setBloggerName] = useState(blog.bloggerName);
  const [bloggerEmail, setBloggerEmail] = useState(blog.bloggerEmail);
  const [bloggerContact, setBloggerContact] = useState(blog.bloggerContact);
  // const [numPersons, setNumPersons] = useState(1); // Initialize with 1 person
  const [numDays, setNumDays] = useState(blog.numDays); // Initialize with 1 person
  const [blogCity, setBlogCity] = useState(blog.blogCity);
  const [blogCountry, setBlogCountry] = useState(blog.blogCountry);
  const [blogRating, setBlogRating] = useState(blog.blogRating);
  const [blogDetails, setBlogDetails] = useState(blog.blogDetails);
  const [checkInDate, setCheckInDate] = useState(blog.checkInDate);
  const [checkOutDate, setCheckOutDate] = useState(blog.checkOutDate);
  const [showPicker, setShowPicker] = useState(null);

  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isContactNoValid, setIsContactNoValid] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [nameError, setNameError] = useState('');
  const [contactNoError, setContactNoError] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [contactError, setContactError] = useState();


  const handleTitleChange = (text) => {
    setBlogTitle(text);
  };

  const handleBloggerNameChange = (text) => {
    setBloggerName(text);
  };

  const handleBloggerEmailChange = (text) => {
    setBloggerEmail(text);
    setIsEmailValid(isEmailFormatValid(text));
  };

  const handleBloggerContactNoChange = (text) => {
    setBloggerContact(text);
  };

  const handleNumDaysChange = (text) => {
    // Ensure that the input is a number and not empty
    if (!isNaN(text) && text !== '') {
      setNumDays(parseInt(text, 10));
      // Recalculate the total price when the number of persons changes
      // setTotalPrice(hotel[selectedSuite] * parseInt(text, 10));
    }
  };

  const isEmailFormatValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const validateContact = (bloggerContact) => {
    if (!bloggerContact) {
      setContactError('Contact number is required');
    } else if (!/^\d{10}$/.test(bloggerContact)) {
      setContactError('Invalid contact number');
    } else {
      setContactError('hello');
    }
  };

  const handleBlogCityChange = (text) => {
    setBlogCity(text);
  }

  const handleBlogCountryChange = (text) => {
    setBlogCountry(text);
  }

  const handleBlogRatingChange = (text) => {
    setBlogRating(text);
  }

  const handleBlogDetailsChange = (text) => {
    setBlogDetails(text);
  }

  const showCheckInPicker = () => {
    setShowPicker('checkIn');
  };

  const showCheckOutPicker = () => {
    setShowPicker('checkOut');
  };


  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'set' && selectedDate) {
      if (showPicker === 'checkIn') {
        setCheckInDate(selectedDate);
      } else if (showPicker === 'checkOut') {
        setCheckOutDate(selectedDate);
      }
      setShowPicker(null);
    }
  };

  // ================================================================================================



  // ================================================================================================

        
  const updatedBlog = {
    blogTitle, 
    bloggerName, 
    bloggerEmail, 
    bloggerContact, 
    numDays, 
    blogCity, 
    blogCountry, 
    blogRating, 
    blogRating,
    blogRating,
    blogDetails,
  }


  const updateData = async (id) => {
    await axios.put(`http://172.28.19.239:3000/blog/${key}`, updatedBlog)
    .then(() => {       
        Alert.alert("Package Details Updated Successfully") 
        navigation.navigate('WelcomeScreen')
        console.log("Blog Details Updated")
    })
    .catch((err) => {
        // Alert.alert("Error occurred while updating the details")
        console.error('Error:Error occurred while updating the details', err);
    })
} 
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ paddingBottom: 15 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Update Your Experince</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>As a</Text>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'red' }}>Blog</Text>
          </View>
        </View>
        {/* <Icon name='person-outline' size={38} color={'gray'} /> */}
      </View>
      <ScrollView style={styles.formContainer}>
        <Text style={styles.label}>Enter Blog Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Blog Title"
          value={blogTitle}
          onChangeText={handleTitleChange}
        />
        {!isNameValid && (
          <Text style={styles.errorText}>{nameError}</Text>
        )}


        <Text style={styles.label}>Enter Blogger Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Blogger Name"
          value={bloggerName}
          onChangeText={handleBloggerNameChange}
        />

        <Text style={styles.label}>Enter Blogger Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          value={bloggerEmail}
          onChangeText={handleBloggerEmailChange}
        />
        {!isEmailValid && (
          <Text style={styles.errorText}>Please enter a valid email address.</Text>
        )}

        <Text style={styles.label}>Enter Contact No</Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: isContactNoValid ? 'gray' : 'red' },
          ]}
          keyboardType="numeric"
          placeholder="+xx xx xxxx xxxxx"
          value={bloggerContact.toString()}
          onChangeText={handleBloggerContactNoChange}
          onBlur={() => validateContact(bloggerContact)} // Add this onBlur event handler
        />
        {!isContactNoValid && (
          <Text style={styles.errorText}>{contactNoError}asdad</Text>
        )}


        {/* <View>
          <Text style={styles.label}>Number of days he travel</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the number of days"
            value={numDays.toString()}
            onChangeText={handleNumDaysChange}
            keyboardType="numeric" // Ensure the keyboard is numeric
          />
        </View> */}

        <Text style={styles.label}>Enter Blogged Place</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Blogged Place"
          value={blogCity}
          onChangeText={handleBlogCityChange}
        />

        <Text style={styles.label}>Enter Blogged Country</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Blogged Country"
          value={blogCountry}
          onChangeText={handleBlogCountryChange}
        />

        <Text style={styles.label}>Enter Blog Rating</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Blogged Rating"
          value={blogRating}
          onChangeText={handleBlogRatingChange}
        />

        <Text style={styles.label}>Enter Blog Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Blogged Details"
          value={blogDetails}
          onChangeText={handleBlogDetailsChange}
        />


        {/* <View>
          <Text style={styles.label}>Trip Starting Date</Text>
          {showPicker === 'checkIn' && (
            <DateTimePicker
              mode="date"
              value={checkInDate}
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}
          <Pressable onPress={showCheckInPicker}>
            <TextInput
              style={styles.input}
              placeholder="Select Starting Date"
              value={checkInDate.toDateString()}
              editable={false}
            />
          </Pressable>
        </View> */}

        {/* <View>
          <Text style={styles.label}>Trip Ending Date</Text>
          {showPicker === 'checkOut' && (
            <DateTimePicker
              mode="date"
              value={checkOutDate}
              onChange={handleDateChange}
            // minimumDate={new Date()}
            />
          )}
          <Pressable onPress={showCheckOutPicker}>
            <TextInput
              style={styles.input}
              placeholder="Select Ending Date"
              value={checkOutDate.toDateString()}
              editable={false}
            />
          </Pressable>
        </View> */}

        <TouchableOpacity onPress={updateData} style={styles.btn}>
          <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>Update Blog</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    marginTop: 15,
    marginLeft: 20,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
    bottom: 0,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    textAlign: 'center',
  },
  label: {
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.dark,
    borderRadius: 10,
    color: COLORS.dark
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  hotelDetails: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginBottom: 15,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300, // Set the width of the modal content
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 10,
    marginLeft: 10
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});