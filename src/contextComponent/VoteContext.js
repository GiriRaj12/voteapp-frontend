import React, { useState, createContext } from 'react';


export const VoterContext = createContext({});


function VoterStore(props) {
    const [data, setData] = useState();

    return (
        <VoterContext.Provider value={[data, setData]}>
            {props.children}
        </VoterContext.Provider>
    )
}
export default VoterStore;