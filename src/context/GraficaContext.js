import React, { createContext, useState } from 'react'

export const GraficaContext = createContext();
export const GraficaContextProvider = ({ children }) => {

  const [graficaPendiente, setgraficaPendiente] = useState([]);
  const [data, setData] = useState([]);

  return <GraficaContext.Provider value={{ graficaPendiente, setgraficaPendiente, data, setData }}>
    {children}
  </GraficaContext.Provider>
}
