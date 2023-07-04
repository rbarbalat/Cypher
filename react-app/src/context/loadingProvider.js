import { useState, createContext, useContext } from 'react';
import Loading from '../components/loading';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

function LoadingProvider({children}) {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{setLoading}}>
            {loading ? <Loading/> : null}
            {children}
        </LoadingContext.Provider>
    )

}

export default LoadingProvider
