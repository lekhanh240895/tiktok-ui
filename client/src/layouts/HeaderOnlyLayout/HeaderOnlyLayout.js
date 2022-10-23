import React from 'react';
import Header from '../components/Header';

export default function HeaderOnlyLayout({ children }) {
    return (
        <div>
            <Header innerWidth="var(--shared-layout-width)" />

            <div className="container">
                <div className="content">{children}</div>
            </div>
        </div>
    );
}
