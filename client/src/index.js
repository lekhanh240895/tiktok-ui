import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import GlobalStyles from './components/GlobalStyes';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </Provider>
    </React.StrictMode>,
);
