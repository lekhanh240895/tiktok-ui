import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './Menu.module.scss';
import { LeftArrowIcon } from '~/components/Icons';

const cx = classnames.bind(styles);

export default function MenuHeader({ title, onBack }) {
    return (
        <div className={cx('header')}>
            <button className={cx('back-btn')} onClick={onBack}>
                <LeftArrowIcon width="2rem" height="2rem" />
            </button>
            <h4 className={cx('header-title')}>{title}</h4>

            <ul className={cx('header-list')}></ul>
        </div>
    );
}

MenuHeader.propTypes = {
    title: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
};
