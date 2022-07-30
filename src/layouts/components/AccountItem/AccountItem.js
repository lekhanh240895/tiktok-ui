import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Image from '~/components/Image';
import styles from './AccountItem.module.scss';
import { CheckedIcon } from '~/components/Icons';

const cx = classnames.bind(styles);

export default function AccountItem({ data }) {
    return (
        <Link to={`/@${data.nickname}`} replace className={cx('wrapper')}>
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

AccountItem.propTypes = {
    data: PropTypes.object,
};
