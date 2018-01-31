import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer container">
        <p>
            <a href="https://github.com/LoTerence">@loterence</a>
        </p>
        <p>
            project link: <a href="https://github.com/LoTerence/altcoin-charter">@loterence/altcoin-charter</a>
        </p>
        <p>
            Credit for cryptocoin data goes to: <a href="https://www.cryptocompare.com/api/">cryptocompare.com/api</a>
        </p>
      </footer>
    )
  }
}
