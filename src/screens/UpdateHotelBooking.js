// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, StyleSheet, StatusBar, TouchableOpacity, Pressable, Modal } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import COLORS from '../consts/colors';
// import rooms from '../consts/rooms';
// import { shareAsync } from 'expo-sharing';
// import { printToFileAsync } from 'expo-print';
// import { Picker } from '@react-native-picker/picker';
// import { ScrollView } from 'react-native-gesture-handler';
// import axios from 'axios';

// const UpdateHotelBooking = ({ route, navigation }) => {
//   const { booking } = route.params;;
//   const key = booking.id

//   const [checkInDate, setCheckInDate] = useState(new Date(booking.checkInDate));
//   const [checkOutDate, setCheckOutDate] = useState(new Date(booking.checkOutDate));
//   const [name, setName] = useState(booking.name);
//   const [email, setEmail] = useState(booking.email);
//   const [contactNo, setContactNo] = useState(booking.contactNo);
//   const [selectedSuite, setSelectedSuite] = useState(booking.selectedSuite);
//   const [noOfPersons, setNoOfPersons] = useState(booking.noOfPersons);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [hotelName, setHotelName] = useState(booking.hotelName)
//   const [contactError, setContactError] = useState();
//   const [isNameValid, setIsNameValid] = useState(true);
//   const [isEmailValid, setIsEmailValid] = useState(true);
//   const [isContactNoValid, setIsContactNoValid] = useState(true);

//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [nameError, setNameError] = useState('');
//   const [contactNoError, setContactNoError] = useState('');

//   const print = async () => {
//     const file = await printToFileAsync({
//       html: html,
//       base64: false
//     });

//     await shareAsync(file.uri)
//   };
  
//     // Create a PDF
//     const html = `
//     <html>
//   <head>
//     <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
//     <style>
//   table {
//     border-collapse: collapse;
//     width: 100%;
//   }

//   th, td {
//     border: 1px solid #dddddd;
//     text-align: left;
//     padding: 8px;
//   }

//   tr:nth-child(even) {
//     background-color: #f2f2f2;
//   }
// </style>
//   </head>
//   <body style="text-align: center;">
//     <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
//     Xplorify : Food Pre Order Details</br> 
//     </h1>
//     <table>
//       <tr>
//         <th>Food Name</th>
//         <th>Name</th>
//         <th>Email</th>
//         <th>Total Price</th>
//         <th>contactNo</th>
//         <th>noOfPersons</th>
//         <th>checkInDate</th>
//         <th>checkOutDate</th>
//       </tr>
//       <tr>
//         <td>${hotelName}</td>
//         <td>${name}</td>
//         <td>${email}</td>
//         <td>${contactNo}</td>
//         <td>${selectedSuite}</td>
//         <td>${noOfPersons}</td>
//         <td>${checkInDate}</td>
//         <td>${checkOutDate}</td>
//       </tr>
      
//       <!-- Add more rows here for additional items <span style="color:red;">ID : 012231</span> -->
//     </table>
   
   
//   </body>
// </html>`;
 
//   useEffect(() => {
//     if (checkOutDate <= checkInDate) {
//       setErrorMessage('Checkout date must be after check-in date');
//     } else {
//       setErrorMessage(''); // Clear any previous error message
//     }
//   }, [checkInDate, checkOutDate]);

//   useEffect(() => {
//     if (checkInDate) {
//       const nextDay = new Date(checkInDate);
//       nextDay.setDate(nextDay.getDate() + 1);
//       setCheckOutDate(nextDay);
//     }
//   }, [checkInDate]);


//   const showCheckInPicker = () => {
//     setShowPicker('checkIn');
//   };

//   const showCheckOutPicker = () => {
//     setShowPicker('checkOut');
//   };

//   const [showPicker, setShowPicker] = useState(null);

//   // Function to validate email format
//   const isEmailFormatValid = (email) => {
//     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//     return emailRegex.test(email);
//   };

//   const validateContact = (contactNo) => {
//     if (!contactNo) {
//       setContactError('Contact number is required');
//     } else if (!/^\d{10}$/.test(contactNo)) {
//       setContactError('Invalid contact number');
//     } else {
//       setContactError('');
//     }
//   };

//   const handleNameChange = (text) => {
//     setName(text);
//   };

//   const handleEmailChange = (text) => {
//     setEmail(text);
//     setIsEmailValid(isEmailFormatValid(text));
//   };

//   const handleContactNoChange = (text) => {
//     setContactNo(text);
//   };

//   const handleSuiteTypeChange = (suiteType) => {
//     setSelectedSuite(suiteType);
//   };

//   const handleDateChange = (event, selectedDate) => {
//     if (event.type === 'set' && selectedDate) {
//       if (showPicker === 'checkIn') {
//         setCheckInDate(selectedDate);
//       } else if (showPicker === 'checkOut') {
//         setCheckOutDate(selectedDate);
//       }
//       setShowPicker(null);
//     }
//   };

//   const getPrice = () => {
//     if (errorMessage) {
//       // If there's an error, don't display the price
//       return null;
//     }
//     let newPrice = 0; // Initialize the new price to 0

//     if (selectedSuite === 'Deluxe Suite') {
//       newPrice = hotel.deluxeSuite;
//     } else if (selectedSuite === 'Platinum Suite') {
//       newPrice = hotel.platinumSuite;
//     } else {
//       newPrice = hotel.standardSuite;
//     }

//     // Calculate the number of days between check-in and check-out dates
//     const numberOfDays = Math.ceil(
//       (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
//     );

//     // Multiply the price by the number of persons and number of days
//     newPrice *= noOfPersons * numberOfDays;

//     return newPrice;
//   };

//   const handleUpdate = () => {
//     if (checkOutDate <= checkInDate) {
//       setErrorMessage('Checkout date must be after check-in date');
//       return;
//     }
  
//     if (!name || !email || !contactNo) {
//       alert('Please fill in all required details.');
//       return;
//     }
  
//     const isEmailValid = isEmailFormatValid(email);
  
//     // if (!isNameValid || !isEmailValid || !isContactNoValid) {
//     //   setErrorMessage('Please provide valid information.');
//     //   return;
//     // }
  
//     if(errorMessage === ''){
//       updateData(key);
//       setSuccessMessage('Booking successfully updated!');
//       setIsModalVisible(true);
//     }
    
//   };

//   const updateBooking = {
//       hotelName,
//       name,
//       email,
//       contactNo,
//       selectedSuite,
//       noOfPersons,
//       checkInDate,
//       checkOutDate,
//     };

//   const updateData = async (id) => {

//       await axios.put(`http://192.168.42.52:3000/hotel/${id}`, updateBooking)
//       .then((response) => {
//         console.log('Server Response Booked Successfully:', response.data);
//         alert("Booking Successful");
//         setName('');
//         setName('');
//         setEmail('');
//         setContactNo('');
//         setSelectedSuite('Standard Suite');
//         setNoOfPersons('');
//         setCheckInDate(new Date());
//         setCheckOutDate(new Date());
      
//       })
//       .catch((error) => {
//         alert("Booking Error")
//         console.error('Booking Error:', error);
//       });
    
//   }

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
//         <View style={styles.headingContainer}>
//           <Icon name="arrow-back-ios" size={28} color={COLORS.dark} onPress={navigation.goBack} />
//           <Text style={styles.heading}>Update Booking</Text>
//         </View>
//         <Text style={styles.hotelDetails}>Hotel Name: {hotelName}</Text>
//         <View>
//           <Text style={styles.label}>Enter Name</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Your Full Name"
//             value={name}
//             onChangeText={handleNameChange}
//           />
//           {!isNameValid && (
//              <Text style={styles.errorText}>{nameError}</Text>
//           )}

//           <Text style={styles.label}>Enter Email</Text>
//           <TextInput
//             style={[
//               styles.input,
//               { borderColor: isContactNoValid ? 'gray' : 'red' },
//             ]}
//             placeholder="example@gmail.com"
//             value={email}
//             onChangeText={handleEmailChange}
//           />
//           {!isEmailValid && (
//           <Text style={styles.errorText}>Please enter a valid email address.</Text>
//           )}

//           <Text style={styles.label}>Enter Contact-No</Text>
//           <TextInput
//             style={[
//               styles.input,
//               { borderColor: isContactNoValid ? 'gray' : 'red' },
//             ]}
//             keyboardType="numeric"
//             placeholder="+xx xx xxxx xxxxx"
//             value={contactNo}
//             onChangeText={handleContactNoChange}
//             onBlur={() => validateContact(contactNo)} // Add this onBlur event handler
//             />
//           {!isContactNoValid && (
//             <Text style={styles.errorText}>{contactNoError}</Text>
//           )}

//           <View >
//             <Text style={styles.label}>Select Suite Type</Text>
//             <View style={styles.dropdownContainer}>
//               <Picker
//                 selectedValue={selectedSuite}
//                 onValueChange={handleSuiteTypeChange}
//               >
//                 {rooms.map((room) => (
//                   <Picker.Item key={room.id} label={room.suiteType} value={room.suiteType} />
//                 ))}
//               </Picker>
//             </View>
//           </View>

//           <Text style={styles.label}>Number of Persons</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Number of Persons"
//             keyboardType="numeric"
//             value={noOfPersons.toString()}
//             onChangeText={(text) => setNoOfPersons(parseInt(text, 10))}
//           />

//           <View>
//             <Text style={styles.label}>Check-in Date</Text>
//             {showPicker === 'checkIn' && (
//               <DateTimePicker
//                 mode="date"
//                 value={checkInDate}
//                 onChange={handleDateChange}
//                 minimumDate={new Date()}
//               />
//             )}
//             <Pressable onPress={showCheckInPicker}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Select Check-in Date"
//                 value={checkInDate.toDateString()}
//                 editable={false}
//               />
//             </Pressable>
//           </View>

//           <View>
//             <Text style={styles.label}>Check-out Date</Text>
//             {showPicker === 'checkOut' && (
//               <DateTimePicker
//                 mode="date"
//                 value={checkOutDate}
//                 onChange={handleDateChange}
//                 minimumDate={new Date()}
//               />
//             )}
//             <Pressable onPress={showCheckOutPicker}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Select Check-out Date"
//                 value={checkOutDate.toDateString()}
//                 editable={false}
//               />
//             </Pressable>
//           </View>

//           <TouchableOpacity onPress={handleUpdate} style={styles.btn}>
//           <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>Update</Text>
//         </TouchableOpacity>

//         </View>
//         {/* Render the modal only if there are no errors (errorMessage is empty) */}
//       {errorMessage === '' && isModalVisible && (
//         <Modal animationType="slide" visible={isModalVisible}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalText}>{successMessage}</Text>
//             <View style={styles.buttonContainer}>
//                 <TouchableOpacity onPress={() => navigation.navigate("HotelHome")} style={styles.button}>
//                   <Text style={styles.buttonText}>Home</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={print} style={styles.button}>
//                   <Text style={styles.buttonText}>Print</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => navigation.navigate("HotelBookingList")} style={styles.button}>
//                   <Text style={styles.buttonText}>Manage</Text>
//                 </TouchableOpacity>
//               </View>
//           </View>
//         </Modal>
//       )}
//       </View>
//     </ScrollView>

//   );
// };


// const styles = StyleSheet.create({
//   btn: {
//     height: 55,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//     backgroundColor: COLORS.primary,
//     marginHorizontal: 20,
//     borderRadius: 10,
//     bottom: 0,
//   },
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   headingContainer: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     textAlign: 'center',
//   },
//   label: {
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   input: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     padding: 10,
//     borderWidth: 1,
//     borderColor: COLORS.dark,
//     borderRadius: 10,
//     color: COLORS.dark
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     marginTop: 5,
//   },
//   hotelDetails: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   dropdownContainer: {
//     borderWidth: 1,
//     borderColor: 'black',
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     width: 300, // Set the width of the modal content
//     padding: 20,
//     backgroundColor: 'white',
//     borderRadius: 10,
//   },
//   modalText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: COLORS.primary,
//     marginBottom: 20,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 20,
//   },
//   button: {
//     backgroundColor: COLORS.primary,
//     padding: 10,
//     borderRadius: 10,
//     marginLeft: 10
//   },
//   buttonText: {
//     color: COLORS.white,
//     fontSize: 18,
//     fontWeight: 'bold',
//   },

// });

// export default UpdateHotelBooking;

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

  const [showPicker, setShowPicker] = useState(null);

  const showCheckInPicker = () => {
    setShowPicker('checkIn');
  };

  const showCheckOutPicker = () => {
    setShowPicker('checkOut');
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

    await axios.put(`http://192.168.42.52:3000/hotel/${id}`, updatedBookingData)
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
          value={contactNo}
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

