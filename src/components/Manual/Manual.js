/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
  View,
  Text,
  FlatList
} from 'react-native';
import { List, ListItem } from "react-native-elements";
import LinearGradient from 'react-native-linear-gradient'
//import data from '../../../server/manual/index.json';

//import { ManualItems } from "../ManualItems";

//type Props = {};
const Props = {};


//export default class KeyFob extends Component<Props> {
export default class Manual extends Component {

  constructor(props) {
    super(props);

    this.state = {
        key: '',
        data: [],
    }
}

componentDidMount() {
  fetch('http://192.168.111.1:3000/manual/index.json')
  .then(res => res.json())
  .then(res => {
      this.setState({data: res }, () => {
         console.log(this.state.data);
      })
  })
  .catch ((error) => {
      console.log(error);
  });
}  

//    static navigationOptions = { header: null }    
    render() {

      return (
        <View style={styles.container}>


            <List style={styles.list}>
                <FlatList 
                  data={this.state.data}
                  renderItem={({ item }) => 
                    <View style={styles.descDetails}>
                    <Image 
                      style={styles.image}
                      source={{uri: item.image}} />
                    <Text>{item.title} style={styles.title}</Text>
                    <Text>{item.description} style={styles.desc}</Text>
                    </View>                     
                  }
                  keyExtractor={ item => item.title}  
                />
            </List>
        </View>
    )
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
  container: {
    flex: 1,
    backgroundColor: 'blue',
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom: 10
  },
  list: {
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderWidth: 14,
    borderColor: '#27467f',
    borderRadius: 100,
    height: 100,
    justifyContent: 'center',
    paddingLeft: 18,
    paddingRight: 18,
    width: 100,

  },
  image: {
    tintColor: '#5e81bc',
    width: 100,
    height: 100
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
  descDetails: {
    paddingHorizontal: 15,
    paddingTop: 15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  title: {
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'center',

  },
  desc: {
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    
  }
});
