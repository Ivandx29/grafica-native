import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Button } from 'react-native';
import { VictoryScatter, VictoryChart, VictoryTheme, VictoryLine } from "victory-native";

const App = () => {

  const [textX, setTextX] = useState();
  const [textY, setTextY] = useState();
  const [data, setData] = useState([]);
  const [pendiente, setPendiente] = useState();
  const [puntoDeCorte, setPuntoDeCorte] = useState();
  const [graficaPendiente, setGraficaPendiente] = useState([]);
  const [mostrarFormula, setMostrarFormula] = useState(false);

  const defaultPendiente = [];

  const addData = () => {
    const x = parseInt(textX);
    const y = parseInt(textY);
    const newData = { x, y };
    setData([...data, newData]);
    setTextX('');
    setTextY('');
  };

  const removeData = () => {
    setData([]);
    setPendiente();
    setPuntoDeCorte();
    setGraficaPendiente(defaultPendiente);
  };

  const obtenerPendiente = () => {
    const sumatoriaX = data.reduce((acc, curr) => acc + curr.x, 0);
    const sumatoriaY = data.reduce((acc, curr) => acc + curr.y, 0);
    const sumatoriaXY = data.reduce((acc, curr) => acc + (curr.x * curr.y), 0);
    const sumatoriaX2 = data.reduce((acc, curr) => acc + (curr.x * curr.x), 0);
    const n = data.length;
    const pendiente = ((n * sumatoriaXY) - (sumatoriaX * sumatoriaY)) / ((n * sumatoriaX2) - (sumatoriaX * sumatoriaX));
    setPendiente(pendiente);

    const puntoDeCorte = (sumatoriaY * sumatoriaX2 - sumatoriaX * sumatoriaXY) / (n * sumatoriaX2 - sumatoriaX * sumatoriaX);
    setPuntoDeCorte(puntoDeCorte);

    // Formula de la recta
    // y = mx + b
    // y = pendiente * x + puntoDeCorte

    setGraficaPendiente([
      {
        x: 0,
        y: parseFloat(puntoDeCorte.toFixed(2))
      },
      {
        x: parseFloat(puntoDeCorte.toFixed(2)) + 3,
        y: parseFloat(pendiente.toFixed(2))
      }
    ]);
    setMostrarFormula(true);
  };


  return (
    <View style={styles.container}>
      <Text className="text-slate-900 text-justify text-md font-bold mt-2">Grafica de una Pendiente</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTextX}
        value={textX}
        placeholder="Ingrese el valor de X"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={setTextY}
        value={textY}
        placeholder="Ingrese el valor de Y"
        keyboardType="numeric"
      />
      <Button
        onPress={addData}
        title="Agregar"
        color="#5DADE2"
      />
      <Button
        onPress={removeData}
        title="Borrar Grafica"
        color="#FF0000"
      />
      <Button
        onPress={obtenerPendiente}
        title="Obtener Pendiente"
        color="#2ECC71"
      />
      <VictoryChart domain={{ x: [0.5, 14], y: [0, 14] }} width={400} theme={VictoryTheme.material}>
        <VictoryLine data={graficaPendiente} x="x" y="y" />
        <VictoryScatter data={data} x="x" y="y" />
      </VictoryChart>
      {mostrarFormula == true ? <>
        <Text >Formula de la recta</Text>
        <Text>y = {pendiente?.toFixed(2)} * x + {puntoDeCorte?.toFixed(2)}</Text>
      </> : <></>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: Dimensions.get('window').height * 0.08,
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;