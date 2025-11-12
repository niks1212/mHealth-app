import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

export default function HealthInputScreen({ route, navigation }) {
  const userId = route.params?.userId || 'demo-user';
  const [heartRate, setHeartRate] = useState('');
  const [steps, setSteps] = useState('');
  const [calories, setCalories] = useState('');
  const [bp, setBp] = useState('');

  const submitData = async () => {
    try {
      const res = await fetch('YOUR_API_GATEWAY_URL/saveHealthData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, heartRate, steps, calories, bp }),
      });
      const data = await res.json();
      Alert.alert('Response', data.message || JSON.stringify(data));
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Heart Rate:</Text>
      <TextInput value={heartRate} onChangeText={setHeartRate} style={{ borderWidth: 1, marginBottom: 8 }} keyboardType="numeric" />
      <Text>Steps:</Text>
      <TextInput value={steps} onChangeText={setSteps} style={{ borderWidth: 1, marginBottom: 8 }} keyboardType="numeric" />
      <Text>Calories:</Text>
      <TextInput value={calories} onChangeText={setCalories} style={{ borderWidth: 1, marginBottom: 8 }} keyboardType="numeric" />
      <Text>Blood Pressure:</Text>
      <TextInput value={bp} onChangeText={setBp} style={{ borderWidth: 1, marginBottom: 12 }} />
      <Button title="Submit Data" onPress={submitData} />
      <View style={{ height: 10 }} />
      <Button title="View History" onPress={() => navigation.navigate('History', { userId })} />
    </View>
  );
}
