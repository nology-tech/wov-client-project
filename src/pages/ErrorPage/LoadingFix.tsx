import React,{useEffect} from 'react'

type LoadingFixProps = {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isAuthenticated: boolean
}

const LoadingFix = ({loading, setLoading, isAuthenticated}: LoadingFixProps) => {
    useEffect(() => {
        setLoading(false);
        }, [isAuthenticated]);

        if (loading) {
        return null;
        }

    return (
        <div>
            
        </div>
    )
}

export default LoadingFix
