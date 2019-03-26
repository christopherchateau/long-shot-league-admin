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
    return <div className="MainPage" />;
  }
}

export default MainPage;
