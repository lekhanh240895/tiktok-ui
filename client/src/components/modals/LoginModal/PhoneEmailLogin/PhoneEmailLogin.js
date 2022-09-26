import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import { login } from '~/redux/slices/authSlice';
import loginModalSlice from '~/redux/slices/loginModalSlice';
import { Wrapper } from './styled';

export default function PhoneEmailLogin() {
    const [emailUsername, setEmailUsername] = useState('');
    const [password, setPassword] = useState('');
    const isEmail = ValidateEmail(emailUsername);

    const data = isEmail
        ? {
              email: emailUsername,
              password,
          }
        : {
              username: emailUsername,
              password,
          };

    const dispatch = useDispatch();

    function ValidateEmail(emailUsername) {
        if (
            // eslint-disable-next-line
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailUsername)
        ) {
            return true;
        }
        return false;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(login(data));
        dispatch(loginModalSlice.actions.hide());
    };
    return (
        <Wrapper>
            <div className="description">
                Email or username
                <Link to="/login/phone-or-email/phone" className="styled-link">
                    Log in with phone
                </Link>
            </div>

            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Email or username"
                        name="email-username"
                        value={emailUsername}
                        onChange={(e) => setEmailUsername(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <Link to="/login/email/forget-password" className="forgot-btn">
                    Forgot password?
                </Link>

                <Button
                    disabled={!emailUsername || !password}
                    primary={emailUsername && password ? true : false}
                    className="login-btn"
                    type="submit"
                >
                    Log in
                </Button>
            </form>
        </Wrapper>
    );
}
