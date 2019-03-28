import React, { Component } from "react";
import "./TeamForm.css";

class TeamForm extends Component {
  state = {
    points: "",
    currentTeam: "",
    isEliminated: ""
  };

  handleTeamClick = team => {
    this.updateTeamScore(team, this.state.points);
  };

  handleInputField = e => {
    this.setState({ points: e.target.value });
  };

  handleDropDown = team => {
    const currentTeam = this.props.teamData.find(
      listTeam => listTeam.name === team
      );
    this.setState({ currentTeam, isEliminated: currentTeam.is_eliminated });
  };

  updateTeamScore = async (name, points) => {
    const response = await fetch(
      `http://long-shot-league-be.herokuapp.com/api/v1/longshotleague/team`,
      {
        method: "PATCH",
        credentials: "same-origin",
        body: JSON.stringify({ name, points }),
        headers: { "Content-Type": "application/json" }
      }
    );
    const data = await response.json();
  };

  render() {
    const { points, isEliminated } = this.state;
    const { teamData } = this.props;
    teamData.unshift('-')
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
          value={points}
          placeholder="points"
        />
        <label className="switch">
          <input type="checkbox" checked={isEliminated} />
          <span className="slider" />
        </label>
        <button
          className="team-btn"
          onClick={() => this.handleTeamClick(this.menu.value)}
        >
          Sumbit
        </button>
      </div>
    );
  }
}

export default TeamForm;
