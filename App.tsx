import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TextInput, Button, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { db } from './firebase'; // Adjust the path if needed
import { collection, getDocs, addDoc } from 'firebase/firestore';

const App = () => {
  const [items, setItems] = useState<{ id: string; message: string }[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as { id: string; message: string }[];
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchItems();
  }, []);

  const handleAddPost = async () => {
    if (newMessage.trim() === '') {
      return; // Do not add empty messages
    }

    try {
      const docRef = await addDoc(collection(db, 'posts'), { message: newMessage });
      setItems((prevItems) => [...prevItems, { id: docRef.id, message: newMessage }]);
      setNewMessage(''); // Clear the input field
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text style={styles.item}>{item.message}</Text>
            )}
            ListEmptyComponent={<Text style={styles.empty}>No posts found.</Text>}
            contentContainerStyle={styles.listContainer}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Write a message..."
              value={newMessage}
              onChangeText={setNewMessage}
            />
            <Button title="Add" onPress={handleAddPost} />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    flexGrow: 1,
    padding: 20,
  },
  item: {
    fontSize: 18,
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default App;
