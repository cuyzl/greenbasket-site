import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { View, Text, Button, StyleSheet, CheckBox } from 'react-native';

const PreferencesScreen = ({ navigation }) => {
  const [preferences, setPreferences] = useState({
    halal: false,
    nonHalal: false,
    vegan: false,
    nonVegan: false,
    lactoseIntolerant: false,
  });

  const handleCheckboxChange = (preference) => {
    setPreferences((prev) => ({
      ...prev,
      [preference]: !prev[preference],
    }));
  };

  const handleSavePreferences = () => {
    // Save preferences to database here
    console.log('Saved Preferences:', preferences);
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Select Your Preferences</Text>
      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxItem}>
          <Text>Halal</Text>
          <CheckBox
            value={preferences.halal}
            onValueChange={() => handleCheckboxChange('halal')}
          />
        </View>
        <View style={styles.checkboxItem}>
          <Text>Non-Halal</Text>
          <CheckBox
            value={preferences.nonHalal}
            onValueChange={() => handleCheckboxChange('nonHalal')}
          />
        </View>
        <View style={styles.checkboxItem}>
          <Text>Vegan</Text>
          <CheckBox
            value={preferences.vegan}
            onValueChange={() => handleCheckboxChange('vegan')}
          />
        </View>
        <View style={styles.checkboxItem}>
          <Text>Non-Vegan</Text>
          <CheckBox
            value={preferences.nonVegan}
            onValueChange={() => handleCheckboxChange('nonVegan')}
          />
        </View>
        <View style={styles.checkboxItem}>
          <Text>Lactose Intolerant</Text>
          <CheckBox
            value={preferences.lactoseIntolerant}
            onValueChange={() => handleCheckboxChange('lactoseIntolerant')}
          />
        </View>
      </View>
      <Button title="Save Preferences" onPress={handleSavePreferences} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#764CA5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  checkboxContainer: {
    width: '100%',
    padding: 20,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default PreferencesScreen;
