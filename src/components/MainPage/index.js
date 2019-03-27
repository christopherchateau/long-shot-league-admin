import React, { Component } from "react";
import TeamForm from "../TeamForm";
import { getTeamData } from "../../apiCalls";
import { getPlayerData } from "../../apiCalls";
import "./MainPage.css";

class MainPage extends Component {
  state = {
    teamData: [],
    playerData: []
  };

  componentDidMount = () => {
    this.loadData();
  };

  componentDidUpdate = () => {
    this.loadData();
  };

  loadData = async () => {
    let teamData = await getTeamData();
    let playerData = await getPlayerData();

    await this.setState({
      teamData: this.sortByName(teamData),
      playerData: this.sortByName(playerData)
    });
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
    console.log(data);
  };

  sortByName = input =>
    input.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
    });

  render() {
    const { teamData, playerData } = this.state;

    const players = playerData.map(player => (
      <div className="player" key={player.name}>
        <h3>{player.name}</h3>
        <h5>bonus: {player.bonus_points}</h5>
      </div>
    ));

    const teams = teamData.map(team => (
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
      <div className="MainPage">
        <TeamForm updateTeamScore={this.updateTeamScore} teamData={teamData} />
        <div className="players-wrapper">{players}</div>
        <div className="teams-wrapper">{teams}</div>
      </div>
    );
  }
}

export default MainPage;
