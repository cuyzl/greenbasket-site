import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Google from 'expo-auth-session/providers/google';
import PreferencesScreen from './PreferencesScreen';

const GOOGLE_CLIENT_ID = '142036079450-9vaotm69ac390ql4b93s5p9o7oikfnnl.apps.googleusercontent.com';

function AuthScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
    scopes: ['profile', 'email'],
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      console.log('ID Token:', id_token);
      navigation.replace('Home');
    } else if (response?.type === 'error') {
      setError('Authentication failed. Please try again.');
    }
    setIsLoading(false);
  }, [response, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Sign in with Google</Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <Button
            title="Sign in with Google"
            onPress={promptAsync}
            disabled={!request}
          />
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome!!!</Text>
      <Button
        title="Go to Preferences"
        onPress={() => navigation.navigate('Preferences')}
      />
      <StatusBar style="auto" />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Details Page</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ title: 'Authentication' }}
        />
        <Stack.Screen
          name="Preferences"
          component={PreferencesScreen}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
