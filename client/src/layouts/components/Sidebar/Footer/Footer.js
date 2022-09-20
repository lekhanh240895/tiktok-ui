import Button from '~/components/Button';
import styles from './Footer.module.scss';
import classnames from 'classnames/bind';

const MENU_FOOTER1 = [
    {
        title: 'About',
        to: '/about',
        href: '',
    },
    {
        title: 'Tiktok Browse',
        to: '/browse',
        href: '',
    },
    {
        title: 'New Rooms',
        to: '',
        href: 'https://newsroom.tiktok.com/en-us/',
    },
    {
        title: 'Contact',
        to: '/contact',
        href: '',
    },
    {
        title: 'Careers',
        to: '',
        href: 'https://careers.tiktok.com/en-us/',
    },
    {
        title: 'ByteDance',
        to: '',
        href: 'https://www.bytedance.com/',
    },
];

const MENU_FOOTER2 = [
    {
        title: 'TikTok for Good',
        to: '/forgood',
        href: '',
    },
    {
        title: 'Advertise',
        to: '/business',
        href: '',
    },
    {
        title: 'Developers',
        to: '',
        href: 'https://developers.tiktok.com/?refer=tiktok_web',
    },
    {
        title: 'Transparency',
        to: '/transparency',
        href: '',
    },
    {
        title: 'TikTok Rewards',
        to: '/tiktok-rewards',
        href: '',
    },
];

const MENU_FOOTER3 = [
    {
        title: 'Help',
        to: '/help',
        href: '',
    },
    {
        title: 'Safety',
        to: '/safety',
        href: '',
    },
    {
        title: 'Terms',
        to: '/legal/terms-of-service',
        href: '/legal/privacy-policy-row',
    },
    {
        title: 'Privacy',
        to: '/contact',
        href: '',
    },
    {
        title: 'Creator Portal',
        to: '/creators/creator-portal',
        href: '',
    },
    {
        title: 'Community Guidelines',
        to: '/community-guidelines',
        href: '',
    },
];

const cx = classnames.bind(styles);

export default function Footer() {
    return (
        <div className={cx('wrapper')}>
            <ul className={cx('footer-list')}>
                {MENU_FOOTER1.map((item, index) => (
                    <Button
                        key={index}
                        text
                        to={item.to}
                        href={item.href}
                        className={cx('footer-item')}
                        target="_blank"
                    >
                        {item.title}
                    </Button>
                ))}
            </ul>

            <ul className={cx('footer-list')}>
                {MENU_FOOTER2.map((item, index) => (
                    <Button
                        key={index}
                        text
                        to={item.to}
                        href={item.href}
                        className={cx('footer-item')}
                        target="_blank"
                    >
                        {item.title}
                    </Button>
                ))}
            </ul>

            <ul className={cx('footer-list')}>
                {MENU_FOOTER3.map((item, index) => (
                    <Button
                        key={index}
                        text
                        to={item.to}
                        href={item.href}
                        className={cx('footer-item')}
                        target="_blank"
                    >
                        {item.title}
                    </Button>
                ))}
            </ul>

            <span className={cx('copy-right')}>© 2022 TikTok</span>
        </div>
    );
}
