import React,{useEffect} from 'react'

type LoadingProps = {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isAuthenticated: boolean
}

const Loading = ({loading, setLoading, isAuthenticated}: LoadingProps) => {

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

export default Loading
