import React, {Component} from 'react';
import WebAppSelectScreen from './selectScreen'
import WebVideoPlayer from './WebVideoPlayer'

export default class WebAppView extends Component {

	render(){

		// console.log(this.props)

		const { state, onVideoProgress, onVideoPlayPause, selectScene } = this.props.rootState
		
	    if(state.selectScreen.chosenProgram !== null){

	      return (

	          <WebVideoPlayer
	          	state={ state.videoPlayer } 
	          	chosenProgram={ state.selectScreen.chosenProgram }
	          	onVideoProgress={ onVideoProgress }
	          	onVideoPlayPause={ onVideoPlayPause }
	          	selectScene={ selectScene }
	          />			
	      )
	      
	    }
	    else if(state.selectScreen.remoteProgramData !== null){

	      return (

                <WebAppSelectScreen 
                	state={ state.selectScreen } 
                	programSelectHandler={this.props.rootState.programSelectHandler}
                	programHighlightHandler={this.props.rootState.programHighlightHandler}
                />
	      )
	    }
	    else{

	      return (

	          <div style={{flex: 1, justifyContent: 'center', alignItems: 'center', fontSize: 30}}> 
	            Loading.. 
	          </div> 
	      )
	    }    
  }
}