import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, StyleSheet, Modal, StatusBar, Pressable, TouchableOpacity, SafeAreaView } from 'react-native';
import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
// Import DateTimePicker instead of DateTimePickerAndroid
import axios from 'axios';

import { shareAsync } from 'expo-sharing';
import { printToFileAsync } from 'expo-print';
import { Picker } from '@react-native-picker/picker';


export default function BlogAddScreen({ route, navigation }) {

  const blog = route.params.blog;

  const [blogTitle, setBlogTitle] = useState('');
  const [bloggerName, setBloggerName] = useState('');
  const [bloggerEmail, setBloggerEmail] = useState('');
  const [bloggerContact, setBloggerContact] = useState('');
  // const [numPersons, setNumPersons] = useState(1); // Initialize with 1 person
  const [numDays, setNumDays] = useState(1); // Initialize with 1 person
  const [blogCity, setBlogCity] = useState('');
  const [blogCountry, setBlogCountry] = useState('');
  const [blogRating, setBlogRating] = useState('');
  const [blogDetails, setBlogDetails] = useState('');
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
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

  const print = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false
    });

    await shareAsync(file.uri)
  };

  // Create a PDF
  const html = `
  <html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  <style>
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
</head>
<body style="text-align: center;">
  <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
  Xplorify : Added Blog Details</br> 
  </h1>
  <table>
    <tr>
      <th>Blog Title</th>
      <th>Number Of Days</th>
      <th>Blog Place</th>
      <th>Blog Country</th>
      <th>checkInDate</th>
      <th>checkOutDate</th>
    </tr>
    <tr>
      <td>${blogTitle}</td>
      <td>${numDays}</td>
      <td>${blogCity}</td>
      <td>${blogCountry}</td>
      <td>${checkInDate}</td>
      <td>${checkOutDate}</td>
    </tr>
    
    <!-- Add more rows here for additional items <span style="color:red;">ID : 012231</span> -->
  </table>
 
 
</body>
</html>`;


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

  const handleBooking = () => {
    // if (checkOutDate <= checkInDate) {
    //   setErrorMessage('Checkout date must be after check-in date');
    //   return;
    // }

    if (!blogTitle || !bloggerEmail || !bloggerContact) {
      alert('Please fill in all required details.');
      return;
    }

    const isEmailValid = isEmailFormatValid(bloggerEmail);

    // if (!isNameValid || !isEmailValid || !isContactNoValid) {
    //   setErrorMessage('Please provide valid information.');
    //   return;
    // }

    if (errorMessage === '') {
      sendData();
      setSuccessMessage('Blogging successfully updated!');
      setIsModalVisible(true);
    }

  };

  const sendData = async () => {

    const newBookingDetails = {
      // hotelName: hotel.name,
      blogTitle,
      bloggerName,
      bloggerEmail,
      bloggerContact,
      numDays: numDays.toString(),
      blogCity,
      blogCountry,
      blogRating,
      blogDetails,
      checkInDate: checkInDate.toDateString(),
      checkOutDate: checkOutDate.toDateString(),
    };

    // setBookingDetails(newBookingDetails);

    if (true) {
      await axios.post("http://172.28.19.239:3000/blog", newBookingDetails)
        .then((response) => {
          console.log('Server Response orderd Successfully:', response.data);
          alert("Blogging Updated");
          // setBlogTitle('');
          // setBloggerName('');
          // setBloggerEmail('');
          // setBloggerContact('');
          // setNumDays('');
          // setBlogCity('');
          // setBlogCountry('');
          // setBlogDetails('');
          // setCheckInDate(new Date());
          // setCheckOutDate(new Date());

        })
        .catch((error) => {
          alert("Update Error")
          console.error('Update Error:', error);
        });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ paddingBottom: 15 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Add Your Own Experince</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>As a </Text>
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
          value={bloggerContact}
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

        {/* <Text style={styles.label}>Enter Blogged Place</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Blogged Place"
          value={blogCity}
          onChangeText={handleBlogCityChange}
        /> */}

        {/* <Text style={styles.label}>Enter Blogged Country</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Blogged Country"
          value={blogCountry}
          onChangeText={handleBlogCountryChange}
        /> */}

        {/* <Text style={styles.label}>Enter Blog Rating</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Blogged Rating"
          value={blogRating}
          onChangeText={handleBlogRatingChange}
        /> */}

        {/* <Text style={styles.label}>Enter Blog Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Blogged Details"
          value={blogDetails}
          onChangeText={handleBlogDetailsChange}
        /> */}


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

        <TouchableOpacity onPress={handleBooking} style={styles.btn}>
          <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>Add Blog</Text>
        </TouchableOpacity>

        {errorMessage === '' && isModalVisible && (
          <Modal animationType="slide" visible={isModalVisible}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>{successMessage}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("WelcomeScreen")} style={styles.button}>
                  <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={print} style={styles.button}>
                  <Text style={styles.buttonText}>Print</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => navigation.navigate("HotelBookingList")} style={styles.button}>
                  <Text style={styles.buttonText}>Manage</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </Modal>
        )}

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