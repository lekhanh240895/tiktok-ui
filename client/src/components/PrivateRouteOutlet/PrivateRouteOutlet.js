import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { authSelector } from '~/redux/selectors';

export default function PrivateOutlet() {
    const { currentUser } = useSelector(authSelector);
    return currentUser ? <Outlet /> : <Navigate to="/" />;
}
