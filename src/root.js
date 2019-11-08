import React from "react";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import configureStore from "./configureStore";
import { FirebaseProvider } from './firebase/firebase'

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const store = configureStore();

function Root() {
  return (
    <Provider store={store}>
      <FirebaseProvider>
        <Router>
          <App />
        </Router>
      </FirebaseProvider>
    </Provider>
  );
}

export default Root;