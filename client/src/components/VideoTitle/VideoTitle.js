import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { usersSelector } from '~/redux/selectors';

export default function VideoTitle({ title }) {
    const { users } = useSelector(usersSelector);
    const tagUsernames = title.match(/[@]\w*\b/g) || [];
    const newTitle = title.split(' ').map((t, index) => {
        if (t.includes('#')) {
            const tagName = t.replace('#', '');
            return (
                <Tag key={index}>
                    <Link to={`/tag/${tagName}`}>{t}</Link>{' '}
                </Tag>
            );
        }

        if (tagUsernames.some((tag) => tag === t)) {
            if (users.find((user) => user.username === t.replace('@', '')))
                return (
                    <Link to={`/${t}`} key={index}>
                        <Tag>{t} </Tag>
                    </Link>
                );
            else {
                return <Tag key={index}>{t} </Tag>;
            }
        }
        return t + ' ';
    });

    return newTitle;
}

const Tag = styled.span`
    font-weight: 600;
    &:hover {
        text-decoration: underline;
    }
`;
