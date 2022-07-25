import classnames from 'classnames/bind';
import styles from './Popper.module.scss';

export default function Wrapper({ children }) {
    const cx = classnames.bind(styles);
    return <div className={cx('wrapper')}>{children}</div>;
}
