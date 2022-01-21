
import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, FlatList, SafeAreaView, TextInput } from 'react-native';

import realm, { getAllContacts, addContact, deleteAllContact, deleteContact  } from './realm';

function App() {
  const [contacts, setContacts] = useState(getAllContacts);
  const [data, setData] = useState({ name: '', phoneNumber: '' });
  const [counter, setCounter] = useState(contacts.length + 1);
  const renderItem = ({ item }) => (
    <View style={styles.itemViewStyle}>
      <Text>{item.recordID}</Text>
      <Text>{item.name}</Text>
      <Text>{item.phoneNumber}</Text>
      <Button 
        title="Delete"
        onPress={() => {
          deleteContact(item.recordID);
          setContacts(getAllContacts);
          setCounter(contacts.length + 1);
        }}
        />
    </View>
  );
  return (
    <SafeAreaView style={{ padding: 3 }}>
      <TextInput
        style={styles.input}
        onChangeText={(e) => setData({ ...data, name: e })}
        value={data.name}
      />
      <TextInput
        style={styles.input}
        onChangeText={(e) => setData({ ...data, phoneNumber: e })}
        value={data.phoneNumber}
      />
      <View style={styles.button}>
        <Button
          title="Add"
          onPress={(() => {
            addContact(counter,data.name, data.phoneNumber);
            setData({ name: '', phoneNumber: '' })
            setContacts(getAllContacts);
            setCounter(counter + 1);
          })}
        />
      </View>
      {/* <View style={styles.button}>
        <Button 
        title="Delete"
        onPress={() => {
          deleteAllContact();
          setContacts(getAllContacts);
          setCounter(1);
        }}
        />
      </View> */}
      <View>
        <Text style={styles.textHeader}>Contacts</Text>
        <FlatList
          data={contacts}
          keyExtractor={item => item.recordID}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    margin: 3,
    width: 250
  },
  textHeader: {
    marginTop: 3,
    fontSize: 25,
    fontWeight: 'bold',
alignSelf: 'center'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  itemViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  }
});

export default App;
