import React, { Component } from "react";
import TeamForm from "../TeamForm";
import "./Teams.css";

class Teams extends Component {
  render() {
    const teams = this.props.teamData.map(team => (
      <div
        className={"team".concat(team.is_eliminated ? " red" : " green")}
        key={team.name}
      >
        <h3>
          {team.name} - {team.points}
        </h3>
        <h5>{team.drafted_by}</h5>
      </div>
    ));
    return <div className="Teams">{teams}</div>;
  }
}

export default Teams;
