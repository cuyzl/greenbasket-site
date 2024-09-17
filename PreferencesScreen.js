import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';  // Import CheckBox from @react-native-community/checkbox
import { View, Text, Button, StyleSheet } from 'react-native';  // No CheckBox import from react-native
const PreferencesScreen = ({ navigation }) => {
  const [preferences, setPreferences] = useState({
    halal: false,
    nonHalal: false,
    vegan: false,
    nonVegan: false,
    lactoseIntolerant: false,
  });

  const handleCheckboxChange = (preference) => {
    setPreferences((prev) => {
      let updatedPreferences = { ...prev, [preference]: !prev[preference] };

      // Deselect conflicting options
      if (preference === 'halal' && updatedPreferences.halal) {
        updatedPreferences.nonHalal = false;
      } else if (preference === 'nonHalal' && updatedPreferences.nonHalal) {
        updatedPreferences.halal = false;
      }
      if (preference === 'vegan' && updatedPreferences.vegan) {
        updatedPreferences.nonVegan = false;
      } else if (preference === 'nonVegan' && updatedPreferences.nonVegan) {
        updatedPreferences.vegan = false;
      }

      return updatedPreferences;
    });
  };

  const handleSavePreferences = () => {
    console.log('Saved Preferences:', preferences);
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Select Your Preferences</Text>
      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxItem}>
          <Text style={styles.checkboxLabel}>Halal</Text>
          <CheckBox
            value={preferences.halal}
            onValueChange={() => handleCheckboxChange('halal')}
          />
        </View>
        <View style={styles.checkboxItem}>
          <Text style={styles.checkboxLabel}>Non-Halal</Text>
          <CheckBox
            value={preferences.nonHalal}
            onValueChange={() => handleCheckboxChange('nonHalal')}
          />
        </View>
        <View style={styles.checkboxItem}>
          <Text style={styles.checkboxLabel}>Vegan</Text>
          <CheckBox
            value={preferences.vegan}
            onValueChange={() => handleCheckboxChange('vegan')}
          />
        </View>
        <View style={styles.checkboxItem}>
          <Text style={styles.checkboxLabel}>Non-Vegan</Text>
          <CheckBox
            value={preferences.nonVegan}
            onValueChange={() => handleCheckboxChange('nonVegan')}
          />
        </View>
        <View style={styles.checkboxItem}>
          <Text style={styles.checkboxLabel}>Lactose Intolerant</Text>
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
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  checkboxContainer: {
    width: '100%',
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});

export default PreferencesScreen;
