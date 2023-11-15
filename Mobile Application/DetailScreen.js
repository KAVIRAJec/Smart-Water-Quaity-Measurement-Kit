
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import {styles} from './Detailcss'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import TouchableScale from 'react-native-touchable-scale';

export const DetailScreen = ({ route, navigation }) => {
    const { item } = route.params;
    const [data, setData] = useState(null); 
    const [tdata, setTData] = useState([]);
    const handleCircularPress = (value) => {
      // Handle what should happen when a circle is pressed
    };
    let parameterValue = '';
    let Ph = '';
    let Turbidity = '';
    let ORP = '';
    let TDS = '';
    let note = `The Normal range of ${item} contains\n pH: 7.5\n Turbidity: 10 NTU\n ORP: 200-400mV\n TDS: 200 ppm`;

    useEffect(() => {
      fetchDatat(item.toLowerCase());
    }, [item]);
    useEffect(() => {
      fetchData(item.toLowerCase());
    }, [item]);
    
    const fetchDatat = async (parameter) => {
      try {
        const response = await fetch(`http://192.168.43.68:3001/api/${parameter} `);
        const result = await response.json();
        console.log('Fetched data:', result);
        setTData(result); // Assuming you expect a single row of data
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    const fetchData = async (parameter) => {
      try {
        const response = await fetch(`http://192.168.43.68:3001/api/data/${parameter}`);
        const result = await response.json();
        console.log('Fetched data:', result);
        setData(result); // Assuming you expect a single row of data
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const formattedDate = `${padZero(date.getDate())}/${padZero(date.getMonth() + 1)}/${date.getFullYear()}`;
      const formattedTime = `${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`;
      return `${formattedDate} ${formattedTime}`;
    };
    
    // Function to pad single digits with a leading zero
    const padZero = (value) => (value < 10 ? `0${value}` : value);

    if (data !== null) {
      Ph=`${data.Ph}`
      Turbidity=`${data.Turbidity}`
      ORP=`${data.ORP}`
      TDS=`${data.TDS}`
      } else {
      parameterValue = 'Loading...'; // Set loading message while data is being fetched
    }
  
    return (
      <View style={styles.detailContainer}>
      <View style={{ marginTop: 100 }} />
      <View style={styles.gridContainer}>
        <View style={styles.gridRow}>
        <TouchableScale onPress={() => handleCircularPress(Ph)}>
      <View style={styles.circularProgressStyle}>
      <AnimatedCircularProgress  //Ph
        width={15}
        size={120}
        fill={90}
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
        rotation={0}
        lineCap="round"
        arcSweepAngle={360}
        duration={2000}
      >
        {(fill) => (
          <Text style={styles.circularContent}>
            <Text style={styles.textValue}>
              {Ph}
            </Text>
          </Text>
        )}
      </AnimatedCircularProgress>
      <Text style={[styles.parameterName,{textAlign:'center'}]}>
        Ph
      </Text>
    </View>
    </TouchableScale>
    <TouchableScale onPress={() => handleCircularPress(Turbidity)}>
    <View style={styles.circularProgressStyle}>
      <AnimatedCircularProgress   //Turbidity
        width={15}
        size={120}
        fill={65}
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
        rotation={0}
        lineCap="round"
        arcSweepAngle={360}
        duration={2000}
      >
        {(fill) => (
          <Text style={styles.circularContent}>
            <Text style={styles.textValue}>
              {Turbidity}
            </Text>
          </Text>
        )}
      </AnimatedCircularProgress>
      <Text style={[styles.parameterName,{textAlign:'center'}]}>
                  Turbidity
                </Text>
    </View></TouchableScale>
    </View>
    <View style={styles.gridRow}>
    <TouchableScale onPress={() => handleCircularPress(ORP)}>
    <View style={styles.circularProgressStyle}>
      <AnimatedCircularProgress  //ORP
        width={15}
        size={120}
        fill={70}
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
        rotation={0}
        lineCap="round"
        arcSweepAngle={360}
        duration={2000}
      >
        {(fill) => (
          <Text style={styles.circularContent}>
            <Text style={[styles.textValue,{position:'absolute',left:-30,top:-10}]}>
              {ORP}
            </Text>
          </Text>
        )}
      </AnimatedCircularProgress>
      <Text style={[styles.parameterName,{textAlign:'center'}]}>
                  ORP
                </Text>
    </View>
    </TouchableScale>
    <TouchableScale onPress={() => handleCircularPress(ORP)}>
    <View style={styles.circularProgressStyle}>
      <AnimatedCircularProgress   //TDS
        width={15}
        size={120}
        fill={45}
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
        rotation={0}
        lineCap="round"
        arcSweepAngle={360}
        duration={2000}
      >
        {(fill) => (
          <Text style={styles.circularContent}>
            <Text style={[styles.textValue,{position: 'absolute',left:-35,top:-12}]}>
              {TDS}
            </Text>
          </Text>
        )}
      </AnimatedCircularProgress>
      <Text style={[styles.parameterName,{textAlign:'center'}]}>
                  TDS
                </Text>
    </View>
    </TouchableScale>
    </View></View>
        <View style={styles.notecontainer}>
        <Text style={styles.note}>Note:</Text>
        <Text style={styles.notetext}>{note}</Text>
        </View>
        <TouchableOpacity 
              style={styles.viewGraphButton}
              onPress={() => navigation.navigate('Home')}
              >
                <Text style={[styles.viewGraphButtonText,{paddingHorizontal:10}]}>Go Back</Text>
              </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewGraphButton}
          onPress={() => navigation.navigate('Graph', { item })}>
          <Text style={[styles.viewGraphButtonText,{paddingHorizontal:-10}]}>View Graph</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewGraphButton}
          onPress={() => navigation.navigate('Purity', { item })}>
          <Text style={[styles.viewGraphButtonText,{paddingHorizontal:-8}]}>Check Purity</Text>
        </TouchableOpacity>
              {/* <Text>{JSON.stringify(tdata)}</Text> */}
    <Text style={styles.tableheader}>Table Data:</Text>
    <View style={styles.tableheader}>
    <Text style={[styles.tablerowTextHeader, styles.dataHeader, { paddingLeft: 60 }]}>Date</Text>
    <Text style={[styles.tablerowTextHeader, styles.phHeader, { paddingLeft: 40 }]}>pH</Text>
    <Text style={[styles.tablerowTextHeader,{ paddingLeft: 0 }]}>Turbidity</Text>
    <Text style={styles.tablerowTextHeader}>ORP</Text>
    <Text style={styles.tablerowTextHeader}>TDS</Text>
</View>
      <FlatList
        data={tdata}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
           <View style={styles.tablerow}>
             <Text style={[styles.tablerowText, styles.dataHeader,{ paddingLeft: 50 }]}>{formatDate(item.date)}</Text>
             <Text style={[styles.tablerowText, styles.phHeader,{ paddingLeft: 30 }]}>{item.Ph}</Text>
             <Text style={styles.tablerowText}>{item.Turbidity}</Text>
             <Text style={[styles.tablerowText,{ paddingLeft: 20 }]}>{item.ORP}</Text>
             <Text style={styles.tablerowText}>{item.TDS}</Text>
     </View>
        )}
      />
        <View style={{ marginBottom: 30 }} />
      </View>
    );
  };