import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import KeyFob  from '../components/KeyFob/KeyFob';
import Login from "../components/Login/Login";
import Manual from '../components/Manual/Manual';

export const Router = StackNavigator({
    Login: {
        screen: Login
    },
    KeyFob: {
        screen: KeyFob
    },
    Manual: {
        screen: Manual
    },
    

});
