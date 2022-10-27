import { useRef, useState } from 'react';
import Button from '../Button';
import { SolidDownArrowIcon } from '../Icons';
import Image from '../Image';
import { Wrapper } from './styled';

const MENU_FOOTER = [
    {
        title: 'Company',
        SUB_MENU: [
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
        ],
    },
    {
        title: 'Programs',
        SUB_MENU: [
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
        ],
    },
    {
        title: 'Support',
        SUB_MENU: [
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
        ],
    },
    {
        title: 'Legal',
        SUB_MENU: [
            {
                title: 'Terms of Use',
                to: '/legal/terms-of-service',
                href: '',
            },
            {
                title: 'Privacy Policy',
                to: '/legal-privacy-policy-row',
                href: '',
            },
        ],
    },
];

export default function Footer() {
    const [language, setLanguage] = useState('en');

    const languages = [
        {
            value: 'en',
            title: 'English',
        },
        {
            value: 'vn',
            title: 'Tiếng Việt ( Việt Nam )',
        },
    ];
    const renderLanguage = (language) => {
        switch (language) {
            case 'vn':
                return 'Tiếng Việt ( Việt Nam )';
            case 'en':
                return 'English';
            default:
                return;
        }
    };
    const languageRef = useRef();

    const handleShowSelect = (ref) => {
        const divRef = ref.current;
        divRef.classList.toggle('show');
    };
    return (
        <Wrapper>
            <footer className="content-wrapper">
                <div className="tiktok-logo">
                    <Image src="https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/web/node/_next/static/images/logo-7328701c910ebbccb5670085d243fc12.svg" />
                    <Image src="https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/web/node/_next/static/images/logotext-9b4d14640f93065ec36dab71c806e135.svg" />
                </div>
                {MENU_FOOTER.map((menu, index) => (
                    <div className="footer-content-column" key={index}>
                        <h5 className="footer-content-column__title">
                            {menu.title}
                        </h5>
                        <ul className="footer-content-column__list">
                            {menu.SUB_MENU.map((item, index) => (
                                <Button
                                    key={index}
                                    text
                                    to={item.to}
                                    href={item.href}
                                    className="footer-content-column__item"
                                    target="_blank"
                                >
                                    {item.title}
                                </Button>
                            ))}
                        </ul>
                    </div>
                ))}
            </footer>
            <div className="footer-bottom">
                <div
                    className="select-container"
                    ref={languageRef}
                    onClick={() => handleShowSelect(languageRef)}
                >
                    <div className="select-label">
                        <span className="text">{renderLanguage(language)}</span>
                        <span className="icon icon-wrapper">
                            <SolidDownArrowIcon
                                width="1.6rem"
                                height="1.6rem"
                            />
                        </span>
                    </div>
                    <div className="select-list">
                        {languages.map((language, index) => (
                            <div
                                className="select-option"
                                key={index}
                                onClick={() => setLanguage(language.value)}
                            >
                                {language.title}
                            </div>
                        ))}
                    </div>
                </div>
                <span className="copy-right">© 2022 TikTok</span>
            </div>
        </Wrapper>
    );
}
