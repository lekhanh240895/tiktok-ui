import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

export default function Button({
    children,
    className,
    leftIcon,
    rightIcon,
    to,
    href,
    text = false,
    primary = false,
    outline = false,
    secondary = false,
    disabled = false,
    small = false,
    large = false,
    rounded = false,
    onClick,
    ...passProps
}) {
    const classes = cx('wrapper', {
        text,
        primary,
        outline,
        secondary,
        disabled,
        small,
        large,
        rounded,
        [className]: className,
    });

    const props = {
        onClick,
        ...passProps,
    };

    let Component = 'button';

    if (to) {
        props.to = to;
        Component = Link;
    } else if (href) {
        props.href = href;
        Component = 'a';
    }

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                return delete props[key];
            }
        });
    }

    return (
        <Component className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Component>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    className: PropTypes.string,
    to: PropTypes.string,
    href: PropTypes.string,
    text: PropTypes.bool,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    secondary: PropTypes.bool,
    disabled: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    rounded: PropTypes.bool,
    onClick: PropTypes.func,
};
