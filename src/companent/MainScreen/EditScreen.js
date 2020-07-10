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
    ActivityIndicator,
    BackHandler,
    Alert
} from 'react-native';


import DatePicker from 'react-native-datepicker'
import { Actions } from 'react-native-router-flux';
import TextInput from 'react-native-material-textinput'



export default class EditScreen extends Component {

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
            ArrayData: '',
            NewArray:'',
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
        for(var i=0; i<this.state.ArrayData.length; i++){
          if(this.state.ArrayData[i].id==this.props.Did){
            this.setState({
                VehNumber:this.state.ArrayData[i].VehName,
                CusName:this.state.ArrayData[i].CustomerName,
                CusMob:this.state.ArrayData[i].Mobile,
                CusAdd:this.state.ArrayData[i].Address,
                VehDetails:this.state.ArrayData[i].VehDetails,
                Comments:this.state.ArrayData[i].Comment,
                date:this.state.ArrayData[i].Date,
                choosenLabel:this.state.ArrayData[i].Time,

            });
          }
        }
        this.setState({isLoadingg:false})
       
        
    }

    Update() {

        this.setState({NewArray:''})
        let Array = [...this.state.NewArray];
        for(var i=0; i<this.state.ArrayData.length; i++){
           
            if(this.state.ArrayData[i].id==this.props.Did){  
                console.log('match')     
                var eachItem = {
                    "id": this.props.Did,
                    "VehName": this.state.VehNumber,
                    "CustomerName": this.state.CusName,
                    "Mobile": this.state.CusMob,
                    "Address": this.state.CusAdd,
                    "VehDetails": this.state.VehDetails,
                    "Comment":this.state.Comments,
                    "Date": this.state.date,
                    "Time": this.state.choosenLabel,
                    "Status": 'Active'
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
            alert('Data has been updated sucessfully');
            this.props.navigation.goBack(null)
       

    }

    render() {
        return (

            <ScrollView style={styles.container}>
                <View style={styles.TopBar}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} style={{backgroundColor:'#1073cb',marginRight:20}} ><Text style={{fontSize:30,color:'#FFC300',paddingLeft:5,paddingRight:5}}>{this.state.Goback}</Text></TouchableOpacity>
                    <Text style={styles.TextHeading}>Edit Reservation</Text>
                </View>

                <View style={styles.LogoContainer}>
                    <View style={styles.ButtonContainer}>
                        <View style={styles.content}>
                            <TextInput style={styles.textField}
                                label="Vehicle Number"
                                value={this.state.VehNumber}
                                placeholder={'Vehical Number'}
                                onChangeText={VehNumber => this.setState({ VehNumber })}
                                placeholderTextColor="#FFC300"
                            ></TextInput>
                        </View>
                    </View>

                    <View style={styles.ButtonContainer}>
                        <View style={styles.content}>
                            <TextInput style={styles.textField}
                                label="Customer Name"
                                value={this.state.CusName}
                                placeholder={'Customer Name'}
                                onChangeText={CusName => this.setState({ CusName })}
                                placeholderTextColor="#FFC300"
                            ></TextInput>
                        </View>
                    </View>

                    <View style={styles.ButtonContainer}>
                        <View style={styles.content}>
                            <TextInput style={styles.textField}
                                label="Customer Mobile"
                                value={this.state.CusMob}
                                placeholder={'Customer Mobile'}
                                onChangeText={CusMob => this.setState({ CusMob })}
                                placeholderTextColor="#FFC300"
                            ></TextInput>
                        </View>

                    </View>
                    <View style={styles.content}>
                        <DatePicker
                            style={{ width: '100%', marginTop:20, marginBottom:25 }}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            // minDate="2016-05-01"
                            // maxDate="2016-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    right: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 0
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />
                    </View>


                    <View>
                        <View style={styles.pickerBoxContainer}>
                            <Picker
                                style={styles.PvStyle}
                                selectedValue={this.state.choosenLabel}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ choosenLabel: itemValue, choosenindex: itemIndex })
                                }>
                                <Picker.Item label="9:00 Am - 10:00 Am" value="9:00 Am - 10:00 Am" />
                                <Picker.Item label="10:00 Am - 11:00 Am" value="10:00 Am - 11:00 Am" />
                                <Picker.Item label="11:00 Am - 12:00 Pm" value="11:00 Am - 12:00 Pm" />
                                <Picker.Item label="12:00 Pm - 1:00 Pm" value="12:00 Pm - 1:00 Pm" />
                                <Picker.Item label="1:00 Pm - 2:00 Pm" value="1:00 Pm - 2:00 Pm" />
                                <Picker.Item label="2:00 Pm - 3:00 Pm" value="2:00 Pm - 3:00 Pm" />
                                <Picker.Item label="3:00 Pm - 4:00 Pm" value="3:00 Pm - 4:00 Pm" />

                            </Picker>
                        </View>
                    </View>

                    <View style={styles.ButtonContainer}>
                        <View style={styles.content}>
                            <TextInput style={styles.textField}
                                label="Customer Address"
                                placeholder={'Customer Address'}
                                 value={this.state.CusAdd}
                                onChangeText={CusAdd => this.setState({ CusAdd })}
                                placeholderTextColor="#FFC300"
                            ></TextInput>
                        </View>
                    </View>

                    <View style={styles.ButtonContainer}>
                        <View style={styles.content}>
                            <TextInput style={styles.textField}
                                label="Vehicle Details"
                                placeholder={'Vehicle Details'}
                                value={this.state.VehDetails}
                                onChangeText={VehDetails => this.setState({ VehDetails })}
                                placeholderTextColor="#FFC300"
                            ></TextInput>
                        </View>
                    </View>

                    <View style={styles.ButtonContainer}>
                         <View style={styles.content}>
                            <TextInput style={styles.textField}
                                label="Comments"
                                placeholder={'Comments'}
                                value={this.state.Comments}
                                onChangeText={Comments => this.setState({ Comments })}
                                placeholderTextColor="#FFC300"
                            ></TextInput>
                        </View>
                    </View>

                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity style={styles.ButtonTouchable2}
                            onPress={this.Update.bind(this)}>
                            <Text style={styles.ButtonText} >Update Reservation</Text>
                        </TouchableOpacity>
                    </View>

                    {this.state.isLoadingg ? 
                    <View  style={styles.loadingContainer}>
                    <ActivityIndicator  size="large" color="#0000ff" style={styles.loader}/>
                      <Text style={styles.LoaderText}>Please wait..</Text>
                    </View>:null
                    }



                </View>
            </ScrollView>
        );
    }
}



const styles = StyleSheet.create({
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
        color: 'white'
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
        width: "90%",
        color: '#000',
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft:20,
        marginRight:20,
        borderWidth: 0.6,
        borderColor: "#000",
        borderRadius: 2,
    },
    LoaderText:{
        fontSize:30,
        color:'#FFFF',
        elevation:200,
        padding:20,
        justifyContent:'center',
        alignSelf:'center'
    },
    loadingContainer:{
        width:'80%',
        height:'40%',
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
    pickerBoxContainer: {
    borderWidth: 0.6,
    borderColor: "#000",
    borderRadius: 2,
    marginLeft:20,
    marginRight:20,
    marginBottom:10
    }

});