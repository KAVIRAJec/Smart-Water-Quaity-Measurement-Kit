import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    detailContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    detailText: {
      color: 'black',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    notecontainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    note: {
      color: 'black',
      fontSize: 25,
      fontWeight: 'bold',
      padding: 20,
      backgroundColor: '#f2f2f2',
  
    },
    notetext: {
      color: '#41403F',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: '#f2f2f2',
    },
    viewGraphButton: {
      backgroundColor: '#00668c',
      padding: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
      marginTop: 20,
      
    },
    viewGraphButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    tableheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f2f2f2',
        marginBottom: 5,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        padding: 20,
      },
      tablerowTextHeader: {
        flex: 1,
        paddingRight: 20,
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
      },
      dataHeader: {
        paddingRight: 30,
      },
      phHeader: {
        paddingLeft: 30,
      },
      tablerow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
      },
      tablerowText: {
        flex: 1,
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        paddingRight: 30,
      },
      circularProgressStyle: {
        width: 140,
        height: 170,
        alignContent:'center',
        justifyContent:'center',
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 20,
        padding: 10, // Add padding to create spacing between the boxes
      },
      text: {
        position: 'absolute',
        top: 30, 
        left: 20,
        zIndex: 1,
      },
      circularContent: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
      },
      textValue: {
        fontSize: 24,
        color: 'black',
      },
      gridContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20,
      },
      gridRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 50,
      },
      parameterName: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
      },
});