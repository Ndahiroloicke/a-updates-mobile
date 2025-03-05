import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../src/screens/auth/LoginScreen';
import SignupScreen from '../src/screens/auth/SignupScreen';

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
} 