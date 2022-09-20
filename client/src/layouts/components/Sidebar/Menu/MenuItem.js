import PropTypes from 'prop-types';
import { NavLink, useMatch } from 'react-router-dom';
import styles from './Menu.module.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

export default function MenuItem({ title, to, icon, activeIcon }) {
    const match = useMatch(to);

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                cx('menu-item', {
                    active: isActive,
                })
            }
        >
            <span className={cx('icon-wrapper')}>
                {match?.pattern.end ? activeIcon : icon}
            </span>
            <h2 className={cx('title')}>{title}</h2>
        </NavLink>
    );
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
};
