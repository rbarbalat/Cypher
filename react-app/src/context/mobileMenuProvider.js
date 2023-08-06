import { useContext, createContext, useState } from "react";

const MobileMenuContext = createContext();

export const useMobileMenu = () => useContext(MobileMenuContext)

function MobileMenuProvider({children}) {
    const [ menu, setMenu ] = useState(false)
    const [ threadMenu, setThreadMenu ] = useState(false);

    return (
        <MobileMenuContext.Provider value={{menu, setMenu, threadMenu, setThreadMenu}}>
            {children}
        </MobileMenuContext.Provider>
    )
}

export default MobileMenuProvider
