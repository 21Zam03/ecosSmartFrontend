import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/components/login';
import Autenticacion from './src/components/autenticacion';
import SignUpName from './src/components/SignUpName';
import SignUpIntro from './src/components/SignUpIntro';
import SignUpEmail from './src/components/SignUnEmail';
import SignUpCode from './src/components/SignUpCode';
import SignUpPassword from './src/components/SignUpPassword';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

import { AuthProvider, useAuth } from './src/components/AuthContext';
import Navegacion1 from './src/components/Navegation1';
import { View } from 'react-native';

const AuthStack = createStackNavigator();
const MainTab = createStackNavigator();


const AppContent = () => {

  const { autenticado } = useAuth();

  return (
    <NavigationContainer>
      {autenticado ? (
        <MainTab.Navigator>
          <MainTab.Screen name='Navegacion1' component={Navegacion1} options={{ headerShown: false }}></MainTab.Screen>
        </MainTab.Navigator>
      ) : (
        <AuthStack.Navigator>
          <AuthStack.Screen name="Auth" component={Autenticacion} options={{ headerShown: false }} />
          <AuthStack.Screen
            name="Login"
            component={Login}
            options={{ title: 'Inicia Sesión', headerTransparent: true, headerShown: false }} />
          <AuthStack.Screen name="SignUpIntro" component={SignUpIntro} options={{ title: '', headerShown: true }} />
          <AuthStack.Screen name="SignUpName" component={SignUpName} options={{ title: '', headerShown: true }} />
          <AuthStack.Screen name="SignUpEmail" component={SignUpEmail} options={{ title: '', headerShown: true }} />
          <AuthStack.Screen name="SignUpCode" component={SignUpCode} options={{ title: '', headerShown: true }} />
          <AuthStack.Screen name="SignUpPassword" component={SignUpPassword} options={{ title: '', headerShown: true }} />
        </AuthStack.Navigator>
      )}
      <ExpoStatusBar style="auto" />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}