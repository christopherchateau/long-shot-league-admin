import React, { Component } from "react";
import "./Bonus.css";

class Bonus extends Component {
  render() {
    const { bonusData } = this.props;
    return (
      <div className="Bonus">
        <h5>{`${bonusData.description} (${bonusData.points}pts)`}</h5>
      </div>
    );
  }
}

export default Bonus;
