import React, { Component } from 'react';

import {
  AsyncStorage,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';



import{Actions} from 'react-native-router-flux';



export default class splashPage extends Component {


    
     componentWillMount() {
         setTimeout(() => {
            Actions.mainscreen();
         }, 3000);
        
      }
     
       
    runApp(){
        this.props.navigation.goBack(null)
        Actions.mainscreen()
    }
      
    render(){
        return(

            <View style={styles.container}>
                <View style={styles.TopBar}>
                    <Text style={styles.TextHeading}>Charles</Text>
                    <Text style={styles.TextHeading}>Reservation</Text>
                </View>  

                <View style={styles.LogoContainer}>
                     <Image style={styles.logo} source={require('./Images/logo.png')}></Image>
                </View>
            </View>
        );
    }
}

  

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff'
    },
    
    TopBar:{
        height:300,
        width:'100%',
        flexDirection:'column',
        backgroundColor:'#1073cb',
        borderBottomLeftRadius:250,
        borderBottomRightRadius:250,
        alignItems:'center',
        justifyContent: 'center',
        transform: [
            {scaleX: 2}
          ]
        
    },

    TextHeading:{
        fontSize:25,
        fontWeight: "bold",
        height:30,
        color:'#fff',
    },

    LogoContainer:{
        alignItems:'center',
        justifyContent: 'center',
        marginTop:30,
    },
    logo:{
        width:'50%',
        height:'50%',
    }

});