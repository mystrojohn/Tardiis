/**
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Login  from "./components/Login/Login";
import { Router }  from './config/Router';

//type Props = {};
const Props = {};

//export default class App extends Component<Props> {
export default class App extends Component {
  render() {
    return (
      <Router />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
