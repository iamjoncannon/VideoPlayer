import React, { Component } from 'react';

import axios from 'axios'

export default class StateManager extends Component {

  constructor(props){

    super(props)

    this.state = {

      selectScreen : {
        chosenProgram : null,
        remoteProgramData: null,
        selectedProgram: 1, 
      },
      
      videoPlayer : {
        currentTime: 0,
        rate: 1,
        volume: 1,
        muted: false,
        resizeMode: 'contain',
        duration: 0.0,
        currentTime: 0.0,
        controls: false,
        paused: false,
        skin: 'custom',
        ignoreSilentSwitch: null, 
        isBuffering: false,
        scene: null,
        loaded: false,
        isPrompting: false,
        sceneIndex: 0
      }
    }
  }

  async componentDidMount(){

    // get the remote program data

    let local = 'http://localhost:3000/programData.json'
    let remote = 'https://appletvappiamjoncannon.s3-us-west-2.amazonaws.com/programData.json'
    
    let  data  

    try {

      data = await axios.get(local)

    }
    catch(error){
      
      console.log(error)
    }

    this.setState(prevState =>{

      return {
        ...prevState,
        selectScreen: {
      
          ...prevState.selectScreen,
          remoteProgramData : data.data
        }
      }
    })
  }

  programSelectHandler = async (id) => {

    // get the selected program's logic tree data 

    let { remoteProgramData } = this.state.selectScreen

    let { data } = await axios.get(remoteProgramData[String(id)].dataURL)

    remoteProgramData[String(id)].logicTree = data

    this.setState(prevState =>{

      return {
        ...prevState,
        selectScreen: {
      
          ...prevState.selectScreen,
          chosenProgram: remoteProgramData[String(id)]
        }
      }
    })
  }

  programHighlightHandler = (id) => {

    this.setState(prevState =>{

      return {
        ...prevState,
        selectScreen: {
      
          ...prevState.selectScreen,
          selectedProgram : id
        }
      }
    })

  }

  onVideoProgress = (data) => {

    let { currentTime } = this.state.videoPlayer

    currentTime = String(Math.round(currentTime))

    let { timeIdx } =  this.state.selectScreen.chosenProgram.logicTree

    if(timeIdx.includes(currentTime)){

      this.setState(prevState =>{

        return {
          ...prevState,
          videoPlayer: {
        
            ...prevState.videoPlayer,
            paused : true, 
            isPrompting : true,
            sceneIndex : currentTime
          }
        }
      })

    }
    else{

      this.setState(prevState =>{

        return {
          ...prevState,
          videoPlayer: {
        
            ...prevState.videoPlayer,
            currentTime: data.currentTime
          }
        }
      })
    }
  }

  onVideoPlayPause = () => {

   this.setState(prevState =>{

      return {
        ...prevState,
        videoPlayer: {
      
          ...prevState.videoPlayer,
          paused : !prevState.videoPlayer.paused
        }
      }
    })

  }

  selectScene = (timeIdx) => {

    console.log(timeIdx)

    this.setState(prevState =>{

      return {
        ...prevState,

        videoPlayer: {
      
          ...prevState.videoPlayer,
          currentTime: timeIdx, 
          isPrompting: false, 
          paused: false
        }
      }
    })
  }

  render(){

    return (

      this.props.renderProps(this) 
    )  
  }

}

