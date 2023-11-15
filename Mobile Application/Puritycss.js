import { StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
      },

    viewGraphButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
      },
    viewGraphButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
      },
    graphText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
    graphContainer: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    card: {
        height: 120,
        width: 350,
        marginBottom: 16, // Add margin to separate the card from the button
        borderRadius: 20, // Set border radius for the curved edges
      },
      orangeBox: {
        backgroundColor: '#00668c',
        width: Dimensions.get('window').width,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        marginBottom:20,
      },
      orangeBoxText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
      },
  });  