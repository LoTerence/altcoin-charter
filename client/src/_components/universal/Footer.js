import React from "react";

const Footer = () => {
  return (
    <footer className="container-fluid mt-5 text-center bg-light">
      <div className="container">
        <p>
          <a href="https://github.com/LoTerence">@loterence</a>
        </p>
        <p>
          Project link:{" "}
          <a href="https://github.com/LoTerence/altcoin-charter">
            @loterence/altcoin-charter
          </a>
        </p>
        <p>
          Credit for cryptocoin data goes to:{" "}
          <a href="https://www.cryptocompare.com/api/">cryptocompare.com/api</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
