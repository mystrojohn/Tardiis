/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TimerMixin from 'react-timer-mixin';

//type Props = {};
const Props = {};
var view1, view2;
//export default class KeyFob extends Component<Props> {
export default class KeyFob extends Component {

    constructor(props) {
      super(props);

      this.state = {
        lockDisabled: false,
        unlockDisabled: false,
        token: '',
        status: '',
        inProgress: false,
        completed: false,
        lockInProgress: false,
        unlockInProgress: false,
        lockCompleted: false,
        unlockCompleted: false,
        postRes: '',
        isLoading: false
      };

      // this.setLock = this.setLock.bind(this);
      // this.setUnLock = this.setUnLock.bind(this);

    }

    static navigationOptions = { header: null }    
    componentDidMount = () => {
      this.setState({
        unlockDisabled: false,
        lockDisabled: true,
        lockInProgress: false,
        unlockInProgress: false,
        lockCompleted: true,
        unlockCompleted: false,
        isLoading: true,
      });
      return fetch('http://192.168.111.1:3000/keyfob',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'access_token',
        },
        body: JSON.stringify({ type: 'LOCK' }) // or { type: 'UNLOCK' }
      })
        .then((response) => response)
        .then((responseJson) => {
          this.setState({ postRes: responseJson, isLoading: true});

        })
        .catch((error) =>{
          console.error(error);
        });
    };


    setLock = () => {
      this.setState({
        lockInProgress: true,
        unlockInProgress: false,
        lockCompleted: false,
        unlockCompleted: false,
        isLoading: true,
      });
      this.setPostLock();
      setTimeout( () => { 
        this.getLockStatus();
//        this.callViews();
      }, 300); 

    }    
      
    setPostLock = () => {
      return fetch('http://192.168.111.1:3000/keyfob',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'access_token',
        },
        body: JSON.stringify({ type: 'LOCK' }) // or { type: 'UNLOCK' }
      })
        .then((response) => response)
        .then((responseData) => {
          this.setState({ postRes: responseData, isLoading: true});

        })
        .catch((error) =>{
          console.error(error);
        });
    };

    getLockStatus = () => {
      return fetch('http://192.168.111.1:3000/keyfob?type=LOCK',{
          method: 'GET',
          headers: {
            Authorization: 'access_token'
          }
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status === "in_progress") {
              this.setState({completed: false, lockCompleted: false});
              this.setState({inProgress: true, lockInProgress: true, isLoading: true});
            } else {
              this.setState({completed: true, lockCompleted: true});
              this.setState({inProgress: false, lockInProgress: false, isLoading: false});
            }    
          })
          .catch((error) =>{
            console.error(error);
          });
          
    }    


    setUnLock = () => {
      this.setState({
        lockInProgress: false,
        unlockInProgress: true,
        lockCompleted: false,
        unlockCompleted: false,
        isLoading: true,
      });
      this.setPostUnLock();
      setTimeout( () => { 
        this.getUnLockStatus();
      }, 300);
   
    }



    setPostUnLock = () => {
      this.setState({inProgress: true, unlockInProgress: true, isLoading: true});
      return fetch('http://192.168.111.1:3000/keyfob',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'access_token',
        },
        body: JSON.stringify({ type: 'UNLOCK' }) // or { type: 'UNLOCK' }
      })
        .then((response) => response)
        .then((responseData) => {
          this.setState({ postRes: responseData, unlockInProgress: true ,isLoading: true});

        })
        .catch((error) =>{
          console.error(error);
        });
          
    }



    getUnLockStatus = () => {
      return fetch('http://192.168.111.1:3000/keyfob?type=UNLOCK',{
          method: 'GET',
          headers: {
            Authorization: 'access_token'
          }
        })
          .then((response) => response.json())
          .then((responseJson) => {

            if (responseJson.status === "in_progress") {
              this.setState({completed: false, unlockCompleted: false});
              this.setState({inProgress: true, unlockInProgress: true, isLoading: true});
            } else {
              this.setState({completed: true, unlockCompleted: true});
              this.setState({inProgress: false, unlockInProgress: false, isLoading: false});
            }    
          })
          .catch((error) =>{
            console.error(error);
          });
    }    


    callManual = () => {
      this.props.navigation.navigate('Manual');      
    }  
    


    render() {
      let view = this.state.inProgress  ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5Fcff' }}>
            <ActivityIndicator animating={true} color="#00f0ff" size="large" style={{ opacity: this.state.inProgress ? 1 : 0 }}   />
            <Text style={{ marginTop: 8 }} children="Processing ............." />
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5Fcff' }}>
              <Text style={{ marginTop: 8 }} children="" />
        </View>

      )

        let view1 = this.state.lockInProgress  ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5Fcff' }}>
              <ActivityIndicator animating={true} color="#ed000a" size="large" style={{ opacity: this.state.isLoading ? 1 : 0 }}   />
            <Text style={{ marginTop: 8 }} children="Lock In progress..." />
          </View>
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5Fcff' }}>
              <Text style={{ marginTop: 8 }} children= {this.state.lockCompleted ? "Lock successful" : ""} />
          </View>

        )

      let view2 = this.state.unlockInProgress  ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5Fcff' }}>
            <ActivityIndicator animating={true} color="#ed000a" size="large" style={{ opacity: this.state.isLoading ? 1 : 0 }}   />
          <Text style={{ marginTop: 8 }} children="Unlock In progress..." />
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5Fcff' }}>
            <Text style={{ marginTop: 8 }} children= {this.state.unlockCompleted ? "UnLock successful" : ""} />
        </View>

      )

      return (

      <View style={styles.container}>
          <View style={styles.navBar}>
          <TouchableHighlight
            style={styles.button1}
            onPress={() => {this.callManual();}}
            underlayColor={'#b9ccee'}>
          <Image
              style={{width: 35, height: 30, borderRadius: 25}}
              source={require('../../images/manual.png')} />
          </TouchableHighlight>
          </View>
          <View style={styles.body}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => {this.setLock();}}
//            disabled={this.state.lockDisabled}
            underlayColor={'#b9ccee'}>
            <Image
              style={styles.image}
              source={require('./img/lock.png')} />
          </TouchableHighlight>
          <View
                    style={{width: 300, height: 70, backgroundColor: '#f5Fcff' }}
                    padder={false}>
                        {view1}
          </View>

          <View style={{ height: 88 }} />
          <TouchableHighlight
            style={styles.button}
            onPress={() => {this.setUnLock();}}
//            disabled={this.state.unlockDisabled}
            underlayColor={'#b9ccee'}>
            <Image
              style={styles.image}
              source={require('./img/unlock.png')} />
          </TouchableHighlight>
          <View
                    style={{width: 300, height: 70, backgroundColor: '#f5Fcff' }}
                    padder={false}>
                    {view2}
          </View>
          {/* <View
                    style={{width: 100, height: 70, marginTop: 15, backgroundColor: '#f5Fcff' }}
                    padder={false}>
                        {view}
          </View> */}

        <View style={styles.tabBar}>
        </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderWidth: 4,
    borderColor: '#27467f',
    borderRadius: 100,
    height: 100,
    justifyContent: 'center',
    padding: 8,
    width: 100,
  },
  button1: {
    alignItems: 'center',
    backgroundColor: 'red',
    borderWidth: 4,
    borderColor: 'red',
    borderRadius: 100,
    height: 30,
    justifyContent: 'center',
    padding: 8,
    width: 30,
  },
  container: {
    flex: 1
  },
  image: {
    tintColor: '#5e81bc'
  },
  navBar: {
    height: 55,
    backgroundColor: 'red',
    elevation: 3,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5Fcff',
    justifyContent: 'center',
  },
  tabBar: { 
    backgroundColor: 'red',
    height: 60
  }
});
