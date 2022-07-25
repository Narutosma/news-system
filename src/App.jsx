import './App.css';
import IndexRouter from './router/IndexRouter';
import store from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
let persistor = persistStore(store);
function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <IndexRouter />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
