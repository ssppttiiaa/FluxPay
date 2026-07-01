import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TambahLanggananScreen() {
  return (
    <View style={styles.container}>
      <Text>Tambah Langganan Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
