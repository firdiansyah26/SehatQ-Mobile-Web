import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { history, store } from './reduxs/Store'
import DashAppHolder from './layout/dashAppStyle'
import Layout from './layout';
import LogRocket from 'logrocket'

function App() {
    return (
        <DashAppHolder>
            <Provider store={store}>
                <Router history={history}>
                    <Layout />
                </Router>
            </Provider>
        </DashAppHolder>
    );
}

LogRocket.init('geg9qm/hook');
LogRocket.identify('123', {
  name: '',
  email: '',
  // Add your own custom user variables here, ie:
  subscriptionType: 'pro'
});

export default App;
