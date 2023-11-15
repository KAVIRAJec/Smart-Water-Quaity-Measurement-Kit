import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {styles} from './Homecss'

export const HomeScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      // Simulate loading time
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, []);

    const handleGoBack = () => {
      navigation.goBack(); // Navigate back to the previous screen
    };
  
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Image
              source={require('./assets/logo.gif')} // Replace with your logo image path
              style={styles.logo}
            />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <>
            <Text style={styles.title}>Water Quality Monitoring System</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity 
              
              style={styles.button}
              onPress={() => navigation.navigate('Detail', { item: 'water' })}
              >
                <Text style={styles.buttonText}>Water</Text>
              </TouchableOpacity>
              <TouchableOpacity
               style={styles.button}
               onPress={() => navigation.navigate('Detail', { item: 'milk' })}
               >
                <Text style={styles.buttonText}>Milk</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate('Detail', { item: 'honey' })}
              >
                <Text style={styles.buttonText}>Honey</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate('Detail', { item: 'oil' })}
              >
                <Text style={styles.buttonText}>Oil</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  };