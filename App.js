import React from 'react';
import Main from './components/Main';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configure';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Loading } from './components/Loading';

const {persistor, store } = ConfigureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={<Loading />}
          persistor={persistor}
            >
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}

