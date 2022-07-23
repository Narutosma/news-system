import './App.css';
import IndexRouter from './router/IndexRouter';
import store from './redux/store';
import { Provider } from 'react-redux';
function App() {
  return (
    <>
      <Provider store={store}>
        <IndexRouter />
      </Provider>
    </>
  );
}

export default App;
