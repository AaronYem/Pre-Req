import React from 'react';
import { Text } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

export default function ChatScreen({ back }) {
  return (
    <>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>Chat</Text>
      <Text style={{ marginTop: 10 }}>Real-time text chat with timestamps (MVP).</Text>
      <PrimaryButton title="Back" onPress={back} />
    </>
  );
}
