import { ReactNode } from "react";

export const AutContext = React.createContext({
    
});

export function AuthProvider({children}: {children: ReactNode}) {
    return <AutContext.Provider value={{}}>
        {children}
    </AutContext.Provider>
}