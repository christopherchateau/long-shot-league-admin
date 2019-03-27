import React, { Component } from "react";
import "./TeamForm.css";

class TeamForm extends Component {
  render() {
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
        <input className="team-input" type="number" placeholder="points"/>
        <button
          className="team-btn"
          onClick={() => handleTeamClick(this.menu.value)}
        >
          Sumbit
        </button>
      </div>
    );
  }
}

export default TeamForm;
