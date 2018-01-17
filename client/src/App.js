import React, { Component } from 'react'
import { Provider } from 'react-redux'
import logo from './logo.svg'
import './App.css'
import store from './_store'
import Customers from './_components/Customer/customers'

class App extends Component {

  render () {
    return (
      <Provider store={ store }>
        <div className="App">
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo"/>
            <h1 className="App-title">Altcoin Charter</h1>
          </header>
          <Customers/>
        </div>
      </Provider>
    )
  }
}

export default App
