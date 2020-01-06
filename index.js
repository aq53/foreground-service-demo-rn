import { AppRegistry } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import { setHeartBeat, store } from './store';
import axios from 'axios';
import Heartbeat from './Heartbeat';



const url = "http://c1634b38.ngrok.io";
const testApi = ()=>{
  return new Promise((resolve,reject)=>{
      axios.post(`${url}/test`,{data:'abc'}).then(res=>{
          console.log('res:',res)
          Heartbeat.stopService()
          resolve(res);
      }).catch(err=>{
          console.log('err:',err)
          reject(err);
      })
  })
}


const MyHeadlessTask = async () => {
  console.log('Receiving HeartBeat!');
  testApi();
  // store.dispatch(setHeartBeat(true));
  // setTimeout(() => {
  //   store.dispatch(setHeartBeat(false));
  // }, 1000);
};

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);


AppRegistry.registerHeadlessTask('Heartbeat', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => RNRedux);
