import React, { Component } from "react";
import { deleteBonus } from "../../apiCalls";
import "./Bonus.css";

class Bonus extends Component {
  handleDelete = async id => {
    await deleteBonus(id);
    await this.props.loadData();
  };

  render() {
    const { bonusData } = this.props;
    return (
      <div className="Bonus">
        <h5
          className="bonus-delete-btn"
          onClick={() => this.handleDelete(bonusData.id)}
        >
          X
        </h5>
        <h5>{`${bonusData.description} (${bonusData.points}pt)`}</h5>
      </div>
    );
  }
}

export default Bonus;
