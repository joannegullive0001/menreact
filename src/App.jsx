import React from 'react';
import { AppKitProvider } from './AppKitProvider';
import Home from './components/Home';

function App() {
  return (
    <AppKitProvider>
      <Home />
    </AppKitProvider>
  );
}

export default App;
