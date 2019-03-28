import React, { Component } from "react";
import PlayerForm from "../PlayerForm";
import "./Players.css";

class Players extends Component {
  render() {
    const { playerData, loadData } = this.props;

    const players = this.props.playerData.map(player => (
      <div className="player" key={player.name}>
        <h3>{player.name}</h3>
        <h5>bonus: {player.bonus_points}</h5>
      </div>
    ));
    return (
      <div>
        <PlayerForm playerData={playerData} loadData={loadData} />
        <div className="Players">{players}</div>
      </div>
    );
  }
}

export default Players;
