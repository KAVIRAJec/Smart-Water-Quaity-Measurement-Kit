
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { styles } from './Puritycss';
import { Card, Title, Paragraph } from 'react-native-paper';

export const PurityScreen = ({ route, navigation }) => {
    const { item } = route.params;
    const [data, setData] = useState(null);
    const [ORPStatus, setORPStatus] = useState('');
    const [ORPValue, setORPValue] = useState('');
    const [ORPContent, setORPContent] = useState('');
    const [ORPIcon, setORPIcon] = useState(null); 
    const [PhStatus, setPhStatus] = useState('');
    const [PhValue, setPhValue] = useState('');
    const [PhIcon, setPhIcon] = useState(null);
    const [TurbidityStatus, setTurbidityStatus] = useState('');
    const [TurbidityValue, setTurbidityValue] = useState('');
    const [TurbidityIcon, setTurbidityIcon] = useState(null);
    const [TDSStatus, setTDSStatus] = useState('');
    const [TDSValue, setTDSValue] = useState('');
    const [TDSIcon, setTDSIcon] = useState(null);
    const [Status, setStatus] = useState('');
    const [StatusIcon, setStatusIcon] = useState(null);
    
  useEffect(() => {
    fetchData(item.toLowerCase());
  }, [item]);

  useEffect(() => {
    if (data) {
      // ORP
      const ORP = parseFloat(data.ORP);
      setORPValue(ORP);
      if (ORP >= 200 && ORP <= 550) {
        setORPStatus('Status: Drinkable');
        setORPContent(`Chlorine content: ${((ORP - 200) / (550 - 200) * 100).toFixed(2)}%`);
        setORPIcon('check');
      } else {
        setORPStatus('Status: Not Drinkable');
        setORPIcon('times'); 
      }

      // Ph
      const Ph = parseFloat(data.Ph);
      setPhValue(Ph);
      if (Ph >= 6.5 && Ph <= 8.5) {
        setPhStatus('Status: Normal');
        setPhIcon('check');
      } else {
        setPhStatus('Status: Abnormal');
        setPhIcon('times');
      }

      // Turbidity
      const Turbidity = parseFloat(data.Turbidity);
      setTurbidityValue(Turbidity);
      if (Turbidity < 5) {
        setTurbidityStatus('Status: Clear Water');
        setTurbidityIcon('check');
      } else {
        setTurbidityStatus('Status: Non-clear Water');
        setTurbidityIcon('times');
      }

      // TDS
      const TDS = parseFloat(data.TDS);
      setTDSValue(TDS);
      if (TDS >= 50 && TDSValue <= 500) {
        setTDSStatus('Status: Not Present');
        setTDSIcon('check');
      } else {
        setTDSStatus('Status: Present');
        setTDSIcon('times');
      }
      const isGood =0;
      if(ORP >= 200 && ORP <= 550 && Turbidity < 5){
        setStatus('Good');
        setStatusIcon('check');
      }else{
        setStatus('Bad');
        setStatusIcon('times');
      }
      
    }
  }, [data]);

  const fetchData = async (parameter) => {
    try {
      const response = await fetch(`http://192.168.43.68:3001/api/data/${parameter}`);
      const result = await response.json();
      console.log('Fetched data:', result);
      setData(result);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <View style={styles.graphContainer}>
    <View style={styles.orangeBox}>
      <Text style={styles.orangeBoxText}>Purity for {item}</Text>
    </View>
      <Card style={styles.card}>
        <Card.Content>
      <Text style={styles.graphText}>Drinkable / Non Drinkable</Text>
      <Text>ORP :{ORPValue}mV</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ flex: 1 }}>{ORPStatus}</Text>
      {ORPIcon && (
        <Icon name={ORPIcon} color={ORPIcon === 'check' ? 'green' : 'red'} size={20} />
      )}
    </View>
      </Card.Content></Card>

      <Card style={styles.card}>
        <Card.Content>
      <Text style={styles.graphText}>Clearance of {item}</Text>
      <Text>Turbidity Value: {TurbidityValue} NTU</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ flex: 1 }}>{TurbidityStatus}</Text>
      {TurbidityIcon && (
        <Icon name={TurbidityIcon} color={TurbidityIcon === 'check' ? 'green' : 'red'} size={20} />
      )}
    </View>
      </Card.Content></Card>

      <Card style={styles.card}>
        <Card.Content>
      <Text style={styles.graphText}>Presence of Solid Particles</Text>
      <Text>TDS Value: {TDSValue}ppm</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ flex: 1 }}>{TDSStatus}</Text>
      {TDSIcon && (
        <Icon name={TDSIcon} color={TDSIcon === 'check' ? 'green' : 'red'} size={20} />
      )}
    </View>
      </Card.Content></Card>

      <Card style={styles.card}>
        <Card.Content>
      <Text style={styles.graphText}>Acidic / Basic</Text>
      <Text>PH Value: {PhValue}PH</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ flex: 1 }}>{PhStatus}</Text>
      {PhIcon && (
        <Icon name={PhIcon} color={PhIcon === 'check' ? 'green' : 'red'} size={20} />
      )}
    </View>
      </Card.Content></Card>

      <Card style={styles.card}>
        <Card.Content>
      <Text style={styles.graphText}>Chlorination Percentage</Text>
      <Text>Chlorination is detected using Oxidized potential</Text>
      <Text>{ORPContent}</Text>
      </Card.Content></Card>
      <Card style={styles.card}>
        <Card.Content>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={[styles.graphText,{ flex: 1 }]}>Overall Rating: {Status}</Text>
      {StatusIcon && (
        <Icon name={StatusIcon} color={StatusIcon === 'check' ? 'green' : 'red'} size={20} />
      )}
    </View>  
      </Card.Content></Card>
      <TouchableOpacity
        style={styles.viewGraphButton}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.viewGraphButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};