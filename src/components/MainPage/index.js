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
    display: "teams"
  };

  componentDidMount = () => {
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

  handleToggleBtnClick = () => {
    let display = "";
    this.state.display === "teams"
      ? (display = "players")
      : (display = "teams");
    this.setState({ display });
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
          <button
            className="main-page-toggle-btn"
            onClick={this.handleToggleBtnClick}
          >
            {display}
          </button>
        </div>
        {display === "players" && (
          <Players playerData={playerData} loadData={this.loadData} />
        )}
        {display === "teams" && (
          <Teams teamData={teamData} loadData={this.loadData} />
        )}
      </div>
    );
  }
}

export default MainPage;
