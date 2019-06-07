import React from 'react';

const IndividualSelection = (props) => {

	console.log(props)

	return (

		<div 
			onClick={() => props.programSelectHandler(props.id)} 
			// style={styles().eachScreen}
			// activeOpacity={ 1 }
			// underlayColor={'white'}
	  //       onShowUnderlay={(x)=>props.programHighlightHandler(props.id)}
	  //       hasTVPreferredFocus={false}
	  //       tvParallaxProperties={ { enabled: true, magnification: 1.8}}
		>
			<img
	          style={{width: '20vh', height: '20vh', padding: '20px'}}
	          src={props.thumbURL} 

	          // resizeMode={'cover'}
	        />
			
		</div>
	)
}

const EntireView = (props) => {

	console.log(props)

	const { remoteProgramData, selectedProgram } = props.state

	const Screens = Object.entries(remoteProgramData).map((program, i) => {

			return (
				<IndividualSelection 
						key={program[0]} 
						id={program[0]} 
						title={program[1].title}
						thumbURL={program[1].thumbURL} 
						programSelectHandler={props.programSelectHandler}
						programHighlightHandler={props.programHighlightHandler}
				/>
				
			)
		})

	const current_background = remoteProgramData[selectedProgram].thumbURL

		return (
			<div>
				<div style={{zIndex: 1, marginTop: '40%'}}>

					<div style={{marginLeft: '30%'}}> Choose a Challenge </div>
					<div style={{display: 'flex', flexDirection: 'row'}}> {Screens} </div>
				</div>
				<div className={'bg'} style={{ zIndex: '-1', backgroundImage: `url(${current_background})`}} >
				</div>
			</div>
		)	
}

export default EntireView

