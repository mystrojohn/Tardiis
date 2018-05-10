/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import CryptoJS from "crypto-js";
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

//type Props = {};
const Props = {};


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', access_token: '', token: '', isLoading: false};
  }

  static navigationOptions = { header: null };

  onLogin = () => {
    this.setState({isLoading: true});
    //

    // var header = {
    //   "client_id": "client_id",
    //   "username": "username",
    //   "password": "password"};
    var encodedHeader = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnRfaWQiOiJjbGllbnRfaWQiLCJ1c2VybmFtZSI6InVzZXJuYW1lIiwicGFzc3dvcmQiOiJwYXNzd29yZCJ9.Apw1vCdXsn5pvle-jIsjvf5i-NOW2bGp3BfuPR-gZWc';

//    var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
//    alert(stringifiedHeader);
//    var stringifiedHeaderU = CryptoJS.enc.Utf8.parse(JSON.stringify({ username: 'username' }));
//    var stringifiedHeaderP = CryptoJS.enc.Utf8.parse(JSON.stringify({ password: 'password'}));
//    var str = { stringifiedHeaderC + stringifiedHeaderU + stringifiedHeaderP };
//    var encodedHeader = CryptoJS.enc.Base64.stringify(stringifiedHeader);
    
//    alert(encodedHeader);  
//    this.props.navigation.navigate('KeyFob');
    return fetch('http://192.168.111.1:3000/login',{
      method: 'POST',
         header: {
        //  client_id: "client_id",
        //  username: "username",
        //  password: "password",
          'Authorization': 'access_token',
         },
      // headers: {
      //   "Accept-Encoding": "gzip, deflate",
      //   'Accept': 'application/text',
      //   'Content-Type': 'application/text'
      // },
      body: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnRfaWQiOiJjbGllbnRfaWQiLCJ1c2VybmFtZSI6InVzZXJuYW1lIiwicGFzc3dvcmQiOiJwYXNzd29yZCJ9.Apw1vCdXsn5pvle-jIsjvf5i-NOW2bGp3BfuPR-gZWc'
    })  
      .then((response) => response)
      .then((responseData) => {

        this.setState({ token: responseData.token, isLoading: false});
         if (true) {
           return this.props.navigation.navigate('KeyFob');
         }  
        })
      .catch((error) =>{
        console.error(error);
      });


    };



  render() {
          
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('./img/tardis.png')} />
        <View style={styles.rowContainer}>
          <TextInput
            style={styles.textField}
            placeholder={'username'}
            onChangeText={(text) => {this.setState((previous) => ({...previous, username: text}))}}
          />
        </View>
        <View style={styles.rowContainer}>
          <TextInput
            style={styles.textField}
            placeholder={'password'}
            onChangeText={(text) => {this.setState((previous) => ({...previous, password: text}))}}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.submit}
            onPress={() => {this.onLogin();}}
            disabled={false}>
            <Text style={styles.text}>Submit</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, width: 50, height: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5Fcff' }}>
          <ActivityIndicator animating={true} color="#00f0ff" size="large" style={{ opacity: this.state.isLoading ? 1 : 0 }}   />
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledSubmit: {
    alignItems: 'center',
    backgroundColor: '#b9ccee',
    borderRadius: 4,
    flex: 1,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    marginLeft: 44,
    marginRight: 44,
    marginTop: 12,
  },
  image: {
    height: 240,
    marginBottom: 44,
    marginTop: 2,
    resizeMode: Image.resizeMode.contain,
    width: 240,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  submit: {
    alignItems: 'center',
    backgroundColor: '#5e81bc',
    borderRadius: 4,
    flex: 1,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    marginLeft: 44,
    marginRight: 44,
    marginTop: 12,
  },
  text: {
    color: 'white'
  },
  textField: {
    borderColor: 'black',
    borderWidth: 0.5,
    flex: 1,
    marginLeft: 44,
    marginRight: 44,
    marginTop: 12,
    padding: 10,
  },
});
