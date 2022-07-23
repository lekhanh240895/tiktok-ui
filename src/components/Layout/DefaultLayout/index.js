import React from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';

export default function DefaultLayout({ children }) {
    return (
        <div>
            <Header />

            <div className="container">
                <Sidebar />

                <div className="content">{children}</div>
            </div>
        </div>
    );
}
