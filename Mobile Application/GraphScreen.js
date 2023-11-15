import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { styles } from './Graphcss';

export const GraphScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [tdata, setTData] = useState([]);

  useEffect(() => {
    fetchDatat(item.toLowerCase());
  }, [item]);

  const fetchDatat = async (parameter) => {
    try {
      const response = await fetch(`http://192.168.43.68:3001/api/${parameter}`);
      const result = await response.json();
      console.log('Fetched data:', result);
      setTData(result);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const formattedData = tdata.map((item) => {
    // Parse the date string into a JavaScript Date object
    const parsedDate = new Date(item.date);
    // Format the date and time as per your requirement
    const formattedDate = `${parsedDate.getMonth() + 1}/${parsedDate.getDate()}/${parsedDate.getFullYear()}`;
    const formattedTime = `${parsedDate.getHours()}:${parsedDate.getMinutes()}:${parsedDate.getSeconds()}`;
    return { ...item, formattedDate, formattedTime };
  });

  const labels = formattedData.map((item) => {
    // Combine the date and time with a line break
    return `${item.formattedDate}\n${item.formattedTime}`;
  });

  const phValues = formattedData.map((item) => item.Ph);
  const turbidityValues = formattedData.map((item) => item.Turbidity);
  const orpValues = formattedData.map((item) => item.ORP);
  const tdsValues = formattedData.map((item) => item.TDS);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: phValues,
      },
    ],
  };
  const chartData1 = {
    labels: labels,
    datasets: [
      {
        data: turbidityValues,
      },
    ],
  };
  const chartData2 = {
    labels: labels,
    datasets: [
      {
        data: orpValues,
      },
    ],
  };
  const chartData3 = {
    labels: labels,
    datasets: [
      {
        data: tdsValues,
      },
    ],
  };
  

  const customYAxisConfig = {
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelFontSize: 12,
    interval: 1,
    fromZero: true, // Set this to true to start the Y-axis from zero
  };

  return (
    <View style={styles.graphContainer}>
      <Text style={styles.graphText}>Graph for {item}</Text>
      <Text style={styles.graphText}>Ph Graph</Text>
      <LineChart
        data={chartData}
        width={450}
        height={400}
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          decimalPlaces: 1, // Number of decimal places for Y-axis labels
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Change line color
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: 'blue',
          },
          ...customYAxisConfig,
        }}
        style={styles.chart}
      />
      <Text style={styles.graphText}>Turbidity Graph</Text>
      <LineChart
        data={chartData1}
        width={450}
        height={400}
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          decimalPlaces: 1, // Number of decimal places for Y-axis labels
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Change line color
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: 'blue',
          },
          ...customYAxisConfig,
        }}
        style={styles.chart}
      />
      <Text style={styles.graphText}>ORP Graph</Text>
      <LineChart
        data={chartData2}
        width={450}
        height={400}
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          decimalPlaces: 1, // Number of decimal places for Y-axis labels
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Change line color
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: 'blue',
          },
          ...customYAxisConfig,
        }}
        style={styles.chart}
      />
      <Text style={styles.graphText}>TDS Graph</Text>
      <LineChart
        data={chartData3}
        width={450}
        height={400}
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          decimalPlaces: 1, // Number of decimal places for Y-axis labels
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Change line color
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: 'blue',
          },
          ...customYAxisConfig,
        }}
        style={styles.chart}
      />
      <TouchableOpacity
        style={styles.viewGraphButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.viewGraphButtonText}>Back to Home</Text>
      </TouchableOpacity>
      <View style={{ marginBottom: 20 }} />
    </View>
  );
};
