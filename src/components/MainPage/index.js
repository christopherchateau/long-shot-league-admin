import React, { Component } from "react";
import { getTeamData } from "../../apiCalls";
import { getPlayerData } from "../../apiCalls";
import "./MainPage.css";

class MainPage extends Component {
  state = {
    teamData: [],
    playerData: []
  };

  componentDidMount = async () => {
    const teamData = await getTeamData();
    const playerData = await getPlayerData();
    await this.setState({ teamData, playerData });
  };

  render() {
    const { teamData, playerData } = this.state;

    const players = playerData.map(player => (
      <div className="player" key={player.name}>
        <h3>{player.name}</h3>
        <h5>bonus: {player.bonus_points}</h5>
      </div>
    ));

    const teams = teamData.map(team => (
      <div className="team" key={team.name}>
        <h3>{team.name}</h3>
        <h5>points: {team.points}</h5>
        <h5>drafted by: {team.drafted_by}</h5>
        <h5>eliminated: {team.is_eliminated + ""}</h5>
      </div>
    ));
    return (
      <div className="MainPage">
        <div className="players-wrapper">{players}</div>
        <div className="teams-wrapper">{teams}</div>
      </div>
    );
  }
}

export default MainPage;
