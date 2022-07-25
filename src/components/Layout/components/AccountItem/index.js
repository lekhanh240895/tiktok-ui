import React from 'react';
import classnames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function AccountItem() {
    const cx = classnames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                alt="Avatar"
                src="https://p16-sign-sg.tiktokcdn.com/tiktok-obj/1662875668966401~c5_300x300.webp?x-expires=1658851200&x-signature=aeEBmUtT%2B9mE7th7K8mbPJ3miRY%3D"
            />

            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    khanhvyccf
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        className={cx('check')}
                    />
                </h4>
                <p className={cx('description')}>Khánh Vy Official</p>
            </div>
        </div>
    );
}
