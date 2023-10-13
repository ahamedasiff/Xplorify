import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

function HotelBookingList({ navigation }) {
  const [hotelBookings, setHotelBookings] = useState([]);

  useEffect(() => {
    fetchHotelBookings();
  }, []);

  const fetchHotelBookings = () => {
    axios.get('http://your-api-url/hotel')
      .then(response => {
        setHotelBookings(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const deleteBooking = (id) => {
    // Make an HTTP DELETE request to delete the booking by ID
    axios.delete(`http://10.0.2.2:3000/hotel/${id}`)
      .then(response => {
        // Handle success, such as updating the local state or re-fetching data
        console.log('Booking deleted successfully');
        fetchHotelBookings();
      })
      .catch(error => {
        // Handle the error, such as displaying an error message
        console.error('Error deleting booking:', error);
      });
  };

  const printBooking = async (booking) => {
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
            Xplorify : Food Pre Order Details</br> 
          </h1>
          <table>
            <tr>
              <th>Food Name</th>
              <th>Name</th>
              <th>Email</th>
              <th>Total Price</th>
              <th>contactNo</th>
              <th>numberOfPersons</th>
              <th>checkInDate</th>
              <th>checkOutDate</th>
            </tr>
            <tr>
              <td>${booking.hotelName}</td>
              <td>${booking.name}</td>
              <td>${booking.email}</td>
              <td>${booking.contactNo}</td>
              <td>${booking.selectedSuite}</td>
              <td>${booking.noOfPersons}</td>
              <td>${booking.checkInDate}</td>
              <td>${booking.checkOutDate}</td>
            </tr>
          </table>
        </body>
      </html>`;

    try {
      const file = await printToFileAsync({
        html: html,
        base64: false,
      });

      const shareOptions = {
        mimeType: 'application/pdf',
        dialogTitle: 'Share Booking Details',
        UTI: 'com.adobe.pdf',
        url: file.uri,
      };

      const shared = await shareAsync(shareOptions);
      if (shared) {
        console.log('Booking details shared successfully');
      } else {
        console.log('Sharing canceled or failed');
      }
    } catch (error) {
      console.error('Error generating or sharing PDF:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {hotelBookings.map(booking => (
        <View key={booking._id} style={styles.card}>
          <Text style={styles.cardText}>Hotel Name: {booking.hotelName}</Text>
          <Text style={styles.cardText}>Name: {booking.name}</Text>
          <Text style={styles.cardText}>Email: {booking.email}</Text>
          <Text style={styles.cardText}>Contact No: {booking.contactNo}</Text>
          <Text style={styles.cardText}>Suite Type: {booking.selectedSuite}</Text>
          <Text style={styles.cardText}>Check-In Date: {booking.checkInDate}</Text>
          <Text style={styles.cardText}>Check-Out Date: {booking.checkOutDate}</Text>

          <View style={styles.cardButtons}>
            <TouchableOpacity onPress={() => navigation.navigate('UpdateScreen', { booking })}>
              <Text style={styles.button}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteBooking(booking._id)}>
              <Text style={styles.button}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => printBooking(booking)}>
              <Text style={styles.button}>Print</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: 5,
  },
});

export default HotelBookingList;


