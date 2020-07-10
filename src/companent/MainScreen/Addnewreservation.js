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






export default class Addnewreservation extends Component {
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
            isLoadingg: false,
            Goback:'<<',
        }
    }
    async componentWillMount() {
        this.setState({ isLoadingg: true })
        await AsyncStorage.getItem('ArrayData', (err, result) => {
            if (result != null) {
                var obj = JSON.parse(result);
                this.setState({ ArrayData: obj })
                console.log(obj)
                
            }
        });
        this.setState({ isLoadingg: false })
    }

    InsertDate() {
        if (this.state.VehNumber != '' && this.state.CusName != '' && this.state.CusMob != '' && this.state.CusAdd != '' && this.state.VehDetails != ''
            && this.state.Comments != '') {
            this.setState({ isLoadingg: true })
            var timestamp = new Date().getTime();
            var code1 = Math.floor((Math.random() * 5) + 1);
            var code2 = Math.floor((Math.random() * 5) + 1);
            var code3 = Math.floor((Math.random() * 5) + 1);
            var code4 = Math.floor((Math.random() * 5) + 1);
            var code = timestamp + "" + code1 + "" + code2 + "" + code3 + "" + code4;
            var book = false;
            AsyncStorage.getItem('ArrayData', (err, result) => {
                if (result != null) {
                    var obj = JSON.parse(result);
                    this.setState({ ArrayData: obj })
                    console.log(obj)
                }
            });
            for (var i = 0; i < this.state.ArrayData.length; i++) {
                if (this.state.ArrayData[i].Date == this.state.date && this.state.ArrayData[i].Time == this.state.choosenLabel) {
                    book = true;
                }
            }
            if (book == false) {
                var eachItem = {
                    "id": code,
                    "VehName": this.state.VehNumber,
                    "CustomerName": this.state.CusName,
                    "Mobile": this.state.CusMob,
                    "Address": this.state.CusAdd,
                    "VehDetails": this.state.VehDetails,
                    "Comment": this.state.Comments,
                    "Date": this.state.date,
                    "Time": this.state.choosenLabel,
                    "Status": 'Active'
                };

                console.log(eachItem)
                let Array = [...this.state.ArrayData];
                Array.push(eachItem);
                var array1 = JSON.stringify(Array);
                AsyncStorage.setItem(
                    'ArrayData',
                    array1
                );
                this.setState({ isLoadingg: false })
                alert('Data has been inserted sucessfully.')
                this.props.navigation.goBack(null)
            } else {
                alert('Same time is already booked at this date!');
            }
        } else {
            alert('All fields are required please fill them');
        }


    }

    render() {
        return (

            <ScrollView style={styles.container}>
                <View style={styles.TopBar}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} style={{backgroundColor:'#1073cb',marginRight:20}} ><Text style={{fontSize:30,color:'#FFC300',paddingLeft:5,paddingRight:5}}>{this.state.Goback}</Text></TouchableOpacity>
                    <Text style={styles.TextHeading}>New Reservation</Text>
                </View>

                <View style={styles.LogoContainer}>
                    <View style={styles.ButtonContainer}>
                        <View style={styles.content}>
                            <TextInput style={styles.textField}
                                label="Vehical Number"
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
                                <Picker.Item label="9:00 am - 10:00 am" value="9:00 Am - 10:00 Am" />
                                <Picker.Item label="10:00 am - 11:00 am" value="10:00 Am - 11:00 Am" />
                                <Picker.Item label="11:00 am - 12:00 pm" value="11:00 Am - 12:00 Pm" />
                                <Picker.Item label="12:00 pm - 1:00 pm" value="12:00 Pm - 1:00 Pm" />
                                <Picker.Item label="1:00 pm - 2:00 pm" value="1:00 Pm - 2:00 Pm" />
                                <Picker.Item label="2:00 pm - 3:00 pm" value="2:00 Pm - 3:00 Pm" />
                                <Picker.Item label="3:00 pm - 4:00 pm" value="3:00 Pm - 4:00 Pm" />

                            </Picker>
                        </View>
                    </View>

                    <View style={styles.ButtonContainer}>
                        <View style={styles.content}>
                            <TextInput style={styles.textField}
                                label="Customer Address"
                                placeholder={'Customer Address'}
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
                                onChangeText={Comments => this.setState({ Comments })}
                                placeholderTextColor="#FFC300"
                            ></TextInput>
                        </View>
                    </View>

                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity style={styles.ButtonTouchable2}
                            onPress={this.InsertDate.bind(this)}>
                            <Text style={styles.ButtonText} >Reserve</Text>
                        </TouchableOpacity>
                    </View>



                    {this.state.isLoadingg ?
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
                            <Text style={styles.LoaderText}>Please wait..</Text>
                        </View> : null
                    }

                </View>
            </ScrollView>


        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        color:"#fff"

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
    LoaderText: {
        fontSize: 30,
        color: '#FFFF',
        elevation: 200,
        padding: 20,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    loadingContainer: {
        width: '80%',
        height: '40%',
        borderRadius: 20,
        flexDirection: 'column',
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
        shadowColor: 'black',
        position: 'absolute',
        alignSelf: 'center'
    },
    loader: {
        marginTop: 150,
        width: 20,
        height: 20,
        elevation: 20,

        alignSelf: 'center'
    },
    ErrorMassageStyle: {
        color: '#FF0000',
        paddingLeft: 40,
        paddingTop: 5,
        fontSize: 18,
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