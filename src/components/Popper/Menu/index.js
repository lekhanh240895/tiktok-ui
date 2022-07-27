import classnames from 'classnames/bind';
import styles from './Menu.module.scss';
import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import { ArrowIcon } from '~/components/Icons';

const cx = classnames.bind(styles);

export default function Menu({ children, items, hideOnClick = false }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
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
    return (
        <Tippy
            onHide={() => setHistory((prevState) => prevState.slice(0, 1))}
            hideOnClick={hideOnClick}
            delay={[0, 700]}
            offset={[15, 10]}
            render={(attrs) => (
                <div className={cx('wrapper')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        {history.length > 1 && (
                            <Header
                                title="Language"
                                onBack={() => {
                                    setHistory((prevState) =>
                                        prevState.slice(0, history.length - 1),
                                    );
                                }}
                            />
                        )}

                        <div className={cx('items-wrapper')}>
                            {renderItems()}
                        </div>
                    </PopperWrapper>

                    <div data-popper-arrow="" className={cx('arrow')}>
                        <ArrowIcon />
                    </div>
                </div>
            )}
            interactive
            placement="bottom-end"
        >
            {children}
        </Tippy>
    );
}
