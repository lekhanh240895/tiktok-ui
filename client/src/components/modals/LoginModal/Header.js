import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './Menu.module.scss';
import { LeftArrowIcon } from '~/components/Icons';

const cx = classnames.bind(styles);

export default function Header({ title, onBack }) {
    return (
        <div className={cx('header-wrapper')}>
            <button className={cx('back-btn')} onClick={onBack}>
                <LeftArrowIcon width="2.4rem" height="2.4rem" />
            </button>
            <h1 className={cx('header')}>{title}</h1>
        </div>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
};
