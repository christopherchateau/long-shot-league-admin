import React, { Component } from "react";
import loadingImg from "../../images/loading.gif";
import "./LoadingPage.css";

class LoadingPage extends Component {
  render() {
    return (
      <div className="LoadingPage">
        <img className="loading-img" alt="loading" src={loadingImg} />
      </div>
    );
  }
}

export default LoadingPage;
