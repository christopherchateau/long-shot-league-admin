import React, { Component } from "react";
import "./TeamForm.css";

class TeamForm extends Component {
  state = {
    points: ""
  };

  handleTeamClick = team => {
    this.updateTeamScore(team, this.state.points);
  };

  handleInputField = e => {
    this.setState({ points: e.target.value });
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
    const { points } = this.state, { teamData } = this.props;
    const teamDropDownMenu = teamData.map((team, index) => {
      return (
        <option value={team.name} key={index}>
          {team.name}
        </option>
      );
    });

    return (
      <div className="TeamForm">
        <select className="drop-down-menu" ref={input => (this.menu = input)}>
          {teamDropDownMenu}
        </select>
        <input
          onChange={this.handleInputField}
          className="team-input"
          type="number"
          value={points}
          placeholder="points"
        />
        <label class="switch">
          <input type="checkbox" />
          <span class="slider" />
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
