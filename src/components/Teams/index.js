import React, { Component } from 'react'
import TeamModal from '../TeamModal'

import './Teams.css'

export default class Teams extends Component {
	state = {
		display: 'show all',
		selectedTeam: null,
	}

	toggleDisplay = () => {
		let { display } = this.state

		display === 'show all'
			? (display = 'still alive')
			: (display = 'show all')

		this.setState({ display })
	}

	handleTeamClick = selectedTeam => {
		this.setState({ selectedTeam })
	}

	closeTeamModal = () => {
		this.setState({ selectedTeam: false })
	}

	render() {
		const { display, selectedTeam } = this.state
		let { refreshData, teamData } = this.props

		if (display === 'still alive') {
			teamData = teamData.filter(team => !team.is_eliminated)
		}

		const teams = teamData.slice(1).map(team => (
			<div
				className={'team'.concat(
					team.is_eliminated ? ' red' : ' green'
				)}
				key={team.name}
				onClick={() => this.handleTeamClick(team)}
			>
				<h3>
					{team.name} - {team.points}
				</h3>
				<h5>{team.drafted_by}</h5>
			</div>
		))
		return (
			<div>
				{selectedTeam && (
					<TeamModal
						{...{
							team: selectedTeam,
							refreshData,
							closeTeamModal: this.closeTeamModal,
						}}
					/>
				)}

				{!selectedTeam && (
					<div>
						<button
							className='teams-toggle-btn'
							onClick={this.toggleDisplay}
						>
							{display}
						</button>
						<br />
						<div className='Teams'>{teams}</div>
					</div>
				)}
			</div>
		)
	}
}
