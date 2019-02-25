import React, { Component } from 'react'
import './App.css'

import InlineText from './inlineText'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="holder">
          <InlineText placeholder="this is a bla" />
        </div>
      </div>
    )
  }
}

export default App
