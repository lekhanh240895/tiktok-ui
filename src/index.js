import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import GlobalStyles from './components/GlobalStyes';
import AppProvider from './store/AppContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <AppProvider>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </AppProvider>
    </React.StrictMode>,
);
