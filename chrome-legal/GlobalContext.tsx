import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({ text: '', url: '' });

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);