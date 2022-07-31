import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './UserList.module.scss';
import classnames from 'classnames/bind';
import Image from '~/components/Image';
import { CheckedIcon } from '~/components/Icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper/index';
import UserProfile from '../../UserProfile';

const cx = classnames.bind(styles);

export default function UserList({ data }) {
    return (
        <div>
            <HeadlessTippy
                delay={[500, 500]}
                placement="bottom-start"
                interactive
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <UserProfile data={data} />
                        </PopperWrapper>
                    </div>
                )}
            >
                <Link
                    to={`/@${data.nickname}`}
                    replace
                    className={cx('user-item')}
                >
                    <Image
                        className={cx('avatar')}
                        alt={data.full_name}
                        src={data.avatar}
                    />

                    <div className={cx('info')}>
                        <h4 className={cx('name')}>
                            {data.nickname}

                            {data.tick && (
                                <CheckedIcon
                                    className={cx('check')}
                                    width="1.4rem"
                                    height="1.4rem"
                                />
                            )}
                        </h4>
                        <p className={cx('description')}>{data.full_name}</p>
                    </div>
                </Link>
            </HeadlessTippy>
        </div>
    );
}

UserList.propTypes = {
    data: PropTypes.object.isRequired,
};
