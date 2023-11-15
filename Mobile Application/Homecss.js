import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
      },
      loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      logo: {
        width: 250,
        height: 250,
        backgroundColor: 'black',
        borderRadius: 220,
        marginBottom: 20,
      },
      loadingText: {
        fontSize: 22,
        color: '#555',
      },
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
      },
      buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
      },
      button: {
        backgroundColor: '#00668c',
        padding: 15,
        borderRadius: 10,
        flex: 0.48,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
      },
      buttonText: {
        width:'80%',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
      },
});  