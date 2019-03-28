import React, { Component } from "react";
import TeamForm from "../TeamForm";
import "./Teams.css";

class Teams extends Component {
  render() {
    const { teamData, loadData } = this.props;
    const teams = teamData.slice(1).map(team => (
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
    return (
      <div>
        <TeamForm teamData={teamData} loadData={loadData}/>
        <div className="Teams">{teams}</div>;
      </div>
    );
  }
}

export default Teams;
