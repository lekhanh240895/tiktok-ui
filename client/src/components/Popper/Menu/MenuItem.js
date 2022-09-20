import Button from '~/components/Button';
import classnames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classnames.bind(styles);

export default function MenuItem({ data, onClick }) {
    const classes = cx('menu-item', {
        separate: data.separate,
    });
    return (
        <Button
            leftIcon={data.icon}
            className={classes}
            to={data.to}
            onClick={onClick}
        >
            {data.title}
        </Button>
    );
}
