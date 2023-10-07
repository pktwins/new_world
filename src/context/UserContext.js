import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../screens/HomeScreen';

// export default React.createContext();

const UserContext = React.createContext();

export const UserState = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState("");
    const [userName, setUserName] = useState(null);
    const [email, setEmail] = useState(null);
    const [userRole, setUserRole] = useState(null);

    const login = (email, password, navigation) => {
        axios.post(
            `http://192.168.1.3:8000/api/v1/users/login`, {
            "email": email,
            "password": password
        })
            .then(result => {
                console.log(result.data);
                setEmail(email);
                setToken(result.data.token);
                setUserName(result.data.name);
                setUserRole(result.data.role);
                AsyncStorage.setItem('user_token', result.data.token)
                    .then(result => {
                        console.log('Login has been done!!!. Token has been stored as successfully');
                        navigation.navigate('Home');
                        setIsLoggedIn(true);
                    })
                    .catch(err => {
                        console.log("token could not been stored..." + err.message);
                    });
            }).catch(error => {
                console.log(error.response);
                setIsLoggedIn(false);
                setEmail(null);
                setToken(null);
                setUserName(null);
                setUserRole(null);
            });
    }
    return (
        <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, token, setToken, login, userName, setUserName, email, setEmail, userRole, setUserRole }}>
            {props.children}
            {/* <childrenComponent/> */}
        </UserContext.Provider>
    )
}

export default UserContext;
