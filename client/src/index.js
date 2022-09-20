import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import GlobalStyles from './components/GlobalStyes';
import AppProvider from './store/AppContext';
import { Provider } from 'react-redux';
import store from './redux/store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <AppProvider>
            <Provider store={store}>
                <GlobalStyles>
                    <App />
                </GlobalStyles>
            </Provider>
        </AppProvider>
    </React.StrictMode>,
);
