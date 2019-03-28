import React, { Component } from "react";
import "./PlayerForm.css";

class PlayerForm extends Component {
  state = {
    currentPlayerData: [],
    bonusDescription: "",
    bonusAmount: 1
  };

  handleInputField = e => {
    this.setState({ bonusDescription: e.target.value });
  };

  handlePlayerDropDown = name => {
    const currentPlayerData = this.props.playerData.find(
      player => player.name === name
    );
    this.setState({ currentPlayerData });
  };

  handleBonusDropDown = bonusAmount => {
    this.setState({ bonusAmount });
  };

  submitPlayerData = async () => {
    const { currentPlayerData, bonusDescription, bonusAmount } = this.state;
    const response = await fetch(
      `http://localhost:3001/api/v1/longshotleague/new_bonus`,
      {
        method: "POST",
        credentials: "same-origin",
        body: JSON.stringify({
          name: currentPlayerData.name,
          player_id: currentPlayerData.id,
          description: bonusDescription,
          points: bonusAmount
        }),
        headers: { "Content-Type": "application/json" }
      }
    );
    const data = await response.json();
    await this.props.loadData();
  };

  render() {
    const { currentPlayerData, bonusDescription } = this.state;
    const { playerData } = this.props;

    const teamDropDownMenu = playerData.map((team, index) => {
      return (
        <option value={team.name} key={index}>
          {team.name}
        </option>
      );
    });

    const bonusDropDownMenu = [];
    for (let i = -1; i < 3; i++) {
      bonusDropDownMenu.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }

    return (
      <div className="PlayerForm">
        <select
          className="player-drop-down"
          ref={player => (this.player = player)}
          value={this.state.currentPlayerData.name}
          onChange={() => this.handlePlayerDropDown(this.player.value)}
        >
          {teamDropDownMenu}
        </select>
        <select
          className="bonus-drop-down"
          ref={bonus => (this.bonus = bonus)}
          value={this.state.bonusAmount}
          onChange={() => this.handleBonusDropDown(this.bonus.value)}
        >
          {bonusDropDownMenu}
        </select>
        <input
          onChange={this.handleInputField}
          className="bonus-input"
          type="text"
          value={bonusDescription}
          placeholder="bonus description"
        />
        <button
          className="player-btn"
          onClick={this.submitPlayerData}
          disabled={!bonusDescription.length || !currentPlayerData.id}
        >
          Sumbit
        </button>
      </div>
    );
  }
}

export default PlayerForm;
