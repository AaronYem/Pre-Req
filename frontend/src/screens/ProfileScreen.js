import React from 'react';
import { Text } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

export default function ProfileScreen({ next, back }) {
  return (
    <>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>Create Your Profile</Text>
      <Text style={{ marginTop: 12 }}>Add photos, prompts, and campus lifestyle details.</Text>
      <PrimaryButton title="Back" onPress={back} />
      <PrimaryButton title="Continue" onPress={next} />
    </>
  );
}
