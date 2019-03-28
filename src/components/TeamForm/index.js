import React, { Component } from "react";
import "./TeamForm.css";

class TeamForm extends Component {
  state = {
    currentTeamData: "",
    pointsInput: ""
  };

  handleInputField = e => {
    this.setState({ pointsInput: e.target.value });
  };

  handleToggleSwitch = () => {
    let { currentTeamData } = this.state;
    currentTeamData.is_eliminated = !currentTeamData.is_eliminated;
    this.setState({ currentTeamData });
  };

  handleDropDown = team => {
    const currentTeamData = this.props.teamData.find(
      listTeam => listTeam.name === team
    );
    this.setState({ currentTeamData });
  };

  updateTeamData = async () => {
    const { currentTeamData, pointsInput } = this.state;
    const response = await fetch(
      `http://localhost:3001/api/v1/longshotleague/team`,
      {
        method: "PATCH",
        credentials: "same-origin",
        body: JSON.stringify({
          name: currentTeamData.name,
          points: pointsInput,
          is_eliminated: currentTeamData.is_eliminated
        }),
        headers: { "Content-Type": "application/json" }
      }
    );
    const data = await response.json();
    await this.props.loadData();
  };

  render() {
    const { currentTeamData, pointsInput } = this.state;
    const { teamData } = this.props;

    const teamDropDownMenu = teamData.map((team, index) => {
      return (
        <option value={team.name} key={index}>
          {team.name}
        </option>
      );
    });

    return (
      <div className="TeamForm">
        <select
          className="drop-down-menu"
          ref={input => (this.menu = input)}
          onChange={() => this.handleDropDown(this.menu.value)}
        >
          {teamDropDownMenu}
        </select>
        <input
          onChange={this.handleInputField}
          className="team-input"
          type="number"
          value={pointsInput}
          placeholder="points"
        />
        <label className="switch">
          <input
            type="checkbox"
            checked={currentTeamData.is_eliminated}
            onChange={this.handleToggleSwitch}
          />
          <span className="slider" />
        </label>
        <button className="team-btn" onClick={this.updateTeamData}>
          Sumbit
        </button>
      </div>
    );
  }
}

export default TeamForm;
