import React, { Component } from "react";
import Bonus from "../Bonus";
import PlayerForm from "../PlayerForm";
import "./Players.css";

class Players extends Component {
  render() {
    const { playerData, bonusData, loadData } = this.props;

    const players = playerData.slice(1).map(player => {
      const bonusDataDisplayed = [];

      const playerBonusTotal = bonusData.reduce((total, bonus) => {
        if (bonus.name === player.name) {
          bonusDataDisplayed.push(
            <Bonus bonusData={bonus} loadData={loadData} key={bonus.id} />
          );
          total += bonus.points;
        }
        return +total;
      }, 0);
      return (
        <div className="player" key={player.name}>
          <h3 className="player-name">{`${player.name} - ${playerBonusTotal}`}</h3>
          <div>{bonusDataDisplayed}</div>
        </div>
      );
    });
    return (
      <div>
        <PlayerForm playerData={playerData} loadData={loadData} />
        <div className="Players">{players}</div>
      </div>
    );
  }
}

export default Players;
