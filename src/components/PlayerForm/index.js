import React, { Component } from "react";
import "./PlayerForm.css";

class PlayerForm extends Component {
  state = {
    currentPlayerData: [],
    bonusDescription: ""
  };

  handleInputField = e => {
    this.setState({ bonusDescription: e.target.value });
  };

  handleDropDown = team => {
    // const currentPlayerData = this.props.teamData.find(
    //   listTeam => listTeam.name === team
    // );
    // this.setState({ currentPlayerData });
  };

  updatePlayerData = async () => {
    const { currentPlayerData, bonusDescription } = this.state;
    const response = await fetch(
      `http://localhost:3001/api/v1/longshotleague/player`,
      {
        method: "PATCH",
        credentials: "same-origin",
        body: JSON.stringify({
          name: currentPlayerData.name
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
          ref={input => (this.menu = input)}
          onChange={() => this.handleDropDown(this.menu.value)}
        >
          {teamDropDownMenu}
        </select>
        <select
          className="bonus-drop-down"
          ref={input => (this.menu = input)}
          defaultValue={1}
          onChange={() => this.handleDropDown(this.menu.value)}
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
          onClick={this.updateTeamData}
          disabled={!bonusDescription.length}
        >
          Sumbit
        </button>
      </div>
    );
  }
}

export default PlayerForm;
