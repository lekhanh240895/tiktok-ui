import Button from '~/components/Button';
import classnames from 'classnames/bind';
import styles from './Menu.module.scss';
import { Link } from 'react-router-dom';

const cx = classnames.bind(styles);

export default function MenuItem({ item, onClick, to, ...props }) {
    let Component;
    if (item.to) {
        Component = Link;
        props.to = item.to;
    } else {
        Component = 'div';
    }

    return (
        <li className={cx('item')}>
            <Component
                {...props}
                className={cx('login-link')}
                onClick={onClick}
            >
                <span className={cx('icon-wrapper')}>{item.icon}</span>

                <Button text className={cx('item_title')}>
                    {item.title}
                </Button>
            </Component>
        </li>
    );
}
