import React, { Component } from "react";
import toddImg from "../../images/todd.png";
import "./Header.css";

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <h1>
          LONG SH
          <img className="todd-img" src={toddImg} />
          T LEAGUE
        </h1>
      </div>
    );
  }
}

export default Header;
