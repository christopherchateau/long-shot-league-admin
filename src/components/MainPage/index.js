import React, { Component } from "react";
import Players from "../Players";
import Teams from "../Teams";
import LoadingPage from "../LoadingPage";
import { getTeamData } from "../../apiCalls";
import { getPlayerData } from "../../apiCalls";
import { getBonusData } from "../../apiCalls";
import "./MainPage.css";

class MainPage extends Component {
  state = {
    teamData: [],
    playerData: [],
    bonusData: [],
    display: "teams"
  };

  componentDidMount = () => {
    //this.loadData();
  };

  loadData = async () => {
    let teamData = await getTeamData();
    let playerData = await getPlayerData();
    let bonusData = await getBonusData();

    await this.setState({
      bonusData,
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
    const { playerData, teamData, bonusData, display } = this.state;

    if (!playerData.length || !teamData.length || !bonusData.length) {
      return (
        <div className="MainPage">
          <LoadingPage />
        </div>
      );
    } else {
      return (
        <div className="MainPage">
          <button
            className="main-page-toggle-btn"
            onClick={this.handleToggleBtnClick}
          >
            {display}
          </button>
          {display === "players" && (
            <Players
              playerData={playerData}
              bonusData={bonusData}
              loadData={this.loadData}
            />
          )}
          {display === "teams" && (
            <Teams teamData={teamData} loadData={this.loadData} />
          )}
        </div>
      );
    }
  }
}

export default MainPage;
