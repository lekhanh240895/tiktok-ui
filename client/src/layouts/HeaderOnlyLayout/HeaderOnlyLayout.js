import React from 'react';
import HeaderV2 from '../components/Header2';

export default function HeaderOnlyLayout({ children }) {
    return (
        <div>
            <HeaderV2 />

            <div className="container">
                <div className="content">{children}</div>
            </div>
        </div>
    );
}
