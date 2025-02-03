import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="detail" options={{ title: 'Detail' }} />
      </Stack>
    </GestureHandlerRootView>
  );
};

export default Layout;
