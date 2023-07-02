import React, {useState, useContext, createContext } from 'react';

const TeamContext = createContext();

export const useTeam = () => useContext(TeamContext)

function TeamProvider({children}) {
    const [ teamId, setTeamId] = useState(undefined);
    return (
        <TeamContext.Provider value={{teamId, setTeamId}}>
            {children}
        </TeamContext.Provider>
    )
}

export default TeamProvider
