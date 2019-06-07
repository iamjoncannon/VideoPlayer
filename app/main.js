import React from 'react'
import { render } from 'react-dom'
import WebApp from './components/webAppRoot'
import StateManager from './components/StateManager'

const Root = () => (

  <StateManager renderProps={ state =>(

      <WebApp rootState={ state } />
    )
  }/>
)

render(

   <Root />,
  document.getElementById('root')
);