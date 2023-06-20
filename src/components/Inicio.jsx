import React from 'react'
import { GraficaContextProvider } from '../context/GraficaContext'
import FormularioGrafica from './FormularioGrafica'

const Inicio = () => {
    return (
        <GraficaContextProvider>
            <FormularioGrafica />
        </GraficaContextProvider>
    )
}

export default Inicio