import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

const Booking = ({ navigation, route }) => {

  const food = route.params.food;

  const [name, setName] = useState(food.name);
  const [price, setPrice] = useState(food.price);
  const [contact, setContact] = useState();
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(1);
  const [note, setNote] = useState();

  const [contactError, setContactError] = useState();
  const [noteError, setNoteError] = useState();


  const sendData = async () => {
    const newOrder = {
      name,
      contact,
      quantity,
      total,
      note
    }

    await axios.post("http://172.28.19.152:3000/restaurant", newOrder)
      .then((response) => {
        console.log('Server Response orderd Successfully:', response.data);
        alert("orderd Successfully");
        setName(name);
        setContact('');
        setQuantity(0);
        setTotal(price);
        setNote('');
      })
      .catch((error) => {
        alert("Oreder Error")
        console.error('Oreder Error:', error);
      });
  }


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
    console.log('contactError:', { contactError });
    console.log('noteError:', { noteError });
    // if (!contactError && !noteError) {
    //   setModalVisible(true); // Only set isModalVisible to true when there are no validation errors
    // }
    if (contactError === '' && noteError === '') {
      sendData();
      // setModalVisible(true);
      navigation.navigate('FoodHome')
    }


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
        <Text style={styles.foodDetails}>Food Name: {name}</Text>
        <Text style={styles.foodDetails}>Price: {total}</Text>
       
        <TextInput
          style={[styles.input, { textAlignVertical: 'center' }]}
          placeholder=" Enter Contact Number"
          value={contact}
          onChangeText={(value) => setContact(value)}
          keyboardType={'phone-pad'}
          onBlur={validateContact}
        />
        {contactError ? <Text style={styles.errorText}>{contactError}</Text> : null}
        <TextInput
          style={[styles.input, { textAlignVertical: 'top', paddingTop: 5 }]}
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
        <TouchableOpacity onPress={() => {handleOrderNow();}} style={styles.btn}>
          <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>Order Now</Text>
        </TouchableOpacity>
      </ScrollView>
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
  btn: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
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
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
    paddingLeft: 8,
    backgroundColor: '#f5f5f5',
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
