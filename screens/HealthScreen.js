// screens/HealthScreen.js
import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { saveHealthData, getHealthData } from '../services/api';

const HealthScreen = () => {
  const [healthData, setHealthData] = useState([]);
  const userId = "user123";

  const handleSaveData = async () => {
    try {
      const payload = {
        userId,
        steps: 5000,
        calories: 200,
        heartRate: 80,
      };
      const response = await saveHealthData(payload);
      alert(response.message || "Data saved!");
    } catch (error) {
      alert("Error saving data");
    }
  };

  const handleGetData = async () => {
    try {
      const data = await getHealthData(userId);
      setHealthData(data);
    } catch (error) {
      alert("Error fetching data");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Data</Text>
      <Button title="Save Health Data" onPress={handleSaveData} />
      <Button title="Fetch Health Data" onPress={handleGetData} />

      <FlatList
        data={healthData}
        keyExtractor={(item) => item.timestamp}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Steps: {item.steps}</Text>
            <Text>Calories: {item.calories}</Text>
            <Text>Heart Rate: {item.heartRate}</Text>
            <Text>Timestamp: {item.timestamp}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HealthScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', marginVertical: 5 },
});
