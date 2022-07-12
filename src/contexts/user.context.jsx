import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

import { createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// actual value uou want to access
export const UserContext = createContext({
    setcurrentUser: () => null,
    currentUser: null,
});


export const UserProvider = ({children}) => {
    const [currentUser, setcurrentUser] = useState(null);
    const value = {currentUser, setcurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user) {
                createUserDocumentFromAuth(user);
            }
            setcurrentUser(user);
        });

        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}