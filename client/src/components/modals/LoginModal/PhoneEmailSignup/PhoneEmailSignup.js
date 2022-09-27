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
    const monthIconRef = useRef(null);
    const dayIconRef = useRef(null);
    const yearIconRef = useRef(null);
    const { currentUser, isLoading, isError, isSuccess } =
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

    const handleSelectMonth = () => {
        const ref = monthRef.current;
        const icon = monthIconRef.current;
        if (ref.style.display === 'none') {
            ref.style.display = 'block';
            icon.style.transform = 'rotateZ(180deg)';
        } else {
            ref.style.display = 'none';
            icon.style.transform = 'rotateZ(0)';
        }
    };
    const handleSelectDay = () => {
        const ref = dayRef.current;
        const icon = dayIconRef.current;
        if (ref.style.display === 'none') {
            ref.style.display = 'block';
            icon.style.transform = 'rotateZ(180deg)';
        } else {
            ref.style.display = 'none';
            icon.style.transform = 'rotateZ(0)';
        }
    };
    const handleSelectYear = () => {
        const ref = yearRef.current;
        const icon = yearIconRef.current;
        if (ref.style.display === 'none') {
            ref.style.display = 'block';
            icon.style.transform = 'rotateZ(180deg)';
        } else {
            ref.style.display = 'none';
            icon.style.transform = 'rotateZ(0)';
        }
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
        if (isError) {
            console.log('Error');
        }

        if (isSuccess || currentUser) {
            dispatch(loginModalSlice.actions.hide());
            dispatch(authSlice.actions.reset());
        }
    }, [dispatch, isError, isSuccess, currentUser]);

    if (isLoading) return <Spinner />;

    return (
        <Wrapper>
            <div className="title">When’s your birthday?</div>
            <div className="age-select">
                <div className="select-container" onClick={handleSelectMonth}>
                    <div className="select-label">
                        {months[month - 1] || 'Month'}

                        <span ref={monthIconRef} className="icon icon-wrapper">
                            <SolidDownArrowIcon
                                width="1.6rem"
                                height="1.6rem"
                            />
                        </span>
                    </div>
                    <div className="select-list" ref={monthRef}>
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

                <div className="select-container" onClick={handleSelectDay}>
                    <div className="select-label">
                        {day || 'Day'}
                        <span ref={dayIconRef} className="icon icon-wrapper">
                            <SolidDownArrowIcon
                                width="1.6rem"
                                height="1.6rem"
                            />
                        </span>
                    </div>

                    <div className="select-list" ref={dayRef}>
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
                <div className="select-container" onClick={handleSelectYear}>
                    <div className="select-label">
                        {year || 'Year'}
                        <span ref={yearIconRef} className="icon icon-wrapper">
                            <SolidDownArrowIcon
                                width="1.6rem"
                                height="1.6rem"
                            />
                        </span>
                    </div>
                    <div className="select-list" ref={yearRef}>
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
