import React, { Component } from 'react';
import{Router ,Stack ,Scene } from 'react-native-router-flux';

import splashPage from './splashPage';
import MainScreen from './MainScreen/MainScreen';
import Addnewreservation from './MainScreen/Addnewreservation';
import Search from './MainScreen/Search'
import EditScreen from './MainScreen/EditScreen'


export default class Routes extends Component{
    render(){
        return(        
                <Router>
                  <Stack key="root" hideNavBar={true}>
                    <Scene key="splashPage" component={splashPage}  title="splashPage"   initial={true}  />
                    <Scene key="mainscreen" component={MainScreen}  title="mainscreen"    />
                    <Scene key="addnewreservation" component={Addnewreservation}  title="addnewreservation"   />
                    <Scene key="search" component={Search}  title="Search"   />
                    <Scene key="search" component={Search}  title="Search"   />
                    <Scene key="edit" component={EditScreen}  title="edit"   />
                  </Stack>
                </Router>              
        )
    }
}