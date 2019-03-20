/*****************************************************************************************************
 *  @Purpose        : 
 *  @file           : .jsx       
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *****************************************************************************************************/
import React, { Component } from 'react';
import clockIcon from '../assets/images/clockIcon.svg'

class ClockIcon extends Component{
    render(){
        return(
            <img src={clockIcon} alt="clockIcon"/>
        )
    }
}
export default ClockIcon;