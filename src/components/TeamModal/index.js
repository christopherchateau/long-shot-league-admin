import React, { Component } from 'react'
import { patchTeamData } from '../../apiCalls'
import './TeamModal.css'

class TeamModal extends Component {
	state = {
		currentTeamData: null,
		pointsInput: 'points',
	}


	handleInputField = (e) => {
		this.setState({ pointsInput: e.target.value })
	}

	handleToggleSwitch = () => {
		let { currentTeamData } = this.state
		currentTeamData.is_eliminated = !currentTeamData.is_eliminated
		this.setState({ currentTeamData })
	}

	handleModalCloseClick = () => {
		this.props.closeTeamModal()
	}

	// handleDropDown = (name) => {
	// 	const currentTeamData = this.props.teamData.find(
	// 		(team) => team.name === name
	// 	)
	// 	this.setState({
	// 		currentTeamData,
	// 		pointsInput: currentTeamData.points || 'points',
	// 	})
	// }

	handleSubmit = async () => {
		const { currentTeamData, pointsInput } = this.state
    await patchTeamData(currentTeamData, pointsInput)
		await this.props.refreshData()
	}

	render() {
		// const { currentTeamData, pointsInput } = this.state
		const { team } = this.props

		return (
			<div className={'TeamModal'.concat(team.is_eliminated ? ' red' : ' green')}>

				<button
					className='close-modal-btn'
					onClick={this.handleModalCloseClick}
				>
					X
				</button>

				<h1>{team.name}</h1>

				<label className="switch">
					<input
						type="checkbox"
						checked={team.is_eliminated}
						onChange={this.handleToggleSwitch}
					/>
					<span className="slider" />
				</label>

				<input
					onChange={this.handleInputField}
					className="team-input"
					type="number"
					placeholder="points"
				/>

				<button
					className="team-btn"
					onClick={this.handleSubmit}
					// disabled={!pointsInput.length || !team.id}
				>
					Sumbit
				</button>

			</div>
		)
	}
}

export default TeamModal
