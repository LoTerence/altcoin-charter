import React from "react";

const Footer = () => {
  return (
    <footer className="container-fluid mt-5 text-center bg-light">
      <div className="container">
        <p>
          <a
            href="https://github.com/LoTerence"
            target="_blank"
            rel="noopener noreferrer"
          >
            @loterence
          </a>
        </p>
        <p>
          Project link:{" "}
          <a
            href="https://github.com/LoTerence/altcoin-charter"
            target="_blank"
            rel="noopener noreferrer"
          >
            @loterence/altcoin-charter
          </a>
        </p>
        <p>
          Credit for cryptocoin data goes to:{" "}
          <a
            href="https://www.cryptocompare.com/api/"
            target="_blank"
            rel="noopener noreferrer"
          >
            cryptocompare.com/api
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
