import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function VideoTitle({ title }) {
    const newTitle = useMemo(
        () =>
            title.split(' ').map((t, index) => {
                if (t.includes('#')) {
                    const tagName = t.replace('#', '');
                    return (
                        <Tag key={index}>
                            <Link to={`/tag/${tagName}`}>{t}</Link>{' '}
                        </Tag>
                    );
                }
                return t + ' ';
            }),
        [title],
    );
    return newTitle;
}

const Tag = styled.span`
    font-weight: 600;
    &:hover {
        text-decoration: underline;
    }
`;
