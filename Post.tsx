// components/Post.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Post = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Post</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default Post;
