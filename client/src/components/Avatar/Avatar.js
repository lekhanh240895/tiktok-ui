import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Image from '../Image';

const AvatarComponent = ({
    src,
    to,
    width = '4rem',
    height = '4rem',
    alt = 'Avatar',
    isOnline,
    ...passProps
}) => {
    let Component = 'div';
    if (to) {
        Component = Link;
        passProps.to = to;
    }

    return (
        <Component {...passProps} width={width} height={height}>
            <Image
                src={src}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
                alt={alt}
            />
        </Component>
    );
};

export const Avatar = styled(AvatarComponent)`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    background-color: rgba(136, 136, 136, 0.5);
    border-color: rgba(22, 24, 35, 0.12);
    border-width: 0.5px;
    cursor: pointer;
`;

export default Avatar;
