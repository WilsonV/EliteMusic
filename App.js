import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import store from './store';
import PageProvider from './components/PageContext';
import NavigationalApp from './components/NavigationalApp';

export default function App() {
  return (
    <PageProvider>
      <Provider store={store}>
        <NavigationalApp />
      </Provider>
      <StatusBar style="auto" />
    </PageProvider>
  );
}
