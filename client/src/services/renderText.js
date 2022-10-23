import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { usersSelector } from '~/redux/selectors';

export const renderText = (text) => {
    const tagUsernames = text.match(/[@]\w*\b/g) || [];

    const newText = text.split(' ').map((word, index) => {
        if (tagUsernames.some((tag) => tag === word)) {
            const { users } = useSelector(usersSelector);

            if (users.find((user) => user.username === word.replace('@', '')))
                return (
                    <Link to={`/${word}`} key={index}>
                        <b>{word} </b>
                    </Link>
                );
            else {
                return <b key={index}>{word} </b>;
            }
        }
        return word + ' ';
    });
    return newText;
};
