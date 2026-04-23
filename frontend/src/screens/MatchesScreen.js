import React from 'react';
import { Text } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

export default function MatchesScreen({ next, back }) {
  return (
    <>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>Your Matches</Text>
      <Text style={{ marginTop: 10 }}>Mutual likes from your university appear here.</Text>
      <PrimaryButton title="Back" onPress={back} />
      <PrimaryButton title="Open Chat" onPress={next} />
    </>
  );
}
