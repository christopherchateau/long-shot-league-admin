import React, { Component } from "react";
import { patchTeamData } from "../../apiCalls";
import "./TeamForm.css";

class TeamForm extends Component {
  state = {
    currentTeamData: [],
    pointsInput: "points"
  };

  handleInputField = e => {
    this.setState({ pointsInput: e.target.value });
  };

  handleToggleSwitch = () => {
    let { currentTeamData } = this.state;
    currentTeamData.is_eliminated = !currentTeamData.is_eliminated;
    this.setState({ currentTeamData });
  };

  handleDropDown = name => {
    const currentTeamData = this.props.teamData.find(
      team => team.name === name
    );
    this.setState({
      currentTeamData,
      pointsInput: currentTeamData.points || "points"
    });
  };

  handleSubmit = async () => {
    const { currentTeamData, pointsInput } = this.state;
    await patchTeamData(currentTeamData, pointsInput);
    await this.props.loadData();
  };

  render() {
    const { currentTeamData, pointsInput } = this.state;
    const { teamData } = this.props;

    const teamDropDownMenu = teamData.map((team, index) => {
      return (
        <option value={team.name} key={index}>
          {team.name}
        </option>
      );
    });

    return (
      <div className="TeamForm">
        <select
          className="drop-down-menu"
          ref={input => (this.menu = input)}
          value={currentTeamData.name}
          onChange={() => this.handleDropDown(this.menu.value)}
        >
          {teamDropDownMenu}
        </select>
        <input
          onChange={this.handleInputField}
          className="team-input"
          type="number"
          value={pointsInput}
          placeholder={pointsInput}
        />
        <label className="switch">
          <input
            type="checkbox"
            checked={currentTeamData.is_eliminated}
            onChange={this.handleToggleSwitch}
          />
          <span className="slider" />
        </label>
        <button
          className="team-btn"
          onClick={this.handleSubmit}
          disabled={!pointsInput.length || !currentTeamData.id}
        >
          Sumbit
        </button>
      </div>
    );
  }
}

export default TeamForm;
