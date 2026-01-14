// frontend/src/AppNavigator.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './navigation/AuthNavigator';
import { theme } from './styles/theme';

const Stack = createStackNavigator();

// Dashboard temporaire
const DashboardScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background, padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: theme.colors.primaryDark, marginBottom: 10 }}>
        Dashboard
      </Text>
      <Text style={{ fontSize: 16, color: theme.colors.textSecondary }}>Bienvenue sur Spendio !</Text>
    </View>
  );
};

const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setIsAuthenticated(!!token);
      } catch (error) {
        console.log('Erreur checkAuth:', error);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // Écran de chargement
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primaryDark} />
        <Text style={{ marginTop: 10, color: theme.colors.textSecondary }}>Chargement...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{
              headerShown: true,
              headerStyle: { backgroundColor: theme.colors.primary },
              headerTintColor: theme.colors.white,
              headerTitleAlign: 'center',
              title: 'Spendio',
              headerTitleStyle: { fontWeight: '600' },
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
