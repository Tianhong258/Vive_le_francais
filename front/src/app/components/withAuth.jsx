"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../authContext';


export default function withAuth(WrappedComponent) {
    return (props) => {
        const { isAuthenticated } = useContext(AuthContext)
        const router = useRouter();
        useEffect(() => {
            if (!isAuthenticated) {
                router.replace('/inscription-connection');
            }
        }, [isAuthenticated, router]);
        if (!isAuthenticated) {
            return null;
        }
        return <WrappedComponent {...props} />;
    };
};
