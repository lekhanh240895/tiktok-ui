import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import { SolidDownArrowIcon } from '~/components/Icons';
import Spinner from '~/components/Spinner/Spinner';
import { authSelector } from '~/redux/selectors';
import authSlice, { register } from '~/redux/slices/authSlice';
import loginModalSlice from '~/redux/slices/loginModalSlice';
import { Wrapper } from './styled';

export default function PhoneEmailSignup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [month, setMonth] = useState(null);
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');
    const [days, setDays] = useState([]);
    const dispatch = useDispatch();
    const monthRef = useRef(null);
    const dayRef = useRef(null);
    const yearRef = useRef(null);
    const { currentUser, isLoading, isSuccess, error } =
        useSelector(authSelector);

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const this_year = new Date().getFullYear();
    const start_year = 1901;
    const years = [...Array(this_year - start_year + 1).keys()].map(
        (x) => x + start_year,
    );

    useEffect(() => {
        setDays(
            Array.from({ length: getMonthDays(month, year) }, (_, i) => i + 1),
        );
    }, [month, year]);

    function validateEmail(email) {
        if (
            // eslint-disable-next-line
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        ) {
            return true;
        }
        return false;
    }
    const isEmailValidated = validateEmail(email);

    const getMonthDays = (month, year) => {
        const months30 = [4, 6, 9, 11];
        const leapYear = year % 4 === 0;
        return month === 2
            ? leapYear
                ? 29
                : 28
            : months30.includes(month)
            ? 30
            : 31;
    };

    const handleShowSelect = (ref) => {
        const divRef = ref.current;
        divRef.classList.toggle('show');
    };

    const formatDate = (year, month, day) => {
        const m = month < 10 ? `0${month}` : month;
        const d = day < 10 ? `0${day}` : day;
        return `${year}${m}${d}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            username,
            email,
            password,
            birthday: formatDate(year, month, day),
        };

        dispatch(register(formData));
    };

    useEffect(() => {
        if (isSuccess && currentUser) {
            dispatch(loginModalSlice.actions.hide());
            window.location.reload();
        }
        return () => {
            authSlice.actions.reset();
        };
    }, [dispatch, isSuccess, currentUser]);

    if (isLoading) return <Spinner />;

    return (
        <Wrapper>
            {error && <div className="error">{error}</div>}

            <div className="title">When’s your birthday?</div>
            <div className="age-select">
                <div
                    className="select-container"
                    onClick={() => handleShowSelect(monthRef)}
                    ref={monthRef}
                >
                    <div className="select-label">
                        {months[month - 1] || 'Month'}

                        <span className="icon icon-wrapper">
                            <SolidDownArrowIcon
                                width="1.6rem"
                                height="1.6rem"
                            />
                        </span>
                    </div>
                    <div className="select-list">
                        {months.map((month, index) => (
                            <div
                                className="select-option"
                                key={month}
                                onClick={() => setMonth(index + 1)}
                            >
                                {month}
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    className="select-container"
                    onClick={() => handleShowSelect(dayRef)}
                    ref={dayRef}
                >
                    <div className="select-label">
                        {day || 'Day'}
                        <span className="icon icon-wrapper">
                            <SolidDownArrowIcon
                                width="1.6rem"
                                height="1.6rem"
                            />
                        </span>
                    </div>

                    <div className="select-list">
                        {days.map((day) => (
                            <div
                                className="select-option"
                                key={day}
                                onClick={() => setDay(day)}
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className="select-container"
                    onClick={() => handleShowSelect(yearRef)}
                    ref={yearRef}
                >
                    <div className="select-label">
                        {year || 'Year'}
                        <span className="icon icon-wrapper">
                            <SolidDownArrowIcon
                                width="1.6rem"
                                height="1.6rem"
                            />
                        </span>
                    </div>
                    <div className="select-list">
                        {years.reverse().map((year) => (
                            <div
                                className="select-option"
                                key={year}
                                onClick={() => setYear(year)}
                            >
                                {year}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="div-desc">
                Your birthday won't be shown publicly.
            </div>

            <div className="description">
                Email
                <Link to="/signup/phone-or-email/phone" className="styled-link">
                    Sign up with phone
                </Link>
            </div>

            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email address"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    disabled={
                        !isEmailValidated ||
                        !password ||
                        !month ||
                        !day ||
                        !year
                    }
                    primary
                    className="submit-btn"
                    type="submit"
                >
                    Sign up
                </Button>
            </form>
        </Wrapper>
    );
}
