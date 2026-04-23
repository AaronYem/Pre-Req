import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export default function PrimaryButton({ title, onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#111',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginTop: 10,
  },
  text: { color: '#fff', textAlign: 'center', fontWeight: '600' },
});
