'use strict';

import React, {
  Component
} from 'react';

import { Player } from 'video-react';

export default class VideoPlayer extends Component {

  constructor(props) {
    super(props);

  }

  state = {
    loaded: false
  }

  componentDidMount() {
    
    this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  componentWillUnmount() {
    this._disableTVEventHandler();
  }

  selectScene = (timeIdx) =>{

    this.player.seek(timeIdx)
    this.props.selectScene(timeIdx)
  }

  onLoaded = () => {

    this.setState({loaded: true})
  }

  render() {

    // console.log(this.props)

    let { state } = this.props
    
    return (

      <div >

        <div >

          {this.state.loaded === false ? <div style={{fontSize: 30}}> Buffering... </div> : <div></div>}
          <Player 
            ref="player" 
            src={this.props.chosenProgram.videoURL} 

          />
          
        </div>    

        {state.isPrompting ? 

              <Prompt data={this.props.chosenProgram.logicTree[state.sceneIndex]} 
                            selectScene={(x) => this.selectScene(x)}
                    />  : <div></div> 
                }
      </div>    
    );
  }
}

/*   

TimeIndex for the bottom:

<div style={styles.nav.controls}>
      <div style={styles.nav.generalControls}>
        <div style={styles.nav.volumeControl}>
          <div style={styles.nav.controlOption}> {Math.round(this.props.state.currentTime)}</div>
        </div>
      </div>
  </div>

*/

