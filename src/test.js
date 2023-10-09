import React, { useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

const UserContext = React.createContext();

export const UserStore = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [email, setEmail] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userRole, setUserRole] = useState(null);

    const login = (email, password) => {
        axios
            .post(`http://192.168.1.3:8000/api/v1/users/login`, {
                email: email,
                password: password
            })
            .then(result => {
                console.log(result.data);
                loginUserSuccessful(
                    result.data.token,
                    email,
                    result.data.user.name,
                    result.data.user.role
                );
            })
            .catch(err => {
                loginFailed(err.message);
            });
    };

    const signUp = (name, email, password) => {
        axios
            .post(`http://192.168.1.3:8000/api/v1/users/register`, {
                name: name,
                email: email,
                password: password,
                role: "admin"
            })
            .then(result => {
                console.log(result.data);
                loginUserSuccessful(result.data.token, email, name, "admin"
                );
            })
            .catch(err => {
                loginFailed(err.message);
            });
    };

    const loginFailed = error => {
        console.log(error);
        setIsLoggedIn(false);
        setEmail(null);
        setUserName(null);
        setUserRole(null);
    };

    const loginUserSuccessful = (token, email, userName, userRole) => {
        setToken(token);
        setEmail(email);
        setUserName(userName);
        setUserRole(userRole);

        AsyncStorage.setItem("user_token", token)
            .then(result => {
                console.log("Бүртгэл амжилттай боллоо. токенийг хадгаллаа..");
                setIsLoggedIn(true);
            })
            .catch(err => {
                console.log("Токен хадгалж чадсангүй. Шалтгаан :" + err.message);
            });
    };

    return (
        <UserContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                token,
                setToken,
                login,
                userRole,
                userName,
                email,
                signUp
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;