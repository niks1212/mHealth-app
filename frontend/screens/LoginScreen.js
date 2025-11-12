import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [userId, setUserId] = useState('');
  return (
    <View style={{ padding: 20 }}>
      <Text>User ID (for demo):</Text>
      <TextInput value={userId} onChangeText={setUserId} style={{ borderWidth: 1, marginBottom: 10 }} />
      <Button title="Continue" onPress={() => navigation.navigate('Input', { userId })} />
    </View>
  );
}
