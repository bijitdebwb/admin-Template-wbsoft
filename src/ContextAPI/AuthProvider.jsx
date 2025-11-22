import { useMemo, useState } from "react";
import { AuthContext } from './AuthContext';
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AuthProvider = ({ children }) => {
    const axiosSecure = UseAxiosSecure();
    const [leadId, setLeadId] = useState(null);
    const [loading, setLoading] = useState(false);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["user-Profile"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/profile`);
            if (res?.data?.status_code===201) {
                return res?.data;
            }
            return [];
        },
    });
    const user = data?.userData;
    const hasAccess = data?.userPermissionData;


    const authInfo = useMemo(() => ({
        user,
        hasAccess,
        leadId,
        setLeadId,
        loading,
        setLoading, 
        isLoading,
        refetch

    }), [user, hasAccess, leadId, loading, isLoading, refetch ]);

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
