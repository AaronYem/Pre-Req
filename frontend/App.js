import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import OnboardingScreen from './src/screens/OnboardingScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SwipeScreen from './src/screens/SwipeScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import ChatScreen from './src/screens/ChatScreen';

const STEPS = ['onboarding', 'profile', 'swipe', 'matches', 'chat'];

export default function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const current = STEPS[stepIndex];

  const commonProps = useMemo(
    () => ({
      next: () => setStepIndex((prev) => Math.min(prev + 1, STEPS.length - 1)),
      back: () => setStepIndex((prev) => Math.max(prev - 1, 0)),
    }),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>CampusMatch</Text>
      <View style={styles.card}>
        {current === 'onboarding' && <OnboardingScreen {...commonProps} />}
        {current === 'profile' && <ProfileScreen {...commonProps} />}
        {current === 'swipe' && <SwipeScreen {...commonProps} />}
        {current === 'matches' && <MatchesScreen {...commonProps} />}
        {current === 'chat' && <ChatScreen {...commonProps} />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 12 },
  card: { flex: 1, borderRadius: 20, borderWidth: 1, borderColor: '#ececec', padding: 16 },
});
