import React, { Component } from 'react'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import './Teams.css'

export default class Teams extends Component {
	state = {
		display: 'show all',
		// selectedTeam: null,
	}

	targetElement = null

	componentDidMount = () =>
        this.targetElement = document.querySelector('.MainPage')

	toggleDisplay = () => {
		let { display } = this.state

		display === 'show all'
			? (display = 'still alive')
			: (display = 'show all')

		this.setState({ display })
	}

	handleTeamClick = selectedTeam => {
		disableBodyScroll(this.targetElement)
		this.props.showModal(selectedTeam)
	}

	render() {
		const { display } = this.state
		let { teamData } = this.props

		if (display === 'still alive') {
			teamData = teamData.filter(team => !team.is_eliminated)
		}

		const teams = teamData.slice(1).map(team => (
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
				{/* {selectedTeam && (
					<TeamModal
						{...{
							team: selectedTeam,
							refreshData,
							closeTeamModal: this.closeTeamModal,
						}}
					/>
				)} */}

				<div>
					<button
						className='toggle-btn'
						onClick={this.toggleDisplay}
					>
						{display}
					</button>
					<br />
					<div className='Teams'>{teams}</div>
				</div>
			</div>
		)
	}
}
