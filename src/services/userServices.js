/******************************************************************************
 *  @Purpose        : To create user services that will send the incoming data 
                    to server and save that data to database and at login, reset
                    password, forgotpassword time fetching correct information 
                    from database.
 *  @file           : userServices.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 ******************************************************************************/
import axios from 'axios';
/**
 * @description:
 * @param {*send login data to server} data 
 */
export function userLogin(data) {
    return axios.post('/login', data);
}