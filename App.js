import React from 'react';
import { StyleSheet, Text, View, AppState,
       TouchableOpacity, Platform, ToastAndroid,
        Clipboard, Image, Slider } from 'react-native';
import {Constants, Speech } from 'expo'

const SPEECH = "addadfddaf"

export default class App extends React.Component {

  constructor(){
    super()
    this.state = {
      text:"Stripe uses conventional HTTP response codes to indicate the success or failure of an API request",
      appState: AppState.currentState
      
    }
  }

render() {
    return (
      <View  style={styles.container}>
          <View style={{flexDirection:'row',flex:0, alignItems:'center',justifyContent:'center',height:20}}>
            <Text color='white' style={{fontSize:18, color:'white'}}>Pitch</Text>
            
          </View>
          
         <TouchableOpacity
         style={styles.button}
         onPress={this.onSpeak}>
         <Image
          style={{width: 50, height: 50}}
          source={require('./assets/speak.png')}
        />
       </TouchableOpacity>
       <TouchableOpacity
         style={styles.button} 
         onPress={this.onPause}
         
       >
         <Image
          style={{width: 50, height: 50}}
          source={require('./assets/pause.png')}
        />
       </TouchableOpacity>
       <TouchableOpacity
         style={styles.button}
         onPress={this.onResume}
       >
         <Image
          style={{width: 50, height: 50}}
          source={require('./assets/resume.png')}
        />
       </TouchableOpacity>
       <TouchableOpacity
         style={styles.button}
         onPress={this.onStop}
       >
         <Image
          style={{width: 50, height: 50}}
          source={require('./assets/stop.png')}
        />
       </TouchableOpacity>

      

      </View>
    );
  }

  
  readFromClipboard = async () => {   
    const clipboardContent = await Clipboard.getString();   
    this.setState({ text: clipboardContent }); 
  };

onSpeak =()=>{
  text =  this.state.text
    const opt = 
      {language: 'en-GB',
      pitch: 1.0,
      rate: 1.0,
      onStart:()=> console.warn("started") ,
      onDone:function(){},
      onStopped:()=> Platform.OS=== 'ios'? alert("Stoped"): ToastAndroid.show("Stopped", ToastAndroid.SHORT),
      onError:()=> ToastAndroid.show("An error occured", ToastAndroid.SHORT)}

    
   
    
    //'Ok  By July 9th i will be done with youth service'
    Speech.speak(text,opt)
}

componentDidMount(){
  AppState.addEventListener( "change", this._handleAppStateChange);
}

_handleAppStateChange = (nextAppState) => {
  if (
    this.state.appState.match(/inactive|background/) &&
    nextAppState === 'active'
  ) {
    this.readFromClipboard()
    this.onSpeak()
  }
  this.setState({appState: nextAppState});
};

componentWillUnmount() {
  AppState.removeEventListener("change", this._handleAppStateChange);
}
  
  onPause(){   
      Platform.OS == 'ios'? Speech.pause():
       ToastAndroid.showWithGravityAndOffset(
        'Pause is not supported on Android OS, Use speak button instead',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,)
    
  }

  onResume(){
    Platform.OS == 'ios'? Speech.resume():
       ToastAndroid.showWithGravityAndOffset(
        'Resume is not supported on Android OS, Use stop instead',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,)
  }

  onStop (){
    Speech.stop();
  }

  isSpeaking(){
    return Speech.isSpeakingAsync();
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop:Constants.statusBarHeight,
    flex: 1,
    
    backgroundColor:'darkgreen',// '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 30,
    margin:5,
    borderRadius: 3
  },
});
