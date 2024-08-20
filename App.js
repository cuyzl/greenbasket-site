import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import { GoogleAuthProvider } from 'expo-auth-session/providers/google';
import { registerRootComponent } from 'expo';
import { name as appName } from './app.json';

const GOOGLE_CLIENT_ID = '142036079450-g6bjstdf6igmras7ek7o36c5dape8vik.apps.googleusercontent.com';

function AuthScreen({ navigation }) {
  const [request, response, promptAsync] = GoogleAuthProvider.useIdTokenAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
    redirectUri: makeRedirectUri({
      useProxy: true, // Change to false if using your own redirect URI
    }),
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      console.log('ID Token:', id_token);
      navigation.replace('Home');
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Sign in with Google</Text>
      <Button
        title="Sign in with Google"
        onPress={() => promptAsync()}
        disabled={!request}
      />
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
        onPress={() => navigation.navigate('Details')} // Navigate to Details screen
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
      <Stack.Navigator initialRouteName="Auth"> {/* Start directly on AuthScreen */}
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ title: 'Authentication' }} // Header title for Auth screen
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
