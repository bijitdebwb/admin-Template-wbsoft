import { useEffect, useState } from "react";

const useUser = () => {
    const [user, setUser] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUser(true);
        } else {
            setUser(false);
        }
    }, []);

    return user;
};

export default useUser;