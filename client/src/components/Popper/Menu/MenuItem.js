import Button from '~/components/Button';
import classnames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classnames.bind(styles);

export default function MenuItem({ data, onClick, paddingMenu }) {
    const classes = cx('menu-item', {
        separate: data.separate,
        hoverColor: data.hoverColor,
    });
    return (
        <Button
            leftIcon={data.icon}
            className={classes}
            to={data.to}
            onClick={onClick}
            style={{ padding: paddingMenu && '10px 0' }}
        >
            {data.title}
        </Button>
    );
}
