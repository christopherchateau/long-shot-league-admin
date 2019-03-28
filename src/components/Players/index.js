import React, { Component } from "react";
import "./Players.css";

class Players extends Component {
  render() {
    const players = this.props.playerData.map(player => (
      <div className="player" key={player.name}>
        <h3>{player.name}</h3>
        <h5>bonus: {player.bonus_points}</h5>
      </div>
    ));
    return <div className="Players">{players}</div>;
  }
}

export default Players;
