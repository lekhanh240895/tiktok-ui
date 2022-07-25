import classnames from 'classnames/bind';
import styles from './Menu.module.scss';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';

const cx = classnames.bind(styles);

export default function Menu({ children, items }) {
    return (
        <Tippy
            delay={[0, 700]}
            render={(attrs) => (
                <div className={cx('wrapper')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        {items.map((item, index) => (
                            <MenuItem key={index} data={item} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            interactive
            placement="bottom-end"
        >
            {children}
        </Tippy>
    );
}
