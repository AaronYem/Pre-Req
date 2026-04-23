import React from 'react';
import { Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

export default function SwipeScreen({ next, back }) {
  return (
    <>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>Swipe</Text>
      <View style={{ borderRadius: 16, borderWidth: 1, borderColor: '#e8e8e8', padding: 20, marginTop: 14 }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Taylor, 21</Text>
        <Text style={{ marginTop: 8 }}>“A perfect night looks like…”</Text>
      </View>
      <PrimaryButton title="Pass" onPress={() => {}} />
      <PrimaryButton title="Like" onPress={() => {}} />
      <PrimaryButton title="Back" onPress={back} />
      <PrimaryButton title="Continue" onPress={next} />
    </>
  );
}
