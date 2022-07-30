import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './UserList.module.scss';
import classnames from 'classnames/bind';
import Image from '~/components/Image';
import { CheckedIcon } from '~/components/Icons';

const cx = classnames.bind(styles);

export default function UserList({ data }) {
    return (
        <Link to={`/@${data.nickname}`} replace className={cx('user-item')}>
            <Image
                className={cx('avatar')}
                alt={data.full_name}
                src={data.avatar}
            />

            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    {data.full_name}

                    {data.tick && (
                        <CheckedIcon
                            className={cx('check')}
                            width="1.4rem"
                            height="1.4rem"
                        />
                    )}
                </h4>
                <p className={cx('description')}>{data.nickname}</p>
            </div>
        </Link>
    );
}

UserList.propTypes = {
    data: PropTypes.object.isRequired,
};
