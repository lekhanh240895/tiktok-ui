import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './Popper.module.scss';

export default function Wrapper({ children, ...props }) {
    const cx = classnames.bind(styles);
    return (
        <div className={cx('wrapper')} {...props}>
            {children}
        </div>
    );
}

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
};
