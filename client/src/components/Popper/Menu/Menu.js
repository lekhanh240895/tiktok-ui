import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './Menu.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import MenuHeader from './MenuHeader';
import { ArrowIcon, DownArrow } from '~/components/Icons';
import { useDispatch } from 'react-redux';
import { logout } from '~/redux/slices/authSlice';
import appSlice from '~/redux/slices/appSlice';

const cx = classnames.bind(styles);

export default function Menu({
    children,
    items,
    hideOnClick = false,
    placement = 'bottom-end',
    moreArrow = false,
    popperArrow = true,
    offset = [15, 13],
    delay = [0, 500],
    onDeleteComment,
    trigger,
    ...props
}) {
    const [history, setHistory] = useState([{ data: items }]);
    const [isMore, setIsMore] = useState(false);
    const current = history[history.length - 1];
    const dispatch = useDispatch();

    useEffect(() => {
        if (moreArrow && !isMore) {
            return setHistory([{ data: items.slice(0, 5) }]);
        }

        setHistory([{ data: items }]);
    }, [items, isMore, moreArrow]);

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={async () => {
                        if (isParent) {
                            setHistory((prevState) => [
                                ...prevState,
                                item.children,
                            ]);
                        } else {
                            if (item.title === 'Log out') {
                                dispatch(logout());
                            }
                            if (item.title === 'Delete') {
                                if (item.videoID) {
                                    dispatch(
                                        appSlice.actions.setIsDeleteModalShow(
                                            true,
                                        ),
                                    );
                                    dispatch(
                                        appSlice.actions.setSelectedVideoID(
                                            item.videoID,
                                        ),
                                    );
                                }
                                if (item.commentID) {
                                    onDeleteComment(item.commentID);
                                }
                            }
                        }
                    }}
                />
            );
        });
    };

    const handleReset = () => {
        setHistory((prevState) => prevState.slice(0, 1));
        setIsMore(false);
    };

    const handleBack = () => {
        setHistory((prevState) => prevState.slice(0, history.length - 1));
    };

    return (
        <div>
            <HeadlessTippy
                trigger={trigger}
                onHide={handleReset}
                hideOnClick={hideOnClick}
                delay={delay}
                offset={offset}
                render={(attrs) => (
                    <div
                        className={cx('wrapper')}
                        tabIndex="-1"
                        {...attrs}
                        {...props}
                    >
                        <PopperWrapper {...props}>
                            {history.length > 1 && (
                                <MenuHeader
                                    title={current.title}
                                    onBack={handleBack}
                                />
                            )}

                            <div className={cx('items-wrapper')}>
                                {renderItems()}

                                {moreArrow & !isMore ? (
                                    <div
                                        className={cx('more-button')}
                                        onClick={() => setIsMore(true)}
                                    >
                                        <DownArrow
                                            width="2.4rem"
                                            height="2.4rem"
                                        />
                                    </div>
                                ) : null}
                            </div>
                        </PopperWrapper>

                        {popperArrow && (
                            <div data-popper-arrow="" className={cx(`arrow`)}>
                                <ArrowIcon />
                            </div>
                        )}
                    </div>
                )}
                interactive
                placement={placement}
            >
                {children}
            </HeadlessTippy>
        </div>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    placement: PropTypes.string,
    moreArrow: PropTypes.bool,
};
