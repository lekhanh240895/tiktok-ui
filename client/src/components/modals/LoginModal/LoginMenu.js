import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './Menu.module.scss';
import { useEffect, useState } from 'react';
import MenuItem from './MenuItem';
import Header from './Header';

const cx = classnames.bind(styles);

export default function LoginMenu({ items, title, policy }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    const Comp = current.component;

    useEffect(() => {
        setHistory([{ data: items }]);
    }, [items]);

    const renderItems = () => {
        return current.data?.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    item={item}
                    onClick={(e) => {
                        e.preventDefault();
                        if (isParent) {
                            setHistory((prevState) => [
                                ...prevState,
                                item.children,
                            ]);
                        } else {
                            // Handle logic here
                        }
                    }}
                />
            );
        });
    };

    const handleBack = () => {
        setHistory((prevState) => prevState.slice(0, history.length - 1));
    };

    return (
        <div className={cx('wrapper')}>
            {history.length > 1 ? (
                <>
                    <Header title={current.title} onBack={handleBack} />
                    <Comp />
                </>
            ) : (
                <>
                    <h1 className={cx('header')}>{title}</h1>
                    <ul className={cx('items-wrapper')}>{renderItems()}</ul>
                </>
            )}

            {policy && (
                <p className={cx('policy')}>
                    By continuing, you agree to TikTok’s
                    <a href="/legal/terms-of-use" target="_blank">
                        Terms of Service
                    </a>
                    and confirm that you have read TikTok’s
                    <a href="/legal/private-policy" target="_blank">
                        Private Policy
                    </a>
                </p>
            )}
        </div>
    );
}

LoginMenu.propTypes = {
    items: PropTypes.array,
};
