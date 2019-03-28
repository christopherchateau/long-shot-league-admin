import React, { Component } from "react";
import Players from "../Players";
import Teams from "../Teams";
import { getTeamData } from "../../apiCalls";
import { getPlayerData } from "../../apiCalls";
import "./MainPage.css";

class MainPage extends Component {
  state = {
    teamData: [],
    playerData: [],
    display: 'teams'
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
  };

  sortByName = input =>
    input.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
    });

  render() {
    const { playerData, teamData, display } = this.state;

    return (
      <div className="MainPage">
        <div className="main-page-toggle">
        <button className="main-page-toggle-btn">{display}</button>
        </div>
        {display ==='players' &&<Players playerData={playerData} />}
        {display === 'teams' && <Teams teamData={teamData} updateTeamScore={this.updateTeamScore} />}
      </div>
    );
  }
}

export default MainPage;
