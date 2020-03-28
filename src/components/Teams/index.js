import React, { Component } from 'react'
import TeamModal from '../TeamModal'
import './Teams.css'

class Teams extends Component {
	state = {
		teamDisplay: 'show all',
		selectedTeam: false
	}

	toggleTeamDisplay = () => {
		let { teamDisplay } = this.state

		teamDisplay === 'show all'
			? (teamDisplay = 'still alive')
			: (teamDisplay = 'show all')

		this.setState({ teamDisplay })
	}

	handleTeamClick = (selectedTeam) => {
		this.setState({ selectedTeam })
	}

	closeTeamModal = () => {
		this.setState({ selectedTeam: false })

		// let { showModal } = this.state
		// this.setState({ showModal: !showModal })
	}

	render() {
		const { teamDisplay, selectedTeam } = this.state
		let { refreshData, teamData } = this.props

		if (teamDisplay === 'still alive') {
			teamData = teamData.filter((team) => !team.is_eliminated)
		}

		const teams = teamData.slice(1).map((team) => (
			<div
				className={'team'.concat(team.is_eliminated ? ' red' : ' green')}
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
						team={selectedTeam}
						refreshData={refreshData}
						closeTeamModal={this.closeTeamModal}
					/>
				)}

				{!selectedTeam && (
					<div>
						<button
							className="teams-toggle-btn"
							onClick={this.toggleTeamDisplay}
						>
							{teamDisplay}
						</button>
						<br />
						<div className="Teams">{teams}</div>
					</div>
				)}
			</div>
		)
	}
}

export default Teams
