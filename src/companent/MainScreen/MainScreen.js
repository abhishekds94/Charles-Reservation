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
    BackHandler,
    Alert
} from 'react-native';



import { Actions } from 'react-native-router-flux';



export default class MainScreen extends Component {




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

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    addnew() {
        Actions.addnewreservation();
    }
    search() {
        Actions.search();
    }

    render() {
        return (

            <View style={styles.container}>
                <View style={styles.TopBar}>
                    <Text style={styles.TextHeading}>Charles</Text>
                    <Text style={styles.TextHeading}>Reservation</Text>
                </View>

                <View style={styles.LogoContainer}>
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity style={styles.ButtonTouchable}
                            onPress={this.search}>
                            <Text style={styles.ButtonText}>Search Reservation</Text>
                        </TouchableOpacity>
                    </View>



                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity style={styles.ButtonTouchable}
                            onPress={this.addnew}>
                            <Text style={styles.ButtonText} >New Reservation</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    TopBar: {
        height: 300,
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#1073cb',
        borderBottomLeftRadius: 250,
        borderBottomRightRadius: 250,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [
            { scaleX: 2 }
        ]

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
        backgroundColor: '#0e1724',
        paddingVertical: 10,
        alignItems: "center",
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 30,
        borderColor: '#0e1724',
        borderWidth: 4,

    },
    ButtonText: {
        color: '#fff',
        fontSize: 20,
        paddingVertical: 5
    }

});