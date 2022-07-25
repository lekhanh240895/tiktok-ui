import Button from '~/components/Button';
import classnames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classnames.bind(styles);

export default function MenuItem({ data }) {
    return (
        <Button leftIcon={data.icon} className={cx('menu-item')} to={data.to}>
            {data.title}
        </Button>
    );
}
