import React from 'react';
import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import Image from '~/components/Image';
import styles from './AccountItem.module.scss';

export default function AccountItem({ data }) {
    const cx = classnames.bind(styles);
    return (
        <Link to={`@${data.nickname}`} className={cx('wrapper')}>
            <Image
                className={cx('avatar')}
                alt={data.full_name}
                src={data.avatar}
            />

            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    {data.full_name}
                    {data.tick && (
                        <FontAwesomeIcon
                            icon={faCheckCircle}
                            className={cx('check')}
                        />
                    )}
                </h4>
                <p className={cx('description')}>{data.nickname}</p>
            </div>
        </Link>
    );
}
