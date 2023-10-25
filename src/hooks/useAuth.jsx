import { useState, useEffect } from "react";

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('userToken'));

    useEffect(() => {
        // Check for changes in authentication status when the component mounts
        const token = localStorage.getItem('userToken');
        setAuthenticated(!!token);
    }, []);

    return authenticated;
}