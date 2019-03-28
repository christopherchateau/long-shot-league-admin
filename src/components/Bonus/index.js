import React, { Component } from "react";
import "./Bonus.css";

class Bonus extends Component {
  render() {
    const { bonusData } = this.props;
    return (
      <div className="Bonus">
        <h3>{`${bonusData.description} (${bonusData.points})`}</h3>
      </div>
    );
  }
}

export default Bonus;
