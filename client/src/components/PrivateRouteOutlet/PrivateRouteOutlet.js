import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { authSelector } from '~/redux/selectors';

export default function PrivateOutlet() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const { currentUser } = useSelector(authSelector);
    useEffect(() => {
        setUser(currentUser);
    }, [currentUser]);
    return user ? <Outlet /> : <Navigate to="/" />;
}
