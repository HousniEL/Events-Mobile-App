import React, { useContext, useState } from 'react';

const TraitementContext = React.createContext();

export function useTraitement(){
    return useContext(TraitementContext);
}

export function TraitementProvider({ children }) {

    const [wait, setWait] = useState(false);

    const value = {
        wait,
        setWait
    }

    return (
        <TraitementContext.Provider value={value}>
            { children }
        </TraitementContext.Provider>
    )
}
