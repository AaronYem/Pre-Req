import React, { useState } from 'react';
import { Text, TextInput } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

export default function OnboardingScreen({ next }) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  return (
    <>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>School Email Verification</Text>
      <TextInput
        placeholder="you@school.edu"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 12, marginTop: 12, padding: 10 }}
      />
      <TextInput
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 12, marginTop: 12, padding: 10 }}
      />
      <PrimaryButton title="Verify and Continue" onPress={next} />
    </>
  );
}
