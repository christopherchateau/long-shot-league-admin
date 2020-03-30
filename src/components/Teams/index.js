import React, { Component } from 'react'
import { disableBodyScroll } from 'body-scroll-lock'

import './Teams.css'

export default class Teams extends Component {
	state = {
		display: 'show all',
		searchInput: '',
	}

	targetElement = null

	componentDidMount = () =>
		this.targetElement = document.querySelector('.MainPage')

	toggleDisplay = () => {
		let { display } = this.state

		display === 'show all'
			? display = 'still alive'
			: display = 'show all'

		this.setState({ display })
	}

	handleTeamClick = selectedTeam => {
		disableBodyScroll(this.targetElement)
		this.props.showModal(selectedTeam)
	}

	handleSearchInput = ({ target }) =>
		this.setState({ searchInput: target.value })

	render() {
		const { display, searchInput } = this.state
		let { teamData } = this.props

		if (display === 'still alive') {
			teamData = teamData.filter(({ is_eliminated }) => !is_eliminated)
		}

		if (searchInput) {
			teamData = teamData.filter(({ name }) =>
				name.toLowerCase().includes(searchInput.toLowerCase())
			)
		}

		const teams = teamData.map(team => (
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

		return <div>
			<div className='team-controls'>
				<input
					onChange={this.handleSearchInput}
					className='search'
					type='text'
					placeholder='search'
					value={searchInput}
				/>
				<button
					className='toggle-btn'
					onClick={this.toggleDisplay}
					>
					{display}
				</button>
			</div>

			<div className='Teams'>{teams}</div>

		</div>
	}
}
