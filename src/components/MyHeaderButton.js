import React from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
    HeaderButton
} from 'react-navigation-header-buttons';

const MyHeaderButton = (props) => {
    return (

        <HeaderButton IconComponent={MaterialIcons} iconSize={25} color='#fdcb6e' {...props} />

    );
}

const styles = StyleSheet.create({})

export default MyHeaderButton;
