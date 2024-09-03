import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Google from 'expo-auth-session/providers/google';
import { useState } from 'react';

const GOOGLE_CLIENT_ID = '142036079450-9vaotm69ac390ql4b93s5p9o7oikfnnl.apps.googleusercontent.com';

function AuthScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
    scopes: ['profile', 'email'],
  });

  React.useEffect(() => {
    console.log('Request:', request);
    console.log('Response:', response);

    if (request) {
      setIsLoading(false);
    }

    if (response?.type === 'success') {
      const { id_token } = response.params;
      console.log('ID Token:', id_token);
      navigation.replace('Home');
    }
  }, [request, response]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Sign in with Google</Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Button
          title="Sign in with Google"
          onPress={() => {
            promptAsync();
          }}
          disabled={!request}
        />
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
        title="Log in"
        onPress={() => navigation.navigate('Details')}
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
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
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
});
