import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { shareAsync } from 'expo-sharing';
import * as Print from 'expo-print';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/AntDesign';
// import Button from 'react-native-element'

const Booking = ({ navigation, route }) => {

  const [contact, setContact] = useState();
  const [note, setNote] = useState();
  const [total, setTotal] = useState(1);
  const food = route.params.food;
  const [isModalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [contactError, setContactError] = useState();
  const [noteError, setNoteError] = useState();

  // validation for phone number
  const validateContact = () => {
    if (!contact) {
      setContactError('Contact number is required');
    } else if (!/^\d{10}$/.test(contact)) {
      setContactError('Invalid contact number');
    } else {
      setContactError('');
    }
  };

  // validation for order note
  const validateNote = () => {
    if (!note) {
      setNoteError('Note is required');
    } else if (note.length > 250) {
      setNoteError('Note should be 250 characters or less');
    } else {
      setNoteError('');
    }
  };

  const handleOrderNow = () => {
    validateContact();
    validateNote();
    console.log('contactError:', {contactError});
    console.log('noteError:', {noteError});
    // if (!contactError && !noteError) {
    //   setModalVisible(true); // Only set isModalVisible to true when there are no validation errors
    // }
    if (contactError === '' && noteError === '') {
      setModalVisible(true);
    }
  };


  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      // iOS only
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };
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
    <img  src="${food.image}" alt="A beautiful landscape" width="400" height="300" />

    <table>
      <tr>
        <th>Food Name</th>
        <th>Quantity</th>
        <th>Per Price</th>
        <th>Total Price</th>
        <th>Contact Number</th>
        <th>Special Note</th>
      </tr>
      <tr>
        <td>${food.name}</td>
        <td>${quantity}</td>
        <td>${food.price}</td>
        <td>${total}</td>
        <td>${contact}</td>
        <td>${note}</td>
      </tr>
      
      <!-- Add more rows here for additional items <span style="color:red;">ID : 012231</span> -->
    </table>
   
   
  </body>
</html>`;




  const handleClose = () => {
    navigation.navigate('FoodHome');
    setModalVisible(false);
  };
  const increase = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  };

  const decrease = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
    }
  };


  useEffect(() => {
    if (food.price && quantity) {
      const newTotal = parseFloat(food.price) * parseInt(quantity); // Convert to numbers
      setTotal(newTotal);
    }
    // else { setTotal(food.price) }
  }, [food.price, quantity]);


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Order Details</Text>
      <ScrollView>
        <View style={{ marginVertical: 20 }} >
          <Image source={food.image} style={styles.topFoodCardImage} />
        </View>
        <Text style={styles.foodDetails}>Food Name: {food.name}</Text>
        <Text style={styles.foodDetails}>Price: {total}</Text>
        {/* <TextInput
          style={[styles.input,]}
          placeholder= {total.toString()}
          editable={false}
        /> */}
        <TextInput
          style={[styles.input,{textAlignVertical: 'center'}]}
          placeholder=" Enter Contact Number"
          value={contact}
          onChangeText={(value) => setContact(value)}
          keyboardType={'phone-pad'}
          onBlur={validateContact}
        />
        {contactError ? <Text style={styles.errorText}>{contactError}</Text> : null}
        <TextInput
          style={[styles.input,{textAlignVertical: 'top', paddingTop:5}]}
          placeholder=" Add an order note"
          value={note}
          autoCapitalize="sentences"
          autoCorrect={false}
          multiline={true}
          numberOfLines={4}
          maxLength={250}
          onChangeText={(value) => setNote(value)}
          keyboardType={'default'} 
        />
        {noteError ? <Text style={styles.errorText}>{noteError}</Text> : null}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }} >
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Quantity</Text>
          <View style={styles.quantity} >
            <Icon name="pluscircle" size={30} color="black" onPress={increase} style={{ paddingRight: 20 }} />
            <Text style={{ paddingLeft: 10, paddingRight: 10, fontSize: 20 }} >{quantity}</Text>
            <Icon name="minuscircle" size={30} color="black" onPress={decrease} style={{ paddingLeft: 20 }} />
          </View>
        </View>
        <Button title="Order Now" onPress={()=>handleOrderNow()} />
      </ScrollView>

      
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
            <Icon name="checkcircle" color='green' size={28} />
            <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', paddingLeft: 10, paddingTop: 5 }}>Successfull</Text>
          </View>
          {/* <Text style={styles.modalText}>Total Amount:{total}</Text>
          <Text style={styles.modalText}>Food Name: {food.name}</Text>
          <Text style={styles.modalText}>Quantity: {quantity}</Text> */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
            <Button title='close' onPress={handleClose} color={'red'} />
            <Button title='print' onPress={print} color={'black'} />
            <Button title='share' onPress={printToFile} />
          </View>

        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop10: 10,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
    borderRadius:10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
    paddingLeft:8,
    backgroundColor:'#f5f5f5',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  foodDetails: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  topFoodCardImage: {
    height: 200,
    width: '100%',
    borderRadius: 10,
  },
  quantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom:40,
    // marginTop:10,
    alignItems: 'center',

  },
});

export default Booking;
