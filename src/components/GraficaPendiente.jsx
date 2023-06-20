import React from 'react'
import { VictoryChart, VictoryLine, VictoryScatter, VictoryTheme } from 'victory-native'

const GraficaPendiente = () => {

    const { data, graficaPendiente } = useContext(GraficaContext);

    return (
        <VictoryChart domain={{ x: [0.5, 14], y: [0, 14] }} width={400} theme={VictoryTheme.material}>
            <VictoryLine data={graficaPendiente} x="x" y="y" />
            <VictoryScatter data={data} x="x" y="y" />
        </VictoryChart>
    )
}

export default GraficaPendiente;