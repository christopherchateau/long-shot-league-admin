import React, { Component } from "react";
import "./TeamForm.css";

class TeamForm extends Component {
  state = {
    points: ''
  };

  handleTeamClick = team => {
    this.props.updateTeamScore(team, this.state.points)
  }

  handleInputField = (e) => {
    this.setState({ points: e.target.value})
  }

  render() {
    const { points } = this.state;
    const { teamData, handleTeamClick } = this.props;
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
