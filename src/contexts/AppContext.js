import { createContext, useContext, useEffect, useState } from 'react';
import * as userService from '~/services/userService';

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export default function AppProvider({ children }) {
    const currentUserID = 8;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            const users = await userService.get();
            setUsers(users);
        })();
    }, []);

    const currentUser = users.find((user) => user.id === currentUserID);

    const value = { users, currentUser };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
