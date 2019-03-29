import React, { Component } from "react";
import TeamForm from "../TeamForm";
import "./Teams.css";

class Teams extends Component {
  state = {
    display: "show all"
  };

  toggleTeamDisplay = () => {
    let { display } = this.state;
    display === "show all" ? (display = "still alive") : (display = "show all");
    this.setState({ display });
  };

  render() {
    const { display } = this.state;
    let { teamData, loadData } = this.props;

    if (display === "still alive") {
      teamData = teamData.filter(team => !team.is_eliminated);
    }

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
        <TeamForm teamData={teamData} loadData={loadData} />
        <button className="teams-toggle-btn" onClick={this.toggleTeamDisplay}>
          {display}
        </button>
        <br />
        <div className="Teams">{teams}</div>;
      </div>
    );
  }
}

export default Teams;
