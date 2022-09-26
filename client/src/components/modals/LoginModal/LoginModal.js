import {
    AppleIcon,
    DeleteIcon,
    FacebookIcon,
    GoogleIcon,
    InstagramIcon,
    KakaoTalkIcon,
    LineIcon,
    QRCodeIcon,
    TwitterIcon,
    UserIcon,
} from '~/components/Icons';
import { Wrapper } from './styled';
import { useDispatch } from 'react-redux';
import loginModalSlice from '~/redux/slices/loginModalSlice';
import { Link } from 'react-router-dom';
import LoginMenu from './LoginMenu';
import PhoneEmailLogin from './PhoneEmailLogin';
import QRCodeLogin from './QRCodeLogin';
import { useCallback, useEffect, useState } from 'react';
import PhoneEmailSignup from './PhoneEmailSignup';

const LOGIN = {
    title: 'Log in to TikTok',
    menu: [
        {
            icon: <QRCodeIcon width="2rem" height="2rem" />,
            title: 'Use QR code',
            to: '/login/qrcode',
            children: {
                title: 'Log in with QR code',
                data: [],
                component: QRCodeLogin,
            },
        },
        {
            icon: <UserIcon width="2rem" height="2rem" />,
            title: 'Use phone / email / username',
            to: '/login/phone-or-email',
            children: {
                title: 'Log in',
                data: [],
                component: PhoneEmailLogin,
            },
        },
        {
            icon: <FacebookIcon width="2rem" height="2rem" />,
            title: 'Continue with Facebook',
        },
        {
            icon: <GoogleIcon width="2rem" height="2rem" />,
            title: 'Continue with Google',
        },
        {
            icon: <TwitterIcon width="2rem" height="2rem" />,
            title: 'Continue with Twitter',
        },
        {
            icon: <LineIcon width="2rem" height="2rem" />,
            title: 'Continue with Line',
        },
        {
            icon: <KakaoTalkIcon width="2rem" height="2rem" />,
            title: 'Continue with KakaoTalk',
        },
        {
            icon: <AppleIcon width="2rem" height="2rem" />,
            title: 'Continue with Apple',
        },
        {
            icon: <InstagramIcon width="2rem" height="2rem" />,
            title: 'Continue with Instagram',
        },
    ],
};

const SIGNUP = {
    title: 'Sign up for TikTok',
    menu: [
        {
            icon: <UserIcon width="2rem" height="2rem" />,
            title: 'Use phone or email',
            to: '/signup/phone-or-email/email',
            children: {
                title: 'Sign up',
                component: PhoneEmailSignup,
            },
        },
        {
            icon: <FacebookIcon width="2rem" height="2rem" />,
            title: 'Continue with Facebook',
        },
        {
            icon: <GoogleIcon width="2rem" height="2rem" />,
            title: 'Continue with Google',
        },
        {
            icon: <TwitterIcon width="2rem" height="2rem" />,
            title: 'Continue with Twitter',
        },
        {
            icon: <LineIcon width="2rem" height="2rem" />,
            title: 'Continue with Line',
        },
        {
            icon: <KakaoTalkIcon width="2rem" height="2rem" />,
            title: 'Continue with KakaoTalk',
        },
    ],
    policy: true,
};

export default function LoginModal() {
    const dispatch = useDispatch();
    const [signUp, setSignUp] = useState(false);

    const escFunction = useCallback(
        (event) => {
            if (event.key === 'Escape') {
                dispatch(loginModalSlice.actions.hide());
            }
        },
        [dispatch],
    );

    useEffect(() => {
        document.addEventListener('keydown', escFunction, false);

        return () => {
            document.removeEventListener('keydown', escFunction, false);
        };
    }, [escFunction]);

    const handleSignUp = (e) => {
        e.preventDefault();
        setSignUp(true);
    };
    const handleLogin = (e) => {
        e.preventDefault();
        setSignUp(false);
    };

    return (
        <Wrapper>
            <div className="modal">
                <div className="modal_inner">
                    <span
                        onClick={() => dispatch(loginModalSlice.actions.hide())}
                        className="close-icon"
                    >
                        <DeleteIcon width="1.5rem" height="1.5rem" />
                    </span>

                    <div className="modal_body">
                        <LoginMenu
                            items={signUp ? SIGNUP.menu : LOGIN.menu}
                            title={signUp ? SIGNUP.title : LOGIN.title}
                            policy={signUp && SIGNUP.policy}
                        />
                    </div>

                    {signUp ? (
                        <div className="modal_footer">
                            Already have an account?
                            <Link
                                to="/login"
                                className="footer-link"
                                onClick={handleLogin}
                            >
                                Sign in
                            </Link>
                        </div>
                    ) : (
                        <div className="modal_footer">
                            Don't have an account?
                            <Link
                                to="/signup"
                                className="footer-link"
                                onClick={handleSignUp}
                            >
                                Sign up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </Wrapper>
    );
}
