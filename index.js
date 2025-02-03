import { registerRootComponent } from 'expo';
import { Platform } from 'react-native';
import { createRoot } from 'react-dom/client';
import App from './App';

if (Platform.OS === 'web') {
  const root = createRoot(document.getElementById('root'));
  root.render(<App />);
} else {
  registerRootComponent(App);
}
