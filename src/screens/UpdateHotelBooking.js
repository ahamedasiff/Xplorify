import React, { useState, useEffect } from 'react';
import { Alert, View, Text, TextInput, StyleSheet, StatusBar, TouchableOpacity, Pressable, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import COLORS from '../consts/colors';
import rooms from '../consts/rooms';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const UpdateHotelBooking = ({ route, navigation }) => {
  const booking = route.params.booking;
  const key = booking._id;

  const [checkInDate, setCheckInDate] = useState(new Date(booking.checkInDate));
  const [checkOutDate, setCheckOutDate] = useState(new Date(booking.checkOutDate));
  const [name, setName] = useState(booking.name);
  const [email, setEmail] = useState(booking.email);
  const [contactNo, setContactNo] = useState(booking.contactNo);
  const [selectedSuite, setSelectedSuite] = useState(booking.selectedSuite);
  const [noOfPersons, setNoOfPersons] = useState(booking.noOfPersons);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showPicker, setShowPicker] = useState(null);

  const showCheckInPicker = () => {
    setShowPicker('checkIn');
  };

  const showCheckOutPicker = () => {
    setShowPicker('checkOut');
  };

  const isEmailFormatValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (checkOutDate <= checkInDate) {
      setErrorMessage('Checkout date must be after check-in date');
    } else {
      setErrorMessage(''); // Clear any previous error message
    }
  }, [checkInDate, checkOutDate]);

  useEffect(() => {
    if (checkInDate) {
      const nextDay = new Date(checkInDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOutDate(nextDay);
    }
  }, [checkInDate]);

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsEmailValid(isEmailFormatValid(text));
  };

  const handleContactNoChange = (text) => {
    setContactNo(text);
  };

  const handleSuiteTypeChange = (suiteType) => {
    setSelectedSuite(suiteType);
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

  const updateData = async (id) => {
    const updatedBookingData = {
        hotelName: booking.hotelName,
        name,
        email,
        contactNo,
        selectedSuite,
        noOfPersons:parseInt(noOfPersons, 10),
        checkInDate:checkInDate,
        checkOutDate: checkOutDate,
      };

    await axios.put(`http://172.28.19.152:3000/hotel/${id}`, updatedBookingData)
    .then(() => {       
        Alert.alert("Package Details Updated Successfully")    
        console.log("Package Details Updated")
        
    })
    .catch((err) => {
        // Alert.alert("Error occurred while updating the details")
        console.error('Error:Error occurred while updating the details', err);
    })
  }

  const handleUpdate = async (id) => {
    if (checkOutDate <= checkInDate) {
      setErrorMessage('Checkout date must be after check-in date');
      return;
    }

    if(errorMessage === ''){
        updateData(key);
        navigation.navigate("HotelHome");
      }

    
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
        <View style={styles.headingContainer}>
          <Icon name="arrow-back-ios" size={28} color={COLORS.dark} onPress={navigation.goBack} />
          <Text style={styles.heading}>Update Booking</Text>
        </View>
        <Text style={styles.hotelDetails}>Hotel Name: {booking.hotelName}</Text>

        <Text style={styles.label}>Enter Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Full Name"
          value={name}
          onChangeText={handleNameChange}
        />

        <Text style={styles.label}>Enter Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          value={email}
          onChangeText={handleEmailChange}
        />

        <Text style={styles.label}>Enter Contact-No</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="+xx xx xxxx xxxxx"
          value={contactNo.toString()}
          onChangeText={handleContactNoChange}
        />

        <Text style={styles.label}>Select Suite Type</Text>
        <Picker
          selectedValue={selectedSuite}
          onValueChange={handleSuiteTypeChange}
        >
          {rooms.map((room) => (
            <Picker.Item key={room.id} label={room.suiteType} value={room.suiteType} />
          ))}
        </Picker>

        <Text style={styles.label}>Number of Persons</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Number of Persons"
          keyboardType="numeric"
          value={noOfPersons.toString()}
          onChangeText={(text) => setNoOfPersons(parseInt(text, 10))}
        />

        <View>
          <Text style={styles.label}>Check-in Date</Text>
          {showPicker === 'checkIn' && (
            <DateTimePicker
              mode="date"
              value={checkInDate}
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
          <Pressable onPress={showCheckInPicker}>
            <TextInput
              style={styles.input}
              placeholder="Select Check-in Date"
              value={checkInDate.toDateString()}
              editable={false}
            />
          </Pressable>
        </View>

        <View>
          <Text style={styles.label}>Check-out Date</Text>
          {showPicker === 'checkOut' && (
            <DateTimePicker
              mode="date"
              value={checkOutDate}
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
          <Pressable onPress={showCheckOutPicker}>
            <TextInput
              style={styles.input}
              placeholder="Select Check-out Date"
              value={checkOutDate.toDateString()}
              editable={false}
            />
          </Pressable>
        </View>

        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

        <TouchableOpacity onPress={handleUpdate} style={styles.btn}>
          <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>Update Booking</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
        padding: 20,
        backgroundColor: '#fff',
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

export default UpdateHotelBooking;

