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
    Picker,
    ListView,
    ActivityIndicator,
    FlatList,
    BackHandler,
    Alert
} from 'react-native';



import DatePicker from 'react-native-datepicker'
import { Actions } from 'react-native-router-flux';
import TextInput from 'react-native-material-textinput'
import CardView from 'react-native-cardview'



export default class Search extends Component {
    onButtonPress = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        navigate('NewScreen');
    }

    handleBackButton = () => {
        Alert.alert(
            'Exit App',
            'Exiting the application?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            },], {
            cancelable: false
        }
        )
        return true;
    }


    constructor(props) {
        super(props)
        this.state = {
            date: "2020-05-15",
            choosenLabel: "9:00 Am - 10:00 Am",
            choosenindex: null,
            VehNumber: '',
            CusName: '',
            CusMob: '',
            CusAdd: '',
            VehDetails: '',
            Comments: '',
            ArrayData:'',
            GotDate:'',
            NewArray:'',
            PhoneNumber:'etst',
            index:null,
            isLoadingg:false,
            Goback:'<<',
        }
    }
    async componentWillMount() {
        this.setState({isLoadingg:true})
        await AsyncStorage.getItem('ArrayData', (err, result) => {
            if (result != null) {
                var obj = JSON.parse(result);
                this.setState({ ArrayData: obj })
                console.log(obj)
              
               
            }
        });
        this.setState({isLoadingg:false})
    }

    SearchData() {
        this.setState({isLoadingg:true})
        this.state.GotDate = '';
        let Array = [...this.state.GotDate];
        for(var i=0; i<this.state.ArrayData.length; i++){
            console.log(this.state.ArrayData[i].VehName)
            if(this.state.ArrayData[i].Mobile==this.state.PhoneNumber){       
                Array.push(this.state.ArrayData[i]);
            }
           
        }
        this.setState({GotDate:Array})
        console.log(this.state.GotDate)
        Array='';
        this.setState({isLoadingg:false})

    }
    Edit(id){
        Actions.edit({
            Did:id
        });
    }
    cancel(id){
        this.setState({NewArray:''})
        let Array = [...this.state.NewArray];
        for(var i=0; i<this.state.ArrayData.length; i++){
           
            if(this.state.ArrayData[i].id==id){  
                console.log('match')     
                var eachItem = {
                    "id": this.state.ArrayData[i].id,
                    "VehName": this.state.ArrayData[i].VehName,
                    "CustomerName": this.state.ArrayData[i].CustomerName,
                    "Mobile": this.state.ArrayData[i].Mobile,
                    "Address": this.state.ArrayData[i].Address,
                    "VehDetails": this.state.ArrayData[i].VehDetails,
                    "Comment":this.state.ArrayData[i].Comment,
                    "Date": this.state.ArrayData[i].Date,
                    "Time": this.state.ArrayData[i].Time,
                    "Status": 'Canceled'
                  };
        
            
                 Array.push(eachItem);
            }else{
                console.log('not match')   
                Array.push(this.state.ArrayData[i])
            }
            
          
           
        }
          var array1 = JSON.stringify(Array);
            AsyncStorage.setItem(
                'ArrayData',
                array1
            );
        alert('Sucessfully canceled')
    }

    render() {
        return (

            <ScrollView style={styles.container}>
                <View style={styles.TopBar}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} style={{backgroundColor:'#1073cb',marginRight:20}} ><Text style={{fontSize:30,color:'#FFC300',paddingLeft:5,paddingRight:5}}>{this.state.Goback}</Text></TouchableOpacity>
                    <Text style={styles.TextHeading}>Search Reservation</Text>
                </View>

                <View style={styles.LogoContainer}>
                    <View style={styles.ButtonContainer}>
                        <View style={styles.content}>
                            <TextInput style={styles.textField}
                                label="Customer Mobile"
                                placeholder={'Enter Customer Mobile Number'}
                                onChangeText={PhoneNumber => this.setState({ PhoneNumber })}
                                placeholderTextColor="#FFC300"
                            ></TextInput>
                        </View>
                    </View>

                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity style={styles.ButtonTouchable2}
                             onPress={this.SearchData.bind(this)}
                           >
                            <Text style={styles.ButtonText} >Search Reservation</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                    extraData={this.state}
                    style={{marginTop:10}}
                    data={this.state.GotDate}
                    renderItem={({item})=>(
                    <View style={{justifyContent:'center',margin:20, width:'90%'}}>

                    <CardView
                        cardElevation={7}
                        cardMaxElevation={7}
                        cornerRadius={5}>

                        <Text style={{padding:5,paddingLeft:20, fontSize: 20, fontWeight: "bold",}}>
                        Booking Details
                        </Text>
                        <Text style={{padding:5,paddingLeft:20}}>
                        Vehicle Number: {item.VehName}
                        </Text>
                        <Text style={{padding:5,paddingLeft:20}}>
                        Customer Name: {item.CustomerName}
                        </Text>
                        <Text style={{padding:5,paddingLeft:20}}>
                        Vehicle Details: {item.VehDetails}
                        </Text>
                        <Text style={{padding:5,paddingLeft:20}}>
                        Reservation Time:{item.Time}
                        </Text>
                        <Text style={{padding:5,paddingLeft:20}}>
                        Reservation Date: {item.Date}
                        </Text>
                        <Text style={{padding:5,paddingLeft:20}}>
                        Reservation Status: {item.Status}
                        </Text>
                        <Text style={{padding:5,paddingLeft:20}}>
                        Customer Number: {item.Mobile}
                        </Text>
                        <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={this.Edit.bind(this,item.id)} style={styles.EditButton}><Text style={{padding:10,color:'#FFFF'}}>Edit</Text></TouchableOpacity>
                        <TouchableOpacity onPress={this.cancel.bind(this,item.id)} style={styles.EditButton2}><Text style={{padding:10,color:'#FFFF'}}>Cancel</Text></TouchableOpacity>
                        </View>


                    </CardView>
                    
                    </View>
                    )}
                    />

                   


                </View>
                {this.state.isLoadingg ? 
                    <View  style={styles.loadingContainer}>
                    <ActivityIndicator  size="large" color="#0000ff" style={styles.loader}/>
                      <Text style={styles.LoaderText}>Please wait..</Text>
                    </View>:null
                    }
               
            </ScrollView>
        );
    }
}



const styles = StyleSheet.create({
    EditButton:{
        flex:.5,
        backgroundColor:'#5dc261',
        color:'#FFFF',
        justifyContent:'center',
        alignItems:'center',
        margin:5,
       
    },
    EditButton2:{
        flex:.5,
        backgroundColor:'red',
        color:'#FFFF',
        justifyContent:'center',
        alignItems:'center',
        margin:5,
       
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    TopBar: {
        height: 100,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#1073cb',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        alignItems: 'center',
        justifyContent: 'center',

    },
    TextHeading: {
        fontSize: 25,
        fontWeight: "bold",
        height: 30,
        color:"#fff"
    },
    LogoContainer: {
        width: '100%',
        marginTop: 30,
    },
    logo: {
        width: '60%',
        height: 200,
    }, ButtonTouchable: {
        backgroundColor: 'black',
        paddingVertical: 10,
        alignItems: "center",
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 30,
        borderColor: 'black',
        borderWidth: 4,

    },
    ButtonTouchable2: {
        backgroundColor: '#1073cb',
        paddingVertical: 10,
        alignItems: "center",
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 30,
        borderColor: '#1073cb',
        borderWidth: 4,
        marginTop:20,


    },
    textField: {
        color: '#FFC300',
        fontSize: 20,
        width: '100%',
        padding: 10,
        paddingLeft: 30,
    },
    ButtonText: {
        color: 'white',
        fontSize: 20,
        paddingVertical: 5
    },
    DatePickerContainer: {
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20,

    },
    PvStyle: {
        width: "80%",
        backgroundColor: 'black',
        color: '#FFFF'
    },LoaderText:{
        fontSize:30,
        color:'#FFFF',
        elevation:200,
        padding:20,
        justifyContent:'center',
        alignSelf:'center'
    },
    loadingContainer:{
        width:'80%',
        height:'100%',
        borderRadius:20,
        flexDirection:'column',
        backgroundColor:'rgba(52, 52, 52, 0.6)',
        shadowColor: 'black',
        position:'absolute',
        alignSelf:'center'
    },
    loader:{
        marginTop:150,
        width:20,
        height:20,
        elevation:20,

        alignSelf:'center'
    },
    ErrorMassageStyle:{
        color:'#FF0000',
        paddingLeft:40,
        paddingTop:5,
        fontSize:18,

    },
    content: {
        marginLeft:20,
        marginRight:20
    },

});

// import React, { useState } from "react";

