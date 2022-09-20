import PropTypes from 'prop-types';
import styles from './Menu.module.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

export default function Menu({ children }) {
    return <nav className={cx('wrapper')}>{children}</nav>;
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
};
