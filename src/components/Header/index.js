import React, { Component } from "react";
import bballImg from "../../images/bball.png";
import "./Header.css";

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <h1>
          LONG SH
          <img className="todd-img" alt="loading" src={bballImg} />
          T ADMIN
        </h1>
      </div>
    );
  }
}

export default Header;
