import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import searchFoods from '../consts/searchFood';

const UpdateOrder = (props) => {
  let url;
  let price;
  const item = props.route.params;
  const key = item._id
  const navigation = useNavigation();

  searchFoods.map((item1) => {
    if (item.name === item1.name) {
        url = item1.image;
        price = item1.price;
    }
});

  const [name, setName] = useState(item.name);
  const [contact, setContact] = useState(item.contact);
  const [quantity, setQuantity] = useState(item.quantity);
  const [total, setTotal] = useState(item.total);
  const [note, setNote] = useState(item.note);

  const [contactError, setContactError] = useState();
  const [noteError, setNoteError] = useState();

  useEffect(() => {
    if (price && quantity) {
      const newTotal = parseFloat(price) * parseInt(quantity); // Convert to numbers
      setTotal(newTotal);
    }
    // else { setTotal(food.price) }
  }, [price, quantity]);

  const updatedOrder = {
    name,contact, quantity, total, note
}

const updateData = async (id) => {
    await axios.put(`http://172.28.19.239:3000/restaurant/${id}`, updatedOrder)
    .then(() => {       
        Alert.alert("Package Details Updated Successfully")    
        console.log("Package Details Updated")
        // setName('');
        setContact('');
        // setQuantity('');
        // setTotal('');
        setNote('');
    })
    .catch((err) => {
        Alert.alert("Error occurred while updating the details")
        console.error('Error:Error occurred while updating the details', err);
    })
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

  const handleUpdate = () => {
    validateContact();
    validateNote();
    console.log('contactError:', { contactError });
    console.log('noteError:', { noteError });
    // if (!contactError && !noteError) {
    //   setModalVisible(true); // Only set isModalVisible to true when there are no validation errors
    // }
    if (contactError === '' && noteError === '') {
        updateData(key)
    //   sendData();
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


  


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Details</Text>
      <ScrollView>
        <View style={{ marginVertical: 20 }} >
          <Image source={url && url.uri ? { uri: url.uri } : null} style={styles.topFoodCardImage} />
        </View>
        <Text style={styles.foodDetails}>Food Name: {name}</Text>
        <Text style={styles.foodDetails}>Price: {total}</Text>
        {/* <TextInput
          style={[styles.input,]}
          placeholder= {total.toString()}
          editable={false}
        /> */}
        <TextInput
          style={[styles.input, { textAlignVertical: 'center' }]}
          placeholder=" Enter Contact Number"
          value={contact.toString()}
          onChangeText={(value) => setContact(value)}
          maxLength={10}
          keyboardType={'phone-pad'}
          onBlur={validateContact}
        />
        {contactError ? <Text style={styles.errorText}>{contactError}</Text> : null}
        <TextInput
          style={[styles.input, { textAlignVertical: 'top', paddingTop: 5 }]}
          placeholder=" Add an order note"
          value={note}
          autoCapitalize="sentences"
          autoCorrect={true}
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
        {/* <Button title="Order Now" onPress={() => handleOrderNow()} /> */}
        <TouchableOpacity onPress={() => {handleUpdate();}} style={styles.btn}>
          <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>UPDATE ORDER</Text>
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

export default UpdateOrder;
